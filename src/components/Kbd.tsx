export function Kbd({ children }: { children: string }) {
  return (
    <kbd className="ml-1.5 inline-block translate-y-px font-sans text-[0.7rem] font-medium tracking-wide text-[var(--ink-faint)]">
      {children}
    </kbd>
  )
}
