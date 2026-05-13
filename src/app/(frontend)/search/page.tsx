import { getPayload } from 'payload'
import config from '@payload-config'
import { ArticleCard } from '@/components/article/ArticleCard'
import { generateBaseMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = generateBaseMetadata('Search')

interface PageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams
  const query = q?.trim() ?? ''

  let results: Array<{
    id: string
    title: string
    slug: string
    kicker?: string
    excerpt?: string
    heroImage?: { url?: string; alt?: string; sizes?: { thumbnail?: { url?: string } } } | null
    author?: { name?: string } | null
    publishedAt?: string
  }> = []

  if (query.length >= 2) {
    const payload = await getPayload({ config })
    const { docs } = await payload
      .find({
        collection: 'articles',
        where: {
          status: { equals: 'published' },
          or: [{ title: { like: query } }, { excerpt: { like: query } }],
        },
        sort: '-publishedAt',
        limit: 20,
        depth: 2,
      })
      .catch(() => ({ docs: [] }))
    results = docs as unknown as typeof results
  }

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-10">
      <h1 className="font-display font-black text-[48px] uppercase tracking-[0.02em] text-[var(--ink)] mb-6">
        Search
      </h1>

      <form method="get" action="/search" className="mb-10">
        <div className="flex gap-3 max-w-2xl">
          <label htmlFor="search-input" className="sr-only">
            Search articles
          </label>
          <input
            id="search-input"
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search fact-checks, investigations, leaders..."
            className="flex-1 border-2 border-[var(--ink)] px-4 py-3 font-body text-[16px] text-[var(--ink)] placeholder:text-[var(--ink-3)] focus:outline-none focus:border-[var(--lavender-hover)]"
          />
          <button
            type="submit"
            className="bg-[var(--ink)] text-[var(--bg)] font-ui font-bold uppercase tracking-[0.16em] text-[12px] px-6 py-3 hover:bg-[var(--lavender-hover)] transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {query.length >= 2 ? (
        results.length > 0 ? (
          <>
            <p className="font-ui uppercase tracking-[0.14em] text-[11px] text-[var(--ink-3)] mb-8">
              {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {results.map((a) => (
                <ArticleCard
                  key={a.id}
                  title={a.title}
                  slug={a.slug}
                  kicker={a.kicker}
                  excerpt={a.excerpt}
                  heroImage={a.heroImage}
                  author={a.author}
                  publishedAt={a.publishedAt}
                  variant="left"
                />
              ))}
            </div>
          </>
        ) : (
          <p className="font-ui uppercase tracking-[0.16em] text-[13px] text-[var(--ink-3)] text-center py-20">
            No results for &ldquo;{query}&rdquo;.
          </p>
        )
      ) : query.length > 0 ? (
        <p className="font-ui uppercase tracking-[0.14em] text-[11px] text-[var(--ink-3)]">
          Please enter at least 2 characters to search.
        </p>
      ) : null}
    </div>
  )
}
