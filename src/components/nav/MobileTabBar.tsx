'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

type Tab = { href: string; label: string; icon: ReactNode }

const I = {
  home: (
    <path d="M3 11l9-8 9 8M5 10v10a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V10" />
  ),
  meter: <><path d="M12 3a9 9 0 109 9" /><path d="M12 12l5-3" /><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" /></>,
  quiz: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 015 0c0 1.7-2.5 2-2.5 4" /><circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none" /></>,
  swarm: <><ellipse cx="12" cy="13" rx="4" ry="6" /><path d="M12 7c-1.5-3-3-4-5-5M12 7c1.5-3 3-4 5-5M8 11L4 9M8 14l-4 1M16 11l4-2M16 14l4 1" /></>,
  vote: <><path d="M4 12l5 5L20 6" /><path d="M3 20h18" /></>,
}

const TABS: Tab[] = [
  { href: '/', label: 'Home', icon: I.home },
  { href: '/promises', label: 'Jumla', icon: I.meter },
  { href: '/quiz', label: 'Quiz', icon: I.quiz },
  { href: '/the-swarm', label: 'Swarm', icon: I.swarm },
  { href: '/#vote', label: 'Vote', icon: I.vote },
]

export function MobileTabBar() {
  const pathname = usePathname()

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-[var(--bg)]/95 backdrop-blur border-t-2 border-[var(--divider)] pb-safe"
      aria-label="Mobile navigation"
    >
      <ul className="grid grid-cols-5">
        {TABS.map((t) => {
          const active = t.href === '/' ? pathname === '/' : pathname.startsWith(t.href.split('#')[0]) && t.href !== '/'
          return (
            <li key={t.href}>
              <Link
                href={t.href}
                aria-current={active ? 'page' : undefined}
                className={`tap-shrink flex flex-col items-center justify-center gap-1 py-2.5 transition-colors ${
                  active ? 'text-[var(--red-tag)]' : 'text-[var(--ink-3)]'
                }`}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {t.icon}
                </svg>
                <span className="font-ui font-bold uppercase tracking-[0.1em] text-[9px]">
                  {t.label}
                </span>
                {active && <span className="h-0.5 w-5 bg-[var(--red-tag)] rounded-full" />}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
