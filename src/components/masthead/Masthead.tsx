import { Badge } from './Badge'
import { formatDate } from '@/lib/format'
import { LangPicker } from '@/components/i18n/LangPicker'

export function Masthead() {
  const today = formatDate(new Date())

  return (
    <header className="border-b-2 border-[var(--divider)]">
      <div className="mx-auto max-w-[1440px] px-6">
        {/* Utility row */}
        <div className="flex justify-between items-center py-2 border-b border-[var(--hairline)] gap-3">
          <span className="font-ui uppercase tracking-[0.16em] text-[10px] md:text-[11px] text-[var(--ink-3)]">
            {today}
          </span>
          <span className="hidden md:inline font-ui uppercase tracking-[0.16em] text-[10px] md:text-[11px] text-[var(--ink-3)]">
            Edition: National
          </span>
          <div className="flex items-center gap-4">
            <LangPicker />
            <a
              href="/admin"
              className="font-ui uppercase tracking-[0.16em] text-[10px] md:text-[11px] text-[var(--ink-3)] hover:text-[var(--ink)]"
            >
              Sign In
            </a>
          </div>
        </div>

        {/* Masthead row — badge | wordmark | subscribe */}
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 sm:gap-4 md:gap-8 py-3 sm:py-4 md:py-5">
          {/* Left: Badge + tagline */}
          <div className="flex items-center gap-3 min-w-0">
            <Badge />
            <div className="hidden lg:block">
              <p className="font-ui font-bold uppercase tracking-[0.2em] text-[10px] text-[var(--ink-3)] leading-tight">
                The Citizen&apos;s Press
              </p>
              <p className="font-ui uppercase tracking-[0.14em] text-[9px] text-[var(--ink-3)] leading-tight mt-0.5">
                Truth · Transparency · Voice
              </p>
            </div>
          </div>

          {/* Center: Wordmark — min-w-0 lets it shrink/wrap on phones */}
          <h1
            className="masthead-title font-display font-black uppercase text-[var(--ink)] text-center min-w-0"
          >
            The New India Government
          </h1>

          {/* Right: Subscribe ornament */}
          <div className="hidden md:flex items-center gap-3">
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <circle cx="24" cy="24" r="10" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="24" cy="24" r="3" fill="currentColor"/>
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = (i * 30 * Math.PI) / 180
                const x1 = 24 + 5 * Math.cos(angle)
                const y1 = 24 + 5 * Math.sin(angle)
                const x2 = 24 + 10 * Math.cos(angle)
                const y2 = 24 + 10 * Math.sin(angle)
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.8"/>
              })}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 45 * Math.PI) / 180
                const x = 24 + 16 * Math.cos(angle)
                const y = 24 + 16 * Math.sin(angle)
                return <ellipse key={i} cx={x} cy={y} rx="3" ry="5" transform={`rotate(${i * 45}, ${x}, ${y})`} fill="none" stroke="currentColor" strokeWidth="0.7"/>
              })}
            </svg>
            <div className="text-right leading-tight">
              <p className="font-ui font-bold uppercase tracking-[0.12em] text-[10px] text-[var(--ink-3)]">
                Subscribe · Free Forever
              </p>
              <p className="font-ui uppercase tracking-[0.06em] text-[18px] font-black text-[var(--ink)]">
                ₹0<span className="text-[11px] font-normal text-[var(--ink-3)]">/month</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
