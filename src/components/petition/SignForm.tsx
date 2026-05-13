'use client'
import { useState, useTransition } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'

interface SignFormProps {
  petitionId: string
}

export function SignForm({ petitionId }: SignFormProps) {
  const [token, setToken] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [isPending, start] = useTransition()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    city: '',
    comment: '',
    displayPublic: true,
  })

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value,
    }))
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.firstName || !form.lastName || !token) return

    start(async () => {
      try {
        const res = await fetch('/api/petition/sign', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            petitionId,
            ...form,
            turnstileToken: token,
          }),
        })
        if (res.ok) {
          setSuccess(true)
        } else {
          const data = await res.json()
          setError(data.error === 'rate_limited' ? 'Too many requests. Please wait.' : 'Something went wrong.')
        }
      } catch {
        setError('Network error. Please try again.')
      }
    })
  }

  if (success) {
    return (
      <div className="border border-[var(--hairline)] p-8 text-center bg-[var(--bg-soft)]">
        <p className="font-ui font-bold uppercase tracking-[0.2em] text-[13px] text-[var(--lavender-hover)] mb-2">
          Thank You!
        </p>
        <p className="font-display font-bold text-[22px] text-[var(--ink)]">
          Your signature has been recorded.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="border border-[var(--hairline)] p-6 space-y-4 bg-[var(--bg-soft)]">
      <h3 className="font-display font-bold text-[22px] text-[var(--ink)]">
        Add Your Signature
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="sign-first" className="font-ui uppercase tracking-[0.14em] text-[11px] text-[var(--ink-3)] block mb-1">
            First Name *
          </label>
          <input
            id="sign-first"
            type="text"
            required
            value={form.firstName}
            onChange={update('firstName')}
            className="w-full border border-[var(--hairline)] px-3 py-2 font-ui text-[13px] focus:outline-none focus:border-[var(--ink)]"
          />
        </div>
        <div>
          <label htmlFor="sign-last" className="font-ui uppercase tracking-[0.14em] text-[11px] text-[var(--ink-3)] block mb-1">
            Last Name *
          </label>
          <input
            id="sign-last"
            type="text"
            required
            value={form.lastName}
            onChange={update('lastName')}
            className="w-full border border-[var(--hairline)] px-3 py-2 font-ui text-[13px] focus:outline-none focus:border-[var(--ink)]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="sign-city" className="font-ui uppercase tracking-[0.14em] text-[11px] text-[var(--ink-3)] block mb-1">
          City
        </label>
        <input
          id="sign-city"
          type="text"
          value={form.city}
          onChange={update('city')}
          className="w-full border border-[var(--hairline)] px-3 py-2 font-ui text-[13px] focus:outline-none focus:border-[var(--ink)]"
        />
      </div>

      <div>
        <label htmlFor="sign-comment" className="font-ui uppercase tracking-[0.14em] text-[11px] text-[var(--ink-3)] block mb-1">
          Comment (optional)
        </label>
        <textarea
          id="sign-comment"
          rows={3}
          value={form.comment}
          onChange={update('comment')}
          maxLength={500}
          className="w-full border border-[var(--hairline)] px-3 py-2 font-body text-[14px] focus:outline-none focus:border-[var(--ink)] resize-none"
        />
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={form.displayPublic}
          onChange={(e) => setForm((prev) => ({ ...prev, displayPublic: e.target.checked }))}
          className="w-4 h-4"
        />
        <span className="font-ui uppercase tracking-[0.14em] text-[11px] text-[var(--ink-3)]">
          Display my name publicly
        </span>
      </label>

      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
        onSuccess={setToken}
        options={{ theme: 'light' }}
      />

      {error && <p className="font-ui text-[11px] text-[var(--red-tag)]">{error}</p>}

      <button
        type="submit"
        disabled={!form.firstName || !form.lastName || !token || isPending}
        className="w-full bg-[var(--ink)] text-[var(--bg)] font-ui font-bold uppercase tracking-[0.16em] text-[13px] py-4 hover:bg-[var(--lavender-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Signing...' : 'Sign This Petition'}
      </button>
    </form>
  )
}
