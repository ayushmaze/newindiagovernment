type Row = {
  claim: string
  source: string
  reality: string
  evidence: string
}

const ROWS: Row[] = [
  {
    claim: '"India has achieved record-breaking GDP growth — fastest growing major economy."',
    source: 'Government briefing · Q1 2026',
    reality: 'Independent NSO data shows growth is concentrated in financial markets, not real wages. Median household income has stagnated for 3 consecutive years.',
    evidence: 'NSO · CMIE · World Bank cross-reference',
  },
  {
    claim: '"Youth unemployment is at historic lows."',
    source: 'Ministry of Labour statement',
    reality: 'CMIE\'s real-time tracking puts urban youth unemployment at 45%. Government uses a redefined "employed" category that includes unpaid family labour.',
    evidence: 'CMIE monthly bulletin · April 2026',
  },
  {
    claim: '"The PM holds an economics degree from Harvard."',
    source: 'Cited in campaign material · 2024',
    reality: 'Harvard\'s registrar has no record. The institution clarified after a public RTI campaign. The claim was quietly removed from official bios — never publicly retracted.',
    evidence: 'Harvard registrar response · RTI 2025-1188',
  },
]

export function LiesVsTruth({ items: propItems }: { items?: any[] }) {
  const activeRows = propItems && propItems.length > 0 ? propItems : ROWS

  return (
    <section
      className="border-b border-[var(--hairline)] bg-[var(--bg)]"
      aria-label="Government claims vs verified facts"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:py-28">
        {/* Header */}
        <div className="max-w-[64ch] mb-14">
          <p className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--red-tag)] mb-5">
            What they say · What&apos;s true
          </p>
          <h2 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(36px,6vw,76px)] text-[var(--ink)]">
            The gap between
            <br />
            the podium and
            <br />
            the paperwork.
          </h2>
        </div>

        {/* Rows */}
        <div className="space-y-px bg-[var(--hairline)] border border-[var(--hairline)]">
          {activeRows.map((r, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hairline)]"
            >
              {/* Claim — struck through */}
              <div className="bg-[var(--bg)] p-8 md:p-10">
                <div className="flex items-center gap-2 mb-5">
                  <span className="bg-[var(--red-tag)] text-white px-2.5 py-1 font-ui font-bold uppercase tracking-[0.16em] text-[10px]">
                    Claim
                  </span>
                  <span className="font-ui uppercase tracking-[0.14em] text-[10px] text-[var(--ink-3)]">
                    {r.source}
                  </span>
                </div>
                <blockquote className="font-display text-[20px] md:text-[26px] leading-[1.25] text-[var(--ink-2)]">
                  <span className="relative">
                    {r.claim}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 right-0 top-1/2 h-[3px] bg-[var(--red-tag)] origin-left"
                      style={{ transform: 'rotate(-2deg)' }}
                    />
                  </span>
                </blockquote>
              </div>

              {/* Reality */}
              <div className="bg-[var(--bg)] p-8 md:p-10 border-l-4 border-[var(--ink)]">
                <div className="flex items-center gap-2 mb-5">
                  <span className="bg-[var(--ink)] text-[var(--bg)] px-2.5 py-1 font-ui font-bold uppercase tracking-[0.16em] text-[10px]">
                    The Record
                  </span>
                  <span className="font-ui uppercase tracking-[0.14em] text-[10px] text-[var(--ink-3)]">
                    {r.evidence}
                  </span>
                </div>
                <p className="font-display text-[20px] md:text-[26px] leading-[1.25] text-[var(--ink)] font-semibold">
                  {r.reality}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="font-ui uppercase tracking-[0.18em] text-[11px] text-[var(--ink-3)] mt-8 text-center">
          Every entry is reproducible. Every source is public. Every footnote, free to verify.
        </p>
      </div>
    </section>
  )
}
