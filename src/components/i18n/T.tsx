'use client'

/**
 * <T> — render a translated string by key.
 *
 * Pattern: <T k="hero.kicker" fallback="We're keeping score" />
 *
 * - Before hydration: shows `fallback` (the literal English copy that's also
 *   in the static HTML, so SSR + first-paint match exactly — zero flash).
 * - After hydration: shows the chosen-language translation.
 *
 * `as` lets you choose the element ('span' default).
 */

import type { ElementType } from 'react'
import type { DictKey } from '@/lib/i18n/dict'
import { useLang } from './LangProvider'

type Props = {
  k: DictKey
  fallback: string
  as?: ElementType
  className?: string
}

export function T({ k, fallback, as: Tag = 'span', className }: Props) {
  const { t, hydrated } = useLang()
  const text = hydrated ? t(k) : fallback
  return <Tag className={className}>{text}</Tag>
}
