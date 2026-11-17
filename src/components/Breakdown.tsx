import { getBreakdown, roleText, type CharPart } from '../data/breakdowns'

function PartRow({ part }: { part: CharPart }) {
  return (
    <li className="flex items-baseline gap-3 border-b border-[var(--line)] py-2 last:border-0">
      <div className="han flex min-w-[3.5rem] items-baseline gap-1 text-2xl font-semibold text-[var(--ink)]">
        <span>{part.glyph}</span>
        {part.simplified && part.simplified !== part.glyph ? (
          <span className="text-base font-normal text-[var(--ink-faint)]">/{part.simplified}</span>
        ) : null}
      </div>
      <div className="min-w-0 flex-1 text-left">
        <p className="text-sm font-medium text-[var(--ink)]">
          <span className="mr-2 font-normal text-[var(--ink-soft)]">{part.pinyin}</span>
          {part.gloss}
        </p>
        <p className="text-xs text-[var(--ink-faint)]">{roleText(part.role)}</p>
      </div>
    </li>
  )
}

type Props = {
  traditional: string
  compact?: boolean
}

export function Breakdown({ traditional, compact }: Props) {
  const data = getBreakdown(traditional)
  if (!data) return null

  return (
    <div
      className={[
        'char-pop w-full max-w-md text-left',
        compact
          ? 'rounded-xl border border-[var(--line)] bg-[var(--mist)]/90 px-3 py-2'
          : 'rounded-xl border border-[var(--line)] bg-[var(--mist)] px-4 py-3',
      ].join(' ')}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <p className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--ink-faint)]">
        Components
      </p>
      <ul className={compact ? 'mt-1' : 'mt-2'}>
        {data.parts.map((part) => (
          <PartRow key={`${part.glyph}-${part.gloss}`} part={part} />
        ))}
      </ul>
      <p className="mt-2 text-sm leading-snug text-[var(--ink-soft)]">{data.story}</p>
    </div>
  )
}
