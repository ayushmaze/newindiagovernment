import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: NextRequest) {
  let body: { email?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const { email } = body
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  const payload = await getPayload({ config })

  try {
    await payload.create({
      collection: 'newsletter-subscribers',
      data: {
        email: email.toLowerCase().trim(),
        source: 'homepage',
      },
    })
    return NextResponse.json({ ok: true })
  } catch (e: unknown) {
    const err = e as { code?: string; message?: string }
    if (err?.code === '23505' || /duplicate|unique/i.test(err?.message ?? '')) {
      // Already subscribed — silent success
      return NextResponse.json({ ok: true, already: true })
    }
    return NextResponse.json({ error: 'server' }, { status: 500 })
  }
}
