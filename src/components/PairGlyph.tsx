type Props = {
  simplified: string
  traditional: string
  identical?: boolean
  size?: 'md' | 'lg'
}

export function PairGlyph({ simplified, traditional, identical, size = 'md' }: Props) {
  const charClass = size === 'lg' ? 'text-6xl sm:text-7xl' : 'text-4xl sm:text-5xl'

  if (identical || simplified === traditional) {
    return (
      <div className="char-pop flex flex-col items-center gap-1">
        <span className={`han ${charClass} font-semibold text-[var(--ink)]`}>{traditional}</span>
        <span className="text-xs uppercase tracking-[0.18em] text-[var(--ink-soft)]">same form</span>
      </div>
    )
  }

  return (
    <div className="char-pop flex items-end justify-center gap-6 sm:gap-10">
      <div className="text-center">
        <span className={`han ${charClass} text-[var(--ink-soft)]`}>{simplified}</span>
        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--ink-soft)]">simplified</p>
      </div>
      <span className="mb-8 text-[var(--accent)]" aria-hidden>
        →
      </span>
      <div className="text-center">
        <span className={`han ${charClass} font-semibold text-[var(--ink)]`}>{traditional}</span>
        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--accent)]">traditional</p>
      </div>
    </div>
  )
}
