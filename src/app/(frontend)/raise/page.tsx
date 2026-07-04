import type { Metadata } from 'next'
import { RaiseIssueDesk } from '@/components/raise/RaiseIssueDesk'

export const metadata: Metadata = {
  title: 'Raise Your Issue — Janta Desk | The New India Government',
  description:
    'Turn your civic problem into an action the government must answer: a ready-to-file RTI application, a CPGRAMS grievance, or a letter to your MP. Free, guided, citizen-first.',
}

/**
 * /raise — the Janta Desk.
 *
 * This page is the bridge half of the site's mission: not just watching the
 * government, but routing real citizen issues INTO the government's own
 * accountability channels (RTI Act 2005, CPGRAMS, MPs) in a form officials
 * must legally respond to. Everything runs client-side — no data leaves the
 * visitor's browser.
 */
export default function RaisePage() {
  return (
    <main aria-label="Raise your issue — Janta Desk">
      <section className="relative border-b-2 border-[var(--divider)] bg-[var(--bg)] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 bg-lavender-stripe opacity-30 pointer-events-none"
        />
        <div className="relative mx-auto max-w-[1440px] px-6 py-12 md:py-16">
          <div className="flex items-center gap-3 mb-6 fade-up">
            <span className="h-px w-10 bg-[var(--ink)]" />
            <span className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--red-tag)]">
              Janta Desk · Your issue, routed to power
            </span>
          </div>
          <h1 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(38px,7vw,92px)] text-[var(--ink)] fade-up fade-up-delay-1 max-w-[18ch]">
            Make the system answer you.
          </h1>
          <p className="font-display text-[clamp(18px,2vw,24px)] leading-snug text-[var(--ink-2)] mt-6 max-w-[62ch] fade-up fade-up-delay-2">
            Democracy has official channels that legally require a response — most
            people just never use them. Pick your route below; we turn your problem
            into a filing-ready document in one minute.{' '}
            <strong className="text-[var(--ink)]">
              Nothing you type leaves your phone.
            </strong>
          </p>
        </div>
      </section>

      <RaiseIssueDesk />
    </main>
  )
}
