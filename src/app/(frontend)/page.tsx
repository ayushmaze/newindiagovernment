import { getPayload } from 'payload'
import config from '@payload-config'
import { HomeGrid } from '@/components/grid/HomeGrid'
import { FeaturedHero } from '@/components/article/FeaturedHero'
import { ArticleCard } from '@/components/article/ArticleCard'
import { VoteWidget } from '@/components/vote/VoteWidget'
import { PetitionCard } from '@/components/petition/PetitionCard'
import { SignupCard } from '@/components/newsletter/SignupCard'
import { SideBanner } from '@/components/ads/SideBanner'
import { Divider } from '@/components/ui/Divider'
import { generateBaseMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = generateBaseMetadata()

interface MediaDoc {
  url?: string
  alt?: string
  sizes?: {
    thumbnail?: { url?: string }
    card?: { url?: string }
    hero?: { url?: string }
  }
}

interface AuthorDoc {
  name?: string
  avatar?: MediaDoc | null
}

interface ArticleDoc {
  id: string
  title: string
  slug: string
  kicker?: string
  excerpt?: string
  heroImage?: MediaDoc | null
  author?: AuthorDoc | null
  publishedAt?: string
  placement?: string
}

interface PetitionDoc {
  id: string
  title: string
  slug: string
  summary?: string
  target?: string
  currentSignatures: number
  goalSignatures: number
}

interface SiteSettingsDoc {
  voteQuestion?: string
  voteOptions?: Array<{ key: string; label: string }>
}

export default async function HomePage() {
  const payload = await getPayload({ config })

  const [heroResult, leftResult, rightResult, petitionsResult, siteResult] =
    await Promise.allSettled([
      payload.find({
        collection: 'articles',
        where: {
          status: { equals: 'published' },
          placement: { equals: 'homepage-hero' },
        },
        sort: '-publishedAt',
        limit: 1,
        depth: 2,
      }),
      payload.find({
        collection: 'articles',
        where: {
          status: { equals: 'published' },
          placement: { equals: 'homepage-left' },
        },
        sort: '-publishedAt',
        limit: 2,
        depth: 2,
      }),
      payload.find({
        collection: 'articles',
        where: {
          status: { equals: 'published' },
          placement: { in: ['homepage-right', 'feed'] },
        },
        sort: '-publishedAt',
        limit: 4,
        depth: 2,
      }),
      payload.find({
        collection: 'petitions',
        where: { status: { equals: 'active' } },
        sort: '-createdAt',
        limit: 6,
        depth: 1,
      }),
      payload.findGlobal({ slug: 'site-settings' }),
    ])

  const heroArticle =
    heroResult.status === 'fulfilled'
      ? (heroResult.value.docs[0] as unknown as ArticleDoc | undefined)
      : undefined

  const leftArticles =
    leftResult.status === 'fulfilled'
      ? (leftResult.value.docs as unknown as ArticleDoc[])
      : []

  const rightArticles =
    rightResult.status === 'fulfilled'
      ? (rightResult.value.docs as unknown as ArticleDoc[])
      : []

  const petitions =
    petitionsResult.status === 'fulfilled'
      ? (petitionsResult.value.docs as unknown as PetitionDoc[])
      : []

  const siteSettings =
    siteResult.status === 'fulfilled'
      ? (siteResult.value as unknown as SiteSettingsDoc)
      : null

  const voteQuestion =
    siteSettings?.voteQuestion ?? 'Is it time for a new India government?'

  const voteOptions = siteSettings?.voteOptions ?? [
    { key: 'yes-time-for-change', label: 'YES, time for change' },
    { key: 'no-current-fine', label: 'NO, current is fine' },
    { key: 'undecided', label: 'UNDECIDED' },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'The New India Government',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    description: 'Independent fact-checking and citizen journalism for a better India.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The New India Government',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/badge.svg`,
    description: 'Truth · Transparency · Voice',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />

      <section className="py-8" aria-label="Top stories">
        <HomeGrid
          left={
            <>
              {leftArticles.map((a) => (
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

              <a
                href="#vote"
                className="block bg-[var(--ink)] text-[var(--bg)] p-6 hover:bg-[var(--lavender-hover)] transition-colors"
              >
                <p className="font-ui font-bold uppercase tracking-[0.2em] text-[11px] text-[var(--pink-chip)] mb-2">
                  CAST YOUR VOTE
                </p>
                <p className="font-display font-black text-[22px] leading-[1.15]">
                  One Tap · Live Results
                </p>
                <p className="font-ui uppercase tracking-[0.14em] text-[11px] mt-3 opacity-70">
                  Make your voice heard →
                </p>
              </a>
            </>
          }
          center={
            heroArticle ? (
              <FeaturedHero
                title={heroArticle.title}
                slug={heroArticle.slug}
                excerpt={heroArticle.excerpt}
                kicker={heroArticle.kicker ?? 'FEATURED'}
                heroImage={heroArticle.heroImage}
                author={heroArticle.author}
                publishedAt={heroArticle.publishedAt}
              />
            ) : (
              <div className="text-center py-20">
                <p className="font-ui uppercase tracking-[0.2em] text-[13px] text-[var(--ink-3)]">
                  No featured story yet.
                </p>
                <p className="font-ui uppercase tracking-[0.14em] text-[11px] text-[var(--ink-3)] mt-2">
                  Publish a story with placement &quot;homepage-hero&quot; in the admin.
                </p>
              </div>
            )
          }
          right={
            <>
              <SideBanner label="Get Involved Now" />
              <Divider />
              {rightArticles.slice(0, 3).map((a) => (
                <ArticleCard
                  key={a.id}
                  title={a.title}
                  slug={a.slug}
                  heroImage={a.heroImage}
                  publishedAt={a.publishedAt}
                  variant="right"
                />
              ))}
              <Divider />
              <SignupCard />
            </>
          }
        />
      </section>

      <VoteWidget question={voteQuestion} options={voteOptions} />

      {petitions.length > 0 && (
        <section
          className="py-12 border-t border-[var(--hairline)]"
          aria-label="Active petitions"
        >
          <div className="mx-auto max-w-[1440px] px-6">
            <h2 className="font-ui font-bold uppercase tracking-[0.2em] text-[13px] text-[var(--ink)] mb-6">
              Active Petitions
            </h2>
            <div className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6">
              {petitions.map((p) => (
                <PetitionCard
                  key={p.id}
                  title={p.title}
                  slug={p.slug}
                  summary={p.summary}
                  target={p.target}
                  currentSignatures={p.currentSignatures}
                  goalSignatures={p.goalSignatures}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
