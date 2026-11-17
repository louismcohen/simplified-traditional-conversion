import { Link } from 'react-router-dom'
import { divergentPairs, identicalPairs } from '../data/hsk1-pairs'
import { loadProgress } from '../lib/progress'

const methods = [
  {
    step: '01',
    title: 'Same-form first',
    body: 'Many HSK 1 characters never changed. Confirm them once so your study time goes to the ones that actually differ.',
    to: '/drill?mode=identical',
    cta: 'Browse identical forms',
  },
  {
    step: '02',
    title: 'Component patterns',
    body: 'Simplification often shrank radicals (门←門, 讠←言). Learn the pattern once, then reverse it across many words. Flip cards also break each character into parts — meaning, sound, and a short story.',
    to: '/patterns',
    cta: 'Study patterns',
  },
  {
    step: '03',
    title: 'Divergent flashcards',
    body: 'Drill only the HSK 1 items where simplified ≠ traditional — 学/學, 国/國, 这/這, and the rest of this deck.',
    to: '/drill',
    cta: 'Start drilling',
  },
  {
    step: '04',
    title: 'Recognition ↔ production',
    body: 'Alternate seeing simplified and choosing traditional with reading traditional for meaning/pinyin, so the forms become readable.',
    to: '/quiz',
    cta: 'Take a quiz',
  },
]

export function HomePage() {
  const progress = loadProgress()
  const known = progress.knownIds.length
  const total = divergentPairs.length
  const continueTo =
    progress.patternDone.length < 3
      ? '/patterns'
      : known < Math.ceil(total / 2)
        ? '/drill'
        : '/quiz'

  return (
    <div className="rise-in space-y-8">
      <section className="rounded-2xl border border-[var(--line)] bg-white/60 p-6 backdrop-blur-sm sm:p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">How to transition</p>
        <h2 className="display mt-2 text-3xl text-[var(--ink)] sm:text-4xl">
          Four ways to move from simplified to traditional
        </h2>
        <p className="mt-3 max-w-xl text-[var(--ink-soft)]">
          This is a study surface, not a converter. Work the methods in order, then loop drill and quiz
          until the divergent set feels automatic.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[var(--ink-soft)]">
          <span className="rounded-full border border-[var(--line)] bg-[var(--accent-soft)] px-3 py-1 font-medium text-[var(--accent)]">
            {identicalPairs.length} identical
          </span>
          <span className="rounded-full border border-[var(--line)] bg-[var(--accent-soft)] px-3 py-1 font-medium text-[var(--accent)]">
            {divergentPairs.length} to learn
          </span>
          <span>
            Progress: {known}/{total} marked known
            {progress.quizBest > 0 ? ` · quiz best ${progress.quizBest}` : ''}
          </span>
        </div>
        <Link to={continueTo} className="btn-primary mt-6">
          Continue studying
        </Link>
      </section>

      <ol className="grid gap-4">
        {methods.map((method, index) => (
          <li
            key={method.step}
            className="rise-in rounded-2xl border border-[var(--line)] bg-white/50 p-5 sm:p-6"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs tracking-[0.22em] text-[var(--ink-soft)]">{method.step}</p>
                <h3 className="display mt-1 text-2xl">{method.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--ink-soft)]">
                  {method.body}
                </p>
              </div>
              <Link to={method.to} className="btn-secondary shrink-0 self-start">
                {method.cta}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
