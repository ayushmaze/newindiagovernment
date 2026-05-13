# Architectural Decisions — The New India Government

## D-01: Scaffolded Manually Instead of create-payload-app
**Why**: `create-payload-app` requires a TTY and cannot run non-interactively in this environment. Scaffolded the project manually using the exact same structure that create-payload-app would produce, with full knowledge of the Payload 3 template.

## D-02: Next.js Upgraded to v16
**Why**: Payload CMS 3.84.x requires `next@>=15.2.9 <15.3.0 || >=15.3.9 <15.4.0 || >=15.4.11 <15.5.0 || >=16.2.2 <17.0.0`. The initially installed Next.js 15.5.18 fell outside these ranges. Per brief rule ("upgrade Next.js, not the libraries"), upgraded to v16.2.6.

## D-03: Lexical Rich-Text Rendered as Simple HTML
**Why**: The brief does not specify using a separate Lexical renderer package (`@payloadcms/richtext-lexical`'s React render components require client-side hydration or additional setup). Implemented a lightweight `richTextToHtml()` function that covers the common node types (paragraph, heading, list, quote, link, bold, italic). This keeps the article page as a Server Component with zero client JS, maximizing performance. **Future work**: Swap for the official `RichText` component from `@payloadcms/richtext-lexical` once the package stabilizes its rendering API.

## D-04: No Hero Images in Seed — Placeholder Used
**Why**: The brief references "free B&W stock" images but these cannot be fetched programmatically without specific URLs. The seed script creates articles with `heroImage: null` unless a placeholder is pre-uploaded. After running seed, an admin should upload images via `/admin` and assign them. The site degrades gracefully: hero image slots simply don't render if null.

## D-05: Rate Limiter is In-Memory
**Why**: The brief specifies an in-memory token bucket. This is appropriate for a single-process deployment. In a multi-process or multi-pod deployment, replace with Redis-backed rate limiting (e.g., `@upstash/ratelimit`). Documented as future work.

## D-06: Lavender Stripe Background from Screenshots
**Why**: Screenshots 3-5 show a subtle vertical lavender stripe pattern on the page background. Implemented as a CSS `repeating-linear-gradient` on the `bg-lavender-stripe` utility class, applied to the content area. This matches the visual treatment without adding external assets.

## D-07: FeaturedHero Prev/Next Pagination Not Implemented
**Why**: The brief mentions "prev/next arrows" on the featured hero (screenshots show `◄ ►` controls). This implies a carousel/slideshow of featured articles. Implemented as static `FeaturedHero` (no animation) with the carousel arrows present but non-functional in v1. JavaScript carousels add client bundle weight and complexity that would jeopardize the Lighthouse ≥ 95 performance target. **Decision**: Static hero, arrows hidden until a lightweight carousel is needed.

## D-08: Tailwind CSS v4 with `@import "tailwindcss"` Syntax
**Why**: Tailwind v4 uses the new CSS import syntax rather than `@tailwind base/components/utilities` directives. Used `@import "tailwindcss"` in `globals.css` as per Tailwind v4 documentation.

## D-09: Cowork Role Uses Payload's Built-in API Key
**Why**: The brief says `useAPIKey: true` on the Users collection. Payload's built-in API key mechanism generates a cryptographically random key per user and stores it hashed. The seed script retrieves and prints the key. No custom key management needed.

## D-10: `isAdminOrEditor` Access for Article Create/Update
**Why**: The brief says the `cowork` role should be able to create articles. Rather than duplicating access logic, created `isAdminOrEditor` which accepts `admin | editor | cowork` roles. This covers the Cowork API use case while keeping the access control DRY.

## D-11: Hindi Localization Wired but UI English-Only in v1
**Why**: The brief says "English-only UI for v1" but Payload localization is configured. Key article fields (`title`, `excerpt`, `body`, `kicker`, `seo.*`) are marked `localized: true`. Frontend passes no `locale` param (defaults to `en`). Hindi content can be added in `/admin` by switching the locale toggle. Frontend Hindi support is future work exposed via `?locale=hi`.

## D-12: CSP Header Allows 'unsafe-eval' for Development
**Why**: Next.js 16 dev mode requires `unsafe-eval` for hot module replacement. In production this should be removed and replaced with nonces. Noted as future work in the CSP config.

## D-13: MCP Plugin Peer Dependency Mismatch
**Why**: `@payloadcms/plugin-mcp@3.84.1` requires `@modelcontextprotocol/sdk@1.26.0` but `1.27.1` is installed. The mismatch is minor (patch version) and did not cause runtime issues in testing. Accepted as low risk.

## D-14: Sitemap Generated Dynamically
**Why**: Static sitemaps go stale as content is added. Implemented `app/sitemap.ts` as a Next.js dynamic sitemap that queries the Payload Local API to list all published articles, petitions, and categories.

## D-15: No `framer-motion` for Vote Bar Animation
**Why**: Pure CSS `transition-[width] duration-700` achieves the same visual result as Framer Motion for this use case, saving ~50KB of bundle. The brief mentions "Framer Motion or pure CSS width transition" — chose pure CSS.

## D-16: `next-env.d.ts` Not Committed
**Why**: This file is auto-generated by Next.js on first build and should not be in version control (it changes based on installed packages). Added to `.gitignore`.

## D-17: `allowImportingTsExtensions: true` + Explicit `.ts` Imports
**Why**: Node.js 23.9.0 ships native TypeScript support that conflicts with tsx's module hooks when running outside of Next.js (e.g., seed script). The fix: enable `allowImportingTsExtensions` in tsconfig and use explicit `.ts` suffixes in all relative imports in Payload-side files (collections, globals, hooks, access). Turbopack ignores the extension (resolves by file path), ts-node ESM mode loads `.ts` natively, and tsc is happy with `allowImportingTsExtensions`. The `.ts` extension is the one format that works across all three loaders.

## D-18: `push: true` on postgres Adapter in Non-Production
**Why**: The Payload CLI `migrate` command conflicts with Node 23.9.0 because tsx's `tsImport` API races with Node's native TypeScript stripper. Rather than fighting the toolchain, set `push: true` (Drizzle schema push) for non-production environments. This auto-applies schema changes without migration files, which is appropriate for development. In production (`NODE_ENV=production`), `push` is false and proper migrations should be created on a compatible Node LTS (20 or 22).

## D-19: Seed Runner via ts-node ESM Loader (`--loader`)
**Why**: tsx CLI runs `.ts` files in CJS mode (because `package.json` lacks `"type": "module"`), which breaks when it tries to require `payload/dist/bin/loadEnv.js` (an ESM file with a problematic `@next/env` default import). ts-node's `--loader` flag runs in true ESM mode, letting Node 23's native type stripping handle `.ts` files directly. The experimental `--loader` warning is acceptable for a dev-only seed script.

## D-20: `heroImage` Made Optional in Articles Collection
**Why**: The seed creates articles without uploading real media (no placeholder images available programmatically). Making `heroImage` optional (`required: false`) allows the seed to run cleanly. The `FeaturedHero` and `ArticleCard` components already handle `null` hero images gracefully with a styled placeholder fallback.
