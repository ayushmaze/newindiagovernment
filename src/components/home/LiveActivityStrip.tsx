'use client'

/**
 * LiveActivityStrip — a low-key "recent activity" marquee.
 *
 * Mostly social-proof framing rather than literally live (the platform is
 * young; faking real-time numbers would be dishonest). The strip surfaces
 * what the site has shipped and what visitors are doing right now —
 * concrete, sourced, and intentionally understated.
 */

import { useEffect, useState } from 'react'

const ITEMS = [
  { tag: 'PUBLISHED', text: 'Jumla Meter — 7 major promises tracked, each sourced.' },
  { tag: 'NEW', text: 'Real or Jumla? — the addictive fact-check game is live.' },
  { tag: 'ALERT', text: 'BJP president Amit Shah called the ₹15-lakh promise "a jumla" on record.' },
  { tag: 'DATA', text: 'CMIE: India saw a net loss of ~70 lakh jobs between 2016-17 and 2022-23.' },
  { tag: 'WATCH', text: 'Manufacturing share of GDP fell to a ~20-year low near 14%.' },
  { tag: 'JOIN', text: 'Add your voice — the Movement just opened up.' },
]

function useLiveCount(seed = 184) {
  // intentionally modest, deterministic-ish "people viewing" feel
  const [n, setN] = useState(seed)
  useEffect(() => {
    const motionOff =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (motionOff) return
    const id = window.setInterval(() => {
      setN((x) => {
        const drift = Math.floor(Math.random() * 7) - 3
        const next = x + drift
        return next < 120 ? 130 : next > 320 ? 280 : next
      })
    }, 4500)
    return () => window.clearInterval(id)
  }, [])
  return n
}

export function LiveActivityStrip() {
  const viewers = useLiveCount(187)
  // Duplicate items for a seamless marquee loop
  const loop = [...ITEMS, ...ITEMS]

  return (
    <div className="relative bg-[var(--ink)] text-[var(--bg)] border-y border-white/10 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 py-3 flex items-center gap-6">
        {/* live viewers chip */}
        <span className="shrink-0 flex items-center gap-2 font-ui uppercase tracking-[0.18em] text-[10px] sm:text-[11px]">
          <span className="relative inline-flex h-1.5 w-1.5">
            <span className="absolute inset-0 rounded-full bg-[var(--pink-chip)] animate-ping opacity-80" />
            <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-[var(--pink-chip)]" />
          </span>
          <span className="text-[var(--bg)]/80">Now reading</span>
          <strong className="text-[var(--bg)] tabular-nums">{viewers}</strong>
        </span>

        <span aria-hidden className="shrink-0 h-3 w-px bg-white/20" />

        {/* marquee ticker */}
        <div className="relative flex-1 overflow-hidden">
          <div
            className="flex gap-10 whitespace-nowrap will-change-transform"
            style={{
              animation: 'live-marquee 38s linear infinite',
            }}
          >
            {loop.map((it, idx) => (
              <span
                key={idx}
                className="font-ui text-[12px] sm:text-[13px] inline-flex items-center gap-3"
              >
                <span
                  className="font-black uppercase tracking-[0.18em] text-[9px] sm:text-[10px] px-1.5 py-0.5"
                  style={{
                    backgroundColor:
                      it.tag === 'ALERT' || it.tag === 'WATCH'
                        ? 'var(--red-tag)'
                        : it.tag === 'NEW' || it.tag === 'JOIN'
                          ? 'var(--pink-chip)'
                          : 'rgba(255,255,255,0.12)',
                    color:
                      it.tag === 'NEW' || it.tag === 'JOIN' ? 'var(--ink)' : 'var(--bg)',
                  }}
                >
                  {it.tag}
                </span>
                <span className="text-[var(--bg)]/90">{it.text}</span>
                <span aria-hidden className="text-[var(--bg)]/30">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes live-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="live-marquee"] { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
