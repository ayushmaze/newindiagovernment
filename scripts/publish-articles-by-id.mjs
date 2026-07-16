#!/usr/bin/env node
/**
 * Publish specific articles by ID — the same path the admin review flow uses.
 *
 * Sets reviewStatus = 'reviewed-approved' on each given article; the
 * autoPublishOnApproval beforeChange hook flips status to 'published' and
 * stamps publishedAt. Scoped to the IDs passed on the command line so an
 * operator can approve a reviewed subset without touching other drafts.
 *
 *   DATABASE_URI=<uri> PAYLOAD_SECRET=<secret> \
 *   node scripts/publish-articles-by-id.mjs 17 18 19
 */

if (!process.env.DATABASE_URI) {
  console.error('DATABASE_URI is required')
  process.exit(1)
}

const ids = process.argv.slice(2)
if (ids.length === 0) {
  console.error('usage: node scripts/publish-articles-by-id.mjs <id> [<id> ...]')
  process.exit(1)
}

const { getPayload } = await import('payload')
const config = (await import('../src/payload.config.ts')).default
const payload = await getPayload({ config })

for (const id of ids) {
  const updated = await payload.update({
    collection: 'articles',
    id,
    data: { reviewStatus: 'reviewed-approved' },
    draft: false,
  })
  console.log(`[publish] ${id} "${updated.title}" -> status=${updated.status} slug=${updated.slug}`)
}

console.log('[publish] done')
process.exit(0)
