'use client'
import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

type Variant = 'up' | 'left' | 'right' | 'scale' | 'blur'

type Props = {
  children: ReactNode
  /** Animation style */
  variant?: Variant
  /** Stagger delay in ms */
  delay?: number
  /** Render as a different element (default div) */
  as?: ElementType
  className?: string
  /** Fire only once (default true) */
  once?: boolean
}

const VARIANT_CLASS: Record<Variant, string> = {
  up: '',
  left: 'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
  blur: 'reveal-blur',
}

/**
 * Lightweight scroll-triggered reveal. Uses a single IntersectionObserver and
 * CSS transitions (defined in globals.css) so it stays cheap on mobile and
 * respects prefers-reduced-motion automatically via the .reveal rules.
 */
export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  as,
  className = '',
  once = true,
}: Props) {
  const Tag = (as ?? 'div') as ElementType
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            if (once) obs.unobserve(e.target)
          } else if (!once) {
            setVisible(false)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [once])

  return (
    <Tag
      ref={ref}
      className={`reveal ${VARIANT_CLASS[variant]} ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
