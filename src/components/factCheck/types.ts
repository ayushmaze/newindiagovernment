/**
 * Shared types + helpers for fact-check magazine layout components.
 */

export type Verdict =
  | 'true'
  | 'mostly-true'
  | 'mixed'
  | 'misleading'
  | 'false'
  | 'unverifiable'

export interface SourceRef {
  label: string
  url: string
  quote?: string
}

export interface ClaimVsTruthEntry {
  claim: string
  claimSource?: string
  truth: string
  truthSources?: SourceRef[]
}

export interface ColumnPoint {
  point: string
  detail: string
  sources?: SourceRef[]
}

export interface TimelineEntry {
  date: string
  event: string
  sourceLabel?: string
  sourceUrl?: string
}

export interface ReceiptCard {
  label: string
  kind?: 'quote' | 'stat' | 'document' | 'screenshot'
  content: string
  sourceLabel?: string
  sourceUrl?: string
}

export interface Impact {
  summary?: string
  whoIsAffected?: Array<{ group: string; how: string }>
  shortTerm?: string
  longTerm?: string
}

export interface WhatCanBeDone {
  citizenAction?: string
  policyAsk?: string
  ourAsk?: string
  callToActionLabel?: string
  callToActionUrl?: string
}

export interface AtomicClaim {
  claim: string
  verdict: Verdict
  reasoning?: string
  confidence?: 'low' | 'medium' | 'high'
  sources?: SourceRef[]
}

// ----- Verdict styling -----

export interface VerdictTheme {
  label: string
  shortLabel: string
  bg: string
  fg: string
  accent: string
  border: string
  dot: string
}

export const VERDICT_THEMES: Record<Verdict, VerdictTheme> = {
  true: {
    label: 'TRUE',
    shortLabel: 'True',
    bg: '#0f5d3b',
    fg: '#ffffff',
    accent: '#1f8b5d',
    border: '#0f5d3b',
    dot: '#34d399',
  },
  'mostly-true': {
    label: 'MOSTLY TRUE',
    shortLabel: 'Mostly True',
    bg: '#1f8b5d',
    fg: '#ffffff',
    accent: '#34a374',
    border: '#1f8b5d',
    dot: '#6ee7b7',
  },
  mixed: {
    label: 'MIXED',
    shortLabel: 'Mixed',
    bg: '#b8923a',
    fg: '#ffffff',
    accent: '#d4a850',
    border: '#b8923a',
    dot: '#fbbf24',
  },
  misleading: {
    label: 'MISLEADING',
    shortLabel: 'Misleading',
    bg: '#d97706',
    fg: '#ffffff',
    accent: '#ea580c',
    border: '#d97706',
    dot: '#fb923c',
  },
  false: {
    label: 'FALSE',
    shortLabel: 'False',
    bg: '#c81e1e',
    fg: '#ffffff',
    accent: '#dc2626',
    border: '#c81e1e',
    dot: '#fca5a5',
  },
  unverifiable: {
    label: 'UNVERIFIABLE',
    shortLabel: 'Unverifiable',
    bg: '#4a4a4a',
    fg: '#ffffff',
    accent: '#6a6a6a',
    border: '#4a4a4a',
    dot: '#d1d5db',
  },
}

export const verdictTheme = (v: Verdict | string | null | undefined): VerdictTheme => {
  if (v && (v in VERDICT_THEMES)) return VERDICT_THEMES[v as Verdict]
  return VERDICT_THEMES.unverifiable
}

// Tiny inline-source list — used at the foot of each panel
export const formatSources = (sources?: SourceRef[]): string =>
  (sources ?? []).map((s) => s.label).join(' · ')
