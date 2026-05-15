import Link from 'next/link'

type Crisis = {
  num: string
  stat: string
  unit?: string
  title: string
  body: string
  source: string
  href: string
}

const CRISES: Crisis[] = [
  {
    num: '01',
    stat: '45',
    unit: '%',
    title: 'Youth Without Work',
    body: 'CMIE data shows urban youth unemployment crossing 45% — even as official briefings claim &quot;record job creation.&quot;',
    source: 'CMIE · April 2026',
    href: '/category/economy',
  },
  {
    num: '02',
    stat: '15',
    unit: '%',
    title: 'Education, Quietly Defunded',
    body: 'Ministry of Finance documents reveal the education budget has fallen 15% in real, inflation-adjusted terms over five years.',
    source: 'MoF disclosure · 2025',
    href: '/category/policy',
  },
  {
    num: '03',
    stat: '₹0',
    title: 'Accountability for Defence Disclosures',
    body: 'The Adani Ports defence-contract disclosure remains unanswered. Citizens deserve to know who profits from national security.',
    source: 'Defence Ministry RTI · pending',
    href: '/category/investigations',
  },
  {
    num: '04',
    stat: '∞',
    title: 'The Lies We&apos;re Asked To Believe',
    body: 'From GDP claims to Harvard credentials — every week brings another statement that doesn&apos;t survive a single citation check.',
    source: 'NIG Fact-Check Desk',
    href: '/category/fact-check',
  },
]

export function CrisisGrid() {
  return (
    <section
      id="evidence"
      className="border-b border-[var(--hairline)] bg-[var(--ink)] text-[var(--bg)]"
      aria-label="The reckoning — four crises India must confront"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:py-28">
        {/* Section header */}
        <div className="max-w-[60ch] mb-16">
          <p className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--pink-chip)] mb-5">
            The Reckoning
          </p>
          <h2 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(36px,6vw,80px)]">
            Four truths
            <br />
            the headlines
            <br />
            won&apos;t tell you.
          </h2>
          <p className="font-display text-[18px] md:text-[22px] leading-snug text-[var(--bg)]/70 mt-8">
            Every claim below is sourced, dated, and cross-referenced. No spin. No partisan framing.
            Just what the government&apos;s own data quietly admits.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--bg)]/15">
          {CRISES.map((c) => (
            <Link
              key={c.num}
              href={c.href}
              className="group bg-[var(--ink)] p-8 md:p-10 hover:bg-[var(--bg)]/5 transition-colors block"
            >
              <div className="flex items-start justify-between gap-6">
                <span className="font-ui uppercase tracking-[0.22em] text-[11px] text-[var(--bg)]/40">
                  {c.num}
                </span>
                <span className="font-display font-black text-[clamp(48px,6vw,80px)] leading-none text-[var(--pink-chip)] tabular-nums">
                  {c.stat}
                  {c.unit && (
                    <span className="text-[var(--bg)]/50">{c.unit}</span>
                  )}
                </span>
              </div>

              <h3
                className="font-display font-black text-[clamp(24px,3vw,36px)] leading-[1.1] mt-8"
                dangerouslySetInnerHTML={{ __html: c.title }}
              />

              <p
                className="font-display text-[16px] md:text-[18px] leading-snug text-[var(--bg)]/75 mt-5"
                dangerouslySetInnerHTML={{ __html: c.body }}
              />

              <div className="mt-8 pt-5 border-t border-[var(--bg)]/15 flex items-center justify-between">
                <span className="font-ui uppercase tracking-[0.14em] text-[10px] text-[var(--bg)]/50">
                  {c.source}
                </span>
                <span className="font-ui font-bold uppercase tracking-[0.16em] text-[11px] text-[var(--pink-chip)] inline-flex items-center gap-2">
                  Read the file
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
