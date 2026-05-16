import React from 'react'
import Link from 'next/link'
import { Masthead } from '@/components/masthead/Masthead'
import { FactCheckTicker } from '@/components/ticker/FactCheckTicker'
import { PrimaryNav } from '@/components/nav/PrimaryNav'
import { PerformancePatch } from '@/components/util/PerformancePatch'
import { display, ui, body } from '@/app/fonts'
import '../globals.css'

// Force dynamic rendering for the entire (frontend) route group.
// The layout renders <FactCheckTicker /> which calls getPayload(), and
// transitively most pages also pull live data from Payload. Letting Next
// try to statically pre-render these at build time tries to open a Postgres
// connection — which doesn't exist inside the Docker build container.
//
// All pages stay fast at runtime: Next's data cache still memoises Payload
// reads, and the homepage / article pages use ISR via fetch cache tags.
export const dynamic = 'force-dynamic'

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${display.variable} ${ui.variable} ${body.variable}`}>
      <body className="font-body bg-[var(--bg)] text-[var(--ink)]">
        <PerformancePatch />
        {/* Skip to content */}
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>

        <Masthead />
        <FactCheckTicker />
        <PrimaryNav />

        <div id="main-content">
          {children}
        </div>

        <footer className="border-t-2 border-[var(--divider)] bg-[var(--bg)] mt-16 py-12">
          <div className="mx-auto max-w-[1440px] px-6">
            {/* Wordmark */}
            <div className="text-center mb-10">
              <p className="font-display font-black uppercase tracking-[0.04em] text-[32px] text-[var(--ink)]">
                THE NEW INDIA GOVERNMENT
              </p>
              <p className="font-ui uppercase tracking-[0.18em] text-[11px] text-[var(--ink-3)] mt-2">
                Truth · Transparency · Voice
              </p>
            </div>

            {/* Footer columns */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 border-t border-[var(--hairline)] pt-10">
              <div>
                <h4 className="font-ui font-bold uppercase tracking-[0.16em] text-[11px] text-[var(--ink)] mb-4">
                  News
                </h4>
                <ul className="space-y-2">
                  {['Fact-Check', 'Policy', 'Elections', 'Leaders', 'Investigations'].map((l) => (
                    <li key={l}>
                      <Link
                        href={`/category/${l.toLowerCase()}`}
                        className="font-ui uppercase tracking-[0.12em] text-[11px] text-[var(--ink-3)] hover:text-[var(--ink)]"
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-ui font-bold uppercase tracking-[0.16em] text-[11px] text-[var(--ink)] mb-4">
                  Participate
                </h4>
                <ul className="space-y-2">
                  {[
                    { label: 'Vote', href: '/#vote' },
                    { label: 'Petitions', href: '/petitions' },
                    { label: 'Wall of Voices', href: '/voices' },
                  ].map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="font-ui uppercase tracking-[0.12em] text-[11px] text-[var(--ink-3)] hover:text-[var(--ink)]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-ui font-bold uppercase tracking-[0.16em] text-[11px] text-[var(--ink)] mb-4">
                  About
                </h4>
                <ul className="space-y-2">
                  {[
                    { label: 'About Us', href: '/about' },
                    { label: 'Privacy Policy', href: '/about#privacy' },
                    { label: 'Contact', href: '/about#contact' },
                  ].map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="font-ui uppercase tracking-[0.12em] text-[11px] text-[var(--ink-3)] hover:text-[var(--ink)]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-ui font-bold uppercase tracking-[0.16em] text-[11px] text-[var(--ink)] mb-4">
                  Social
                </h4>
                <ul className="space-y-2">
                  {['Twitter/X', 'Instagram', 'YouTube'].map((l) => (
                    <li key={l}>
                      <span className="font-ui uppercase tracking-[0.12em] text-[11px] text-[var(--ink-3)]">
                        {l}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-[var(--hairline)] pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="font-ui uppercase tracking-[0.12em] text-[11px] text-[var(--ink-3)]">
                © 2026 The New India Government. Independent journalism for India.
              </p>
              <p className="font-ui uppercase tracking-[0.12em] text-[11px] text-[var(--ink-3)]">
                Built with transparency.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
