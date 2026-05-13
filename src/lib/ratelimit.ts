// In-memory token bucket rate limiter (~10 req/min per IP-hash)
const buckets = new Map<string, { tokens: number; lastRefill: number }>()
const MAX_TOKENS = 10
const REFILL_RATE = MAX_TOKENS / 60 // tokens per second

export function checkRateLimit(key: string): boolean {
  const now = Date.now() / 1000
  let bucket = buckets.get(key)

  if (!bucket) {
    bucket = { tokens: MAX_TOKENS - 1, lastRefill: now }
    buckets.set(key, bucket)
    return true
  }

  const elapsed = now - bucket.lastRefill
  bucket.tokens = Math.min(MAX_TOKENS, bucket.tokens + elapsed * REFILL_RATE)
  bucket.lastRefill = now

  if (bucket.tokens < 1) {
    return false
  }

  bucket.tokens -= 1
  return true
}
