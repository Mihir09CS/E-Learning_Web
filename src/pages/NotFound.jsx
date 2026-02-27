import { Link, useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <section className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-indigo-500">Page Not Found</p>
          <h1 className="mt-2 text-7xl font-bold text-slate-900 sm:text-8xl">
            4<span className="text-indigo-600">0</span>4
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm text-slate-600 sm:text-base">
            The page you are looking for does not exist, was moved, or the URL was entered incorrectly.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">Return to your dashboard and continue learning.</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/" className="btn-primary">
              Go to Home
            </Link>
            <button onClick={() => navigate(-1)} className="btn-secondary">
              Go Back
            </button>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {['Smart picks', 'Mood-based AI', 'Personalized feed'].map((item) => (
              <span key={item} className="rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-xs text-slate-600">
                {item}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
