'use client'

/**
 * WhyItMatters — sourced persuasion block.
 *
 * Four short, citable arguments for why an accountability platform exists,
 * each backed by primary or near-primary data (CMIE, NSO, ICRIER, on-record
 * statements). Each card has its own scroll-reveal so the section *unfolds*
 * as the user reads.
 *
 * Editorial intent: the case for change is data. No partisan rhetoric.
 */

import Link from 'next/link'
import { Reveal } from '@/components/animation/Reveal'
import { T } from '@/components/i18n/T'
import { useLang } from '@/components/i18n/LangProvider'

const POINTS = [
  {
    n: '01',
    accent: 'red' as const,
    bigStat: '~70 lakh',
    statSub: 'net jobs LOST · CMIE',
    titleKey: 'wim.point1Title' as const,
    titleFallback: 'Jobs lost, not created',
    bodyKey: 'wim.point1Body' as const,
    bodyFallback:
      '~70 lakh net jobs lost between 2016-17 and 2022-23 (CMIE) — the opposite of the headline promise of 2 crore new jobs a year.',
  },
  {
    n: '02',
    accent: 'red' as const,
    bigStat: '~14%',
    statSub: 'manufacturing share, vs 25% promised · NSO',
    titleKey: 'wim.point2Title' as const,
    titleFallback: 'Manufacturing is shrinking, not surging',
    bodyKey: 'wim.point2Body' as const,
    bodyFallback:
      'Promised: 25% of GDP by 2025. Actual: fell to a roughly 20-year low near 14% (NSO data).',
  },
  {
    n: '03',
    accent: 'red' as const,
    bigStat: '₹0',
    statSub: 'arrived per account · on-record jumla',
    titleKey: 'wim.point3Title' as const,
    titleFallback: 'A jumla, on record',
    bodyKey: 'wim.point3Body' as const,
    bodyFallback:
      "BJP president Amit Shah called the ₹15-lakh-per-account promise a 'jumla' — that's how the word entered India's political vocabulary.",
  },
  {
    n: '04',
    accent: 'gold' as const,
    bigStat: '<50%',
    statSub: 'of doubling target met · ICRIER',
    titleKey: 'wim.point4Title' as const,
    titleFallback: 'Farmers waiting on a doubling',
    bodyKey: 'wim.point4Body' as const,
    bodyFallback:
      'ICRIER’s independent analysis: actual farm income progress is well under half of the 2022 target.',
  },
]

export function WhyItMatters() {
  const { t } = useLang()
  return (
    <section
      className="relative bg-[var(--bg)] border-b-2 border-[var(--divider)]"
      aria-label="Why a citizens' platform now"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:py-24">
        <Reveal>
          <div className="flex items-center gap-3 mb-6">
            <span className="font-ui font-black uppercase tracking-[0.22em] text-[11px] text-[var(--red-tag)]">
              <T k="wim.kicker" fallback="Why a citizens' platform now" />
            </span>
            <span aria-hidden className="h-px flex-1 max-w-[180px] bg-[var(--ink)]/15" />
          </div>
          <h2 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.96] text-[clamp(32px,5.6vw,68px)] text-[var(--ink)] max-w-[22ch]">
            <T
              k="wim.heading"
              fallback="If the numbers don't add up, neither does the promise."
            />
          </h2>
          <p className="font-display text-[clamp(17px,1.6vw,22px)] leading-snug text-[var(--ink-2)] mt-6 max-w-[60ch]">
            <T
              k="wim.sub"
              fallback="Every line below is a public, citable data point. Read it, share it, demand answers — that's how we make the next promise harder to break."
            />
          </p>
        </Reveal>

        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {POINTS.map((p, i) => (
            <Reveal key={p.n} delay={i * 90}>
              <article className="group relative h-full bg-[var(--bg-soft)] border border-[var(--ink)]/10 p-6 md:p-8 transition-all hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.25)] hover:border-[var(--ink)]/30 hover:-translate-y-0.5 duration-200">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <span className="font-ui font-black uppercase tracking-[0.22em] text-[10px] text-[var(--ink-3)]">
                    {p.n}
                  </span>
                  <div className="text-right">
                    <div
                      className={`font-display font-black tabular-nums leading-none text-[clamp(28px,4vw,40px)] ${
                        p.accent === 'red' ? 'text-[var(--red-tag)]' : 'text-[var(--gold-petition)]'
                      }`}
                    >
                      {p.bigStat}
                    </div>
                    <p className="font-ui uppercase tracking-[0.14em] text-[9px] text-[var(--ink-3)] mt-1">
                      {p.statSub}
                    </p>
                  </div>
                </div>
                <h3 className="font-display font-black uppercase tracking-tight leading-tight text-[clamp(20px,2.4vw,28px)] text-[var(--ink)]">
                  <T k={p.titleKey} fallback={p.titleFallback} />
                </h3>
                <p className="font-body text-[15px] md:text-[16px] leading-relaxed text-[var(--ink-2)] mt-4">
                  <T k={p.bodyKey} fallback={p.bodyFallback} />
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={420}>
          <div className="mt-12 md:mt-14 text-center">
            <Link
              href="/promises"
              className="group inline-flex items-center gap-3 bg-[var(--ink)] text-[var(--bg)] px-7 py-4 hover:bg-[var(--red-tag)] transition-colors tap-shrink"
            >
              <span className="font-ui font-bold uppercase tracking-[0.18em] text-[12px]">
                {t('wim.cta')}
              </span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
