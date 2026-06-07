'use client'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLang } from '@/components/i18n/LangProvider'
import type { DictKey } from '@/lib/i18n/dict'

type NavItem = { labelKey: DictKey; fallback: string; href: string }

const NAV_ITEMS: NavItem[] = [
  { labelKey: 'nav.latest', fallback: 'Latest', href: '/' },
  { labelKey: 'nav.jumlaMeter', fallback: 'Jumla Meter', href: '/promises' },
  { labelKey: 'nav.realOrJumla', fallback: 'Real or Jumla?', href: '/quiz' },
  { labelKey: 'nav.movement', fallback: 'The Movement', href: '/movement' },
  { labelKey: 'nav.factCheck', fallback: 'Fact-Check', href: '/category/fact-check' },
  { labelKey: 'nav.policy', fallback: 'Policy', href: '/category/policy' },
  { labelKey: 'nav.investigations', fallback: 'Investigations', href: '/category/investigations' },
  { labelKey: 'nav.petitions', fallback: 'Petitions', href: '/petitions' },
  { labelKey: 'nav.vote', fallback: 'Vote', href: '/#vote' },
]

export function PrimaryNav() {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const pathname = usePathname()
  const { t, hydrated } = useLang()

  const label = useCallback(
    (item: NavItem) => (hydrated ? t(item.labelKey) : item.fallback),
    [hydrated, t],
  )

  // Animated close — let the exit animation play before unmounting
  const close = useCallback(() => {
    setClosing(true)
    window.setTimeout(() => {
      setOpen(false)
      setClosing(false)
    }, 210)
  }, [])

  // Lock body scroll + Escape to close while the drawer is open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, close])

  return (
    <>
      <nav
        className="sticky top-0 z-50 bg-[var(--bg)]/95 backdrop-blur border-b border-[var(--hairline)] shadow-sm"
        aria-label="Primary navigation"
      >
        <div className="mx-auto max-w-[1440px] px-6 flex items-center gap-4 h-12">
          {/* Hamburger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={open}
            className="shrink-0 flex flex-col gap-1.5 p-1 group tap-shrink"
          >
            <span className="block w-5 h-0.5 bg-[var(--ink)] transition-transform group-hover:translate-x-0.5" />
            <span className="block w-5 h-0.5 bg-[var(--ink)]" />
            <span className="block w-4 h-0.5 bg-[var(--ink)] transition-all group-hover:w-5" />
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
                    {label(item)}
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
            className="shrink-0 ml-auto p-1 hover:text-[var(--lavender-hover)] transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </Link>
        </div>
      </nav>

      {/* Animated drawer */}
      {open && (
        <>
          <div
            className={`fixed inset-0 z-[60] bg-black/45 ${closing ? 'drawer-backdrop-closing' : 'drawer-backdrop'}`}
            onClick={close}
            aria-hidden
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className={`fixed inset-y-0 left-0 z-[70] w-[80vw] max-w-[320px] bg-[var(--bg)] shadow-2xl flex flex-col ${
              closing ? 'drawer-panel-closing' : 'drawer-panel'
            }`}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[var(--divider)]">
              <span className="font-display font-black uppercase tracking-[0.04em] text-[16px] text-[var(--ink)]">
                Menu
              </span>
              <button
                onClick={close}
                aria-label="Close navigation menu"
                className="p-2 -mr-2 text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors tap-shrink"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                  <path d="M3 3 L13 13 M13 3 L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <ul className="flex-1 overflow-y-auto px-4 py-3">
              {NAV_ITEMS.map((item, i) => {
                const active = pathname === item.href
                return (
                  <li
                    key={item.href}
                    className="drawer-link"
                    style={{ animationDelay: `${60 + i * 35}ms` }}
                  >
                    <Link
                      href={item.href}
                      onClick={close}
                      className={`flex items-center justify-between font-ui font-semibold uppercase tracking-[0.12em] text-[15px] py-3.5 px-2 border-b border-[var(--hairline)] transition-colors ${
                        active
                          ? 'text-[var(--red-tag)]'
                          : 'text-[var(--ink)] hover:text-[var(--lavender-hover)]'
                      }`}
                      aria-current={active ? 'page' : undefined}
                    >
                      {label(item)}
                      <span aria-hidden className="text-[var(--ink-3)] text-[13px]">→</span>
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Drawer footer CTA */}
            <div
              className="drawer-link p-4 border-t-2 border-[var(--divider)] bg-[var(--ink)]"
              style={{ animationDelay: `${60 + NAV_ITEMS.length * 35}ms` }}
            >
              <Link
                href="/quiz"
                onClick={close}
                className="flex items-center justify-center gap-2 bg-[var(--pink-chip)] text-[var(--ink)] py-3 font-ui font-bold uppercase tracking-[0.16em] text-[12px] tap-shrink"
              >
                <span aria-hidden>🎯</span>
                {hydrated ? t('sticky.label') : 'Play Real or Jumla?'}
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}
