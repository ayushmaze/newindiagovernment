import Link from 'next/link'
import { StatCounter } from './StatCounter'
import { PROMISES } from '@/lib/promises'

type Props = {
  factChecks: number
  petitionSignatures: number
  articlesPublished: number
}

// Derive Jumla scoreboard numbers from the source-of-truth promise data.
const TOTAL = PROMISES.length
const BROKEN_OR_JUMLA = PROMISES.filter(
  (p) => p.verdict === 'broken' || p.verdict === 'jumla',
).length
const AVG_DELIVERED = Math.round(
  PROMISES.reduce((acc, p) => acc + p.progress, 0) / TOTAL,
)

export function HeroManifesto({
  factChecks,
  petitionSignatures,
  articlesPublished,
}: Props) {
  // `petitionSignatures` and `articlesPublished` retained for compat with the
  // existing data fetch in page.tsx; the visible numbers are now the Jumla
  // Meter scorecard because that's far punchier than empty platform counters.
  void petitionSignatures
  void articlesPublished

  return (
    <section
      className="relative border-b-2 border-[var(--divider)] bg-[var(--bg)] overflow-hidden"
      aria-label="The New India Government — manifesto"
    >
      {/* lavender stripe backdrop, very subtle */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-lavender-stripe opacity-40 pointer-events-none"
      />

      <div className="relative mx-auto max-w-[1440px] px-6 py-14 md:py-20">
        {/* Kicker */}
        <div className="flex items-center gap-3 mb-8 fade-up">
          <span className="h-px w-10 bg-[var(--ink)]"></span>
          <span className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--red-tag)]">
            We&apos;re keeping score · Est. 2026
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.92] text-[clamp(46px,9vw,128px)] text-[var(--ink)] fade-up fade-up-delay-1 max-w-[16ch]">
          India
          <br />
          Deserves
          <br />
          <span className="relative inline-block">
            Better.
            <span
              aria-hidden="true"
              className="absolute -bottom-2 left-0 h-3 w-full bg-[var(--pink-chip)] -z-10"
            />
          </span>
        </h1>

        {/* Sub */}
        <p className="font-display text-[clamp(20px,2.2vw,28px)] leading-snug text-[var(--ink-2)] mt-8 max-w-[64ch] fade-up fade-up-delay-2">
          <strong className="text-[var(--ink)]">{TOTAL} promises tracked.</strong>{' '}
          <span className="text-[var(--red-tag)] font-bold">
            {BROKEN_OR_JUMLA} broken or called a jumla.
          </span>{' '}
          Every claim sourced, every verdict citable.
          <br className="hidden md:block" />
          No party line. Just the receipts — and the courage to keep them in plain sight.
        </p>

        {/* CTAs — direct to viral product pages, no anchor jumps */}
        <div className="mt-10 flex flex-wrap gap-4 fade-up fade-up-delay-3">
          <Link
            href="/promises"
            className="group inline-flex items-center gap-3 bg-[var(--ink)] text-[var(--bg)] px-7 py-4 hover:bg-[var(--red-tag)] transition-colors tap-shrink"
          >
            <span className="font-ui font-bold uppercase tracking-[0.18em] text-[12px]">
              See the Jumla Meter
            </span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/quiz"
            className="group inline-flex items-center gap-3 bg-[var(--pink-chip)] text-[var(--ink)] px-7 py-4 border-2 border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors tap-shrink"
          >
            <span className="font-ui font-bold uppercase tracking-[0.18em] text-[12px]">
              Play Real or Jumla?
            </span>
            <span aria-hidden>🎯</span>
          </Link>
          <Link
            href="/movement"
            className="group inline-flex items-center gap-3 bg-transparent text-[var(--ink)] px-6 py-4 border-2 border-[var(--ink)]/30 hover:border-[var(--ink)] transition-colors tap-shrink"
          >
            <span className="font-ui font-bold uppercase tracking-[0.18em] text-[12px]">
              About the Movement
            </span>
          </Link>
        </div>

        {/* Government scorecard — the actual stats people care about */}
        <div className="mt-16 md:mt-20 pt-10 border-t border-[var(--ink)]/20 fade-up fade-up-delay-4">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-ui font-black uppercase tracking-[0.22em] text-[10px] text-[var(--red-tag)]">
              The Scorecard
            </span>
            <span aria-hidden className="h-px flex-1 bg-[var(--ink)]/15" />
            <span className="font-ui uppercase tracking-[0.18em] text-[10px] text-[var(--ink-3)]">
              Verified · {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            <ShockStat
              big={`${BROKEN_OR_JUMLA}/${TOTAL}`}
              label="Promises broken or jumla"
              sub="Across jobs, money, farmers, GDP"
              accent="red"
            />
            <ShockStat
              big={`${AVG_DELIVERED}%`}
              label="Average delivery"
              sub="Weighted across every tracked headline"
            />
            <ShockStat
              big="~70L"
              label="Net jobs lost"
              sub="2016-17 → 2022-23 (CMIE)"
              accent="red"
            />
            <StatCounter
              end={factChecks}
              label="Claims fact-checked"
              sublabel="Independent · Cited · Free to verify"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function ShockStat({
  big,
  label,
  sub,
  accent,
}: {
  big: string
  label: string
  sub: string
  accent?: 'red'
}) {
  return (
    <div className="border-l-2 border-[var(--ink)]/15 pl-4">
      <div
        className={`font-display font-black tabular-nums leading-none text-[clamp(40px,5.5vw,64px)] ${
          accent === 'red' ? 'text-[var(--red-tag)]' : 'text-[var(--ink)]'
        }`}
      >
        {big}
      </div>
      <p className="font-ui font-black uppercase tracking-[0.16em] text-[11px] text-[var(--ink)] mt-3">
        {label}
      </p>
      <p className="font-ui text-[12px] text-[var(--ink-3)] mt-1 leading-snug">{sub}</p>
    </div>
  )
}
