'use client'
import { useEffect, useRef, useState } from 'react'

type Props = {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  label: string
  sublabel?: string
  decimals?: number
}

function format(n: number, decimals: number) {
  if (decimals > 0) return n.toFixed(decimals)
  return Math.round(n).toLocaleString('en-IN')
}

export function StatCounter({
  end,
  duration = 1800,
  prefix = '',
  suffix = '',
  label,
  sublabel,
  decimals = 0,
}: Props) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true
            const start = performance.now()
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration)
              const eased = 1 - Math.pow(1 - t, 3)
              setValue(end * eased)
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
  }, [end, duration])

  return (
    <div ref={ref} className="text-left">
      <div className="font-display font-black text-[clamp(36px,5vw,64px)] leading-none tracking-tight text-[var(--ink)]">
        {prefix}
        {format(value, decimals)}
        {suffix}
      </div>
      <div className="font-ui font-bold uppercase tracking-[0.18em] text-[11px] text-[var(--red-tag)] mt-3">
        {label}
      </div>
      {sublabel && (
        <div className="font-ui uppercase tracking-[0.12em] text-[10px] text-[var(--ink-3)] mt-1">
          {sublabel}
        </div>
      )}
    </div>
  )
}
