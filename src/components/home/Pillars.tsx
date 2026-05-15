type Pillar = {
  num: string
  title: string
  body: string
}

const PILLARS: Pillar[] = [
  {
    num: 'I',
    title: 'Truth Without Permission',
    body: 'We publish what the data shows — even when it embarrasses power. No editorial veto from advertisers, party offices, or PR firms.',
  },
  {
    num: 'II',
    title: 'Transparency, Always',
    body: 'Every claim links to its source. Every funding rupee is disclosed. Every correction is dated and visible. Forever.',
  },
  {
    num: 'III',
    title: 'Citizen Accountability',
    body: 'Petitions you can actually sign. Polls that aren&apos;t curated. Voices from every state — recorded, archived, public.',
  },
  {
    num: 'IV',
    title: 'Evidence Over Outrage',
    body: 'No screaming panels. No prime-time theatre. Just verifiable claims, primary documents, and the patience to read them carefully.',
  },
  {
    num: 'V',
    title: 'A Government Worth Trusting',
    body: 'Not a party. Not a personality. A standard — for every Indian elected representative, current and future, to be measured against.',
  },
]

export function Pillars() {
  return (
    <section
      className="border-b border-[var(--hairline)] bg-[var(--bg-soft)]"
      aria-label="The five pillars of The New India Government"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:py-28">
        <div className="max-w-[64ch] mb-16">
          <p className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--red-tag)] mb-5">
            The Manifesto
          </p>
          <h2 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(36px,6vw,76px)] text-[var(--ink)]">
            Five pillars.
            <br />
            One promise.
          </h2>
          <p className="font-display text-[18px] md:text-[22px] leading-snug text-[var(--ink-2)] mt-8">
            The New India Government isn&apos;t a political party. It&apos;s the standard every party
            should be held to. Here&apos;s what we stand for — and refuse to compromise on.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-[var(--hairline)] border border-[var(--hairline)]">
          {PILLARS.map((p) => (
            <li key={p.num} className="bg-[var(--bg)] p-8 flex flex-col">
              <span className="font-display font-black text-[64px] leading-none text-[var(--pink-chip)]">
                {p.num}
              </span>
              <h3 className="font-display font-black uppercase tracking-tight text-[22px] leading-[1.1] mt-6 text-[var(--ink)]">
                {p.title}
              </h3>
              <p
                className="font-body text-[15px] leading-relaxed text-[var(--ink-2)] mt-4"
                dangerouslySetInnerHTML={{ __html: p.body }}
              />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
