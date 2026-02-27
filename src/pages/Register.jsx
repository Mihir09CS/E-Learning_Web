import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import AuthLayout from '../components/layout/AuthLayout.jsx';
import RegisterForm from '../components/forms/RegisterForm.jsx';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (form) => {
    register(form.name, form.email, form.password, form.role);
    navigate('/dashboard');
  };

  return (
    <AuthLayout
      heading="Create Your Account"
      subheading="Join the platform to learn, track progress, and unlock role-based workflow."
      panelTag="Build Your Future"
      panelText="Learn faster with focused structure."
    >
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Create Your Account</h2>
          <p className="mt-2 text-sm text-slate-500">
            Start your learning path with role-based workflow and progress tracking.
          </p>
          <div className="mt-6">
            <RegisterForm onSubmit={handleRegister} />
          </div>
          <p className="mt-5 text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-indigo-600 transition hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
