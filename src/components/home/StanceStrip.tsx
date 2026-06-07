'use client'

/**
 * StanceStrip — a quiet, constructive framing line near the top of the page.
 *
 * The platform's posture is accountability, not attack. This strip states
 * that explicitly so a first-time visitor reads the Jumla Meter as a
 * promises-kept scorecard applied to *every* government, present and future
 * — not as a partisan hit piece. Soft surface, no alarm colour.
 */

import { useLang } from '@/components/i18n/LangProvider'

export function StanceStrip() {
  const { t, hydrated } = useLang()
  return (
    <div className="bg-[var(--bg-soft)] border-b border-[var(--hairline)]">
      <div className="mx-auto max-w-[1440px] px-6 py-3 flex items-center gap-3 justify-center text-center">
        <span
          aria-hidden
          className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-[var(--gold-petition)] shrink-0"
        />
        <p className="font-ui text-[12px] sm:text-[13px] leading-snug text-[var(--ink-2)] max-w-[80ch]">
          <strong className="text-[var(--ink)] font-bold">
            {hydrated ? t('stance.strong') : 'This isn’t against any party or person.'}
          </strong>{' '}
          {hydrated
            ? t('stance.text')
            : 'It’s for promises kept. We hold every government — present and future — to the same test: what was promised, what was delivered, what’s still possible.'}
        </p>
      </div>
    </div>
  )
}
