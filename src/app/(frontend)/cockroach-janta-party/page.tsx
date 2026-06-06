import type { Metadata } from 'next'
import Link from 'next/link'
import { Reveal } from '@/components/animation/Reveal'
import { CockroachField } from '@/components/swarm/CockroachField'
import { Cockroach } from '@/components/swarm/Cockroach'
import { SwarmBanner } from '@/components/swarm/SwarmBanner'
import { ShareButton } from '@/components/share/ShareButton'
import { generateBaseMetadata } from '@/lib/seo'

export const metadata: Metadata = {
  ...generateBaseMetadata('The Cockroach Janta Party, explained'),
  description:
    'How a Chief Justice’s “cockroaches” remark sparked India’s biggest Gen-Z movement of 2026 — the Cockroach Janta Party. The facts, the timeline, and what it means.',
}

type TimelineItem = { date: string; title: string; body: string }

const TIMELINE: TimelineItem[] = [
  {
    date: '15 May 2026',
    title: 'The remark',
    body: 'Presiding over a Supreme Court bench, CJI Surya Kant described unemployed youth turning to social media, journalism and RTI activism as being “like cockroaches” and “parasites of society.” He later said he was misquoted and was referring to holders of fraudulent degrees.',
  },
  {
    date: '16 May 2026',
    title: 'A joke becomes a party',
    body: 'Communications strategist Abhijeet Dipke launches the satirical “Cockroach Janta Party” (CJP) — a parody of the ruling Bharatiya Janata Party — branding itself the “voice of the lazy and unemployed.”',
  },
  {
    date: 'Within 78 hours',
    title: 'Three million',
    body: 'The CJP’s Instagram crosses 3 million followers in under four days — then 10 million in under five — overtaking the official handle of the BJP.',
  },
  {
    date: 'June 2026',
    title: '22 million strong',
    body: 'Followers cross 22 million. The movement plans real-world protests at Jantar Mantar. CNBC runs an explainer for investors; the CJP’s X account is briefly withheld in India on a government legal demand citing “national security.”',
  },
]

const FACTS: { label: string; value: string }[] = [
  { label: 'Followers (Instagram)', value: '22M+' },
  { label: 'To 10M followers', value: '< 5 days' },
  { label: 'Founded', value: '16 May 2026' },
  { label: 'Self-description', value: 'Voice of the lazy & unemployed' },
]

const SOURCES: { label: string; url: string }[] = [
  { label: 'NBC News — began as a joke, then millions joined', url: 'https://www.nbcnews.com/world/asia/indias-cockroach-janata-party-began-joke-millions-joined-rcna346466' },
  { label: 'Al Jazeera — judge’s comment sparks satire, protest', url: 'https://www.aljazeera.com/features/2026/5/20/cockroach-janata-party-top-indian-judges-comment-sparks-satire-protest' },
  { label: 'CNN — Gen Z protest', url: 'https://www.cnn.com/2026/06/05/india/india-cockroach-janta-party-protest-youth-anger-intl-hnk' },
  { label: 'CNBC — what investors need to know', url: 'https://www.cnbc.com/2026/06/04/indias-cockroach-cjp-party-what-investors-need-to-know.html' },
  { label: 'CBS News — movement spooks India’s leaders', url: 'https://www.cbsnews.com/news/cockroach-janta-party-india-online-protest/' },
  { label: 'Wikipedia — Cockroach Janta Party', url: 'https://en.wikipedia.org/wiki/Cockroach_Janta_Party' },
]

export default function CJPPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b-2 border-[var(--divider)] bg-[var(--bg)]">
        <CockroachField count={6} />
        <div className="relative mx-auto max-w-[1440px] px-6 py-16 md:py-24">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="float-y inline-block">
                <Cockroach size={36} color="var(--red-tag)" />
              </span>
              <span className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--red-tag)]">
                Explainer · Fact-checked · June 2026
              </span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.9] text-[clamp(42px,9vw,116px)] text-[var(--ink)] max-w-[15ch]">
              The Cockroach
              <br />
              Janta Party,
              <br />
              <span className="relative inline-block">
                explained.
                <span aria-hidden className="absolute -bottom-2 left-0 h-3 w-full bg-[var(--pink-chip)] -z-10" />
              </span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="font-display text-[clamp(18px,2.3vw,28px)] leading-snug text-[var(--ink-2)] mt-8 max-w-[60ch]">
              A judge called India’s jobless youth “cockroaches.” Within days, millions made the insult
              their flag — building the country’s fastest-growing political movement of 2026. Here is
              what actually happened, sourced and dated.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#swarm"
                className="group inline-flex items-center gap-3 bg-[var(--ink)] text-[var(--bg)] px-7 py-4 hover:bg-[var(--red-tag)] transition-colors"
              >
                <span className="font-ui font-bold uppercase tracking-[0.18em] text-[12px]">Join the swarm</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <ShareButton
                text="A judge called India's jobless youth 'cockroaches'. Millions made it their flag. The Cockroach Janta Party, explained:"
                label="Share the story"
                className="border-2 border-[var(--ink)] px-7 py-4 text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--bg)]"
              />
            </div>
          </Reveal>

          {/* Fact strip */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--hairline)] border border-[var(--hairline)]">
            {FACTS.map((f, i) => (
              <Reveal key={f.label} delay={i * 70} className="bg-[var(--bg)] p-6">
                <div className="font-display font-black text-[clamp(26px,4vw,44px)] leading-none text-[var(--ink)]">
                  {f.value}
                </div>
                <div className="font-ui uppercase tracking-[0.14em] text-[10px] text-[var(--ink-3)] mt-3">
                  {f.label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-b border-[var(--hairline)] bg-[var(--bg-soft)]">
        <div className="mx-auto max-w-[1100px] px-6 py-16 md:py-24">
          <Reveal>
            <p className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--red-tag)] mb-4">
              How it happened
            </p>
            <h2 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(32px,5vw,64px)] text-[var(--ink)] mb-12">
              From insult to
              <br />
              insurgency.
            </h2>
          </Reveal>

          <ol className="relative border-l-2 border-[var(--ink)]/15 ml-2">
            {TIMELINE.map((t, i) => (
              <Reveal as="li" key={t.date} delay={i * 80} className="relative pl-8 pb-12 last:pb-0">
                <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-[var(--red-tag)] border-2 border-[var(--bg-soft)]" />
                <span className="font-ui font-bold uppercase tracking-[0.18em] text-[11px] text-[var(--red-tag)]">
                  {t.date}
                </span>
                <h3 className="font-display font-black text-[clamp(22px,3vw,32px)] leading-tight mt-2 text-[var(--ink)]">
                  {t.title}
                </h3>
                <p className="font-body text-[16px] md:text-[17px] leading-relaxed text-[var(--ink-2)] mt-3 max-w-[62ch]">
                  {t.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Why it matters */}
      <section className="border-b border-[var(--hairline)] bg-[var(--ink)] text-[var(--bg)]">
        <div className="mx-auto max-w-[1100px] px-6 py-16 md:py-24">
          <Reveal>
            <h2 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(30px,5vw,60px)] max-w-[18ch]">
              Why a joke became the most-watched movement in the country.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="font-display text-[18px] md:text-[24px] leading-snug text-[var(--bg)]/80 mt-8 max-w-[62ch]">
              The CJP isn’t really about cockroaches. It’s about the gap our{' '}
              <Link href="/promises" className="underline decoration-[var(--pink-chip)] underline-offset-4">
                Jumla Meter
              </Link>{' '}
              tracks every day: 2 crore jobs that never came, a manufacturing share that fell instead
              of rising, incomes that didn’t double. When a generation is told to wait — and then
              mocked for being impatient — satire becomes the safest way to dissent.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="font-display text-[18px] md:text-[24px] leading-snug text-[var(--bg)]/80 mt-6 max-w-[62ch]">
              The New India Government doesn’t belong to any party — including this one. But the right
              to ask questions without being called a pest? That we’ll defend every time.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Swarm CTA (reuses the live banner) */}
      <div id="swarm">
        <SwarmBanner />
      </div>

      {/* Sources */}
      <section className="bg-[var(--bg)]">
        <div className="mx-auto max-w-[1100px] px-6 py-14">
          <p className="font-ui font-black uppercase tracking-[0.22em] text-[11px] text-[var(--ink-3)] mb-5">
            Sources
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            {SOURCES.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-ui uppercase tracking-[0.1em] text-[11px] text-[var(--red-tag)] hover:underline underline-offset-2"
                >
                  ↗ {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
