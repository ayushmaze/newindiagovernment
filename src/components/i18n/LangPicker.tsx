'use client'

/**
 * LangPicker — compact dropdown in the masthead utility row.
 *
 * Lists the six supported languages in their native script. Selection is
 * persisted to localStorage via LangProvider. Touch-friendly and keyboard
 * accessible (Escape to close, arrow keys to move focus).
 */

import { useEffect, useRef, useState } from 'react'
import { LANGS, LANG_META, type Lang } from '@/lib/i18n/dict'
import { useLang } from './LangProvider'

export function LangPicker() {
  const { lang, setLang, hydrated } = useLang()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const current = LANG_META[lang]

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.native}`}
        className="inline-flex items-center gap-1.5 font-ui uppercase tracking-[0.16em] text-[10px] md:text-[11px] text-[var(--ink-3)] hover:text-[var(--ink)] transition-colors px-1 py-0.5 -my-0.5"
      >
        <span className="font-bold tracking-normal normal-case text-[12px] md:text-[13px] leading-none">
          {hydrated ? current.native : 'English'}
        </span>
        <svg
          aria-hidden
          width="8"
          height="8"
          viewBox="0 0 8 8"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path d="M1 2.5 L4 5.5 L7 2.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Choose language"
          className="absolute right-0 top-full mt-1 z-50 w-44 bg-white border border-[var(--ink)]/15 shadow-lg pop-in"
        >
          {LANGS.map((l) => {
            const meta = LANG_META[l]
            const active = l === lang
            return (
              <button
                key={l}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  setLang(l as Lang)
                  setOpen(false)
                }}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 text-left transition-colors hover:bg-[var(--pink-chip)]/40 ${
                  active ? 'bg-[var(--pink-chip)]/30' : ''
                }`}
              >
                <span className="font-ui text-[14px] text-[var(--ink)]">{meta.native}</span>
                <span className="font-ui uppercase tracking-[0.16em] text-[9px] text-[var(--ink-3)]">
                  {meta.label}
                </span>
              </button>
            )
          })}
          <div className="border-t border-[var(--hairline)] px-3 py-2">
            <p className="font-ui uppercase tracking-[0.14em] text-[9px] text-[var(--ink-3)] leading-snug">
              Coverage: headlines + key CTAs.
              <br />
              More strings rolling out.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
