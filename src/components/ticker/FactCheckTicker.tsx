import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'

export async function FactCheckTicker() {
  const payload = await getPayload({ config })

  let docs: Array<{
    id: string
    claim: string
    credibilityScore: number
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

  // Duplicate for seamless infinite marquee
  const items = [...docs, ...docs]

  return (
    <div className="w-full bg-[var(--pink-ticker-bg)] border-y border-[var(--hairline)] overflow-hidden">
      <div className="mx-auto max-w-[1440px] flex items-center gap-6 px-6 h-11">
        <span className="font-ui font-bold uppercase tracking-[0.2em] text-[11px] text-[var(--red-tag)] shrink-0 whitespace-nowrap">
          Fact-Check Scores
        </span>
        <div className="relative flex-1 overflow-hidden">
          {items.length > 0 ? (
            <ul
              className="flex gap-10 whitespace-nowrap animate-marquee"
              aria-label="Scrolling fact-check scores"
            >
              {items.map((it, i) => {
                const article =
                  it.linkedArticle && typeof it.linkedArticle === 'object'
                    ? it.linkedArticle
                    : null
                const slug = article?.slug

                return (
                  <li
                    key={i}
                    className="flex items-center gap-2 font-ui text-[13px] text-[var(--ink)]"
                  >
                    {slug ? (
                      <Link
                        href={`/article/${slug}`}
                        className="truncate max-w-[40ch] hover:underline"
                      >
                        {it.claim}
                      </Link>
                    ) : (
                      <span className="truncate max-w-[40ch]">{it.claim}</span>
                    )}
                    <span
                      className="bg-[var(--pink-chip)] px-2 py-0.5 font-bold tracking-wide shrink-0"
                      title={`Credibility score: ${it.credibilityScore.toFixed(1)}/10`}
                    >
                      {it.credibilityScore.toFixed(1)}
                    </span>
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
