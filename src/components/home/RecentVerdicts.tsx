'use client'

/**
 * RecentVerdicts — magazine card grid of the most-cited fact-check verdicts.
 *
 * Uses the same FALLBACK_TICKER_ITEMS as the live ticker but lays them out
 * as tap-friendly cards with verdict chips, credibility scores, and source
 * tags. Where the ticker is "always-on", this grid is the scrollable index
 * the visitor uses to dig in. Cards scroll-reveal in series.
 */

import Link from 'next/link'
import { Reveal } from '@/components/animation/Reveal'
import { RubberStamp } from '@/components/fx/RubberStamp'
import { TiltCard } from '@/components/fx/TiltCard'
import {
  FALLBACK_TICKER_ITEMS,
  type FallbackVerdict,
} from '@/lib/factCheckFallback'

const VERDICT_DISPLAY: Record<
  FallbackVerdict,
  { label: string; bg: string; fg: string }
> = {
  false: { label: 'FALSE', bg: 'var(--red-tag)', fg: '#ffffff' },
  misleading: { label: 'MISLEADING', bg: 'var(--red-tag)', fg: '#ffffff' },
  'mostly-false': { label: 'MOSTLY FALSE', bg: '#e35d5d', fg: '#ffffff' },
  mixed: { label: 'MIXED', bg: 'var(--gold-petition)', fg: '#ffffff' },
  true: { label: 'TRUE', bg: '#3a7d44', fg: '#ffffff' },
}

export function RecentVerdicts() {
  // Show the six most recent / impactful items as cards.
  const items = FALLBACK_TICKER_ITEMS.slice(0, 6)

  return (
    <section
      className="bg-[var(--bg-soft)] border-b-2 border-[var(--divider)]"
      aria-label="Recent verdicts"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:py-24">
        <Reveal>
          <div className="flex items-end justify-between gap-6 flex-wrap mb-10 md:mb-14">
            <div>
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <p className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--red-tag)]">
                  Recent Verdicts · Citable
                </p>
                <RubberStamp label="Fact-Checked" angle={-6} />
              </div>
              <h2 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5.6vw,68px)] text-[var(--ink)]">
                The receipts,
                <br />
                in plain sight.
              </h2>
            </div>
            <Link
              href="/promises"
              className="group inline-flex items-center gap-2 font-ui font-bold uppercase tracking-[0.18em] text-[12px] text-[var(--ink)] border-b-2 border-[var(--ink)] pb-1 hover:text-[var(--red-tag)] hover:border-[var(--red-tag)] transition-colors"
            >
              See the full Jumla Meter
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {items.map((it, i) => {
            const v = VERDICT_DISPLAY[it.verdict]
            const body = (
              <article className="group h-full bg-white border border-[var(--ink)]/12 p-6 md:p-7 transition-all hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 hover:border-[var(--ink)]/30 duration-200">
                {/* Header strip — verdict + credibility */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span
                    className="font-ui font-black uppercase tracking-[0.14em] text-[10px] px-2.5 py-1 shrink-0"
                    style={{ background: v.bg, color: v.fg }}
                  >
                    {v.label}
                  </span>
                  <span
                    className="font-ui tabular-nums font-bold text-[16px] text-[var(--ink)] flex items-baseline gap-1"
                    title={`Credibility of claim: ${it.credibilityScore.toFixed(1)}/10`}
                  >
                    <span>{it.credibilityScore.toFixed(1)}</span>
                    <span className="text-[10px] text-[var(--ink-3)]">/10</span>
                  </span>
                </div>

                {/* The claim */}
                <p className="font-display text-[17px] md:text-[19px] leading-snug text-[var(--ink)] min-h-[110px]">
                  {it.claim}
                </p>

                {/* Footer */}
                <div className="mt-5 pt-4 border-t border-[var(--hairline)] flex items-center justify-between">
                  <span className="font-ui uppercase tracking-[0.16em] text-[10px] text-[var(--ink-3)]">
                    Sourced · Free to verify
                  </span>
                  <span
                    className="font-ui font-bold uppercase tracking-[0.16em] text-[10px] text-[var(--ink)] group-hover:text-[var(--red-tag)] transition-colors"
                    aria-hidden
                  >
                    Read →
                  </span>
                </div>
              </article>
            )
            return (
              <Reveal key={it.id} delay={i * 60} className="h-full">
                <TiltCard className="h-full">
                  {it.href ? (
                    <Link
                      href={it.href}
                      className="block h-full"
                      aria-label={`Read the verdict: ${it.claim}`}
                    >
                      {body}
                    </Link>
                  ) : (
                    body
                  )}
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
