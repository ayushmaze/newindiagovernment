import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const runtime = 'nodejs'

/**
 * /api/agents/news-queue — the Claude Code side of the pipeline.
 *
 * The Vercel cron only INGESTS (news-pipeline?mode=ingest). Research,
 * verification and drafting run inside Claude Code on the operator's
 * machine under their subscription — no LLM API calls from the server.
 * This endpoint is how that session talks to the queue:
 *
 *   GET  ?limit=N       → oldest `new` items (with source leaning) to research
 *   POST { id, status, verdict?, route?, confidence?, articleId?, log? }
 *                       → mark an item drafted / error / rejected after the
 *                         session has POSTed the article to fact-check-ingest
 *
 * Auth: same Bearer/`?key=` scheme as news-pipeline (NEWS_PIPELINE_SECRET
 * or CRON_SECRET).
 */

function authorized(req: NextRequest): boolean {
  const secret = process.env.NEWS_PIPELINE_SECRET
  const cronSecret = process.env.CRON_SECRET
  if (!secret && !cronSecret) return false
  const header = req.headers.get('authorization') ?? ''
  const bearer = header.toLowerCase().startsWith('bearer ') ? header.slice(7).trim() : ''
  const queryKey = new URL(req.url).searchParams.get('key') ?? ''
  const accepted = [secret, cronSecret].filter(Boolean) as string[]
  return accepted.includes(bearer) || accepted.includes(queryKey)
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const payload = await getPayload({ config })

  const url = new URL(req.url)
  const limitParam = Number(url.searchParams.get('limit'))
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, 25) : 5

  const queue = await payload.find({
    collection: 'news-items',
    where: { status: { equals: 'new' } },
    sort: 'createdAt',
    limit,
    depth: 1,
  })

  const items = (queue.docs as Array<Record<string, unknown>>).map((d) => {
    const src = d.source as Record<string, unknown> | null
    return {
      id: d.id,
      sourceTitle: d.sourceTitle,
      sourceUrl: d.sourceUrl,
      sourceName: d.sourceName,
      summary: d.summary,
      publishedAtSource: d.publishedAtSource,
      leaning: src && typeof src === 'object' ? (src.leaning ?? 'neutral') : 'neutral',
    }
  })

  return NextResponse.json({ ok: true, total: queue.totalDocs, items })
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const payload = await getPayload({ config })

  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const id = body.id
  const status = String(body.status ?? '')
  const allowed = ['drafted', 'error', 'rejected', 'researching']
  if (!id || !allowed.includes(status)) {
    return NextResponse.json(
      { error: 'bad_request', hint: `id required; status one of ${allowed.join('|')}` },
      { status: 400 },
    )
  }

  const data: Record<string, unknown> = { status }
  if (body.verdict) data.verdict = String(body.verdict)
  if (body.route) data.route = String(body.route)
  if (body.confidence) data.confidence = String(body.confidence)
  if (body.articleId) data.linkedArticle = Number(body.articleId)
  if (body.log) data.pipelineLog = String(body.log).slice(0, 2000)

  const updated = await payload.update({
    collection: 'news-items',
    id: id as string | number,
    data: data as never,
  })

  return NextResponse.json({ ok: true, id: updated.id, status: updated.status })
}
