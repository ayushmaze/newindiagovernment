/**
 * News pipeline orchestration.
 *
 * Stages: seed → ingest (RSS) → dedupe → research (Claude) → draft → queue.
 * Nothing publishes — every story lands as a DRAFT linked to a NewsItem with
 * status 'drafted', awaiting human approval in the admin app.
 *
 * Cost control: `researchLimit` caps how many headlines hit the (paid) Claude
 * web-search call per run.
 */

import crypto from 'crypto'
import type { Payload } from 'payload'
import { fetchFeed } from './rss'
import { researchHeadline } from './research'
import { createArticleFromAgent } from '@/lib/factCheck/persist'

type Leaning = 'neutral' | 'independent' | 'godi-leaning'

const DEFAULT_SOURCES: Array<{
  name: string
  feedUrl: string
  homepage: string
  leaning: Leaning
}> = [
  { name: 'The Hindu — National', feedUrl: 'https://www.thehindu.com/news/national/feeder/default.rss', homepage: 'https://www.thehindu.com', leaning: 'neutral' },
  { name: 'The Indian Express — India', feedUrl: 'https://indianexpress.com/section/india/feed/', homepage: 'https://indianexpress.com', leaning: 'neutral' },
  { name: 'India Today', feedUrl: 'https://www.indiatoday.in/rss/home', homepage: 'https://www.indiatoday.in', leaning: 'neutral' },
  { name: 'Zee News — India', feedUrl: 'https://zeenews.india.com/rss/india-national-news.xml', homepage: 'https://zeenews.india.com', leaning: 'godi-leaning' },
  { name: 'ABP Live — News', feedUrl: 'https://news.abplive.com/home/feed', homepage: 'https://news.abplive.com', leaning: 'godi-leaning' },
  { name: 'BOOM Live (fact-check)', feedUrl: 'https://www.boomlive.in/rss', homepage: 'https://www.boomlive.in', leaning: 'independent' },
  { name: 'Alt News (fact-check)', feedUrl: 'https://www.altnews.in/feed/', homepage: 'https://www.altnews.in', leaning: 'independent' },
]

function dedupeKey(link: string, guid: string): string {
  return crypto.createHash('sha1').update(guid || link).digest('hex').slice(0, 40)
}

/** Ensure a fact-check category exists (persist throws without one) + seed sources. */
export async function ensureSeed(payload: Payload): Promise<void> {
  const cat = await payload.find({
    collection: 'categories',
    where: { slug: { equals: 'fact-check' } },
    limit: 1,
  })
  if (!cat.docs[0]) {
    await payload
      .create({
        collection: 'categories',
        data: { name: 'Fact-Check', slug: 'fact-check' } as never,
      })
      .catch(() => undefined)
  }

  const srcCount = await payload.find({ collection: 'news-sources', limit: 0 })
  if (srcCount.totalDocs === 0) {
    for (const s of DEFAULT_SOURCES) {
      await payload
        .create({ collection: 'news-sources', data: { ...s, active: true, maxPerRun: 8 } as never })
        .catch(() => undefined)
    }
  }
}

export type PipelineSummary = {
  sourcesChecked: number
  itemsIngested: number
  duplicatesSkipped: number
  researched: number
  drafted: number
  errors: number
  details: string[]
}

export async function runPipeline(
  payload: Payload,
  opts: { researchLimit?: number } = {},
): Promise<PipelineSummary> {
  const researchLimit = opts.researchLimit ?? 3
  const summary: PipelineSummary = {
    sourcesChecked: 0,
    itemsIngested: 0,
    duplicatesSkipped: 0,
    researched: 0,
    drafted: 0,
    errors: 0,
    details: [],
  }

  await ensureSeed(payload)

  const sources = await payload.find({
    collection: 'news-sources',
    where: { active: { equals: true } },
    limit: 50,
  })

  // ---- INGEST + DEDUPE ----
  for (const src of sources.docs as Array<Record<string, unknown>>) {
    summary.sourcesChecked++
    const feedUrl = String(src.feedUrl ?? '')
    const max = Number(src.maxPerRun ?? 8)
    const items = await fetchFeed(feedUrl, max)
    for (const it of items) {
      const key = dedupeKey(it.link, it.guid)
      const exists = await payload.find({
        collection: 'news-items',
        where: { dedupeKey: { equals: key } },
        limit: 1,
      })
      if (exists.docs[0]) {
        summary.duplicatesSkipped++
        continue
      }
      await payload
        .create({
          collection: 'news-items',
          data: {
            sourceTitle: it.title.slice(0, 300),
            sourceUrl: it.link,
            sourceName: String(src.name ?? ''),
            source: src.id,
            dedupeKey: key,
            summary: it.summary,
            publishedAtSource: it.published ? new Date(it.published).toISOString() : undefined,
            status: 'new',
            verdict: 'pending',
          } as never,
        })
        .then(() => summary.itemsIngested++)
        .catch(() => undefined)
    }
    await payload
      .update({
        collection: 'news-sources',
        id: src.id as string,
        data: { lastFetchedAt: new Date().toISOString() } as never,
      })
      .catch(() => undefined)
  }

  // ---- RESEARCH + DRAFT (capped) ----
  const queue = await payload.find({
    collection: 'news-items',
    where: { status: { equals: 'new' } },
    sort: '-createdAt',
    limit: researchLimit,
  })

  for (const item of queue.docs as Array<Record<string, unknown>>) {
    const id = item.id as string
    summary.researched++
    await payload
      .update({ collection: 'news-items', id, data: { status: 'researching' } as never })
      .catch(() => undefined)

    // resolve leaning from the linked source
    let leaning: Leaning = 'neutral'
    const srcRel = item.source
    const srcId = typeof srcRel === 'object' && srcRel ? (srcRel as { id?: string }).id : srcRel
    if (srcId) {
      const s = await payload
        .findByID({ collection: 'news-sources', id: String(srcId), depth: 0 })
        .catch(() => null)
      if (s) leaning = ((s as { leaning?: Leaning }).leaning ?? 'neutral') as Leaning
    }

    try {
      const result = await researchHeadline({
        headline: String(item.sourceTitle ?? ''),
        summary: String(item.summary ?? ''),
        sourceName: String(item.sourceName ?? ''),
        sourceUrl: String(item.sourceUrl ?? ''),
        leaning,
      })

      if (!result) {
        summary.errors++
        await payload
          .update({
            collection: 'news-items',
            id,
            data: { status: 'error', pipelineLog: 'Research returned no result.' } as never,
          })
          .catch(() => undefined)
        continue
      }

      const submission = await payload.create({
        collection: 'fact-check-submissions',
        data: { topic: String(item.sourceTitle ?? '').slice(0, 1000), status: 'running' } as never,
      })

      const { id: articleId } = await createArticleFromAgent(payload, result.article, {
        submissionId: String(submission.id),
        model: 'claude-opus-4-7 (news-pipeline)',
        inputTopic: String(item.sourceTitle ?? ''),
        durationMs: 0,
        toolCallCount: 0,
        inputTokens: 0,
        outputTokens: 0,
        cacheReadTokens: 0,
      })

      await payload.update({
        collection: 'fact-check-submissions',
        id: submission.id,
        data: { status: 'completed', verdict: result.verdict, article: Number(articleId) } as never,
      })

      await payload.update({
        collection: 'news-items',
        id,
        data: {
          status: 'drafted',
          verdict: result.verdict,
          route: result.route,
          confidence: result.confidence,
          linkedArticle: articleId,
          pipelineLog: `Drafted via ${result.route}. Verdict: ${result.verdict} (${result.confidence}).`,
        } as never,
      })
      summary.drafted++
      summary.details.push(`✓ ${result.verdict} — ${String(item.sourceTitle ?? '').slice(0, 60)}`)
    } catch (e) {
      summary.errors++
      const msg = e instanceof Error ? e.message : String(e)
      await payload
        .update({
          collection: 'news-items',
          id,
          data: { status: 'error', pipelineLog: msg.slice(0, 500) } as never,
        })
        .catch(() => undefined)
    }
  }

  return summary
}
