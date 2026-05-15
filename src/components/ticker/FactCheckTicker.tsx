import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'

type Verdict = 'misleading' | 'false' | 'mostly-false' | 'mixed' | 'true' | undefined

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

export async function FactCheckTicker() {
  const payload = await getPayload({ config })

  let docs: Array<{
    id: string
    claim: string
    credibilityScore: number
    verdict?: Verdict
    linkedArticle?: { slug?: string } | string | null
  }> = []

  try {
    const result = await payload.find({
      collection: 'ticker-items',
      where: { active: { equals: true } },
      sort: 'order',
      limit: 40,
      depth: 1,
    })
    docs = result.docs as typeof docs
  } catch {
    // Return empty ticker if DB unavailable
  }

  const items = [...docs, ...docs]

  return (
    <div className="w-full bg-[var(--pink-ticker-bg)] border-y-2 border-[var(--divider)] overflow-hidden">
      <div className="mx-auto max-w-[1440px] flex items-stretch gap-0 px-6 h-12">
        {/* Bold red label block */}
        <div className="flex items-center gap-2 pr-5 border-r border-[var(--ink)]/15 shrink-0">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--red-tag)] opacity-60 pulse-dot"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--red-tag)]"></span>
          </span>
          <span className="font-ui font-black uppercase tracking-[0.22em] text-[12px] text-[var(--red-tag)] whitespace-nowrap">
            Fact-Check · Live
          </span>
        </div>

        <div className="marquee-wrap relative flex-1 overflow-hidden flex items-center pl-5">
          {items.length > 0 ? (
            <ul
              className="flex gap-10 whitespace-nowrap animate-marquee"
              aria-label="Scrolling fact-check verdicts"
            >
              {items.map((it, i) => {
                const article =
                  it.linkedArticle && typeof it.linkedArticle === 'object'
                    ? it.linkedArticle
                    : null
                const slug = article?.slug
                const v = verdictBadge(it.verdict)
                const content = (
                  <span className="flex items-center gap-2.5 font-ui text-[13px] text-[var(--ink)]">
                    <span
                      className={`px-2 py-0.5 font-bold tracking-[0.1em] text-[10px] ${v.cls} shrink-0`}
                    >
                      {v.label}
                    </span>
                    <span className="truncate max-w-[52ch] font-ui">{it.claim}</span>
                    <span
                      className="bg-white border border-[var(--ink)]/15 px-2 py-0.5 font-bold tracking-wide text-[12px] shrink-0"
                      title={`Credibility score: ${it.credibilityScore.toFixed(1)}/10`}
                    >
                      {it.credibilityScore.toFixed(1)}
                      <span className="opacity-50 text-[10px]">/10</span>
                    </span>
                  </span>
                )

                return (
                  <li key={i} className="shrink-0">
                    {slug ? (
                      <Link
                        href={`/article/${slug}`}
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
          ) : (
            <p className="font-ui text-[13px] text-[var(--ink-3)]">
              No fact-checks yet. Check back soon.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
