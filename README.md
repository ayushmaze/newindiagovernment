# The New India Government

A hybrid news portal + petition platform + voting site built with Payload CMS 3 + Next.js 15.

**Editorial angle:** Revealing facts the government doesn't tell; fact-checking and debunking government claims.

## Stack

- **CMS / Backend / Frontend**: Payload CMS 3 inside Next.js 15 (App Router)
- **Database**: PostgreSQL 16 via `@payloadcms/db-postgres`
- **Package Manager**: pnpm 9
- **Styling**: Tailwind CSS v4
- **Rich Text**: Lexical (Payload default)
- **Bot Protection**: Cloudflare Turnstile
- **Email (dev)**: Mailpit

## Quick Start (Docker)

```bash
git clone <repo> the-new-india-government && cd the-new-india-government
cp .env.example .env.local
docker compose up -d db mailpit
pnpm install
pnpm payload migrate
pnpm seed
pnpm dev
# → http://localhost:3000  •  Admin: /admin
```

Or fully containerized:

```bash
cp .env.example .env.local
docker compose up --build
# In another shell:
docker compose exec app pnpm seed
```

After seed, the console prints:
- Admin login URL + credentials
- Cowork API key (also written to `.cowork.key`)
- Ready-to-paste `cowork.mcp.json` block

## Cowork (AI Agent) Integration

See `API.md` for full REST API documentation with curl examples and Lexical rich-text JSON samples.

### MCP (preferred by Cowork)

Add `cowork.mcp.json` to **Cowork → Settings → Connectors → Add custom MCP server**.

The MCP endpoint is at `http://localhost:3000/api/mcp` (production: `https://<host>/api/mcp`).

## Development

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm start        # Start production server
pnpm seed         # Seed demo content (idempotent)
pnpm test         # Run vitest + Playwright e2e
pnpm lighthouse   # Run Lighthouse CI
pnpm analyze      # Bundle size analysis
```

## Admin Panel

Visit `/admin`. Default credentials after seed:
- **Email**: `admin@thenewindiagov.test`
- **Password**: `ChangeMe!2026`

## Environment Variables

See `.env.example` for all required variables.

## Architecture

- `src/collections/` — Payload collection definitions
- `src/globals/` — Payload global configs
- `src/app/(frontend)/` — Public site routes
- `src/app/(payload)/` — Payload admin routes
- `src/components/` — React components
- `src/seed/` — Seed script

## License

MIT
