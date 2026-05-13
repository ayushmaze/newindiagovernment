'use client'
import { useState, useTransition } from 'react'

export function SignupCard() {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [isPending, start] = useTransition()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    start(async () => {
      try {
        const res = await fetch('/api/newsletter/subscribe', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ email }),
        })
        if (res.ok) {
          setSuccess(true)
          setEmail('')
        } else {
          setError('Something went wrong. Please try again.')
        }
      } catch {
        setError('Network error. Please try again.')
      }
    })
  }

  return (
    <div className="border-t border-[var(--hairline)] pt-6">
      <p className="font-display font-bold text-[16px] text-[var(--ink)] mb-1">
        Subscribe to weekly debunks
      </p>
      <p className="font-ui uppercase tracking-[0.12em] text-[11px] text-[var(--ink-3)] mb-4">
        Never miss the latest updates.
      </p>

      {success ? (
        <p className="font-ui uppercase tracking-[0.14em] text-[11px] text-[var(--lavender-hover)]">
          Thank you! Check your inbox.
        </p>
      ) : (
        <form onSubmit={submit} className="space-y-2">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full border border-[var(--hairline)] px-3 py-2 font-ui text-[13px] text-[var(--ink)] placeholder:text-[var(--ink-3)] focus:outline-none focus:border-[var(--ink)] bg-[var(--bg)]"
          />
          {error && (
            <p className="font-ui text-[11px] text-[var(--red-tag)]">{error}</p>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[var(--ink)] text-[var(--bg)] font-ui font-bold uppercase tracking-[0.16em] text-[12px] py-3 hover:bg-[var(--lavender-hover)] transition-colors disabled:opacity-60"
          >
            {isPending ? 'Subscribing...' : 'Sign Me Up'}
          </button>
        </form>
      )}
    </div>
  )
}
