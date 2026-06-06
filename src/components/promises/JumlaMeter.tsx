'use client'
import { useMemo, useState, useEffect, useRef } from 'react'
import { PROMISES, VERDICT_META, type Verdict, type GovPromise } from '@/lib/promises'
import { ShareButton } from '@/components/share/ShareButton'

const FILTERS: { key: Verdict | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'broken', label: 'Broken' },
  { key: 'jumla', label: 'Jumla' },
  { key: 'delayed', label: 'Delayed' },
  { key: 'partial', label: 'Partial' },
]

function AnimatedBar({ value, color }: { value: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [w, setW] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          requestAnimationFrame(() => setW(value))
          obs.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [value])
  return (
    <div ref={ref} className="relative h-2.5 w-full bg-[var(--ink)]/10 overflow-hidden rounded-full">
      <div
        className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-[1400ms] ease-out"
        style={{ width: `${w}%`, backgroundColor: color }}
      />
    </div>
  )
}

function PromiseRow({ p }: { p: GovPromise }) {
  const [open, setOpen] = useState(false)
  const meta = VERDICT_META[p.verdict]
  return (
    <div className="bg-[var(--bg)] border border-[var(--hairline)] p-6 md:p-7 transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="font-ui uppercase tracking-[0.18em] text-[10px] text-[var(--ink-3)]">
            {p.category} · {p.year}
          </span>
          <h3 className="font-display font-black text-[clamp(20px,2.6vw,30px)] leading-[1.1] mt-2 text-[var(--ink)]">
            {p.promise}
          </h3>
        </div>
        <span
          className="shrink-0 px-3 py-1.5 font-ui font-black uppercase tracking-[0.12em] text-[11px] whitespace-nowrap"
          style={{ backgroundColor: meta.bg, color: meta.fg }}
        >
          {meta.label}
        </span>
      </div>

      <p className="font-ui uppercase tracking-[0.14em] text-[10px] text-[var(--ink-3)] mt-3">
        {p.attribution}
      </p>

      {/* Meter */}
      <div className="mt-5 flex items-center gap-4">
        <AnimatedBar value={p.progress} color={meta.bg} />
        <span className="font-display font-black tabular-nums text-[18px] text-[var(--ink)] shrink-0">
          {p.progress}%
        </span>
      </div>
      <p className="font-ui uppercase tracking-[0.14em] text-[10px] text-[var(--ink-3)] mt-2">
        {meta.note} · est. delivered against the headline claim
      </p>

      {/* Punchline always visible */}
      <p className="font-display italic text-[17px] md:text-[19px] leading-snug text-[var(--ink)] mt-5 border-l-4 pl-4" style={{ borderColor: meta.bg }}>
        {p.punchline}
      </p>

      {open && (
        <div className="pop-in mt-5">
          <p className="font-body text-[15px] leading-relaxed text-[var(--ink-2)]">{p.reality}</p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            {p.sources.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui uppercase tracking-[0.12em] text-[10px] text-[var(--red-tag)] hover:underline underline-offset-2"
              >
                ↗ {s.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 pt-4 border-t border-[var(--hairline)] flex items-center justify-between gap-4">
        <button
          onClick={() => setOpen((v) => !v)}
          className="font-ui font-bold uppercase tracking-[0.16em] text-[11px] text-[var(--ink)] hover:text-[var(--red-tag)] transition-colors"
        >
          {open ? '− Hide evidence' : '+ See the evidence'}
        </button>
        <ShareButton
          text={`${p.punchline} — verdict: ${meta.label}. The Jumla Meter:`}
          className="text-[var(--ink-3)] hover:text-[var(--ink)]"
          label="Share"
        />
      </div>
    </div>
  )
}

export function JumlaMeter({ compact = false }: { compact?: boolean }) {
  const [filter, setFilter] = useState<Verdict | 'all'>('all')

  const counts = useMemo(() => {
    const broken = PROMISES.filter((p) => p.verdict === 'broken' || p.verdict === 'jumla').length
    const avg = Math.round(PROMISES.reduce((s, p) => s + p.progress, 0) / PROMISES.length)
    return { broken, total: PROMISES.length, avg }
  }, [])

  const shown = useMemo(
    () => (filter === 'all' ? PROMISES : PROMISES.filter((p) => p.verdict === filter)),
    [filter],
  )

  const list = compact ? PROMISES.slice(0, 3) : shown

  return (
    <section
      id="jumla-meter"
      className="border-b border-[var(--hairline)] bg-[var(--bg-soft)]"
      aria-label="The Jumla Meter — government promises tracked against the record"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:py-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12">
          <div className="max-w-[60ch]">
            <p className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--red-tag)] mb-4">
              The Jumla Meter™
            </p>
            <h2 className="font-display font-black uppercase tracking-[-0.01em] leading-[0.95] text-[clamp(34px,6vw,72px)] text-[var(--ink)]">
              Promised.
              <br />
              Then what?
            </h2>
            <p className="font-display text-[17px] md:text-[21px] leading-snug text-[var(--ink-2)] mt-6">
              The biggest headlines, weighed against the public record. Every bar is sourced.
              Every deadline, dated. Tap a card to read the evidence yourself.
            </p>
          </div>

          {/* Scoreboard */}
          <div className="flex gap-8 shrink-0">
            <div>
              <div className="font-display font-black text-[clamp(40px,6vw,64px)] leading-none text-[var(--red-tag)] tabular-nums">
                {counts.broken}/{counts.total}
              </div>
              <div className="font-ui uppercase tracking-[0.16em] text-[10px] text-[var(--ink-3)] mt-2">
                Broken or jumla
              </div>
            </div>
            <div>
              <div className="font-display font-black text-[clamp(40px,6vw,64px)] leading-none text-[var(--ink)] tabular-nums">
                {counts.avg}%
              </div>
              <div className="font-ui uppercase tracking-[0.16em] text-[10px] text-[var(--ink-3)] mt-2">
                Avg. delivered
              </div>
            </div>
          </div>
        </div>

        {/* Filters (full view only) */}
        {!compact && (
          <div className="flex flex-wrap gap-2 mb-8">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`tap-shrink font-ui font-bold uppercase tracking-[0.14em] text-[11px] px-4 py-2 border transition-colors ${
                  filter === f.key
                    ? 'bg-[var(--ink)] text-[var(--bg)] border-[var(--ink)]'
                    : 'bg-transparent text-[var(--ink)] border-[var(--hairline)] hover:border-[var(--ink)]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {list.map((p) => (
            <PromiseRow key={p.id} p={p} />
          ))}
        </div>

        {compact && (
          <div className="mt-10 text-center">
            <a
              href="/promises"
              className="group inline-flex items-center gap-3 bg-[var(--ink)] text-[var(--bg)] px-7 py-4 hover:bg-[var(--red-tag)] transition-colors"
            >
              <span className="font-ui font-bold uppercase tracking-[0.18em] text-[12px]">
                Open the full Jumla Meter
              </span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
