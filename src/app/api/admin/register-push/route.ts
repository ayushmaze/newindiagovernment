import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const runtime = 'nodejs'

/**
 * POST /api/admin/register-push  — the native app calls this on launch to
 * register/refresh its Expo push token. Auth: logged-in admin/editor.
 * Body: { token: string, label?: string, platform?: 'android'|'ios'|'web' }
 */
export async function POST(req: NextRequest) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: req.headers })
  if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const role = (user as { role?: string }).role
  if (!role || !['admin', 'editor'].includes(role)) {
    return NextResponse.json({ error: 'forbidden' }, { status: 403 })
  }

  let body: { token?: string; label?: string; platform?: string }
  try {
    body = (await req.json()) as typeof body
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }
  if (!body.token) return NextResponse.json({ error: 'token_required' }, { status: 400 })

  // Upsert by token
  const existing = await payload.find({
    collection: 'push-tokens',
    where: { token: { equals: body.token } },
    limit: 1,
  })
  if (existing.docs[0]) {
    await payload.update({
      collection: 'push-tokens',
      id: existing.docs[0].id,
      data: { active: true, label: body.label, platform: body.platform } as never,
    })
    return NextResponse.json({ ok: true, updated: true })
  }
  await payload.create({
    collection: 'push-tokens',
    data: {
      token: body.token,
      label: body.label,
      platform: body.platform,
      active: true,
      owner: user.id,
    } as never,
  })
  return NextResponse.json({ ok: true, created: true })
}
