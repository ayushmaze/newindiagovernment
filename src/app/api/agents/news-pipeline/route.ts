import { NextRequest, NextResponse, after } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { runPipeline } from '@/lib/news/pipeline'

export const runtime = 'nodejs'
export const maxDuration = 300

/**
 * POST/GET /api/agents/news-pipeline  — the automation entry point.
 *
 * Phase 1: SKELETON. Authenticates the caller (cron secret), confirms the
 * pipeline data models are reachable, and returns a status summary. The real
 * stages land in Phase 2+:
 *
 *   1. INGEST   — pull active NewsSource feeds (RSS), create NewsItem rows
 *   2. DEDUPE   — skip items whose dedupeKey already exists
 *   3. RESEARCH — Claude reads each claim, web-searches primary sources
 *   4. VERDICT  — true / misleading / false (+ confidence)
 *   5. ROUTE    — explainer (true) vs hard-debunk (false + godi-leaning)
 *   6. WRITE    — original article via createArticleFromAgent (draft)
 *   7. IMAGE    — AI cover image
 *   8. NOTIFY   — push notification: "N drafts ready"
 *
 * Nothing here ever publishes. Drafts wait for human approval in the app.
 *
 * Auth: `Authorization: Bearer <NEWS_PIPELINE_SECRET>` (Vercel Cron sends
 * this header automatically when configured with the secret).
 */

function authorized(req: NextRequest): boolean {
  const secret = process.env.NEWS_PIPELINE_SECRET
  const cronSecret = process.env.CRON_SECRET // Vercel Cron auto-sends this as Bearer
  if (!secret && !cronSecret) return false
  const header = req.headers.get('authorization') ?? ''
  const bearer = header.toLowerCase().startsWith('bearer ') ? header.slice(7).trim() : ''
  const url = new URL(req.url)
  const queryKey = url.searchParams.get('key') ?? ''
  const accepted = [secret, cronSecret].filter(Boolean) as string[]
  return accepted.includes(bearer) || accepted.includes(queryKey)
}

async function run(req: NextRequest) {
  if (!process.env.NEWS_PIPELINE_SECRET && !process.env.CRON_SECRET) {
    return NextResponse.json(
      { error: 'pipeline_not_configured', hint: 'Set NEWS_PIPELINE_SECRET in env' },
      { status: 503 },
    )
  }
  if (!authorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config })

  const url = new URL(req.url)

  // ?dry=1 → health check only (no ingestion, no paid LLM calls)
  if (url.searchParams.get('dry') === '1') {
    const [sources, queue] = await Promise.all([
      payload.find({ collection: 'news-sources', where: { active: { equals: true } }, limit: 0 }),
      payload.find({ collection: 'news-items', where: { status: { equals: 'drafted' } }, limit: 0 }),
    ])
    return NextResponse.json({
      ok: true,
      dryRun: true,
      activeSources: sources.totalDocs,
      draftsAwaitingReview: queue.totalDocs,
      ranAt: new Date().toISOString(),
    })
  }

  // ?mode=ingest → RSS ingestion only, ZERO server-side LLM calls. Research
  // and drafting are done by Claude Code (the /newsrun skill) under the
  // operator's subscription: it reads the queue endpoint and POSTs finished
  // articles to fact-check-ingest. This is the cron's default mode now.
  const ingestOnly = url.searchParams.get('mode') === 'ingest'

  // ?limit=N → cap the (paid) research calls this run. Default 3.
  const limitParam = Number(url.searchParams.get('limit'))
  const researchLimit = ingestOnly
    ? 0
    : Number.isFinite(limitParam) && limitParam > 0
      ? Math.min(limitParam, 10)
      : 3

  // ?chain=N → bounded self-chaining for throughput (Phase 5). Each invocation
  // stays under the 300s function cap; after a successful batch it triggers the
  // next invocation (chain-1) to drain more of the queue. Hard-capped so cost
  // is bounded: a daily cron of limit=2&chain=3 processes up to ~8 items/day.
  const chain = Math.max(0, Math.min(5, Number(url.searchParams.get('chain')) || 0))

  const summary = await runPipeline(payload, { researchLimit })

  // Decide whether to chain: only if budget remains, we made progress this run
  // (avoids looping on persistent errors), and fresh items remain.
  if (!ingestOnly && chain > 0 && summary.drafted > 0) {
    const remaining = await payload.find({
      collection: 'news-items',
      where: { status: { equals: 'new' } },
      limit: 0,
    })
    if (remaining.totalDocs > 0) {
      const secret = process.env.NEWS_PIPELINE_SECRET ?? process.env.CRON_SECRET ?? ''
      const next = `${url.origin}/api/agents/news-pipeline?limit=${researchLimit}&chain=${chain - 1}&key=${encodeURIComponent(secret)}`
      // Fire the next invocation AFTER the response is sent (Next `after`).
      after(async () => {
        try {
          await fetch(next, { method: 'GET' })
        } catch {
          /* best-effort */
        }
      })
    }
  }

  return NextResponse.json({ ok: true, ranAt: new Date().toISOString(), chain, ...summary })
}

export async function POST(req: NextRequest) {
  return run(req)
}

export async function GET(req: NextRequest) {
  return run(req)
}
