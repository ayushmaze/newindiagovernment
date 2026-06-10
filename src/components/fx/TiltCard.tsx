'use client'

/**
 * TiltCard — perspective tilt that follows the cursor on desktop and the
 * finger on touch devices, with a glare highlight that tracks the pointer.
 * Cards feel like physical cardstock you're tipping in your hand.
 *
 * Transform-only (GPU), rAF-throttled, springs back on release.
 * Disabled entirely under prefers-reduced-motion.
 */

import { useEffect, useRef, type ReactNode } from 'react'

export function TiltCard({
  children,
  max = 7,
  className = '',
}: {
  children: ReactNode
  /** Max tilt in degrees */
  max?: number
  className?: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = rootRef.current
    const glare = glareRef.current
    if (!el || !glare) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let px = 0.5
    let py = 0.5
    let active = false

    const apply = () => {
      raf = 0
      const rx = (0.5 - py) * 2 * max
      const ry = (px - 0.5) * 2 * max
      el.style.transform = active
        ? `perspective(700px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(1.015)`
        : ''
      glare.style.opacity = active ? '1' : '0'
      glare.style.background = `radial-gradient(220px circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.28), transparent 70%)`
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply)
    }
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width))
      py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height))
      active = true
      schedule()
    }
    const onLeave = () => {
      active = false
      el.style.transition = 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1)'
      schedule()
      window.setTimeout(() => {
        el.style.transition = ''
      }, 360)
    }

    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', onLeave, { passive: true })
    el.addEventListener('pointerup', onLeave, { passive: true })
    el.addEventListener('pointercancel', onLeave, { passive: true })
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('pointerup', onLeave)
      el.removeEventListener('pointercancel', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [max])

  return (
    <div ref={rootRef} className={`relative will-change-transform ${className}`}>
      {children}
      <div
        ref={glareRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200"
      />
    </div>
  )
}
