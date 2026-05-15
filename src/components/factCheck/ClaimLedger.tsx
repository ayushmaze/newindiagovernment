import type { AtomicClaim, Verdict } from './types'
import { verdictTheme } from './types'

interface ClaimLedgerProps {
  claims: AtomicClaim[]
}

/**
 * Full audit appendix at the foot of the article — every atomic claim with
 * its verdict, reasoning, confidence, and sources. Collapsed by default
 * via native <details>.
 */
export function ClaimLedger({ claims }: ClaimLedgerProps) {
  if (!claims.length) return null

  return (
    <section className="my-14" aria-label="Atomic claims ledger">
      <div className="border-t-2 border-[var(--ink)] pt-4 mb-6">
        <h2 className="font-display font-bold text-[26px] md:text-[32px] text-[var(--ink)]">
          The Claim Ledger
        </h2>
        <p className="font-body text-[14px] md:text-[15px] text-[var(--ink-3)] mt-1 italic">
          Every atomic claim we examined, with verdict and reasoning. Click to expand.
        </p>
      </div>

      <ol className="divide-y divide-[var(--hairline)] border-y border-[var(--hairline)]">
        {claims.map((c, i) => {
          const theme = verdictTheme(c.verdict as Verdict)
          return (
            <li key={i}>
              <details className="group">
                <summary className="cursor-pointer list-none p-5 flex items-start gap-4 hover:bg-[var(--bg-soft)]">
                  <span className="font-display font-black text-[16px] text-[var(--ink-3)] shrink-0 w-8">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-body text-[15px] md:text-[16px] leading-[1.5] text-[var(--ink)] flex-1">
                    {c.claim}
                  </p>
                  <span
                    className="font-ui font-bold uppercase tracking-[0.14em] text-[10px] px-2.5 py-1 shrink-0"
                    style={{ background: theme.bg, color: theme.fg }}
                  >
                    {theme.shortLabel}
                  </span>
                  <span
                    className="font-ui text-[16px] text-[var(--ink-3)] shrink-0 group-open:rotate-180 transition-transform"
                    aria-hidden="true"
                  >
                    ⌄
                  </span>
                </summary>
                <div className="px-5 pb-6 pl-[68px] space-y-3 bg-[var(--bg-soft)]">
                  {c.reasoning && (
                    <div>
                      <p className="font-ui font-bold uppercase tracking-[0.18em] text-[10px] text-[var(--ink-3)] mb-1">
                        Reasoning
                      </p>
                      <p className="font-body text-[14px] leading-[1.55] text-[var(--ink-2)]">
                        {c.reasoning}
                      </p>
                    </div>
                  )}
                  {c.confidence && (
                    <p className="font-ui text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
                      Confidence: <span className="text-[var(--ink)] font-bold">{c.confidence}</span>
                    </p>
                  )}
                  {c.sources && c.sources.length > 0 && (
                    <div>
                      <p className="font-ui font-bold uppercase tracking-[0.18em] text-[10px] text-[var(--ink-3)] mb-2">
                        Sources
                      </p>
                      <ul className="space-y-2">
                        {c.sources.map((s, j) => (
                          <li key={j} className="text-[13px]">
                            <a
                              href={s.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-ui font-bold underline decoration-dotted underline-offset-2 hover:no-underline"
                              style={{ color: theme.bg }}
                            >
                              {s.label} ↗
                            </a>
                            {s.quote && (
                              <blockquote className="font-body italic text-[var(--ink-2)] border-l-2 border-[var(--hairline)] pl-3 mt-1">
                                &ldquo;{s.quote}&rdquo;
                              </blockquote>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </details>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
