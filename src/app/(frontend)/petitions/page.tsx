import { getPayload } from 'payload'
import config from '@payload-config'
import { PetitionCard } from '@/components/petition/PetitionCard'
import { generateBaseMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const revalidate = 60
export const metadata: Metadata = generateBaseMetadata('Petitions')

export default async function PetitionsPage() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'petitions',
    where: { status: { equals: 'active' } },
    sort: '-createdAt',
    limit: 20,
    depth: 1,
  }).catch(() => ({ docs: [] }))

  const petitions = docs as Array<{
    id: string
    title: string
    slug: string
    summary?: string
    target?: string
    currentSignatures: number
    goalSignatures: number
  }>

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-10">
      <div className="border-b-2 border-[var(--divider)] pb-6 mb-10">
        <p className="font-ui font-bold uppercase tracking-[0.2em] text-[11px] text-[var(--red-tag)] mb-2">
          Citizen Action
        </p>
        <h1 className="font-display font-black text-[56px] uppercase tracking-[0.02em] text-[var(--ink)]">
          Petitions
        </h1>
        <p className="font-body text-[16px] text-[var(--ink-2)] mt-3 max-w-2xl">
          Add your signature to demand accountability. Every voice counts.
        </p>
      </div>

      {petitions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
      ) : (
        <p className="font-ui uppercase tracking-[0.16em] text-[13px] text-[var(--ink-3)] text-center py-20">
          No active petitions yet.
        </p>
      )}
    </div>
  )
}
