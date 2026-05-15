import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { EditorialImage } from '@/components/article/EditorialImage'
import { ArticleCard } from '@/components/article/ArticleCard'
import { generateArticleMetadata } from '@/lib/seo'
import { formatShortDate } from '@/lib/format'
import { VerdictHero } from '@/components/factCheck/VerdictHero'
import { ClaimVsTruthPanel } from '@/components/factCheck/ClaimVsTruthPanel'
import { RightWrongColumns } from '@/components/factCheck/RightWrongColumns'
import { TimelineRail } from '@/components/factCheck/TimelineRail'
import { Receipts } from '@/components/factCheck/Receipts'
import { ImpactBlock } from '@/components/factCheck/ImpactBlock'
import { WhatCanBeDoneBlock } from '@/components/factCheck/WhatCanBeDoneBlock'
import { ClaimLedger } from '@/components/factCheck/ClaimLedger'
import type {
  AtomicClaim,
  ClaimVsTruthEntry,
  ColumnPoint,
  Impact,
  ReceiptCard,
  TimelineEntry,
  Verdict,
  WhatCanBeDone,
} from '@/components/factCheck/types'
import type { Metadata } from 'next'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  try {
    const { docs } = await payload.find({
      collection: 'articles',
      where: { slug: { equals: slug }, status: { equals: 'published' } },
      depth: 2,
      limit: 1,
    })

    const article = docs[0] as Record<string, unknown> | undefined
    if (!article) return {}

    const heroImage = article.heroImage as { url?: string } | null | undefined

    return generateArticleMetadata({
      title: String(article.title ?? ''),
      description: String(article.excerpt ?? ''),
      ogImage: heroImage?.url,
      publishedAt: article.publishedAt ? String(article.publishedAt) : undefined,
      author:
        article.author && typeof article.author === 'object'
          ? (article.author as { name?: string }).name
          : undefined,
    })
  } catch {
    return {}
  }
}

// ---------------- helpers ----------------

function asArray<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v as T[]) : []
}

function asString(v: unknown): string | null {
  if (v === null || v === undefined) return null
  const s = String(v).trim()
  return s.length ? s : null
}

// ---------------- page ----------------

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    depth: 3,
    limit: 1,
  })

  const rawArticle = docs[0] as Record<string, unknown> | undefined
  if (!rawArticle) notFound()

  const article = rawArticle!

  // Core fields
  const title = String(article.title ?? '')
  const kicker = asString(article.kicker)
  const excerpt = asString(article.excerpt)
  const publishedAt = asString(article.publishedAt)
  const credibilityScore =
    article.credibilityScore != null ? Number(article.credibilityScore) : null
  const sources = asArray<{ label: string; url: string }>(article.sources)

  const author =
    typeof article.author === 'object' && article.author
      ? (article.author as { name?: string; bio?: string; avatar?: { url?: string; alt?: string } | null })
      : null

  const heroImage =
    typeof article.heroImage === 'object' && article.heroImage
      ? (article.heroImage as {
          url?: string
          alt?: string
          sizes?: { hero?: { url?: string }; card?: { url?: string } }
        })
      : null

  const category =
    typeof article.category === 'object' && article.category
      ? (article.category as { name?: string; slug?: string; id?: string })
      : null

  const imgUrl = heroImage?.sizes?.hero?.url ?? heroImage?.sizes?.card?.url ?? heroImage?.url

  // ----- Fact-check structured fields -----
  const verdict = asString(article.factCheckVerdict) as Verdict | null
  const isFactCheck = Boolean(verdict)

  const claimVsTruth = asArray<ClaimVsTruthEntry>(article.claimVsTruth)
  const whatIsRight = asArray<ColumnPoint>(article.whatIsRight)
  const whatIsWrong = asArray<ColumnPoint>(article.whatIsWrong)
  const timeline = asArray<TimelineEntry>(article.timeline)
  const receipts = asArray<ReceiptCard>(article.receipts)
  const impact = (article.impact ?? null) as Impact | null
  const whatCanBeDone = (article.whatCanBeDone ?? null) as WhatCanBeDone | null
  const claimLedger = asArray<AtomicClaim>(article.factCheckClaims)

  // Related articles
  const { docs: related } = await payload
    .find({
      collection: 'articles',
      where: {
        status: { equals: 'published' },
        category: {
          equals:
            category?.id ?? (typeof article.category === 'string' ? article.category : ''),
        },
        slug: { not_equals: slug },
      },
      sort: '-publishedAt',
      limit: 3,
      depth: 2,
    })
    .catch(() => ({ docs: [] }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    image: imgUrl ? [imgUrl] : undefined,
    datePublished: publishedAt,
    dateModified: article.updatedAt,
    author: author?.name ? [{ '@type': 'Person', name: author.name }] : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'The New India Government',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/badge.svg`,
      },
    },
    description: excerpt,
  }

  // ---------- FACT-CHECK MAGAZINE LAYOUT ----------
  if (isFactCheck) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <article className="mx-auto max-w-[1100px] px-5 md:px-8 py-8 md:py-12">
          <VerdictHero
            verdict={verdict!}
            credibilityScore={credibilityScore}
            title={title}
            dek={excerpt}
            kicker={kicker}
            category={category?.name ?? null}
            author={author?.name ?? null}
            publishedAt={publishedAt ? formatShortDate(publishedAt) : null}
          />

          {imgUrl && (
            <figure className="mb-12">
              <EditorialImage
                src={imgUrl}
                alt={heroImage?.alt ?? title}
                width={1100}
                height={620}
                priority
                sizes="(max-width: 768px) 100vw, 1100px"
                className="w-full"
              />
              {heroImage?.alt && (
                <figcaption className="mt-3 font-ui text-[12px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
                  {heroImage.alt}
                </figcaption>
              )}
            </figure>
          )}

          {/* Editor narrative — the connective tissue */}
          {!!article.body && (
            <div className="prose max-w-[68ch] mx-auto font-body text-[18px] leading-[1.65] text-[var(--ink)] prose-headings:font-display prose-headings:font-bold prose-headings:text-[var(--ink)] prose-h2:text-[24px] prose-h2:mt-10 prose-h2:mb-3 prose-a:text-[var(--lavender-hover)] prose-a:underline prose-a:decoration-dotted prose-a:underline-offset-2 prose-strong:text-[var(--ink)] prose-li:my-1">
              <div
                dangerouslySetInnerHTML={{
                  __html: richTextToHtml(article.body),
                }}
              />
            </div>
          )}

          {/* Structured magazine sections */}
          <ClaimVsTruthPanel entries={claimVsTruth} verdict={verdict!} />
          <RightWrongColumns whatIsRight={whatIsRight} whatIsWrong={whatIsWrong} />
          <TimelineRail entries={timeline} />
          <Receipts receipts={receipts} />
          {impact && <ImpactBlock impact={impact} />}
          {whatCanBeDone && <WhatCanBeDoneBlock data={whatCanBeDone} />}
          <ClaimLedger claims={claimLedger} />

          {/* Master sources list */}
          {sources.length > 0 && (
            <section className="my-14" aria-label="All sources">
              <div className="border-t-2 border-[var(--ink)] pt-4 mb-6">
                <h2 className="font-display font-bold text-[26px] md:text-[32px] text-[var(--ink)]">
                  All Sources
                </h2>
                <p className="font-body text-[14px] md:text-[15px] text-[var(--ink-3)] mt-1 italic">
                  Every URL we relied on, deduplicated.
                </p>
              </div>
              <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                {sources.map((s, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-display font-black text-[12px] text-[var(--ink-3)] shrink-0 mt-1 w-7">
                      [{i + 1}]
                    </span>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-[14px] text-[var(--ink)] hover:text-[var(--lavender-hover)] break-all"
                    >
                      {s.label}
                      <span className="ml-1 text-[10px] text-[var(--ink-3)]" aria-label="Opens in new tab">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {related.length > 0 && (
            <section
              className="mt-16 pt-8 border-t-2 border-[var(--divider)]"
              aria-label="Related articles"
            >
              <h2 className="font-ui font-bold uppercase tracking-[0.2em] text-[13px] text-[var(--ink)] mb-8">
                Related Stories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((a) => renderRelated(a))}
              </div>
            </section>
          )}
        </article>
      </>
    )
  }

  // ---------- DEFAULT (non-fact-check) LAYOUT ----------
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-[1440px] px-6 py-10">
        <div className="xl:grid xl:grid-cols-12 xl:gap-12">
          {credibilityScore !== null && (
            <aside className="hidden xl:block xl:col-span-2">
              <div className="sticky top-20 text-center">
                <p className="font-ui font-bold uppercase tracking-[0.2em] text-[10px] text-[var(--ink-3)] mb-2">
                  Credibility
                </p>
                <div
                  className="w-16 h-16 mx-auto flex items-center justify-center border-2 text-[20px] font-display font-black"
                  style={{
                    borderColor:
                      credibilityScore < 4
                        ? 'var(--red-tag)'
                        : credibilityScore < 7
                          ? 'var(--gold-petition)'
                          : 'var(--ink)',
                    color: credibilityScore < 4 ? 'var(--red-tag)' : 'var(--ink)',
                  }}
                >
                  {credibilityScore.toFixed(1)}
                </div>
                <p className="font-ui text-[10px] text-[var(--ink-3)] mt-1">out of 10</p>
              </div>
            </aside>
          )}

          <main className="xl:col-span-7">
            {kicker && (
              <p className="font-ui font-bold uppercase tracking-[0.2em] text-[11px] text-[var(--red-tag)] mb-3">
                {kicker}
              </p>
            )}

            <h1 className="font-display font-bold text-[40px] md:text-[60px] leading-[1.02] text-[var(--ink)] mb-6">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-8 pb-4 border-b border-[var(--hairline)]">
              {author?.name && (
                <span className="font-ui uppercase tracking-[0.16em] text-[11px] text-[var(--ink-3)]">
                  {author.name}
                </span>
              )}
              {publishedAt && (
                <span className="font-ui uppercase tracking-[0.16em] text-[11px] text-[var(--ink-3)]">
                  {formatShortDate(publishedAt)}
                </span>
              )}
              {category?.name && (
                <span className="font-ui font-bold uppercase tracking-[0.16em] text-[11px] text-[var(--lavender-hover)]">
                  {category.name}
                </span>
              )}
            </div>

            {imgUrl && (
              <div className="mb-8">
                <EditorialImage
                  src={imgUrl}
                  alt={heroImage?.alt ?? title}
                  width={800}
                  height={500}
                  priority
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="w-full"
                />
              </div>
            )}

            {excerpt && (
              <p className="font-body text-[19px] italic leading-[1.6] text-[var(--ink-2)] mb-8 border-l-4 border-[var(--lavender-hover)] pl-5">
                {excerpt}
              </p>
            )}

            {!!article.body && (
              <div className="font-body text-[17px] leading-[1.65] text-[var(--ink)] prose max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-[var(--lavender-hover)]">
                <div
                  dangerouslySetInnerHTML={{
                    __html: richTextToHtml(article.body),
                  }}
                />
              </div>
            )}

            {sources.length > 0 && (
              <div className="mt-10 pt-6 border-t border-[var(--hairline)]">
                <h3 className="font-ui font-bold uppercase tracking-[0.2em] text-[11px] text-[var(--ink)] mb-4">
                  Sources
                </h3>
                <ul className="space-y-2">
                  {sources.map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-ui text-[11px] text-[var(--ink-3)] shrink-0 mt-0.5">
                        [{i + 1}]
                      </span>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-[14px] text-[var(--lavender-hover)] hover:underline break-all"
                      >
                        {s.label}
                        <span className="ml-1 text-[10px]" aria-label="Opens in new tab">
                          ↗
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </main>
        </div>

        {related.length > 0 && (
          <section
            className="mt-16 pt-8 border-t-2 border-[var(--divider)]"
            aria-label="Related articles"
          >
            <h2 className="font-ui font-bold uppercase tracking-[0.2em] text-[13px] text-[var(--ink)] mb-8">
              Related Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((a) => renderRelated(a))}
            </div>
          </section>
        )}
      </article>
    </>
  )
}

// -------------- helpers --------------

function renderRelated(a: unknown) {
  const ra = a as {
    id: string
    title: string
    slug: string
    kicker?: string
    excerpt?: string
    heroImage?: {
      url?: string
      alt?: string
      sizes?: { thumbnail?: { url?: string } }
    } | null
    author?: { name?: string } | null
    publishedAt?: string
  }
  return (
    <ArticleCard
      key={ra.id}
      title={ra.title}
      slug={ra.slug}
      kicker={ra.kicker}
      excerpt={ra.excerpt}
      heroImage={ra.heroImage}
      author={ra.author}
      publishedAt={ra.publishedAt}
    />
  )
}

function richTextToHtml(richText: unknown): string {
  if (!richText || typeof richText !== 'object') return ''
  const rt = richText as { root?: { children?: unknown[] } }
  if (!rt.root?.children) return ''
  return rt.root.children.map((node) => nodeToHtml(node)).join('')
}

function nodeToHtml(node: unknown): string {
  if (!node || typeof node !== 'object') return ''
  const n = node as {
    type?: string
    tag?: string
    children?: unknown[]
    text?: string
    format?: number
    url?: string
    fields?: { url?: string }
  }

  if (n.type === 'text') {
    let text = escapeHtml(n.text ?? '')
    if (n.format) {
      if (n.format & 1) text = `<strong>${text}</strong>`
      if (n.format & 2) text = `<em>${text}</em>`
      if (n.format & 4) text = `<u>${text}</u>`
    }
    return text
  }

  const children = (n.children ?? []).map(nodeToHtml).join('')

  switch (n.type) {
    case 'paragraph':
      return `<p>${children}</p>`
    case 'heading':
      return `<${n.tag ?? 'h2'}>${children}</${n.tag ?? 'h2'}>`
    case 'list':
      return `<${n.tag ?? 'ul'}>${children}</${n.tag ?? 'ul'}>`
    case 'listitem':
      return `<li>${children}</li>`
    case 'quote':
      return `<blockquote>${children}</blockquote>`
    case 'link': {
      const url = n.fields?.url ?? n.url ?? '#'
      return `<a href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">${children}</a>`
    }
    default:
      return children
  }
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeAttr(s: string): string {
  return s.replace(/"/g, '&quot;')
}
