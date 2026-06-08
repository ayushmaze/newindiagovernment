import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const runtime = 'nodejs'

/**
 * POST /api/admin/news-review  — the one-tap action behind the admin app.
 *
 * Body: { newsItemId: string, action: 'publish' | 'reject' }
 *
 * - publish: flips the linked article to `published` (+ publishedAt) and the
 *   NewsItem to `published`.
 * - reject:  marks the NewsItem `rejected` and leaves the article a draft.
 *
 * Auth: a logged-in user (Payload JWT/cookie) with role admin or editor.
 * Nothing here runs an LLM — it just promotes an already-reviewed draft.
 */

export async function POST(req: NextRequest) {
  const payload = await getPayload({ config })

  // Authenticate the caller via Payload (Authorization: JWT <token> or cookie)
  const { user } = await payload.auth({ headers: req.headers })
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }
  const role = (user as { role?: string }).role
  if (!role || !['admin', 'editor'].includes(role)) {
    return NextResponse.json({ error: 'forbidden', need: 'admin|editor' }, { status: 403 })
  }

  let body: { newsItemId?: string; action?: string }
  try {
    body = (await req.json()) as typeof body
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const { newsItemId, action } = body
  if (!newsItemId || !action || !['publish', 'reject'].includes(action)) {
    return NextResponse.json(
      { error: 'bad_request', need: { newsItemId: 'string', action: 'publish|reject' } },
      { status: 400 },
    )
  }

  const item = (await payload
    .findByID({ collection: 'news-items', id: newsItemId, depth: 0 })
    .catch(() => null)) as { id: string; linkedArticle?: string | { id: string } } | null

  if (!item) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  if (action === 'reject') {
    await payload.update({
      collection: 'news-items',
      id: newsItemId,
      data: { status: 'rejected', reviewedBy: user.id },
    })
    return NextResponse.json({ ok: true, action: 'reject', newsItemId })
  }

  // publish
  const articleId =
    typeof item.linkedArticle === 'object' ? item.linkedArticle?.id : item.linkedArticle
  if (!articleId) {
    return NextResponse.json({ error: 'no_linked_article' }, { status: 409 })
  }

  await payload.update({
    collection: 'articles',
    id: articleId,
    data: { status: 'published', publishedAt: new Date().toISOString() },
  })
  await payload.update({
    collection: 'news-items',
    id: newsItemId,
    data: { status: 'published', reviewedBy: user.id },
  })

  return NextResponse.json({ ok: true, action: 'publish', newsItemId, articleId })
}
