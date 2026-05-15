import type { ColumnPoint } from './types'

interface RightWrongColumnsProps {
  whatIsRight: ColumnPoint[]
  whatIsWrong: ColumnPoint[]
}

/**
 * Two-column breakdown: what's right (green) on the left, what's wrong (red)
 * on the right. Mobile stacks. Empty columns are omitted.
 */
export function RightWrongColumns({ whatIsRight, whatIsWrong }: RightWrongColumnsProps) {
  if (!whatIsRight.length && !whatIsWrong.length) return null

  return (
    <section className="my-14" aria-label="What is right vs what is wrong">
      <div className="border-t-2 border-[var(--ink)] pt-4 mb-8">
        <h2 className="font-display font-bold text-[26px] md:text-[32px] text-[var(--ink)]">
          The Breakdown
        </h2>
        <p className="font-body text-[14px] md:text-[15px] text-[var(--ink-3)] mt-1 italic">
          Where the claim holds, and where it falls apart.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {whatIsRight.length > 0 && (
          <ColumnBlock
            title="What is right"
            accent="#0f5d3b"
            tagBg="#e7f6ec"
            tagFg="#0f5d3b"
            symbol="✓"
            points={whatIsRight}
          />
        )}
        {whatIsWrong.length > 0 && (
          <ColumnBlock
            title="What is wrong"
            accent="#c81e1e"
            tagBg="#fde7e7"
            tagFg="#c81e1e"
            symbol="✕"
            points={whatIsWrong}
          />
        )}
      </div>
    </section>
  )
}

function ColumnBlock({
  title,
  accent,
  tagBg,
  tagFg,
  symbol,
  points,
}: {
  title: string
  accent: string
  tagBg: string
  tagFg: string
  symbol: string
  points: ColumnPoint[]
}) {
  return (
    <div className="border border-[var(--hairline)] bg-white">
      <div
        className="px-5 py-3 flex items-center gap-3 border-b-2"
        style={{ borderColor: accent, background: tagBg }}
      >
        <span
          className="font-display font-black text-[18px] w-7 h-7 flex items-center justify-center rounded-full"
          style={{ background: accent, color: '#fff' }}
        >
          {symbol}
        </span>
        <h3
          className="font-ui font-bold uppercase tracking-[0.2em] text-[12px]"
          style={{ color: tagFg }}
        >
          {title}
        </h3>
      </div>
      <ol className="divide-y divide-[var(--hairline)]">
        {points.map((p, i) => (
          <li key={i} className="p-5">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-display font-black text-[15px] text-[var(--ink-3)]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h4 className="font-display font-bold text-[18px] leading-[1.3] text-[var(--ink)]">
                {p.point}
              </h4>
            </div>
            <p className="font-body text-[15px] leading-[1.55] text-[var(--ink-2)] ml-7">
              {p.detail}
            </p>
            {p.sources && p.sources.length > 0 && (
              <ul className="mt-3 ml-7 flex flex-wrap gap-x-3 gap-y-1">
                {p.sources.map((s, j) => (
                  <li key={j}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-ui text-[11px] uppercase tracking-[0.1em] underline decoration-dotted underline-offset-2 hover:no-underline"
                      style={{ color: accent }}
                    >
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
