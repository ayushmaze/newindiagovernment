/**
 * "Good News from Around the World" — verifiable positive global progress.
 *
 * A deliberate counterweight to the accountability coverage: hope and
 * efficacy keep readers engaged better than anger alone. EVERY item is a
 * real, sourced development with a headline number and a primary-source link.
 *
 * Editorial note: where a viral version of a story is exaggerated, we publish
 * the ACCURATE version. (E.g. the "Japan grew a fully functional kidney in a
 * living host" and "Ghana $1 90-second cancer test" posts circulating on
 * social media overstate the real science — so the entries below describe
 * what actually happened, with sources.)
 *
 * No external image URLs are stored here — the site CSP restricts images to
 * self/data/blob. Each card uses a gradient + emoji emblem instead.
 */

export type GoodNewsItem = {
  id: string
  topic: string
  headline: string
  blurb: string
  stat: { value: string; label: string }
  emblem: string
  gradient: string
  source: { label: string; url: string }
}

export const GOOD_NEWS: GoodNewsItem[] = [
  {
    id: 'ozone-recovery',
    topic: 'Environment',
    headline: 'The ozone layer is healing — on schedule',
    blurb:
      'The Montreal Protocol phased out over 99% of ozone-depleting chemicals. Scientists now expect the ozone layer to return to 1980 levels by mid-century — proof that coordinated global action works.',
    stat: { value: '99%', label: 'of ozone-depleting substances phased out' },
    emblem: '🌍',
    gradient: 'from-sky-500 to-indigo-600',
    source: {
      label: 'WMO: ozone-layer recovery on track',
      url: 'https://wmo.int/news/media-centre/wmo-bulletin-shows-successful-recovery-of-ozone-layer-driven-science',
    },
  },
  {
    id: 'malaria-vaccine',
    topic: 'Health',
    headline: 'Malaria vaccines are saving children across Africa',
    blurb:
      'Life-saving malaria vaccines (RTS,S and R21) reached children in 17+ African countries in 2024. In Ghana, Kenya and Malawi, an estimated 1 in 8 eligible child deaths were averted.',
    stat: { value: '1 in 8', label: 'eligible child deaths averted (Ghana/Kenya/Malawi)' },
    emblem: '💉',
    gradient: 'from-rose-500 to-red-600',
    source: {
      label: 'WHO: malaria vaccines reach 17 countries in 2024',
      url: 'https://www.who.int/news-room/feature-stories/detail/life-saving-malaria-vaccines-reach-children-in-17-endemic-countries-in-2024',
    },
  },
  {
    id: 'child-mortality',
    topic: 'Health',
    headline: 'A child today is far more likely to survive to five',
    blurb:
      'The global under-five mortality rate has fallen 60% since 1990 — from 93.5 to 37.4 deaths per 1,000 births. In 1990, 1 in 11 children died before age five; today it is 1 in 27.',
    stat: { value: '−60%', label: 'global under-five mortality since 1990' },
    emblem: '🍼',
    gradient: 'from-emerald-500 to-teal-600',
    source: {
      label: 'UNICEF / UN IGME: levels & trends in child mortality',
      url: 'https://data.unicef.org/resources/levels-and-trends-in-child-mortality-2024/',
    },
  },
  {
    id: 'extreme-poverty',
    topic: 'Development',
    headline: 'Extreme poverty is a fraction of what it was',
    blurb:
      'The number of people in extreme poverty fell from about 2.3 billion in 1990 to roughly 831 million in 2025 — driven largely by growth across Asia. In 2025, 80% of countries are projected to see poverty fall.',
    stat: { value: '2.3bn → 831m', label: 'people in extreme poverty, 1990 → 2025' },
    emblem: '📉',
    gradient: 'from-amber-500 to-orange-600',
    source: {
      label: 'World Bank: global poverty update',
      url: 'https://blogs.worldbank.org/en/opendata/september-2025-global-poverty-update-from-the-world-bank--new-da',
    },
  },
  {
    id: 'renewables-record',
    topic: 'Energy',
    headline: 'Clean energy just had its biggest year ever',
    blurb:
      'The world added a record 585 GW of renewable capacity in 2024 — solar alone contributing 452 GW. Renewables now make up 46% of global installed power capacity, and India added 24.5 GW.',
    stat: { value: '585 GW', label: 'renewable capacity added in 2024 (record)' },
    emblem: '☀️',
    gradient: 'from-lime-500 to-green-600',
    source: {
      label: 'IRENA: record-breaking renewable growth',
      url: 'https://www.irena.org/News/pressreleases/2025/Mar/Record-Breaking-Annual-Growth-in-Renewable-Power-Capacity',
    },
  },
  {
    id: 'lab-grown-kidney',
    topic: 'Science',
    headline: 'Lab-grown kidney tissue is edging closer to reality',
    blurb:
      'The viral claim of a "fully functional kidney grown in a living host" overstates it — but the real 2025 science is genuinely exciting: Japanese teams grew kidney "assembloids" that matured after transplant into living mice, and grew working ureter tissue from stem cells.',
    stat: { value: '2025', label: 'kidney assembloids matured in living mice' },
    emblem: '🔬',
    gradient: 'from-fuchsia-500 to-purple-600',
    source: {
      label: 'News-Medical: synthetic kidney assembloids',
      url: 'https://www.news-medical.net/news/20250917/Breakthrough-in-building-functional-synthetic-kidneys-using-assembloids.aspx',
    },
  },
  {
    id: 'saliva-cancer-test',
    topic: 'Health',
    headline: 'A cheap saliva test can screen for cancer in seconds',
    blurb:
      'The "$1, 90-second, Ghanaian" version online is misattributed — but the underlying breakthrough is real: a handheld biosensor from the University of Florida and a Taiwan university detects breast cancer from a drop of saliva in about five seconds, with the device costing only a few dollars.',
    stat: { value: '~5 sec', label: 'saliva breast-cancer screen (UF / Taiwan)' },
    emblem: '🧪',
    gradient: 'from-cyan-500 to-blue-600',
    source: {
      label: 'Futurity: breast-cancer saliva test',
      url: 'https://www.futurity.org/breast-cancer-test-saliva-3181602/',
    },
  },
  {
    id: 'lenacapavir-hiv',
    topic: 'Health',
    headline: 'A twice-a-year shot that prevents HIV',
    blurb:
      'Science named lenacapavir its 2024 Breakthrough of the Year. In the PURPOSE 1 trial it was 100% effective — zero infections among 2,138 participants — and it needs just two injections a year. The FDA approved it for prevention in 2025.',
    stat: { value: '100%', label: 'effective in the PURPOSE 1 prevention trial' },
    emblem: '🛡️',
    gradient: 'from-red-500 to-rose-600',
    source: {
      label: 'WHO: FDA approval of injectable lenacapavir',
      url: 'https://www.who.int/news/item/19-06-2025-fda-approval-of-injectable-lenacapavir-marks-progress-for-hiv-prevention',
    },
  },
  {
    id: 'crispr-sickle-cell',
    topic: 'Science',
    headline: 'The first CRISPR gene therapy is curing sickle cell',
    blurb:
      'Casgevy — the world’s first approved CRISPR/Cas9 therapy — was cleared by the FDA in December 2023 for sickle cell disease. It’s a one-time treatment that edits a patient’s own blood stem cells; around 16,000 people may be eligible.',
    stat: { value: '1st ever', label: 'approved CRISPR gene-editing therapy' },
    emblem: '🧬',
    gradient: 'from-violet-500 to-indigo-600',
    source: {
      label: 'FDA: first gene therapies for sickle cell',
      url: 'https://www.fda.gov/news-events/press-announcements/fda-approves-first-gene-therapies-treat-patients-sickle-cell-disease',
    },
  },
  {
    id: 'guinea-worm',
    topic: 'Health',
    headline: 'Guinea worm is on the brink of being wiped out',
    blurb:
      'When the eradication campaign began in 1986 there were ~3.5 million cases a year. In 2024 there were just 14 human cases worldwide — a drop of more than 99.99%. It’s set to be the second human disease ever eradicated, after smallpox.',
    stat: { value: '3.5M → 14', label: 'annual guinea-worm cases, 1986 → 2024' },
    emblem: '🪱',
    gradient: 'from-teal-500 to-cyan-600',
    source: {
      label: 'The Carter Center: 14 cases in 2024',
      url: 'https://www.cartercenter.org/news/2024-guinea-worm-worldwide-cases-announcement/',
    },
  },
  {
    id: 'india-tigers',
    topic: 'India · Wildlife',
    headline: 'India’s tigers are roaring back',
    blurb:
      'India’s tiger population rose to 3,682 in 2022, up from 2,967 in 2018 — a near-24% jump in four years. India is now home to about 75% of the world’s wild tigers, a global conservation success story.',
    stat: { value: '3,682', label: 'wild tigers in India (2022), +24% since 2018' },
    emblem: '🐅',
    gradient: 'from-orange-500 to-amber-600',
    source: {
      label: 'Business Standard: India tiger census',
      url: 'https://www.business-standard.com/india-news/india-has-3682-tigers-home-to-75-of-global-numbers-tiger-census-data-123072900501_1.html',
    },
  },
  {
    id: 'alzheimers-drugs',
    topic: 'Health',
    headline: 'The first drugs that slow Alzheimer’s have arrived',
    blurb:
      'Lecanemab (2023) and donanemab (FDA-approved July 2024) are the first treatments shown to meaningfully slow cognitive decline in early Alzheimer’s. The effect is modest — patients still decline, just more slowly — but it’s the first real disease-modifying step.',
    stat: { value: 'First', label: 'therapies shown to slow Alzheimer’s decline' },
    emblem: '🧠',
    gradient: 'from-purple-500 to-fuchsia-600',
    source: {
      label: 'Stanford Health Care: lecanemab & donanemab',
      url: 'https://stanfordhealthcare.org/campaigns/lecanemab.html',
    },
  },
  {
    id: 'fusion-ignition',
    topic: 'Science',
    headline: 'Fusion energy keeps hitting net-positive results',
    blurb:
      'After the historic December 2022 milestone, the US National Ignition Facility has repeated it — a February 2024 shot produced 5.2 MJ of fusion energy from 2.2 MJ delivered to the fuel. Repeatable net energy gain is a real step toward clean fusion power.',
    stat: { value: '5.2 / 2.2 MJ', label: 'fusion energy out vs laser energy to target (Feb 2024)' },
    emblem: '⚛️',
    gradient: 'from-yellow-500 to-amber-600',
    source: {
      label: 'LLNL NIF: fusion ignition & the path forward',
      url: 'https://lasers.llnl.gov/news/fusion-ignition-and-the-path-to-inertial-fusion-energy',
    },
  },
  {
    id: 'maternal-mortality',
    topic: 'Health',
    headline: 'Far fewer mothers die in childbirth than in 2000',
    blurb:
      'Global maternal deaths fell about 40% between 2000 and 2023 — from 443,000 a year to 260,000. For the first time, no country is classed as having an extremely high maternal-mortality ratio. Southern Asia cut its rate by 71%.',
    stat: { value: '−40%', label: 'maternal deaths worldwide, 2000 → 2023' },
    emblem: '🤱',
    gradient: 'from-pink-500 to-rose-600',
    source: {
      label: 'UNFPA/WHO: trends in maternal mortality',
      url: 'https://www.unfpa.org/publications/trends-maternal-mortality-2000-2023',
    },
  },
  {
    id: 'polio-near-zero',
    topic: 'Health',
    headline: 'Wild polio survives in just two countries',
    blurb:
      'Since 1988, wild polio has been cut by over 99% — from 350,000 cases a year across 125 countries to a handful, now found only in Afghanistan and Pakistan. Africa was certified free of wild polio in 2020. Eradication has prevented over 20 million cases of paralysis.',
    stat: { value: '−99%+', label: 'wild polio cases since 1988' },
    emblem: '🩹',
    gradient: 'from-blue-500 to-sky-600',
    source: {
      label: 'WHO Africa: wild poliovirus eradicated in the region',
      url: 'https://www.afro.who.int/news/africa-eradicates-wild-poliovirus',
    },
  },
]
