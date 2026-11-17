import { useMemo, useState } from 'react'
import { Breakdown } from '../components/Breakdown'
import { Kbd } from '../components/Kbd'
import { patterns } from '../data/patterns'
import { useHotkeys } from '../hooks/useHotkeys'
import { loadProgress, markPatternDone } from '../lib/progress'

export function PatternsPage() {
  const [index, setIndex] = useState(0)
  const [quizOpen, setQuizOpen] = useState(false)
  const [choice, setChoice] = useState<string | null>(null)
  const [done, setDone] = useState(() => new Set(loadProgress().patternDone))

  const pattern = patterns[index]
  const quizExample = pattern.examples[0]

  const options = useMemo(() => {
    const wrong = patterns
      .filter((p) => p.id !== pattern.id)
      .flatMap((p) => p.examples)
      .filter((e) => e.traditional !== quizExample.traditional)
      .slice(0, 8)
    const pool = [...wrong].sort(() => Math.random() - 0.5).slice(0, 3)
    return [...pool, quizExample].sort(() => Math.random() - 0.5)
  }, [pattern.id, quizExample])

  function completePattern() {
    markPatternDone(pattern.id)
    setDone((prev) => new Set([...prev, pattern.id]))
    setQuizOpen(false)
    setChoice(null)
    setIndex((i) => Math.min(i + 1, patterns.length - 1))
  }

  useHotkeys({
    ArrowLeft: () => {
      setQuizOpen(false)
      setChoice(null)
      setIndex((i) => Math.max(0, i - 1))
    },
    ArrowRight: () => {
      setQuizOpen(false)
      setChoice(null)
      setIndex((i) => Math.min(patterns.length - 1, i + 1))
    },
    q: () => {
      if (!quizOpen) {
        setQuizOpen(true)
        setChoice(null)
      }
    },
    Escape: () => {
      setQuizOpen(false)
      setChoice(null)
    },
    Enter: () => {
      if (choice !== null) completePattern()
    },
    '1': () => {
      if (quizOpen && choice === null && options[0]) setChoice(options[0].traditional)
    },
    '2': () => {
      if (quizOpen && choice === null && options[1]) setChoice(options[1].traditional)
    },
    '3': () => {
      if (quizOpen && choice === null && options[2]) setChoice(options[2].traditional)
    },
    '4': () => {
      if (quizOpen && choice === null && options[3]) setChoice(options[3].traditional)
    },
  })

  const allDone = done.size >= patterns.length

  return (
    <div className="rise-in space-y-6">
      <section className="rounded-2xl border border-[var(--line)] bg-white/70 p-6 backdrop-blur-sm">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">Method 02</p>
        <h2 className="display mt-2 text-3xl">Component patterns</h2>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          Learn each reversible radical once. {done.size}/{patterns.length} done · ← → to switch
        </p>
      </section>

      {allDone ? (
        <div className="rounded-2xl border border-[var(--line)] bg-white/70 p-8 text-center">
          <p className="han text-4xl text-[var(--accent)]">完</p>
          <h3 className="display mt-3 text-2xl">All patterns reviewed</h3>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Move on to divergent drills — you can revisit any pattern below.
          </p>
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {patterns.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              setIndex(i)
              setQuizOpen(false)
              setChoice(null)
            }}
            className={[
              'han chip',
              i === index
                ? 'chip-active'
                : done.has(p.id)
                  ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                  : '',
            ].join(' ')}
          >
            {p.traditional}/{p.simplified}
          </button>
        ))}
      </div>

      <article className="rounded-2xl border border-[var(--line)] bg-white/75 p-6 sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h3 className="display text-2xl">{pattern.name}</h3>
            <p className="mt-2 max-w-lg text-sm text-[var(--ink-soft)]">{pattern.tip}</p>
          </div>
          <div className="han flex items-center gap-3 text-5xl">
            <span className="text-[var(--ink)]">{pattern.traditional}</span>
            <span className="text-2xl text-[var(--accent)]">↔</span>
            <span className="text-[var(--ink-soft)]">{pattern.simplified}</span>
          </div>
        </div>

        <ul className="mt-6 grid gap-4">
          {pattern.examples.map((ex) => (
            <li
              key={`${ex.simplified}-${ex.traditional}`}
              className="rounded-xl border border-[var(--line)] bg-[var(--mist)] px-4 py-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="han text-2xl">
                    <span className="text-[var(--ink-soft)]">{ex.simplified}</span>
                    <span className="mx-2 text-[var(--accent)]">→</span>
                    <span className="font-semibold text-[var(--ink)]">{ex.traditional}</span>
                  </p>
                  <p className="mt-1 text-sm text-[var(--ink-soft)]">
                    {ex.pinyin} · {ex.meaning}
                  </p>
                </div>
                <Breakdown traditional={ex.traditional} compact />
              </div>
            </li>
          ))}
        </ul>

        {!quizOpen ? (
          <button
            type="button"
            onClick={() => {
              setQuizOpen(true)
              setChoice(null)
            }}
            className="btn-primary mt-6"
          >
            Mini-quiz
            <Kbd>Q</Kbd>
          </button>
        ) : (
          <div className="mt-6 rounded-xl border border-[var(--line)] bg-white p-4">
            <p className="text-sm text-[var(--ink-soft)]">
              Which traditional form matches{' '}
              <span className="han text-lg text-[var(--ink)]">{quizExample.simplified}</span>?
              <span className="ml-2 text-[var(--ink-faint)]">1–4</span>
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {options.map((opt, i) => {
                const selected = choice === opt.traditional
                const correct = opt.traditional === quizExample.traditional
                const show = choice !== null
                return (
                  <button
                    key={opt.traditional + opt.simplified}
                    type="button"
                    disabled={choice !== null}
                    onClick={() => setChoice(opt.traditional)}
                    className={[
                      'han relative rounded-xl border px-3 py-3 text-2xl transition',
                      show && correct
                        ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--ink)]'
                        : show && selected
                          ? 'border-[var(--warn)] bg-[#f3e4dc] text-[var(--ink)]'
                          : 'border-[var(--line)] bg-[var(--mist)] text-[var(--ink)]',
                    ].join(' ')}
                  >
                    <span className="absolute left-2 top-1 text-[0.65rem] text-[var(--ink-faint)]">
                      {i + 1}
                    </span>
                    {opt.traditional}
                  </button>
                )
              })}
            </div>
            {choice !== null ? (
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={completePattern} className="btn-primary">
                  Mark done
                  <Kbd>Enter</Kbd>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setChoice(null)
                    setQuizOpen(false)
                  }}
                  className="btn-secondary"
                >
                  Close
                  <Kbd>Esc</Kbd>
                </button>
              </div>
            ) : null}
          </div>
        )}
      </article>
    </div>
  )
}
