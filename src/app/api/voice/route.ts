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
    text?: string
    displayName?: string
    option?: string
    turnstileToken?: string
  }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const { text, displayName, option, turnstileToken } = body

  if (!text || text.trim().length === 0) {
    return NextResponse.json({ error: 'text_required' }, { status: 400 })
  }

  if (text.length > 1000) {
    return NextResponse.json({ error: 'text_too_long' }, { status: 400 })
  }

  const ok = await verifyTurnstile(turnstileToken ?? null, ip)
  if (!ok) return NextResponse.json({ error: 'turnstile' }, { status: 403 })

  const payload = await getPayload({ config })

  await payload.create({
    collection: 'voices',
    data: {
      text: text.trim().slice(0, 1000),
      displayName: displayName?.trim().slice(0, 80) || undefined,
      status: 'pending',
      voteOption: option as 'yes-time-for-change' | 'no-current-fine' | 'undecided' | undefined,
    },
  })

  return NextResponse.json({ ok: true })
}
