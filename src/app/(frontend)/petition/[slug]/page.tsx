import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import { SignForm } from '@/components/petition/SignForm'
import { EditorialImage } from '@/components/article/EditorialImage'
import { formatShortDate } from '@/lib/format'
import { generateBaseMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'petitions',
    where: { slug: { equals: slug } },
    limit: 1,
  }).catch(() => ({ docs: [] }))
  const p = docs[0] as { title?: string } | undefined
  return generateBaseMetadata(p?.title ?? 'Petition')
}

export default async function PetitionDetailPage({ params }: PageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const [petitionResult, signaturesResult] = await Promise.all([
    payload.find({
      collection: 'petitions',
      where: { slug: { equals: slug }, status: { not_equals: 'draft' } },
      depth: 2,
      limit: 1,
    }),
    payload.find({
      collection: 'petition-signatures',
      where: {
        'petition.slug': { equals: slug },
        displayPublic: { equals: true },
        verified: { equals: true },
      },
      sort: '-createdAt',
      limit: 20,
      depth: 0,
      overrideAccess: true,
    }),
  ]).catch(() => [{ docs: [] }, { docs: [] }] as const)

  const petition = Array.isArray(petitionResult)
    ? petitionResult[0]
    : (petitionResult as { docs: unknown[] }).docs[0]

  if (!petition) notFound()

  const p = petition as {
    id: string
    title: string
    summary?: string
    body?: unknown
    target?: string
    currentSignatures: number
    goalSignatures: number
    heroImage?: { url?: string; alt?: string; sizes?: { hero?: { url?: string }; card?: { url?: string } } } | null
    createdAt?: string
  }

  const signatures = Array.isArray(signaturesResult)
    ? []
    : (signaturesResult as { docs: unknown[] }).docs as Array<{
        id: string
        firstName: string
        lastName: string
        city?: string
        comment?: string
        createdAt?: string
      }>

  const pct = Math.min(100, Math.round((p.currentSignatures / Math.max(p.goalSignatures, 1)) * 100))
  const imgUrl = p.heroImage?.sizes?.hero?.url ?? p.heroImage?.sizes?.card?.url ?? p.heroImage?.url

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-10">
      <div className="xl:grid xl:grid-cols-12 xl:gap-12">
        {/* Main content */}
        <main className="xl:col-span-8">
          {p.target && (
            <p className="font-ui font-bold uppercase tracking-[0.2em] text-[11px] text-[var(--red-tag)] mb-3">
              → {p.target}
            </p>
          )}
          <h1 className="font-display font-bold text-[42px] md:text-[56px] leading-[1.05] text-[var(--ink)] mb-6">
            {p.title}
          </h1>

          {/* Progress */}
          <div className="mb-8 p-6 border border-[var(--hairline)] bg-[var(--bg-soft)]">
            <div className="flex justify-between mb-3">
              <span className="font-display font-bold text-[32px] text-[var(--ink)]">
                {p.currentSignatures.toLocaleString('en-IN')}
              </span>
              <span className="font-ui uppercase tracking-[0.14em] text-[12px] text-[var(--ink-3)] flex items-end pb-1">
                Goal: {p.goalSignatures.toLocaleString('en-IN')}
              </span>
            </div>
            <div className="h-2 bg-[var(--hairline)] overflow-hidden mb-2">
              <div
                className="h-full bg-[var(--gold-petition)] transition-[width] duration-700"
                style={{ width: `${pct}%` }}
                role="progressbar"
                aria-valuenow={p.currentSignatures}
                aria-valuemin={0}
                aria-valuemax={p.goalSignatures}
                aria-label={`${pct}% of goal reached`}
              />
            </div>
            <p className="font-ui uppercase tracking-[0.14em] text-[11px] text-[var(--ink-3)]">
              {pct}% of goal · {p.currentSignatures.toLocaleString('en-IN')} signatures
            </p>
          </div>

          {imgUrl && (
            <div className="mb-8">
              <EditorialImage
                src={imgUrl}
                alt={p.heroImage?.alt ?? p.title}
                width={800}
                height={500}
                priority
                sizes="(max-width: 768px) 100vw, 60vw"
                className="w-full"
              />
            </div>
          )}

          {p.summary && (
            <p className="font-body text-[19px] italic leading-[1.6] text-[var(--ink-2)] mb-8 border-l-4 border-[var(--gold-petition)] pl-5">
              {p.summary}
            </p>
          )}

          {/* Signers list */}
          {signatures.length > 0 && (
            <section className="mt-10 pt-6 border-t border-[var(--hairline)]">
              <h2 className="font-ui font-bold uppercase tracking-[0.2em] text-[11px] text-[var(--ink)] mb-6">
                Recent Signers
              </h2>
              <ul className="space-y-4">
                {signatures.map((sig) => (
                  <li key={sig.id} className="border-b border-[var(--hairline)] pb-4">
                    <p className="font-ui font-bold text-[13px] text-[var(--ink)]">
                      {sig.firstName} {sig.lastName}
                      {sig.city && (
                        <span className="font-normal text-[var(--ink-3)]"> · {sig.city}</span>
                      )}
                    </p>
                    {sig.comment && (
                      <p className="font-body text-[14px] italic text-[var(--ink-2)] mt-1">
                        &ldquo;{sig.comment}&rdquo;
                      </p>
                    )}
                    {sig.createdAt && (
                      <p className="font-ui uppercase tracking-[0.14em] text-[10px] text-[var(--ink-3)] mt-1">
                        {formatShortDate(sig.createdAt)}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>

        {/* Sidebar: sign form */}
        <aside className="xl:col-span-4 mt-8 xl:mt-0">
          <div className="sticky top-20">
            <SignForm petitionId={p.id} />
          </div>
        </aside>
      </div>
    </div>
  )
}
