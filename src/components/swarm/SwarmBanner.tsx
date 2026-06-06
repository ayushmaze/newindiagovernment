'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CockroachField } from './CockroachField'
import { Cockroach } from './Cockroach'
import { ShareButton } from '@/components/share/ShareButton'

/** Base count nods to the real ~22M followers the CJP movement crossed in 2026. */
const BASE = 21_900_000

export function SwarmBanner() {
  const [count, setCount] = useState(BASE)
  const [joined, setJoined] = useState(false)

  useEffect(() => {
    setJoined(localStorage.getItem('nig:swarm') === '1')
    // Gentle live drift so the number feels alive on every visit.
    const drift = Math.floor((Date.now() / 1000) % 90_000)
    setCount(BASE + drift)
    const id = setInterval(() => setCount((c) => c + Math.floor(Math.random() * 7) + 1), 2600)
    return () => clearInterval(id)
  }, [])

  const join = () => {
    if (joined) return
    localStorage.setItem('nig:swarm', '1')
    setJoined(true)
    setCount((c) => c + 1)
  }

  return (
    <section
      className="relative overflow-hidden border-y-2 border-[var(--divider)] bg-[var(--ink)] text-[var(--bg)]"
      aria-label="The Swarm — solidarity with India's youth"
    >
      <CockroachField count={8} />

      <div className="relative mx-auto max-w-[1440px] px-6 py-16 md:py-24">
        <div className="flex items-center gap-3 mb-6">
          <span className="float-y inline-block">
            <Cockroach size={34} color="var(--pink-chip)" />
          </span>
          <span className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--pink-chip)]">
            Inspired by the Cockroach Janta Party
          </span>
        </div>

        <h2 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.92] text-[clamp(38px,8vw,104px)] max-w-[14ch]">
          They called the
          <br />
          unemployed
          <br />
          <span className="text-[var(--pink-chip)]">cockroaches.</span>
        </h2>

        <p className="font-display text-[19px] md:text-[26px] leading-snug text-[var(--bg)]/80 mt-8 max-w-[58ch]">
          So millions wore it like a badge. A satirical movement became the largest youth
          mobilisation of 2026 — overtaking the ruling party&apos;s own following in days. We
          stand with the right to ask questions without being called a pest.
        </p>

        {/* Live counter */}
        <div className="mt-12 flex flex-col sm:flex-row sm:items-end gap-8">
          <div>
            <div className="font-display font-black text-[clamp(44px,9vw,88px)] leading-none tabular-nums">
              {count.toLocaleString('en-IN')}
            </div>
            <div className="font-ui uppercase tracking-[0.18em] text-[11px] text-[var(--pink-chip)] mt-3">
              <span className="relative inline-flex h-2 w-2 mr-2 align-middle">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--pink-chip)] opacity-60 pulse-dot" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--pink-chip)]" />
              </span>
              strong and growing · the swarm
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={join}
              disabled={joined}
              className="tap-shrink relative overflow-hidden bg-[var(--pink-chip)] text-[var(--ink)] px-8 py-4 font-ui font-black uppercase tracking-[0.16em] text-[13px] hover:bg-[var(--bg)] transition-colors disabled:opacity-90"
            >
              {!joined && <span className="sheen absolute inset-0" aria-hidden />}
              <span className="relative">{joined ? '✓ You’re in the swarm' : 'Join the swarm 🪳'}</span>
            </button>
            <Link
              href="/cockroach-janta-party"
              className="tap-shrink inline-flex items-center gap-2 border-2 border-[var(--bg)]/40 px-7 py-4 font-ui font-bold uppercase tracking-[0.16em] text-[12px] hover:border-[var(--bg)] transition-colors"
            >
              The full story →
            </Link>
            <ShareButton
              text="They called India's unemployed youth 'cockroaches'. Millions joined the Swarm. 🪳"
              url="/cockroach-janta-party"
              label="Spread the swarm"
              className="px-5 py-4 text-[var(--bg)]/70 hover:text-[var(--bg)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
