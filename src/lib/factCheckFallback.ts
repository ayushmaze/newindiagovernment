/**
 * Curated fallback fact-checks for the live ticker.
 *
 * The ticker pulls from the `ticker-items` Payload collection at request
 * time; until the editorial team has seeded that collection (which needs an
 * admin user — first-time setup at /admin/create-first-user), we fall back
 * to this hand-picked, sourced list so visitors never see an empty ticker.
 *
 * Editorial guardrails:
 *   - Every claim must be traceable to a primary source or two independent
 *     reputable outlets — see DEPLOY-HANDOFF.md §1.4 and the factcheck skill
 *     standards.
 *   - Verdicts use the same scale as Payload's TickerItems collection.
 *   - Credibility scores: 0–10. Higher = the *claim* is closer to true.
 *     False/jumla claims are scored low.
 *   - The list is rotated regularly. Do NOT add unsourced rumours.
 */

export type FallbackVerdict = 'false' | 'misleading' | 'mostly-false' | 'mixed' | 'true'

export type FallbackTickerItem = {
  id: string
  claim: string
  verdict: FallbackVerdict
  /** Credibility of the CLAIM (not the source). 0 = false, 10 = true. */
  credibilityScore: number
  /** Optional link target — relative path under the site root. */
  href?: string
}

export const FALLBACK_TICKER_ITEMS: FallbackTickerItem[] = [
  {
    id: 'jumla-15-lakh',
    claim: '"₹15 lakh in every Indian\'s bank account" — Amit Shah called it a jumla, on record',
    verdict: 'false',
    credibilityScore: 0,
    href: '/promises',
  },
  {
    id: 'jobs-2-crore',
    claim: '"2 crore jobs every year" — CMIE: net loss of ~70 lakh jobs 2016-17 → 2022-23',
    verdict: 'false',
    credibilityScore: 0.8,
    href: '/promises',
  },
  {
    id: 'farmer-income-double',
    claim: '"Farmers\' income doubled by 2022" — ICRIER analysis: well under 50% of the target met',
    verdict: 'false',
    credibilityScore: 2.0,
    href: '/promises',
  },
  {
    id: 'manufacturing-25-gdp',
    claim: '"Manufacturing share will reach 25% of GDP" — actually fell to a ~20-year low near 14%',
    verdict: 'false',
    credibilityScore: 1.8,
    href: '/promises',
  },
  {
    id: 'smart-cities-100',
    claim: '"100 Smart Cities delivered" — only 18 of 100 cities finished all their projects',
    verdict: 'mostly-false',
    credibilityScore: 1.8,
    href: '/promises',
  },
  {
    id: 'tap-water-2024',
    claim: '"Tap water to every home by 2024" — ~98% taps installed, ~75% deliver reliably; deadline → 2028',
    verdict: 'mixed',
    credibilityScore: 6.0,
    href: '/promises',
  },
  {
    id: 'gdp-fastest',
    claim: '"India is the fastest-growing major economy" — headline GDP rate true; median income stagnant 3+ years (NSO, CMIE, World Bank)',
    verdict: 'misleading',
    credibilityScore: 4.5,
    href: '/promises',
  },
  {
    id: 'youth-unemployment',
    claim: '"Youth unemployment at historic lows" — CMIE shows ~45% urban youth unemployment; govt uses redefined categories',
    verdict: 'false',
    credibilityScore: 1.5,
    href: '/promises',
  },
  {
    id: 'ganga-clean',
    claim: '"Clean Ganga delivered" (Namami Gange) — real progress on STPs, but repeatedly delayed; water quality still off-target',
    verdict: 'mixed',
    credibilityScore: 5.5,
    href: '/promises',
  },
  {
    id: 'demonetisation-black',
    claim: '"Demonetisation will end black money" — 99.3% of demonetised currency returned to the banking system (RBI 2018)',
    verdict: 'false',
    credibilityScore: 1.0,
  },
]
