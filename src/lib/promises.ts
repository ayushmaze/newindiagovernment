/**
 * The Jumla Meter — a tracker of major, widely-publicised government promises
 * weighed against the public record. Every entry is sourced. Verdicts follow
 * the same scale as our fact-check desk.
 *
 * Sources are linked, dated and free to verify. Where the government disputes a
 * figure, the dispute is noted in `reality`. This is editorial fact-checking,
 * not a partisan scorecard — the test is always: does the claim survive a
 * citation check?
 */

export type Verdict = 'broken' | 'jumla' | 'delayed' | 'partial' | 'kept'

export type PromiseSource = {
  label: string
  url: string
}

export type GovPromise = {
  id: string
  /** The headline promise as it was sold to the public */
  promise: string
  /** Who said it / where, and roughly when */
  attribution: string
  year: string
  category: 'Jobs' | 'Economy' | 'Farmers' | 'Cities' | 'Water' | 'Environment' | 'Money'
  verdict: Verdict
  /** 0–100 — how much of the promise the public record shows was actually met */
  progress: number
  /** What the data actually shows */
  reality: string
  /** One-line punch for share cards */
  punchline: string
  sources: PromiseSource[]
}

export const VERDICT_META: Record<
  Verdict,
  { label: string; bg: string; fg: string; note: string }
> = {
  broken: { label: 'BROKEN', bg: 'var(--red-tag)', fg: '#ffffff', note: 'Promised. Not delivered.' },
  jumla: { label: 'JUMLA', bg: '#7c2d12', fg: '#ffffff', note: 'Admitted as a campaign gimmick.' },
  delayed: { label: 'DELAYED', bg: 'var(--gold-petition)', fg: '#ffffff', note: 'Deadline quietly moved.' },
  partial: { label: 'PARTIALLY MET', bg: '#b45309', fg: '#ffffff', note: 'Some progress, far from the claim.' },
  kept: { label: 'ON TRACK', bg: '#3a7d44', fg: '#ffffff', note: 'Largely delivered.' },
}

export const PROMISES: GovPromise[] = [
  {
    id: 'two-crore-jobs',
    promise: '2 crore jobs every year',
    attribution: 'Attributed to PM Narendra Modi · 2014 campaign',
    year: '2014',
    category: 'Jobs',
    verdict: 'broken',
    progress: 8,
    reality:
      'There were ~41.27 crore employed persons in 2016-17. By 2022-23 the figure had dipped to ~40.57 crore — a net loss of over 70 lakh jobs (CMIE), even as ~80 lakh youth enter the workforce each year. That is the opposite of 2 crore new jobs annually.',
    punchline: '2 crore jobs a year was promised. The economy lost 70 lakh.',
    sources: [
      { label: 'CMIE employment data via People’s Democracy', url: 'https://peoplesdemocracy.in/2024/0407_pd/where-are-promised-two-crore-jobs-every-year' },
      { label: 'Fact-check: OnlyFact.in', url: 'https://onlyfact.in/2-crore-jobs-every-year-promised-by-prime-minister-narendra-modi-fact-check/' },
    ],
  },
  {
    id: 'fifteen-lakh',
    promise: '₹15 lakh in every Indian’s bank account',
    attribution: 'PM Modi, Kanker rally · later called a "jumla" by Amit Shah',
    year: '2014',
    category: 'Money',
    verdict: 'jumla',
    progress: 0,
    reality:
      'Modi said bringing back black money stashed abroad could give every poor Indian ₹15–20 lakh. It never entered the manifesto, and BJP president Amit Shah later said on record: "This is a jumla… 15 lakhs will not be credited in anyone’s account." The word "jumla" entered the national vocabulary because of this promise.',
    punchline: 'The promise that taught India the word "jumla".',
    sources: [
      { label: 'BOOM fact-check', url: 'https://www.boomlive.in/did-modi-promise-to-deposit-rs-15-lakh-in-every-account-a-factcheck' },
      { label: 'The Quint WebQoof', url: 'https://www.thequint.com/news/webqoof/rajnath-singh-ani-interview-pm-narendra-modi-never-promised-rs-15-lakh-fact-check' },
    ],
  },
  {
    id: 'double-farm-income',
    promise: 'Double farmers’ income by 2022',
    attribution: 'PM Modi, Bareilly · 28 Feb 2016',
    year: '2016',
    category: 'Farmers',
    verdict: 'broken',
    progress: 45,
    reality:
      'The Dalwai Committee target was ₹22,610/month per farm household by 2022-23. The 2021 Situation Assessment Survey put actual farm-household income at ~₹10,218/month. ICRIER’s independent assessment found less than 50% of the goal achieved; field reporting found some "doubled-income" farmers were students not even engaged in farming.',
    punchline: 'Income was meant to double. Independent studies found it didn’t reach half.',
    sources: [
      { label: 'Outlook India status report', url: 'https://www.outlookindia.com/national/centre-wanted-to-double-farmers-income-by-2022-what-is-the-reality--news-51625' },
      { label: 'IndiaSpend analysis', url: 'https://www.indiaspend.com/doubling-farm-income-by-2022-a-status-report' },
    ],
  },
  {
    id: 'make-in-india',
    promise: 'Manufacturing = 25% of GDP (Make in India)',
    attribution: 'Make in India launch · 2014',
    year: '2014',
    category: 'Economy',
    verdict: 'broken',
    progress: 18,
    reality:
      'Manufacturing’s share of GDP has fallen, not risen — from ~16.7% in 2013-14 to ~14% by the year ending March 2025, against a 25% target. The linked goal of 100 million new manufacturing jobs by 2022 also went unmet.',
    punchline: 'Target: 25% of GDP. Reality: it fell to a 20-year low near 14%.',
    sources: [
      { label: 'Down To Earth: 10 years of Make in India', url: 'https://www.downtoearth.org.in/governance/but-did-we-really-make-in-india' },
      { label: 'Make in India · Wikipedia', url: 'https://en.wikipedia.org/wiki/Make_in_India' },
    ],
  },
  {
    id: 'smart-cities',
    promise: '100 Smart Cities',
    attribution: 'Smart Cities Mission launch · 25 Jun 2015',
    year: '2015',
    category: 'Cities',
    verdict: 'partial',
    progress: 60,
    reality:
      'The mission ran a full decade and was closed on 31 March 2025. While the government reports ~95% of individual projects complete, only 18 of the 100 cities had finished all their projects by March 2025, and analyses found funding reached a small, uneven share of residents.',
    punchline: 'Ten years, 100 cities — only 18 actually finished.',
    sources: [
      { label: 'Down To Earth: 18 of 100 complete', url: 'https://www.downtoearth.org.in/governance/after-a-decade-of-its-launch-only-18-out-of-100-cities-have-completed-smart-cities-mission-projects-but-there-are-some-positive-takeaways' },
      { label: 'Nature: gains unbalanced', url: 'https://www.nature.com/articles/d44151-025-00229-5' },
    ],
  },
  {
    id: 'har-ghar-jal',
    promise: 'Tap water to every home by 2024',
    attribution: 'Jal Jeevan Mission · 2019',
    year: '2019',
    category: 'Water',
    verdict: 'delayed',
    progress: 75,
    reality:
      'A genuine infrastructure push — ~98% of rural homes now have a tap connection. But a 2024 government-commissioned survey found only ~75% actually receive regular, safe, adequate water, and the 100% functional-coverage deadline has been pushed from 2024 to 2028.',
    punchline: 'Taps installed in 98% of homes — but only ~75% get reliable water.',
    sources: [
      { label: 'Jal Jeevan Mission · Wikipedia', url: 'https://en.wikipedia.org/wiki/Jal_Jeevan_Mission' },
      { label: 'PRS: Demand for Grants, Jal Shakti', url: 'https://prsindia.org/budgets/parliament/demand-for-grants-2024-25-analysis-jal-shakti' },
    ],
  },
  {
    id: 'namami-gange',
    promise: 'A clean Ganga (Namami Gange)',
    attribution: 'Namami Gange · 2014-15',
    year: '2014',
    category: 'Environment',
    verdict: 'partial',
    progress: 64,
    reality:
      'Real, measurable gains: sewage-treatment capacity multiplied many times over the pre-2014 baseline, and ~323 of 502 sanctioned projects were complete by mid-2025. But the original 2021 deadline has been extended repeatedly (now 2026), and pollution persists across long stretches.',
    punchline: 'Genuine progress on the Ganga — just years behind the original promise.',
    sources: [
      { label: 'Namami Gange · Wikipedia', url: 'https://en.wikipedia.org/wiki/Namami_Gange_Programme' },
      { label: 'PIB programme status', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2109078' },
    ],
  },
]
