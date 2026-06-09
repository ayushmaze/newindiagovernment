/**
 * News research engine.
 *
 * Given a headline from a feed, ask Claude (with the server-side web_search
 * tool) to verify it against primary sources and return a structured,
 * publish-ready DRAFT in the AgentArticleInput shape. One API call; Claude
 * runs the searches itself.
 *
 * Editorial guardrails are baked into the system prompt:
 *  - every claim sourced; constructive "accountability, not attack" framing
 *  - hard-debunk path (naming the outlet) is allowed ONLY when the claim is
 *    proven false/misleading AND the source is government-leaning AND there
 *    are >=2 solid sources — otherwise neutral framing
 *  - nothing here publishes; the output is always a draft for human review
 */

import type { AgentArticleInput } from '@/lib/factCheck/persist'

export type ResearchResult = {
  article: AgentArticleInput
  verdict: string
  confidence: 'low' | 'medium' | 'high'
  route: 'explainer' | 'debunk'
}

export type ResearchOutcome =
  | { ok: true; result: ResearchResult }
  | { ok: false; reason: string }

type FeedContext = {
  headline: string
  summary: string
  sourceName: string
  sourceUrl: string
  leaning: 'neutral' | 'independent' | 'godi-leaning'
}

const MODEL = 'claude-opus-4-7'

function systemPrompt(): string {
  return [
    'You are the lead fact-check researcher for "The New India Government", an',
    'independent, non-partisan Indian accountability platform. Mission: Truth ·',
    'Transparency · Voice.',
    '',
    'You will be given a NEWS HEADLINE from an Indian outlet. Use web_search to',
    'verify it against PRIMARY sources (PIB, RBI, MoSPI/NSO, CAG, ECI, court',
    'records, WHO/World Bank, reputable wire/fact-check outlets). Then write a',
    'short, original, publish-ready article.',
    '',
    'EVIDENCE & VERDICT:',
    '- Verdict scale: true | mostly-true | mixed | misleading | false | unverifiable.',
    '- Every factual sentence must trace to a source you actually found.',
    '- Minimum 2 distinct sources; more for a false/misleading verdict.',
    '',
    'FRAMING (binding):',
    '- Constructive and non-partisan: what was claimed, what the evidence shows,',
    '  what could improve. Critique claims/policies, not identities or communities.',
    '- DEBUNK / naming the outlet hard is permitted ONLY if ALL hold: verdict is',
    '  false or misleading; the outlet is government-leaning; you have >=2 solid',
    '  sources. Then state it plainly: "<Outlet> reported X. <Primary source>',
    '  shows Y. The claim is false." Never call people/communities names.',
    '- If the claim is TRUE or mostly-true, write a neutral explainer (give credit',
    '  where due).',
    '- Never fabricate a quote or URL. If you cannot verify, verdict = unverifiable.',
    '- Do NOT reproduce the outlet’s article text or images. Original words only.',
    '',
    'OUTPUT: Respond with ONLY a single JSON object (no markdown fence, no prose',
    'before/after) of this exact shape:',
    '{',
    '  "verdict": "true|mostly-true|mixed|misleading|false|unverifiable",',
    '  "confidence": "low|medium|high",',
    '  "article": {',
    '    "title": "<=12 words, falsifiable or a sharp question",',
    '    "kicker": "FACT-CHECK · <VERDICT>",',
    '    "excerpt": "1 sentence, <=300 chars",',
    '    "bodyMarkdown": "300-600 words, original, inline [text](url) links",',
    '    "verdict": "<same as above>",',
    '    "claimVsTruth": [{"claim":"...","claimSource":"<Outlet>, <date>","truth":"...","truthSources":[{"label":"...","url":"..."}]}],',
    '    "claims": [{"claim":"...","verdict":"...","reasoning":"...","confidence":"low|medium|high","sources":[{"label":"...","url":"..."}]}],',
    '    "sources": [{"label":"...","url":"..."}],',
    '    "suggestedTags": ["..."]',
    '  }',
    '}',
  ].join('\n')
}

function userPrompt(ctx: FeedContext): string {
  return [
    `HEADLINE: ${ctx.headline}`,
    ctx.summary ? `SUMMARY: ${ctx.summary}` : '',
    `OUTLET: ${ctx.sourceName} (leaning: ${ctx.leaning})`,
    `ORIGINAL URL: ${ctx.sourceUrl}`,
    '',
    'Research this and return the JSON object only.',
  ]
    .filter(Boolean)
    .join('\n')
}

function extractJson(text: string): unknown | null {
  // Find the outermost {...} JSON object in the text.
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start === -1 || end === -1 || end <= start) return null
  const slice = text.slice(start, end + 1)
  try {
    return JSON.parse(slice)
  } catch {
    return null
  }
}

export async function researchHeadline(ctx: FeedContext): Promise<ResearchOutcome> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return { ok: false, reason: 'ANTHROPIC_API_KEY not set' }

  let res: Response
  try {
    res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      signal: AbortSignal.timeout(280000),
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 8000,
        system: systemPrompt(),
        tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 6 }],
        messages: [{ role: 'user', content: userPrompt(ctx) }],
      }),
    })
  } catch (e) {
    return { ok: false, reason: `fetch failed: ${e instanceof Error ? e.message : String(e)}` }
  }

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    return { ok: false, reason: `Anthropic ${res.status}: ${body.slice(0, 200)}` }
  }

  const data = (await res.json()) as {
    stop_reason?: string
    content?: Array<{ type: string; text?: string }>
  }
  const text = (data.content ?? [])
    .filter((b) => b.type === 'text' && typeof b.text === 'string')
    .map((b) => b.text as string)
    .join('\n')

  if (!text) {
    return { ok: false, reason: `no text block (stop_reason: ${data.stop_reason ?? '?'})` }
  }

  const parsed = extractJson(text) as
    | { verdict?: string; confidence?: string; article?: AgentArticleInput }
    | null
  if (!parsed) {
    const trunc = data.stop_reason === 'max_tokens' ? ' (hit max_tokens — truncated)' : ''
    return { ok: false, reason: `JSON parse failed${trunc}. Text head: ${text.slice(0, 160)}` }
  }
  if (!parsed.article || !parsed.verdict) {
    return { ok: false, reason: 'JSON missing article/verdict' }
  }

  const verdict = String(parsed.verdict)
  const confidence = (['low', 'medium', 'high'].includes(String(parsed.confidence))
    ? parsed.confidence
    : 'medium') as 'low' | 'medium' | 'high'

  const isFalse = verdict === 'false' || verdict === 'misleading'
  const route: 'explainer' | 'debunk' =
    isFalse && ctx.leaning === 'godi-leaning' ? 'debunk' : 'explainer'

  parsed.article.verdict = parsed.article.verdict ?? verdict

  return { ok: true, result: { article: parsed.article, verdict, confidence, route } }
}
