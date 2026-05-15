import type { TimelineEntry } from './types'

interface TimelineRailProps {
  entries: TimelineEntry[]
}

/**
 * Vertical timeline with a thick rail and date "dots".
 * Designed to read like a court chronology — clean, dense.
 */
export function TimelineRail({ entries }: TimelineRailProps) {
  if (!entries.length) return null

  return (
    <section className="my-14" aria-label="Timeline">
      <div className="border-t-2 border-[var(--ink)] pt-4 mb-8">
        <h2 className="font-display font-bold text-[26px] md:text-[32px] text-[var(--ink)]">
          Timeline
        </h2>
        <p className="font-body text-[14px] md:text-[15px] text-[var(--ink-3)] mt-1 italic">
          The key dates that frame the story.
        </p>
      </div>

      <ol className="relative pl-6 md:pl-10">
        {/* Rail */}
        <span
          className="absolute left-2 md:left-4 top-1 bottom-1 w-[2px] bg-[var(--ink)]"
          aria-hidden="true"
        />

        {entries.map((e, i) => (
          <li key={i} className="relative pb-7 last:pb-0">
            {/* Dot */}
            <span
              className="absolute -left-[18px] md:-left-[26px] top-[7px] w-[14px] h-[14px] rounded-full border-[3px] border-[var(--ink)] bg-white"
              aria-hidden="true"
            />
            <div className="pl-2">
              <p className="font-ui font-bold uppercase tracking-[0.18em] text-[11px] text-[var(--red-tag)] mb-1">
                {e.date}
              </p>
              <p className="font-body text-[16px] md:text-[17px] leading-[1.5] text-[var(--ink)]">
                {e.event}
              </p>
              {e.sourceUrl && (
                <a
                  href={e.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-1 font-ui text-[11px] uppercase tracking-[0.1em] text-[var(--ink-3)] underline decoration-dotted underline-offset-2 hover:text-[var(--ink)]"
                >
                  {e.sourceLabel ?? 'Source'} ↗
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
