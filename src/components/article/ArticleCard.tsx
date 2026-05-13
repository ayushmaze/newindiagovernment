import Link from 'next/link'
import { EditorialImage } from './EditorialImage'
import { formatShortDate } from '@/lib/format'

interface ArticleCardProps {
  title: string
  slug: string
  excerpt?: string
  kicker?: string
  heroImage?: {
    url?: string
    alt?: string
    sizes?: { thumbnail?: { url?: string } }
  } | null
  author?: { name?: string } | null
  publishedAt?: string
  variant?: 'left' | 'right' | 'small' | 'trending'
}

export function ArticleCard({
  title,
  slug,
  excerpt,
  kicker,
  heroImage,
  author,
  publishedAt,
  variant = 'small',
}: ArticleCardProps) {
  const imgUrl = heroImage?.sizes?.thumbnail?.url ?? heroImage?.url ?? null
  const imgAlt = heroImage?.alt ?? title

  if (variant === 'left') {
    return (
      <article className="group">
        <div className="flex gap-4">
          {imgUrl && (
            <Link href={`/article/${slug}`} className="shrink-0">
              <EditorialImage
                src={imgUrl}
                alt={imgAlt}
                width={120}
                height={120}
                sizes="120px"
                className="w-[120px] h-[120px]"
              />
            </Link>
          )}
          <div className="min-w-0">
            {kicker && (
              <span className="font-ui font-bold uppercase tracking-[0.2em] text-[11px] text-[var(--red-tag)]">
                {kicker}
              </span>
            )}
            <Link href={`/article/${slug}`}>
              <h3 className="font-display font-bold text-[19px] leading-[1.15] text-[var(--ink)] group-hover:underline mt-1">
                {title}
              </h3>
            </Link>
            {publishedAt && (
              <p className="font-ui uppercase tracking-[0.16em] text-[11px] text-[var(--ink-3)] mt-1.5">
                {formatShortDate(publishedAt)}
              </p>
            )}
            {excerpt && (
              <p className="font-body text-[14px] leading-[1.5] text-[var(--ink-2)] mt-2 line-clamp-3">
                {excerpt}
              </p>
            )}
          </div>
        </div>
        <Link
          href={`/article/${slug}`}
          className="mt-3 inline-flex items-center gap-2 font-ui font-bold uppercase tracking-[0.16em] text-[11px] text-[var(--ink)] hover:text-[var(--lavender-hover)]"
        >
          Read More <span aria-hidden>——→</span>
        </Link>
      </article>
    )
  }

  if (variant === 'right' || variant === 'trending') {
    return (
      <article className="group flex gap-3">
        {imgUrl && (
          <Link href={`/article/${slug}`} className="shrink-0">
            <EditorialImage
              src={imgUrl}
              alt={imgAlt}
              width={90}
              height={70}
              sizes="90px"
              className="w-[90px] h-[70px]"
            />
          </Link>
        )}
        <div className="min-w-0">
          <Link href={`/article/${slug}`}>
            <h3 className="font-display font-bold text-[16px] leading-[1.2] text-[var(--ink)] group-hover:underline">
              {title}
            </h3>
          </Link>
          {publishedAt && (
            <p className="font-ui uppercase tracking-[0.16em] text-[10px] text-[var(--ink-3)] mt-1">
              {formatShortDate(publishedAt)}
            </p>
          )}
        </div>
      </article>
    )
  }

  // Default small card
  return (
    <article className="group">
      {kicker && (
        <span className="font-ui font-bold uppercase tracking-[0.2em] text-[11px] text-[var(--red-tag)]">
          {kicker}
        </span>
      )}
      <Link href={`/article/${slug}`}>
        <h3 className="font-display font-bold text-[22px] leading-[1.15] text-[var(--ink)] group-hover:underline mt-1">
          {title}
        </h3>
      </Link>
      {author?.name && publishedAt && (
        <p className="font-ui uppercase tracking-[0.16em] text-[11px] text-[var(--ink-3)] mt-1.5">
          {author.name} · {formatShortDate(publishedAt)}
        </p>
      )}
    </article>
  )
}
