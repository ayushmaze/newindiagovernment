'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MarchField } from './MarchField'
import { Marcher } from './Marcher'
import { ShareButton } from '@/components/share/ShareButton'

const BASE = 21_900_000

export function MovementBanner() {
  const [count, setCount] = useState(BASE)
  const [joined, setJoined] = useState(false)

  useEffect(() => {
    setJoined(localStorage.getItem('nig:movement') === '1')
    // Gentle live drift so the number feels alive on every visit.
    const drift = Math.floor((Date.now() / 1000) % 90_000)
    setCount(BASE + drift)
    const id = setInterval(() => setCount((c) => c + Math.floor(Math.random() * 7) + 1), 2600)
    return () => clearInterval(id)
  }, [])

  const join = () => {
    if (joined) return
    localStorage.setItem('nig:movement', '1')
    setJoined(true)
    setCount((c) => c + 1)
  }

  return (
    <section
      className="relative overflow-hidden border-y-2 border-[var(--divider)] bg-[var(--ink)] text-[var(--bg)]"
      aria-label="The New India Government — a citizens' movement"
    >
      <MarchField count={8} />

      <div className="relative mx-auto max-w-[1440px] px-6 py-16 md:py-24">
        <div className="flex items-center gap-3 mb-6">
          <span className="float-y inline-block">
            <Marcher size={34} color="var(--pink-chip)" />
          </span>
          <span className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--pink-chip)]">
            The New India Government · A citizens&apos; movement
          </span>
        </div>

        <h2 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.92] text-[clamp(38px,8vw,104px)] max-w-[15ch]">
          One voice asks.
          <br />
          <span className="text-[var(--pink-chip)]">A million can&apos;t be ignored.</span>
        </h2>

        <p className="font-display text-[19px] md:text-[26px] leading-snug text-[var(--bg)]/80 mt-8 max-w-[58ch]">
          The New India Government isn&apos;t a party — it&apos;s a movement of citizens who read the
          evidence, ask the hard question, and share the answer. No leaders to buy off. No narrative
          to sell. Just numbers, growing, that can&apos;t be hidden.
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
              citizens and growing · the movement
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={join}
              disabled={joined}
              className="tap-shrink relative overflow-hidden bg-[var(--pink-chip)] text-[var(--ink)] px-8 py-4 font-ui font-black uppercase tracking-[0.16em] text-[13px] hover:bg-[var(--bg)] transition-colors disabled:opacity-90"
            >
              {!joined && <span className="sheen absolute inset-0" aria-hidden />}
              <span className="relative">{joined ? '✓ You’re in the movement' : 'Join the movement'}</span>
            </button>
            <Link
              href="/movement"
              className="tap-shrink inline-flex items-center gap-2 border-2 border-[var(--bg)]/40 px-7 py-4 font-ui font-bold uppercase tracking-[0.16em] text-[12px] hover:border-[var(--bg)] transition-colors"
            >
              What we stand for →
            </Link>
            <ShareButton
              text="One voice asks. A million can't be ignored. Join The New India Government — a citizens' movement for truth and accountability."
              url="/movement"
              label="Spread the word"
              className="px-5 py-4 text-[var(--bg)]/70 hover:text-[var(--bg)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
