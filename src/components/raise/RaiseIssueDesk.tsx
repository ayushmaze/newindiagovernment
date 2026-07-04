'use client'

/**
 * RaiseIssueDesk — the working half of /raise.
 *
 * Three routes into the state's own accountability machinery:
 *   1. RTI generator — fills a legally-valid RTI Act 2005 application from a
 *      short form, entirely client-side, with copy/share buttons.
 *   2. CPGRAMS — deep link to the national grievance portal with guidance.
 *   3. Your MP — Sansad directory link + a ready letter template.
 *
 * Privacy: no network calls, no storage. The generated text lives only in
 * component state.
 */

import { useMemo, useState } from 'react'
import { Reveal } from '@/components/animation/Reveal'

const DEPARTMENTS = [
  'Public Works Department (roads, footpaths)',
  'Municipal Corporation (garbage, drains, streetlights)',
  'Jal Board / Water Supply Department',
  'Electricity Distribution Company',
  'District Education Office',
  'District Health Office / CMO',
  'Food & Civil Supplies (ration, PDS)',
  'Revenue Department (land records)',
  'Police (FIR status, verification delays)',
  'Employment Exchange / Skill Mission',
  'Other (I will name it myself)',
]

function buildRti(dept: string, area: string, issue: string, asks: string): string {
  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
  const askLines = asks
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s, i) => `${i + 1}. ${s}`)
    .join('\n')

  return `To,
The Public Information Officer,
${dept}${area ? `,\n${area}` : ''}

Subject: Application under Section 6(1) of the Right to Information Act, 2005

Sir/Madam,

I wish to seek information under the Right to Information Act, 2005 regarding the following matter:

${issue}

Kindly provide the following information:

${askLines || '1. The current status of the matter described above.\n2. The name and designation of the officer responsible.\n3. The prescribed timeline for resolution.'}

I am a citizen of India. The application fee of ₹10 is paid via Indian Postal Order / court fee stamp / online payment (as applicable).

If the requested information concerns another public authority, kindly transfer this application under Section 6(3) and inform me.

Date: ${today}
Place: ${area || '____________'}

Yours faithfully,
(Name: ____________)
(Address: ____________)`
}

export function RaiseIssueDesk() {
  const [dept, setDept] = useState(DEPARTMENTS[0])
  const [customDept, setCustomDept] = useState('')
  const [area, setArea] = useState('')
  const [issue, setIssue] = useState('')
  const [asks, setAsks] = useState('')
  const [copied, setCopied] = useState(false)

  const effectiveDept = dept.startsWith('Other') ? customDept || 'The Concerned Department' : dept
  const rtiText = useMemo(
    () => buildRti(effectiveDept, area, issue || '<describe your issue here>', asks),
    [effectiveDept, area, issue, asks],
  )

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(rtiText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — user can select manually */
    }
  }

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-12 md:py-16 space-y-14">
      {/* Route 1 — RTI generator */}
      <Reveal>
        <section aria-label="RTI application generator" className="border-2 border-[var(--ink)] bg-white">
          <div className="border-b-2 border-[var(--ink)] px-6 py-4 flex items-center justify-between gap-4 flex-wrap bg-[var(--pink-ticker-bg)]">
            <h2 className="font-display font-black uppercase text-[clamp(20px,3vw,30px)] text-[var(--ink)]">
              1 · File an RTI — the government must reply in 30 days
            </h2>
            <span className="font-ui uppercase tracking-[0.16em] text-[10px] text-[var(--ink-2)]">
              RTI Act 2005 · ₹10 fee · Legal duty to answer
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="p-6 md:p-8 space-y-5 border-b lg:border-b-0 lg:border-r border-[var(--hairline)]">
              <label className="block">
                <span className="font-ui font-bold uppercase tracking-[0.14em] text-[11px] text-[var(--ink)]">
                  Which department is the problem with?
                </span>
                <select
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  className="mt-2 w-full border-2 border-[var(--ink)]/30 focus:border-[var(--ink)] bg-white px-3 py-3 font-body text-[15px]"
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </label>
              {dept.startsWith('Other') && (
                <label className="block">
                  <span className="font-ui font-bold uppercase tracking-[0.14em] text-[11px] text-[var(--ink)]">
                    Department name
                  </span>
                  <input
                    value={customDept}
                    onChange={(e) => setCustomDept(e.target.value)}
                    placeholder="e.g. Department of Higher Education, UP"
                    className="mt-2 w-full border-2 border-[var(--ink)]/30 focus:border-[var(--ink)] bg-white px-3 py-3 font-body text-[15px]"
                  />
                </label>
              )}
              <label className="block">
                <span className="font-ui font-bold uppercase tracking-[0.14em] text-[11px] text-[var(--ink)]">
                  Your city / district (optional)
                </span>
                <input
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Lucknow, Uttar Pradesh"
                  className="mt-2 w-full border-2 border-[var(--ink)]/30 focus:border-[var(--ink)] bg-white px-3 py-3 font-body text-[15px]"
                />
              </label>
              <label className="block">
                <span className="font-ui font-bold uppercase tracking-[0.14em] text-[11px] text-[var(--ink)]">
                  Describe the issue in 2–3 lines
                </span>
                <textarea
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  rows={3}
                  placeholder="The road outside XYZ colony has been dug up since January 2026 and no work has happened…"
                  className="mt-2 w-full border-2 border-[var(--ink)]/30 focus:border-[var(--ink)] bg-white px-3 py-3 font-body text-[15px]"
                />
              </label>
              <label className="block">
                <span className="font-ui font-bold uppercase tracking-[0.14em] text-[11px] text-[var(--ink)]">
                  What do you want to know? (one question per line — optional)
                </span>
                <textarea
                  value={asks}
                  onChange={(e) => setAsks(e.target.value)}
                  rows={3}
                  placeholder={
                    'How much money was sanctioned for this work?\nWhich contractor was assigned and by when must it finish?'
                  }
                  className="mt-2 w-full border-2 border-[var(--ink)]/30 focus:border-[var(--ink)] bg-white px-3 py-3 font-body text-[15px]"
                />
              </label>
            </div>

            <div className="p-6 md:p-8 bg-[var(--bg-soft)]">
              <div className="flex items-center justify-between mb-3">
                <span className="font-ui font-black uppercase tracking-[0.18em] text-[11px] text-[var(--red-tag)]">
                  Your RTI application — live preview
                </span>
                <button
                  type="button"
                  onClick={copy}
                  className="font-ui font-bold uppercase tracking-[0.14em] text-[11px] bg-[var(--ink)] text-white px-4 py-2 hover:bg-[var(--red-tag)] transition-colors tap-shrink"
                >
                  {copied ? '✓ Copied' : 'Copy text'}
                </button>
              </div>
              <pre className="whitespace-pre-wrap font-body text-[13px] leading-relaxed text-[var(--ink-2)] border border-[var(--hairline)] bg-white p-4 max-h-[460px] overflow-y-auto">
                {rtiText}
              </pre>
              <p className="mt-3 font-ui text-[11px] uppercase tracking-[0.12em] text-[var(--ink-3)]">
                File online at{' '}
                <a
                  href="https://rtionline.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[var(--ink)]"
                >
                  rtionline.gov.in
                </a>{' '}
                (central) or your state RTI portal · Fill in your name before submitting
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Routes 2 + 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Reveal>
          <section
            aria-label="File a grievance on CPGRAMS"
            className="h-full border-2 border-[var(--ink)] bg-white p-6 md:p-8 flex flex-col"
          >
            <h2 className="font-display font-black uppercase text-[clamp(19px,2.4vw,26px)] text-[var(--ink)] mb-3">
              2 · CPGRAMS — the PM office&apos;s own grievance system
            </h2>
            <p className="font-body text-[15px] leading-relaxed text-[var(--ink-2)] flex-1">
              CPGRAMS is the Government of India&apos;s official portal where every
              grievance gets a tracking ID and a designated officer. It works — the
              government itself reports lakhs of resolutions a year. Describe your
              issue, pick the ministry, and keep the tracking ID safe. If nothing
              happens in 30 days, escalate inside the portal — or come back here and
              file the RTI above asking why.
            </p>
            <a
              href="https://pgportal.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 self-start bg-[var(--ink)] text-white px-6 py-3 font-ui font-bold uppercase tracking-[0.16em] text-[12px] hover:bg-[var(--red-tag)] transition-colors tap-shrink"
            >
              Open pgportal.gov.in →
            </a>
          </section>
        </Reveal>

        <Reveal delay={80}>
          <section
            aria-label="Write to your MP"
            className="h-full border-2 border-[var(--ink)] bg-white p-6 md:p-8 flex flex-col"
          >
            <h2 className="font-display font-black uppercase text-[clamp(19px,2.4vw,26px)] text-[var(--ink)] mb-3">
              3 · Your MP works for you — put it in writing
            </h2>
            <p className="font-body text-[15px] leading-relaxed text-[var(--ink-2)] flex-1">
              Every MP has a constituency office, an MPLADS fund of ₹5 crore a year,
              and a legal right to raise your issue in Parliament through questions.
              Find your MP in the official Sansad directory, and send a short,
              factual letter: what the problem is, since when, what you&apos;ve
              already tried (RTI/CPGRAMS IDs make it 10× stronger), and what you want
              them to do.
            </p>
            <a
              href="https://sansad.in/ls/members"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 self-start bg-[var(--ink)] text-white px-6 py-3 font-ui font-bold uppercase tracking-[0.16em] text-[12px] hover:bg-[var(--red-tag)] transition-colors tap-shrink"
            >
              Find your MP on sansad.in →
            </a>
          </section>
        </Reveal>
      </div>

      {/* The pledge — why this helps both sides */}
      <Reveal>
        <section className="border-l-4 border-[var(--gold-petition)] bg-[var(--bg-soft)] p-6 md:p-8">
          <h2 className="font-ui font-black uppercase tracking-[0.2em] text-[12px] text-[var(--gold-petition)] mb-3">
            Why we built this
          </h2>
          <p className="font-display text-[clamp(16px,1.8vw,21px)] leading-snug text-[var(--ink)] max-w-[70ch]">
            A government can only fix what reaches it — and a citizen can only trust
            what answers back. The Janta Desk routes real problems into the
            state&apos;s own legal channels, in the state&apos;s own formats. When it
            works, we say so. When it doesn&apos;t, the paper trail you created here
            becomes the evidence. Either way, India wins.
          </p>
        </section>
      </Reveal>
    </div>
  )
}
