#!/usr/bin/env node
/**
 * Publish every AI draft awaiting review.
 *
 * Sets reviewStatus = 'reviewed-approved' on each article currently in
 * 'review-pending'; the autoPublishOnApproval beforeChange hook flips
 * status to 'published' and stamps publishedAt, exactly as the admin UI
 * review flow does. Runs against whatever DATABASE_URI is supplied:
 *
 *   DATABASE_URI=<prod uri> PAYLOAD_SECRET=<prod secret> \
 *   pnpm exec tsx scripts/publish-pending-drafts.mjs
 */

if (!process.env.DATABASE_URI) {
  console.error('DATABASE_URI is required')
  process.exit(1)
}

const { getPayload } = await import('payload')
const config = (await import('../src/payload.config.ts')).default

const payload = await getPayload({ config })

const pending = await payload.find({
  collection: 'articles',
  where: { reviewStatus: { equals: 'review-pending' } },
  limit: 100,
  draft: true,
})

console.log(`[publish] ${pending.docs.length} review-pending drafts found`)

for (const doc of pending.docs) {
  const updated = await payload.update({
    collection: 'articles',
    id: doc.id,
    data: { reviewStatus: 'reviewed-approved' },
    draft: false,
  })
  console.log(
    `[publish] ${doc.id} "${doc.title}" -> status=${updated.status} reviewStatus=${updated.reviewStatus} slug=${updated.slug}`,
  )
}

console.log('[publish] done')
process.exit(0)
