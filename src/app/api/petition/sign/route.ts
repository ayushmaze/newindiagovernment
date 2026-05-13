import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { sha256 } from '@/lib/hash'
import { verifyTurnstile } from '@/lib/turnstile'
import { checkRateLimit } from '@/lib/ratelimit'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const ua = req.headers.get('user-agent') ?? 'unknown'
  const ipHash = sha256(ip + ua)

  if (!checkRateLimit(ipHash)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  let body: {
    petitionId?: string
    firstName?: string
    lastName?: string
    city?: string
    comment?: string
    displayPublic?: boolean
    turnstileToken?: string
  }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const { petitionId, firstName, lastName, city, comment, displayPublic, turnstileToken } = body

  if (!petitionId || !firstName || !lastName) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }

  const ok = await verifyTurnstile(turnstileToken ?? null, ip)
  if (!ok) return NextResponse.json({ error: 'turnstile' }, { status: 403 })

  const salt = process.env.VOTE_SALT ?? 'default-salt'
  const voterHash = sha256(`${salt}|${petitionId}|${ip}|${ua}|petition-sign-v1`)

  const payload = await getPayload({ config })

  try {
    await payload.create({
      collection: 'petition-signatures',
      data: {
        petition: petitionId,
        firstName: firstName.trim().slice(0, 60),
        lastName: lastName.trim().slice(0, 60),
        city: city?.trim().slice(0, 80),
        country: 'India',
        voterHash,
        comment: comment?.trim().slice(0, 500),
        displayPublic: displayPublic !== false,
        verified: true,
      },
    })
    return NextResponse.json({ ok: true })
  } catch (e: unknown) {
    const err = e as { code?: string; message?: string }
    if (err?.code === '23505' || /duplicate|unique/i.test(err?.message ?? '')) {
      // Already signed — return success silently
      return NextResponse.json({ ok: true, already: true })
    }
    console.error('[petition/sign]', e)
    return NextResponse.json({ error: 'server' }, { status: 500 })
  }
}
