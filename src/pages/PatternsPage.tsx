import { useMemo, useState } from 'react'
import { patterns } from '../data/patterns'
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

  const allDone = done.size >= patterns.length

  return (
    <div className="rise-in space-y-6">
      <section className="rounded-2xl border border-[var(--line)] bg-white/60 p-6 backdrop-blur-sm">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">Method 02</p>
        <h2 className="display mt-2 text-3xl">Component patterns</h2>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          Learn each reversible radical once. {done.size}/{patterns.length} patterns marked done.
        </p>
      </section>

      {allDone ? (
        <div className="rounded-2xl border border-[var(--line)] bg-white/55 p-8 text-center">
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
              'han rounded-full border px-3 py-1 text-sm transition',
              i === index
                ? 'border-[var(--ink)] bg-[var(--ink)] text-white'
                : done.has(p.id)
                  ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                  : 'border-[var(--line)] bg-white/60 text-[var(--ink-soft)]',
            ].join(' ')}
          >
            {p.traditional}/{p.simplified}
          </button>
        ))}
      </div>

      <article className="rounded-2xl border border-[var(--line)] bg-white/65 p-6 sm:p-8">
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

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {pattern.examples.map((ex) => (
            <li
              key={`${ex.simplified}-${ex.traditional}`}
              className="rounded-xl border border-[var(--line)] bg-[var(--mist)]/70 px-4 py-3"
            >
              <p className="han text-2xl">
                <span className="text-[var(--ink-soft)]">{ex.simplified}</span>
                <span className="mx-2 text-[var(--accent)]">→</span>
                <span className="font-semibold">{ex.traditional}</span>
              </p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">
                {ex.pinyin} · {ex.meaning}
              </p>
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
            className="mt-6 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white"
          >
            Mini-quiz this pattern
          </button>
        ) : (
          <div className="mt-6 rounded-xl border border-[var(--line)] bg-white/80 p-4">
            <p className="text-sm text-[var(--ink-soft)]">
              Which traditional form matches{' '}
              <span className="han text-lg text-[var(--ink)]">{quizExample.simplified}</span>?
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {options.map((opt) => {
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
                      'han rounded-xl border px-3 py-3 text-2xl transition',
                      show && correct
                        ? 'border-[var(--accent)] bg-[var(--accent-soft)]'
                        : show && selected
                          ? 'border-[var(--warn)] bg-[#f3e4dc]'
                          : 'border-[var(--line)] bg-[var(--mist)]',
                    ].join(' ')}
                  >
                    {opt.traditional}
                  </button>
                )
              })}
            </div>
            {choice !== null ? (
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={completePattern}
                  className="rounded-full bg-[var(--ink)] px-4 py-2 text-sm text-white"
                >
                  Mark pattern done
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setChoice(null)
                    setQuizOpen(false)
                  }}
                  className="rounded-full border border-[var(--line)] px-4 py-2 text-sm"
                >
                  Close quiz
                </button>
              </div>
            ) : null}
          </div>
        )}
      </article>
    </div>
  )
}
