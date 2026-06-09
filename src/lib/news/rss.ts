/**
 * Minimal, dependency-free RSS/Atom reader.
 *
 * We only need a few fields per item (title, link, summary, date, guid), and
 * major Indian news feeds are standard RSS 2.0 / Atom — so a tolerant parser
 * avoids adding an XML dependency to the build. We read facts (headline +
 * summary + link) only; we never reproduce full article text.
 */

export type RssItem = {
  title: string
  link: string
  summary: string
  published?: string
  guid: string
}

function decodeEntities(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/<[^>]+>/g, '') // strip any stray tags from summaries
    .replace(/\s+/g, ' ')
    .trim()
}

function pick(block: string, tag: string): string {
  // handles <tag>..</tag> and <tag .../> and CDATA
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i')
  const m = block.match(re)
  return m ? decodeEntities(m[1]) : ''
}

function pickLink(block: string): string {
  // RSS <link>url</link> OR Atom <link href="url" ... />
  const rss = block.match(/<link[^>]*>([\s\S]*?)<\/link>/i)
  if (rss && rss[1].trim() && !rss[1].includes('<')) return decodeEntities(rss[1])
  const atom = block.match(/<link[^>]*href=["']([^"']+)["'][^>]*\/?>/i)
  return atom ? atom[1] : ''
}

/**
 * Fetch and parse a feed. Returns at most `limit` items, newest first as the
 * feed orders them. Never throws — returns [] on any failure.
 */
export async function fetchFeed(url: string, limit = 10): Promise<RssItem[]> {
  try {
    const res = await fetch(url, {
      headers: { 'user-agent': 'NewIndiaGovBot/1.0 (+https://newindiagovernment.com)' },
      // don't cache aggressively; the cron controls cadence
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) return []
    const xml = await res.text()

    // RSS uses <item>, Atom uses <entry>
    const isAtom = /<entry[\s>]/i.test(xml) && !/<item[\s>]/i.test(xml)
    const blocks = xml.split(isAtom ? /<entry[\s>]/i : /<item[\s>]/i).slice(1)

    const items: RssItem[] = []
    for (const raw of blocks) {
      const block = '<x ' + raw // restore a tag head so regexes that expect a tag work
      const title = pick(block, 'title')
      const link = pickLink(block)
      const summary =
        pick(block, 'description') || pick(block, 'summary') || pick(block, 'content')
      const published =
        pick(block, 'pubDate') || pick(block, 'published') || pick(block, 'updated') || undefined
      const guid = pick(block, 'guid') || pick(block, 'id') || link
      if (title && link) {
        items.push({ title, link, summary: summary.slice(0, 600), published, guid })
      }
      if (items.length >= limit) break
    }
    return items
  } catch {
    return []
  }
}
