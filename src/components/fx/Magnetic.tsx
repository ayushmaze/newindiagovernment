'use client'

/**
 * Magnetic — wraps a CTA so it leans toward the cursor within a proximity
 * field (desktop, fine pointers) and squash-bounces with an ink ripple on
 * tap (mobile, coarse pointers). Transform-only; reduced-motion disables.
 */

import { useEffect, useRef, type ReactNode } from 'react'

export function Magnetic({
  children,
  pull = 0.35,
  className = '',
}: {
  children: ReactNode
  /** Fraction of cursor offset to follow (0–1) */
  pull?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

    const fine = window.matchMedia?.('(pointer: fine)').matches
    let raf = 0

    if (fine) {
      // Desktop: magnetism
      let tx = 0
      let ty = 0
      const apply = () => {
        raf = 0
        el.style.transform = `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px)`
      }
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.hypot(dx, dy)
        const radius = Math.max(r.width, 120)
        if (dist < radius) {
          tx = dx * pull
          ty = dy * pull * 0.8
        } else {
          tx = 0
          ty = 0
        }
        if (!raf) raf = requestAnimationFrame(apply)
      }
      const onLeave = () => {
        tx = 0
        ty = 0
        el.style.transition = 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)'
        if (!raf) raf = requestAnimationFrame(apply)
        window.setTimeout(() => (el.style.transition = ''), 430)
      }
      window.addEventListener('pointermove', onMove, { passive: true })
      el.addEventListener('pointerleave', onLeave, { passive: true })
      return () => {
        window.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerleave', onLeave)
        if (raf) cancelAnimationFrame(raf)
      }
    }

    // Mobile: squash + ink ripple at the tap point
    const onDown = (e: PointerEvent) => {
      el.style.transition = 'transform 120ms ease-out'
      el.style.transform = 'scale(0.94)'
      const r = el.getBoundingClientRect()
      const ink = document.createElement('span')
      ink.className = 'fx-ripple'
      ink.style.left = `${e.clientX - r.left}px`
      ink.style.top = `${e.clientY - r.top}px`
      el.appendChild(ink)
      window.setTimeout(() => ink.remove(), 650)
    }
    const onUp = () => {
      el.style.transition = 'transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1)'
      el.style.transform = 'scale(1)'
    }
    el.addEventListener('pointerdown', onDown, { passive: true })
    el.addEventListener('pointerup', onUp, { passive: true })
    el.addEventListener('pointercancel', onUp, { passive: true })
    return () => {
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onUp)
    }
  }, [pull])

  return (
    <div ref={ref} className={`relative inline-block overflow-visible ${className}`} style={{ overflow: 'hidden' }}>
      {children}
    </div>
  )
}
