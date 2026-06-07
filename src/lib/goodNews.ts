/**
 * "Good News from Around the World" — verifiable positive global progress.
 *
 * A deliberate counterweight to the accountability coverage: hope and
 * efficacy keep readers engaged better than anger alone. Every item is a
 * real, sourced development (WHO, UNICEF/UN IGME, World Bank, IRENA, WMO),
 * with a headline number and a link to the primary source.
 *
 * No external image URLs are stored here — the site's Content-Security-Policy
 * restricts images to self/data/blob. Each card uses a gradient + emblem
 * instead. To use real photos, add the image host to next.config.mjs
 * remotePatterns AND the CSP img-src in next.config.mjs headers().
 */

export type GoodNewsItem = {
  id: string
  topic: string
  headline: string
  blurb: string
  stat: { value: string; label: string }
  /** Emoji emblem shown large on the card */
  emblem: string
  /** Tailwind gradient classes for the card header band */
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
]
