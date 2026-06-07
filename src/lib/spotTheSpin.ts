/**
 * "Spot the Spin" — bite-sized claim-vs-reality flip cards.
 *
 * Each card shows a common talking point ("the spin"); flipping/tapping reveals
 * what the record actually shows ("the truth"), with a source. Lighter and more
 * swipeable than the full quiz — built for quick, shareable scrolling.
 *
 * All sourced; same evidence standards as the rest of the site.
 */

export type SpinCard = {
  id: string
  spin: string
  truth: string
  source: { label: string; url: string }
}

export const SPIN_CARDS: SpinCard[] = [
  {
    id: 'jobs',
    spin: '“2 crore new jobs are created every year.”',
    truth:
      'CMIE data shows total employment FELL by ~70 lakh between 2016-17 and 2022-23 — the opposite of 2 crore new jobs a year.',
    source: { label: 'CMIE / People’s Democracy', url: 'https://peoplesdemocracy.in/2024/0407_pd/where-are-promised-two-crore-jobs-every-year' },
  },
  {
    id: 'fifteen-lakh',
    spin: '“₹15 lakh will reach every Indian’s account.”',
    truth:
      'No money was ever credited. BJP president Amit Shah said on record it was “a jumla” — a campaign turn of phrase.',
    source: { label: 'BOOM', url: 'https://www.boomlive.in/did-modi-promise-to-deposit-rs-15-lakh-in-every-account-a-factcheck' },
  },
  {
    id: 'fivetrillion',
    spin: '“India is a $5 trillion economy.”',
    truth:
      'GDP was about $3.76 trillion in 2024-25 (IMF) — short of the 2024-25 target, which was quietly moved to 2027-28.',
    source: { label: 'ThePrint', url: 'https://theprint.in/economy/sitharaman-says-indian-economy-will-hit-5-trillion-by-2027-28-3-yrs-after-modis-2025-target/1919287/' },
  },
  {
    id: 'demonetisation',
    spin: '“Demonetisation destroyed black money.”',
    truth:
      'The RBI found ~99.3% of the banned notes came back into the banking system — almost nothing was left unreturned.',
    source: { label: 'RBI / Wikipedia', url: 'https://en.wikipedia.org/wiki/2016_Indian_banknote_demonetisation' },
  },
  {
    id: 'manufacturing',
    spin: '“Make in India took manufacturing to 25% of GDP.”',
    truth:
      'Manufacturing’s share FELL to roughly 14% by 2025 — a near-20-year low, far from the 25% goal.',
    source: { label: 'Down To Earth', url: 'https://www.downtoearth.org.in/governance/but-did-we-really-make-in-india' },
  },
  {
    id: 'odf',
    spin: '“India became 100% open-defecation-free in 2019.”',
    truth:
      'Toilet-building was real and large — but NSO, NFHS-5 and a CAG report found big gaps in many “ODF” states.',
    source: { label: 'ORF', url: 'https://www.orfonline.org/expert-speak/odf-status-claims-vs-reality-swachh-bharat-mission' },
  },
  {
    id: 'upi',
    spin: '“India leads the world in real-time digital payments.”',
    truth:
      'This one is TRUE — UPI handles close to half of all real-time payment transactions on earth (IMF). Credit where due.',
    source: { label: 'PIB', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2257087&reg=3&lang=2' },
  },
  {
    id: 'bullettrain',
    spin: '“The bullet train is running.”',
    truth:
      'Promised by ~2023, it’s now targeted around 2028, with costs up ~83% — a short Surat–Bilimora stretch first.',
    source: { label: 'Metro Rail Today', url: 'https://metrorailtoday.com/news/delay-in-indias-first-bullet-train-mumbai-ahmedabad-hsr-line-may-double-the-project-cost' },
  },
]
