import type { ReceiptCard } from './types'

interface ReceiptsProps {
  receipts: ReceiptCard[]
}

const KIND_META: Record<NonNullable<ReceiptCard['kind']>, { label: string; symbol: string }> = {
  quote: { label: 'Direct Quote', symbol: '" "' },
  stat: { label: 'Official Number', symbol: '#' },
  document: { label: 'From the Record', symbol: '§' },
  screenshot: { label: 'Screenshot', symbol: '◫' },
}

/**
 * Photo-card style "receipts" — the screenshot-able evidence cards.
 * Renders as a 2-column grid on desktop, stacked on mobile, with a
 * different visual treatment per kind.
 */
export function Receipts({ receipts }: ReceiptsProps) {
  if (!receipts.length) return null

  return (
    <section className="my-14" aria-label="Receipts">
      <div className="border-t-2 border-[var(--ink)] pt-4 mb-8">
        <h2 className="font-display font-bold text-[26px] md:text-[32px] text-[var(--ink)]">
          Receipts
        </h2>
        <p className="font-body text-[14px] md:text-[15px] text-[var(--ink-3)] mt-1 italic">
          The actual quotes, numbers, and documents — pulled from primary sources.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {receipts.map((r, i) => {
          const meta = KIND_META[r.kind ?? 'quote']
          const isStat = r.kind === 'stat'
          return (
            <article
              key={i}
              className="relative border border-[var(--hairline)] bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)]"
            >
              {/* Top strip */}
              <header
                className="flex items-center justify-between px-4 py-2 border-b border-[var(--hairline)]"
                style={{ background: 'var(--bg-soft)' }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="font-display font-black text-[12px] w-6 h-6 flex items-center justify-center"
                    style={{ background: 'var(--ink)', color: 'var(--bg)' }}
                  >
                    {meta.symbol}
                  </span>
                  <span className="font-ui font-bold uppercase tracking-[0.18em] text-[10px] text-[var(--ink-3)]">
                    {meta.label}
                  </span>
                </div>
                <span className="font-display font-black text-[11px] text-[var(--ink-3)]">
                  №{String(i + 1).padStart(2, '0')}
                </span>
              </header>

              <div className="p-5">
                <p className="font-ui font-bold uppercase tracking-[0.16em] text-[11px] text-[var(--ink)] mb-3">
                  {r.label}
                </p>
                {isStat ? (
                  <p
                    className="font-display font-black text-[var(--red-tag)] leading-none"
                    style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
                  >
                    {r.content}
                  </p>
                ) : (
                  <blockquote
                    className={
                      r.kind === 'quote'
                        ? 'font-display font-bold text-[20px] leading-[1.35] text-[var(--ink)] border-l-4 border-[var(--ink)] pl-4'
                        : 'font-body text-[16px] leading-[1.55] text-[var(--ink)] italic border-l-2 border-[var(--ink-3)] pl-4'
                    }
                  >
                    {r.content}
                  </blockquote>
                )}
                {(r.sourceLabel || r.sourceUrl) && (
                  <p className="mt-4 pt-3 border-t border-[var(--hairline)] font-ui text-[11px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
                    Source:{' '}
                    {r.sourceUrl ? (
                      <a
                        href={r.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--ink)] underline decoration-dotted underline-offset-2 hover:no-underline"
                      >
                        {r.sourceLabel ?? r.sourceUrl} ↗
                      </a>
                    ) : (
                      <span className="text-[var(--ink)]">{r.sourceLabel}</span>
                    )}
                  </p>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
