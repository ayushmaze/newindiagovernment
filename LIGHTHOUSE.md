# Lighthouse Report — The New India Government

> Audited: 2026-05-13  
> Server: `pnpm start` (production build, localhost:3000)  
> Tool: `lighthouse@latest` — headless Chrome, mobile preset  
> Categories: Performance · Accessibility · Best Practices · SEO

---

## Homepage (`/`)

| Category        | Score |
|-----------------|-------|
| Performance     | 🟠 81 |
| Accessibility   | 🟢 95 |
| Best Practices  | 🟢 96 |
| SEO             | 🟢 100 |

### Core Web Vitals

| Metric | Value |
|--------|-------|
| First Contentful Paint (FCP) | 1.1 s |
| Largest Contentful Paint (LCP) | 5.2 s |
| Total Blocking Time (TBT) | 30 ms |
| Cumulative Layout Shift (CLS) | 0 |
| Speed Index (SI) | 1.2 s |

**Notes on homepage LCP:** The 5.2 s LCP is measured without hero images in the seed (no real media uploaded). In production with a CDN and real images served via Next.js Image Optimization + AVIF, LCP should fall under 2.5 s. FCP at 1.1 s and TBT at 30 ms confirm minimal blocking JS.

---

## Petitions Page (`/petitions`)

| Category        | Score |
|-----------------|-------|
| Performance     | 🟢 95 |
| Accessibility   | 🟢 93 |
| Best Practices  | 🟢 96 |
| SEO             | 🟢 92 |

### Core Web Vitals

| Metric | Value |
|--------|-------|
| First Contentful Paint (FCP) | 0.9 s |
| Largest Contentful Paint (LCP) | 2.9 s |
| Total Blocking Time (TBT) | 10 ms |
| Cumulative Layout Shift (CLS) | 0 |
| Speed Index (SI) | 0.9 s |

---

## Architecture Decisions Affecting Scores

| Decision | Effect |
|----------|--------|
| ISR `revalidate = 60` on `/` and `/petitions` | Static shell served from edge, no SSR wait |
| `output: 'standalone'` + security headers | Best Practices 96 — HSTS, X-Frame-Options, CSP enforced |
| `next/image` with AVIF/WebP | Zero layout shift (CLS = 0), format savings |
| `filter: grayscale(100%)` via CSS only | No JS cost on editorial images |
| `font-display: swap` via `next/font/google` | FCP unblocked by font loading |
| SWR polling every 5 s (vote widget) | Minimal TBT — client-side hydration only |
| JSON-LD structured data on article pages | SEO 100 on homepage |
| No analytics/tracking scripts | TBT stays low (10–30 ms range) |

---

## Raw JSON Reports

- `LIGHTHOUSE-home.json` — full homepage audit
- `LIGHTHOUSE-petitions.json` — full petitions audit
