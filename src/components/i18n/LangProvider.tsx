'use client'

/**
 * LangProvider — client-side language context.
 *
 * Server-rendered HTML always carries the English fallback so that:
 *  - SEO sees the canonical English copy
 *  - First paint is identical across visits, avoiding hydration mismatches
 *
 * On mount, we look at localStorage for a previously chosen language and
 * swap the visible strings in <T> instances. Persistent across visits.
 */

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { LANGS, type Lang, translate, type DictKey } from '@/lib/i18n/dict'

type LangCtx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: DictKey) => string
  hydrated: boolean
}

const LangContext = createContext<LangCtx | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('nig:lang')
      if (stored && (LANGS as readonly string[]).includes(stored)) {
        setLangState(stored as Lang)
      } else {
        // Detect a sensible default from the browser
        const nav = navigator.language?.toLowerCase() ?? 'en'
        const candidate = nav.startsWith('hi')
          ? 'hi'
          : nav.startsWith('ta')
            ? 'ta'
            : nav.startsWith('te')
              ? 'te'
              : nav.startsWith('bn')
                ? 'bn'
                : nav.startsWith('mr')
                  ? 'mr'
                  : 'en'
        setLangState(candidate as Lang)
      }
    } catch {
      /* ignore storage errors */
    } finally {
      setHydrated(true)
    }
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem('nig:lang', l)
    } catch {
      /* ignore */
    }
    // Reflect on the <html lang="..."> attribute for a11y / SEO
    try {
      document.documentElement.lang = l
    } catch {
      /* ignore */
    }
  }, [])

  const t = useCallback((key: DictKey) => translate(lang, key), [lang])

  // Keep <html lang> in sync after hydration
  useEffect(() => {
    if (!hydrated) return
    try {
      document.documentElement.lang = lang
    } catch {
      /* ignore */
    }
  }, [hydrated, lang])

  const value = useMemo<LangCtx>(() => ({ lang, setLang, t, hydrated }), [lang, setLang, t, hydrated])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang(): LangCtx {
  const ctx = useContext(LangContext)
  if (!ctx) {
    // Standalone safe fallback so components don't crash if used outside provider
    return {
      lang: 'en',
      setLang: () => {},
      t: (key) => translate('en', key),
      hydrated: false,
    }
  }
  return ctx
}
