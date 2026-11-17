import { useMemo, useState } from 'react'
import { divergentPairs } from '../data/hsk1-pairs'
import { setQuizBest } from '../lib/progress'

type Mode = 'to-trad' | 'from-trad'

type Question = {
  id: string
  mode: Mode
  prompt: string
  answer: string
  options: string[]
  meta: string
}

function buildQuestions(count = 10): Question[] {
  const pool = [...divergentPairs].sort(() => Math.random() - 0.5).slice(0, count)
  return pool.map((item, i) => {
    const mode: Mode = i % 2 === 0 ? 'to-trad' : 'from-trad'
    if (mode === 'to-trad') {
      const wrong = divergentPairs
        .filter((p) => p.id !== item.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((p) => p.traditional)
      return {
        id: `${item.id}-to`,
        mode,
        prompt: item.simplified,
        answer: item.traditional,
        options: [...wrong, item.traditional].sort(() => Math.random() - 0.5),
        meta: `${item.pinyin} · ${item.meaning}`,
      }
    }
    const meaningOptions = divergentPairs
      .filter((p) => p.id !== item.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((p) => `${p.pinyin} · ${p.meaning}`)
    const answer = `${item.pinyin} · ${item.meaning}`
    return {
      id: `${item.id}-from`,
      mode,
      prompt: item.traditional,
      answer,
      options: [...meaningOptions, answer].sort(() => Math.random() - 0.5),
      meta: `simplified ${item.simplified}`,
    }
  })
}

export function QuizPage() {
  const [questions, setQuestions] = useState(() => buildQuestions())
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const current = questions[index]
  const progressLabel = useMemo(
    () => `${Math.min(index + 1, questions.length)}/${questions.length}`,
    [index, questions.length],
  )

  function choose(option: string) {
    if (selected || !current) return
    setSelected(option)
    if (option === current.answer) setScore((s) => s + 1)
  }

  function goNext() {
    if (index + 1 >= questions.length) {
      setQuizBest(score)
      setFinished(true)
      return
    }
    setSelected(null)
    setIndex((i) => i + 1)
  }

  function restart() {
    setQuestions(buildQuestions())
    setIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="rise-in rounded-2xl border border-[var(--line)] bg-white/65 p-8 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">Method 04</p>
        <h2 className="display mt-2 text-3xl">Quiz complete</h2>
        <p className="han mt-4 text-5xl text-[var(--ink)]">
          {score}/{questions.length}
        </p>
        <p className="mt-2 text-[var(--ink-soft)]">{pct}% — best score is saved on this device.</p>
        <button
          type="button"
          onClick={restart}
          className="mt-6 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white"
        >
          New quiz
        </button>
      </div>
    )
  }

  if (!current) {
    return (
      <div className="rounded-2xl border border-[var(--line)] bg-white/60 p-8 text-center">
        <p className="text-[var(--ink-soft)]">Could not build a quiz. Add more divergent pairs.</p>
      </div>
    )
  }

  return (
    <div className="rise-in space-y-6">
      <section className="rounded-2xl border border-[var(--line)] bg-white/60 p-6 backdrop-blur-sm">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">Method 04</p>
        <h2 className="display mt-2 text-3xl">Recognition ↔ production</h2>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          Question {progressLabel} · score {score}
          {current.mode === 'to-trad'
            ? ' · pick the traditional form'
            : ' · read traditional and pick meaning'}
        </p>
      </section>

      <div className="rounded-2xl border border-[var(--line)] bg-white/70 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">
          {current.mode === 'to-trad' ? 'Simplified → Traditional' : 'Traditional → Meaning'}
        </p>
        <p className="han char-pop mt-4 text-center text-7xl font-semibold sm:text-8xl">
          {current.prompt}
        </p>
        <p className="mt-3 text-center text-sm text-[var(--ink-soft)]">{current.meta}</p>

        <div className="mt-8 grid gap-2 sm:grid-cols-2">
          {current.options.map((option) => {
            const show = selected !== null
            const correct = option === current.answer
            const picked = option === selected
            return (
              <button
                key={option}
                type="button"
                disabled={selected !== null}
                onClick={() => choose(option)}
                className={[
                  'rounded-xl border px-4 py-3 text-left transition',
                  current.mode === 'to-trad' ? 'han text-2xl' : 'text-sm',
                  show && correct
                    ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                    : show && picked
                      ? 'border-[var(--warn)] bg-[#f3e4dc]'
                      : 'border-[var(--line)] bg-[var(--mist)] hover:border-[var(--accent)]',
                ].join(' ')}
              >
                {option}
              </button>
            )
          })}
        </div>

        {selected !== null ? (
          <button
            type="button"
            onClick={goNext}
            className="mt-6 rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-white"
          >
            {index + 1 >= questions.length ? 'See results' : 'Next question'}
          </button>
        ) : null}
      </div>
    </div>
  )
}
