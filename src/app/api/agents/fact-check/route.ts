import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { runFactCheck } from '@/lib/factCheck/run'

export const runtime = 'nodejs'
// Long-running route — agent loop with web_search/web_fetch can take 2–5 minutes.
export const maxDuration = 600

/**
 * POST /api/agents/fact-check
 *
 * Two trigger modes:
 *
 * 1. **Direct (admin tool / curl):** body = { topic: string }
 *    - Authenticated user must be admin or editor.
 *    - Creates a FactCheckSubmission row, runs the agent inline, returns result.
 *
 * 2. **Submission re-run:** body = { submissionId: string }
 *    - Picks up an existing submission row (e.g., re-queued by an editor)
 *      and runs the agent against it.
 *
 * Returns the resulting article id + slug, or an error.
 */
export async function POST(req: NextRequest) {
  const payload = await getPayload({ config })

  // Auth — must be logged in as admin/editor
  const authed = await payload.auth({ headers: req.headers })
  const user = authed.user
  if (!user || !(user.role === 'admin' || user.role === 'editor' || user.role === 'cowork')) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  let body: { topic?: string; submissionId?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  // Resolve / create the submission row
  let submissionId: string
  let topic: string

  if (body.submissionId) {
    const sub = await payload.findByID({
      collection: 'fact-check-submissions',
      id: body.submissionId,
    })
    if (!sub) return NextResponse.json({ error: 'submission_not_found' }, { status: 404 })
    submissionId = String(sub.id)
    topic = String(sub.topic)
  } else {
    if (!body.topic || body.topic.trim().length < 10) {
      return NextResponse.json({ error: 'topic_too_short' }, { status: 400 })
    }
    if (body.topic.length > 1000) {
      return NextResponse.json({ error: 'topic_too_long' }, { status: 400 })
    }
    const sub = await payload.create({
      collection: 'fact-check-submissions',
      data: { topic: body.topic.trim(), status: 'queued' } as never,
      user,
    })
    submissionId = String(sub.id)
    topic = body.topic.trim()
  }

  // Mark running
  await payload.update({
    collection: 'fact-check-submissions',
    id: submissionId,
    data: { status: 'running' } as never,
  })

  // Run the agent
  const result = await runFactCheck({ topic, submissionId, payload })

  // Persist outcome on the submission row
  if (result.status === 'completed') {
    await payload.update({
      collection: 'fact-check-submissions',
      id: submissionId,
      data: {
        status: 'completed',
        verdict: result.verdict,
        article: result.articleId,
        agentLog: result.log,
      } as never,
    })
    return NextResponse.json({
      ok: true,
      submissionId,
      articleId: result.articleId,
      slug: result.slug,
      verdict: result.verdict,
      meta: result.meta,
    })
  }

  await payload.update({
    collection: 'fact-check-submissions',
    id: submissionId,
    data: {
      status: 'failed',
      errorMessage: result.errorMessage,
      agentLog: result.log,
    } as never,
  })
  return NextResponse.json(
    { ok: false, submissionId, error: result.errorMessage, meta: result.meta, log: result.log },
    { status: 500 },
  )
}
