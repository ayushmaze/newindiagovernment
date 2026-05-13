'use client'
import { useEffect, useRef, useState, useTransition } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'

interface VoiceModalProps {
  open: boolean
  onClose: () => void
  option: string | null
}

export function VoiceModal({ open, onClose, option }: VoiceModalProps) {
  const [text, setText] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [token, setToken] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [isPending, start] = useTransition()
  const dialogRef = useRef<HTMLDivElement>(null)

  // Focus trap
  useEffect(() => {
    if (open) {
      dialogRef.current?.focus()
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim() || !token) return

    start(async () => {
      try {
        const res = await fetch('/api/voice', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            text: text.trim(),
            displayName: displayName.trim() || undefined,
            option,
            turnstileToken: token,
          }),
        })
        if (res.ok) {
          setSuccess(true)
        } else {
          setError('Something went wrong. Please try again.')
        }
      } catch {
        setError('Network error. Please try again.')
      }
    })
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
        aria-hidden
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal
        aria-labelledby="voice-modal-title"
        tabIndex={-1}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-[var(--bg)] border border-[var(--divider)] max-w-lg w-full p-8 shadow-2xl">
          {success ? (
            <div className="text-center py-6">
              <p className="font-ui font-bold uppercase tracking-[0.2em] text-[13px] text-[var(--lavender-hover)]">
                Thank You
              </p>
              <p className="font-display font-bold text-[24px] text-[var(--ink)] mt-3">
                Your voice will appear on our Wall of Voices after moderation.
              </p>
              <button
                onClick={onClose}
                className="mt-6 bg-[var(--ink)] text-[var(--bg)] font-ui font-bold uppercase tracking-[0.16em] text-[12px] px-8 py-3 hover:bg-[var(--lavender-hover)] transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <p className="font-ui font-bold uppercase tracking-[0.2em] text-[11px] text-[var(--ink-3)] mb-2">
                Your Turn
              </p>
              <h2
                id="voice-modal-title"
                className="font-display font-bold text-[28px] text-[var(--ink)] mb-6"
              >
                Do you want to share your views?
              </h2>

              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label
                    htmlFor="voice-text"
                    className="font-ui uppercase tracking-[0.14em] text-[11px] text-[var(--ink-3)] block mb-2"
                  >
                    Your message (max 1000 characters)
                  </label>
                  <textarea
                    id="voice-text"
                    required
                    maxLength={1000}
                    rows={5}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Tell us what you think..."
                    className="w-full border border-[var(--hairline)] px-3 py-2 font-body text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-3)] focus:outline-none focus:border-[var(--ink)] resize-none"
                  />
                  <p className="text-right font-ui text-[11px] text-[var(--ink-3)] mt-1">
                    {text.length}/1000
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="voice-name"
                    className="font-ui uppercase tracking-[0.14em] text-[11px] text-[var(--ink-3)] block mb-2"
                  >
                    Display name (optional — leave blank for Anonymous)
                  </label>
                  <input
                    id="voice-name"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    maxLength={80}
                    placeholder="Anonymous"
                    className="w-full border border-[var(--hairline)] px-3 py-2 font-ui text-[13px] text-[var(--ink)] placeholder:text-[var(--ink-3)] focus:outline-none focus:border-[var(--ink)]"
                  />
                </div>

                <Turnstile
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
                  onSuccess={setToken}
                  options={{ theme: 'light', size: 'flexible' }}
                />

                {error && (
                  <p className="font-ui text-[11px] text-[var(--red-tag)]">{error}</p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={!text.trim() || !token || isPending}
                    className="flex-1 bg-[var(--ink)] text-[var(--bg)] font-ui font-bold uppercase tracking-[0.16em] text-[12px] py-3 hover:bg-[var(--lavender-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPending ? 'Submitting...' : 'Yes, Share My View'}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 border border-[var(--ink)] text-[var(--ink)] font-ui font-bold uppercase tracking-[0.16em] text-[12px] py-3 hover:bg-[var(--bg-soft)] transition-colors"
                  >
                    No, Thanks
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  )
}
