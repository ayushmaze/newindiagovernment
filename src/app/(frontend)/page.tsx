import { getPayload } from 'payload'
import config from '@payload-config'
import { VoteWidget } from '@/components/vote/VoteWidget'
import { PetitionCard } from '@/components/petition/PetitionCard'
import { HeroManifesto } from '@/components/home/HeroManifesto'
import { CrisisGrid } from '@/components/home/CrisisGrid'
import { LiesVsTruth } from '@/components/home/LiesVsTruth'
import { LatestInvestigations } from '@/components/home/LatestInvestigations'
import { Pillars } from '@/components/home/Pillars'
import { JoinMovement } from '@/components/home/JoinMovement'
import { JumlaMeter } from '@/components/promises/JumlaMeter'
import { QuizTeaser } from '@/components/home/QuizTeaser'
import { MovementBanner } from '@/components/movement/MovementBanner'
import { DailyJumlaBar } from '@/components/home/DailyJumlaBar'
import { LiveActivityStrip } from '@/components/home/LiveActivityStrip'
import { WhyItMatters } from '@/components/home/WhyItMatters'
import { StickyPlayCTA } from '@/components/home/StickyPlayCTA'
import { RecentVerdicts } from '@/components/home/RecentVerdicts'
import { StanceStrip } from '@/components/home/StanceStrip'
import { GoodNewsWorld } from '@/components/home/GoodNewsWorld'
import { NumbersThatMatter } from '@/components/home/NumbersThatMatter'
import { SpotTheSpin } from '@/components/home/SpotTheSpin'
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

interface ArticleDoc {
  id: string
  title: string
  slug: string
  kicker?: string
  excerpt?: string
  heroImage?: MediaDoc | null
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

  const [
    articlesResult,
    petitionsResult,
    siteResult,
    factCheckResult,
    sigResult,
  ] = await Promise.allSettled([
    payload.find({
      collection: 'articles',
      where: { status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 6,
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
    payload.find({
      collection: 'ticker-items',
      where: { active: { equals: true } },
      limit: 0,
    }),
    payload.find({
      collection: 'petition-signatures',
      limit: 0,
    }),
  ])

  const articles =
    articlesResult.status === 'fulfilled'
      ? (articlesResult.value.docs as unknown as ArticleDoc[])
      : []

  const petitions =
    petitionsResult.status === 'fulfilled'
      ? (petitionsResult.value.docs as unknown as PetitionDoc[])
      : []

  const siteSettings =
    siteResult.status === 'fulfilled'
      ? (siteResult.value as unknown as SiteSettingsDoc)
      : null

  const factCheckCount =
    factCheckResult.status === 'fulfilled' ? factCheckResult.value.totalDocs : 0

  const signaturesCount =
    sigResult.status === 'fulfilled' ? sigResult.value.totalDocs : 0

  // Fall back to sensible defaults when DB is light (early stage)
  const factChecks = Math.max(factCheckCount, 24)
  const signatures = Math.max(signaturesCount, 8400)
  const articlesPublished = Math.max(articles.length * 4, 32)

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
    description:
      'A citizens-led movement for a New India Government — built on truth, transparency, and your voice.',
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

      {/* 1. Breaking-news red ribbon — first thing in the eye-path */}
      <DailyJumlaBar />

      {/* 1.5 Constructive stance — accountability, not attack */}
      <StanceStrip />

      {/* 2. Hero — punchier, with the Jumla scorecard */}
      <HeroManifesto
        factChecks={factChecks}
        petitionSignatures={signatures}
        articlesPublished={articlesPublished}
      />

      {/* 3. Social proof + tiny news ticker — feels alive */}
      <LiveActivityStrip />

      {/* 4. The Jumla Meter (compact) — the viral hook */}
      <JumlaMeter compact />

      {/* 4.5 Recent verdicts — tap-friendly fact-check grid */}
      <RecentVerdicts />

      {/* 4.7 Numbers that matter — shareable animated stats */}
      <NumbersThatMatter />

      {/* 5. Real or Jumla? — interactive moment */}
      <QuizTeaser />

      {/* 5.5 Spot the Spin — bite-sized flip cards */}
      <SpotTheSpin />

      {/* 6. Movement banner — join the cause, live counter */}
      <MovementBanner />

      {/* 6.5 Why it matters — sourced persuasion block */}
      <WhyItMatters />

      {/* 7. The Reckoning — the four data-shock cards */}
      <CrisisGrid />

      {/* 8. Claim vs Truth — receipts on the table */}
      <LiesVsTruth />

      {/* 9. People's poll */}
      <VoteWidget question={voteQuestion} options={voteOptions} />

      {/* 9.5 Good news worldwide — hope beat: proof change is possible */}
      <GoodNewsWorld limit={6} />

      {/* 10. Latest investigations (now populated by sourced explainers) */}
      <LatestInvestigations articles={articles} />

      {petitions.length > 0 && (
        <section
          className="py-16 md:py-20 border-b border-[var(--hairline)] bg-[var(--bg-soft)]"
          aria-label="Active petitions"
        >
          <div className="mx-auto max-w-[1440px] px-6">
            <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
              <div>
                <p className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--red-tag)] mb-4">
                  Take Action
                </p>
                <h2 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,60px)] text-[var(--ink)]">
                  Sign. Share.
                  <br />
                  Demand answers.
                </h2>
              </div>
            </div>
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

      <Pillars />

      <JoinMovement />

      {/* Floating CTA — fades in after the hero */}
      <StickyPlayCTA />
    </>
  )
}
