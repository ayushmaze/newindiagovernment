import Link from 'next/link'
import { Reveal } from '@/components/animation/Reveal'
import { ArticleCover } from './ArticleCover'
import type { StaticArticle } from '@/lib/articles'

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

/**
 * StaticCategoryView — renders a category landing page from the static
 * articles dataset (used when the CMS has no matching category yet).
 */
export function StaticCategoryView({
  title,
  description,
  articles,
}: {
  title: string
  description: string
  articles: StaticArticle[]
}) {
  return (
    <div className="mx-auto max-w-[1440px] px-6 py-10">
      <Reveal>
        <div className="border-b-2 border-[var(--divider)] pb-6 mb-10">
          <p className="font-ui font-bold uppercase tracking-[0.2em] text-[11px] text-[var(--red-tag)] mb-2">
            Section
          </p>
          <h1 className="font-display font-black text-[clamp(36px,7vw,64px)] uppercase tracking-[0.02em] text-[var(--ink)] leading-[0.95]">
            {title}
          </h1>
          <p className="font-body text-[16px] text-[var(--ink-2)] mt-3 max-w-2xl">{description}</p>
          <p className="font-ui uppercase tracking-[0.14em] text-[11px] text-[var(--ink-3)] mt-4">
            {articles.length} {articles.length === 1 ? 'story' : 'stories'}
          </p>
        </div>
      </Reveal>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={i * 50}>
              <Link
                href={`/article/${a.slug}`}
                className="group block h-full border border-[var(--ink)]/12 bg-[var(--bg)] overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.25)] transition-all duration-200"
              >
                <ArticleCover category={a.category} kicker={a.kicker} />
                <div className="p-6">
                  <h2 className="font-display font-black uppercase tracking-tight text-[clamp(18px,2.2vw,24px)] leading-[1.12] text-[var(--ink)] group-hover:underline">
                    {a.title}
                  </h2>
                  <p className="font-body text-[14px] leading-relaxed text-[var(--ink-2)] mt-3 line-clamp-3">
                    {a.excerpt}
                  </p>
                  <div className="mt-4 pt-3 border-t border-[var(--hairline)] flex items-center justify-between">
                    <span className="font-ui uppercase tracking-[0.14em] text-[10px] text-[var(--ink-3)]">
                      {fmt(a.publishedAt)} · {a.readMins} min
                    </span>
                    <span className="font-ui font-bold uppercase tracking-[0.16em] text-[10px] text-[var(--ink)] group-hover:text-[var(--red-tag)] transition-colors">
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="font-ui uppercase tracking-[0.16em] text-[13px] text-[var(--ink-3)] text-center py-20">
          No stories yet in this section.
        </p>
      )}
    </div>
  )
}
