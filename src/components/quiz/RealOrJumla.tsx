'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { QUIZ_QUESTIONS, type QuizQuestion, type QuizAnswer } from '@/lib/quizQuestions'
import { ShareButton } from '@/components/share/ShareButton'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const CONFETTI_COLORS = ['#c81e1e', '#fac9d8', '#b8923a', '#1a1a1a', '#3a7d44']

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.25,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rot: Math.random() * 360,
      })),
    [],
  )
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece absolute top-0 h-2.5 w-2.5"
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rot}deg)`,
          }}
        />
      ))}
    </div>
  )
}

type Phase = 'playing' | 'revealed' | 'done'

export function RealOrJumla() {
  const [deck, setDeck] = useState<QuizQuestion[]>([])
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<Phase>('playing')
  const [picked, setPicked] = useState<QuizAnswer | null>(null)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [best, setBest] = useState(0)
  const [wrongShake, setWrongShake] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // init / reset
  const reset = () => {
    setDeck(shuffle(QUIZ_QUESTIONS))
    setIdx(0)
    setPhase('playing')
    setPicked(null)
    setScore(0)
    setStreak(0)
  }

  useEffect(() => {
    setDeck(shuffle(QUIZ_QUESTIONS))
    const stored = Number(localStorage.getItem('nig:quizBest') ?? 0)
    setBest(Number.isFinite(stored) ? stored : 0)
  }, [])

  const q = deck[idx]
  const total = deck.length

  const answer = (choice: QuizAnswer) => {
    if (phase !== 'playing' || !q) return
    setPicked(choice)
    const correct = choice === q.truth
    if (correct) {
      setScore((s) => s + 1)
      setStreak((s) => s + 1)
    } else {
      setStreak(0)
      setWrongShake(true)
      setTimeout(() => setWrongShake(false), 450)
    }
    setPhase('revealed')
  }

  const next = () => {
    if (idx + 1 >= total) {
      const finalBest = Math.max(best, score)
      setBest(finalBest)
      localStorage.setItem('nig:quizBest', String(finalBest))
      setPhase('done')
    } else {
      setIdx((i) => i + 1)
      setPicked(null)
      setPhase('playing')
    }
  }

  if (deck.length === 0) {
    return <div className="min-h-[420px]" aria-hidden />
  }

  // ── Results screen ──────────────────────────────────────────────────
  if (phase === 'done') {
    const pct = Math.round((score / total) * 100)
    const verdict =
      pct >= 85 ? 'Jumla Detector 🥇' : pct >= 60 ? 'Sharp Citizen 🧠' : pct >= 40 ? 'Getting There 📈' : 'Easily Fooled 😬'
    return (
      <div className="relative mx-auto max-w-2xl bg-[var(--ink)] text-[var(--bg)] p-8 md:p-12 pop-in">
        <Confetti />
        <p className="font-ui font-black uppercase tracking-[0.28em] text-[11px] text-[var(--pink-chip)]">
          Your verdict
        </p>
        <div className="font-display font-black text-[clamp(56px,12vw,120px)] leading-none mt-4 tabular-nums">
          {score}/{total}
        </div>
        <p className="font-display font-black uppercase text-[clamp(24px,5vw,40px)] mt-2 text-[var(--pink-chip)]">
          {verdict}
        </p>
        <p className="font-body text-[16px] leading-relaxed text-[var(--bg)]/80 mt-5 max-w-[44ch]">
          You spotted {score} of {total} {score === 1 ? 'jumla' : 'jumlas'} ({pct}%). Personal best:{' '}
          {Math.max(best, score)}/{total}. Can your friends beat that?
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={reset}
            className="tap-shrink bg-[var(--pink-chip)] text-[var(--ink)] px-7 py-4 font-ui font-bold uppercase tracking-[0.16em] text-[12px] hover:bg-[var(--bg)] transition-colors"
          >
            Play again ↻
          </button>
          <ShareButton
            text={`I scored ${score}/${total} on "Real or Jumla?" (${verdict}). Can you spot the political jumlas?`}
            label="Challenge a friend"
            className="border-2 border-[var(--bg)]/40 text-[var(--bg)] px-7 py-4 hover:border-[var(--bg)]"
          />
        </div>
      </div>
    )
  }

  // ── Play / reveal ───────────────────────────────────────────────────
  const correct = picked === q.truth
  return (
    <div className="mx-auto max-w-2xl">
      {/* HUD */}
      <div className="flex items-center justify-between mb-4 font-ui uppercase tracking-[0.16em] text-[11px] text-[var(--ink-3)]">
        <span>
          Q{idx + 1} / {total}
        </span>
        <div className="flex items-center gap-4">
          <span>
            Score <strong className="text-[var(--ink)] tabular-nums">{score}</strong>
          </span>
          <span className={streak >= 2 ? 'text-[var(--red-tag)]' : ''}>
            🔥 Streak <strong className="tabular-nums">{streak}</strong>
          </span>
          <span>
            Best <strong className="text-[var(--ink)] tabular-nums">{best}</strong>
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="h-1 w-full bg-[var(--ink)]/10 mb-6 overflow-hidden rounded-full">
        <div
          className="h-full bg-[var(--red-tag)] transition-[width] duration-500"
          style={{ width: `${((idx + (phase === 'revealed' ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        className={`relative bg-[var(--bg)] border-2 border-[var(--ink)] p-8 md:p-10 ${wrongShake ? 'shake-x' : ''}`}
      >
        <p className="font-ui uppercase tracking-[0.18em] text-[10px] text-[var(--ink-3)] mb-4">
          {q.context}
        </p>
        <blockquote className="font-display font-bold text-[clamp(24px,4vw,40px)] leading-[1.15] text-[var(--ink)]">
          {q.claim}
        </blockquote>

        {phase === 'playing' && (
          <div className="mt-8 grid grid-cols-2 gap-4">
            <button
              onClick={() => answer('real')}
              className="tap-shrink group border-2 border-[#3a7d44] text-[#3a7d44] py-5 font-ui font-black uppercase tracking-[0.14em] text-[15px] hover:bg-[#3a7d44] hover:text-white transition-colors"
            >
              ✓ Real
            </button>
            <button
              onClick={() => answer('jumla')}
              className="tap-shrink group border-2 border-[var(--red-tag)] text-[var(--red-tag)] py-5 font-ui font-black uppercase tracking-[0.14em] text-[15px] hover:bg-[var(--red-tag)] hover:text-white transition-colors"
            >
              ✕ Jumla
            </button>
          </div>
        )}

        {phase === 'revealed' && (
          <div className="relative mt-8 pop-in">
            {correct && <Confetti />}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 font-ui font-black uppercase tracking-[0.14em] text-[12px] text-white"
              style={{ backgroundColor: correct ? '#3a7d44' : 'var(--red-tag)' }}
            >
              {correct ? '✓ Correct!' : '✕ Not quite'}
              <span className="opacity-80">
                — it was {q.truth === 'real' ? 'REAL' : 'a JUMLA'}
              </span>
            </div>
            <p className="font-body text-[16px] leading-relaxed text-[var(--ink-2)] mt-4">
              {q.explanation}
            </p>
            <a
              href={q.source.url}
              target={q.source.url.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="inline-block mt-3 font-ui uppercase tracking-[0.12em] text-[10px] text-[var(--red-tag)] hover:underline underline-offset-2"
            >
              ↗ Source: {q.source.label}
            </a>
            <button
              onClick={next}
              className="tap-shrink mt-6 w-full bg-[var(--ink)] text-[var(--bg)] py-4 font-ui font-bold uppercase tracking-[0.16em] text-[13px] hover:bg-[var(--red-tag)] transition-colors"
            >
              {idx + 1 >= total ? 'See my result →' : 'Next claim →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
