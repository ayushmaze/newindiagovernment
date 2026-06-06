import type { Metadata } from 'next'
import { JumlaMeter } from '@/components/promises/JumlaMeter'
import { Reveal } from '@/components/animation/Reveal'
import { generateBaseMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...generateBaseMetadata('The Jumla Meter'),
  description:
    'A sourced scorecard of India’s biggest government promises — jobs, farmer income, smart cities, Make in India and more — weighed against the public record.',
}

export default function PromisesPage() {
  return (
    <>
      <section className="border-b-2 border-[var(--divider)] bg-[var(--bg)]">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:py-24">
          <Reveal>
            <p className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--red-tag)] mb-5">
              The Scorecard · Updated 2026
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.92] text-[clamp(44px,9vw,120px)] text-[var(--ink)]">
              The Jumla
              <br />
              Meter.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="font-display text-[clamp(18px,2.2vw,26px)] leading-snug text-[var(--ink-2)] mt-8 max-w-[62ch]">
              Every government sells a future. We keep the receipts. Below: the headlines that made
              news — and what actually happened, line by line, source by source.
            </p>
          </Reveal>
        </div>
      </section>

      <JumlaMeter />
    </>
  )
}
