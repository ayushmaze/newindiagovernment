# Deploying to Render

This site is hosted on **Render** (free tier, Singapore region). Render
auto-deploys on every push to `main`.

## What's running

| Resource | ID | Plan | Region |
| --- | --- | --- | --- |
| Web service | `srv-d83p1il7vvec73eiiblg` | free (Docker) | Singapore |
| Postgres 16 | `dpg-d83p1377f7vs739ckds0-a` | free | Singapore |

Render service URL: `https://newindiagovernment.onrender.com`
Custom domain target: `https://newindiagovernment.com` (DNS pending)

## DNS records — paste these into GoDaddy

GoDaddy → My Products → DNS → newindiagovernment.com → Add new record.

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| **A** | `@` | `216.24.57.1` | 600 |
| **CNAME** | `www` | `newindiagovernment.onrender.com.` | 600 |

After ~5–30 minutes for DNS propagation, Render's TLS cert provisioning kicks
in automatically. Confirm by visiting `https://newindiagovernment.com`.

GoDaddy specifics:
- The `A` record `Name` field should be `@` (or blank) to mean the apex.
- Delete any existing `A` records for `@` that GoDaddy added by default
  (e.g. parking page IPs) before adding the new one.
- Don't forget the trailing dot on the CNAME value — GoDaddy is lenient
  but it's the canonical form.

## What env vars are set on Render

Real values are configured in the Render service env panel. The vars are:

| Key | Set to |
| --- | --- |
| `DATABASE_URI` | internal Render Postgres connection string |
| `NODE_ENV` | `production` |
| `PORT` | `3000` |
| `PAYLOAD_DB_PUSH` | `1` (first-deploy schema sync) |
| `PAYLOAD_SECRET` | 64-char random (generated at provision) |
| `VOTE_SALT` | 32-char random |
| `REVALIDATE_SECRET` | 32-char random |
| `FACT_CHECK_INGEST_SECRET` | 64-char random |
| `PAYLOAD_PUBLIC_SERVER_URL` | `https://newindiagovernment.com` |
| `NEXT_PUBLIC_SITE_URL` | `https://newindiagovernment.com` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | TEST key (`1x00000000000000000000AA`) |
| `TURNSTILE_SECRET_KEY` | TEST key |
| `SMTP_FROM` | `noreply@newindiagovernment.com` |
| `SMTP_PORT` | `587` |

Update them in **Render dashboard → service → Environment**, or via the
new Integrations dashboard (`/admin → Globals → Integrations`) — values
saved there override env vars at runtime.

## After first deploy — TODO

1. **Sign in** at `https://newindiagovernment.com/admin`.
   First-time setup creates the admin user via Payload's standard flow.
2. **Open the Integrations dashboard** (`Globals → Integrations`) and
   fill in any keys you'd like to override.
3. **Switch off `PAYLOAD_DB_PUSH`** once you start using migrations
   (see "Migrations" below).

## Migrations (after first deploy)

`PAYLOAD_DB_PUSH=1` is convenient for the first deploy but unsafe long-term
(unrelated schema changes can drop columns). Switch to proper migrations:

```bash
# locally
pnpm payload migrate:create my-migration
# commit the generated file
git add migrations && git commit -m "migration: ..."
git push
```

Then remove `PAYLOAD_DB_PUSH` from the Render env panel. Render's
container starts will run `payload migrate` automatically when wired up
in `pnpm start` (or via Render's "Pre-deploy command").

## Useful Render API commands

```bash
RENDER=rnd_...   # rotate me!
SVC=srv-d83p1il7vvec73eiiblg
DB=dpg-d83p1377f7vs739ckds0-a

# Tail recent logs
curl -s "https://api.render.com/v1/logs?ownerId=tea-d83of7l7vvec73ehr11g&resource=$SVC&limit=200&direction=backward" \
  -H "Authorization: Bearer $RENDER" | jq -r '.logs[]?.message' | tail -100

# Trigger a fresh deploy
curl -X POST "https://api.render.com/v1/services/$SVC/deploys" \
  -H "Authorization: Bearer $RENDER" -H "Content-Type: application/json" \
  -d '{"clearCache":"clear"}'

# Get/update a single env var
curl -X PUT "https://api.render.com/v1/services/$SVC/env-vars/PAYLOAD_SECRET" \
  -H "Authorization: Bearer $RENDER" -H "Content-Type: application/json" \
  -d '{"value":"NEW_VALUE"}'
```

## Cost: $0/month right now

Free tier limits:
- Web: 750 hrs/month, sleeps after 15 min idle (~30s cold start)
- Postgres: 1 GB storage, **deleted after 30 days** of inactivity

Upgrade path when ready:
- Web: `starter` ($7/mo, always-on, 0.5 GB RAM)
- Postgres: `basic-256mb` ($7/mo, persistent, daily backups)
