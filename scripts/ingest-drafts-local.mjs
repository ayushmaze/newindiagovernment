#!/usr/bin/env node
/**
 * File /newsrun articles as drafts directly via the Payload local API —
 * the same createArticleFromAgent path the fact-check-ingest endpoint uses.
 * Used when the remote ingest secret isn't available to the local session.
 *
 *   DATABASE_URI=<uri> PAYLOAD_SECRET=<secret> \
 *   node scripts/ingest-drafts-local.mjs /tmp/newsrun-1.json [...]
 *
 * Everything lands draft + review-pending. Nothing publishes.
 */

if (!process.env.DATABASE_URI) {
  console.error('DATABASE_URI is required')
  process.exit(1)
}

import { readFileSync } from 'node:fs'

const files = process.argv.slice(2)
if (files.length === 0) {
  console.error('usage: node scripts/ingest-drafts-local.mjs <payload.json> [...]')
  process.exit(1)
}

const { getPayload } = await import('payload')
const config = (await import('../src/payload.config.ts')).default
const { createArticleFromAgent } = await import('../src/lib/factCheck/persist.ts')

const payload = await getPayload({ config })

for (const f of files) {
  const body = JSON.parse(readFileSync(f, 'utf8'))
  const submission = await payload.create({
    collection: 'fact-check-submissions',
    data: { topic: String(body.topic).slice(0, 1000), status: 'running' },
  })
  const { id, slug } = await createArticleFromAgent(payload, body.article, {
    submissionId: String(submission.id),
    model: body.runMeta?.model ?? 'claude-code (subscription)',
    inputTopic: String(body.topic),
    durationMs: 0,
    toolCallCount: 0,
    inputTokens: 0,
    outputTokens: 0,
    cacheReadTokens: 0,
  })
  await payload.update({
    collection: 'fact-check-submissions',
    id: submission.id,
    data: { status: 'completed', article: Number(id) },
  })
  console.log(`[ingest] ${f} -> articleId=${id} slug=${slug}`)
}

process.exit(0)
