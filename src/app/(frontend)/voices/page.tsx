import { getPayload } from 'payload'
import config from '@payload-config'
import { generateBaseMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export const revalidate = 60
export const metadata: Metadata = generateBaseMetadata('Wall of Voices')

const BORDER_COLORS: Record<string, string> = {
  'yes-time-for-change': 'var(--lavender-hover)',
  'no-current-fine': 'var(--ink)',
  undecided: 'var(--ink-3)',
}

export default async function VoicesPage() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'voices',
    where: { status: { equals: 'approved' } },
    sort: '-createdAt',
    limit: 50,
    depth: 0,
    overrideAccess: true,
  }).catch(() => ({ docs: [] }))

  const voices = docs as Array<{
    id: string
    text: string
    displayName?: string
    voteOption?: string
    createdAt?: string
  }>

  // Split into 2 columns for masonry effect
  const col1 = voices.filter((_, i) => i % 2 === 0)
  const col2 = voices.filter((_, i) => i % 2 === 1)

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-10">
      <div className="border-b-2 border-[var(--divider)] pb-6 mb-10">
        <p className="font-ui font-bold uppercase tracking-[0.2em] text-[11px] text-[var(--red-tag)] mb-2">
          The People Speak
        </p>
        <h1 className="font-display font-black text-[56px] uppercase tracking-[0.02em] text-[var(--ink)]">
          Wall of Voices
        </h1>
        <p className="font-body text-[16px] text-[var(--ink-2)] mt-3 max-w-2xl">
          Citizen views on India&apos;s future. Moderated for authenticity.
        </p>
      </div>

      {voices.length === 0 ? (
        <p className="font-ui uppercase tracking-[0.16em] text-[13px] text-[var(--ink-3)] text-center py-20">
          No voices yet. Cast your vote and share your view.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[col1, col2].map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-6">
              {col.map((v) => {
                const borderColor = BORDER_COLORS[v.voteOption ?? ''] ?? 'var(--hairline)'
                return (
                  <blockquote
                    key={v.id}
                    className="border-l-4 pl-5 py-4 bg-[var(--bg-soft)]"
                    style={{ borderLeftColor: borderColor }}
                  >
                    <p className="font-body text-[17px] italic leading-[1.65] text-[var(--ink)]">
                      &ldquo;{v.text}&rdquo;
                    </p>
                    <footer className="mt-3">
                      <cite className="not-italic font-ui uppercase tracking-[0.16em] text-[11px] text-[var(--ink-3)]">
                        — {v.displayName || 'Anonymous'}
                        {v.voteOption && (
                          <span className="ml-3 text-[10px] text-[var(--lavender-hover)]">
                            {v.voteOption === 'yes-time-for-change'
                              ? 'YES for change'
                              : v.voteOption === 'no-current-fine'
                                ? 'NO, current is fine'
                                : 'Undecided'}
                          </span>
                        )}
                      </cite>
                    </footer>
                  </blockquote>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
