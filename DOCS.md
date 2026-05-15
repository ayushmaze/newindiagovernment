# The New India Government — Complete Project Documentation

> **Independent fact-checking and citizen journalism for a better India.**  
> Built with Next.js 16, Payload CMS 3, PostgreSQL 16, Tailwind CSS 4 and deployed locally via Lando.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Local Development — Quick Start](#3-local-development--quick-start)
4. [All URLs & Credentials](#4-all-urls--credentials)
5. [Codebase Architecture](#5-codebase-architecture)
6. [Collections (Database Schema)](#6-collections-database-schema)
7. [Pages & Routes](#7-pages--routes)
8. [API Endpoints](#8-api-endpoints)
9. [Features Deep-Dive](#9-features-deep-dive)
10. [Admin Panel Guide](#10-admin-panel-guide)
11. [Posting News Through AI (MCP)](#11-posting-news-through-ai-mcp)
12. [Setting Up Claude Code with MCP](#12-setting-up-claude-code-with-mcp)
13. [Environment Variables Reference](#13-environment-variables-reference)
14. [Production Deployment](#14-production-deployment)
15. [Security Architecture](#15-security-architecture)
16. [Troubleshooting & Known Fixes](#16-troubleshooting--known-fixes)

---

## 1. Project Overview

**The New India Government** is a civic-journalism platform. It is a newspaper-style website where:

- Editors and AI agents **publish fact-checked articles** in six editorial categories
- Citizens **cast live votes** on whether it is time for a new government
- Citizens **sign petitions** targeted at specific government bodies
- Citizens **share their voice** in a moderated public wall
- A scrolling **ticker** shows fact-check credibility scores in real time
- The admin panel doubles as an **AI content studio** via a built-in MCP server that any Claude (or compatible) agent can call to create, update, and manage all content

The design deliberately mimics a broadsheet newspaper — serif display fonts, tight leading, a restrained ink-and-lavender palette, and an editorial layout grid.

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend framework | Next.js | 16.2.x |
| Rendering | React | 19 |
| CMS / backend | Payload CMS | 3.84.x |
| Database | PostgreSQL | 16 |
| ORM / adapter | `@payloadcms/db-postgres` | 3.84.x |
| Rich text editor | Lexical | (via Payload) |
| CSS framework | Tailwind CSS | 4.x |
| CSS bundler | Turbopack (dev) | via Next.js |
| Native image processing | sharp | 0.33.x |
| Email catcher (dev) | Mailpit | latest |
| Local orchestration | Lando | v3.26.x |
| Container runtime | Docker Desktop | ≥ 4.37.x |
| Package manager | pnpm | 9.x |
| Bot protection | Cloudflare Turnstile | (via `@marsidev/react-turnstile`) |
| AI content API | `@payloadcms/plugin-mcp` | 3.84.x |
| Data fetching (client) | SWR | 2.x |
| Language | TypeScript | 5.9.x |

---

## 3. Local Development — Quick Start

### Prerequisites

- **macOS** (arm64 tested; x86 should work)
- **Docker Desktop** ≥ 4.37 installed and running
- **Lando** v3 installed (`~/.lando/bin/lando`)
- **pnpm** 9 installed globally (`npm i -g pnpm@9`)
- Your user must be in the macOS `admin` group

```bash
# Check if you are in the admin group
dscacheutil -q group -a name admin | grep users

# If not, add yourself (requires sudo)
sudo dscl . -append /Groups/admin GroupMembership $(whoami)
```

### First-time setup

```bash
# 1 — Clone and enter the project
git clone <repo-url> thenewindiagoverment
cd thenewindiagoverment

# 2 — Update the lockfile to include Linux binaries (needed inside Docker)
#     This is already done — just run install to confirm
pnpm install

# 3 — Start the full stack
lando start
# Takes ~2 minutes the first time (Docker images pulled, pnpm install runs inside)

# 4 — Seed the database with demo content
lando seed
```

After the seed completes you will see:

```
SEED COMPLETE
Admin URL:      https://newindiagoverment.lndo.site/admin
Admin email:    admin@thenewindiagov.test
Admin password: ChangeMe!2026
Cowork API key: <generated key>
```

### Daily workflow

```bash
lando start          # start the stack
lando stop           # pause containers (data is preserved)
lando rebuild        # rebuild containers after config changes
lando destroy        # wipe everything (containers + volumes)
lando seed           # re-seed / top-up demo content (idempotent)
lando pnpm <cmd>     # run any pnpm command inside the container
lando psql           # open a psql shell against the payload database
lando tsc            # TypeScript type-check
lando test           # run Vitest unit tests
lando build          # production build (inside container)
```

### Useful Lando shortcuts

```bash
lando logs -s app --follow      # tail the Next.js dev server logs
lando logs -s db --follow       # tail postgres logs
lando logs -s mailpit --follow  # tail Mailpit SMTP logs
```

---

## 4. All URLs & Credentials

### Local development URLs

| URL | What it is |
|-----|-----------|
| `https://newindiagoverment.lndo.site/` | Homepage |
| `https://newindiagoverment.lndo.site/admin` | Payload CMS admin panel |
| `https://newindiagoverment.lndo.site/category/fact-check` | Category: Fact-Check |
| `https://newindiagoverment.lndo.site/category/policy` | Category: Policy |
| `https://newindiagoverment.lndo.site/category/elections` | Category: Elections |
| `https://newindiagoverment.lndo.site/category/leaders` | Category: Leaders |
| `https://newindiagoverment.lndo.site/category/investigations` | Category: Investigations |
| `https://newindiagoverment.lndo.site/category/opinion` | Category: Opinion |
| `https://newindiagoverment.lndo.site/petitions` | All active petitions |
| `https://newindiagoverment.lndo.site/voices` | Wall of citizen voices |
| `https://newindiagoverment.lndo.site/search?q=<term>` | Full-text search |
| `https://newindiagoverment.lndo.site/about` | About page |
| `https://newindiagoverment.lndo.site/sitemap.xml` | Auto-generated sitemap |
| `https://newindiagoverment.lndo.site/robots.txt` | Robots file |
| `http://localhost:8025` | Mailpit email UI (view test emails) |
| `localhost:5433` | PostgreSQL (external port for DB tools) |

### Admin credentials (seeded)

| Field | Value |
|-------|-------|
| URL | `https://newindiagoverment.lndo.site/admin` |
| Email | `admin@thenewindiagov.test` |
| Password | `ChangeMe!2026` |
| Role | Admin (full access) |

### All seeded users

| Email | Password | Role | Capabilities |
|-------|----------|------|-------------|
| `admin@thenewindiagov.test` | `ChangeMe!2026` | Admin | Everything — create, edit, delete, moderate |
| `editor@thenewindiagov.test` | `Cowork!2026SecurePassword` | Editor | Create & edit articles, petitions |
| `moderator@thenewindiagov.test` | `Cowork!2026SecurePassword` | Moderator | Approve/reject voices, view signatures |
| `cowork@thenewindiagov.test` | (API key only) | Cowork | AI agent API access via MCP |

> **Get the Cowork API key:** After `lando seed`, check the seed output or run:
> ```bash
> lando psql
> SELECT api_key FROM users WHERE role = 'cowork';
> \q
> ```
> Or enable API key in the admin panel: Admin → Users → cowork → enable "API Key".

### Database connection (for DB tools like TablePlus, DBeaver)

| Field | Value |
|-------|-------|
| Host | `127.0.0.1` |
| Port | `5433` |
| Database | `payload` |
| Username | `payload` |
| Password | `payload` |

---

## 5. Codebase Architecture

```
thenewindiagoverment/
│
├── .lando.yml                  ← Lando dev environment config (Docker orchestration)
├── next.config.mjs             ← Next.js config (CSP, image domains, allowed origins)
├── package.json                ← Dependencies + pnpm supportedArchitectures
├── pnpm-lock.yaml              ← Lockfile (includes linux-arm64 binaries for Docker)
├── tsconfig.json               ← TypeScript config
├── config/
│   ├── postgres.conf           ← Custom PostgreSQL config
│   └── postgres-init.sql       ← Idempotent role/privilege setup (auto-runs on fresh DB)
│
└── src/
    ├── payload.config.ts       ← MAIN: Payload CMS configuration + MCP plugin
    │
    ├── collections/            ← Database collections (one file = one table)
    │   ├── Articles.ts
    │   ├── Authors.ts
    │   ├── Categories.ts
    │   ├── Tags.ts
    │   ├── Media.ts
    │   ├── Petitions.ts
    │   ├── PetitionSignatures.ts
    │   ├── Votes.ts
    │   ├── Voices.ts
    │   ├── TickerItems.ts
    │   ├── AdBanners.ts
    │   ├── NewsletterSubscribers.ts
    │   └── Users.ts
    │
    ├── globals/
    │   └── SiteSettings.ts     ← Site-wide settings (vote question, tagline, etc.)
    │
    ├── access/                 ← Reusable Payload access-control functions
    │   ├── isAdmin.ts          ← True only for role=admin
    │   ├── isAdminOrEditor.ts  ← True for admin or editor
    │   ├── isAdminOrSelf.ts    ← True for admin, or the user themselves
    │   └── publicRead.ts       ← True always (public read)
    │
    ├── hooks/
    │   └── revalidateAfterChange.ts  ← After DB write → calls /api/revalidate → clears Next.js cache
    │
    ├── lib/                    ← Shared utilities
    │   ├── format.ts           ← Date formatting helpers
    │   ├── hash.ts             ← SHA-256 (used for voter dedup hashes)
    │   ├── ratelimit.ts        ← In-memory token-bucket rate limiter
    │   ├── seo.ts              ← generateBaseMetadata / generateArticleMetadata
    │   └── turnstile.ts        ← Cloudflare Turnstile server-side verification
    │
    ├── seed/
    │   └── seed.ts             ← Idempotent demo-data seeder
    │
    ├── app/
    │   ├── globals.css         ← CSS custom properties (design tokens) + Tailwind
    │   ├── fonts.ts            ← Font definitions (display, ui, body)
    │   ├── robots.ts           ← /robots.txt route
    │   ├── sitemap.ts          ← /sitemap.xml route (dynamic, from DB)
    │   │
    │   ├── (frontend)/         ← Public-facing website (Next.js route group)
    │   │   ├── layout.tsx      ← Masthead + Ticker + Nav + Footer wrapper
    │   │   ├── page.tsx        ← Homepage
    │   │   ├── about/page.tsx
    │   │   ├── search/page.tsx
    │   │   ├── petitions/page.tsx
    │   │   ├── voices/page.tsx
    │   │   ├── article/[slug]/page.tsx
    │   │   ├── category/[slug]/page.tsx
    │   │   └── petition/[slug]/page.tsx
    │   │
    │   ├── (payload)/          ← Payload CMS admin panel (Next.js route group)
    │   │   └── admin/[[...segments]]/page.tsx
    │   │
    │   └── api/                ← REST API routes
    │       ├── [...slug]/route.ts          ← Payload's built-in REST & GraphQL API
    │       ├── vote/route.ts               ← GET live vote tallies / POST cast a vote
    │       ├── voice/route.ts              ← POST submit a voice
    │       ├── newsletter/subscribe/route.ts ← POST subscribe email
    │       ├── petition/sign/route.ts      ← POST sign a petition
    │       └── revalidate/route.ts         ← POST clear Next.js page cache
    │
    └── components/
        ├── ads/SideBanner.tsx
        ├── article/
        │   ├── ArticleCard.tsx     ← Reusable article card (3 variants: left/right/default)
        │   ├── EditorialImage.tsx  ← Next.js Image wrapper
        │   └── FeaturedHero.tsx    ← Large homepage hero article
        ├── grid/HomeGrid.tsx       ← 3-column editorial grid layout
        ├── masthead/
        │   ├── Badge.tsx           ← The ornate chakra badge SVG
        │   └── Masthead.tsx        ← Full newspaper masthead header
        ├── nav/PrimaryNav.tsx      ← Category navigation bar
        ├── newsletter/SignupCard.tsx
        ├── petition/
        │   ├── PetitionCard.tsx    ← Petition summary card with progress bar
        │   └── SignForm.tsx        ← Petition signing form (client component)
        ├── ticker/FactCheckTicker.tsx ← Scrolling fact-check score marquee
        ├── ui/Divider.tsx
        └── vote/
            ├── VoteWidget.tsx      ← Live poll (client component, SSE tally via SWR)
            └── VoiceModal.tsx      ← Post-vote popup: share your opinion
```

---

## 6. Collections (Database Schema)

Each collection in `src/collections/` maps to a PostgreSQL table managed automatically by Payload. Payload auto-applies schema changes in development (`push: true`).

### Articles

The heart of the site. Supports drafts, autosave, and versioning.

| Field | Type | Notes |
|-------|------|-------|
| `title` | text (localized) | Max 180 chars |
| `slug` | text (unique) | URL slug, kebab-case |
| `kicker` | text (localized) | e.g. "FACT-CHECK", "INVESTIGATION" |
| `excerpt` | textarea (localized) | Max 320 chars — shown in cards |
| `heroImage` | upload → Media | Optional |
| `body` | richText (Lexical) | Full article body |
| `category` | relationship → Categories | Required |
| `tags` | relationship → Tags | Many |
| `author` | relationship → Authors | Required |
| `credibilityScore` | number (0–10) | Shown in ticker; 10 = fully accurate |
| `sources` | array of {label, url} | Linked citations |
| `featured` | checkbox | Shows in homepage hero |
| `placement` | select | `feed` / `homepage-left` / `homepage-right` / `homepage-hero` |
| `status` | select | `draft` / `published` / `archived` |
| `publishedAt` | date | |
| `seo` | group | metaTitle, metaDescription, ogImage |

**Access:** Public read of published articles. Admin + Editor can create/edit. Only Admin can delete.

**Hook:** After every save → calls `POST /api/revalidate?tag=article` → Next.js clears the `article` cache tag.

---

### Categories

The six editorial sections.

| Field | Type |
|-------|------|
| `name` | text |
| `slug` | text (unique) |
| `description` | textarea |
| `accentColor` | text (hex) |

**Seeded slugs:** `fact-check`, `policy`, `elections`, `leaders`, `investigations`, `opinion`

---

### Authors

Journalist/contributor profiles.

| Field | Type |
|-------|------|
| `name` | text |
| `slug` | text (unique) |
| `bio` | textarea |
| `avatar` | upload → Media |
| `twitter` | text |
| `email` | email |

**Seeded authors:** Priya Sharma, Rahul Menon, Ananya Krishnan, Vikram Joshi

---

### Tags

Free-form keyword tags attached to articles.

| Field | Type |
|-------|------|
| `name` | text |
| `slug` | text (unique) |

---

### Media

File/image uploads. Processed by `sharp` on upload to generate sized variants: `thumbnail`, `card`, `hero`.

**Access:** Public read. Admin + Editor can upload.

---

### Petitions

Public civic petitions targeted at government bodies.

| Field | Type | Notes |
|-------|------|-------|
| `title` | text | |
| `slug` | text (unique) | |
| `summary` | textarea | Shown in cards |
| `body` | richText | Full petition text |
| `target` | text | e.g. "Prime Minister's Office" |
| `goalSignatures` | number | Default 1000 |
| `currentSignatures` | number | Auto-updated by signature hook |
| `heroImage` | upload → Media | |
| `status` | select | `active` / `closed` / `draft` |

---

### PetitionSignatures

Each signature on a petition.

| Field | Type | Notes |
|-------|------|-------|
| `petition` | relationship → Petitions | |
| `firstName` | text | Max 60 chars |
| `lastName` | text | Max 60 chars |
| `city` | text | |
| `country` | text | Default "India" |
| `voterHash` | text (unique) | SHA-256(salt + petitionId + IP + UA) for dedup |
| `comment` | textarea | Optional public comment |
| `displayPublic` | checkbox | If true, shown on petition page |
| `verified` | checkbox | Default true |

**Hook:** After each new signature → recounts and updates `petition.currentSignatures`.

**Access:** Admin + Moderator only (signatures are private). Public `create` for the sign API.

---

### Votes

Each cast vote on the main poll.

| Field | Type | Notes |
|-------|------|-------|
| `option` | text | e.g. `yes-time-for-change` |
| `voterHash` | text (unique) | SHA-256(salt + IP + UA) — one vote per device |
| `userAgent` | text | |
| `ipCountry` | text | From Cloudflare header |

**Access:** Admin read only. Public create (via API).

---

### Voices

Citizen statements on the Wall of Voices.

| Field | Type | Notes |
|-------|------|-------|
| `text` | textarea | Max 1000 chars |
| `displayName` | text | Optional, defaults to "Anonymous" |
| `status` | select | `pending` / `approved` / `rejected` |
| `voteOption` | select | Optional — links voice to poll position |

**Access:** Admin + Moderator can read/moderate. Public create (via API). Only approved voices appear on the wall.

---

### TickerItems

Items shown in the scrolling fact-check ticker at the top of every page.

| Field | Type | Notes |
|-------|------|-------|
| `claim` | text | Short government claim to evaluate |
| `verdict` | select | `misleading` / `false` / `mostly-false` / `mixed` / `true` |
| `credibilityScore` | number (0–10) | |
| `linkedArticle` | relationship → Articles | Click through to full article |
| `active` | checkbox | Show/hide without deleting |
| `order` | number | Display order (ascending) |

---

### AdBanners

Promotional banners (sponsorships, campaigns).

| Field | Type | Options |
|-------|------|---------|
| `label` | text | |
| `image` | upload → Media | |
| `link` | text | URL |
| `placement` | select | `homepage-left` / `homepage-right` / `article-inline` |
| `active` | checkbox | |

---

### NewsletterSubscribers

Email newsletter sign-ups.

| Field | Type |
|-------|------|
| `email` | email (unique) |
| `source` | text (default: "homepage") |

**Access:** Admin read only. Public create (via API). Deduplication by email.

---

### Users

Internal staff accounts.

| Field | Type | Options |
|-------|------|---------|
| `email` | email | |
| `password` | (hashed) | |
| `role` | select | `admin` / `editor` / `moderator` / `cowork` |
| `apiKey` | text | Auto-generated by Payload when enabled |

**Roles:**
- **Admin** — Full access to everything
- **Editor** — Create and edit articles, petitions
- **Moderator** — Approve/reject voices, view petition signatures
- **Cowork** — API-key only access for AI agents via MCP

---

### SiteSettings (Global)

Site-wide configuration stored as a single record in the DB.

| Field | Default value | What it controls |
|-------|--------------|-----------------|
| `siteName` | "The New India Government" | |
| `tagline` | "Truth · Transparency · Voice" | Shown in masthead + footer |
| `badgeText` | "THE CITIZEN'S PRESS" | |
| `cityLine` | "NEW DELHI · MUMBAI · BENGALURU" | |
| `voteQuestion` | "Is it time for a new India government?" | The poll question |
| `voteOptions` | YES / NO / UNDECIDED | The 3 poll buttons |
| `footer.aboutText` | — | Footer description |
| `footer.links` | — | Footer link array |

Edit at: **Admin → Site Settings**

---

## 7. Pages & Routes

### Frontend pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `page.tsx` | Homepage: 3-column grid, poll, active petitions |
| `/about` | `about/page.tsx` | About the publication |
| `/search?q=<term>` | `search/page.tsx` | Full-text article search |
| `/petitions` | `petitions/page.tsx` | All active petitions list |
| `/voices` | `voices/page.tsx` | Wall of approved citizen voices |
| `/category/[slug]` | `category/page.tsx` | Articles filtered by category |
| `/article/[slug]` | `article/page.tsx` | Full article, related stories, credibility score |
| `/petition/[slug]` | `petition/page.tsx` | Petition detail + sign form + signers |
| `/admin/*` | Payload panel | CMS admin interface |
| `/sitemap.xml` | `sitemap.ts` | Auto-generated XML sitemap |
| `/robots.txt` | `robots.ts` | Disallows /admin and /api |

### Layout components on every page

Every frontend page is wrapped in `(frontend)/layout.tsx` which renders:

1. **Masthead** — Newspaper-style header with title, date, ornament
2. **FactCheckTicker** — Scrolling marquee of fact-check scores
3. **PrimaryNav** — Category navigation bar
4. **{children}** — Page content
5. **Footer** — Links, copyright

---

## 8. API Endpoints

### Built-in Payload REST API

Payload automatically exposes a full REST API at `/api/<collection>`:

```
GET    /api/articles          ← List articles (public)
GET    /api/articles/:id      ← Get one article
POST   /api/articles          ← Create (requires auth)
PATCH  /api/articles/:id      ← Update (requires auth)
DELETE /api/articles/:id      ← Delete (admin only)
POST   /api/users/login       ← Login → JWT cookie
POST   /api/users/logout
GET    /api/globals/site-settings
```

### Custom public-facing API routes

#### `GET /api/vote`
Returns live poll tallies.

```json
{
  "totals": {
    "yes-time-for-change": 142,
    "no-current-fine": 51,
    "undecided": 23
  },
  "total": 216
}
```

#### `POST /api/vote`
Cast a vote.

```json
// Request
{ "option": "yes-time-for-change", "turnstileToken": "<token>" }

// Response (success)
{ "ok": true }

// Response (already voted — same device)
{ "ok": true, "already": true }   // HTTP 409
```

Rate-limited: 10 requests/minute per IP. Deduplicated by `SHA256(salt + IP + UA)`.

#### `POST /api/voice`
Submit a voice to the Wall of Voices (goes to `pending`, needs moderator approval).

```json
// Request
{
  "text": "The government must be honest about economic data.",
  "displayName": "Ravi Kumar",       // optional
  "option": "yes-time-for-change",   // optional, links to poll vote
  "turnstileToken": "<token>"
}

// Response
{ "ok": true }
```

#### `POST /api/newsletter/subscribe`
Subscribe to the newsletter.

```json
// Request
{ "email": "citizen@example.com" }

// Response (success or already subscribed)
{ "ok": true }
{ "ok": true, "already": true }
```

#### `POST /api/petition/sign`
Sign a petition.

```json
// Request
{
  "petitionId": 1,            // numeric ID or string "1"
  "firstName": "Priya",
  "lastName": "Sharma",
  "city": "Mumbai",           // optional
  "comment": "Support this!", // optional
  "displayPublic": true,      // optional, default true
  "turnstileToken": "<token>"
}

// Response
{ "ok": true }
{ "ok": true, "already": true }  // already signed from same device
```

#### `POST /api/revalidate?tag=<tag>&secret=<secret>`
Clears the Next.js cache for a specific tag. Called automatically by Payload hooks when content is saved.

```bash
curl -X POST "https://newindiagoverment.lndo.site/api/revalidate?tag=article&secret=c4e7f0a9..."
```

#### `POST /api/mcp` (built by `@payloadcms/plugin-mcp`)
The AI content API. See Section 11 for full details.

---

## 9. Features Deep-Dive

### Fact-Check Ticker

A continuous horizontal marquee of claims and their credibility scores (0–10). Rendered server-side on every page load. Clicking a claim navigates to the linked article.

**To add a ticker item:** Admin → Ticker Items → Add New  
Or via AI: see Section 11.

---

### The People's Poll

A full-width client-side poll widget on the homepage (`#vote`). Features:
- **Live vote counts** — updates every 5 seconds via SWR polling of `GET /api/vote`
- **Cloudflare Turnstile** protection (invisible challenge, auto-passes in dev)
- **Deduplication** — one vote per device (hashed IP + User-Agent, not stored as plain text)
- **Post-vote modal** — after voting, a dialog invites the user to share their voice (which goes to the Wall of Voices pending moderation)
- **Animated progress bars** — percentage bars animate into view after vote is cast

**Customise the poll question and options:** Admin → Site Settings

---

### Wall of Voices

A masonry two-column grid of approved citizen statements. Voices are colour-coded by poll position (lavender = YES, dark = NO, grey = UNDECIDED).

**Workflow:**
1. Citizen votes → post-vote modal → submits voice
2. Voice saved with `status: pending`
3. Moderator logs in → Admin → Voices → approve or reject
4. Approved voices appear on `/voices`

---

### Petitions

Each petition has:
- A title, summary, and rich-text body
- A progress bar (`currentSignatures / goalSignatures`)
- A "Sign This Petition" sidebar form with Turnstile protection
- A list of recent public signers (name, city, optional comment)
- Signature counts auto-update in the DB after each new signature

---

### Full-text Search

`/search?q=<term>` queries the `articles` table using Payload's built-in search, filtering to `status: published` only. Results are returned server-side and rendered as article cards.

---

### SEO & Structured Data

Every page has:
- `<title>` and `<meta name="description">` set from DB content
- Open Graph and Twitter Card tags
- `NewsArticle` JSON-LD schema on article pages
- `WebSite` + `Organization` JSON-LD on the homepage
- Dynamic `sitemap.xml` covering all articles, petitions, categories
- `robots.txt` allowing all except `/admin` and `/api`

---

### Incremental Static Regeneration (ISR)

Pages use `export const revalidate = 60` — Next.js serves a cached version and regenerates in the background every 60 seconds. Additionally, any save in the Payload admin immediately calls `POST /api/revalidate` to clear the relevant tag so the next visitor always gets the latest content.

---

### Bilingual Support (English / Hindi)

Articles, titles, kickers, and excerpts are marked `localized: true` in the schema. Payload handles locale routing. Hindi translations can be added via the admin panel on any article field.

---

## 10. Admin Panel Guide

### Accessing the panel

Go to `https://newindiagoverment.lndo.site/admin` and sign in with your credentials.

---

### Publishing an article

1. **Admin → Articles → Create New**
2. Fill in:
   - **Title** — The headline (max 180 chars)
   - **Slug** — URL-friendly identifier (`kebab-case`, e.g. `gdp-data-manipulation`)
   - **Kicker** — Short label like `FACT-CHECK` or `INVESTIGATION` (shown in red above headline)
   - **Excerpt** — 1–2 sentence teaser (max 320 chars)
   - **Category** — Select one of the six categories
   - **Author** — Select an author profile
   - **Body** — Full article in the Lexical rich-text editor (headings, lists, blockquotes, links)
   - **Credibility Score** — 0 (misleading) to 10 (accurate) — appears in the ticker
   - **Sources** — Add cited links
   - **Placement** — Set to `homepage-hero` for the lead story, `homepage-left` for the secondary column
   - **Status** — Change from `draft` to `published`
   - **Published At** — Set the date
3. Click **Save** — the page cache is automatically cleared

---

### Moderating voices

1. **Admin → Voices**
2. Filter by `status: pending`
3. Open each voice → change status to `approved` (shows on wall) or `rejected` (hidden)

---

### Managing the ticker

1. **Admin → Ticker Items → Create New**
2. Enter the government claim, select a verdict, enter a credibility score (0–10), optionally link an article
3. Set `active: true` and assign an `order` number
4. Save — appears in the scrolling marquee immediately on next page load

---

### Configuring the site

1. **Admin → Site Settings**
2. Change the vote question, vote options, tagline, footer text

---

## 11. Posting News Through AI (MCP)

The platform ships with `@payloadcms/plugin-mcp` which exposes an **MCP (Model Context Protocol) server** at:

```
https://newindiagoverment.lndo.site/api/mcp
```

Any AI agent (Claude, Cursor, etc.) can connect to this endpoint and use natural language to create, update, and manage all site content without touching the admin panel.

### What the AI can do via MCP

| Collection | Find | Create | Update | Delete |
|------------|------|--------|--------|--------|
| articles | ✅ | ✅ | ✅ | ❌ |
| media | ✅ | ✅ | ❌ | ❌ |
| categories | ✅ | ❌ | ❌ | ❌ |
| authors | ✅ | ❌ | ❌ | ❌ |
| tags | ✅ | ✅ | ❌ | ❌ |
| ticker-items | ✅ | ✅ | ✅ | ✅ |
| voices | ✅ | ❌ | ✅ | ❌ |
| petitions | ✅ | ✅ | ✅ | ❌ |

### Getting the API key

The API key belongs to the `cowork` user (role: Cowork). To get/generate it:

**Option A — via Admin panel (recommended)**
1. Go to `https://newindiagoverment.lndo.site/admin`
2. Sign in as Admin
3. Navigate to **Admin → Users → cowork@thenewindiagov.test**
4. Scroll to **API Key** section → click **Generate Key**
5. Copy the key — it is shown only once

**Option B — via psql**
```bash
lando psql
SELECT api_key FROM users WHERE role = 'cowork';
\q
```

**Option C — from seed output** (run after `lando seed`)
The key is printed in the terminal and written to `.cowork.key`.

---

### Using MCP from a REST client

You can call MCP directly with `curl` to test it:

```bash
# List all published articles
curl -X POST https://newindiagoverment.lndo.site/api/mcp \
  -H "Authorization: Bearer <YOUR_COWORK_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "find-articles",
      "arguments": { "where": { "status": { "equals": "published" } }, "limit": 5 }
    }
  }'
```

```bash
# Create a new article
curl -X POST https://newindiagoverment.lndo.site/api/mcp \
  -H "Authorization: Bearer <YOUR_COWORK_API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/call",
    "params": {
      "name": "create-articles",
      "arguments": {
        "data": {
          "title": "India's Education Budget Fraud Exposed",
          "slug": "education-budget-fraud-exposed",
          "kicker": "INVESTIGATION",
          "excerpt": "Internal ministry documents show the education budget has been systematically underfunded for five years.",
          "category": 5,
          "author": 1,
          "status": "published",
          "publishedAt": "2026-05-13T12:00:00.000Z",
          "placement": "feed",
          "credibilityScore": 8.5
        }
      }
    }
  }'
```

---

## 12. Setting Up Claude Code with MCP

Claude Code can connect to the MCP server and post articles, update the ticker, manage petitions, and more — all through natural language.

### Step 1 — Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
# or
brew install claude-code
```

Authenticate:
```bash
claude login
```

### Step 2 — Add the MCP server to Claude Code

```bash
# Run this command (replace <KEY> with your cowork API key)
claude mcp add new-india-gov \
  --url https://newindiagoverment.lndo.site/api/mcp \
  --header "Authorization: Bearer <YOUR_COWORK_API_KEY>"
```

Or add it manually to `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "new-india-gov": {
      "url": "https://newindiagoverment.lndo.site/api/mcp",
      "headers": {
        "Authorization": "Bearer <YOUR_COWORK_API_KEY>"
      }
    }
  }
}
```

### Step 3 — Use it

Open Claude Code in any directory and start a conversation:

```
claude

> "Publish a new fact-check article about the government's inflation data. 
>  Title: 'RBI Inflation Numbers Don't Match Ground Reality'. 
>  Category: fact-check. Author: Rahul Menon. 
>  Credibility score 3.5. Add it to the homepage left column."
```

Claude will:
1. Call `find-categories` to get the `fact-check` category ID
2. Call `find-authors` to get Rahul Menon's ID
3. Call `create-articles` with all the data
4. Report the published article URL

---

### Step 4 — Example AI workflows

**Daily news briefing:**
```
"Find all articles published in the last 7 days and summarise them in a briefing."
```

**Batch ticker update:**
```
"Add 5 new ticker items for the government's latest claims about GDP, 
 infrastructure spending, and employment. Score each based on available facts."
```

**Petition creation:**
```
"Create a new petition titled 'Demand Full RTI Compliance from SEBI'. 
 Target: Securities and Exchange Board of India. Goal: 5000 signatures."
```

**Voice moderation assistance:**
```
"Find all pending voices and help me decide which ones to approve — 
 show me the text and suggest yes/no for each."
```

---

### Using with Cursor / Windsurf / other MCP clients

Add to your editor's MCP config:

```json
{
  "mcpServers": {
    "new-india-gov": {
      "url": "https://newindiagoverment.lndo.site/api/mcp",
      "headers": {
        "Authorization": "Bearer <YOUR_COWORK_API_KEY>"
      }
    }
  }
}
```

---

## 13. Environment Variables Reference

All environment variables are set in `.lando.yml` for local development. For production, set these in your hosting provider's dashboard.

### Required variables

| Variable | Local dev value | Description |
|----------|----------------|-------------|
| `DATABASE_URI` | `postgres://payload:payload@db/payload` | PostgreSQL connection string |
| `PAYLOAD_SECRET` | `b3f8a2d1...` | 64-char secret for JWT signing. **CHANGE IN PRODUCTION** |
| `PAYLOAD_PUBLIC_SERVER_URL` | `https://newindiagoverment.lndo.site` | Full URL of the site (no trailing slash) |
| `NEXT_PUBLIC_SITE_URL` | `https://newindiagoverment.lndo.site` | Same — used in client-side code |

### Cloudflare Turnstile (bot protection)

| Variable | Local dev value | Description |
|----------|----------------|-------------|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | `1x00000000000000000000AA` | Client-side widget key. Dev value always passes |
| `TURNSTILE_SECRET_KEY` | `1x0000000000000000000000000000000AA` | Server-side verify key. Dev value always passes |

> **Production:** Get real keys from [Cloudflare Turnstile Dashboard](https://dash.cloudflare.com/?to=/:account/turnstile)

### Security tokens

| Variable | Local dev value | Description |
|----------|----------------|-------------|
| `VOTE_SALT` | `b3f8a2d1c4e7f0a9b2c5d8e1f4a7b0c3` | Salt for voter-dedup hashes. Change before launch |
| `REVALIDATE_SECRET` | `c4e7f0a9b2c5d8e1f4a7b0c3d6e9f2a5` | Secret for the cache-revalidation webhook |

### Email / SMTP

| Variable | Local dev value | Description |
|----------|----------------|-------------|
| `SMTP_HOST` | `mailpit` | Dev: Mailpit. Prod: your SMTP provider |
| `SMTP_PORT` | `1025` | Dev: 1025. Prod: 587 (TLS) or 465 (SSL) |
| `SMTP_FROM` | `The New India Government <noreply@newindiagoverment.lndo.site>` | From address |

### Seed credentials

| Variable | Value | Description |
|----------|-------|-------------|
| `SEED_ADMIN_EMAIL` | `admin@thenewindiagov.test` | Admin user created by seed |
| `SEED_ADMIN_PASSWORD` | `ChangeMe!2026` | Admin password. **Change in production** |
| `SEED_COWORK_EMAIL` | `cowork@thenewindiagov.test` | AI agent user |

---

## 14. Production Deployment

### Supported hosting options

The app outputs a **Next.js standalone build** (`output: 'standalone'`), which means it's portable to any Node.js server.

| Platform | Difficulty | Notes |
|----------|-----------|-------|
| **Railway** | ⭐ Easiest | Native Docker + Postgres managed DB |
| **Render** | ⭐ Easiest | Web service + managed Postgres |
| **Fly.io** | ⭐⭐ Medium | Docker-based, global edge |
| **DigitalOcean App Platform** | ⭐⭐ Medium | Managed Postgres included |
| **VPS (any)** | ⭐⭐⭐ Manual | Full control, Docker Compose |
| **Vercel** | ⭐⭐ Medium | Serverless — needs external Postgres |

---

### Option A — Railway (recommended fastest)

1. Create a [Railway](https://railway.app) account and new project
2. Add a **PostgreSQL** database service — copy the `DATABASE_URL`
3. Create a **Web Service** from your GitHub repo
4. Set the build command: `pnpm install && pnpm build`
5. Set the start command: `node .next/standalone/server.js`
6. Add all environment variables (see Section 13)
7. Set `DATABASE_URI` to the Railway Postgres URL
8. Set `PAYLOAD_PUBLIC_SERVER_URL` and `NEXT_PUBLIC_SITE_URL` to your Railway URL
9. Deploy

---

### Option B — VPS with Docker Compose

Create a `docker-compose.prod.yml`:

```yaml
version: '3.9'
services:
  db:
    image: bitnami/postgresql:16
    environment:
      POSTGRESQL_DATABASE: payload
      POSTGRESQL_USERNAME: payload
      POSTGRESQL_PASSWORD: ${DB_PASSWORD}
    volumes:
      - db_data:/bitnami/postgresql
      - ./config/postgres-init.sql:/docker-entrypoint-initdb.d/init.sql
    restart: unless-stopped

  app:
    build: .
    environment:
      DATABASE_URI: postgres://payload:${DB_PASSWORD}@db/payload
      PAYLOAD_SECRET: ${PAYLOAD_SECRET}
      PAYLOAD_PUBLIC_SERVER_URL: https://yourdomain.com
      NEXT_PUBLIC_SITE_URL: https://yourdomain.com
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: ${TURNSTILE_SITE_KEY}
      TURNSTILE_SECRET_KEY: ${TURNSTILE_SECRET}
      VOTE_SALT: ${VOTE_SALT}
      REVALIDATE_SECRET: ${REVALIDATE_SECRET}
      SMTP_HOST: ${SMTP_HOST}
      SMTP_PORT: ${SMTP_PORT}
      SMTP_FROM: ${SMTP_FROM}
      NODE_ENV: production
    ports:
      - "3000:3000"
    depends_on:
      - db
    restart: unless-stopped

volumes:
  db_data:
```

```bash
# Dockerfile (add to project root)
FROM node:22-alpine AS base
RUN npm install -g pnpm@9

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

Deploy:
```bash
# On your VPS
git clone <repo>
cd thenewindiagoverment
cp .env.example .env.production  # fill in all vars
docker compose -f docker-compose.prod.yml up -d

# Run migrations and seed
docker compose exec app node -e "
  const { getPayload } = require('payload');
  // ... or use pnpm seed inside the container
"
```

---

### Option C — Render

1. Create a **PostgreSQL** database on Render → copy the Internal Database URL
2. Create a **Web Service** — connect your GitHub repo
3. Build command: `pnpm install && pnpm build`
4. Start command: `node .next/standalone/server.js`
5. Add environment variables
6. Deploy

---

### Post-deployment checklist

- [ ] Change `PAYLOAD_SECRET` to a new 64-character random string
- [ ] Change all seed passwords
- [ ] Get real Cloudflare Turnstile keys (replace dev test keys)
- [ ] Generate new `VOTE_SALT` and `REVALIDATE_SECRET`
- [ ] Set up a real SMTP provider (Resend, SendGrid, Postmark)
- [ ] Configure your domain/DNS
- [ ] Set up HTTPS (automatic on Railway/Render, or use Caddy/nginx on VPS)
- [ ] Run `pnpm seed` (or equivalent) in production to create admin user
- [ ] Log in and change admin password immediately
- [ ] Generate the Cowork API key for AI agents

---

### Making the MCP available to AI over the internet

Once deployed, your MCP server is at:
```
https://yourdomain.com/api/mcp
```

Update the Claude Code / Cursor config with the production URL and a new API key. No other changes needed — the MCP plugin is built into the app.

---

## 15. Security Architecture

### Cloudflare Turnstile
All user-facing forms (vote, voice, petition sign, newsletter) require a valid Turnstile token. The token is verified server-side before any data is written to the database.

### Voter deduplication
Votes and petition signatures are deduplicated using:
```
SHA-256(VOTE_SALT + petitionId + clientIP + userAgent)
```
The hash is stored; the original IP is never persisted.

### Rate limiting
All POST API endpoints are protected by an in-memory token-bucket rate limiter: **10 requests per minute per IP hash**. Implemented in `src/lib/ratelimit.ts`.

### Content Security Policy
Strict CSP headers on every response:
- `script-src` — self + Cloudflare Challenges only
- `frame-src` — Cloudflare Challenges only
- `img-src` — self + data: + blob: (no remote image domains in production)
- `connect-src` — self + Cloudflare Challenges only

### Access control layers
- **Public routes** — Articles, Categories, Authors, Petitions, Tags: read-only
- **Protected routes** — Voices, Votes, Signatures, Newsletter Subscribers: admin/moderator read
- **Write routes** — Articles/Petitions: Admin + Editor only
- **Admin-only** — Delete any collection, manage users

### Secrets
- `PAYLOAD_SECRET` — used by Payload to sign JWT session cookies (must be 64+ chars in production)
- `REVALIDATE_SECRET` — prevents unauthorised cache flushes
- `VOTE_SALT` — prevents rainbow-table attacks on voter hashes

### robots.txt
Disallows `/admin/` and `/api/` from search engine crawlers.

---

## 16. Troubleshooting & Known Fixes

### Lando won't start — port 5432 already in use
The `portforward: 5433` setting maps to external port 5433. If that fails too:
```bash
# Check what is using the port
lsof -i :5433
# Kill it, or change portforward value in .lando.yml
```

### "User does not have permission to install the build engine"
Your macOS user is not in the `admin` group:
```bash
sudo dscl . -append /Groups/admin GroupMembership $(whoami)
```

### Postgres role "payload" does not exist (fresh `lando destroy` + `lando start`)
This is handled automatically by `config/postgres-init.sql` which is mounted to `/docker-entrypoint-initdb.d/init.sql`. It runs on first DB initialisation and creates the `payload` role idempotently.

If you still hit this error, run manually:
```bash
lando psql  # connects as postgres superuser
# then:
CREATE ROLE payload WITH LOGIN PASSWORD 'payload';
GRANT ALL PRIVILEGES ON DATABASE payload TO payload;
ALTER DATABASE payload OWNER TO payload;
\q
```

### Vote buttons are unclickable
Two possible causes:
1. **Already voted** — clear `localStorage` in your browser (DevTools → Application → Local Storage → delete `ngi:voted`)
2. **Turnstile not loading** — in dev, the widget auto-bypasses. In production, ensure Cloudflare's CDN is reachable and CSP headers allow `challenges.cloudflare.com`

### "Cannot find module lightningcss.linux-arm64-gnu.node"
The `pnpm-lock.yaml` was generated on macOS and is missing Linux binaries. Fix:
```bash
# On your macOS host (not inside container)
pnpm install   # updates lockfile with linux-arm64 binaries
lando rebuild  # reinstalls inside container with new lockfile
```

### Mailpit not running after `lando start`
Confirmed fixed — `command: /mailpit` was added to the mailpit service in `.lando.yml`. If it recurs:
```bash
lando logs -s mailpit
```

### Next.js HMR not working from newindiagoverment.lndo.site
Confirmed fixed — `allowedDevOrigins: ['newindiagoverment.lndo.site']` is in `next.config.mjs`.

### Voices page shows "No voices yet" despite approved voices in DB
Confirmed fixed — `overrideAccess: true` was added to the `payload.find` call in `voices/page.tsx`. The `Voices` collection `read` access is admin-only, so server components need to explicitly override access control.

### Petition signatures not showing on petition page
Same fix — `overrideAccess: true` was added to the `petition-signatures` query in `petition/[slug]/page.tsx`.

### Duplicate vote/petition-sign returns 500 instead of 409
Confirmed fixed — Payload v3 wraps PostgreSQL's `23505` unique-violation error in a `ValidationError`. The catch blocks in `vote/route.ts` and `petition/sign/route.ts` now check for `err.name === 'ValidationError' && /voterHash/.test(String(e))` in addition to the raw `23505` code.

---

## Quick-Reference Card

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  THE NEW INDIA GOVERNMENT — Dev Quick Reference
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  SITE          https://newindiagoverment.lndo.site/
  ADMIN         https://newindiagoverment.lndo.site/admin
  EMAIL UI      http://localhost:8025
  MCP SERVER    https://newindiagoverment.lndo.site/api/mcp

  ADMIN LOGIN
    Email:      admin@thenewindiagov.test
    Password:   ChangeMe!2026

  DATABASE      127.0.0.1:5433 / db=payload / user=payload / pw=payload

  COMMANDS
    lando start           Start everything
    lando stop            Stop containers
    lando rebuild -y      Rebuild after .lando.yml changes
    lando seed            Seed / refresh demo data
    lando pnpm <cmd>      Run pnpm inside container
    lando psql            Open postgres shell
    lando tsc             TypeScript check
    lando test            Run unit tests

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

*Last updated: 2026-05-13 — generated from the running Lando environment.*
