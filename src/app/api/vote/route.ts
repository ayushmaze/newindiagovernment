import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { sha256 } from '@/lib/hash'
import { verifyTurnstile } from '@/lib/turnstile'
import { checkRateLimit } from '@/lib/ratelimit'

export async function GET() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'votes',
    limit: 100000,
    depth: 0,
  })

  const totals = docs.reduce<Record<string, number>>((a, d) => {
    a[d.option] = (a[d.option] ?? 0) + 1
    return a
  }, {})

  return NextResponse.json({ totals, total: docs.length })
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const ua = req.headers.get('user-agent') ?? 'unknown'
  const ipHash = sha256(ip + ua)

  if (!checkRateLimit(ipHash)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  let body: { option?: string; turnstileToken?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 })
  }

  const { option, turnstileToken } = body
  if (!option) return NextResponse.json({ error: 'no option' }, { status: 400 })

  const ok = await verifyTurnstile(turnstileToken ?? null, ip)
  if (!ok) return NextResponse.json({ error: 'turnstile' }, { status: 403 })

  const salt = process.env.VOTE_SALT ?? 'default-salt'
  const voterHash = sha256(`${salt}|${ip}|${ua}|vote-poll-v1`)

  const payload = await getPayload({ config })

  try {
    await payload.create({
      collection: 'votes',
      data: {
        option,
        voterHash,
        userAgent: ua.slice(0, 200),
        ipCountry: req.headers.get('cf-ipcountry') ?? undefined,
      },
    })
    return NextResponse.json({ ok: true })
  } catch (e: unknown) {
    const err = e as { code?: string; message?: string }
    if (err?.code === '23505' || /duplicate|unique/i.test(err?.message ?? '')) {
      return NextResponse.json({ ok: true, already: true }, { status: 409 })
    }
    console.error('[vote POST]', e)
    return NextResponse.json({ error: 'server' }, { status: 500 })
  }
}
