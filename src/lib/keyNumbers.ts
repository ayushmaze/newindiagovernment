/**
 * "Numbers That Matter" — the most striking, shareable sourced stats.
 *
 * Each number is drawn from the same verified data as the Jumla Meter and the
 * articles. `countTo` drives the animated count-up; `display` is the final
 * string shown (so we can render "₹0", "~70L", "157/180" etc.). `shareText`
 * is the pre-written caption for one-tap sharing.
 */

export type KeyNumber = {
  id: string
  /** Numeric target for the count-up animation */
  countTo: number
  prefix?: string
  suffix?: string
  /** If set, overrides the formatted number entirely (for non-numeric displays) */
  displayOverride?: string
  decimals?: number
  label: string
  sub: string
  accent: 'red' | 'gold' | 'ink'
  source: { label: string; url: string }
  shareText: string
}

export const KEY_NUMBERS: KeyNumber[] = [
  {
    id: 'jobs-lost',
    countTo: 70,
    prefix: '~',
    suffix: 'L',
    label: 'Net jobs lost',
    sub: '2016-17 → 2022-23, even as 2 crore/yr were promised (CMIE)',
    accent: 'red',
    source: { label: 'CMIE via People’s Democracy', url: 'https://peoplesdemocracy.in/2024/0407_pd/where-are-promised-two-crore-jobs-every-year' },
    shareText:
      'India was promised 2 crore new jobs a year. Between 2016-17 and 2022-23 it LOST about 70 lakh jobs (CMIE). #JumlaMeter',
  },
  {
    id: 'fifteen-lakh',
    countTo: 0,
    prefix: '₹',
    label: 'Arrived per account',
    sub: 'of the “₹15 lakh” promise Amit Shah called a jumla',
    accent: 'red',
    source: { label: 'BOOM fact-check', url: 'https://www.boomlive.in/did-modi-promise-to-deposit-rs-15-lakh-in-every-account-a-factcheck' },
    shareText:
      'The "₹15 lakh in every account" promise? ₹0 arrived — and the BJP president himself called it a jumla. #JumlaMeter',
  },
  {
    id: 'rupee',
    countTo: 90,
    prefix: '₹',
    label: 'Rupee per dollar',
    sub: 'record low in Dec 2025, vs ~₹61 in 2014',
    accent: 'red',
    source: { label: 'Bloomberg', url: 'https://www.bloomberg.com/news/articles/2025-12-01/indian-rupee-slides-to-record-low-as-central-bank-steps-away' },
    shareText:
      'The rupee crossed 90 to the dollar (Dec 2025) — from about 61 in 2014. A ~47% slide. #NewIndiaGovernment',
  },
  {
    id: 'press-freedom',
    countTo: 157,
    suffix: '/180',
    label: 'Press freedom rank',
    sub: 'India in RSF’s 2026 World Press Freedom Index',
    accent: 'red',
    source: { label: 'RSF 2026 Index', url: 'https://rsf.org/en/2026-rsf-index-press-freedom-25-year-low' },
    shareText:
      'India ranks 157 of 180 on RSF’s 2026 World Press Freedom Index. A free press is how citizens find out the truth. #PressFreedom',
  },
  {
    id: 'inequality',
    countTo: 40,
    suffix: '%+',
    label: 'Wealth held by the top 1%',
    sub: 'while the bottom 50% own about 3% (Oxfam)',
    accent: 'gold',
    source: { label: 'Oxfam India', url: 'https://www.oxfam.org/en/india-extreme-inequality-numbers' },
    shareText:
      'India’s richest 1% own 40%+ of the country’s wealth; the bottom half own about 3% (Oxfam). Growth for whom? #Inequality',
  },
  {
    id: 'jumla-scorecard',
    countTo: 9,
    suffix: '/19',
    label: 'Promises broken or jumla',
    sub: 'on our sourced, citable Jumla Meter',
    accent: 'red',
    source: { label: 'The Jumla Meter', url: '/promises' },
    shareText:
      'Of 19 major promises we tracked, 9 are broken or were literally called a jumla. Every one sourced. #JumlaMeter',
  },
  {
    id: 'neet-aspirants-affected',
    countTo: 2.27,
    suffix: ' crore',
    decimals: 2,
    label: 'NEET aspirants hit by the 2026 leak',
    sub: 'exam cancelled and re-conducted after a guess paper matched real questions',
    accent: 'red',
    source: { label: 'Wikipedia: 2026 NEET controversy', url: 'https://en.wikipedia.org/wiki/2026_NEET_controversy' },
    shareText:
      '2.27 crore NEET aspirants had their exam cancelled after a leak — the same racket had compromised the paper the year before too. #NEET2026',
  },
]
