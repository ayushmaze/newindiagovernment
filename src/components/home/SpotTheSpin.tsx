'use client'

/**
 * SpotTheSpin — swipeable claim-vs-reality flip cards.
 *
 * Tap a card to flip it (spin → truth). Arrows / swipe move between cards.
 * Mobile-first, light on JS, and shareable. A bite-sized companion to the
 * full "Real or Jumla?" game.
 */

import { useRef, useState } from 'react'
import Link from 'next/link'
import { Reveal } from '@/components/animation/Reveal'
import { SPIN_CARDS } from '@/lib/spotTheSpin'

export function SpotTheSpin() {
  const [idx, setIdx] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const touchX = useRef<number | null>(null)

  const card = SPIN_CARDS[idx]
  const total = SPIN_CARDS.length

  const go = (dir: 1 | -1) => {
    setFlipped(false)
    setIdx((i) => (i + dir + total) % total)
  }

  return (
    <section
      className="bg-[var(--ink)] text-[var(--bg)] border-b-2 border-[var(--divider)]"
      aria-label="Spot the spin"
    >
      <div className="mx-auto max-w-[1100px] px-6 py-16 md:py-24">
        <Reveal>
          <div className="text-center mb-10">
            <p className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--pink-chip)] mb-4">
              Spot the Spin
            </p>
            <h2 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5.6vw,64px)]">
              Tap the card.
              <br />
              See what’s really true.
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="relative max-w-[680px] mx-auto">
            {/* Card */}
            <button
              type="button"
              onClick={() => setFlipped((f) => !f)}
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null) return
                const dx = e.changedTouches[0].clientX - touchX.current
                if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
                touchX.current = null
              }}
              aria-label="Flip card to reveal the truth"
              className="block w-full text-left min-h-[260px] md:min-h-[280px] bg-[var(--bg)] text-[var(--ink)] p-7 md:p-10 pop-in tap-shrink"
              key={`${idx}-${flipped}`}
            >
              {!flipped ? (
                <>
                  <span className="font-ui font-black uppercase tracking-[0.22em] text-[11px] text-[var(--ink-3)]">
                    The spin
                  </span>
                  <p className="font-display font-bold text-[clamp(22px,3.4vw,36px)] leading-tight mt-4">
                    {card.spin}
                  </p>
                  <span className="absolute bottom-6 right-7 font-ui uppercase tracking-[0.16em] text-[10px] text-[var(--ink-3)]">
                    Tap to reveal →
                  </span>
                </>
              ) : (
                <>
                  <span className="font-ui font-black uppercase tracking-[0.22em] text-[11px] text-[var(--red-tag)]">
                    What’s true
                  </span>
                  <p className="font-display text-[clamp(18px,2.4vw,26px)] leading-snug mt-4">
                    {card.truth}
                  </p>
                  <a
                    href={card.source.url}
                    target={card.source.url.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-block mt-4 font-ui uppercase tracking-[0.14em] text-[10px] text-[var(--ink-3)] underline underline-offset-2 hover:text-[var(--ink)]"
                  >
                    Source: {card.source.label}
                  </a>
                </>
              )}
            </button>

            {/* Controls */}
            <div className="flex items-center justify-between mt-5">
              <button
                onClick={() => go(-1)}
                aria-label="Previous card"
                className="font-ui font-bold uppercase tracking-[0.16em] text-[12px] text-[var(--bg)]/70 hover:text-[var(--bg)] transition-colors tap-shrink"
              >
                ← Prev
              </button>
              <span className="font-ui tabular-nums uppercase tracking-[0.18em] text-[11px] text-[var(--bg)]/60">
                {idx + 1} / {total}
              </span>
              <button
                onClick={() => go(1)}
                aria-label="Next card"
                className="font-ui font-bold uppercase tracking-[0.16em] text-[12px] text-[var(--bg)]/70 hover:text-[var(--bg)] transition-colors tap-shrink"
              >
                Next →
              </button>
            </div>

            <p className="text-center mt-8">
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 bg-[var(--pink-chip)] text-[var(--ink)] px-6 py-3 font-ui font-bold uppercase tracking-[0.16em] text-[12px] tap-shrink"
              >
                Play the full game 🎯
              </Link>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
