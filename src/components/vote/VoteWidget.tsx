'use client'
import { useEffect, useState, useTransition } from 'react'
import useSWR from 'swr'
import { Turnstile } from '@marsidev/react-turnstile'
import { VoiceModal } from './VoiceModal'

type Option = { key: string; label: string }
type Tally = Record<string, number>

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export function VoteWidget({
  question,
  options,
}: {
  question: string
  options: Option[]
}) {
  const { data, mutate } = useSWR<{ totals: Tally; total: number }>(
    '/api/vote',
    fetcher,
    { refreshInterval: 5000 },
  )
  const [voted, setVoted] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [openVoice, setOpenVoice] = useState(false)
  const [isPending, start] = useTransition()

  useEffect(() => {
    setVoted(localStorage.getItem('ngi:voted'))
  }, [])

  // With Cloudflare's always-pass test site key the iframe auto-fires onSuccess,
  // but it still needs to load from the CDN first. Pre-seed the token in dev so
  // the buttons are immediately clickable without a cold-start delay.
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''
    if (key === '1x00000000000000000000AA') {
      setToken('dev-test-bypass')
    }
  }, [])

  const pct = (k: string) =>
    !data || data.total === 0
      ? 0
      : Math.round(((data.totals[k] ?? 0) / data.total) * 100)

  const cast = (key: string) => {
    if (voted || !token) return
    start(async () => {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ option: key, turnstileToken: token }),
      })
      if (res.ok || res.status === 409) {
        localStorage.setItem('ngi:voted', key)
        setVoted(key)
        void mutate()
        setOpenVoice(true)
      }
    })
  }

  return (
    <section
      id="vote"
      aria-labelledby="vote-q"
      className="bg-[var(--bg-soft)] border-y border-[var(--hairline)] py-16"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="font-ui uppercase tracking-[0.2em] text-[11px] text-[var(--ink-3)] mb-3">
          The People&apos;s Poll
        </p>
        <h2
          id="vote-q"
          className="font-display font-bold text-[32px] md:text-[40px] leading-tight text-[var(--ink)]"
        >
          {question}
        </h2>

        <div className="mt-10 space-y-3">
          {options.map((o) => (
            <button
              key={o.key}
              onClick={() => cast(o.key)}
              disabled={!!voted || !token || isPending}
              aria-pressed={voted === o.key}
              className="group relative w-full overflow-hidden border border-[var(--ink)] px-6 py-4 text-left font-ui font-bold uppercase tracking-[0.12em] text-[14px] hover:bg-[var(--lavender-hover)]/15 disabled:cursor-not-allowed transition-colors"
            >
              <span
                className="absolute inset-y-0 left-0 bg-[var(--pink-chip)] transition-[width] duration-700"
                style={{ width: voted ? `${pct(o.key)}%` : 0 }}
                aria-hidden
              />
              <span className="relative flex justify-between items-center">
                <span>{o.label}</span>
                {voted && (
                  <span className="text-[var(--ink-2)]">{pct(o.key)}%</span>
                )}
              </span>
            </button>
          ))}
        </div>

        {!voted && (
          <div className="mt-6 flex justify-center">
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
              onSuccess={setToken}
              options={{ theme: 'light', size: 'flexible' }}
            />
          </div>
        )}

        <p className="mt-4 font-ui uppercase tracking-[0.16em] text-[11px] text-[var(--ink-3)]">
          {data?.total ?? 0} citizens have voted · One vote per device
        </p>
      </div>

      <VoiceModal
        open={openVoice}
        onClose={() => setOpenVoice(false)}
        option={voted}
      />
    </section>
  )
}
