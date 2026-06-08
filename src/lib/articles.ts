/**
 * Static, sourced explainer articles.
 *
 * These are NOT fabricated original investigations. Each one is a plain-English
 * explainer built on recent, verifiable public data (PLFS/NSO, RBI, Supreme
 * Court, CAG, ADR, Global Hunger Index, RSF, etc.), with every key figure
 * traceable to a cited source. They fill the home "Latest" grid and render at
 * /article/<slug> until the editorial team publishes CMS articles, at which
 * point the database takes precedence.
 *
 * Editorial guardrails (binding):
 *  - Every factual sentence traces to a listed source. No invented quotes,
 *    no invented numbers.
 *  - Constructive, non-partisan framing: what was promised / claimed, what
 *    the data shows, what could improve. Critique policy and outcomes, not
 *    identities or communities.
 *  - Where the government disputes a figure, the dispute is noted.
 */

export type ArticleSource = { label: string; url: string }

export type ArticleSection = {
  heading?: string
  paragraphs: string[]
}

export type StaticArticle = {
  slug: string
  title: string
  kicker: string
  excerpt: string
  category:
    | 'Economy'
    | 'Jobs'
    | 'Governance'
    | 'Welfare'
    | 'Health'
    | 'Democracy'
    | 'Education'
    | 'Environment'
  publishedAt: string // ISO
  readMins: number
  /** Headline stat shown in the article header strip */
  keyStat?: { value: string; label: string }
  dek: string
  body: ArticleSection[]
  sources: ArticleSource[]
  tags: string[]
}

export const ARTICLES: StaticArticle[] = [
  {
    slug: 'plfs-2025-youth-unemployment',
    title: 'The jobs number that doesn’t reach young women',
    kicker: 'JOBS · DATA',
    category: 'Jobs',
    publishedAt: '2026-02-18',
    readMins: 5,
    keyStat: { value: '23.7%', label: 'urban young-women unemployment (PLFS 2025)' },
    excerpt:
      'The headline unemployment rate eased in 2025 — but the official PLFS data shows urban young women are still locked out at nearly 24%.',
    dek: 'The headline rate fell. Look one layer down and the picture for young, urban women is far harder.',
    body: [
      {
        paragraphs: [
          'India’s overall unemployment rate eased through 2025, and the government’s own Periodic Labour Force Survey (PLFS) recorded youth (15–29) unemployment declining to about 9.9%, down from 10.3% a year earlier. On the headline, that is genuine improvement and worth acknowledging.',
          'But an average hides who is being left behind. The same PLFS data shows urban youth unemployment at roughly 13.6% — and for urban young women specifically, about 23.7%, nearly nine percentage points higher than young urban men.',
        ],
      },
      {
        heading: 'Why the average misleads',
        paragraphs: [
          'When almost one in four young women in cities who are looking for work cannot find it, an improving national average can coexist with a deepening crisis for a specific group. Economists have long warned that India’s female labour-force participation is among the lowest of major economies, so even small headline gains can mask large structural gaps.',
          'In 2025 the National Statistical Office also changed how PLFS is compiled — moving to a calendar-year reporting cycle and adding monthly bulletins. More frequent data is a good thing for accountability; it also means claims should be checked against the latest release, not last year’s.',
        ],
      },
      {
        heading: 'What would actually help',
        paragraphs: [
          'The constructive question isn’t whether the number went up or down by a few tenths — it’s whether policy is targeting the people the average hides: urban young women, first-time job-seekers, and graduates whose skills don’t match high-growth sectors. Skilling aligned to real hiring, safe transport and workplaces, and childcare support are the levers economists most often cite.',
        ],
      },
    ],
    sources: [
      { label: 'PIB: PLFS Annual Report 2025', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2246009&reg=3&lang=1' },
      { label: 'India Employer Forum: PLFS April 2025 analysis', url: 'https://indiaemployerforum.org/world-of-work/periodic-labour-force-survey-april-2025-part-1/' },
      { label: 'MoSPI: PLFS changes 2025', url: 'https://www.mospi.gov.in/sites/default/files/publication_reports/PLFS_Changes-in-2025_rev.pdf' },
    ],
    tags: ['jobs', 'plfs', 'women', 'youth'],
  },
  {
    slug: 'electoral-bonds-what-the-court-found',
    title: 'Electoral bonds: what the Supreme Court actually found',
    kicker: 'DEMOCRACY · LAW',
    category: 'Democracy',
    publishedAt: '2026-01-20',
    readMins: 6,
    keyStat: { value: '₹16,518 cr', label: 'anonymous bonds sold up to Nov 2023 (ADR)' },
    excerpt:
      'A five-judge bench struck down the electoral bond scheme as unconstitutional, and ordered the donor data published. Here’s the plain-English version.',
    dek: 'Anonymous political funding was ruled unconstitutional. The judgment, and the data it forced into the open, in plain English.',
    body: [
      {
        paragraphs: [
          'On 15 February 2024, a five-judge Constitution Bench of the Supreme Court struck down the 2018 Electoral Bond Scheme as unconstitutional, holding that anonymous, unlimited corporate and individual donations to political parties violated voters’ right to information under Article 19(1)(a).',
          'The Court directed the State Bank of India — the scheme’s sole issuer — to stop issuing bonds and to disclose the identities of buyers and the parties that redeemed them.',
        ],
      },
      {
        heading: 'What the disclosed data showed',
        paragraphs: [
          'According to the Association for Democratic Reforms (ADR), individuals and companies had bought bonds worth about ₹16,518 crore up to November 2023. Analyses of the data found that a large majority of bond money over the scheme’s life went to the governing party, with opposition parties receiving substantially smaller shares.',
          'The significance isn’t which party benefited most — it’s that, for the first time, citizens could see the flows at all. The scheme had been designed so they could not.',
        ],
      },
      {
        heading: 'Why it matters beyond one election',
        paragraphs: [
          'Transparent political funding is a structural safeguard: it lets voters judge whether policy follows money. The verdict re-established that principle. The open question now is what replaces electoral bonds — and whether any successor keeps donor transparency intact rather than restoring anonymity by another name.',
        ],
      },
    ],
    sources: [
      { label: 'Al Jazeera: SC scraps electoral bonds', url: 'https://www.aljazeera.com/news/2024/2/15/indias-supreme-court-scraps-electoral-bonds-calls-it-unconstitutional' },
      { label: 'Global Voices: landmark verdict explained', url: 'https://globalvoices.org/2024/04/16/democratizing-elections-the-supreme-court-of-indias-landmark-verdict-on-electoral-bonds/' },
      { label: 'Stimson Center: India’s electoral bond conundrum', url: 'https://www.stimson.org/2024/indias-electoral-bond-conundrum/' },
    ],
    tags: ['democracy', 'electoral-bonds', 'supreme-court', 'transparency'],
  },
  {
    slug: 'gdp-revision-and-the-imf-downgrade',
    title: 'India’s GDP was revised. The IMF also downgraded our data.',
    kicker: 'ECONOMY · DATA',
    category: 'Economy',
    publishedAt: '2026-05-27',
    readMins: 6,
    keyStat: { value: 'C grade', label: 'IMF data-quality rating, Nov 2025' },
    excerpt:
      'A base-year change revised India’s growth figures — and arrived alongside an IMF downgrade of India’s national-accounts data to a "C" grade.',
    dek: 'Two things happened together: the growth numbers were revised, and the credibility of the numbers themselves was questioned.',
    body: [
      {
        paragraphs: [
          'In 2025-26 the Ministry of Statistics revised India’s GDP base year from 2011-12 to 2022-23. Under the new base, headline annual growth figures were re-stated — for example FY2023-24 was revised from 9.2% to 7.2%, and FY2024-25 from 6.5% to 7.1%.',
          'Periodic base-year revisions are normal and, done well, make data more accurate by reflecting a changing economy. That part is routine and reasonable.',
        ],
      },
      {
        heading: 'The part that drew concern',
        paragraphs: [
          'What gave the revision a sharper edge: it followed a November 2025 IMF assessment that downgraded India’s national-accounts statistics to a "C" grade — the second-lowest band. Commentators noted a growing perception that India’s statistical apparatus is less reliable than it once was, citing delayed or revised "uncomfortable" data points.',
          'Independent economists also pointed out that household spending and private investment had slowed in 2024-25 — which sits awkwardly beside buoyant headline growth.',
        ],
      },
      {
        heading: 'Why a citizen should care',
        paragraphs: [
          'GDP isn’t an abstraction — it’s the number used to justify policy, borrowing and claims of success. If the measure is contested, every claim built on it inherits that doubt. The constructive ask is simple and non-partisan: release the underlying data on time, document the methodology, and let independent statisticians check the work.',
        ],
      },
    ],
    sources: [
      { label: 'Policy Circle: GDP revision explained', url: 'https://www.policycircle.org/opinion/gdp-revision-indian-economy/' },
      { label: 'Newslaundry: GDP revisions explained', url: 'https://www.newslaundry.com/2026/05/26/indias-gdp-revisions-explained-what-changed-and-why-it-matters' },
      { label: 'PIB: revised GDP estimates', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2233792&reg=3&lang=1' },
    ],
    tags: ['economy', 'gdp', 'imf', 'statistics'],
  },
  {
    slug: 'mgnrega-the-shrinking-safety-net',
    title: 'MGNREGA: rising demand, a budget that isn’t keeping up',
    kicker: 'WELFARE · DATA',
    category: 'Welfare',
    publishedAt: '2026-01-05',
    readMins: 5,
    keyStat: { value: '₹271/day', label: 'average MGNREGA wage, 2025-26' },
    excerpt:
      'The rural job guarantee is meant to be a floor under the poorest. Pending dues, flat budgets and a falling GDP share are testing it.',
    dek: 'A guarantee is only as good as the wage that arrives, and when. The data on both is sobering.',
    body: [
      {
        paragraphs: [
          'MGNREGA guarantees up to 100 days of paid work a year to any rural household that wants it — a legal floor under the poorest. In practice, the scheme’s ability to deliver depends on two things: enough budget, and wages that arrive on time.',
          'On both, recent data is strained. The average wage paid in 2025-26 worked out to about ₹271 per day — below the notified rate in nearly every state. And MGNREGA’s share of GDP has shrunk from around 0.41% in 2021-22 to roughly 0.2% by 2024-25, even as demand for work persisted.',
        ],
      },
      {
        heading: 'Work demanded but not given',
        paragraphs: [
          'Reporting on the latest figures found nearly one crore workers who asked for work under the scheme could not get it in 2025-26, and large sums in wages and material costs remained pending to states. Delayed payments push labourers to migrate in search of better-paid, more reliable work — defeating the scheme’s purpose.',
          'A parliamentary panel in 2025 recommended timely wages, inflation-indexing, and making the Aadhaar-based payment system optional after exclusions left many workers waiting.',
        ],
      },
      {
        heading: 'The fix is mostly arithmetic',
        paragraphs: [
          'Unlike many problems, this one has a concrete remedy: fund the guarantee to match demand, index wages to inflation, and clear dues on schedule. None of that is partisan — it’s the difference between a guarantee on paper and one that feeds a family.',
        ],
      },
    ],
    sources: [
      { label: 'The Quint: MGNREGA budget & pending dues', url: 'https://www.thequint.com/jobs/mgnrega-new-name-vb-gram-g-bill-2025-budget-employment-generated-wages-pending-dues-data-story' },
      { label: 'IndiaSpend: unpaid wages, fund delays', url: 'https://www.indiaspend.com/data-viz/dataviz-unpaid-wages-fund-delays-persist-under-mgnregs-945157' },
      { label: 'Newslaundry: low wages, payment delays', url: 'https://www.newslaundry.com/2025/02/03/low-wages-payment-delays-merely-increasing-mgnregs-work-days-is-not-enough' },
    ],
    tags: ['welfare', 'mgnrega', 'rural', 'wages'],
  },
  {
    slug: 'global-hunger-index-2025-india',
    title: 'India at 102: the hunger ranking the government rejects',
    kicker: 'HEALTH · DATA',
    category: 'Health',
    publishedAt: '2025-11-15',
    readMins: 5,
    keyStat: { value: '1 in 3', label: 'Indian children stunted (NFHS-derived)' },
    excerpt:
      'The 2025 Global Hunger Index puts India 102nd of 123 countries. The government calls the index flawed. The child-nutrition data is harder to wave away.',
    dek: 'You can argue about a composite index. The underlying child-nutrition numbers are the part that should worry everyone.',
    body: [
      {
        paragraphs: [
          'In the 2025 Global Hunger Index (GHI), India ranked 102nd out of 123 countries with a score of 25.8 — a level the index classifies as "serious".',
          'The Government of India has rejected the GHI in past years as a flawed measure, pointing to programmes like POSHAN Abhiyaan, PM-POSHAN mid-day meals, and free foodgrain under PM Garib Kalyan Anna Yojana, and to its own Poshan Tracker covering crores of beneficiaries. Those are real programmes, and that critique deserves a fair hearing.',
        ],
      },
      {
        heading: 'The numbers underneath the ranking',
        paragraphs: [
          'But the index is built partly on India’s own survey data. Child stunting is estimated around 32.9% and child wasting around 18.7% (drawing on the National Family Health Survey). Put plainly: roughly one in three Indian children is stunted, and child-wasting rates are among the highest in the world.',
          'Whatever one thinks of a composite score, those child-nutrition figures come from domestic surveys, not a foreign ranking — and they describe a generation’s health.',
        ],
      },
      {
        heading: 'Where the argument should go next',
        paragraphs: [
          'The most useful response to a disputed ranking isn’t to reject it — it’s to publish current, granular nutrition data and let the trend speak. If the programmes are working, the numbers will show it. That transparency is the common ground between the government’s position and its critics.',
        ],
      },
    ],
    sources: [
      { label: 'Global Hunger Index: India', url: 'https://www.globalhungerindex.org/india.html' },
      { label: 'Outlook: India’s nutrition crisis & the GHI debate', url: 'https://www.outlookindia.com/national/hunger-malnutrition-and-the-ghi-debate-why-indias-nutrition-crisis-cannot-be-wished-away' },
      { label: 'StudyIQ: GHI 2025 summary', url: 'https://www.studyiq.com/articles/global-hunger-index-2025/' },
    ],
    tags: ['health', 'hunger', 'children', 'nutrition'],
  },
  {
    slug: 'press-freedom-index-india-2026',
    title: 'India’s press-freedom ranking keeps falling. Why it matters to you.',
    kicker: 'DEMOCRACY · MEDIA',
    category: 'Democracy',
    publishedAt: '2026-05-03',
    readMins: 5,
    keyStat: { value: '157 / 180', label: 'India, RSF World Press Freedom Index 2026' },
    excerpt:
      'Reporters Without Borders ranks India 157th of 180 in 2026, down from 151st. A free press is how citizens find out what governments would rather hide.',
    dek: 'A low ranking isn’t about journalists’ comfort. It’s about whether you get to know what power is doing.',
    body: [
      {
        paragraphs: [
          'In Reporters Without Borders’ (RSF) 2026 World Press Freedom Index, India ranked 157th out of 180 countries — down from 151st in 2025. RSF describes press freedom in "the world’s largest democracy" as in crisis.',
          'RSF cites a rise in violence and legal harassment against journalists, highly concentrated media ownership, and outlets with overt political alignment.',
        ],
      },
      {
        heading: 'The advertising lever',
        paragraphs: [
          'One structural problem RSF highlights: because Indian media are largely funded by advertising — and government is a major advertiser — central and state governments are in a position to pressure outlets over coverage. When the funder is also the subject of scrutiny, independence is hard to sustain.',
        ],
      },
      {
        heading: 'Why a non-journalist should care',
        paragraphs: [
          'Every fact on a site like this one depends on someone being free to report it. Press freedom is the upstream condition for accountability of any kind — fact-checks, this article, the Jumla Meter. Defending it isn’t a media-industry concern; it’s the citizen’s own right to know, protected one step removed.',
        ],
      },
    ],
    sources: [
      { label: 'The Wire: India 157th on RSF 2026 index', url: 'https://m.thewire.in/article/media/india-is-157th-out-of-180-countries-on-rsfs-2026-world-press-freedom-index' },
      { label: 'RSF: India country page', url: 'https://rsf.org/en/country/india' },
      { label: 'RSF: 2026 Index — 25-year low', url: 'https://rsf.org/en/2026-rsf-index-press-freedom-25-year-low' },
    ],
    tags: ['democracy', 'press-freedom', 'media', 'rsf'],
  },
  {
    slug: 'rti-dilution-dpdp-act',
    title: 'How a privacy law quietly weakened your Right to Information',
    kicker: 'GOVERNANCE · LAW',
    category: 'Democracy',
    publishedAt: '2026-03-10',
    readMins: 5,
    keyStat: { value: 'Section 8(1)(j)', label: 'the RTI clause the DPDP Act rewrote' },
    excerpt:
      'The Digital Personal Data Protection Act amended the RTI Act — removing the public-interest test that let citizens access officials’ records.',
    dek: 'A data-protection law sounds protective. One clause inside it may turn the Right to Information into a right to be refused.',
    body: [
      {
        paragraphs: [
          'The Right to Information (RTI) Act is the tool citizens use to prise records out of government. Its Section 8(1)(j) let authorities withhold "personal information" — but with a crucial override: it had to be disclosed if a larger public interest justified it.',
          'The Digital Personal Data Protection (DPDP) Act, 2023 amended that clause and removed the public-interest proviso. Critics say this creates a near-blanket exemption: an official can decline a request simply by labelling the record "personal data".',
        ],
      },
      {
        heading: 'Why transparency advocates are alarmed',
        paragraphs: [
          'RTI activist Anjali Bhardwaj warned the change "undermines transparency, weakens the public’s ability to hold authorities accountable, and restricts access to critical government records". Former Delhi High Court Chief Justice A. P. Shah called the amendments "manifestly ill-thought-out" and "ripe for constitutional challenge".',
          'The information most often sought through RTI — officials’ assets, beneficiary lists, file notings — frequently involves named individuals. Remove the public-interest test and much of it becomes deniable.',
        ],
      },
      {
        heading: 'Where it stands',
        paragraphs: [
          'The Supreme Court has referred petitions challenging the amendment to a five-judge Constitution Bench, to balance the genuine right to privacy against the equally genuine right to know. The constructive outcome would restore a clear public-interest override — privacy and transparency are not actually in conflict when the test is "does the public need to know this".',
        ],
      },
    ],
    sources: [
      { label: 'Down To Earth: how the Data Act dilutes RTI', url: 'https://www.downtoearth.org.in/governance/how-the-strict-data-act-is-diluting-rti-91640' },
      { label: 'IDR: new data rules put the state above citizens', url: 'https://idronline.org/article/rights/indias-new-data-rules-put-the-state-above-citizens/' },
      { label: 'ForumIAS: RTI amendment via DPDP Act explained', url: 'https://forumias.com/blog/rti-amendment-via-dpdp-act-2023-explained-pointwise/' },
    ],
    tags: ['governance', 'rti', 'transparency', 'dpdp'],
  },
  {
    slug: 'adani-hindenburg-where-it-stands',
    title: 'Adani–Hindenburg: what the Supreme Court and SEBI actually concluded',
    kicker: 'ECONOMY · MARKETS',
    category: 'Economy',
    publishedAt: '2026-02-02',
    readMins: 6,
    keyStat: { value: '24 probes', label: 'SEBI investigations; 22 concluded' },
    excerpt:
      'A short-seller’s report wiped out billions in market value and triggered a regulator probe and a Supreme Court case. Here’s the verified state of play.',
    dek: 'Stripped of the noise: what was alleged, what the regulator investigated, and what the courts have so far held.',
    body: [
      {
        paragraphs: [
          'In January 2023 the US short-seller Hindenburg Research published allegations of stock-price manipulation and accounting concerns against the Adani Group. The report preceded a steep fall in group share values.',
          'On 3 January 2024 the Supreme Court declined to transfer the matter away from the market regulator SEBI, upheld SEBI’s investigation as comprehensive — "inspiring confidence" — and directed it to wrap up its remaining probes promptly. A review petition against that order was later dismissed.',
        ],
      },
      {
        heading: 'What SEBI has said',
        paragraphs: [
          'SEBI stated it had undertaken 24 investigations into the matter, of which 22 had concluded — covering alleged related-party-transaction violations, insider trading, price manipulation and foreign-portfolio-investment rules.',
          'In a later twist, SEBI issued a show-cause notice to Hindenburg itself, alleging it shared an advance copy of its report with a hedge-fund manager. That is an allegation about the short-seller’s conduct — separate from the questions about the Adani Group, which remain the subject of regulatory findings.',
        ],
      },
      {
        heading: 'Why it still matters',
        paragraphs: [
          'This is, at its core, a test of whether India’s market regulator can investigate a politically connected conglomerate independently and transparently. The courts have backed SEBI’s process; the open question for citizens is whether the concluded findings are published in full, so markets and voters can judge them on the evidence.',
        ],
      },
    ],
    sources: [
      { label: 'Business Today: why the SC ruling matters', url: 'https://www.businesstoday.in/magazine/the-buzz/story/adani-hindenburg-issue-heres-why-the-recent-supreme-court-ruling-is-so-important-414192-2024-01-19' },
      { label: 'Bloomberg: SC asks SEBI to close probe in 3 months', url: 'https://www.bloomberg.com/news/articles/2024-01-03/top-india-court-asks-sebi-to-close-adani-probe-in-three-months' },
      { label: 'Business Today: the backstory', url: 'https://www.businesstoday.in/markets/stocks/story/hindenburgs-charge-against-sebi-chief-sc-ruling-a-46-page-showcause-notice-then-a-report-the-backstory-441053-2024-08-11' },
    ],
    tags: ['economy', 'adani', 'sebi', 'markets'],
  },
  {
    slug: 'manipur-two-years-of-displacement',
    title: 'Manipur: two years on, tens of thousands still can’t go home',
    kicker: 'GOVERNANCE · HUMAN COST',
    category: 'Governance',
    publishedAt: '2026-02-10',
    readMins: 6,
    keyStat: { value: '~60,000+', label: 'people displaced since May 2023' },
    excerpt:
      'Ethnic violence that began in May 2023 left hundreds dead and tens of thousands in relief camps. A look at the human toll and the road back.',
    dek: 'Behind the headlines and the politics are families who have spent years in relief camps. This is the verified scale of it.',
    body: [
      {
        paragraphs: [
          'Ethnic violence erupted in Manipur on 3 May 2023, between the valley-majority Meitei community and the hill-based Kuki-Zo tribal communities, triggered by a court order on Scheduled Tribe status.',
          'By government figures cited in late 2024, at least 258 people had been killed and around 60,000 displaced; other tallies put deaths above 260 and displacement over 70,000. More than 58,000 people were reported living across 281 relief camps.',
        ],
      },
      {
        heading: 'Governance timeline',
        paragraphs: [
          'President’s Rule was imposed in February 2025, suspending the state government. It was revoked on 4 February 2026 with a new chief minister sworn in. Authorities announced a phased plan to close relief camps and rebuild, with compensation of about ₹3 lakh per household whose home was destroyed.',
          'Rights groups including Amnesty International and Human Rights Watch have pressed for urgent, dignified rehabilitation, noting camp conditions with limited healthcare, sanitation and nutrition, and warning of renewed clashes.',
        ],
      },
      {
        heading: 'The test ahead',
        paragraphs: [
          'Peace is measured not by the absence of headlines but by whether displaced families can safely return, rebuild, and trust the institutions meant to protect them. Transparent rehabilitation — counted, funded and verifiable — is the benchmark every government, state and central, should be held to here.',
        ],
      },
    ],
    sources: [
      { label: 'Amnesty: rehabilitate the displaced', url: 'https://www.amnesty.org/en/latest/news/2025/05/authorities-should-urgently-rehabilitate-thousands-displaced-in-two-years-of-ethnic-violence-in-manipur/' },
      { label: '2023–2025 Manipur violence · Wikipedia', url: 'https://en.wikipedia.org/wiki/2023%E2%80%932025_Manipur_violence' },
      { label: 'Human Rights Watch: clashes restart', url: 'https://www.hrw.org/news/2025/03/27/india-ethnic-clashes-restart-manipur' },
    ],
    tags: ['governance', 'manipur', 'human-rights', 'displacement'],
  },
  {
    slug: 'gst-2-the-biggest-reset-since-2017',
    title: 'GST 2.0: a simpler tax — and a ₹48,000 crore question',
    kicker: 'ECONOMY · TAX',
    category: 'Economy',
    publishedAt: '2026-01-12',
    readMins: 5,
    keyStat: { value: '6 → 3 slabs', label: 'GST structure after Sept 2025 reset' },
    excerpt:
      'In September 2025 India collapsed its tangle of GST slabs into a simpler structure — a genuine fix that also carries a real revenue cost.',
    dek: 'The reform addressed years of valid criticism about complexity. The trade-off is a sizeable hit to revenue.',
    body: [
      {
        paragraphs: [
          'GST’s biggest, fairest criticism since 2017 was complexity — most memorably the popcorn example, where loose salted popcorn (5%), packaged (12%) and caramelised (18%) attracted three different rates.',
          'Effective 22 September 2025, the government reset the structure: from six slabs down to a simpler system built around two main rates of 5% and 18%, with 0% for essentials and a 40% rate for luxury and "sin" goods. Removing the 12% and 28% slabs is a real simplification.',
        ],
      },
      {
        heading: 'The fiscal trade-off',
        paragraphs: [
          'Simplicity has a price. The government estimated a revenue loss of about ₹93,000 crore from the rate cuts, partly offset by roughly ₹45,000 crore from the new 40% slab — a net hit of around ₹48,000 crore. Analysts cautioned this could strain spending on infrastructure if collections don’t pick up.',
          'Credit where due: a long-stalled reform finally happened, after years of Centre–State disagreement. The open question is whether the simpler structure broadens compliance enough to recover the lost revenue.',
        ],
      },
    ],
    sources: [
      { label: 'Goods and Services Tax (India) · Wikipedia', url: 'https://en.wikipedia.org/wiki/Goods_and_Services_Tax_(India)' },
      { label: 'A2Z Taxcorp: GST in 2025, the biggest reset since 2017', url: 'https://a2ztaxcorp.net/gst-in-2025-the-year-indias-indirect-tax-system-got-its-biggest-reset-since-2017/' },
      { label: 'ICRA: GST rationalisation note', url: 'https://www.icra.in/Rating/DownloadResearchSpecialCommentReport?id=6512' },
    ],
    tags: ['economy', 'gst', 'tax', 'reform'],
  },
  {
    slug: 'farm-laws-aftermath-msp-promise',
    title: 'After the farm-law repeal: the MSP promise still unkept',
    kicker: 'GOVERNANCE · AGRICULTURE',
    category: 'Governance',
    publishedAt: '2026-01-28',
    readMins: 5,
    keyStat: { value: '23 crops', label: 'farmers want covered by a legal MSP' },
    excerpt:
      'The three farm laws were repealed in 2021. The central promise that followed — a committee on MSP — has yet to deliver, and farmers are back at Delhi’s borders.',
    dek: 'A repeal ended one fight and began another: the demand for a legal guarantee on minimum support prices.',
    body: [
      {
        paragraphs: [
          'After a year-long agitation, the government repealed its three farm laws in November 2021. Alongside the repeal came assurances — including a committee to examine a legal guarantee for Minimum Support Price (MSP).',
          'In February 2024, farmers from Punjab and Haryana resumed protests at Delhi’s borders, demanding a law guaranteeing MSP for 23 crops (in line with the Swaminathan Commission formula), debt relief, and action on other promises.',
        ],
      },
      {
        heading: 'The committee that hasn’t reported',
        paragraphs: [
          'The MSP committee formed in July 2022 had not submitted a report as the protests reignited, and rounds of talks between farm unions and the government repeatedly ended in deadlock.',
          'There are honest arguments on both sides about a legal MSP — its fiscal cost, its market effects. But a promise to "examine" it, left unresolved for years, is itself a accountability gap: either deliver the mechanism or explain transparently why not.',
        ],
      },
    ],
    sources: [
      { label: '2024 Indian farmers’ protest · Wikipedia', url: "https://en.wikipedia.org/wiki/2024_Indian_farmers'_protest" },
      { label: 'House of Commons Library: farmers’ protests & reforms', url: 'https://commonslibrary.parliament.uk/research-briefings/cbp-9226/' },
      { label: 'Via Campesina: MSP legal guarantee demand', url: 'https://viacampesina.org/en/2024/02/indian-farmers-are-protesting-again-legal-guarantee-on-minimum-support-price-is-the-key-demand/' },
    ],
    tags: ['governance', 'farmers', 'msp', 'agriculture'],
  },
  {
    slug: 'food-inflation-the-kitchen-test',
    title: 'The kitchen test: what food inflation did to your thali',
    kicker: 'ECONOMY · PRICES',
    category: 'Economy',
    publishedAt: '2025-12-20',
    readMins: 4,
    keyStat: { value: '8.39%', label: 'food inflation, Dec 2024 (YoY)' },
    excerpt:
      'Headline inflation can look calm while food prices swing hard. Tomatoes, onions and potatoes told the real story of 2024-25.',
    dek: 'The number that matters at the dinner table isn’t the headline CPI — it’s what vegetables cost this week.',
    body: [
      {
        paragraphs: [
          'India’s monetary policy targets overall inflation around 4%. But the figure households feel most is food inflation — and it has been volatile. In December 2024, food inflation ran at about 8.39% year-on-year (rural 8.65%, urban 7.90%).',
          'The Economic Survey flagged tomato, onion and potato — the "TOP" vegetables — as the leading drivers. When these spike, the cost of an ordinary thali jumps even if the headline number looks tame.',
        ],
      },
      {
        heading: 'The other side of the swing',
        paragraphs: [
          'Volatility cuts both ways: by late 2025, food inflation had swung into deflation in some months (around -3.9% YoY in November 2025) as vegetable prices fell — which hurts farmers even as it helps consumers.',
          'The constructive lesson isn’t to cheer or jeer a single month’s print. It’s to build supply chains, storage and price data good enough that families and farmers aren’t whipsawed by the next tomato cycle.',
        ],
      },
    ],
    sources: [
      { label: 'MoSPI: CPI press release', url: 'https://www.mospi.gov.in/sites/default/files/press_release/CPI_PR_13May25.pdf' },
      { label: 'PIB: CPI November 2025', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2202940&reg=3&lang=1' },
      { label: 'Trading Economics: India food inflation', url: 'https://tradingeconomics.com/india/food-inflation' },
    ],
    tags: ['economy', 'inflation', 'food', 'prices'],
  },
  {
    slug: 'health-spending-the-2-5-percent-mirage',
    title: 'The 2.5% promise: India’s health-spending target keeps slipping',
    kicker: 'HEALTH · BUDGET',
    category: 'Health',
    publishedAt: '2026-02-25',
    readMins: 5,
    keyStat: { value: '1.9%', label: 'public health spend (% GDP) vs 2.5% target' },
    excerpt:
      'The National Health Policy set a goal: 2.5% of GDP on public health by 2025. The combined Centre-plus-State figure is stuck near 1.9%.',
    dek: 'A target set in 2017, due in 2025, still unmet — and the central government’s share has been shrinking, not growing.',
    body: [
      {
        paragraphs: [
          'The National Health Policy of 2017 set a clear, measurable goal: raise public health expenditure to 2.5% of GDP by 2025. It is the kind of promise that is easy to check.',
          'As of 2025-26, combined Centre-plus-State public health spending sits around 1.9% of GDP — well short of the target. Notably, the Union government’s own share fell from about 0.37% of GDP during the pandemic to roughly 0.29% in 2025-26; states have carried more of the load, rising to about 1.1%.',
        ],
      },
      {
        heading: 'Why the gap is felt, not just counted',
        paragraphs: [
          'Under-funded public health pushes families toward expensive private care — a leading cause of households falling into debt. Closing the 0.6-point gap to 2.5% isn’t a rounding error; it is the difference between a clinic that’s staffed and one that isn’t.',
          'The honest scorecard: real money has gone in, and state spending has grown — but the headline national promise remains unmet, largely because the central share dipped. Meeting it is a budgeting choice, not a mystery.',
        ],
      },
    ],
    sources: [
      { label: 'World Bank: current health expenditure (% GDP), India', url: 'https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS?locations=IN' },
      { label: 'PRS: Demand for Grants 2025-26, Health', url: 'https://prsindia.org/files/budget/budget_parliament/2025/DFG_Analysis_2025-26-Health.pdf' },
      { label: 'IMPRI: where India’s health budget stands', url: 'https://www.impriindia.com/insights/indias-health-budget-stand/' },
    ],
    tags: ['health', 'budget', 'public-health', 'nhp'],
  },
  {
    slug: 'neet-2024-paper-leak',
    title: 'NEET 2024: the exam leak the Supreme Court called "undisputed"',
    kicker: 'EDUCATION · EXAMS',
    category: 'Education',
    publishedAt: '2026-03-02',
    readMins: 5,
    keyStat: { value: '24 lakh', label: 'students who sat NEET-UG 2024' },
    excerpt:
      'India’s single medical-entrance exam was hit by a paper leak. The court confirmed it happened — then let the result stand. Both facts matter.',
    dek: 'For 24 lakh aspirants, one exam decides everything. In 2024, that exam was compromised.',
    body: [
      {
        paragraphs: [
          'NEET-UG is the sole gateway to undergraduate medical seats in India; about 2.4 million (24 lakh) students sat it on 5 May 2024. Within hours, allegations spread that the paper had leaked.',
          'Investigations found a real racket: some aspirants paid brokers ₹30–50 lakh for the paper in advance, and arrested candidates confirmed the leaked questions matched the actual exam.',
        ],
      },
      {
        heading: 'What the court found',
        paragraphs: [
          'The Supreme Court called the paper leak an "undisputed fact" and found that 155 students directly benefited. But it ruled the leak was localised (Patna and Hazaribagh), said there was no proof it was systemic, and declined to order a full re-test.',
          'So both things are true: the exam was genuinely compromised, and the court let the overall result stand. For honest students who lost rank to cheats, that is a hard outcome to accept.',
        ],
      },
      {
        heading: 'The fix',
        paragraphs: [
          'A single high-stakes national exam is only as trustworthy as its security. The constructive demands are concrete: leak-proof question logistics, real-time anomaly detection, and an independent body to audit the NTA — so the next 24 lakh students can trust the result.',
        ],
      },
    ],
    sources: [
      { label: '2024 NEET controversy · Wikipedia', url: 'https://en.wikipedia.org/wiki/2024_NEET_controversy' },
      { label: 'Supreme Court Observer: leak an "undisputed fact"', url: 'https://www.scobserver.in/journal/paper-leak-in-neet-ug-2024-is-an-undisputed-fact-says-supreme-court-directs-nta-to-disclose-exam-details-by-10-july/' },
    ],
    tags: ['education', 'neet', 'exams', 'nta'],
  },
  {
    slug: 'internet-shutdowns-india',
    title: 'India switches off the internet more than almost anyone',
    kicker: 'DEMOCRACY · RIGHTS',
    category: 'Democracy',
    publishedAt: '2026-02-14',
    readMins: 4,
    keyStat: { value: '84', label: 'internet shutdowns in India in 2024' },
    excerpt:
      'India ordered 84 internet shutdowns in 2024 — the most of any democracy, second only to military-run Myanmar.',
    dek: 'A blackout is invisible to everyone except the people living through it. India orders them more than almost any country on earth.',
    body: [
      {
        paragraphs: [
          'According to Access Now’s global tracker, India imposed 84 internet shutdowns in 2024 — the highest of any democracy, and second worldwide only to Myanmar’s military junta. Other trackers count differently (SFLC.in logged 60, totalling over 3,100 hours), but every count puts India near the top.',
          'The economic cost alone was estimated at about $322 million in 2024, affecting tens of millions of users.',
        ],
      },
      {
        heading: 'Who loses connectivity, and why',
        paragraphs: [
          'Of the 2024 shutdowns, 41 were tied to protests, 23 to communal violence, and several to government job exams. The most-affected regions were Manipur (21), Haryana (12) and Jammu & Kashmir (12).',
          'Shutdowns are often justified as keeping order — but they also switch off ambulances’ apps, students’ classes, traders’ payments and citizens’ ability to document what’s happening. Courts have held that indefinite blanket shutdowns are unconstitutional.',
        ],
      },
    ],
    sources: [
      { label: 'MediaNama: India 84 shutdowns in 2024', url: 'https://www.medianama.com/2025/02/223-india-records-84-internet-shutdowns-2024-second-highest-world/' },
      { label: 'Inc42: shutdowns cost India $322M', url: 'https://inc42.com/buzz/internet-shutdowns-cost-india-322-mn-in-2024-report/' },
    ],
    tags: ['democracy', 'internet-shutdowns', 'rights', 'access-now'],
  },
  {
    slug: 'agnipath-four-year-soldier',
    title: 'Agnipath: the four-year soldier, and the questions it raised',
    kicker: 'GOVERNANCE · DEFENCE',
    category: 'Governance',
    publishedAt: '2026-01-18',
    readMins: 5,
    keyStat: { value: '25%', label: 'of Agniveers retained beyond four years' },
    excerpt:
      'A 2022 overhaul made most new soldiers four-year contract recruits. It sparked nationwide protests and a debate that hasn’t settled.',
    dek: 'It changed what it means to join the army — from a career to a four-year contract for most recruits.',
    body: [
      {
        paragraphs: [
          'Approved in June 2022, the Agnipath scheme recruits most non-officer soldiers as "Agniveers" on a four-year term, after which only about 25% are retained for a full career.',
          'The announcement triggered widespread protests by aspirants — trains were torched, roads blocked — prompting the government to raise the 2022 age cap from 21 to 23 as a one-off.',
        ],
      },
      {
        heading: 'The open questions',
        paragraphs: [
          'Veterans and analysts raised serious concerns: shorter service may weaken unit cohesion and the "way of life" ethos of the forces; 75% of trained Agniveers leaving after four years raises questions about their livelihoods; and some commentators worried about absorbing large numbers of arms-trained youth back into the economy.',
          'Supporters argue it lowers the pension bill and creates a younger, more agile force. The honest position is that this is a major, contested change — and it deserves transparent data on outcomes (retention, re-employment, readiness) rather than slogans.',
        ],
      },
    ],
    sources: [
      { label: 'Agnipath Scheme · Wikipedia', url: 'https://en.wikipedia.org/wiki/Agnipath_Scheme' },
      { label: 'Outlook: why Agnipath faced the heat', url: 'https://www.outlookindia.com/national/why-is-agnipath-scheme-facing-the-heat-news-203154' },
    ],
    tags: ['governance', 'agnipath', 'defence', 'jobs'],
  },
  {
    slug: 'air-pollution-the-invisible-toll',
    title: 'The air is killing thousands — and the data is disputed',
    kicker: 'ENVIRONMENT · HEALTH',
    category: 'Environment',
    publishedAt: '2025-12-10',
    readMins: 5,
    keyStat: { value: '~33,000', label: 'annual deaths in 10 cities from PM2.5 (Lancet)' },
    excerpt:
      'A 2024 Lancet study links thousands of deaths in India’s cities to air pollution. The government calls the figures inconclusive.',
    dek: 'You can’t see PM2.5, and you can’t un-breathe it. The argument is over how many it kills — not whether it does.',
    body: [
      {
        paragraphs: [
          'A 2024 study in The Lancet Planetary Health found that, on average, 7.2% of daily deaths across 10 of India’s most polluted cities were attributable to PM2.5 above WHO guideline levels — at least ~33,000 deaths a year in those cities alone. Delhi had the highest share.',
          'A larger, earlier Lancet analysis attributed about 1.24 million deaths in India in 2017 to air pollution.',
        ],
      },
      {
        heading: 'The data fight',
        paragraphs: [
          'The central government has at times called such estimates "inconclusive", noting deaths are rarely certified as caused by pollution alone. That’s a fair methodological point — but Delhi’s own statistics show respiratory-disease deaths rising (9,211 in 2024, up from 7,432 in 2022).',
          'Disputing the exact count shouldn’t stall action. Cleaner public transport, curbs on stubble burning and construction dust, and honest real-time AQI reporting are measures that help regardless of which death toll is precisely right.',
        ],
      },
    ],
    sources: [
      { label: 'The Lancet Planetary Health: air pollution & mortality', url: 'https://www.thelancet.com/journals/lanplh/article/PIIS2542-5196(24)00114-1/fulltext' },
      { label: 'Business Standard: the air-death data divide', url: 'https://www.business-standard.com/health/air-pollution-deaths-government-contradiction-moefcc-icmr-delhi-aqi-126020200279_1.html' },
    ],
    tags: ['environment', 'air-pollution', 'health', 'delhi'],
  },
  {
    slug: 'crimes-against-women-ncrb',
    title: 'A crime against a woman is reported every 70 seconds',
    kicker: 'GOVERNANCE · SAFETY',
    category: 'Governance',
    publishedAt: '2026-01-22',
    readMins: 4,
    keyStat: { value: '4.45 lakh', label: 'crimes against women reported in 2022 (NCRB)' },
    excerpt:
      'The government’s own crime bureau recorded 4.45 lakh crimes against women in 2022 — about 51 every hour, and rising.',
    dek: 'These are the cases that were reported. The real number is, by every expert account, higher.',
    body: [
      {
        paragraphs: [
          'The National Crime Records Bureau (NCRB) — a government body — recorded 4,45,256 crimes against women in 2022, up 4% on the previous year and over 30% higher than in 2014. That is roughly 51 complaints every hour, or one every 70 seconds.',
          'The largest categories were cruelty by a husband or his relatives (31.4%), kidnapping and abduction (19.2%), assault with intent to outrage modesty (18.7%), and rape (7.1%).',
        ],
      },
      {
        heading: 'Where, and the caveat',
        paragraphs: [
          'Uttar Pradesh recorded the most cases; by rate per lakh women, Delhi (144), Haryana (119) and Telangana (118) were far above the national average of 66.',
          'A crucial caveat cuts the other way from the usual political spin: higher reported numbers can partly reflect more women coming forward, which is good. But researchers consistently find large under-reporting — so the recorded figure is a floor, not a ceiling.',
        ],
      },
      {
        heading: 'What moves the needle',
        paragraphs: [
          'Fast-track courts that actually run, trained and accountable policing, and conviction rates that don’t collapse on appeal are what convert reports into deterrence. Publishing district-level data and conviction outcomes — not just totals — is how citizens can hold the system to account.',
        ],
      },
    ],
    sources: [
      { label: 'NCRB: Crime in India 2022', url: 'https://www.ncrb.gov.in/uploads/nationalcrimerecordsbureau/custom/1701607577CrimeinIndia2022Book1.pdf' },
      { label: 'ThePrint: 4% rise, UP tops cases', url: 'https://theprint.in/india/ncrb-data-shows-4-rise-in-crimes-against-women-in-india-up-has-most-rape-posco-cases/1871133/' },
    ],
    tags: ['governance', 'women', 'safety', 'ncrb'],
  },
  {
    slug: 'wealth-inequality-oxfam',
    title: 'The richest 1% of Indians own more than 40% of the wealth',
    kicker: 'ECONOMY · INEQUALITY',
    category: 'Economy',
    publishedAt: '2026-02-08',
    readMins: 4,
    keyStat: { value: '40%+', label: 'of national wealth held by the top 1%' },
    excerpt:
      'Oxfam’s analysis finds India among the most unequal economies on earth — the top 1% hold over 40% of wealth while the bottom half own 3%.',
    dek: 'Growth is real. The question this raises is simpler and sharper: growth for whom?',
    body: [
      {
        paragraphs: [
          'According to Oxfam’s "Survival of the Richest: The India Story," the richest 1% of Indians control more than 40% of the country’s total wealth, while the bottom 50% own about 3%. The top 10% hold roughly 65%.',
          'On income, the gap is similar: the top 10% take home about 58% of national income; the bottom half, about 15%.',
        ],
      },
      {
        heading: 'Why it matters even when GDP grows',
        paragraphs: [
          'A rising GDP can coexist with most people feeling poorer — if the gains concentrate at the top. That is the through-line connecting flat median incomes, weak consumption and the jobs squeeze documented elsewhere on this site.',
          'This isn’t an argument against wealth creation; it’s an argument for asking who the system is set up to reward. Progressive taxation, public services that work, and closing loopholes are the standard, non-partisan levers economists point to.',
        ],
      },
    ],
    sources: [
      { label: 'Oxfam: India extreme inequality in numbers', url: 'https://www.oxfam.org/en/india-extreme-inequality-numbers' },
      { label: 'Sabrang: top 1% holds 40% of wealth', url: 'https://sabrangindia.in/in-india-wealth-inequality-among-highest-in-the-world-top-1-holds-40-wealth-study/' },
    ],
    tags: ['economy', 'inequality', 'oxfam', 'wealth'],
  },
  {
    slug: 'balasore-train-crash-rail-safety',
    title: 'Balasore: 275 dead, and a safety warning that went unheeded',
    kicker: 'GOVERNANCE · SAFETY',
    category: 'Governance',
    publishedAt: '2025-12-28',
    readMins: 5,
    keyStat: { value: '275', label: 'killed in the June 2023 Balasore crash' },
    excerpt:
      'India’s deadliest rail disaster in decades was traced to a signalling error — months after an official had warned of exactly that risk.',
    dek: 'A preventable disaster is the hardest kind: the warning existed, in writing, before the crash.',
    body: [
      {
        paragraphs: [
          'On 2 June 2023, a signalling error sent a passenger train onto the wrong track near Balasore, Odisha, where it struck a stationary freight train. About 275 people were killed and over 1,000 injured — one of India’s worst rail disasters in decades.',
          'Critically, in February 2023, a railway operating manager had formally reported a near-identical signalling error elsewhere and warned it could cause a collision if unresolved.',
        ],
      },
      {
        heading: 'The funding picture',
        paragraphs: [
          'Reporting around the crash noted that money allocated for railway safety had fallen short of targets for years, and that safety funds were sometimes diverted to other uses. The Railways disputed that the crash reflected systemic safety problems.',
          'India has also rolled out "Kavach," an indigenous anti-collision system — genuine progress — but its coverage across the vast network remains partial.',
        ],
      },
      {
        heading: 'Accountability, not blame',
        paragraphs: [
          'The constructive test after a tragedy isn’t to assign political blame — it’s to publish the inquiry in full, fund safety to target, and accelerate collision-avoidance coverage so a written warning never again goes unheeded.',
        ],
      },
    ],
    sources: [
      { label: '2023 Odisha train collision · Wikipedia', url: 'https://en.wikipedia.org/wiki/2023_Odisha_train_collision' },
      { label: 'NPR: signalling error caused the crash', url: 'https://www.npr.org/2023/06/04/1180028370/an-indian-railway-official-says-a-signaling-error-caused-a-deadly-train-crash' },
    ],
    tags: ['governance', 'railways', 'safety', 'balasore'],
  },
  {
    slug: 'rupee-at-90-dollar',
    title: 'The rupee just crossed 90 to the dollar',
    kicker: 'ECONOMY · CURRENCY',
    category: 'Economy',
    publishedAt: '2026-01-30',
    readMins: 4,
    keyStat: { value: '₹61 → ₹90', label: 'rupee per US dollar, 2014 → Dec 2025' },
    excerpt:
      'A decade ago a strong rupee was sold as the mark of a strong government. The rupee hit a record low past 90 to the dollar in December 2025.',
    dek: 'Currencies move for many reasons — but a promise was once built on this number, so it’s fair to check it.',
    body: [
      {
        paragraphs: [
          'In December 2025, the rupee slipped to a record low past 90 to the US dollar. In 2014 it averaged about 61. That’s a depreciation of roughly 47% over eleven years.',
          'A weaker rupee isn’t automatically a failure — many factors drive exchange rates, and some exporters benefit. But before 2014, a falling rupee was repeatedly invoked as a sign of weak economic management, so it’s fair to hold the same yardstick now.',
        ],
      },
      {
        heading: 'Why it touches everyone',
        paragraphs: [
          'A cheaper rupee makes imports — crude oil, electronics, edible oil, foreign education and travel — more expensive, feeding into prices at home. It also quietly works against the "$5 trillion economy" goal, because the target is measured in dollars: when the rupee falls, nominal growth in rupees translates into fewer dollars.',
          'The honest framing isn’t "the rupee fell, therefore failure." It’s: the same standard should apply across governments — and the citizen deserves a clear explanation, not a change of subject.',
        ],
      },
    ],
    sources: [
      { label: 'Bloomberg: rupee slides to record low', url: 'https://www.bloomberg.com/news/articles/2025-12-01/indian-rupee-slides-to-record-low-as-central-bank-steps-away' },
      { label: 'Exchange-rate history of the Indian rupee · Wikipedia', url: 'https://en.wikipedia.org/wiki/Exchange_rate_history_of_the_Indian_rupee' },
    ],
    tags: ['economy', 'rupee', 'currency', 'inflation'],
  },
  {
    slug: 'farmer-suicides-ncrb',
    title: 'One farmer or farm worker dies by suicide every hour',
    kicker: 'WELFARE · AGRICULTURE',
    category: 'Welfare',
    publishedAt: '2026-01-08',
    readMins: 4,
    keyStat: { value: '11,290', label: 'farming-sector suicides in 2022 (NCRB)' },
    excerpt:
      'The government’s own crime bureau recorded 11,290 suicides in the farming sector in 2022 — and the worst-hit are the landless who work the fields.',
    dek: 'The agrarian crisis isn’t an abstraction. It shows up, year after year, in one statistic.',
    body: [
      {
        paragraphs: [
          'In 2022, the National Crime Records Bureau recorded 11,290 suicides among people in the farming sector — 5,207 farmers/cultivators and 6,083 agricultural labourers. That is at least one farming-sector death by suicide every hour, and a 3.7% rise over 2021.',
          'A telling detail: more than half (6,083) were agricultural labourers — the landless who depend on daily wages, and who rarely feature in farm-relief headlines.',
        ],
      },
      {
        heading: 'Where, and why',
        paragraphs: [
          'Maharashtra (4,248) recorded the most, followed by Karnataka (2,392), Andhra Pradesh, Tamil Nadu and Madhya Pradesh. Researchers consistently link the deaths to debt, crop failure, volatile prices and the absence of a reliable income floor.',
          'This connects directly to other gaps documented on this site: an unmet MSP-guarantee promise, a shrinking MGNREGA safety net, and farm incomes that didn’t double as pledged.',
        ],
      },
      {
        heading: 'What a floor looks like',
        paragraphs: [
          'The constructive asks are concrete and non-partisan: assured remunerative prices, accessible crop insurance that actually pays out, debt relief that reaches labourers (not just landowners), and rural employment funded to meet demand.',
        ],
      },
    ],
    sources: [
      { label: 'Down To Earth: one farmer/labourer dies every hour', url: 'https://www.downtoearth.org.in/agriculture/one-farmer-farm-labourer-dies-by-suicide-every-hour-in-india-ncrb-data-93184' },
      { label: 'Farmers’ suicides in India · Wikipedia', url: "https://en.wikipedia.org/wiki/Farmers'_suicides_in_India" },
    ],
    tags: ['welfare', 'farmers', 'agriculture', 'ncrb'],
  },
  {
    slug: 'women-at-work-participation',
    title: 'More women are working — but mostly for no pay',
    kicker: 'JOBS · GENDER',
    category: 'Jobs',
    publishedAt: '2026-02-20',
    readMins: 4,
    keyStat: { value: '41.7%', label: 'female labour-force participation (PLFS 2023-24)' },
    excerpt:
      'India’s female labour-force participation has nearly doubled since 2017-18 — but the rise is largely in unpaid family work, not salaried jobs.',
    dek: 'A rising number can hide a falling-short reality. Here, the headline gain is real — and so is the catch.',
    body: [
      {
        paragraphs: [
          'India’s female labour-force participation rate (FLFPR) rose to 41.7% in 2023-24, up sharply from 23.3% in 2017-18 (PLFS). On its face, that’s a big, genuine improvement worth acknowledging.',
          'But look at what kind of work grew. Much of the increase is in unpaid help in household enterprises (up from 9.1% to 19.6%) and own-account work (4.5% to 14.6%) — not salaried or regular wage jobs. Analysts note the rise has been driven heavily by rural women, partly under the pressure of inflation and household need.',
        ],
      },
      {
        heading: 'Why it still matters',
        paragraphs: [
          'Counting unpaid family labour as "participation" lifts the statistic without necessarily lifting women’s economic independence. India’s rate also remains low for its region — below Bangladesh, Bhutan and others on comparable measures.',
          'The constructive goal isn’t to dismiss the gain — it’s to convert it: safe workplaces and transport, childcare support, and salaried opportunities so that "more women working" means "more women earning".',
        ],
      },
    ],
    sources: [
      { label: 'Drishti IAS: Female Labour Force Participation', url: 'https://www.drishtiias.com/daily-updates/daily-news-analysis/female-labour-force-participation-in-india' },
      { label: 'IWWAGE: Women and Work 2024', url: 'https://iwwage.org/wp-content/uploads/2025/11/Women-and-Work-2024.pdf' },
    ],
    tags: ['jobs', 'women', 'gender', 'plfs'],
  },
]

export function getArticle(slug: string): StaticArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

export function listArticles(): StaticArticle[] {
  return [...ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}

/**
 * Map a /category/<slug> URL to a display title and the static articles that
 * belong in it. Used as a fallback so category pages never 404 before the CMS
 * has content. Returns null for unknown slugs.
 */
const CATEGORY_MAP: Record<
  string,
  { title: string; description: string; categories?: StaticArticle['category'][] }
> = {
  investigations: {
    title: 'Investigations',
    description: 'Sourced explainers and deep-dives on the record behind the headlines.',
  },
  'fact-check': {
    title: 'Fact-Check',
    description: 'Claims weighed against the evidence — every figure traceable to a source.',
  },
  policy: {
    title: 'Policy',
    description: 'How policy promises measure up against outcomes.',
    categories: ['Economy', 'Governance', 'Welfare', 'Health', 'Education', 'Environment'],
  },
  economy: { title: 'Economy', description: 'Jobs, growth, inequality and the numbers behind them.', categories: ['Economy', 'Jobs'] },
  elections: { title: 'Elections & Democracy', description: 'The health of India’s democratic institutions.', categories: ['Democracy'] },
  leaders: { title: 'Leaders & Accountability', description: 'Holding power to its own promises.', categories: ['Governance', 'Democracy'] },
  democracy: { title: 'Democracy', description: 'Rights, institutions, and transparency.', categories: ['Democracy'] },
  health: { title: 'Health', description: 'Public health, spending and outcomes.', categories: ['Health'] },
  education: { title: 'Education', description: 'Schools, exams and opportunity.', categories: ['Education'] },
  environment: { title: 'Environment', description: 'Air, water, climate and the cost of inaction.', categories: ['Environment'] },
  governance: { title: 'Governance', description: 'How the state works — and where it fails.', categories: ['Governance'] },
  jobs: { title: 'Jobs', description: 'Work, wages and the employment record.', categories: ['Jobs', 'Economy'] },
  welfare: { title: 'Welfare', description: 'Schemes meant to be a floor under the poorest.', categories: ['Welfare'] },
}

export function getArticlesForCategory(
  slug: string,
): { title: string; description: string; articles: StaticArticle[] } | null {
  const meta = CATEGORY_MAP[slug]
  if (!meta) return null
  const all = listArticles()
  const articles = meta.categories
    ? all.filter((a) => meta.categories!.includes(a.category))
    : all
  return { title: meta.title, description: meta.description, articles }
}
