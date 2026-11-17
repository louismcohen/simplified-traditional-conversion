const STORAGE_KEY = 'trad-transition-progress-v1'

export type ProgressState = {
  knownIds: string[]
  strugglingIds: string[]
  patternDone: string[]
  quizBest: number
}

const defaultState: ProgressState = {
  knownIds: [],
  strugglingIds: [],
  patternDone: [],
  quizBest: 0,
}

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaultState }
    const parsed = JSON.parse(raw) as Partial<ProgressState>
    return {
      knownIds: parsed.knownIds ?? [],
      strugglingIds: parsed.strugglingIds ?? [],
      patternDone: parsed.patternDone ?? [],
      quizBest: parsed.quizBest ?? 0,
    }
  } catch {
    return { ...defaultState }
  }
}

export function saveProgress(state: ProgressState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function markKnown(id: string) {
  const state = loadProgress()
  state.knownIds = [...new Set([...state.knownIds, id])]
  state.strugglingIds = state.strugglingIds.filter((x) => x !== id)
  saveProgress(state)
  return state
}

export function markStruggling(id: string) {
  const state = loadProgress()
  state.strugglingIds = [...new Set([...state.strugglingIds, id])]
  state.knownIds = state.knownIds.filter((x) => x !== id)
  saveProgress(state)
  return state
}

export function markPatternDone(id: string) {
  const state = loadProgress()
  state.patternDone = [...new Set([...state.patternDone, id])]
  saveProgress(state)
  return state
}

export function setQuizBest(score: number) {
  const state = loadProgress()
  state.quizBest = Math.max(state.quizBest, score)
  saveProgress(state)
  return state
}

export function resetProgress() {
  saveProgress({ ...defaultState })
  return { ...defaultState }
}
