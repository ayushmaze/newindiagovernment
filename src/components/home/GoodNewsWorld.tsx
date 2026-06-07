'use client'

/**
 * GoodNewsWorld — "Good News from Around the World".
 *
 * A hope-forward counterweight to the accountability coverage: real, sourced
 * global progress. Cards use gradient header bands + an emoji emblem rather
 * than external photos (the site CSP restricts images to self/data/blob).
 * Each card scroll-reveals and links to its primary source.
 *
 * Psychology: pairing problems with proof-that-change-is-possible sustains
 * engagement and counters fatigue — people return for hope, not just outrage.
 */

import { Reveal } from '@/components/animation/Reveal'
import { GOOD_NEWS } from '@/lib/goodNews'

export function GoodNewsWorld() {
  return (
    <section
      className="bg-[var(--bg)] border-b-2 border-[var(--divider)]"
      aria-label="Good news from around the world"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:py-24">
        <Reveal>
          <div className="flex items-end justify-between gap-6 flex-wrap mb-10 md:mb-14">
            <div>
              <p className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[#3a7d44] mb-4">
                Good News · Around the World
              </p>
              <h2 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5.6vw,68px)] text-[var(--ink)]">
                Proof that
                <br />
                things can get better.
              </h2>
              <p className="font-display text-[clamp(16px,1.6vw,22px)] leading-snug text-[var(--ink-2)] mt-5 max-w-[60ch]">
                Accountability isn’t only about what’s broken. When the world decides to fix
                something, it works — here’s the evidence, sourced and verifiable.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {GOOD_NEWS.map((item, i) => (
            <Reveal key={item.id} delay={i * 70}>
              <a
                href={item.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full bg-white border border-[var(--ink)]/12 overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-22px_rgba(0,0,0,0.3)] transition-all duration-200"
              >
                {/* Gradient emblem band */}
                <div
                  className={`relative h-28 bg-gradient-to-br ${item.gradient} flex items-center justify-between px-6`}
                >
                  <span className="text-[44px] leading-none drop-shadow-sm" aria-hidden>
                    {item.emblem}
                  </span>
                  <span className="font-ui font-black uppercase tracking-[0.18em] text-[10px] text-white/90 bg-black/20 px-2 py-1">
                    {item.topic}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 md:p-7 flex flex-col h-[calc(100%-7rem)]">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="font-display font-black tabular-nums text-[clamp(24px,3vw,34px)] leading-none text-[#3a7d44]">
                      {item.stat.value}
                    </span>
                    <span className="font-ui uppercase tracking-[0.12em] text-[10px] text-[var(--ink-3)] max-w-[22ch] leading-tight">
                      {item.stat.label}
                    </span>
                  </div>

                  <h3 className="font-display font-black uppercase tracking-tight text-[clamp(18px,2.2vw,24px)] leading-[1.12] text-[var(--ink)]">
                    {item.headline}
                  </h3>
                  <p className="font-body text-[14px] md:text-[15px] leading-relaxed text-[var(--ink-2)] mt-3 flex-1">
                    {item.blurb}
                  </p>

                  <div className="mt-5 pt-4 border-t border-[var(--hairline)] flex items-center justify-between">
                    <span className="font-ui uppercase tracking-[0.14em] text-[10px] text-[var(--ink-3)] truncate max-w-[70%]">
                      {item.source.label}
                    </span>
                    <span
                      aria-hidden
                      className="font-ui font-bold uppercase tracking-[0.16em] text-[10px] text-[#3a7d44] group-hover:translate-x-0.5 transition-transform"
                    >
                      Source ↗
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
