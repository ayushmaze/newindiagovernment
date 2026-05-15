import type { Verdict } from './types'
import { verdictTheme } from './types'

interface VerdictHeroProps {
  verdict: Verdict | string
  credibilityScore: number | null
  title: string
  dek: string | null
  kicker?: string | null
  category?: string | null
  author?: string | null
  publishedAt?: string | null
}

/**
 * Full-width hero block at the top of fact-check articles.
 *
 * Layout: verdict badge on the left (colour-coded full panel),
 * title + dek + byline on the right. Bold, immediately readable.
 */
export function VerdictHero({
  verdict,
  credibilityScore,
  title,
  dek,
  kicker,
  category,
  author,
  publishedAt,
}: VerdictHeroProps) {
  const theme = verdictTheme(verdict)
  const score = credibilityScore ?? null

  return (
    <header className="border-b-2 border-[var(--divider)] mb-10">
      {kicker && (
        <p
          className="font-ui font-bold uppercase tracking-[0.24em] text-[11px] mb-4"
          style={{ color: theme.bg }}
        >
          {kicker}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-10 items-start mb-8">
        {/* Verdict pillar */}
        <div
          className="p-6 md:p-7 flex flex-col justify-between min-h-[200px] md:min-h-[260px]"
          style={{ background: theme.bg, color: theme.fg }}
        >
          <div>
            <p className="font-ui font-bold uppercase tracking-[0.28em] text-[10px] opacity-80 mb-3">
              Verdict
            </p>
            <p
              className="font-display font-black leading-[0.95]"
              style={{ fontSize: 'clamp(28px, 4.5vw, 48px)' }}
            >
              {theme.label}
            </p>
          </div>
          {score !== null && (
            <div className="mt-6 pt-5 border-t border-white/20">
              <p className="font-ui font-bold uppercase tracking-[0.24em] text-[10px] opacity-80 mb-1">
                Credibility
              </p>
              <p className="font-display font-black text-[40px] leading-none">
                {score.toFixed(1)}
                <span className="font-ui text-[14px] font-bold opacity-70 ml-1">/10</span>
              </p>
            </div>
          )}
        </div>

        {/* Title + dek */}
        <div>
          <h1 className="font-display font-bold text-[var(--ink)] leading-[1.02] mb-5"
              style={{ fontSize: 'clamp(32px, 5vw, 58px)' }}>
            {title}
          </h1>
          {dek && (
            <p className="font-body text-[18px] md:text-[20px] leading-[1.5] text-[var(--ink-2)] italic border-l-4 pl-4 mb-6"
               style={{ borderColor: theme.bg }}>
              {dek}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 border-t border-[var(--hairline)]">
            {author && (
              <span className="font-ui uppercase tracking-[0.16em] text-[11px] text-[var(--ink-3)]">
                By <span className="text-[var(--ink)] font-bold">{author}</span>
              </span>
            )}
            {publishedAt && (
              <span className="font-ui uppercase tracking-[0.16em] text-[11px] text-[var(--ink-3)]">
                {publishedAt}
              </span>
            )}
            {category && (
              <span
                className="font-ui font-bold uppercase tracking-[0.16em] text-[11px]"
                style={{ color: theme.bg }}
              >
                {category}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
