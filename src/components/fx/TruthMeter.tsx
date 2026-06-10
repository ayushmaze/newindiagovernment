'use client'

/**
 * TruthMeter — a fixed, tricolour scroll-progress bar.
 *
 * Saffron → white → green fills left-to-right as you read; an Ashoka-blue
 * dot rides the leading edge. Reading progress as a tiny act of patriotism.
 * Pure transform updates via rAF; respects prefers-reduced-motion (static
 * but still accurate — it jumps instead of gliding).
 */

import { useEffect, useRef } from 'react'

export function TruthMeter() {
  const barRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    const dot = dotRef.current
    if (!bar || !dot) return

    let raf = 0
    const update = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      bar.style.transform = `scaleX(${p})`
      dot.style.left = `${p * 100}%`
      dot.style.opacity = p > 0.005 ? '1' : '0'
      raf = 0
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[90] h-[3px] pointer-events-none"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left will-change-transform"
        style={{
          transform: 'scaleX(0)',
          background:
            'linear-gradient(90deg, #ff9933 0%, #ff9933 33%, #f5f0e6 50%, #138808 67%, #138808 100%)',
          transition: 'transform 80ms linear',
        }}
      />
      <div
        ref={dotRef}
        className="absolute top-[-2.5px] h-2 w-2 rounded-full -translate-x-1/2"
        style={{
          background: '#000080',
          boxShadow: '0 0 6px 1px rgba(0,0,128,0.5)',
          opacity: 0,
          transition: 'opacity 200ms',
        }}
      />
    </div>
  )
}
