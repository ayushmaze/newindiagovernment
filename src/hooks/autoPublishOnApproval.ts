import type { CollectionBeforeChangeHook } from 'payload'

/**
 * When an editor flips `reviewStatus` to `reviewed-approved`, automatically
 * publish the article — set `status: 'published'` and stamp `publishedAt`
 * (if blank). This removes a second-click gotcha for AI fact-check drafts.
 *
 * Inverse: if an approved article is later marked `reviewed-rejected`,
 * we move it back to `draft` so it stops appearing on the public site.
 */
export const autoPublishOnApproval: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  operation,
}) => {
  if (operation !== 'update' && operation !== 'create') return data

  const prev = (originalDoc ?? {}) as Record<string, unknown>
  const nextReview = (data as Record<string, unknown>).reviewStatus
  const prevReview = prev.reviewStatus

  // Approve → publish
  if (nextReview === 'reviewed-approved' && prevReview !== 'reviewed-approved') {
    if (!(data as Record<string, unknown>).status || (data as Record<string, unknown>).status === 'draft') {
      ;(data as Record<string, unknown>).status = 'published'
    }
    if (!(data as Record<string, unknown>).publishedAt) {
      ;(data as Record<string, unknown>).publishedAt = new Date().toISOString()
    }
  }

  // Reject → demote
  if (nextReview === 'reviewed-rejected' && prevReview !== 'reviewed-rejected') {
    ;(data as Record<string, unknown>).status = 'draft'
  }

  return data
}
