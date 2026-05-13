# Build Progress — The New India Government

## Status: ✅ COMPLETE

---

## Acceptance Checklist

### Infrastructure
- [x] Payload CMS 3 + Next.js 16.2.6 monorepo scaffolded
- [x] PostgreSQL 16 via `@payloadcms/db-postgres`  
- [x] pnpm 9 workspace
- [x] `output: 'standalone'` for Docker compatibility
- [x] Tailwind CSS v4 (`@import "tailwindcss"` syntax)
- [x] TypeScript strict mode — zero `tsc --noEmit` errors

### Collections (13)
- [x] Articles (localized fields, versions, ISR hook, placement select)
- [x] Authors
- [x] Categories
- [x] Tags
- [x] Media (upload, sharp image resizing)
- [x] Petitions (with `currentSignatures` auto-update hook)
- [x] PetitionSignatures (afterChange → updatePetitionCount)
- [x] Votes (SHA-256 voter dedup, no raw IP)
- [x] Voices (moderation: pending/approved/rejected)
- [x] TickerItems
- [x] AdBanners
- [x] NewsletterSubscribers
- [x] Users (role: admin/editor/moderator/cowork, `useAPIKey: true`)

### Global
- [x] SiteSettings (tagline, social links, ticker speed, vote question)

### Design System
- [x] Bodoni Moda (display), Barlow Condensed (UI), Source Serif 4 (body)
- [x] CSS custom properties: `--ink`, `--pink-ticker-bg`, `--lavender-hover`, `--hairline`
- [x] `filter: grayscale(100%) contrast(1.05)` editorial images
- [x] Marquee ticker animation
- [x] Skip-to-content link for accessibility
- [x] Fluid masthead type with `clamp()`

### Pages
- [x] Homepage (`/`) — hero + 5-column feed + vote widget + ticker
- [x] Article page (`/article/[slug]`) — JSON-LD, credibility score, sources
- [x] Category page (`/category/[slug]`)
- [x] Petitions index (`/petitions`) + detail (`/petition/[slug]`)
- [x] Voices wall (`/voices`)
- [x] About page (`/about`)
- [x] Search page (`/search`)

### API Routes
- [x] `GET /api/vote` — live totals
- [x] `POST /api/vote` — rate limit + Turnstile + SHA-256 dedup + 409 on dupe
- [x] `POST /api/voice` — rate limit + Turnstile + moderation queue
- [x] `POST /api/petition/sign` — Turnstile + duplicate check
- [x] `POST /api/newsletter/subscribe`
- [x] `POST /api/revalidate` — on-demand ISR via Payload afterChange hook

### Security
- [x] Cloudflare Turnstile on all public submit forms
- [x] In-memory token bucket rate limiter (10 req/min per IP-hash)
- [x] SHA-256 voter hash — no raw IPs stored
- [x] HSTS, X-Frame-Options: DENY, CSP headers via `next.config.mjs`
- [x] 1-year immutable cache for static assets + media

### MCP / Cowork
- [x] `@payloadcms/plugin-mcp` with per-collection CRUD permissions
- [x] Seed writes `.cowork.key` file with API key
- [x] `cowork.mcp.json` MCP server config generated

### Testing
- [x] Vitest unit tests: `src/lib/hash.ts`, `src/lib/format.ts`
- [x] Playwright e2e smoke: masthead, nav, ticker, vote section
- [x] `vitest.config.ts`, `playwright.config.ts` configured

### Seed Data (idempotent)
- [x] 4 users (admin, editor, moderator, cowork)
- [x] 6 categories
- [x] 4 authors
- [x] 6 tags
- [x] 12 ticker items
- [x] Site settings
- [x] 8 articles (varied placements)
- [x] 3 petitions
- [x] 24 voices (12 approved / 12 pending)

### Documentation
- [x] `DECISIONS.md` — 20 architectural decisions
- [x] `LIGHTHOUSE.md` — Lighthouse audit results
- [x] `API.md` — REST API documentation with curl examples
- [x] `PRIVACY.md` — Privacy policy (no raw IP storage, SHA-256 hashing)
- [x] `.env.example` — all required environment variables

### Lighthouse Scores (production build, localhost)
| Page | Perf | A11y | Best Practices | SEO |
|------|------|------|----------------|-----|
| Homepage | 81 | 95 | 96 | 100 |
| Petitions | 95 | 93 | 96 | 92 |

---

## Known Limitations / Future Work

1. **Homepage LCP 5.2s** — No real hero images in seed. With CDN + AVIF images, expect < 2.5s.
2. **Hindi frontend** — Payload localization wired; UI renders `en` only. Add `?locale=hi` support in v2.
3. **Rate limiter** — In-memory; replace with Redis (Upstash) for multi-process production.
4. **Migration system** — Using `push: true` for dev. In production with Node LTS 20/22, run `pnpm payload migrate:create` + `migrate`.
5. **Carousel hero** — Featured hero arrows present but static. Lightweight carousel in v2.
6. **CSP `unsafe-eval`** — For dev HMR. Production should use nonces.
