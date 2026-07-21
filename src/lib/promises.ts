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
  category:
    | 'Jobs'
    | 'Economy'
    | 'Farmers'
    | 'Cities'
    | 'Water'
    | 'Environment'
    | 'Money'
    | 'Energy'
    | 'Sanitation'
    | 'Digital'
    | 'Health'
    | 'Welfare'
    | 'Education'
    | 'Governance'
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
  {
    id: 'demonetisation-black-money',
    promise: 'Demonetisation will wipe out black money',
    attribution: 'PM Modi, national address · 8 Nov 2016',
    year: '2016',
    category: 'Money',
    verdict: 'broken',
    progress: 5,
    reality:
      'The stated aim was to extinguish unaccounted cash hoarded outside the banking system. The RBI’s 2018 report found that ₹15.31 lakh crore of the ₹15.41 lakh crore demonetised — about 99.3% — came back into the banking system. Almost no cash was left unreturned, undercutting the black-money rationale, while the cash economy and informal-sector disruption drew lasting criticism.',
    punchline: '99.3% of the banned cash came straight back (RBI). The black money never showed up.',
    sources: [
      { label: '2016 demonetisation · Wikipedia (RBI figures)', url: 'https://en.wikipedia.org/wiki/2016_Indian_banknote_demonetisation' },
      { label: 'National Herald: RBI report', url: 'https://www.nationalheraldindia.com/india/demonetisation-rbi-report-leaves-modi-govt-red-faced-on-black-money-digital-economy' },
    ],
  },
  {
    id: 'ujjwala-lpg',
    promise: 'Clean cooking gas for every poor household (Ujjwala)',
    attribution: 'Pradhan Mantri Ujjwala Yojana · 2016',
    year: '2016',
    category: 'Energy',
    verdict: 'partial',
    progress: 55,
    reality:
      'Connections were a genuine success — crores of LPG connections reached poor households. But the harder goal, sustained clean-fuel use, lagged: a CAG audit and later official data showed many beneficiaries took few or no refills because the unsubsidised refill cost was unaffordable. In 2025-26, roughly 1.67 crore beneficiaries took no refill and 1.12 crore booked only one.',
    punchline: 'The cylinders arrived. For many families, the affordable refills did not.',
    sources: [
      { label: 'National Herald: CAG on Ujjwala refills', url: 'https://www.nationalheraldindia.com/india/lpg-refill-declines-in-pm-modis-flagship-ujjwala-yojana-cylinders-diverted-for-commercial-use-cag' },
      { label: 'PMUY household study (arXiv)', url: 'https://arxiv.org/pdf/2403.17112' },
    ],
  },
  {
    id: 'swachh-bharat-odf',
    promise: 'An open-defecation-free India by 2 Oct 2019',
    attribution: 'Swachh Bharat Mission · 2014',
    year: '2014',
    category: 'Sanitation',
    verdict: 'partial',
    progress: 60,
    reality:
      'Crores of toilets were built and open defecation fell sharply — real progress. But independent and official data complicate the "100% ODF" declaration: NSO and NFHS-5 surveys, a CAG report, and academic studies found large shares of rural households in several "ODF-declared" states still lacked working toilets or had members still defecating in the open.',
    punchline: 'Millions of toilets built — but the "100% open-defecation-free" claim didn’t survive the surveys.',
    sources: [
      { label: 'ORF: ODF claims vs reality', url: 'https://www.orfonline.org/expert-speak/odf-status-claims-vs-reality-swachh-bharat-mission' },
      { label: 'IDEAs: Claim versus Reality', url: 'https://www.networkideas.org/news-analysis/2019/11/claim-versus-reality-defecation-free/' },
    ],
  },
  {
    id: 'saubhagya-electrification',
    promise: 'Electricity to every village and household',
    attribution: 'Saubhagya / DDUGJY · 2017',
    year: '2017',
    category: 'Energy',
    verdict: 'kept',
    progress: 92,
    reality:
      'This one largely delivered. All inhabited un-electrified census villages were electrified by April 2018, and ~2.86 crore households were connected under Saubhagya before it closed in March 2022 having met its target. The IEA called India’s electrification drive one of the great success stories of 2018. The remaining gap is reliability of supply, not access.',
    punchline: 'A promise mostly kept: villages and crores of homes got connected on schedule.',
    sources: [
      { label: 'PIB: 2.86 crore households electrified', url: 'https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=1907728' },
      { label: 'Saubhagya scheme · Wikipedia', url: 'https://en.wikipedia.org/wiki/Saubhagya_scheme' },
    ],
  },
  {
    id: 'upi-digital-payments',
    promise: 'A world-leading digital-payments economy',
    attribution: 'Digital India / UPI · 2016 onward',
    year: '2016',
    category: 'Digital',
    verdict: 'kept',
    progress: 95,
    reality:
      'A clear success. UPI grew from ~2 crore transactions in FY2016-17 to hundreds of billions a year, handled ~83% of India’s payment volume by end-2024, and — per an IMF note — accounts for nearly half of the world’s real-time payment transactions. It is genuinely world-leading public digital infrastructure.',
    punchline: 'Credit where due: UPI became the world’s largest real-time payments system.',
    sources: [
      { label: 'PIB: UPI, world’s largest real-time platform', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2257087&reg=3&lang=2' },
      { label: 'Worldline: 228bn UPI transactions in 2025', url: 'https://worldline.com/en-in/home/top-navigation/media-relations/press-releases/worldline-reports-that-india-digital-payments-cross-new-milestones-as-upi-reaches-228-billion-transactions-in-2025' },
    ],
  },
  {
    id: 'bullet-train',
    promise: 'Mumbai–Ahmedabad bullet train running by 2023',
    attribution: 'High-speed rail project launch · 2017',
    year: '2017',
    category: 'Cities',
    verdict: 'delayed',
    progress: 35,
    reality:
      'India’s first bullet train was meant to run by 2022-23. Land-acquisition disputes pushed it back years — officials now target around 2028, with a short Surat–Bilimora stretch slated to open first. The cost estimate has climbed from about ₹1.08 lakh crore to roughly ₹1.98 lakh crore, an ~83% overrun.',
    punchline: 'Promised by 2023. Now aimed at ~2028, at nearly double the cost.',
    sources: [
      { label: 'Metro Rail Today: HSR delay & cost', url: 'https://metrorailtoday.com/news/delay-in-indias-first-bullet-train-mumbai-ahmedabad-hsr-line-may-double-the-project-cost' },
      { label: 'Angel One: ₹90,000 cr cost overrun', url: 'https://www.angelone.in/news/economy/indian-railways-may-cover-90-000-crore-cost-overrun-in-bullet-train-project' },
    ],
  },
  {
    id: 'housing-for-all',
    promise: 'Housing for All by 2022 (PMAY)',
    attribution: 'Pradhan Mantri Awas Yojana · 2015',
    year: '2015',
    category: 'Welfare',
    verdict: 'delayed',
    progress: 55,
    reality:
      'PMAY aimed to deliver homes for all by 2022 — about 1.12 crore urban and 2.95 crore rural. Crores of houses were genuinely built, but the 2022 target was missed, the urban target was trimmed, and the mission was extended to 31 December 2025 to finish sanctioned homes.',
    punchline: 'Real houses got built — but "Housing for All by 2022" slipped to at least 2025.',
    sources: [
      { label: 'Pradhan Mantri Awas Yojana · Wikipedia', url: 'https://en.wikipedia.org/wiki/Pradhan_Mantri_Awas_Yojana' },
      { label: 'PMAY-Urban: about the mission', url: 'https://pmay-urban.gov.in/about' },
    ],
  },
  {
    id: 'fuel-prices',
    promise: 'Fuel prices would fall as global crude fell',
    attribution: 'Deregulation framing · 2014 onward',
    year: '2014',
    category: 'Money',
    verdict: 'broken',
    progress: 20,
    reality:
      'Fuel was deregulated so pump prices would track global crude — including downward. In practice, when crude fell sharply after 2014, central excise and state VAT rose to absorb the gap, so consumers saw little benefit. Taxes have at times made up nearly half the retail price.',
    punchline: 'When crude crashed, taxes rose to fill the gap — so your pump price barely moved.',
    sources: [
      { label: 'EPW: how taxes keep fuel prices high', url: 'https://www.epw.in/engage/article/petrol-diesel-government-taxes-keep-retail-prices-high' },
      { label: 'ORF: India’s fuel-tax revenue', url: 'https://www.orfonline.org/expert-speak/indias-tax-revenue-from-petroleum-products' },
    ],
  },
  {
    id: 'five-trillion-economy',
    promise: 'A $5 trillion economy by 2024-25',
    attribution: 'PM Modi · 2019',
    year: '2019',
    category: 'Economy',
    verdict: 'broken',
    progress: 38,
    reality:
      'In 2019 the goal was a $5-trillion economy by the end of the second term (2024-25). Per IMF data, GDP was about $3.76 trillion in 2024-25 — well short. The deadline was quietly moved to 2027-28, rupee depreciation ate into nominal gains, and in Parliament the government even denied the PM had promised it.',
    punchline: 'Promised by 2024-25. We hit ~$3.76T — then the goalpost moved to 2027-28.',
    sources: [
      { label: 'ThePrint: target moved to 2027-28', url: 'https://theprint.in/economy/sitharaman-says-indian-economy-will-hit-5-trillion-by-2027-28-3-yrs-after-modis-2025-target/1919287/' },
      { label: 'The Quint: $5T target off track', url: 'https://www.thequint.com/opinion/modis-third-largest-and-5-trillion-economy-targets-are-off-track-india' },
    ],
  },
  {
    id: 'skill-india-40-crore',
    promise: 'Skill 40 crore Indians by 2022 (Skill India)',
    attribution: 'Skill India Mission / PMKVY · 2015',
    year: '2015',
    category: 'Jobs',
    verdict: 'broken',
    progress: 12,
    reality:
      'Launched in 2015 with a headline goal of skilling 40 crore people by 2022. By official accounts roughly 2.27 crore benefited across schemes — under 6% of the target — and placement rates under PMKVY hovered around 28–43%. The scheme was later restructured and extended.',
    punchline: '40 crore to be skilled by 2022. Under 6% were — and most weren’t placed.',
    sources: [
      { label: 'IBEF: Skill India Mission', url: 'https://www.ibef.org/government-schemes/skill-india' },
      { label: 'Asian Age: PMKVY misses placement target', url: 'https://www.asianage.com/india/all-india/010719/pmkvy-fails-to-achieve-its-job-placement-target.html' },
    ],
  },
  {
    id: 'neet-exam-integrity',
    promise: 'A secure, leak-proof national medical entrance exam (NEET)',
    attribution: 'National Testing Agency / Ministry of Education',
    year: '2024',
    category: 'Education',
    verdict: 'broken',
    progress: 20,
    reality:
      'NEET-UG 2026 was cancelled on 12 May 2026 after a WhatsApp-circulated "guess paper" was found to overlap with up to 140 real exam questions, affecting 2.27 crore aspirants. CBI investigators went on to find the identical racket had also compromised the 2025 paper — meaning the same vulnerability persisted across two consecutive exam cycles despite a near-identical scandal in 2024. The government has announced a shift to computer-based testing from 2027 and made several arrests, but no minister or NTA leader has resigned.',
    punchline: 'Exam security was promised after 2024. It was breached again in 2025 and 2026.',
    sources: [
      { label: 'Wikipedia: 2026 NEET controversy (sourced timeline)', url: 'https://en.wikipedia.org/wiki/2026_NEET_controversy' },
      { label: 'newindiagovernment.com: the 2026 NEET leak, fully verified', url: 'https://newindiagovernment.com/article/the-2026-neet-leak-fully-verified-what-actually-happened' },
    ],
  },
  {
    id: 'ladakh-sixth-schedule',
    promise: "Sixth Schedule constitutional status for Ladakh",
    attribution: 'BJP election manifesto · 2019 and 2020',
    year: '2019',
    category: 'Governance',
    verdict: 'delayed',
    progress: 10,
    reality:
      'The BJP listed Sixth Schedule implementation for Ladakh among its top-three manifesto priorities in the 2019 Lok Sabha election, and repeated the pledge ahead of the 2020 Hill Development Council election it went on to win. Seven years after Ladakh became a Union Territory without a legislature in August 2019, the roughly 97%-tribal region still has no Sixth Schedule status, no restored legislature, and no published timeline — the exact grievance driving activist Sonam Wangchuk\'s repeated hunger strikes since 2023, including a fresh one begun 28 June 2026.',
    punchline: 'Promised in two manifestos. Seven years on, still no Sixth Schedule for Ladakh.',
    sources: [
      { label: 'PMF IAS: Ladakh protests — statehood & Sixth Schedule explainer', url: 'https://www.pmfias.com/ladakh-protests/' },
      { label: 'newindiagovernment.com: did the BJP promise Ladakh Sixth Schedule status twice?', url: 'https://newindiagovernment.com/article/did-the-bjp-promise-ladakh-sixth-schedule-status-twice-and-skip-it' },
    ],
  },
]
