import type { Metadata } from 'next'
import { RealOrJumla } from '@/components/quiz/RealOrJumla'
import { generateBaseMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...generateBaseMetadata('Real or Jumla?'),
  description:
    'Can you tell a real fact from a political jumla? Play the addictive fact-check game, build a streak, and challenge your friends.',
}

export default function QuizPage() {
  return (
    <section className="bg-[var(--bg-soft)] min-h-[80vh]">
      <div className="mx-auto max-w-[1440px] px-6 py-14 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--red-tag)] mb-4">
            The Game
          </p>
          <h1 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.92] text-[clamp(40px,9vw,96px)] text-[var(--ink)]">
            Real or
            <br />
            Jumla?
          </h1>
          <p className="font-display text-[18px] md:text-[22px] leading-snug text-[var(--ink-2)] mt-6">
            One claim at a time. Tap your verdict. Build a streak. Find out if you can actually spot
            a jumla — or if you&apos;d believe anything from a podium.
          </p>
        </div>

        <RealOrJumla />

        <p className="font-ui uppercase tracking-[0.16em] text-[11px] text-[var(--ink-3)] mt-10 text-center">
          Every claim and verdict is sourced. No spin — just the record.
        </p>
      </div>
    </section>
  )
}
