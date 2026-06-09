/**
 * Notification fan-out for the news pipeline.
 *
 * After a run drafts new items, we notify the editor via:
 *  1. Expo push — every active token in the push-tokens collection (used by
 *     the native app in Phase 4).
 *  2. A generic webhook (NOTIFY_WEBHOOK_URL) — works *today*, before the app
 *     exists. Point it at an ntfy.sh topic, a Discord/Slack incoming webhook,
 *     etc. and you get a phone notification immediately.
 *
 * Never throws — notification failure must not fail the pipeline.
 */

import type { Payload } from 'payload'

const EXPO_PUSH = 'https://exp.host/--/api/v2/push/send'

export async function notifyDraftsReady(
  payload: Payload,
  draftedCount: number,
): Promise<void> {
  if (draftedCount <= 0) return

  const title = 'The New India Government'
  const body =
    draftedCount === 1
      ? '1 new fact-check draft is ready to review.'
      : `${draftedCount} new fact-check drafts are ready to review.`

  // 1. Generic webhook (works before the app exists)
  const webhook = process.env.NOTIFY_WEBHOOK_URL
  if (webhook) {
    try {
      const isNtfy = webhook.includes('ntfy.sh')
      await fetch(webhook, {
        method: 'POST',
        headers: isNtfy
          ? { Title: title, Tags: 'newspaper', Click: 'https://newindiagovernment.com/admin' }
          : { 'content-type': 'application/json' },
        body: isNtfy ? body : JSON.stringify({ title, body, content: `${title}: ${body}` }),
        signal: AbortSignal.timeout(8000),
      })
    } catch {
      /* ignore */
    }
  }

  // 2. Expo push to every active registered token
  try {
    const tokens = await payload.find({
      collection: 'push-tokens',
      where: { active: { equals: true } },
      limit: 100,
    })
    const messages = (tokens.docs as Array<{ token?: string }>)
      .map((t) => t.token)
      .filter((t): t is string => Boolean(t))
      .map((to) => ({
        to,
        title,
        body,
        sound: 'default',
        data: { url: '/admin', drafted: draftedCount },
      }))
    if (messages.length) {
      await fetch(EXPO_PUSH, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(messages),
        signal: AbortSignal.timeout(10000),
      })
    }
  } catch {
    /* ignore */
  }
}
