/**
 * Lightweight homepage-priority dictionary.
 *
 * We don't pull in a full i18n routing library — instead, key marketing
 * strings on the home page, daily-jumla bar and primary nav are mapped here,
 * and a small client-side context flips them based on the user's language
 * choice (stored in localStorage). Server-rendered HTML always carries the
 * English fallback so SEO + first-paint stay clean; the client swaps the
 * relevant nodes after hydration.
 *
 * Languages: English (default), Hindi, Tamil, Telugu, Bengali, Marathi.
 *
 * Editorial: translations are intentionally direct (no spin). Numbers and
 * data references stay identical across languages — the evidence is the
 * point.
 */

export const LANGS = ['en', 'hi'] as const
export type Lang = (typeof LANGS)[number]

export const LANG_META: Record<
  Lang,
  { label: string; native: string; flag: string }
> = {
  en: { label: 'English', native: 'English', flag: '🇮🇳' },
  hi: { label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
}

/** All translatable string keys in one type so refactors are safe. */
export type DictKey =
  // Masthead / nav
  | 'nav.signIn'
  | 'nav.latest'
  | 'nav.factCheck'
  | 'nav.policy'
  | 'nav.elections'
  | 'nav.leaders'
  | 'nav.investigations'
  | 'nav.petitions'
  | 'nav.opinion'
  | 'nav.vote'
  | 'nav.movement'
  | 'nav.jumlaMeter'
  | 'nav.realOrJumla'
  // Daily Jumla bar
  | 'dailyJumla.kicker'
  | 'dailyJumla.cta'
  // Live activity strip
  | 'live.nowReading'
  // Hero
  | 'hero.kicker'
  | 'hero.headline1'
  | 'hero.headline2'
  | 'hero.headline3'
  | 'hero.subPromisesTracked'
  | 'hero.subBrokenOrJumla'
  | 'hero.subEvery'
  | 'hero.subReceipts'
  | 'hero.ctaPrimary'
  | 'hero.ctaSecondary'
  | 'hero.ctaTertiary'
  | 'hero.scorecard'
  | 'hero.verified'
  | 'hero.stat1Label'
  | 'hero.stat1Sub'
  | 'hero.stat2Label'
  | 'hero.stat2Sub'
  | 'hero.stat3Label'
  | 'hero.stat3Sub'
  | 'hero.stat4Label'
  | 'hero.stat4Sub'
  // Why-it-matters persuasion block
  | 'wim.kicker'
  | 'wim.heading'
  | 'wim.sub'
  | 'wim.point1Title'
  | 'wim.point1Body'
  | 'wim.point2Title'
  | 'wim.point2Body'
  | 'wim.point3Title'
  | 'wim.point3Body'
  | 'wim.point4Title'
  | 'wim.point4Body'
  | 'wim.cta'
  // Sticky CTA
  | 'sticky.label'
  // Stance strip (constructive framing)
  | 'stance.text'
  | 'stance.strong'

type Dict = Record<DictKey, string>

const en: Dict = {
  // Nav
  'nav.signIn': 'Sign In',
  'nav.latest': 'Latest',
  'nav.factCheck': 'Fact-Check',
  'nav.policy': 'Policy',
  'nav.elections': 'Elections',
  'nav.leaders': 'Leaders',
  'nav.investigations': 'Investigations',
  'nav.petitions': 'Petitions',
  'nav.opinion': 'Opinion',
  'nav.vote': 'Vote',
  'nav.movement': 'The Movement',
  'nav.jumlaMeter': 'Jumla Meter',
  'nav.realOrJumla': 'Real or Jumla?',

  // Daily Jumla bar
  'dailyJumla.kicker': 'Jumla of the Day',
  'dailyJumla.cta': 'See proof',

  // Live activity
  'live.nowReading': 'Now reading',

  // Hero
  'hero.kicker': "We're keeping score · Est. 2026",
  'hero.headline1': 'India',
  'hero.headline2': 'Deserves',
  'hero.headline3': 'Better.',
  'hero.subPromisesTracked': 'promises tracked.',
  'hero.subBrokenOrJumla': 'broken or called a jumla.',
  'hero.subEvery': 'Every claim sourced, every verdict citable.',
  'hero.subReceipts':
    'No party line. Just the receipts — and the courage to keep them in plain sight.',
  'hero.ctaPrimary': 'See the Jumla Meter',
  'hero.ctaSecondary': 'Play Real or Jumla?',
  'hero.ctaTertiary': 'About the Movement',
  'hero.scorecard': 'The Scorecard',
  'hero.verified': 'Verified',
  'hero.stat1Label': 'Promises broken or jumla',
  'hero.stat1Sub': 'Across jobs, money, farmers, GDP',
  'hero.stat2Label': 'Average delivery',
  'hero.stat2Sub': 'Weighted across every tracked headline',
  'hero.stat3Label': 'Net jobs lost',
  'hero.stat3Sub': '2016-17 → 2022-23 (CMIE)',
  'hero.stat4Label': 'Claims fact-checked',
  'hero.stat4Sub': 'Independent · Cited · Free to verify',

  // Why it matters
  'wim.kicker': 'Why a citizens’ platform now',
  'wim.heading': "If the numbers don't add up, neither does the promise.",
  'wim.sub':
    'Every line below is a public, citable data point. Read it, share it, demand answers — that’s how we make the next promise harder to break.',
  'wim.point1Title': 'Jobs lost, not created',
  'wim.point1Body':
    '~70 lakh net jobs lost between 2016-17 and 2022-23 (CMIE) — the opposite of the headline promise of 2 crore new jobs a year.',
  'wim.point2Title': 'Manufacturing is shrinking, not surging',
  'wim.point2Body':
    'Promised: 25% of GDP by 2025. Actual: fell to a roughly 20-year low near 14% (NSO data).',
  'wim.point3Title': 'A jumla, on record',
  'wim.point3Body':
    "BJP president Amit Shah called the ₹15-lakh-per-account promise a 'jumla' — that’s how the word entered India’s political vocabulary.",
  'wim.point4Title': 'Farmers waiting on a doubling',
  'wim.point4Body':
    'ICRIER’s independent analysis: actual farm income progress is well under half of the 2022 target.',
  'wim.cta': 'See every promise',

  // Sticky CTA
  'sticky.label': 'Play Real or Jumla?',

  // Stance strip
  'stance.strong': 'This isn’t against any party or person.',
  'stance.text':
    'It’s for promises kept. We hold every government — present and future — to the same test: what was promised, what was delivered, what’s still possible.',
}

const hi: Dict = {
  'nav.signIn': 'साइन इन',
  'nav.latest': 'ताज़ा',
  'nav.factCheck': 'फ़ैक्ट-चेक',
  'nav.policy': 'नीति',
  'nav.elections': 'चुनाव',
  'nav.leaders': 'नेता',
  'nav.investigations': 'जाँच',
  'nav.petitions': 'याचिकाएँ',
  'nav.opinion': 'राय',
  'nav.vote': 'वोट',
  'nav.movement': 'आंदोलन',
  'nav.jumlaMeter': 'जुमला मीटर',
  'nav.realOrJumla': 'सच या जुमला?',

  'dailyJumla.kicker': 'आज का जुमला',
  'dailyJumla.cta': 'सबूत देखें',

  'live.nowReading': 'अभी पढ़ रहे हैं',

  'hero.kicker': 'हम हिसाब रख रहे हैं · 2026 से',
  'hero.headline1': 'भारत',
  'hero.headline2': 'इससे',
  'hero.headline3': 'बेहतर का हक़दार है।',
  'hero.subPromisesTracked': 'वादे ट्रैक किए गए।',
  'hero.subBrokenOrJumla': 'टूटे या जुमला घोषित।',
  'hero.subEvery': 'हर दावा सूत्रबद्ध, हर फ़ैसला जाँचने लायक।',
  'hero.subReceipts':
    'कोई पार्टी लाइन नहीं। सिर्फ़ रसीदें — और उन्हें सबके सामने रखने का हौसला।',
  'hero.ctaPrimary': 'जुमला मीटर देखें',
  'hero.ctaSecondary': 'सच या जुमला खेलें',
  'hero.ctaTertiary': 'आंदोलन के बारे में',
  'hero.scorecard': 'स्कोरकार्ड',
  'hero.verified': 'सत्यापित',
  'hero.stat1Label': 'टूटे या जुमला वादे',
  'hero.stat1Sub': 'नौकरी, पैसा, किसान, GDP',
  'hero.stat2Label': 'औसत डिलीवरी',
  'hero.stat2Sub': 'हर ट्रैक की गई हेडलाइन का औसत',
  'hero.stat3Label': 'कुल नौकरियाँ गईं',
  'hero.stat3Sub': '2016-17 → 2022-23 (CMIE)',
  'hero.stat4Label': 'जाँचे गए दावे',
  'hero.stat4Sub': 'स्वतंत्र · सूत्रबद्ध · खुले स्रोत',

  'wim.kicker': 'अब नागरिक मंच क्यों ज़रूरी है',
  'wim.heading': 'अगर आँकड़े मेल नहीं खाते, तो वादा भी मेल नहीं खाता।',
  'wim.sub':
    'नीचे हर पंक्ति सार्वजनिक, सूत्रबद्ध आँकड़ा है। पढ़ें, साझा करें, जवाब माँगें — अगली बार वादा तोड़ना मुश्किल कर दीजिए।',
  'wim.point1Title': 'नौकरियाँ बनीं नहीं, गईं',
  'wim.point1Body':
    '2016-17 से 2022-23 के बीच कुल ~70 लाख नौकरियाँ कम हुईं (CMIE) — जबकि वादा था हर साल 2 करोड़ नई नौकरियाँ।',
  'wim.point2Title': 'मैन्युफ़ैक्चरिंग बढ़ रही नहीं, घट रही है',
  'wim.point2Body':
    'वादा: 2025 तक GDP का 25%। हक़ीक़त: लगभग 20 साल के निचले स्तर ~14% पर (NSO)।',
  'wim.point3Title': 'जुमला, रिकॉर्ड पर',
  'wim.point3Body':
    'अमित शाह ने ख़ुद ₹15 लाख प्रति खाता वाले वादे को \'जुमला\' कहा — इसी से यह शब्द भारत की राजनीति में आम हुआ।',
  'wim.point4Title': 'किसान आय का दुगुना होना अधूरा',
  'wim.point4Body':
    'ICRIER के स्वतंत्र विश्लेषण के मुताबिक़ 2022 के लक्ष्य का बमुश्किल आधा भी पूरा नहीं हुआ।',
  'wim.cta': 'हर वादा देखें',

  'sticky.label': 'सच या जुमला खेलें',

  'stance.strong': 'यह किसी पार्टी या व्यक्ति के ख़िलाफ़ नहीं है।',
  'stance.text':
    'यह वादे निभाने के लिए है। हम हर सरकार को — आज की और आने वाली — एक ही कसौटी पर परखते हैं: क्या वादा था, क्या पूरा हुआ, और अब भी क्या मुमकिन है।',
}

export const DICT: Record<Lang, Dict> = {
  en,
  hi,
}

export function translate(lang: Lang, key: DictKey): string {
  return DICT[lang][key] ?? DICT.en[key] ?? key
}
