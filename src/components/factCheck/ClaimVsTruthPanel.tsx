import type { ClaimVsTruthEntry, Verdict } from './types'
import { verdictTheme } from './types'

interface ClaimVsTruthPanelProps {
  entries: ClaimVsTruthEntry[]
  verdict: Verdict | string
}

/**
 * The centrepiece panel: side-by-side "what was said" vs "what the evidence shows".
 * Each row is one claim/truth pair, rendered as two stacked cards with a connector
 * line on desktop and stacked on mobile.
 */
export function ClaimVsTruthPanel({ entries, verdict }: ClaimVsTruthPanelProps) {
  if (!entries.length) return null
  const theme = verdictTheme(verdict)

  return (
    <section className="my-14" aria-label="Claim versus reality">
      <SectionHeading
        label="Claim vs Reality"
        accent={theme.bg}
        subhead="What was said, side-by-side with what the evidence shows."
      />

      <ol className="space-y-6 mt-8">
        {entries.map((row, i) => (
          <li
            key={i}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0 md:border md:border-[var(--hairline)]"
          >
            {/* Claim side */}
            <div className="bg-[var(--bg-soft)] border border-[var(--hairline)] md:border-0 md:border-r p-6 relative">
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-display font-black text-[22px] text-[var(--ink-3)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-ui font-bold uppercase tracking-[0.2em] text-[10px] text-[var(--ink-3)]">
                  The Claim
                </p>
              </div>
              <blockquote className="font-display font-bold text-[19px] md:text-[21px] leading-[1.35] text-[var(--ink)] mb-3">
                &ldquo;{row.claim.replace(/^["“]|["”]$/g, '')}&rdquo;
              </blockquote>
              {row.claimSource && (
                <p className="font-ui text-[12px] uppercase tracking-[0.14em] text-[var(--ink-3)] mt-3">
                  — {row.claimSource}
                </p>
              )}
            </div>

            {/* Truth side */}
            <div
              className="border md:border-0 p-6 relative"
              style={{
                background: '#ffffff',
                borderLeft: `4px solid ${theme.bg}`,
              }}
            >
              <p
                className="font-ui font-bold uppercase tracking-[0.2em] text-[10px] mb-3"
                style={{ color: theme.bg }}
              >
                The Reality
              </p>
              <p className="font-body text-[17px] leading-[1.55] text-[var(--ink)] mb-3">
                {row.truth}
              </p>
              {row.truthSources && row.truthSources.length > 0 && (
                <ul className="mt-4 pt-3 border-t border-[var(--hairline)] flex flex-wrap gap-x-3 gap-y-1">
                  {row.truthSources.map((s, j) => (
                    <li key={j}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-ui text-[11px] uppercase tracking-[0.1em] underline decoration-dotted underline-offset-2 hover:no-underline"
                        style={{ color: theme.bg }}
                      >
                        {s.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function SectionHeading({
  label,
  subhead,
  accent,
}: {
  label: string
  subhead?: string
  accent: string
}) {
  return (
    <div className="border-t-2 border-[var(--ink)] pt-4">
      <div className="flex items-center gap-3">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: accent }}
          aria-hidden="true"
        />
        <h2 className="font-display font-bold text-[26px] md:text-[32px] text-[var(--ink)]">
          {label}
        </h2>
      </div>
      {subhead && (
        <p className="font-body text-[14px] md:text-[15px] text-[var(--ink-3)] mt-1 italic">
          {subhead}
        </p>
      )}
    </div>
  )
}
