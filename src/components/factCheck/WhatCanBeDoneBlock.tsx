import type { WhatCanBeDone } from './types'

interface WhatCanBeDoneBlockProps {
  data: WhatCanBeDone
}

/**
 * Action-close block. Three columns (citizen / policy / our ask) +
 * optional CTA button. Designed to be the last thing the reader sees
 * above the audit appendix.
 */
export function WhatCanBeDoneBlock({ data }: WhatCanBeDoneBlockProps) {
  const hasAny =
    data.citizenAction || data.policyAsk || data.ourAsk || data.callToActionLabel
  if (!hasAny) return null

  return (
    <section
      className="my-14 p-8 md:p-10 text-white"
      style={{ background: 'var(--ink)' }}
      aria-label="What can be done"
    >
      <div className="border-t-2 border-white pt-4 mb-8">
        <h2 className="font-display font-bold text-[26px] md:text-[32px]">What Can Be Done</h2>
        <p className="font-body text-[14px] md:text-[15px] text-white/70 mt-1 italic">
          Don&apos;t close the tab. Here&apos;s what changes things.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {data.citizenAction && (
          <ActionCard
            label="As a citizen"
            detail={data.citizenAction}
            accent="var(--pink-chip)"
          />
        )}
        {data.policyAsk && (
          <ActionCard
            label="As a lawmaker"
            detail={data.policyAsk}
            accent="var(--blue-promo)"
          />
        )}
        {data.ourAsk && (
          <ActionCard label="Our ask" detail={data.ourAsk} accent="var(--gold-petition)" />
        )}
      </div>

      {data.callToActionLabel && (
        <div className="pt-6 border-t border-white/20">
          {data.callToActionUrl ? (
            <a
              href={data.callToActionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[var(--ink)] font-ui font-bold uppercase tracking-[0.18em] text-[12px] px-6 py-4 hover:bg-[var(--pink-chip)] transition-colors"
            >
              {data.callToActionLabel}
              <span aria-hidden="true">→</span>
            </a>
          ) : (
            <p className="inline-block bg-white text-[var(--ink)] font-ui font-bold uppercase tracking-[0.18em] text-[12px] px-6 py-4">
              {data.callToActionLabel}
            </p>
          )}
        </div>
      )}
    </section>
  )
}

function ActionCard({
  label,
  detail,
  accent,
}: {
  label: string
  detail: string
  accent: string
}) {
  return (
    <div className="border-l-4 pl-5" style={{ borderColor: accent }}>
      <p
        className="font-ui font-bold uppercase tracking-[0.22em] text-[10px] mb-2"
        style={{ color: accent }}
      >
        {label}
      </p>
      <p className="font-body text-[15px] md:text-[16px] leading-[1.55] text-white">
        {detail}
      </p>
    </div>
  )
}
