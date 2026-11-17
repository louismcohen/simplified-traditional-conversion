import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PairGlyph } from '../components/PairGlyph'
import { divergentPairs, identicalPairs, type CharPair } from '../data/hsk1-pairs'
import { patterns } from '../data/patterns'
import { loadProgress, markKnown, markStruggling, resetProgress } from '../lib/progress'

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5)
}

export function DrillPage() {
  const [params] = useSearchParams()
  const mode = params.get('mode') === 'identical' ? 'identical' : 'divergent'
  const deck = mode === 'identical' ? identicalPairs : divergentPairs

  const [order, setOrder] = useState(() => shuffle(deck.map((d) => d.id)))
  const [cursor, setCursor] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [progress, setProgress] = useState(() => loadProgress())

  useEffect(() => {
    setOrder(shuffle(deck.map((d) => d.id)))
    setCursor(0)
    setFlipped(false)
  }, [mode, deck])

  const byId = useMemo(() => {
    const map = new Map<string, CharPair>()
    for (const item of deck) map.set(item.id, item)
    return map
  }, [deck])

  const current = byId.get(order[cursor % Math.max(order.length, 1)])
  const pattern = current?.patternId
    ? patterns.find((p) => p.id === current.patternId)
    : undefined

  const knownCount = progress.knownIds.filter((id) => deck.some((d) => d.id === id)).length

  function next() {
    setFlipped(false)
    setCursor((c) => c + 1)
  }

  function onKnow() {
    if (!current) return
    setProgress(markKnown(current.id))
    next()
  }

  function onStruggle() {
    if (!current) return
    setProgress(markStruggling(current.id))
    next()
  }

  function reshuffle() {
    setOrder(shuffle(deck.map((d) => d.id)))
    setCursor(0)
    setFlipped(false)
  }

  if (!current) {
    return (
      <div className="rounded-2xl border border-[var(--line)] bg-white/60 p-8 text-center">
        <p className="text-[var(--ink-soft)]">No cards in this deck.</p>
      </div>
    )
  }

  const caughtUp =
    mode === 'divergent' &&
    knownCount >= deck.length &&
    progress.strugglingIds.filter((id) => deck.some((d) => d.id === id)).length === 0

  return (
    <div className="rise-in space-y-6">
      <section className="rounded-2xl border border-[var(--line)] bg-white/60 p-6 backdrop-blur-sm">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">
          {mode === 'identical' ? 'Method 01' : 'Method 03'}
        </p>
        <h2 className="display mt-2 text-3xl">
          {mode === 'identical' ? 'Same-form characters' : 'Divergent flashcards'}
        </h2>
        <p className="mt-2 text-sm text-[var(--ink-soft)]">
          {mode === 'identical'
            ? 'Flip through forms that stay the same — then spend your energy on the divergent deck.'
            : `${knownCount}/${deck.length} marked known · tap the card to reveal traditional.`}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to="/drill"
            className={[
              'rounded-full px-3 py-1.5 text-sm',
              mode === 'divergent' ? 'bg-[var(--ink)] text-white' : 'border border-[var(--line)]',
            ].join(' ')}
          >
            Divergent
          </Link>
          <Link
            to="/drill?mode=identical"
            className={[
              'rounded-full px-3 py-1.5 text-sm',
              mode === 'identical' ? 'bg-[var(--ink)] text-white' : 'border border-[var(--line)]',
            ].join(' ')}
          >
            Identical
          </Link>
          <button
            type="button"
            onClick={reshuffle}
            className="rounded-full border border-[var(--line)] px-3 py-1.5 text-sm"
          >
            Reshuffle
          </button>
          {mode === 'divergent' ? (
            <button
              type="button"
              onClick={() => {
                resetProgress()
                setProgress(loadProgress())
              }}
              className="rounded-full border border-[var(--line)] px-3 py-1.5 text-sm text-[var(--warn)]"
            >
              Reset progress
            </button>
          ) : null}
        </div>
      </section>

      {caughtUp ? (
        <div className="rounded-2xl border border-[var(--accent)] bg-[var(--accent-soft)] p-6 text-center">
          <h3 className="display text-2xl">All caught up</h3>
          <p className="mt-2 text-sm text-[var(--ink-soft)]">
            Every divergent card is marked known. Run a quiz to keep recognition sharp, or reshuffle for
            review.
          </p>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="w-full rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-10 text-center shadow-sm transition hover:border-[var(--accent)]"
      >
        {!flipped ? (
          <div className="char-pop space-y-3">
            <p className="han text-7xl font-semibold sm:text-8xl">{current.simplified}</p>
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--ink-soft)]">
              tap to reveal traditional
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <PairGlyph
              simplified={current.simplified}
              traditional={current.traditional}
              identical={current.identical}
              size="lg"
            />
            <p className="text-[var(--ink-soft)]">
              {current.pinyin} · {current.meaning}
            </p>
            {pattern ? (
              <p className="text-sm text-[var(--accent)]">
                Pattern: {pattern.name} ({pattern.traditional} ↔ {pattern.simplified})
              </p>
            ) : null}
          </div>
        )}
      </button>

      <div className="flex flex-wrap justify-center gap-3">
        {mode === 'divergent' ? (
          <>
            <button
              type="button"
              onClick={onStruggle}
              className="rounded-full border border-[var(--line)] bg-white/70 px-5 py-2.5 text-sm"
            >
              Still learning
            </button>
            <button
              type="button"
              onClick={onKnow}
              className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white"
            >
              Know it
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={next}
            className="rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-white"
          >
            Next identical form
          </button>
        )}
      </div>
    </div>
  )
}
