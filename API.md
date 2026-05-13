# API Reference — The New India Government

This document is the authoritative guide for Cowork (Anthropic's AI agent) and external integrations to create, update, and manage content via the REST API and MCP endpoint.

---

## Auth

All write operations require API key authentication. The Cowork user has role `cowork`.

```
Authorization: users API-Key <THE_API_KEY>
Content-Type: application/json
```

- Get the API key from `.cowork.key` after running `pnpm seed`
- Or retrieve it from `/admin` → Users → cowork@thenewindiagov.test → API Key

---

## Base URL

- **Development**: `http://localhost:3000`
- **Production**: `https://<your-domain>`

All API paths are relative to the base URL.

---

## Slug Formatting Rules

Slugs must be:
- lowercase kebab-case
- no special characters except hyphens
- max 100 characters
- unique per collection

Examples:
- `"Government Claims GDP Win"` → `government-claims-gdp-win`
- `"₹500 crore scam"` → `500-crore-scam`

---

## Step 1: Query Categories and Authors

Before creating an article, fetch the IDs of the category and author you want to use.

### List Categories

```bash
curl http://localhost:3000/api/categories?limit=100 \
  -H "Authorization: users API-Key YOUR_API_KEY"
```

Response:
```json
{
  "docs": [
    { "id": "cat_abc123", "name": "Fact-Check", "slug": "fact-check" },
    { "id": "cat_def456", "name": "Investigations", "slug": "investigations" },
    { "id": "cat_ghi789", "name": "Policy", "slug": "policy" },
    { "id": "cat_jkl012", "name": "Elections", "slug": "elections" },
    { "id": "cat_mno345", "name": "Leaders", "slug": "leaders" },
    { "id": "cat_pqr678", "name": "Opinion", "slug": "opinion" }
  ],
  "totalDocs": 6
}
```

### List Authors

```bash
curl http://localhost:3000/api/authors?limit=100 \
  -H "Authorization: users API-Key YOUR_API_KEY"
```

---

## Upload an Image

Upload the hero image first, then reference its `id` when creating an article.

```bash
curl -X POST http://localhost:3000/api/media \
  -H "Authorization: users API-Key YOUR_API_KEY" \
  -F "file=@/path/to/image.jpg" \
  -F "alt=Parliament building, New Delhi"
```

Response:
```json
{
  "doc": {
    "id": "media_xyz789",
    "url": "/media/parliament.jpg",
    "alt": "Parliament building, New Delhi",
    "sizes": {
      "thumbnail": { "url": "/media/parliament-400x400.webp" },
      "card": { "url": "/media/parliament-800x600.webp" },
      "hero": { "url": "/media/parliament-1600x1000.webp" }
    }
  }
}
```

Use `doc.id` as `heroImage` when creating an article.

---

## Create an Article (Full Walkthrough)

### 1. Prepare your content

- Title (max 180 chars)
- Kicker: a short uppercase label like `FACT-CHECK`, `INVESTIGATION`, `EXCLUSIVE`
- Excerpt (max 320 chars) — the summary shown in feeds and SEO meta
- Body: Lexical rich-text JSON (see format below)
- `credibilityScore`: 0–10 (0 = completely misleading, 10 = fully accurate)
- Sources: array of `{ label, url }`

### 2. Create the article

```bash
curl -X POST http://localhost:3000/api/articles \
  -H "Authorization: users API-Key YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Government Claims 8% GDP Growth — Data Shows 4.2%",
    "slug": "government-claims-8-percent-gdp-growth",
    "kicker": "FACT-CHECK",
    "excerpt": "The Prime Minister claimed 8% GDP growth in his Independence Day speech. NSO data, CMIE estimates, and World Bank projections all point to 4.2%. We fact-check the claim.",
    "heroImage": "media_xyz789",
    "body": {
      "root": {
        "type": "root",
        "children": [
          {
            "type": "heading",
            "tag": "h2",
            "children": [{ "type": "text", "text": "The Claim", "version": 1 }],
            "version": 1
          },
          {
            "type": "paragraph",
            "children": [{ "type": "text", "text": "On August 15, 2026, the Prime Minister stated that India achieved 8% GDP growth.", "version": 1 }],
            "version": 1
          },
          {
            "type": "heading",
            "tag": "h2",
            "children": [{ "type": "text", "text": "The Facts", "version": 1 }],
            "version": 1
          },
          {
            "type": "paragraph",
            "children": [
              { "type": "text", "text": "NSO data released in May 2026 shows ", "version": 1 },
              { "type": "text", "text": "real GDP growth of 4.2%", "format": 1, "version": 1 },
              { "type": "text", "text": " for Q4 FY2026.", "version": 1 }
            ],
            "version": 1
          }
        ],
        "direction": null,
        "format": "",
        "indent": 0,
        "version": 1
      }
    },
    "category": "cat_abc123",
    "author": "author_id_here",
    "tags": ["tag_gdp_id"],
    "credibilityScore": 2.5,
    "sources": [
      { "label": "NSO Press Release May 2026", "url": "https://mospi.gov.in/press-release" },
      { "label": "World Bank India Economic Monitor", "url": "https://worldbank.org/india" }
    ],
    "featured": false,
    "placement": "homepage-hero",
    "status": "published",
    "publishedAt": "2026-05-12T06:00:00.000Z"
  }'
```

### 3. Trigger on-demand revalidation (optional — auto-fires on save)

```bash
curl -X POST "http://localhost:3000/api/revalidate?tag=article&secret=YOUR_REVALIDATE_SECRET"
```

---

## Update an Article

```bash
curl -X PATCH http://localhost:3000/api/articles/ARTICLE_ID \
  -H "Authorization: users API-Key YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "credibilityScore": 3.1, "status": "published" }'
```

---

## Add a Ticker Item

```bash
curl -X POST http://localhost:3000/api/ticker-items \
  -H "Authorization: users API-Key YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "claim": "India creates 1 crore jobs per year claim",
    "credibilityScore": 1.8,
    "verdict": "false",
    "active": true,
    "order": 5
  }'
```

Verdict options: `misleading`, `false`, `mostly-false`, `mixed`, `true`

---

## Approve a Voice

```bash
curl -X PATCH http://localhost:3000/api/voices/VOICE_ID \
  -H "Authorization: users API-Key YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "status": "approved" }'
```

---

## Lexical Rich-Text JSON Format

The `body` field uses Payload's Lexical editor format. Here is a complete example:

```json
{
  "root": {
    "type": "root",
    "children": [
      {
        "type": "heading",
        "tag": "h2",
        "children": [
          { "type": "text", "text": "The Claim", "version": 1 }
        ],
        "version": 1
      },
      {
        "type": "paragraph",
        "children": [
          { "type": "text", "text": "Plain text sentence. ", "version": 1 },
          { "type": "text", "text": "Bold text.", "format": 1, "version": 1 },
          { "type": "text", "text": " And ", "version": 1 },
          { "type": "text", "text": "italic text.", "format": 2, "version": 1 }
        ],
        "version": 1
      },
      {
        "type": "paragraph",
        "children": [
          {
            "type": "link",
            "url": "https://example.com",
            "fields": { "url": "https://example.com" },
            "children": [{ "type": "text", "text": "Link text", "version": 1 }],
            "version": 1
          }
        ],
        "version": 1
      },
      {
        "type": "list",
        "tag": "ul",
        "children": [
          {
            "type": "listitem",
            "children": [{ "type": "text", "text": "First point", "version": 1 }],
            "version": 1
          },
          {
            "type": "listitem",
            "children": [{ "type": "text", "text": "Second point", "version": 1 }],
            "version": 1
          }
        ],
        "version": 1
      },
      {
        "type": "quote",
        "children": [
          { "type": "text", "text": "A quoted passage from a source.", "version": 1 }
        ],
        "version": 1
      }
    ],
    "direction": null,
    "format": "",
    "indent": 0,
    "version": 1
  }
}
```

### Text format flags (bitmask)
- `1` = bold
- `2` = italic
- `4` = underline
- `8` = strikethrough
- `16` = code
- Combine: `3` = bold + italic

---

## Common Errors

| Status | Error | Fix |
|--------|-------|-----|
| `401` | `You are not allowed to perform this action` | Check API key in `Authorization: users API-Key ...` header |
| `400` | `Validation error: slug is required` | Ensure all required fields are present |
| `409` | `Duplicate key` | Slug already exists — use a different slug |
| `404` | `Not Found` | Wrong collection name or ID |
| `500` | `Server error` | Check server logs; likely a DB connection issue |

---

## MCP Usage (Preferred by Cowork)

The MCP endpoint is at `http://localhost:3000/api/mcp`.

### List available tools

```bash
curl -X POST http://localhost:3000/api/mcp \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "jsonrpc": "2.0", "method": "tools/list", "id": 1 }'
```

### Call a tool

```bash
curl -X POST http://localhost:3000/api/mcp \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "id": 2,
    "params": {
      "name": "payload_find_articles",
      "arguments": {
        "where": { "status": { "equals": "published" } },
        "limit": 5,
        "sort": "-publishedAt"
      }
    }
  }'
```

### Connect Cowork as MCP server

1. Copy `cowork.mcp.json` from the repo root
2. Set `COWORK_API_KEY` to the value in `.cowork.key`
3. In **Cowork → Settings → Connectors → Add custom MCP server**, paste the config

---

## Rate Limits

- **Development**: No enforced limits (be polite: ~1 req/s recommended)
- **Production**: In-memory token bucket: ~10 requests/min per IP for public POST endpoints

---

## Workflow Recipe: Fact-Check a Government Claim, Write and Publish an Article

```
1. Government makes a claim (e.g. "8% GDP growth")
2. Cowork receives the claim
3. Cowork fact-checks using external sources (NSO data, World Bank, CMIE)
4. Cowork formats findings as a Lexical JSON body
5. GET /api/categories → find "Fact-Check" category ID
6. GET /api/authors → pick an author ID
7. POST /api/media → upload a relevant B&W image
8. POST /api/articles → create the article with:
   - status: "published"
   - placement: "homepage-hero" or "homepage-left"
   - credibilityScore: determined by fact-check
   - sources: links to all primary sources
9. POST /api/ticker-items → add claim with credibilityScore to the ticker
10. Article appears on homepage within 60 seconds via ISR
    (or instantly if on-demand revalidation fires)
```
