import { useMemo, useState } from 'react';
import InputField from './InputField.jsx';
import Button from '../ui/Button.jsx';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthForm({ type = 'login', onSubmit }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => {
    const next = {};
    if (type === 'register' && !form.name.trim()) next.name = 'Name is required';
    if (!emailPattern.test(form.email)) next.email = 'Enter a valid email';
    if (form.password.length < 6) next.password = 'Password must be 6+ characters';
    return next;
  }, [form, type]);

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ name: true, email: true, password: true });
    if (!isValid) return;
    onSubmit(form);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {type === 'register' ? (
        <InputField
          label="Full Name"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          error={touched.name ? errors.name : ''}
        />
      ) : null}

      <InputField
        label="Email"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={form.email}
        onChange={handleChange}
        error={touched.email ? errors.email : ''}
      />

      <InputField
        label="Password"
        name="password"
        type="password"
        placeholder="Minimum 6 characters"
        value={form.password}
        onChange={handleChange}
        error={touched.password ? errors.password : ''}
      />

      {type === 'login' ? (
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Role</span>
          <select name="role" value={form.role} onChange={handleChange} className="input-base">
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
        </label>
      ) : null}

      <Button type="submit" disabled={!isValid} className={!isValid ? 'cursor-not-allowed opacity-60' : ''}>
        {type === 'register' ? 'Create account' : 'Login'}
      </Button>
    </form>
  );
}
