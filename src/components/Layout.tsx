import { useMemo } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useHotkeys } from '../hooks/useHotkeys'

const links: { to: string; label: string; end?: boolean; key: string }[] = [
  { to: '/', label: 'Methods', end: true, key: 'M' },
  { to: '/patterns', label: 'Patterns', key: 'P' },
  { to: '/drill', label: 'Drill', key: 'D' },
  { to: '/quiz', label: 'Quiz', key: 'U' },
]

export function Layout() {
  const navigate = useNavigate()
  const hotkeys = useMemo(
    () => ({
      m: () => navigate('/'),
      p: () => navigate('/patterns'),
      d: () => navigate('/drill'),
      u: () => navigate('/quiz'),
    }),
    [navigate],
  )
  useHotkeys(hotkeys)

  return (
    <div className="mx-auto flex min-h-svh w-full max-w-3xl flex-col px-4 pb-10 pt-5 sm:px-6">
      <header className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="han text-sm tracking-[0.2em] text-[var(--accent)]">繁簡橋</p>
          <h1 className="display mt-1 text-3xl leading-none text-[var(--ink)] sm:text-4xl">
            Transition Learner
          </h1>
          <p className="mt-2 max-w-md text-sm text-[var(--ink-soft)]">
            HSK 1 simplified → Taiwan traditional, through patterns and deliberate practice.
          </p>
        </div>
        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-[var(--line)] pb-1 sm:border-0 sm:pb-0"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                [
                  'group inline-flex items-baseline gap-1 py-1 text-sm transition-colors',
                  isActive
                    ? 'font-semibold text-[var(--ink)]'
                    : 'text-[var(--ink-soft)] hover:text-[var(--ink)]',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  <span className={isActive ? 'border-b-2 border-[var(--accent)] pb-0.5' : ''}>
                    {link.label}
                  </span>
                  <span className="text-[0.65rem] font-medium text-[var(--ink-faint)]">
                    {link.key}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
