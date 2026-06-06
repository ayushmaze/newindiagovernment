import type { Metadata } from 'next'
import Link from 'next/link'
import { Reveal } from '@/components/animation/Reveal'
import { MarchField } from '@/components/movement/MarchField'
import { Marcher } from '@/components/movement/Marcher'
import { MovementBanner } from '@/components/movement/MovementBanner'
import { ShareButton } from '@/components/share/ShareButton'
import { generateBaseMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...generateBaseMetadata('The Movement'),
  description:
    'The New India Government is a citizens’ movement — every Indian who reads the evidence, asks the hard question, and shares the answer. No leaders, no party, just numbers that can’t be hidden.',
}

type Principle = { num: string; title: string; body: string }

const PRINCIPLES: Principle[] = [
  {
    num: '01',
    title: 'Numbers can’t be hidden',
    body: 'A single complaint is easy to wave away. A million people asking the same question, at the same time, with the same receipts, is not. The movement’s only weapon is its size.',
  },
  {
    num: '02',
    title: 'Evidence over noise',
    body: 'We don’t shout louder — we cite harder. Every claim links to its source. The point is never to trend; it’s to be impossible to argue with.',
  },
  {
    num: '03',
    title: 'No leaders to buy off',
    body: 'There is no headquarters, no high command, no single face to silence. The New India Government belongs to whoever shows up with a question and a source.',
  },
  {
    num: '04',
    title: 'Patience is not silence',
    body: 'Being told to “wait” is not the same as agreeing to be ignored. We wait — and we keep the receipts of every promise made while we waited.',
  },
]

const STEPS: { label: string; body: string; href: string; cta: string }[] = [
  {
    label: 'Know the record',
    body: 'Start with the Jumla Meter — the biggest promises, scored against what actually happened.',
    href: '/promises',
    cta: 'Open the Jumla Meter →',
  },
  {
    label: 'Test yourself',
    body: 'Play Real or Jumla? and learn to spot a gimmick from a fact in two minutes flat.',
    href: '/quiz',
    cta: 'Play the game →',
  },
  {
    label: 'Make it count',
    body: 'Sign a petition, add your voice, and share what you learn. One tap grows the movement.',
    href: '/petitions',
    cta: 'Take action →',
  },
]

export default function MovementPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b-2 border-[var(--divider)] bg-[var(--bg)]">
        <MarchField count={6} />
        <div className="relative mx-auto max-w-[1440px] px-6 py-16 md:py-24">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="float-y inline-block">
                <Marcher size={36} color="var(--red-tag)" />
              </span>
              <span className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--red-tag)]">
                A citizens&apos; movement · Est. 2026
              </span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.9] text-[clamp(40px,9vw,116px)] text-[var(--ink)] max-w-[15ch]">
              The New India
              <br />
              <span className="relative inline-block">
                Government.
                <span aria-hidden className="absolute -bottom-2 left-0 h-3 w-full bg-[var(--pink-chip)] -z-10" />
              </span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="font-display text-[clamp(18px,2.3vw,28px)] leading-snug text-[var(--ink-2)] mt-8 max-w-[60ch]">
              Not a party. Not a personality. A movement of citizens who read the evidence, ask the
              hard question, and share the answer — until the truth is too widespread to bury.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#join"
                className="group inline-flex items-center gap-3 bg-[var(--ink)] text-[var(--bg)] px-7 py-4 hover:bg-[var(--red-tag)] transition-colors"
              >
                <span className="font-ui font-bold uppercase tracking-[0.18em] text-[12px]">Join the movement</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <ShareButton
                text="One voice asks. A million can't be ignored. Join The New India Government — a citizens' movement for truth and accountability."
                url="/movement"
                label="Share the movement"
                className="border-2 border-[var(--ink)] px-7 py-4 text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)]"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="border-b border-[var(--hairline)] bg-[var(--bg-soft)]">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:py-24">
          <Reveal>
            <p className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--red-tag)] mb-4">
              What the movement believes
            </p>
            <h2 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,64px)] text-[var(--ink)] mb-12 max-w-[16ch]">
              Four rules. No leaders.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--hairline)] border border-[var(--hairline)]">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.num} delay={i * 70} className="bg-[var(--bg)] p-8 md:p-10">
                <span className="font-display font-black text-[clamp(40px,5vw,64px)] leading-none text-[var(--pink-chip)]">
                  {p.num}
                </span>
                <h3 className="font-display font-black text-[clamp(22px,3vw,32px)] leading-tight mt-5 text-[var(--ink)]">
                  {p.title}
                </h3>
                <p className="font-body text-[16px] md:text-[17px] leading-relaxed text-[var(--ink-2)] mt-4 max-w-[52ch]">
                  {p.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How to join */}
      <section className="border-b border-[var(--hairline)] bg-[var(--ink)] text-[var(--bg)]">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:py-24">
          <Reveal>
            <h2 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(30px,5vw,60px)] max-w-[18ch] mb-12">
              Three ways to grow the movement.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--bg)]/15">
            {STEPS.map((s, i) => (
              <Reveal key={s.label} delay={i * 80} className="bg-[var(--ink)] p-8 md:p-10 flex flex-col">
                <span className="font-ui font-black uppercase tracking-[0.22em] text-[11px] text-[var(--pink-chip)]">
                  Step {i + 1}
                </span>
                <h3 className="font-display font-black text-[clamp(22px,3vw,30px)] leading-tight mt-4">
                  {s.label}
                </h3>
                <p className="font-body text-[16px] leading-relaxed text-[var(--bg)]/75 mt-4 flex-1">
                  {s.body}
                </p>
                <Link
                  href={s.href}
                  className="mt-6 font-ui font-bold uppercase tracking-[0.16em] text-[12px] text-[var(--pink-chip)] hover:text-[var(--bg)] transition-colors"
                >
                  {s.cta}
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Live movement CTA */}
      <div id="join">
        <MovementBanner />
      </div>
    </>
  )
}
