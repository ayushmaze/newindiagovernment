'use client'
import { useState } from 'react'

type Props = {
  /** Text to share (also used as the copy fallback) */
  text: string
  /** Optional URL appended to the share. Defaults to current page at click time. */
  url?: string
  label?: string
  className?: string
}

/**
 * One-tap share. Uses the native Web Share sheet on mobile (where virality
 * actually happens) and falls back to copy-to-clipboard on desktop, with a
 * confirmation pulse so the action always feels acknowledged.
 */
export function ShareButton({ text, url, label = 'Share this', className = '' }: Props) {
  const [done, setDone] = useState<'copied' | 'shared' | null>(null)

  const handle = async () => {
    const shareUrl = url ?? (typeof window !== 'undefined' ? window.location.href : '')
    const payload = { title: 'The New India Government', text, url: shareUrl }
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share(payload)
        setDone('shared')
      } else {
        await navigator.clipboard.writeText(`${text} ${shareUrl}`.trim())
        setDone('copied')
      }
    } catch {
      // user dismissed the sheet — no-op
      return
    }
    setTimeout(() => setDone(null), 2000)
  }

  return (
    <button
      onClick={handle}
      className={`tap-shrink inline-flex items-center gap-2 font-ui font-bold uppercase tracking-[0.16em] text-[11px] transition-colors ${className}`}
      aria-label={label}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
      {done === 'copied' ? 'Copied!' : done === 'shared' ? 'Shared!' : label}
    </button>
  )
}
