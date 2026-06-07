import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { FALLBACK_TICKER_ITEMS, type FallbackVerdict } from '@/lib/factCheckFallback'

type Verdict = FallbackVerdict | undefined

function verdictBadge(v: Verdict): { label: string; cls: string } {
  switch (v) {
    case 'false':
      return { label: 'FALSE', cls: 'bg-[var(--red-tag)] text-white' }
    case 'misleading':
      return { label: 'MISLEADING', cls: 'bg-[var(--red-tag)] text-white' }
    case 'mostly-false':
      return { label: 'MOSTLY FALSE', cls: 'bg-[#e35d5d] text-white' }
    case 'mixed':
      return { label: 'MIXED', cls: 'bg-[var(--gold-petition)] text-white' }
    case 'true':
      return { label: 'TRUE', cls: 'bg-[#3a7d44] text-white' }
    default:
      return { label: 'UNVERIFIED', cls: 'bg-[var(--ink-3)] text-white' }
  }
}

type TickerEntry = {
  id: string
  claim: string
  credibilityScore: number
  verdict?: Verdict
  href?: string
}

export async function FactCheckTicker() {
  let entries: TickerEntry[] = []

  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'ticker-items',
      where: { active: { equals: true } },
      sort: 'order',
      limit: 40,
      depth: 1,
    })
    const docs = result.docs as Array<{
      id: string
      claim: string
      credibilityScore: number
      verdict?: Verdict
      linkedArticle?: { slug?: string } | string | null
    }>
    entries = docs.map((d) => {
      const linked =
        d.linkedArticle && typeof d.linkedArticle === 'object' ? d.linkedArticle : null
      return {
        id: d.id,
        claim: d.claim,
        credibilityScore: d.credibilityScore,
        verdict: d.verdict,
        href: linked?.slug ? `/article/${linked.slug}` : undefined,
      }
    })
  } catch {
    // DB unavailable — fall through to fallback below.
  }

  // If editorial hasn't seeded any ticker items yet, use the curated fallback
  // so visitors never see "no fact-checks yet".
  if (entries.length === 0) {
    entries = FALLBACK_TICKER_ITEMS.map((f) => ({
      id: f.id,
      claim: f.claim,
      credibilityScore: f.credibilityScore,
      verdict: f.verdict,
      href: f.href,
    }))
  }

  // Duplicate for a seamless marquee loop
  const items = [...entries, ...entries]

  return (
    <div className="w-full bg-[var(--pink-ticker-bg)] border-y-2 border-[var(--divider)] overflow-hidden">
      <div className="mx-auto max-w-[1440px] flex items-stretch gap-0 px-4 sm:px-6 h-11 sm:h-12">
        {/* Bold red label block */}
        <div className="flex items-center gap-2 pr-3 sm:pr-5 border-r border-[var(--ink)]/15 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--red-tag)] opacity-60 pulse-dot"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--red-tag)]"></span>
          </span>
          <span className="font-ui font-black uppercase tracking-[0.18em] sm:tracking-[0.22em] text-[10px] sm:text-[12px] text-[var(--red-tag)] whitespace-nowrap">
            Fact-Check · Live
          </span>
        </div>

        <div className="marquee-wrap relative flex-1 overflow-hidden flex items-center pl-3 sm:pl-5">
          <ul
            className="flex gap-8 sm:gap-10 whitespace-nowrap animate-marquee"
            aria-label="Scrolling fact-check verdicts"
          >
            {items.map((it, i) => {
              const v = verdictBadge(it.verdict)
              const content = (
                <span className="flex items-center gap-2 sm:gap-2.5 font-ui text-[12px] sm:text-[13px] text-[var(--ink)]">
                  <span
                    className={`px-1.5 sm:px-2 py-0.5 font-bold tracking-[0.1em] text-[9px] sm:text-[10px] ${v.cls} shrink-0`}
                  >
                    {v.label}
                  </span>
                  <span className="font-ui">{it.claim}</span>
                  <span
                    className="bg-white border border-[var(--ink)]/15 px-1.5 sm:px-2 py-0.5 font-bold tracking-wide text-[11px] sm:text-[12px] shrink-0"
                    title={`Credibility score: ${it.credibilityScore.toFixed(1)}/10`}
                  >
                    {it.credibilityScore.toFixed(1)}
                    <span className="opacity-50 text-[9px] sm:text-[10px]">/10</span>
                  </span>
                </span>
              )

              return (
                <li key={`${it.id}-${i}`} className="shrink-0">
                  {it.href ? (
                    <Link
                      href={it.href}
                      className="hover:opacity-70 transition-opacity"
                    >
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
