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
]
