'use client'

/**
 * NumbersThatMatter — a band of big, animated, shareable sourced stats.
 *
 * Each number counts up on scroll-into-view (respecting reduced-motion) and
 * carries a one-tap ShareButton with a pre-written caption — built for the
 * screenshot-and-share moment. Reuses the verified data in keyNumbers.ts.
 */

import { useEffect, useRef, useState } from 'react'
import { Reveal } from '@/components/animation/Reveal'
import { ShareButton } from '@/components/share/ShareButton'
import { KEY_NUMBERS, type KeyNumber } from '@/lib/keyNumbers'

function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(target)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true
            const start = performance.now()
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration)
              setValue(target * (1 - Math.pow(1 - t, 3)))
              if (t < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }
        })
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, duration])
  return { value, ref }
}

function NumberCard({ n }: { n: KeyNumber }) {
  const { value, ref } = useCountUp(n.countTo)
  const formatted =
    n.displayOverride ??
    `${n.prefix ?? ''}${
      n.decimals ? value.toFixed(n.decimals) : Math.round(value).toLocaleString('en-IN')
    }${n.suffix ?? ''}`
  const color =
    n.accent === 'red' ? 'text-[var(--red-tag)]' : n.accent === 'gold' ? 'text-[var(--gold-petition)]' : 'text-[var(--ink)]'

  return (
    <div
      ref={ref}
      className="group relative bg-[var(--bg)] border border-[var(--ink)]/12 p-6 md:p-7 flex flex-col hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.3)] transition-all duration-200"
    >
      <div className={`font-display font-black tabular-nums leading-none text-[clamp(40px,6vw,68px)] ${color}`}>
        {formatted}
      </div>
      <p className="font-ui font-black uppercase tracking-[0.14em] text-[12px] text-[var(--ink)] mt-3">
        {n.label}
      </p>
      <p className="font-ui text-[12px] text-[var(--ink-3)] mt-1 leading-snug flex-1">{n.sub}</p>
      <div className="mt-4 pt-3 border-t border-[var(--hairline)] flex items-center justify-between gap-3">
        <a
          href={n.source.url}
          target={n.source.url.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
          className="font-ui uppercase tracking-[0.14em] text-[10px] text-[var(--ink-3)] hover:text-[var(--ink)] truncate"
        >
          {n.source.label}
        </a>
        <ShareButton
          text={n.shareText}
          label="Share"
          className="shrink-0 font-ui font-bold uppercase tracking-[0.14em] text-[10px] text-[var(--ink)] hover:text-[var(--red-tag)] transition-colors"
        />
      </div>
    </div>
  )
}

export function NumbersThatMatter() {
  return (
    <section
      className="bg-[var(--bg-soft)] border-b-2 border-[var(--divider)]"
      aria-label="Numbers that matter"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:py-24">
        <Reveal>
          <div className="mb-10 md:mb-14">
            <p className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--red-tag)] mb-4">
              Numbers That Matter
            </p>
            <h2 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5.6vw,68px)] text-[var(--ink)]">
              Six numbers.
              <br />
              Screenshot any of them.
            </h2>
            <p className="font-display text-[clamp(16px,1.6vw,22px)] leading-snug text-[var(--ink-2)] mt-5 max-w-[60ch]">
              Every figure is sourced and citable. Tap share — make the next conversation start
              from facts.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {KEY_NUMBERS.map((n, i) => (
            <Reveal key={n.id} delay={i * 60}>
              <NumberCard n={n} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
