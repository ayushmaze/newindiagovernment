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
  category: 'Economy' | 'Jobs' | 'Governance' | 'Welfare' | 'Health' | 'Democracy'
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
]

export function getArticle(slug: string): StaticArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

export function listArticles(): StaticArticle[] {
  return [...ARTICLES].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}
