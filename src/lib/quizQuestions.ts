/**
 * "Real or Jumla?" — the addictive fact-check game.
 *
 * Each question shows a real, widely-circulated statement. The player guesses
 * whether it is REAL (true / largely delivered) or a JUMLA (false, misleading,
 * or an abandoned promise). Every answer reveals the verdict, a one-line
 * explanation, and a source so the game also teaches.
 */

export type QuizAnswer = 'real' | 'jumla'

export type QuizQuestion = {
  id: string
  claim: string
  context: string
  /** The correct answer */
  truth: QuizAnswer
  explanation: string
  source: { label: string; url: string }
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-15-lakh',
    claim: '“₹15 lakh will be deposited in every Indian’s bank account.”',
    context: 'A line that echoed through the 2014 campaign.',
    truth: 'jumla',
    explanation:
      'BJP president Amit Shah said on record this was "a jumla" — a rhetorical example about black money, not an actual promise. No money was ever credited.',
    source: { label: 'BOOM fact-check', url: 'https://www.boomlive.in/did-modi-promise-to-deposit-rs-15-lakh-in-every-account-a-factcheck' },
  },
  {
    id: 'q-2-crore-jobs',
    claim: '“The government creates 2 crore new jobs every single year.”',
    context: 'A headline employment claim repeated for years.',
    truth: 'jumla',
    explanation:
      'CMIE data shows total employment FELL by ~70 lakh between 2016-17 and 2022-23 — the opposite of 2 crore new jobs a year.',
    source: { label: 'People’s Democracy / CMIE', url: 'https://peoplesdemocracy.in/2024/0407_pd/where-are-promised-two-crore-jobs-every-year' },
  },
  {
    id: 'q-farm-income',
    claim: '“Farmers’ incomes were successfully doubled by 2022.”',
    context: 'The flagship 2016 agricultural pledge.',
    truth: 'jumla',
    explanation:
      'ICRIER’s independent assessment found less than 50% of the doubling target achieved. The Situation Assessment Survey put farm income near ₹10,218/month vs a ₹22,610 target.',
    source: { label: 'IndiaSpend', url: 'https://www.indiaspend.com/doubling-farm-income-by-2022-a-status-report' },
  },
  {
    id: 'q-smart-cities-18',
    claim: '“Only 18 of the 100 Smart Cities finished all their projects.”',
    context: 'The mission was closed in March 2025.',
    truth: 'real',
    explanation:
      'True. After a full decade, just 18 of 100 cities had completed all projects by March 2025 — though ~95% of individual projects were reported done.',
    source: { label: 'Down To Earth', url: 'https://www.downtoearth.org.in/governance/after-a-decade-of-its-launch-only-18-out-of-100-cities-have-completed-smart-cities-mission-projects-but-there-are-some-positive-takeaways' },
  },
  {
    id: 'q-manufacturing-25',
    claim: '“Manufacturing now makes up 25% of India’s GDP.”',
    context: 'The headline target of Make in India.',
    truth: 'jumla',
    explanation:
      'Manufacturing’s share actually FELL to roughly 14% by March 2025 — down from ~16.7% in 2013-14, and nowhere near the 25% goal.',
    source: { label: 'Down To Earth', url: 'https://www.downtoearth.org.in/governance/but-did-we-really-make-in-india' },
  },
  {
    id: 'q-har-ghar-jal-tap',
    claim: '“Around 98% of rural homes now have a tap water connection.”',
    context: 'The Jal Jeevan Mission infrastructure claim.',
    truth: 'real',
    explanation:
      'Largely true on infrastructure — ~98% of rural homes have a tap. But a 2024 survey found only ~75% get regular, safe, adequate water, and the deadline slipped to 2028.',
    source: { label: 'Jal Jeevan Mission · Wikipedia', url: 'https://en.wikipedia.org/wiki/Jal_Jeevan_Mission' },
  },
  {
    id: 'q-namami-gange',
    claim: '“Sewage-treatment capacity on the Ganga has multiplied many times since 2014.”',
    context: 'Namami Gange progress.',
    truth: 'real',
    explanation:
      'True — capacity has grown several-fold and ~323 of 502 projects are complete. The catch: deadlines kept slipping and pollution persists in many stretches.',
    source: { label: 'PIB', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2109078' },
  },
  {
    id: 'q-harvard-degree',
    claim: '“India’s PM holds an economics degree from Harvard University.”',
    context: 'A claim that circulated in campaign material.',
    truth: 'jumla',
    explanation:
      'Harvard’s registrar has no such record. The claim quietly disappeared from official bios after public scrutiny.',
    source: { label: 'NIG Fact-Check Desk', url: '/category/fact-check' },
  },
  {
    id: 'q-demonetisation',
    claim: '“Demonetisation wiped out India’s black money.”',
    context: 'The stated goal of the 2016 note ban.',
    truth: 'jumla',
    explanation:
      'The RBI’s own 2018 report found ~99.3% of the demonetised cash came back into the banking system — leaving almost nothing as unreturned "black money".',
    source: { label: '2016 demonetisation · Wikipedia (RBI data)', url: 'https://en.wikipedia.org/wiki/2016_Indian_banknote_demonetisation' },
  },
  {
    id: 'q-upi-largest',
    claim: '“India runs the world’s largest real-time digital payments system.”',
    context: 'On UPI’s scale.',
    truth: 'real',
    explanation:
      'True — and worth saying plainly. Per an IMF note, UPI handles close to half of all real-time payment transactions on Earth. Credit where the record earns it.',
    source: { label: 'PIB: UPI, world’s largest RTP platform', url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2257087&reg=3&lang=2' },
  },
  {
    id: 'q-villages-electrified',
    claim: '“Every inhabited census village in India has been electrified.”',
    context: 'On the rural electrification drive.',
    truth: 'real',
    explanation:
      'Largely true: all inhabited un-electrified census villages were declared electrified by April 2018, and ~2.86 crore homes were connected under Saubhagya. The open question is reliability of supply, not access.',
    source: { label: 'PIB: Saubhagya household electrification', url: 'https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=1907728' },
  },
  {
    id: 'q-odf-100',
    claim: '“India became 100% open-defecation-free in 2019.”',
    context: 'The Swachh Bharat milestone declaration.',
    truth: 'jumla',
    explanation:
      'Toilet-building was real and large — but NSO, NFHS-5 and a CAG report found big shares of rural households in "ODF" states still lacked working toilets. The clean 100% figure doesn’t survive the surveys.',
    source: { label: 'ORF: ODF claims vs reality', url: 'https://www.orfonline.org/expert-speak/odf-status-claims-vs-reality-swachh-bharat-mission' },
  },
  {
    id: 'q-ujjwala-connections',
    claim: '“Crores of poor households got an LPG cooking-gas connection under Ujjwala.”',
    context: 'On the cooking-gas scheme.',
    truth: 'real',
    explanation:
      'True on connections — that part delivered. The weak spot is sustained use: a CAG audit and later data show many households can’t afford regular refills, so clean-fuel use lagged the connection numbers.',
    source: { label: 'National Herald: CAG on Ujjwala', url: 'https://www.nationalheraldindia.com/india/lpg-refill-declines-in-pm-modis-flagship-ujjwala-yojana-cylinders-diverted-for-commercial-use-cag' },
  },
  {
    id: 'q-youth-unemployment',
    claim: '“Nearly every second young Indian was jobless in 2022-23.”',
    context: 'On youth unemployment.',
    truth: 'real',
    explanation:
      'Sadly close to true: CMIE data put youth unemployment around 45% in FY2022-23. Headline GDP growth has not translated into jobs for young people.',
    source: { label: 'People’s Democracy / CMIE', url: 'https://peoplesdemocracy.in/2024/0407_pd/where-are-promised-two-crore-jobs-every-year' },
  },
  {
    id: 'q-fastest-growing',
    claim: '“India is among the fastest-growing major economies.”',
    context: 'A common macro talking point.',
    truth: 'real',
    explanation:
      'Largely true on the headline growth rate — but it’s a half-picture: median incomes have stayed flat for years and job creation has lagged, so the growth isn’t reaching most households evenly.',
    source: { label: 'People’s Democracy / CMIE', url: 'https://peoplesdemocracy.in/2024/0407_pd/where-are-promised-two-crore-jobs-every-year' },
  },
  {
    id: 'q-make-in-india-jobs',
    claim: '“Make in India created 100 million new manufacturing jobs by 2022.”',
    context: 'A target set at the 2014 launch.',
    truth: 'jumla',
    explanation:
      'Not met. Manufacturing’s share of GDP fell rather than rose, and the 100-million-jobs goal went unachieved.',
    source: { label: 'Down To Earth: 10 years of Make in India', url: 'https://www.downtoearth.org.in/governance/but-did-we-really-make-in-india' },
  },
  {
    id: 'q-tap-water-reliable',
    claim: '“Every rural home with a tap actually gets reliable, safe water.”',
    context: 'On Jal Jeevan Mission outcomes.',
    truth: 'jumla',
    explanation:
      'Taps reached ~98% of rural homes — genuinely big. But a 2024 government-commissioned survey found only ~75% get regular, safe, adequate water; the gap between a tap and a working tap is the story.',
    source: { label: 'Jal Jeevan Mission · Wikipedia', url: 'https://en.wikipedia.org/wiki/Jal_Jeevan_Mission' },
  },
  {
    id: 'q-cji-cockroach',
    claim: '“India’s Chief Justice really called unemployed youth ‘cockroaches’ in court.”',
    context: 'The remark that sparked a nationwide youth movement, May 2026.',
    truth: 'real',
    explanation:
      'True. Chief Justice Surya Kant said "there are youngsters like cockroaches, who don\'t get any employment" at a 15 May 2026 Supreme Court hearing. A satirical movement adopted the insult as its name the very next day.',
    source: { label: 'Wikipedia: Cockroach Janta Party', url: 'https://en.wikipedia.org/wiki/Cockroach_Janta_Party' },
  },
  {
    id: 'q-cjp-instagram-bjp',
    claim: '“A brand-new protest movement’s Instagram overtook the ruling party’s in under a week.”',
    context: 'The Cockroach Janta Party’s viral growth, May 2026.',
    truth: 'real',
    explanation:
      'Largely true. Founded 16 May 2026, the movement hit 22 million Instagram followers within about two weeks, reportedly overtaking the BJP’s own Instagram following within roughly five days.',
    source: { label: 'CNN: Cockroach Janta Party', url: 'https://www.cnn.com/2026/06/26/india/india-cockroach-janta-party-delhi-protest-intl-hnk' },
  },
  {
    id: 'q-neet-2026-leak',
    claim: '“NEET 2026 had to be cancelled after a leaked ‘guess paper’ matched the real exam.”',
    context: 'The exam sat by 2.27 crore medical aspirants, May 2026.',
    truth: 'real',
    explanation:
      'True. A chemistry teacher in Rajasthan flagged up to 140 overlapping questions between a WhatsApp-circulated guess paper and the real exam; NTA cancelled it on 12 May 2026 and handed the case to the CBI.',
    source: { label: 'Wikipedia: 2026 NEET controversy', url: 'https://en.wikipedia.org/wiki/2026_NEET_controversy' },
  },
  {
    id: 'q-neet-same-racket-2025',
    claim: '“The 2026 NEET leak was a one-off — the exam was clean the year before.”',
    context: 'On the scope of the exam-security failure.',
    truth: 'jumla',
    explanation:
      'False as stated. CBI investigators found the identical racket behind the 2026 leak had also compromised the 2025 NEET-UG paper — the vulnerability was systemic, not a single incident.',
    source: { label: 'Wikipedia: 2026 NEET controversy', url: 'https://en.wikipedia.org/wiki/2026_NEET_controversy' },
  },
  {
    id: 'q-wangchuk-court-order',
    claim: '“Sonam Wangchuk was hospitalised on a Delhi High Court order, not a random police decision.”',
    context: 'His removal from Jantar Mantar, 18 July 2026.',
    truth: 'real',
    explanation:
      'True. Police said the removal followed a Delhi High Court order for "essential medical care," based on expert medical advice — 20 days into his hunger strike. His wife said she wasn’t informed beforehand.',
    source: { label: 'Al Jazeera: forcible hospitalisation', url: 'https://www.aljazeera.com/news/2026/7/18/indian-police-forcibly-hospitalise-activist-after-20-day-hunger-strike' },
  },
  {
    id: 'q-parliament-march-talks',
    claim: '“The government offered talks the same morning police used tear gas on the Parliament march.”',
    context: '20 July 2026, the first day of the monsoon session.',
    truth: 'real',
    explanation:
      'True, and easy to miss. A government spokesperson said talks were offered that morning — before over 10,000 marched and police responded with tear gas and baton charges near Jantar Mantar.',
    source: { label: 'Al Jazeera: police attack Cockroach activists', url: 'https://www.aljazeera.com/news/2026/7/20/police-attack-cockroach-activists-as-thousands-march-on-indian-parliament' },
  },
  {
    id: 'q-ladakh-sixth-schedule-promise',
    claim: '“Sixth Schedule status for Ladakh was a top-three promise in two BJP election manifestos.”',
    context: '2019 Lok Sabha and 2020 Hill Council elections.',
    truth: 'real',
    explanation:
      'True. The BJP listed it among its top three Ladakh priorities in 2019 and repeated the pledge for the 2020 Hill Development Council poll, which it won. Seven years on, Ladakh still has no Sixth Schedule status.',
    source: { label: 'PMF IAS: Ladakh protests explainer', url: 'https://www.pmfias.com/ladakh-protests/' },
  },
  {
    id: 'q-ladakh-97-tribal',
    claim: '“Ladakh, demanding Sixth Schedule status, is India’s most tribal Union Territory.”',
    context: 'The demographic case behind the statehood movement.',
    truth: 'real',
    explanation:
      'True. Roughly 97% of Ladakh’s population is Scheduled Tribe — the highest proportion of any Indian Union Territory — which is central to its case for Sixth Schedule autonomous-council protections.',
    source: { label: 'PMF IAS: Ladakh protests explainer', url: 'https://www.pmfias.com/ladakh-protests/' },
  },
  {
    id: 'q-cjp-x-blocked',
    claim: '“The government got the Cockroach Janta Party’s X account blocked, then a court ordered it unblocked.”',
    context: 'A free-speech fight that ran alongside the street protests.',
    truth: 'real',
    explanation:
      'True. MeitY had the account withheld in India on 21 June 2026 under IT Act Section 69A, citing national-security concerns. Weeks later a Delhi court ordered it unblocked after the Centre said it had "no objection."',
    source: { label: 'US News: court orders unblocking', url: 'https://www.usnews.com/news/world/articles/2026-07-07/indian-court-orders-government-to-unblock-cockroach-partys-x-account' },
  },
  {
    id: 'q-neet-cbt-2027',
    claim: '“After the leak, the government committed to a fully computer-based NEET from 2027.”',
    context: 'The reform announced after the 2026 cancellation.',
    truth: 'real',
    explanation:
      'True. Education Minister Dharmendra Pradhan admitted a "breach in the command chain" and announced NEET will shift to computer-based testing from 2027, alongside tighter paper-security measures.',
    source: { label: 'Wikipedia: 2026 NEET controversy', url: 'https://en.wikipedia.org/wiki/2026_NEET_controversy' },
  },
  {
    id: 'q-surveillance-pil-decided',
    claim: '“Courts have already ruled that Delhi Police illegally surveilled the Jantar Mantar protesters.”',
    context: 'The PIL filed by ex-JNUSU president Aishe Ghosh.',
    truth: 'jumla',
    explanation:
      'Not yet true. A PIL alleging intimidatory surveillance is real and pending before the Delhi High Court — but as of this writing no ruling has been issued; the government disputes the claim as routine law-and-order filming.',
    source: { label: 'LiveLaw: surveillance allegations denied', url: 'https://www.livelaw.in/high-court/delhi-high-court/cjp-protest-surveillance-allegations-denied-delhi-police-542064' },
  },
]
