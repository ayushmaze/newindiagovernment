import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { ArticleCard } from '@/components/article/ArticleCard'
import { generateBaseMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload
    .find({
      collection: 'categories',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    .catch(() => ({ docs: [] }))
  const cat = docs[0] as { name?: string } | undefined
  return generateBaseMetadata(cat?.name ?? slug)
}

const PAGE_SIZE = 12

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { page: pageParam } = await searchParams
  const page = Math.max(1, parseInt(pageParam ?? '1', 10))

  const payload = await getPayload({ config })

  const [catResult, articlesResult] = await Promise.all([
    payload.find({
      collection: 'categories',
      where: { slug: { equals: slug } },
      limit: 1,
    }),
    payload.find({
      collection: 'articles',
      where: {
        status: { equals: 'published' },
        'category.slug': { equals: slug },
      },
      sort: '-publishedAt',
      limit: PAGE_SIZE,
      page,
      depth: 2,
    }),
  ]).catch(() => {
    notFound()
  })

  if (!catResult || !articlesResult) notFound()

  const cat = catResult.docs[0] as { name?: string; description?: string } | undefined
  if (!cat) notFound()

  const articles = articlesResult.docs as unknown as Array<{
    id: string
    title: string
    slug: string
    kicker?: string
    excerpt?: string
    heroImage?: { url?: string; alt?: string; sizes?: { thumbnail?: { url?: string } } } | null
    author?: { name?: string } | null
    publishedAt?: string
  }>

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-10">
      <div className="border-b-2 border-[var(--divider)] pb-6 mb-10">
        <p className="font-ui font-bold uppercase tracking-[0.2em] text-[11px] text-[var(--red-tag)] mb-2">
          Section
        </p>
        <h1 className="font-display font-black text-[56px] uppercase tracking-[0.02em] text-[var(--ink)]">
          {cat.name}
        </h1>
        {cat.description && (
          <p className="font-body text-[16px] text-[var(--ink-2)] mt-3 max-w-2xl">
            {cat.description}
          </p>
        )}
        <p className="font-ui uppercase tracking-[0.14em] text-[11px] text-[var(--ink-3)] mt-4">
          {articlesResult.totalDocs} stories
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {articles.map((a) => (
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
      ) : (
        <p className="font-ui uppercase tracking-[0.16em] text-[13px] text-[var(--ink-3)] text-center py-20">
          No stories yet in this section.
        </p>
      )}

      {articlesResult.totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-12">
          {page > 1 && (
            <a
              href={`/category/${slug}?page=${page - 1}`}
              className="font-ui font-bold uppercase tracking-[0.14em] text-[12px] border border-[var(--ink)] px-5 py-2.5 hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors"
            >
              ← Previous
            </a>
          )}
          <span className="font-ui uppercase tracking-[0.14em] text-[12px] text-[var(--ink-3)] flex items-center px-4">
            Page {page} of {articlesResult.totalPages}
          </span>
          {page < articlesResult.totalPages && (
            <a
              href={`/category/${slug}?page=${page + 1}`}
              className="font-ui font-bold uppercase tracking-[0.14em] text-[12px] border border-[var(--ink)] px-5 py-2.5 hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors"
            >
              Next →
            </a>
          )}
        </div>
      )}
    </div>
  )
}
