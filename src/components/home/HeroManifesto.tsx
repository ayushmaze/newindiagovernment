import Link from 'next/link'
import { StatCounter } from './StatCounter'

type Props = {
  factChecks: number
  petitionSignatures: number
  articlesPublished: number
}

export function HeroManifesto({
  factChecks,
  petitionSignatures,
  articlesPublished,
}: Props) {
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

      <div className="relative mx-auto max-w-[1440px] px-6 py-16 md:py-24">
        {/* Kicker */}
        <div className="flex items-center gap-3 mb-8 fade-up">
          <span className="h-px w-10 bg-[var(--ink)]"></span>
          <span className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--red-tag)]">
            A Citizens&apos; Movement · Est. 2026
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
        <p className="font-display text-[clamp(20px,2.2vw,28px)] leading-snug text-[var(--ink-2)] mt-10 max-w-[60ch] fade-up fade-up-delay-2">
          We&apos;re building <strong className="text-[var(--ink)]">The New India Government</strong> — a
          citizens-led platform built on <strong>truth</strong>, <strong>transparency</strong>, and
          your <strong>voice</strong>. No party line. No paid narratives. Just evidence, accountability,
          and the courage to ask what every Indian deserves to know.
        </p>

        {/* CTAs */}
        <div className="mt-12 flex flex-wrap gap-4 fade-up fade-up-delay-3">
          <Link
            href="#join"
            className="group inline-flex items-center gap-3 bg-[var(--ink)] text-[var(--bg)] px-7 py-4 hover:bg-[var(--red-tag)] transition-colors"
          >
            <span className="font-ui font-bold uppercase tracking-[0.18em] text-[12px]">
              Join the Movement
            </span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="#evidence"
            className="group inline-flex items-center gap-3 bg-transparent text-[var(--ink)] px-7 py-4 border-2 border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors"
          >
            <span className="font-ui font-bold uppercase tracking-[0.18em] text-[12px]">
              See the Evidence
            </span>
          </Link>
        </div>

        {/* Stat counters */}
        <div className="mt-16 md:mt-20 pt-10 border-t border-[var(--ink)]/20 grid grid-cols-2 md:grid-cols-4 gap-10 fade-up fade-up-delay-4">
          <StatCounter
            end={articlesPublished}
            label="Investigations Published"
            sublabel="Independent · Verified · Cited"
          />
          <StatCounter
            end={factChecks}
            label="Government Claims Fact-Checked"
            sublabel="Across budget, jobs, defence"
          />
          <StatCounter
            end={petitionSignatures}
            label="Signatures On Petitions"
            sublabel="From every state of India"
          />
          <StatCounter
            end={1.4}
            decimals={1}
            suffix="B"
            label="Indians We Refuse To Mislead"
            sublabel="Population we serve"
          />
        </div>
      </div>
    </section>
  )
}
