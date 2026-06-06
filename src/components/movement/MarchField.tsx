'use client'
import { useEffect, useState } from 'react'
import { Marcher } from './Marcher'

type Walker = { top: number; size: number; dur: number; delay: number; color: string }

/**
 * A decorative crowd of citizens marching across the container. Mounts only
 * after the client paints and bails out entirely under prefers-reduced-motion,
 * so it never costs anything on first load or for motion-sensitive users.
 */
export function MarchField({ count = 7 }: { count?: number }) {
  const [walkers, setWalkers] = useState<Walker[]>([])

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const palette = ['rgba(0,0,0,0.5)', 'var(--red-tag)', 'rgba(0,0,0,0.3)']
    setWalkers(
      Array.from({ length: count }).map((_, i) => ({
        top: 8 + Math.random() * 80,
        size: 24 + Math.random() * 26,
        dur: 10 + Math.random() * 12,
        delay: -Math.random() * 14,
        color: palette[i % palette.length],
      })),
    )
  }, [count])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {walkers.map((w, i) => (
        <span
          key={i}
          className="scuttle absolute"
          style={{
            top: `${w.top}%`,
            animationDuration: `${w.dur}s`,
            animationDelay: `${w.delay}s`,
          }}
        >
          <span className="block wiggle">
            <Marcher size={w.size} color={w.color} />
          </span>
        </span>
      ))}
    </div>
  )
}
