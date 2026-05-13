import Link from 'next/link'

interface PetitionCardProps {
  title: string
  slug: string
  summary?: string
  target?: string
  currentSignatures: number
  goalSignatures: number
}

export function PetitionCard({
  title,
  slug,
  summary,
  target,
  currentSignatures,
  goalSignatures,
}: PetitionCardProps) {
  const pct = Math.min(100, Math.round((currentSignatures / Math.max(goalSignatures, 1)) * 100))

  return (
    <article className="border border-[var(--hairline)] p-5 bg-[var(--bg-soft)] flex flex-col gap-3 min-w-[260px] max-w-[320px] shrink-0">
      {target && (
        <p className="font-ui uppercase tracking-[0.16em] text-[11px] text-[var(--ink-3)]">
          → {target}
        </p>
      )}
      <Link href={`/petition/${slug}`}>
        <h3 className="font-display font-bold text-[18px] leading-[1.2] text-[var(--ink)] hover:underline">
          {title}
        </h3>
      </Link>
      {summary && (
        <p className="font-body text-[14px] leading-[1.5] text-[var(--ink-2)] line-clamp-2">
          {summary}
        </p>
      )}

      {/* Progress bar */}
      <div>
        <div className="h-1.5 bg-[var(--hairline)] w-full overflow-hidden">
          <div
            className="h-full bg-[var(--gold-petition)] transition-[width] duration-700"
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={currentSignatures}
            aria-valuemin={0}
            aria-valuemax={goalSignatures}
            aria-label="Petition progress"
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="font-ui font-bold text-[12px] text-[var(--ink)]">
            {currentSignatures.toLocaleString('en-IN')} signed
          </span>
          <span className="font-ui text-[11px] text-[var(--ink-3)]">
            Goal: {goalSignatures.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      <Link
        href={`/petition/${slug}`}
        className="mt-auto bg-[var(--ink)] text-[var(--bg)] font-ui font-bold uppercase tracking-[0.16em] text-[12px] py-2.5 text-center hover:bg-[var(--lavender-hover)] transition-colors"
      >
        Sign This Petition
      </Link>
    </article>
  )
}
