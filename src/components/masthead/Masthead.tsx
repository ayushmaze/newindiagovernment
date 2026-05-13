import { Badge } from './Badge'
import { formatDate } from '@/lib/format'

export function Masthead() {
  const today = formatDate(new Date())

  return (
    <header className="border-b-2 border-[var(--divider)] py-4">
      <div className="mx-auto max-w-[1440px] px-6">
        {/* Utility row */}
        <div className="flex justify-between items-center pb-3 border-b border-[var(--hairline)] mb-4">
          <span className="font-ui uppercase tracking-[0.16em] text-[11px] text-[var(--ink-3)]">
            {today}
          </span>
          <span className="font-ui uppercase tracking-[0.16em] text-[11px] text-[var(--ink-3)]">
            Edition: National
          </span>
          <a
            href="/admin"
            className="font-ui uppercase tracking-[0.16em] text-[11px] text-[var(--ink-3)] hover:text-[var(--ink)]"
          >
            Sign In
          </a>
        </div>

        {/* 3-zone masthead */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Left zone: Badge */}
          <div className="flex items-center gap-4">
            <Badge />
            <div className="hidden md:block">
              <p className="font-ui font-bold uppercase tracking-[0.2em] text-[10px] text-[var(--ink-3)]">
                THE CITIZEN&apos;S PRESS
              </p>
              <p className="font-ui uppercase tracking-[0.14em] text-[9px] text-[var(--ink-3)] mt-0.5">
                TRUTH · TRANSPARENCY · VOICE
              </p>
              <p className="font-ui uppercase tracking-[0.12em] text-[9px] text-[var(--ink-3)] mt-0.5">
                NEW DELHI · MUMBAI · BENGALURU
              </p>
            </div>
          </div>

          {/* Center zone: Title + dateline */}
          <div className="text-center">
            <div className="border border-[var(--hairline)] p-4 md:p-6 inline-block w-full">
              <h1
                className="masthead-title font-display font-black uppercase text-[var(--ink)]"
                style={{ letterSpacing: '0.04em' }}
              >
                THE NEW INDIA GOVERNMENT
              </h1>
              <div className="flex items-center justify-center gap-3 mt-2">
                <span className="h-px flex-1 bg-[var(--hairline)] max-w-[60px]" aria-hidden />
                <p className="font-ui font-medium uppercase tracking-[0.18em] text-[11px] text-[var(--ink-3)]">
                  {today}
                </p>
                <span className="h-px flex-1 bg-[var(--hairline)] max-w-[60px]" aria-hidden />
              </div>
            </div>
          </div>

          {/* Right zone: Subscribe ornament */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-3">
              {/* Lotus/Chakra ornament inline SVG */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <circle cx="24" cy="24" r="10" fill="none" stroke="#1a1a1a" strokeWidth="1"/>
                <circle cx="24" cy="24" r="3" fill="#1a1a1a"/>
                {/* Spokes */}
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180
                  const x1 = 24 + 5 * Math.cos(angle)
                  const y1 = 24 + 5 * Math.sin(angle)
                  const x2 = 24 + 10 * Math.cos(angle)
                  const y2 = 24 + 10 * Math.sin(angle)
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1a1a1a" strokeWidth="0.8"/>
                })}
                {/* Petals */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i * 45 * Math.PI) / 180
                  const x = 24 + 16 * Math.cos(angle)
                  const y = 24 + 16 * Math.sin(angle)
                  return <ellipse key={i} cx={x} cy={y} rx="3" ry="5" transform={`rotate(${i * 45}, ${x}, ${y})`} fill="none" stroke="#1a1a1a" strokeWidth="0.7"/>
                })}
              </svg>
              <div className="text-right">
                <p className="font-ui font-bold uppercase tracking-[0.1em] text-[13px] text-[var(--ink)]">
                  Subscribe · Free Forever
                </p>
                <p className="font-ui uppercase tracking-[0.08em] text-[20px] font-black text-[var(--ink)]">
                  ₹0<span className="text-[12px] font-normal">/month</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
