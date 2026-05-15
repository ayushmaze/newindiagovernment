/**
 * Runtime accessor for the Integrations global.
 *
 * Pattern:  Integrations global value  →  process.env fallback  →  undefined.
 *
 * The result is cached per process for `CACHE_TTL_MS`. Saving the global
 * invalidates the cache via `afterChange` hook in `payload.config.ts`.
 *
 * This is intentionally tiny — it does NOT depend on Payload's full request
 * cycle so it can be called from API routes, server components, and seed
 * scripts alike. The only requirement is that `getPayload()` works (i.e. the
 * Payload config has been built).
 */

import { getPayload } from 'payload'
import config from '@payload-config'

type IntegrationsDoc = Record<string, unknown>

const CACHE_TTL_MS = 30_000
let cached: { at: number; doc: IntegrationsDoc | null } | null = null

export async function getIntegrations(): Promise<IntegrationsDoc | null> {
  const now = Date.now()
  if (cached && now - cached.at < CACHE_TTL_MS) return cached.doc

  try {
    const payload = await getPayload({ config })
    const doc = (await payload.findGlobal({ slug: 'integrations', depth: 0 })) as IntegrationsDoc
    cached = { at: now, doc }
    return doc
  } catch {
    // Global may not exist yet during first boot — fall back to env entirely.
    cached = { at: now, doc: null }
    return null
  }
}

export function invalidateIntegrationsCache(): void {
  cached = null
}

/**
 * Read a single integration value. Path is a dot-notation key into the
 * global doc; e.g. `'anthropicApiKey'`. If the doc value is missing,
 * `process.env[envVar]` is returned. If both are missing, returns
 * `undefined`.
 */
export async function getIntegration(
  path: string,
  envVar: string,
): Promise<string | undefined> {
  const doc = await getIntegrations()
  if (doc) {
    const v = path.split('.').reduce<unknown>((acc, k) => {
      if (acc && typeof acc === 'object' && k in (acc as Record<string, unknown>)) {
        return (acc as Record<string, unknown>)[k]
      }
      return undefined
    }, doc)
    if (typeof v === 'string' && v.length > 0) return v
    if (typeof v === 'number') return String(v)
  }
  const fromEnv = process.env[envVar]
  return fromEnv && fromEnv.length > 0 ? fromEnv : undefined
}
