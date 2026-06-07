import Link from 'next/link'
import type { StaticArticle } from '@/lib/articles'
import { listArticles } from '@/lib/articles'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * StaticArticleView — clean reading layout for the sourced explainer articles
 * in src/lib/articles.ts. Used by /article/[slug] when the CMS has no matching
 * published article. Deliberately simple: header, key stat, body sections,
 * a sources block, and related explainers.
 */
export function StaticArticleView({ article }: { article: StaticArticle }) {
  const related = listArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3)

  return (
    <article className="bg-[var(--bg)]">
      {/* Header */}
      <header className="border-b-2 border-[var(--divider)]">
        <div className="mx-auto max-w-[760px] px-6 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="font-ui font-black uppercase tracking-[0.22em] text-[10px] text-[var(--red-tag)]">
              {article.kicker}
            </span>
            <span aria-hidden className="h-1 w-1 rounded-full bg-[var(--ink-3)]" />
            <span className="font-ui uppercase tracking-[0.16em] text-[10px] text-[var(--ink-3)]">
              {formatDate(article.publishedAt)} · {article.readMins} min read
            </span>
          </div>

          <h1 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.98] text-[clamp(30px,5.5vw,56px)] text-[var(--ink)]">
            {article.title}
          </h1>

          <p className="font-display text-[clamp(18px,2.2vw,24px)] leading-snug text-[var(--ink-2)] mt-6">
            {article.dek}
          </p>

          {article.keyStat && (
            <div className="mt-8 inline-flex items-baseline gap-3 border-l-2 border-[var(--red-tag)] pl-4">
              <span className="font-display font-black tabular-nums text-[clamp(28px,4vw,44px)] leading-none text-[var(--red-tag)]">
                {article.keyStat.value}
              </span>
              <span className="font-ui uppercase tracking-[0.14em] text-[11px] text-[var(--ink-3)] max-w-[28ch]">
                {article.keyStat.label}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-[680px] px-6 py-12 md:py-16">
        {article.body.map((section, i) => (
          <section key={i} className="mb-10">
            {section.heading && (
              <h2 className="font-display font-black uppercase tracking-tight text-[clamp(22px,3vw,30px)] leading-tight text-[var(--ink)] mb-4">
                {section.heading}
              </h2>
            )}
            {section.paragraphs.map((p, j) => (
              <p
                key={j}
                className="font-body text-[17px] md:text-[18px] leading-[1.75] text-[var(--ink-2)] mb-5"
              >
                {p}
              </p>
            ))}
          </section>
        ))}

        {/* Sources */}
        <section className="mt-12 pt-8 border-t-2 border-[var(--divider)]">
          <h2 className="font-ui font-black uppercase tracking-[0.22em] text-[11px] text-[var(--red-tag)] mb-5">
            Sources · Free to verify
          </h2>
          <ul className="space-y-3">
            {article.sources.map((s) => (
              <li key={s.url} className="flex items-start gap-3">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 bg-[var(--ink)] shrink-0" />
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ui text-[14px] text-[var(--ink)] underline underline-offset-2 hover:text-[var(--red-tag)] break-words"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="font-ui uppercase tracking-[0.14em] text-[10px] text-[var(--ink-3)] mt-6 leading-relaxed">
            This is a sourced explainer built on public data — not original
            reporting. Every figure traces to a source above.
          </p>
        </section>

        {/* CTA back to the meter */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/promises"
            className="inline-flex items-center gap-2 bg-[var(--ink)] text-[var(--bg)] px-6 py-3 font-ui font-bold uppercase tracking-[0.16em] text-[12px] hover:bg-[var(--red-tag)] transition-colors tap-shrink"
          >
            See the Jumla Meter →
          </Link>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-[var(--pink-chip)] text-[var(--ink)] px-6 py-3 font-ui font-bold uppercase tracking-[0.16em] text-[12px] border-2 border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors tap-shrink"
          >
            Play Real or Jumla? 🎯
          </Link>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-[var(--hairline)] bg-[var(--bg-soft)]">
          <div className="mx-auto max-w-[1100px] px-6 py-14">
            <p className="font-ui font-black uppercase tracking-[0.22em] text-[11px] text-[var(--red-tag)] mb-8">
              Keep reading
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/article/${r.slug}`}
                  className="group bg-[var(--bg)] border border-[var(--ink)]/10 p-6 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_rgba(0,0,0,0.25)] transition-all duration-200"
                >
                  <span className="font-ui font-black uppercase tracking-[0.2em] text-[9px] text-[var(--red-tag)]">
                    {r.kicker}
                  </span>
                  <h3 className="font-display font-black uppercase tracking-tight text-[19px] leading-[1.15] text-[var(--ink)] mt-3 group-hover:underline">
                    {r.title}
                  </h3>
                  <span className="mt-4 inline-block font-ui uppercase tracking-[0.14em] text-[10px] text-[var(--ink-3)]">
                    {r.readMins} min →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
