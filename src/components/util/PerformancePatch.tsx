'use client'

/**
 * Suppresses the dev-only React 19 / Turbopack RSC profiler bug:
 *   Uncaught TypeError: Failed to execute 'measure' on 'Performance':
 *   '\u200BFrontendLayout' cannot have a negative time stamp.
 *
 * The error originates in `flushComponentPerformance` inside
 * react-server-dom-turbopack, where component-render marks occasionally
 * resolve in a non-monotonic order under streaming RSC. It's noisy in dev
 * but does not affect runtime behaviour and is not present in production.
 *
 * This patch wraps `performance.measure` and silently absorbs the specific
 * "negative time stamp" TypeError. Anything else still throws normally.
 */
if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  const w = window as Window & { __perfMeasurePatched?: boolean }
  if (!w.__perfMeasurePatched) {
    w.__perfMeasurePatched = true
    const orig = performance.measure.bind(performance)
    performance.measure = function patched(
      ...args: Parameters<typeof performance.measure>
    ): PerformanceMeasure {
      try {
        return orig(...args)
      } catch (e) {
        if (
          e instanceof TypeError &&
          /negative time stamp/i.test(e.message)
        ) {
          // Return a no-op PerformanceMeasure-shaped object
          return {
            name: typeof args[0] === 'string' ? args[0] : 'noop',
            entryType: 'measure',
            startTime: 0,
            duration: 0,
            detail: null,
            toJSON: () => ({}),
          } as PerformanceMeasure
        }
        throw e
      }
    }
  }
}

export function PerformancePatch() {
  return null
}
