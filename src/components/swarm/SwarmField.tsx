'use client'
import { useEffect, useState } from 'react'
import { SwarmMascot } from './SwarmMascot'

type Critter = { top: number; size: number; dur: number; delay: number; color: string }

/**
 * Decorative swarm that scuttles across its container. Mounts only after the
 * client paints and bails out entirely under prefers-reduced-motion, so it
 * never costs anything on first load or for motion-sensitive users.
 */
export function SwarmField({ count = 7 }: { count?: number }) {
  const [critters, setCritters] = useState<Critter[]>([])

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const palette = ['rgba(0,0,0,0.55)', 'var(--red-tag)', 'rgba(0,0,0,0.35)']
    setCritters(
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
      {critters.map((c, i) => (
        <span
          key={i}
          className="scuttle absolute"
          style={{
            top: `${c.top}%`,
            animationDuration: `${c.dur}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <span className="block wiggle">
            <SwarmMascot size={c.size} color={c.color} />
          </span>
        </span>
      ))}
    </div>
  )
}
