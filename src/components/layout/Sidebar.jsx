import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/courses', label: 'Courses' },
  { to: '/profile', label: 'Profile' },
  { to: '/admin', label: 'Admin' },
  { to: '/help', label: 'Help' },
];

export default function Sidebar() {
  return (
    <aside className="glass-card p-3">
      <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Navigation</p>
      <nav className="space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white/70'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
