'use client'
import { useEffect, useState } from 'react'
import { Cockroach } from './Cockroach'

type Roach = { top: number; size: number; dur: number; delay: number; color: string }

/**
 * Decorative swarm that scuttles across its container. Mounts only after the
 * client paints and bails out entirely under prefers-reduced-motion, so it
 * never costs anything on first load or for motion-sensitive users.
 */
export function CockroachField({ count = 7 }: { count?: number }) {
  const [roaches, setRoaches] = useState<Roach[]>([])

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const palette = ['rgba(0,0,0,0.55)', 'var(--red-tag)', 'rgba(0,0,0,0.35)']
    setRoaches(
      Array.from({ length: count }).map((_, i) => ({
        top: 8 + Math.random() * 80,
        size: 22 + Math.random() * 26,
        dur: 9 + Math.random() * 11,
        delay: -Math.random() * 12,
        color: palette[i % palette.length],
      })),
    )
  }, [count])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {roaches.map((r, i) => (
        <span
          key={i}
          className="scuttle absolute"
          style={{
            top: `${r.top}%`,
            animationDuration: `${r.dur}s`,
            animationDelay: `${r.delay}s`,
          }}
        >
          <span className="block wiggle">
            <Cockroach size={r.size} color={r.color} />
          </span>
        </span>
      ))}
    </div>
  )
}
