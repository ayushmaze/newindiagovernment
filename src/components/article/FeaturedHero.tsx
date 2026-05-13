import Link from 'next/link'
import { EditorialImage } from './EditorialImage'
import { formatShortDate } from '@/lib/format'

interface FeaturedHeroProps {
  title: string
  slug: string
  excerpt?: string
  kicker?: string
  heroImage?: {
    url?: string
    alt?: string
    sizes?: { hero?: { url?: string }; card?: { url?: string } }
  } | null
  author?: { name?: string; avatar?: { url?: string } | null } | null
  publishedAt?: string
}

export function FeaturedHero({
  title,
  slug,
  excerpt,
  kicker,
  heroImage,
  author,
  publishedAt,
}: FeaturedHeroProps) {
  const imgUrl =
    heroImage?.sizes?.hero?.url ?? heroImage?.sizes?.card?.url ?? heroImage?.url ?? null
  const imgAlt = heroImage?.alt ?? title

  return (
    <article>
      {kicker && (
        <p className="font-ui font-bold uppercase tracking-[0.2em] text-[11px] text-[var(--red-tag)] mb-2">
          {kicker}
        </p>
      )}

      {imgUrl && (
        <Link href={`/article/${slug}`}>
          <EditorialImage
            src={imgUrl}
            alt={imgAlt}
            width={800}
            height={500}
            priority
            sizes="(max-width: 768px) 100vw, 55vw"
            className="w-full aspect-[16/10] mb-4"
          />
        </Link>
      )}

      <div className="flex items-center justify-between mb-3">
        <span className="font-ui font-bold uppercase tracking-[0.2em] text-[11px] text-[var(--red-tag)]">
          Featured
        </span>
        <Link
          href={`/article/${slug}`}
          aria-label={`Read: ${title}`}
          className="w-8 h-8 rounded-full border border-[var(--lavender-hover)] flex items-center justify-center text-[var(--lavender-hover)] hover:bg-[var(--lavender-hover)] hover:text-white transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
          </svg>
        </Link>
      </div>

      <Link href={`/article/${slug}`}>
        <h2 className="font-display font-bold text-[36px] md:text-[44px] leading-[1.05] text-[var(--ink)] hover:underline">
          {title}
        </h2>
      </Link>

      {excerpt && (
        <p className="font-body text-[17px] md:text-[18px] leading-[1.55] text-[var(--ink-2)] mt-4 line-clamp-3">
          {excerpt}
        </p>
      )}

      {(author?.name || publishedAt) && (
        <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[var(--hairline)]">
          {author?.name && (
            <span className="font-ui uppercase tracking-[0.16em] text-[11px] text-[var(--ink-3)]">
              {author.name}
            </span>
          )}
          {author?.name && publishedAt && (
            <span className="text-[var(--hairline)]">·</span>
          )}
          {publishedAt && (
            <span className="font-ui uppercase tracking-[0.16em] text-[11px] text-[var(--ink-3)]">
              {formatShortDate(publishedAt)}
            </span>
          )}
        </div>
      )}
    </article>
  )
}
