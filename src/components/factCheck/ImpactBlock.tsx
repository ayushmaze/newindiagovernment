import type { Impact } from './types'

interface ImpactBlockProps {
  impact: Impact
}

/**
 * Impact section — the "why this matters" block.
 * Renders a lede paragraph, the who-is-affected grid, and short/long-term cards.
 */
export function ImpactBlock({ impact }: ImpactBlockProps) {
  const hasContent =
    impact.summary ||
    (impact.whoIsAffected && impact.whoIsAffected.length) ||
    impact.shortTerm ||
    impact.longTerm
  if (!hasContent) return null

  return (
    <section className="my-14 bg-lavender-stripe py-10 px-6 md:px-10 -mx-6 md:-mx-10 md:rounded-none" aria-label="Impact">
      <div className="border-t-2 border-[var(--ink)] pt-4 mb-6">
        <h2 className="font-display font-bold text-[26px] md:text-[32px] text-[var(--ink)]">
          Why This Matters
        </h2>
        <p className="font-body text-[14px] md:text-[15px] text-[var(--ink-3)] mt-1 italic">
          The stakes — concretely, for whom, when.
        </p>
      </div>

      {impact.summary && (
        <p className="font-body text-[18px] md:text-[20px] leading-[1.55] text-[var(--ink)] mb-8 max-w-[68ch]">
          {impact.summary}
        </p>
      )}

      {impact.whoIsAffected && impact.whoIsAffected.length > 0 && (
        <div className="mb-8">
          <p className="font-ui font-bold uppercase tracking-[0.2em] text-[11px] text-[var(--ink-3)] mb-3">
            Who is affected
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {impact.whoIsAffected.map((w, i) => (
              <div key={i} className="bg-white border-l-4 border-[var(--ink)] p-4">
                <p className="font-display font-bold text-[15px] text-[var(--ink)] mb-1">
                  {w.group}
                </p>
                <p className="font-body text-[14px] leading-[1.45] text-[var(--ink-2)]">{w.how}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {(impact.shortTerm || impact.longTerm) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {impact.shortTerm && (
            <TermCard label="Short term" detail={impact.shortTerm} accent="var(--red-tag)" />
          )}
          {impact.longTerm && (
            <TermCard label="Long term" detail={impact.longTerm} accent="var(--ink)" />
          )}
        </div>
      )}
    </section>
  )
}

function TermCard({ label, detail, accent }: { label: string; detail: string; accent: string }) {
  return (
    <div className="bg-white border border-[var(--hairline)] p-5">
      <p
        className="font-ui font-bold uppercase tracking-[0.22em] text-[10px] mb-2"
        style={{ color: accent }}
      >
        {label}
      </p>
      <p className="font-body text-[15px] md:text-[16px] leading-[1.55] text-[var(--ink)]">
        {detail}
      </p>
    </div>
  )
}
