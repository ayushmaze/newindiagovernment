import Link from 'next/link'
import { Reveal } from '@/components/animation/Reveal'

export function QuizTeaser() {
  return (
    <section className="border-b border-[var(--hairline)] bg-[var(--pink-ticker-bg)]" aria-label="Real or Jumla game">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <Reveal variant="left" className="lg:col-span-7">
            <p className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--red-tag)] mb-4">
              Play · 2 min · Addictive
            </p>
            <h2 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.9] text-[clamp(40px,8vw,96px)] text-[var(--ink)]">
              Real or
              <br />
              Jumla?
            </h2>
            <p className="font-display text-[18px] md:text-[24px] leading-snug text-[var(--ink-2)] mt-6 max-w-[52ch]">
              We show you a famous claim. You decide: solid fact, or political jumla? Build a streak,
              beat your best, and find out if you can really be fooled.
            </p>
            <Link
              href="/quiz"
              className="group mt-8 inline-flex items-center gap-3 bg-[var(--ink)] text-[var(--bg)] px-8 py-4 hover:bg-[var(--red-tag)] transition-colors"
            >
              <span className="font-ui font-black uppercase tracking-[0.18em] text-[13px]">
                Start playing
              </span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>

          <Reveal variant="right" delay={120} className="lg:col-span-5">
            <div className="bg-[var(--bg)] border-2 border-[var(--ink)] p-7 md:p-9 -rotate-1 hover:rotate-0 transition-transform">
              <p className="font-ui uppercase tracking-[0.18em] text-[10px] text-[var(--ink-3)] mb-4">
                Sample claim
              </p>
              <blockquote className="font-display font-bold text-[22px] md:text-[28px] leading-tight text-[var(--ink)]">
                “₹15 lakh will be deposited in every Indian’s bank account.”
              </blockquote>
              <div className="mt-7 grid grid-cols-2 gap-3">
                <span className="border-2 border-[#3a7d44] text-[#3a7d44] py-3 text-center font-ui font-black uppercase tracking-[0.12em] text-[13px]">
                  ✓ Real
                </span>
                <span className="border-2 border-[var(--red-tag)] text-[var(--red-tag)] py-3 text-center font-ui font-black uppercase tracking-[0.12em] text-[13px]">
                  ✕ Jumla
                </span>
              </div>
              <p className="font-ui uppercase tracking-[0.14em] text-[10px] text-[var(--ink-3)] mt-4 text-center">
                Tap to find out who&apos;s right →
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
