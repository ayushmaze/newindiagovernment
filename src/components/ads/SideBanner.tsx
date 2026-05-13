import Link from 'next/link'
import { EditorialImage } from '@/components/article/EditorialImage'

interface SideBannerProps {
  label: string
  image?: { url?: string; alt?: string } | null
  link?: string
}

export function SideBanner({ label, image, link }: SideBannerProps) {
  const content = (
    <div className="bg-[var(--blue-promo)] p-4 flex flex-col items-center gap-3">
      {/* Megaphone illustration */}
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" aria-hidden>
        <rect x="5" y="22" width="16" height="14" rx="2" fill="#1a1a1a"/>
        <path d="M21 22 L48 10 L48 48 L21 36 Z" fill="#1a1a1a"/>
        <rect x="21" y="36" width="5" height="12" rx="1" fill="#8a8a8a"/>
        <circle cx="51" cy="29" r="5" fill="none" stroke="#1a1a1a" strokeWidth="2"/>
      </svg>

      {image?.url ? (
        <EditorialImage
          src={image.url}
          alt={image.alt ?? label}
          width={200}
          height={120}
          sizes="200px"
        />
      ) : null}

      <p className="font-ui font-bold uppercase tracking-[0.2em] text-[13px] text-[var(--ink)] text-center">
        {label}
      </p>
      <p className="font-ui uppercase tracking-[0.14em] text-[11px] text-[var(--ink-3)] text-center">
        Every Thursday at 8:00pm
      </p>
      <span className="border border-[var(--ink)] px-4 py-2 font-ui font-bold uppercase tracking-[0.16em] text-[12px] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)] transition-colors cursor-pointer">
        Get Involved
      </span>
    </div>
  )

  if (link) {
    return <Link href={link}>{content}</Link>
  }

  return content
}
