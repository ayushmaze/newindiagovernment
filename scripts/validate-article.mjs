#!/usr/bin/env node
/**
 * validate-article — the quality gate that lets a cheap model hit Opus-grade
 * output. Reads a /newsdaily payload JSON and refuses it unless every panel
 * the magazine layout needs is populated and the sourcing rules are met.
 *
 *   node scripts/validate-article.mjs /tmp/newsdaily-<id>.json
 *
 * Exit 0 = passes, safe to POST. Exit 1 = prints a numbered list of exactly
 * what to fix. The skill MUST run this and get exit 0 before filing.
 */

import { readFileSync } from 'node:fs'

const file = process.argv[2]
if (!file) {
  console.error('usage: node scripts/validate-article.mjs <payload.json>')
  process.exit(1)
}

let body
try {
  body = JSON.parse(readFileSync(file, 'utf8'))
} catch (e) {
  console.error(`FAIL: cannot parse ${file}: ${e.message}`)
  process.exit(1)
}

const errors = []
const a = body.article || {}
const VERDICTS = ['true', 'mostly-true', 'mixed', 'misleading', 'false', 'unverifiable']

const countWords = (s) => String(s || '').trim().split(/\s+/).filter(Boolean).length
const urlsIn = (arr, key = 'sources') =>
  (arr || []).flatMap((x) => (x[key] || x.truthSources || []).map((s) => s.url)).filter(Boolean)

// ---- top-level ----
if (!body.topic) errors.push('topic: missing')
if (!a.title) errors.push('article.title: missing')
else if (countWords(a.title) > 12) errors.push(`article.title: ${countWords(a.title)} words (max 12)`)
if (!a.excerpt) errors.push('article.excerpt: missing')
else if (a.excerpt.length > 320) errors.push(`article.excerpt: ${a.excerpt.length} chars (max 320)`)
if (!a.verdict) errors.push('article.verdict: missing')
else if (!VERDICTS.includes(a.verdict)) errors.push(`article.verdict: "${a.verdict}" not in ${VERDICTS.join('|')}`)

// ---- body ----
const bodyWords = countWords(a.bodyMarkdown)
if (bodyWords < 350) errors.push(`article.bodyMarkdown: ${bodyWords} words (min 350)`)
if (a.bodyMarkdown && !/##\s/.test(a.bodyMarkdown)) errors.push('article.bodyMarkdown: needs section headings (## ...)')

// ---- claimVsTruth (required centrepiece) ----
if (!Array.isArray(a.claimVsTruth) || a.claimVsTruth.length < 2)
  errors.push('article.claimVsTruth: need >= 2 entries')
else
  a.claimVsTruth.forEach((c, i) => {
    if (!c.claim) errors.push(`claimVsTruth[${i}].claim: missing`)
    if (!c.truth) errors.push(`claimVsTruth[${i}].truth: missing`)
    if (!(c.truthSources || []).some((s) => s.url)) errors.push(`claimVsTruth[${i}].truthSources: need >= 1 url`)
  })

// ---- timeline / receipts / whatCanBeDone ----
if (!Array.isArray(a.timeline) || a.timeline.length < 3) errors.push('article.timeline: need >= 3 entries')
if (!Array.isArray(a.receipts) || a.receipts.length < 2) errors.push('article.receipts: need >= 2 entries')
else
  a.receipts.forEach((r, i) => {
    if (!r.sourceUrl) errors.push(`receipts[${i}].sourceUrl: missing`)
    if (!['quote', 'stat', 'document', 'screenshot'].includes(r.kind))
      errors.push(`receipts[${i}].kind: "${r.kind}" invalid`)
  })
if (!a.impact || !a.impact.summary) errors.push('article.impact.summary: missing')
if (!a.whatCanBeDone || !a.whatCanBeDone.citizenAction) errors.push('article.whatCanBeDone.citizenAction: missing')

// ---- claims ledger ----
if (!Array.isArray(a.claims) || a.claims.length < 3) errors.push('article.claims: need >= 3 atomic claims')
else
  a.claims.forEach((c, i) => {
    if (!c.claim) errors.push(`claims[${i}].claim: missing`)
    if (!VERDICTS.includes(c.verdict)) errors.push(`claims[${i}].verdict: "${c.verdict}" invalid`)
    if (!(c.sources || []).some((s) => s.url)) errors.push(`claims[${i}].sources: need >= 1 url`)
  })

// ---- sourcing rules ----
const allUrls = new Set([
  ...(a.sources || []).map((s) => s.url),
  ...urlsIn(a.claimVsTruth, 'truthSources'),
  ...urlsIn(a.claims),
  ...(a.receipts || []).map((r) => r.sourceUrl),
])
allUrls.delete(undefined)
allUrls.delete('')
if (!Array.isArray(a.sources) || a.sources.length < 4)
  errors.push(`article.sources: need >= 4 distinct sources (have ${(a.sources || []).length})`)
if (['false', 'misleading'].includes(a.verdict)) {
  const distinctDomains = new Set(
    [...allUrls].map((u) => {
      try {
        return new URL(u).hostname.replace(/^www\./, '')
      } catch {
        return u
      }
    }),
  )
  if (distinctDomains.size < 2)
    errors.push('false/misleading verdict: need >= 2 distinct source domains')
}

// ---- no fabricated placeholder URLs ----
for (const u of allUrls) {
  if (/example\.com|placeholder|your-source|todo/i.test(u)) errors.push(`source url looks fake: ${u}`)
}

if (errors.length) {
  console.error(`FAIL (${errors.length}) — ${file}`)
  errors.forEach((e, i) => console.error(`  ${i + 1}. ${e}`))
  process.exit(1)
}
console.log(`PASS — ${file} (verdict=${a.verdict}, sources=${a.sources.length}, body=${bodyWords}w)`)
process.exit(0)
