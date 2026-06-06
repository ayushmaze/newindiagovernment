'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Latest', href: '/' },
  { label: 'Jumla Meter', href: '/promises' },
  { label: 'Real or Jumla?', href: '/quiz' },
  { label: 'The Swarm', href: '/cockroach-janta-party' },
  { label: 'Fact-Check', href: '/category/fact-check' },
  { label: 'Policy', href: '/category/policy' },
  { label: 'Investigations', href: '/category/investigations' },
  { label: 'Petitions', href: '/petitions' },
  { label: 'Vote', href: '/#vote' },
]

export function PrimaryNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <nav
        className="sticky top-0 z-50 bg-[var(--bg)] border-b border-[var(--hairline)] shadow-sm"
        aria-label="Primary navigation"
      >
        <div className="mx-auto max-w-[1440px] px-6 flex items-center gap-4 h-12">
          {/* Hamburger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={open}
            className="shrink-0 flex flex-col gap-1.5 p-1"
          >
            <span className="block w-5 h-0.5 bg-[var(--ink)]" />
            <span className="block w-5 h-0.5 bg-[var(--ink)]" />
            <span className="block w-5 h-0.5 bg-[var(--ink)]" />
          </button>

          {/* Desktop nav items */}
          <ul className="hidden lg:flex items-center gap-1 flex-1 overflow-x-auto">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`font-ui font-semibold uppercase tracking-[0.12em] text-[13px] px-3 py-1 whitespace-nowrap transition-colors
                      ${active ? 'text-[var(--ink)] underline underline-offset-4' : 'text-[var(--ink)] hover:text-[var(--lavender-hover)]'}`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Mobile: site name */}
          <span className="lg:hidden flex-1 font-display font-black uppercase text-[13px] tracking-[0.06em] text-center">
            THE NEW INDIA GOV
          </span>

          {/* Search */}
          <Link
            href="/search"
            aria-label="Search articles"
            className="shrink-0 ml-auto p-1 hover:text-[var(--lavender-hover)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </Link>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal
            aria-label="Navigation menu"
            className="fixed inset-y-0 left-0 z-50 w-72 bg-[var(--bg)] shadow-2xl p-6"
          >
            <button
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
              className="mb-6 font-ui uppercase tracking-[0.16em] text-[11px] text-[var(--ink-3)] flex items-center gap-2"
            >
              <span aria-hidden>✕</span> Close
            </button>
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block font-ui font-semibold uppercase tracking-[0.12em] text-[16px] py-3 border-b border-[var(--hairline)] hover:text-[var(--lavender-hover)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  )
}
