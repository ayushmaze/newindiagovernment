'use client'

/**
 * StickyPlayCTA — a low-friction "Play Real or Jumla?" pill that fades in
 * after the visitor scrolls past the hero, and out again as they reach the
 * footer. Bottom-right on desktop, bottom-center above the mobile tab bar.
 *
 * Designed to feel like a friendly nudge, not an interstitial.
 */

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { T } from '@/components/i18n/T'

export function StickyPlayCTA() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (dismissed) return
    let last = 0
    const onScroll = () => {
      const y = window.scrollY
      // show after 720px scroll, hide near the bottom (last 600px of doc)
      const doc = document.documentElement
      const total = doc.scrollHeight - window.innerHeight
      const nearBottom = total > 0 && y > total - 600
      const past = y > 720
      // tiny rAF-style throttle
      if (Math.abs(y - last) < 30) return
      last = y
      setShow(past && !nearBottom)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [dismissed])

  if (dismissed) return null

  return (
    <div
      className={`fixed z-40 left-1/2 -translate-x-1/2 lg:left-auto lg:right-6 lg:translate-x-0 transition-all duration-300 ${
        show
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
      style={{
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 84px)',
      }}
    >
      <div className="lg:[bottom:24px] flex items-center gap-2 bg-[var(--ink)] text-[var(--bg)] px-2 py-2 shadow-[0_18px_40px_-12px_rgba(0,0,0,.45)] border border-white/10">
        <Link
          href="/quiz"
          className="group flex items-center gap-2 pl-3 pr-2 py-2 hover:bg-[var(--red-tag)] transition-colors tap-shrink"
          aria-label="Play Real or Jumla?"
        >
          <span aria-hidden className="text-[16px]">🎯</span>
          <T
            k="sticky.label"
            fallback="Play Real or Jumla?"
            className="font-ui font-bold uppercase tracking-[0.18em] text-[11px]"
          />
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="px-2 py-1.5 text-[var(--bg)]/70 hover:text-[var(--bg)] transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
            <path
              d="M2 2 L10 10 M10 2 L2 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
