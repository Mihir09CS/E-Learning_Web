import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { to: '/courses', label: 'Courses' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/help', label: 'Support' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="app-shell flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-slate-900">
          LearnFlow
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/login" className="btn-secondary">
            Login
          </Link>
          <Link to="/register" className="btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
