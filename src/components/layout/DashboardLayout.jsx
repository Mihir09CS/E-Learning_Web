import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import ChatbotWidget from '../chatbot/ChatbotWidget.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useThemeMode } from '../../context/ThemeModeContext.jsx';

export default function DashboardLayout({ title, subtitle, children }) {
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useThemeMode();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="saas-bg min-h-screen">
      <div className="saas-blob saas-blob-one" />
      <div className="saas-blob saas-blob-two" />
      <div className="saas-blob saas-blob-three" />
      <div className="app-shell py-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Link to="/" className="text-2xl font-bold tracking-tight text-slate-900">
            LearnFlow
          </Link>
          <div className="flex items-center gap-2">
            <button className="btn-secondary md:hidden" onClick={() => setOpenMenu((prev) => !prev)}>
              Menu
            </button>
            <button className="btn-secondary" onClick={toggleTheme}>
              {mode === 'dark' ? 'Light' : 'Dark'}
            </button>
            <button className="btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-12">
          <div className={`${openMenu ? 'block' : 'hidden'} md:col-span-3 md:block`}>
            <Sidebar />
          </div>

          <main className="space-y-4 md:col-span-9">
            <section className="glass-elevated soft-gradient-panel dashboard-enter p-5">
              <p className="label-muted">Welcome, {user?.name ?? 'Learner'}</p>
              <h1 className="heading mt-1 text-2xl">{title}</h1>
              {subtitle ? <p className="mt-2 text-sm text-slate-600">{subtitle}</p> : null}
            </section>
            {children}
          </main>
        </div>
      </div>

      <ChatbotWidget />
    </div>
  );
}
