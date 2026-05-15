import Anthropic from '@anthropic-ai/sdk'
import type { Payload } from 'payload'
import { FACT_CHECK_SYSTEM_PROMPT } from './systemPrompt.ts'
import { factCheckTools } from './tools.ts'
import { createArticleFromAgent, type AgentArticleInput } from './persist.ts'

const MODEL = 'claude-opus-4-7'
const MAX_AGENT_TURNS = 20
const MAX_TOKENS = 16_000

// Beta headers — web_fetch + interleaved thinking (adaptive) + extended cache TTL.
// `extended-cache-ttl-2025-04-11` lets the cached system prompt + tool list live for 1h instead of 5m.
const BETA_HEADERS = ['web-fetch-2025-09-10', 'extended-cache-ttl-2025-04-11']

export interface RunResult {
  status: 'completed' | 'failed'
  articleId?: string
  slug?: string
  errorMessage?: string
  log: AgentLogEntry[]
  verdict?: string
  meta: {
    model: string
    durationMs: number
    toolCallCount: number
    inputTokens: number
    outputTokens: number
    cacheReadTokens: number
  }
}

export interface AgentLogEntry {
  turn: number
  type: 'assistant' | 'tool_use' | 'tool_result' | 'error'
  toolName?: string
  summary: string
  detail?: unknown
}

/**
 * find_stock_image executor.
 * - If UNSPLASH_ACCESS_KEY is set, hits Unsplash search API and returns
 *   the top photo (CC0-ish under Unsplash licence, must credit photographer).
 * - Otherwise returns a soft "no image" result; the editor adds one manually.
 */
async function execFindStockImage(input: { query: string; orientation?: string }) {
  const key = process.env.UNSPLASH_ACCESS_KEY
  if (!key) {
    return {
      ok: false,
      message:
        'No UNSPLASH_ACCESS_KEY configured. Skip heroImageUrl in create_article — the editor will add an image manually.',
    }
  }
  try {
    const params = new URLSearchParams({
      query: input.query,
      orientation: input.orientation ?? 'landscape',
      per_page: '3',
      content_filter: 'high',
    })
    const r = await fetch(`https://api.unsplash.com/search/photos?${params.toString()}`, {
      headers: { Authorization: `Client-ID ${key}` },
    })
    if (!r.ok) {
      return { ok: false, message: `Unsplash returned ${r.status}` }
    }
    const data = await r.json() as {
      results: Array<{
        urls: { regular: string }
        alt_description?: string
        user: { name: string; links: { html: string } }
        links: { html: string }
      }>
    }
    const photo = data.results[0]
    if (!photo) return { ok: false, message: 'No results.' }
    return {
      ok: true,
      url: photo.urls.regular,
      altText: photo.alt_description ?? input.query,
      credit: `Photo by ${photo.user.name} on Unsplash`,
      photographerUrl: photo.user.links.html,
      photoUrl: photo.links.html,
    }
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : 'Unsplash fetch failed.' }
  }
}

/**
 * Run the fact-check agent loop for one topic.
 * Caller owns submission state — this function just executes and reports.
 */
export async function runFactCheck(opts: {
  topic: string
  submissionId: string
  payload: Payload
}): Promise<RunResult> {
  const { topic, submissionId, payload } = opts
  const log: AgentLogEntry[] = []
  const startedAt = Date.now()

  let inputTokens = 0
  let outputTokens = 0
  let cacheReadTokens = 0
  let toolCallCount = 0

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return {
      status: 'failed',
      errorMessage: 'ANTHROPIC_API_KEY is not set in the environment.',
      log,
      meta: { model: MODEL, durationMs: 0, toolCallCount: 0, inputTokens: 0, outputTokens: 0, cacheReadTokens: 0 },
    }
  }

  const client = new Anthropic({ apiKey })

  // Build the initial conversation. Cache the system prompt + tools.
  const messages: Anthropic.Messages.MessageParam[] = [
    {
      role: 'user',
      content: `# New fact-check submission

**Topic / claim to verify:**

${topic.trim()}

Begin research now. Use \`web_search\` and \`web_fetch\`. End with exactly one \`create_article\` call.`,
    },
  ]

  let createArticleInput: AgentArticleInput | null = null
  let stopReason: string | null = null

  for (let turn = 1; turn <= MAX_AGENT_TURNS; turn++) {
    let response: Anthropic.Messages.Message
    try {
      response = await client.messages.create(
        {
          model: MODEL,
          max_tokens: MAX_TOKENS,
          thinking: { type: 'adaptive' },
          system: [
            {
              type: 'text',
              text: FACT_CHECK_SYSTEM_PROMPT,
              cache_control: { type: 'ephemeral' },
            },
          ],
          tools: factCheckTools,
          messages,
        },
        { headers: { 'anthropic-beta': BETA_HEADERS.join(',') } },
      )
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      log.push({ turn, type: 'error', summary: `API error: ${msg}` })
      return {
        status: 'failed',
        errorMessage: msg,
        log,
        meta: {
          model: MODEL,
          durationMs: Date.now() - startedAt,
          toolCallCount,
          inputTokens,
          outputTokens,
          cacheReadTokens,
        },
      }
    }

    // Token accounting
    inputTokens += response.usage?.input_tokens ?? 0
    outputTokens += response.usage?.output_tokens ?? 0
    cacheReadTokens += response.usage?.cache_read_input_tokens ?? 0

    // Log assistant content briefly (text only — skip thinking)
    const assistantTextBlocks = response.content
      .filter((b): b is Anthropic.Messages.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('\n')
    if (assistantTextBlocks.trim()) {
      log.push({
        turn,
        type: 'assistant',
        summary: assistantTextBlocks.slice(0, 400) + (assistantTextBlocks.length > 400 ? '…' : ''),
      })
    }

    // Append assistant response to history verbatim
    messages.push({ role: 'assistant', content: response.content })

    stopReason = response.stop_reason
    if (response.stop_reason === 'end_turn') {
      // Model decided it's done. If create_article was called, we're good.
      break
    }
    if (response.stop_reason !== 'tool_use') {
      log.push({ turn, type: 'error', summary: `Unexpected stop_reason: ${response.stop_reason}` })
      break
    }

    // Process custom tool_use blocks (server tools handled by Anthropic)
    const toolResults: Anthropic.Messages.ToolResultBlockParam[] = []
    for (const block of response.content) {
      if (block.type !== 'tool_use') continue
      toolCallCount += 1
      const name = block.name
      const input = block.input as Record<string, unknown>

      if (name === 'create_article') {
        createArticleInput = input as unknown as AgentArticleInput
        log.push({
          turn,
          type: 'tool_use',
          toolName: name,
          summary: `create_article(verdict=${createArticleInput.verdict}, claims=${createArticleInput.claims?.length ?? 0})`,
        })
        // We don't persist yet — wait until loop ends in case model issues another call.
        toolResults.push({
          type: 'tool_result',
          tool_use_id: block.id,
          content:
            'Article accepted. Draft will be saved as review-pending after this turn. Do not call create_article again. End your response with a one-paragraph editor summary.',
        })
        continue
      }

      if (name === 'find_stock_image') {
        log.push({
          turn,
          type: 'tool_use',
          toolName: name,
          summary: `find_stock_image(${(input.query as string) ?? ''})`,
        })
        const result = await execFindStockImage(input as { query: string; orientation?: string })
        log.push({
          turn,
          type: 'tool_result',
          toolName: name,
          summary: result.ok ? `image found: ${(result as { url: string }).url}` : `no image: ${result.message ?? ''}`,
        })
        toolResults.push({
          type: 'tool_result',
          tool_use_id: block.id,
          content: JSON.stringify(result),
          is_error: !result.ok,
        })
        continue
      }

      // Unknown tool — return error so the model can recover
      toolResults.push({
        type: 'tool_result',
        tool_use_id: block.id,
        content: `Unknown tool: ${name}`,
        is_error: true,
      })
    }

    if (toolResults.length === 0) {
      // No custom tools to respond to (server tools handled inline). Continue loop.
      break
    }

    messages.push({ role: 'user', content: toolResults })

    if (createArticleInput && stopReason === 'tool_use') {
      // Allow one more turn so the model can produce its editor summary,
      // but break if it didn't call any tool.
    }
  }

  const durationMs = Date.now() - startedAt
  const meta = {
    model: MODEL,
    durationMs,
    toolCallCount,
    inputTokens,
    outputTokens,
    cacheReadTokens,
  }

  if (!createArticleInput) {
    return {
      status: 'failed',
      errorMessage: 'Agent finished without calling create_article.',
      log,
      meta,
    }
  }

  // Persist to Payload
  try {
    const { id, slug } = await createArticleFromAgent(payload, createArticleInput, {
      ...meta,
      submissionId,
      inputTopic: topic,
    })
    return {
      status: 'completed',
      articleId: id,
      slug,
      verdict: createArticleInput.verdict,
      log,
      meta,
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    log.push({ turn: -1, type: 'error', summary: `persist error: ${msg}` })
    return { status: 'failed', errorMessage: msg, log, meta }
  }
}
