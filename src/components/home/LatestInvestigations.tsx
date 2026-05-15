import Link from 'next/link'
import Image from 'next/image'

type MediaDoc = {
  url?: string
  alt?: string
  sizes?: {
    card?: { url?: string }
    hero?: { url?: string }
  }
}

type Article = {
  id: string
  title: string
  slug: string
  kicker?: string
  excerpt?: string
  heroImage?: MediaDoc | null
  publishedAt?: string
}

function formatDate(s?: string) {
  if (!s) return ''
  const d = new Date(s)
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function LatestInvestigations({ articles }: { articles: Article[] }) {
  if (!articles.length) return null

  return (
    <section
      className="border-b border-[var(--hairline)] bg-[var(--bg)]"
      aria-label="Latest investigations and analysis"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:py-24">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
          <div>
            <p className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--red-tag)] mb-4">
              The Newsroom
            </p>
            <h2 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,60px)] text-[var(--ink)]">
              Investigations,
              <br />
              fresh off the desk.
            </h2>
          </div>
          <Link
            href="/category/investigations"
            className="font-ui font-bold uppercase tracking-[0.18em] text-[12px] text-[var(--ink)] hover:text-[var(--red-tag)] transition-colors inline-flex items-center gap-2"
          >
            All Investigations
            <span>→</span>
          </Link>
        </div>

        {/* 3-up clean grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px bg-[var(--hairline)] border border-[var(--hairline)]">
          {articles.slice(0, 3).map((a, idx) => {
            const img = a.heroImage?.sizes?.card?.url ?? a.heroImage?.url
            return (
              <Link
                key={a.id}
                href={`/article/${a.slug}`}
                className="group bg-[var(--bg)] flex flex-col hover:bg-[var(--bg-soft)] transition-colors"
              >
                {img ? (
                  <div className="relative aspect-[4/3] overflow-hidden border-b border-[var(--hairline)]">
                    <Image
                      src={img}
                      alt={a.heroImage?.alt ?? a.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover editorial-img group-hover:scale-[1.02] transition-transform duration-500"
                      priority={idx === 0}
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] bg-[var(--bg-soft)] border-b border-[var(--hairline)]" />
                )}
                <div className="p-7 md:p-8 flex flex-col flex-1">
                  {a.kicker && (
                    <span className="font-ui font-black uppercase tracking-[0.2em] text-[10px] text-[var(--red-tag)] mb-3">
                      {a.kicker}
                    </span>
                  )}
                  <h3 className="font-display font-black uppercase tracking-tight text-[clamp(20px,2.2vw,28px)] leading-[1.1] text-[var(--ink)] group-hover:underline">
                    {a.title}
                  </h3>
                  {a.excerpt && (
                    <p className="font-body text-[15px] leading-relaxed text-[var(--ink-2)] mt-4 line-clamp-3">
                      {a.excerpt}
                    </p>
                  )}
                  <div className="mt-6 pt-4 border-t border-[var(--hairline)] flex items-center justify-between">
                    <span className="font-ui uppercase tracking-[0.14em] text-[10px] text-[var(--ink-3)]">
                      {formatDate(a.publishedAt)}
                    </span>
                    <span className="font-ui font-bold uppercase tracking-[0.16em] text-[11px] text-[var(--ink)] inline-flex items-center gap-2">
                      Read
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
