import { useMemo, useState } from 'react';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;

function FieldIcon({ type }) {
  if (type === 'password') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 1 1 8 0v3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function FloatingInput({ label, name, type = 'text', value, onChange, onBlur, error, rightSlot }) {
  const hasValue = Boolean(value);

  return (
    <label className="group relative block">
      <span
        className={`pointer-events-none absolute left-11 transition-all duration-200 ${
          hasValue ? 'top-2 text-xs text-indigo-600' : 'top-4 text-sm text-slate-400'
        }`}
      >
        {label}
      </span>
      <span className={`pointer-events-none absolute left-3 top-3 text-slate-400 transition-colors ${error ? 'text-rose-500' : 'group-focus-within:text-indigo-600'}`}>
        <FieldIcon type={type} />
      </span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={type === 'password' ? 'current-password' : 'email'}
        className={`h-14 w-full rounded-xl border bg-white pl-11 pr-4 pt-5 text-sm text-slate-800 outline-none transition duration-300 focus:scale-[1.01] focus:ring-2 ${
          error
            ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-200'
            : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-200'
        }`}
        aria-invalid={Boolean(error)}
      />
      {rightSlot ? <span className="absolute right-3 top-3">{rightSlot}</span> : null}
      {error ? <span className="mt-1 block text-xs text-rose-500">{error}</span> : null}
    </label>
  );
}

export default function LoginForm({ onSubmit }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [shake, setShake] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const errors = useMemo(() => {
    const next = {};
    const email = form.email.trim();
    const password = form.password.trim();

    if (!email) next.email = 'Email is required';
    else if (!emailPattern.test(email)) next.email = 'Enter a valid email address';

    if (!password) next.password = 'Password is required';
    else if (!passwordPattern.test(password)) next.password = 'Min 6 chars with at least 1 letter and 1 number';

    return next;
  }, [form.email, form.password]);

  const isValid = Object.keys(errors).length === 0;
  const isComplete = Boolean(form.email.trim() && form.password.trim());

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setTouched({ email: true, password: true });

    if (!isValid) {
      setShake(true);
      window.setTimeout(() => setShake(false), 350);
      return;
    }

    setSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 900));
    onSubmit({ email: form.email.trim(), password: form.password.trim() });
    setSubmitting(false);
  };

  return (
    <form className={`space-y-4 ${shake ? 'animate-shake-x' : ''}`} onSubmit={handleSubmit}>
      <FloatingInput
        label="Email Address"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email ? errors.email : ''}
      />

      <FloatingInput
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={form.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password ? errors.password : ''}
        rightSlot={
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 3 21 21" />
                <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                <path d="M9.4 5.2A11.5 11.5 0 0 1 12 5c5.5 0 9.5 4.5 10 7-.2 1-1 2.3-2.2 3.6" />
                <path d="M6.3 6.3C4.4 7.5 3.2 9.1 2 12c.8 1.8 2 3.5 3.7 4.8" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        }
      />

      <button
        type="submit"
        disabled={!isComplete || !isValid || submitting}
        className="flex h-11 w-full items-center justify-center rounded-lg bg-indigo-600 font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:bg-indigo-700 hover:shadow-[0_12px_26px_rgba(79,70,229,0.45)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/80 border-t-transparent" />
            Signing in...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 17l5-5-5-5" />
              <path d="M15 12H3" />
              <path d="M21 3v18" />
            </svg>
            Sign In
          </span>
        )}
      </button>

      <button
        type="button"
        className="flex h-11 w-full items-center justify-center rounded-lg border border-slate-300 bg-white font-medium text-slate-700 transition duration-300 hover:bg-slate-50"
      >
        <span className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.9-5.5 3.9-3.3 0-6-2.8-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.2 14.6 2.2 12 2.2 6.8 2.2 2.6 6.4 2.6 11.7S6.8 21.2 12 21.2c6.9 0 9.1-4.8 9.1-7.3 0-.5-.1-.9-.1-1.3H12Z" />
          </svg>
          Login with Google
        </span>
      </button>
    </form>
  );
}
