'use client'

/**
 * DailyJumlaBar — the top-of-page red ribbon.
 *
 * Auto-cycles through the most damning Broken / Jumla promises from the
 * Jumla Meter. Honours prefers-reduced-motion (freezes on a single entry
 * when motion is reduced).
 *
 * Visually loud on purpose — this is the first thing every visitor sees,
 * the hook that drives them into /promises and /quiz.
 */

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { PROMISES } from '@/lib/promises'
import { useLang } from '@/components/i18n/LangProvider'

type Lead = {
  promise: string
  verdictLabel: 'BROKEN' | 'JUMLA'
  punchline: string
  yearsSince: number
}

export function DailyJumlaBar() {
  const leads = useMemo<Lead[]>(() => {
    const now = new Date().getFullYear()
    return PROMISES.filter((p) => p.verdict === 'broken' || p.verdict === 'jumla')
      .slice(0, 4)
      .map((p) => ({
        promise: p.promise,
        verdictLabel: p.verdict === 'jumla' ? 'JUMLA' : 'BROKEN',
        punchline: p.punchline,
        yearsSince: now - parseInt(p.year, 10),
      }))
  }, [])

  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (leads.length <= 1) return
    const motionOff =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (motionOff) return
    if (paused) return
    const id = window.setInterval(() => {
      setI((cur) => (cur + 1) % leads.length)
    }, 4200)
    return () => window.clearInterval(id)
  }, [leads.length, paused])

  const { t } = useLang()

  if (leads.length === 0) return null
  const lead = leads[i]

  return (
    <div
      role="region"
      aria-label="Today's biggest jumla"
      className="relative bg-[var(--red-tag)] text-white border-b-2 border-black/20 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* subtle diagonal lines */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(255,255,255,.0) 0 14px, rgba(255,255,255,.08) 14px 16px)',
        }}
      />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 py-2.5 sm:py-3.5 flex items-center gap-2.5 sm:gap-5">
        {/* Pulse dot + label (label hidden on phones to free room for the claim) */}
        <span className="flex items-center gap-2 shrink-0">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-70" />
            <span className="relative inline-block h-2 w-2 rounded-full bg-white" />
          </span>
          <span className="hidden sm:inline font-ui font-black uppercase tracking-[0.22em] text-[10px] sm:text-[11px]">
            {t('dailyJumla.kicker')}
          </span>
        </span>

        <span aria-hidden className="hidden sm:inline-block h-3 w-px bg-white/40 shrink-0" />

        {/* Verdict chip — compact on phones (just the verdict, no age) */}
        <span className="font-ui font-black uppercase tracking-[0.12em] sm:tracking-[0.16em] text-[9px] sm:text-[10px] bg-black/85 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 shrink-0">
          {lead.verdictLabel}
          <span className="hidden sm:inline"> · {lead.yearsSince}y old</span>
        </span>

        {/* Rotating claim — the priority; now has room on every screen */}
        <div
          key={i}
          className="flex-1 min-w-0 font-display text-[12.5px] sm:text-[15px] md:text-[17px] leading-tight truncate animate-[jumla-roll_400ms_ease-out]"
        >
          <span className="font-bold">&ldquo;{lead.promise}&rdquo;</span>{' '}
          <span className="text-white/85 hidden md:inline">— {lead.punchline}</span>
        </div>

        {/* CTA — icon-tightened on phones */}
        <Link
          href="/promises"
          className="shrink-0 group font-ui font-black uppercase tracking-[0.12em] sm:tracking-[0.16em] text-[10px] sm:text-[11px] bg-white text-[var(--red-tag)] px-2.5 py-1 sm:px-4 sm:py-2 hover:bg-black hover:text-white transition-colors whitespace-nowrap"
          aria-label="See the full Jumla Meter"
        >
          {t('dailyJumla.cta')}{' '}
          <span className="transition-transform group-hover:translate-x-0.5 inline-block">→</span>
        </Link>
      </div>

      <style>{`
        @keyframes jumla-roll {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
