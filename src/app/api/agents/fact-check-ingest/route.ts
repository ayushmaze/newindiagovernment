import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  createArticleFromAgent,
  type AgentArticleInput,
} from '@/lib/factCheck/persist'

export const runtime = 'nodejs'

/**
 * POST /api/agents/fact-check-ingest
 *
 * **Option 2 — Claude Code path.**
 *
 * Claude Code (running on the user's machine under their Pro/Max
 * subscription) does the research and drafting. When it finishes it
 * POSTs the structured article JSON here. We persist it as a
 * `draft` + `review-pending` article — same destination as the
 * API-driven `/api/agents/fact-check` route, but without us running
 * any LLM calls server-side.
 *
 * Auth: shared secret in `X-Ingest-Secret` header, matched against
 * `FACT_CHECK_INGEST_SECRET` in `.env`. The endpoint also rejects
 * any request that isn't from localhost in production — in dev we
 * trust the secret alone so Lando proxying works.
 */

interface IngestBody {
  topic: string
  article: AgentArticleInput
  runMeta?: {
    model?: string
    durationMs?: number
    toolCallCount?: number
  }
}

function isLocalRequest(req: NextRequest): boolean {
  const fwd = req.headers.get('x-forwarded-for') ?? ''
  const remote = req.headers.get('x-real-ip') ?? ''
  const candidates = [fwd.split(',')[0]?.trim(), remote, '127.0.0.1', '::1']
  return candidates.some((ip) =>
    ['127.0.0.1', '::1', 'localhost', '::ffff:127.0.0.1', ''].includes(ip ?? ''),
  )
}

export async function POST(req: NextRequest) {
  const secret = process.env.FACT_CHECK_INGEST_SECRET
  if (!secret) {
    return NextResponse.json(
      { error: 'ingest_not_configured', hint: 'Set FACT_CHECK_INGEST_SECRET in .env' },
      { status: 503 },
    )
  }

  const headerSecret = req.headers.get('x-ingest-secret')
  if (headerSecret !== secret) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  if (process.env.NODE_ENV === 'production' && !isLocalRequest(req)) {
    return NextResponse.json({ error: 'forbidden_remote' }, { status: 403 })
  }

  let body: IngestBody
  try {
    body = (await req.json()) as IngestBody
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  if (!body?.topic || !body?.article) {
    return NextResponse.json(
      { error: 'missing_fields', need: ['topic', 'article'] },
      { status: 400 },
    )
  }

  // Minimal sanity validation — the persistence layer is the real schema gate.
  const a = body.article
  if (!a.title || !a.excerpt || !a.bodyMarkdown || !a.verdict) {
    return NextResponse.json(
      {
        error: 'incomplete_article',
        need: ['title', 'excerpt', 'bodyMarkdown', 'verdict', 'claims', 'sources'],
      },
      { status: 400 },
    )
  }
  if (!Array.isArray(a.claims) || a.claims.length === 0) {
    return NextResponse.json({ error: 'no_claims' }, { status: 400 })
  }
  if (!Array.isArray(a.sources) || a.sources.length < 2) {
    return NextResponse.json(
      { error: 'insufficient_sources', need: 'at least 2 sources' },
      { status: 400 },
    )
  }

  const payload = await getPayload({ config })

  // Record a submission row so the editor sees it alongside API-path runs.
  const submission = await payload.create({
    collection: 'fact-check-submissions',
    data: {
      topic: body.topic.slice(0, 1000),
      status: 'running',
    } as never,
  })

  try {
    const { id, slug } = await createArticleFromAgent(
      payload,
      a,
      {
        submissionId: String(submission.id),
        model: body.runMeta?.model ?? 'claude-code (subscription)',
        inputTopic: body.topic,
        durationMs: body.runMeta?.durationMs ?? 0,
        toolCallCount: body.runMeta?.toolCallCount ?? 0,
        inputTokens: 0,
        outputTokens: 0,
        cacheReadTokens: 0,
      },
    )

    await payload.update({
      collection: 'fact-check-submissions',
      id: submission.id,
      data: {
        status: 'completed',
        verdict: a.verdict,
        article: Number(id),
      } as never,
    })

    return NextResponse.json({
      ok: true,
      submissionId: String(submission.id),
      articleId: id,
      slug,
      verdict: a.verdict,
      reviewUrl: `/admin/collections/articles/${id}`,
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    await payload.update({
      collection: 'fact-check-submissions',
      id: submission.id,
      data: { status: 'failed', errorMessage: msg } as never,
    })
    return NextResponse.json({ ok: false, error: msg }, { status: 500 })
  }
}
