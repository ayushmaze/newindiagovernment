import type { Payload } from 'payload'

/**
 * Persistence helpers: turn the Claude agent's structured output
 * into a Payload article + linked submission row.
 */

// --- Slug ---
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

// --- Verdict -> credibility score map (fallback if agent omits) ---
export function verdictToScore(v: string): number | null {
  switch (v) {
    case 'true': return 10
    case 'mostly-true': return 8
    case 'mixed': return 5
    case 'misleading': return 3
    case 'false': return 1
    default: return null
  }
}

// --- Verdict -> kicker default ---
export function verdictKicker(v: string): string {
  switch (v) {
    case 'true': return 'FACT-CHECK · TRUE'
    case 'mostly-true': return 'FACT-CHECK · MOSTLY TRUE'
    case 'mixed': return 'FACT-CHECK · MIXED'
    case 'misleading': return 'FACT-CHECK · MISLEADING'
    case 'false': return 'FACT-CHECK · FALSE'
    default: return 'FACT-CHECK'
  }
}

/**
 * Convert markdown to a minimal Lexical JSON tree compatible with Payload's
 * lexicalEditor default. We keep it conservative: headings, paragraphs,
 * lists, and inline links. The editor can reformat if needed.
 */
export function markdownToLexical(md: string): unknown {
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  const children: unknown[] = []
  let i = 0

  const textNode = (text: string) => ({
    type: 'text',
    text,
    detail: 0,
    format: 0,
    mode: 'normal',
    style: '',
    version: 1,
  })

  // Inline parser: links [text](url), bold **x**, italic *x*
  const parseInline = (line: string): unknown[] => {
    const out: unknown[] = []
    const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g
    let last = 0
    let m: RegExpExecArray | null
    while ((m = linkRe.exec(line))) {
      if (m.index > last) out.push(textNode(line.slice(last, m.index)))
      out.push({
        type: 'link',
        version: 3,
        fields: { url: m[2], newTab: true, linkType: 'custom' },
        children: [textNode(m[1])],
        direction: 'ltr',
        format: '',
        indent: 0,
      })
      last = m.index + m[0].length
    }
    if (last < line.length) out.push(textNode(line.slice(last)))
    return out.length ? out : [textNode(line)]
  }

  const para = (text: string) => ({
    type: 'paragraph',
    version: 1,
    children: parseInline(text),
    direction: 'ltr',
    format: '',
    indent: 0,
    textFormat: 0,
  })

  const heading = (level: number, text: string) => ({
    type: 'heading',
    tag: `h${Math.min(Math.max(level, 1), 4)}`,
    version: 1,
    children: parseInline(text),
    direction: 'ltr',
    format: '',
    indent: 0,
  })

  const list = (kind: 'bullet' | 'number', items: string[]) => ({
    type: 'list',
    listType: kind,
    start: 1,
    tag: kind === 'bullet' ? 'ul' : 'ol',
    version: 1,
    direction: 'ltr',
    format: '',
    indent: 0,
    children: items.map((text, idx) => ({
      type: 'listitem',
      value: idx + 1,
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      children: parseInline(text),
    })),
  })

  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) { i++; continue }
    // Heading
    const h = /^(#{1,4})\s+(.*)/.exec(line)
    if (h) {
      children.push(heading(h[1].length, h[2].trim()))
      i++
      continue
    }
    // Bullet list
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, '').trim())
        i++
      }
      children.push(list('bullet', items))
      continue
    }
    // Numbered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, '').trim())
        i++
      }
      children.push(list('number', items))
      continue
    }
    // Paragraph (collect contiguous non-blank lines)
    const paraLines: string[] = [line]
    i++
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,4})\s+/.test(lines[i]) &&
      !/^\s*[-*]\s+/.test(lines[i]) &&
      !/^\s*\d+\.\s+/.test(lines[i])
    ) {
      paraLines.push(lines[i])
      i++
    }
    children.push(para(paraLines.join(' ')))
  }

  return {
    root: {
      type: 'root',
      version: 1,
      direction: 'ltr',
      format: '',
      indent: 0,
      children,
    },
  }
}

// ---------------- Article creation ----------------

export interface AgentArticleInput {
  title: string
  kicker?: string
  excerpt: string
  bodyMarkdown: string
  verdict: string
  credibilityScore?: number
  claims: Array<{
    claim: string
    verdict: string
    reasoning?: string
    confidence?: string
    sources: Array<{ label: string; url: string; quote?: string }>
  }>
  sources: Array<{ label: string; url: string }>
  heroImageUrl?: string
  heroImageCredit?: string
  suggestedTags?: string[]

  // ---- Magazine-layout structured sections (all optional but strongly
  //      encouraged — they drive the right/wrong columns, timeline, etc.) ----
  claimVsTruth?: Array<{
    claim: string
    claimSource?: string
    truth: string
    truthSources?: Array<{ label: string; url: string }>
  }>
  whatIsRight?: Array<{
    point: string
    detail: string
    sources?: Array<{ label: string; url: string }>
  }>
  whatIsWrong?: Array<{
    point: string
    detail: string
    sources?: Array<{ label: string; url: string }>
  }>
  timeline?: Array<{
    date: string
    event: string
    sourceLabel?: string
    sourceUrl?: string
  }>
  receipts?: Array<{
    label: string
    kind?: 'quote' | 'stat' | 'document' | 'screenshot'
    content: string
    sourceLabel?: string
    sourceUrl?: string
  }>
  impact?: {
    summary?: string
    whoIsAffected?: Array<{ group: string; how: string }>
    shortTerm?: string
    longTerm?: string
  }
  whatCanBeDone?: {
    citizenAction?: string
    policyAsk?: string
    ourAsk?: string
    callToActionLabel?: string
    callToActionUrl?: string
  }
}

export interface RunMeta {
  submissionId: string
  model: string
  inputTopic: string
  durationMs: number
  toolCallCount: number
  inputTokens: number
  outputTokens: number
  cacheReadTokens: number
}

export async function createArticleFromAgent(
  payload: Payload,
  data: AgentArticleInput,
  meta: RunMeta,
): Promise<{ id: string; slug: string }> {
  // Default category: try "fact-check", else first available
  const factCheckCat = await payload.find({
    collection: 'categories',
    where: { slug: { equals: 'fact-check' } },
    limit: 1,
  })
  const categoryId =
    factCheckCat.docs[0]?.id ??
    (await payload.find({ collection: 'categories', limit: 1 })).docs[0]?.id

  if (!categoryId) {
    throw new Error('No categories exist. Create a "Fact-Check" category in Payload first.')
  }

  // Default author: try "Claude Fact-Check Desk", else first author
  let authorId: string | number | undefined
  const claudeAuthor = await payload.find({
    collection: 'authors',
    where: { slug: { equals: 'claude-fact-check-desk' } },
    limit: 1,
  })
  if (claudeAuthor.docs[0]) {
    authorId = claudeAuthor.docs[0].id
  } else {
    // Try to auto-create the AI desk author
    try {
      const created = await payload.create({
        collection: 'authors',
        data: {
          name: 'Claude Fact-Check Desk',
          slug: 'claude-fact-check-desk',
          bio: 'AI-assisted fact-check articles produced by The New India Government editorial pipeline. Every article is reviewed by a human editor before publish.',
        } as never,
      })
      authorId = created.id
    } catch {
      const fallback = await payload.find({ collection: 'authors', limit: 1 })
      authorId = fallback.docs[0]?.id
    }
  }
  if (!authorId) {
    throw new Error('No authors exist. Create an author in Payload first.')
  }

  // Resolve tags (find or create)
  const tagIds: Array<string | number> = []
  for (const t of (data.suggestedTags ?? []).slice(0, 8)) {
    const tagSlug = slugify(t)
    if (!tagSlug) continue
    const existing = await payload.find({
      collection: 'tags',
      where: { slug: { equals: tagSlug } },
      limit: 1,
    })
    if (existing.docs[0]) {
      tagIds.push(existing.docs[0].id)
      continue
    }
    try {
      const made = await payload.create({
        collection: 'tags',
        data: { name: t, slug: tagSlug } as never,
      })
      tagIds.push(made.id)
    } catch {
      // ignore tag creation failure
    }
  }

  // Unique slug
  const baseSlug = slugify(data.title)
  let slug = baseSlug
  let n = 1
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const clash = await payload.find({
      collection: 'articles',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (!clash.docs[0]) break
    n += 1
    slug = `${baseSlug}-${n}`
    if (n > 30) {
      slug = `${baseSlug}-${Date.now()}`
      break
    }
  }

  const credibility =
    typeof data.credibilityScore === 'number'
      ? data.credibilityScore
      : verdictToScore(data.verdict)

  const article = await payload.create({
    collection: 'articles',
    data: {
      title: data.title,
      slug,
      kicker: data.kicker ?? verdictKicker(data.verdict),
      excerpt: data.excerpt,
      body: markdownToLexical(data.bodyMarkdown),
      category: categoryId,
      tags: tagIds.length ? tagIds : undefined,
      author: authorId,
      credibilityScore: credibility ?? undefined,
      sources: data.sources.map((s) => ({ label: s.label, url: s.url })),
      placement: 'feed',
      status: 'draft',
      generatedBy: 'claude-fact-check',
      reviewStatus: 'review-pending',
      factCheckVerdict: data.verdict,
      factCheckClaims: data.claims.map((c) => ({
        claim: c.claim,
        verdict: c.verdict,
        reasoning: c.reasoning,
        confidence: c.confidence,
        sources: c.sources.map((s) => ({ label: s.label, url: s.url, quote: s.quote })),
      })),
      // ---- Magazine-layout structured sections ----
      ...(data.claimVsTruth?.length
        ? {
            claimVsTruth: data.claimVsTruth.map((c) => ({
              claim: c.claim,
              claimSource: c.claimSource,
              truth: c.truth,
              truthSources: (c.truthSources ?? []).map((s) => ({
                label: s.label,
                url: s.url,
              })),
            })),
          }
        : {}),
      ...(data.whatIsRight?.length
        ? {
            whatIsRight: data.whatIsRight.map((r) => ({
              point: r.point,
              detail: r.detail,
              sources: (r.sources ?? []).map((s) => ({ label: s.label, url: s.url })),
            })),
          }
        : {}),
      ...(data.whatIsWrong?.length
        ? {
            whatIsWrong: data.whatIsWrong.map((r) => ({
              point: r.point,
              detail: r.detail,
              sources: (r.sources ?? []).map((s) => ({ label: s.label, url: s.url })),
            })),
          }
        : {}),
      ...(data.timeline?.length
        ? {
            timeline: data.timeline.map((t) => ({
              date: t.date,
              event: t.event,
              sourceLabel: t.sourceLabel,
              sourceUrl: t.sourceUrl,
            })),
          }
        : {}),
      ...(data.receipts?.length
        ? {
            receipts: data.receipts.map((r) => ({
              label: r.label,
              kind: r.kind ?? 'quote',
              content: r.content,
              sourceLabel: r.sourceLabel,
              sourceUrl: r.sourceUrl,
            })),
          }
        : {}),
      ...(data.impact
        ? {
            impact: {
              summary: data.impact.summary,
              whoIsAffected: (data.impact.whoIsAffected ?? []).map((w) => ({
                group: w.group,
                how: w.how,
              })),
              shortTerm: data.impact.shortTerm,
              longTerm: data.impact.longTerm,
            },
          }
        : {}),
      ...(data.whatCanBeDone
        ? {
            whatCanBeDone: {
              citizenAction: data.whatCanBeDone.citizenAction,
              policyAsk: data.whatCanBeDone.policyAsk,
              ourAsk: data.whatCanBeDone.ourAsk,
              callToActionLabel: data.whatCanBeDone.callToActionLabel,
              callToActionUrl: data.whatCanBeDone.callToActionUrl,
            },
          }
        : {}),
      factCheckRunMeta: {
        submissionId: meta.submissionId,
        model: meta.model,
        inputTopic: meta.inputTopic,
        completedAt: new Date().toISOString(),
        durationMs: meta.durationMs,
        toolCallCount: meta.toolCallCount,
        inputTokens: meta.inputTokens,
        outputTokens: meta.outputTokens,
        cacheReadTokens: meta.cacheReadTokens,
      },
    } as never,
  })

  return { id: String(article.id), slug }
}
