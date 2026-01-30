import { Link, NavLink } from 'react-router-dom'
import { Container } from './ui'

export function SiteHeader({ cartCount }: { cartCount: number }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-2xl bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200">
              <span className="text-sm font-black">S</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">SuppleStore</div>
              <div className="text-xs text-slate-500">Modern supplements shop</div>
            </div>
          </Link>

          <nav className="flex items-center gap-1 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                'rounded-xl px-3 py-2 font-semibold ' +
                (isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-50')
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                'rounded-xl px-3 py-2 font-semibold ' +
                (isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-50')
              }
            >
              Cart
              {cartCount > 0 ? (
                <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800 ring-1 ring-emerald-200">
                  {cartCount}
                </span>
              ) : null}
            </NavLink>
          </nav>
        </div>
      </Container>
    </header>
  )
}
