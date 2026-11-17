import { NavLink, Outlet } from 'react-router-dom'

const links = [
  { to: '/', label: 'Methods', end: true },
  { to: '/patterns', label: 'Patterns' },
  { to: '/drill', label: 'Drill' },
  { to: '/quiz', label: 'Quiz' },
]

export function Layout() {
  return (
    <div className="mx-auto flex min-h-svh w-full max-w-3xl flex-col px-4 pb-10 pt-5 sm:px-6">
      <header className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="han text-sm tracking-[0.2em] text-[var(--accent)]">繁簡橋</p>
          <h1 className="display mt-1 text-3xl leading-none text-[var(--ink)] sm:text-4xl">
            Transition Learner
          </h1>
          <p className="mt-2 max-w-md text-sm text-[var(--ink-soft)]">
            HSK 1 simplified → Taiwan traditional, through patterns and deliberate practice.
          </p>
        </div>
        <nav className="flex flex-wrap gap-1 rounded-full border border-[var(--line)] bg-white/55 p-1 backdrop-blur-sm">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                [
                  'rounded-full px-3 py-1.5 text-sm transition-colors',
                  isActive
                    ? 'bg-[var(--ink)] text-[var(--mist)]'
                    : 'text-[var(--ink-soft)] hover:bg-white/80',
                ].join(' ')
              }
            >
              {link.label}
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
