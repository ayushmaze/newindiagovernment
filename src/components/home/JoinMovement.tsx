import { SignupCard } from '@/components/newsletter/SignupCard'

export function JoinMovement() {
  return (
    <section
      id="join"
      className="bg-[var(--ink)] text-[var(--bg)]"
      aria-label="Join the movement"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: pitch */}
          <div className="lg:col-span-7">
            <p className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--pink-chip)] mb-5">
              Add Your Voice
            </p>
            <h2 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(36px,7vw,96px)]">
              Every Indian
              <br />
              with a phone
              <br />
              <span className="text-[var(--pink-chip)]">is a newsroom.</span>
            </h2>

            <p className="font-display text-[20px] md:text-[26px] leading-snug text-[var(--bg)]/80 mt-10 max-w-[55ch]">
              For the price of a missed call, you can refuse to be lied to. Get the week&apos;s
              verified investigations, fact-checks, and citizen petitions — straight to your inbox.
            </p>

            <ul className="mt-10 space-y-3 text-[var(--bg)]/85">
              {[
                'One newsletter, weekly · No ads, no sponsors',
                'Unsubscribe with one tap · We never sell your data',
                'Free forever · Funded entirely by readers',
              ].map((b) => (
                <li key={b} className="flex items-start gap-3 font-ui text-[14px]">
                  <span className="mt-1.5 inline-block h-1.5 w-1.5 bg-[var(--pink-chip)] shrink-0"></span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: signup card */}
          <div className="lg:col-span-5">
            <div className="bg-[var(--bg)] text-[var(--ink)] p-8 border-2 border-[var(--pink-chip)]">
              <SignupCard />
            </div>
            <p className="font-ui uppercase tracking-[0.16em] text-[10px] text-[var(--bg)]/40 mt-5 text-center">
              By subscribing, you are not buying a service. You are joining a movement.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
