import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AuthLayout from '../components/layout/AuthLayout.jsx';
import LoginForm from '../components/forms/LoginForm.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = ({ email, password }) => {
    const lower = email.toLowerCase();
    const role = lower.includes('admin') ? 'admin' : lower.includes('instructor') ? 'instructor' : 'student';
    login(email, password, role);
    navigate(role === 'admin' ? '/admin' : '/dashboard');
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Login</h2>
          <p className="mt-2 text-sm text-slate-500">Access your learning dashboard.</p>
          <div className="mt-6">
            <LoginForm onSubmit={handleLogin} />
          </div>
          <p className="mt-5 text-sm text-slate-500">
            New user?{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
