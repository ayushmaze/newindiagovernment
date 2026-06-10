'use client'

/**
 * RubberStamp — an ink stamp that SLAMS onto the page when scrolled into
 * view: drops from 2.4× scale with a rotate, sticks with a tiny recoil, and
 * leaves a subtle ink-bleed edge. The signature fact-check flourish.
 *
 * Reduced motion: renders instantly, no slam.
 */

import { useEffect, useRef, useState } from 'react'

type Props = {
  label: string
  /** Ink colour — defaults to the editorial red */
  color?: string
  /** Final resting rotation in degrees */
  angle?: number
  className?: string
}

export function RubberStamp({ label, color = 'var(--red-tag)', angle = -8, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [stamped, setStamped] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setStamped(true)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStamped(true)
          obs.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <span
      ref={ref}
      aria-hidden
      className={`inline-block select-none pointer-events-none font-ui font-black uppercase tracking-[0.18em] ${
        stamped ? 'stamp-slam' : 'opacity-0'
      } ${className}`}
      style={{
        color,
        border: `3px solid ${color}`,
        padding: '0.3em 0.7em',
        borderRadius: '4px',
        fontSize: 'clamp(11px, 2.4vw, 15px)',
        ['--stamp-angle' as string]: `${angle}deg`,
        maskImage:
          'radial-gradient(circle at 30% 40%, black 96%, transparent 100%), radial-gradient(circle at 70% 60%, black 94%, transparent 100%)',
        maskComposite: 'intersect',
      }}
    >
      {label}
    </span>
  )
}
