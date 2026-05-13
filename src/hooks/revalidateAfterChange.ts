import type { CollectionAfterChangeHook } from 'payload'

export const revalidateAfterChange =
  (tag: string): CollectionAfterChangeHook =>
  async ({ doc }) => {
    const secret = process.env.REVALIDATE_SECRET
    const baseUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL ?? 'http://localhost:3000'

    if (!secret) return doc

    try {
      await fetch(`${baseUrl}/api/revalidate?tag=${tag}&secret=${secret}`, {
        method: 'POST',
      })
    } catch {
      // Revalidation failure is non-critical
    }

    return doc
  }
