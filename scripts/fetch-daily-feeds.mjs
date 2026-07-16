#!/usr/bin/env node
/**
 * fetch-daily-feeds — pull TODAY'S stories from top Indian news sites.
 *
 * This does all the mechanical work so the editorial model doesn't have to:
 * fetches a fixed list of RSS/Atom feeds, parses them without dependencies,
 * keeps only recent items, dedupes against each other AND against articles
 * already published on the site, tags each with the outlet's leaning, and
 * prints a clean JSON array of candidates to stdout.
 *
 * Usage:
 *   node scripts/fetch-daily-feeds.mjs [--hours 36] [--max 40]
 *
 * Output: { ok, generatedAt, count, items: [ {title, url, source, leaning,
 *           summary, publishedAt} ] }
 *
 * Never throws on a single bad feed — it skips and continues, so a weak model
 * always gets a usable list.
 */

const args = process.argv.slice(2)
const getArg = (name, def) => {
  const i = args.indexOf(`--${name}`)
  return i >= 0 && args[i + 1] ? args[i + 1] : def
}
const HOURS = Number(getArg('hours', '36'))
const MAX = Number(getArg('max', '40'))
const SITE = 'https://newindiagovernment.com'

// Outlet leaning drives the debunk-routing rule in the skill. 'godi' = the
// government-leaning outlets; 'independent' = fact-checkers; 'mainstream' =
// large general outlets; 'government' = primary state source (PIB).
const FEEDS = [
  { name: 'The Hindu (National)', leaning: 'mainstream', url: 'https://www.thehindu.com/news/national/feeder/default.rss' },
  { name: 'Indian Express (India)', leaning: 'mainstream', url: 'https://indianexpress.com/section/india/feed/' },
  { name: 'Hindustan Times (India)', leaning: 'mainstream', url: 'https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml' },
  { name: 'NDTV (India)', leaning: 'mainstream', url: 'https://feeds.feedburner.com/ndtvnews-india-news' },
  { name: 'Times of India (India)', leaning: 'mainstream', url: 'https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms' },
  { name: 'India Today (India)', leaning: 'mainstream', url: 'https://www.indiatoday.in/rss/1206578' },
  { name: 'Zee News (India)', leaning: 'godi', url: 'https://zeenews.india.com/rss/india-national-news.xml' },
  { name: 'ABP Live (India)', leaning: 'godi', url: 'https://news.abplive.com/news/india/feed' },
  { name: 'Alt News (fact-check)', leaning: 'independent', url: 'https://www.altnews.in/feed/' },
  { name: 'BOOM Live (fact-check)', leaning: 'independent', url: 'https://www.boomlive.in/rss/' },
  { name: 'PIB (Govt press releases)', leaning: 'government', url: 'https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1&Regid=3' },
]

const decode = (s = '') =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;|&#39;|&rsquo;/g, "'")
    .replace(/&#8216;|&lsquo;/g, "'")
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
    .replace(/&#8230;|&hellip;/g, '…')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\s+/g, ' ')
    .trim()

const pick = (block, tag) => {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'))
  return m ? decode(m[1]) : ''
}
const pickLinkAtom = (block) => {
  const m = block.match(/<link[^>]*href=["']([^"']+)["']/i)
  return m ? m[1].trim() : ''
}

async function fetchFeed(feed) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 15000)
  try {
    const res = await fetch(feed.url, {
      signal: ctrl.signal,
      headers: { 'user-agent': 'NIG-newsroom/1.0 (+https://newindiagovernment.com)' },
    })
    if (!res.ok) return []
    const xml = await res.text()
    const blocks =
      xml.match(/<item[\s\S]*?<\/item>/gi) || xml.match(/<entry[\s\S]*?<\/entry>/gi) || []
    const out = []
    for (const b of blocks) {
      const title = pick(b, 'title')
      let link = pick(b, 'link')
      if (!link) link = pickLinkAtom(b)
      const summary = pick(b, 'description') || pick(b, 'summary') || pick(b, 'content')
      const dateStr = pick(b, 'pubDate') || pick(b, 'published') || pick(b, 'updated') || pick(b, 'dc:date')
      if (!title || !link) continue
      out.push({
        title,
        url: link,
        source: feed.name,
        leaning: feed.leaning,
        summary: summary.slice(0, 500),
        publishedAt: dateStr ? new Date(dateStr).toISOString() : null,
      })
    }
    return out
  } catch {
    return []
  } finally {
    clearTimeout(t)
  }
}

async function existingTitles() {
  // Best-effort dedupe against already-published articles.
  try {
    const res = await fetch(`${SITE}/api/articles?depth=0&limit=200&sort=-createdAt`, {
      headers: { 'user-agent': 'NIG-newsroom/1.0' },
    })
    if (!res.ok) return new Set()
    const j = await res.json()
    const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim()
    return new Set((j.docs || []).map((d) => norm(d.title)).filter(Boolean))
  } catch {
    return new Set()
  }
}

const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ').trim()
// crude token-overlap similarity for cross-title dedupe
function similar(a, b) {
  const ta = new Set(norm(a).split(' ').filter((w) => w.length > 3))
  const tb = new Set(norm(b).split(' ').filter((w) => w.length > 3))
  if (ta.size === 0 || tb.size === 0) return false
  let overlap = 0
  for (const w of ta) if (tb.has(w)) overlap++
  return overlap / Math.min(ta.size, tb.size) >= 0.7
}

const cutoff = Date.now() - HOURS * 3600 * 1000

const [published, ...feedResults] = await Promise.all([
  existingTitles(),
  ...FEEDS.map(fetchFeed),
])

const all = feedResults.flat()
const seenUrls = new Set()
const kept = []
for (const it of all) {
  // recency filter (keep undated items — some feeds omit dates)
  if (it.publishedAt && new Date(it.publishedAt).getTime() < cutoff) continue
  if (seenUrls.has(it.url)) continue
  if (published.has(norm(it.title))) continue
  if (kept.some((k) => similar(k.title, it.title))) continue
  seenUrls.add(it.url)
  kept.push(it)
}

// newest first, undated last
kept.sort((a, b) => (new Date(b.publishedAt || 0)) - (new Date(a.publishedAt || 0)))

const items = kept.slice(0, MAX)
console.log(
  JSON.stringify(
    { ok: true, generatedAt: new Date().toISOString(), windowHours: HOURS, count: items.length, items },
    null,
    2,
  ),
)
