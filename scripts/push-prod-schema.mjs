#!/usr/bin/env node
/**
 * One-shot schema push for the Render Postgres.
 *
 * Payload's Postgres adapter only auto-pushes the schema when
 * NODE_ENV !== 'production'. On Render, NODE_ENV is `production`, so the
 * tables never get created by the running container. This script bypasses
 * that gate: it sets NODE_ENV=development locally and points Payload at
 * the production DATABASE_URI so `pushDevSchema` runs against the remote
 * Postgres. Run once per fresh prod DB:
 *
 *   DATABASE_URI=<render external postgres uri> \
 *   PAYLOAD_SECRET=<anything non-empty, not used> \
 *   node scripts/push-prod-schema.mjs
 *
 * Long-term, generate Payload migrations (`payload migrate:create …`) and
 * commit them — then this script can be retired.
 */

process.env.NODE_ENV = 'development'

if (!process.env.DATABASE_URI) {
  console.error('DATABASE_URI is required')
  process.exit(1)
}
if (!process.env.PAYLOAD_SECRET) {
  process.env.PAYLOAD_SECRET = 'push-schema-only-not-used-at-runtime'
}

const { getPayload } = await import('payload')
const config = (await import('../src/payload.config.ts')).default

console.log('[push-schema] initialising Payload (pushDevSchema will run)…')
const payload = await getPayload({ config })

console.log('[push-schema] OK — collections:', Object.keys(payload.collections).length)
console.log('[push-schema] globals:', payload.config.globals.map((g) => g.slug).join(', '))

// Verify tables exist now
const { execute } = payload.db.drizzle
const result = await execute(
  /** @type any */ ({
    sql: "select table_name from information_schema.tables where table_schema='public' order by table_name",
    args: [],
  }),
).catch(async () => {
  // Different drizzle versions have different APIs — fall back to raw pool
  const pool = /** @type any */ (payload.db).pool
  const r = await pool.query(
    "select table_name from information_schema.tables where table_schema='public' order by table_name",
  )
  return r
})

const rows = result?.rows ?? result ?? []
console.log('[push-schema] tables now in public schema:', rows.length)
for (const r of rows) console.log('  -', r.table_name)

process.exit(0)
