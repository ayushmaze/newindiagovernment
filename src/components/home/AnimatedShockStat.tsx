'use client'

/**
 * AnimatedShockStat — count-up version of the hero shock stat.
 *
 * Animates `endNumber` from 0 → endNumber once the card scrolls into view,
 * then composes the final big-number string from prefix + number + suffix.
 * Honours prefers-reduced-motion (jumps straight to the final value).
 */

import { useEffect, useRef, useState } from 'react'

type Props = {
  endNumber: number
  prefix?: string
  suffix?: string
  label: string
  sub: string
  accent?: 'red'
  duration?: number
  decimals?: number
}

export function AnimatedShockStat({
  endNumber,
  prefix = '',
  suffix = '',
  label,
  sub,
  accent,
  duration = 1500,
  decimals = 0,
}: Props) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const motionOff =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (motionOff) {
      setValue(endNumber)
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
              const eased = 1 - Math.pow(1 - t, 3)
              setValue(endNumber * eased)
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
  }, [endNumber, duration])

  const formatted =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-IN')

  return (
    <div ref={ref} className="border-l-2 border-[var(--ink)]/15 pl-4">
      <div
        className={`font-display font-black tabular-nums leading-none text-[clamp(40px,5.5vw,64px)] ${
          accent === 'red' ? 'text-[var(--red-tag)]' : 'text-[var(--ink)]'
        }`}
      >
        {prefix}
        {formatted}
        {suffix}
      </div>
      <p className="font-ui font-black uppercase tracking-[0.16em] text-[11px] text-[var(--ink)] mt-3">
        {label}
      </p>
      <p className="font-ui text-[12px] text-[var(--ink-3)] mt-1 leading-snug">{sub}</p>
    </div>
  )
}
