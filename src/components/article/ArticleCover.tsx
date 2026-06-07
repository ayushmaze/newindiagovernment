/**
 * ArticleCover — a designed SVG banner used as an article "image".
 *
 * We can't reuse copyrighted news/social photos, and the site CSP restricts
 * external images. So each article gets a clean, on-brand generated cover:
 * a category gradient, a large faded emblem, and geometric accents. It's pure
 * inline SVG/markup — no files, no external requests, always within CSP.
 */

type CoverStyle = { gradient: string; emblem: string; fg: string }

const CATEGORY_STYLE: Record<string, CoverStyle> = {
  Economy: { gradient: 'from-amber-500 to-orange-600', emblem: '₹', fg: '#fff7ed' },
  Jobs: { gradient: 'from-orange-500 to-red-600', emblem: '🛠', fg: '#fff' },
  Governance: { gradient: 'from-slate-600 to-slate-800', emblem: '🏛', fg: '#f8fafc' },
  Welfare: { gradient: 'from-teal-500 to-emerald-600', emblem: '🤝', fg: '#ecfdf5' },
  Health: { gradient: 'from-rose-500 to-red-600', emblem: '➕', fg: '#fff1f2' },
  Democracy: { gradient: 'from-indigo-500 to-violet-700', emblem: '🗳', fg: '#eef2ff' },
  Education: { gradient: 'from-sky-500 to-blue-700', emblem: '🎓', fg: '#eff6ff' },
  Environment: { gradient: 'from-green-500 to-emerald-700', emblem: '🌱', fg: '#ecfdf5' },
}

const FALLBACK: CoverStyle = { gradient: 'from-slate-600 to-slate-800', emblem: '■', fg: '#f8fafc' }

export function ArticleCover({
  category,
  kicker,
  title,
}: {
  category: string
  kicker?: string
  title?: string
}) {
  const style = CATEGORY_STYLE[category] ?? FALLBACK

  return (
    <div
      className={`relative w-full aspect-[16/7] bg-gradient-to-br ${style.gradient} overflow-hidden`}
      aria-hidden
    >
      {/* Diagonal hatch */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(255,255,255,0) 0 18px, rgba(255,255,255,0.10) 18px 20px)',
        }}
      />
      {/* Giant faded emblem */}
      <span
        className="absolute -right-2 -bottom-6 text-[clamp(120px,22vw,260px)] leading-none opacity-20 select-none"
        style={{ color: style.fg }}
      >
        {style.emblem}
      </span>
      {/* Category + optional title overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <span
          className="font-ui font-black uppercase tracking-[0.28em] text-[11px] md:text-[12px]"
          style={{ color: style.fg }}
        >
          {kicker ?? category}
        </span>
        {title && (
          <span
            className="font-display font-black uppercase tracking-[-0.01em] leading-[0.98] text-[clamp(22px,3.4vw,40px)] mt-2 max-w-[24ch]"
            style={{ color: style.fg }}
          >
            {title}
          </span>
        )}
      </div>
    </div>
  )
}
