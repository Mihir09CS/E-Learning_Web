import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const defaultUser = {
  id: 'u1',
  name: 'Contest Student',
  email: 'student@example.com',
  role: 'student',
  enrolledCourses: ['react-foundation', 'ai-workflows'],
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(defaultUser);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = (email, _password, role = 'student') => {
    const name = email.split('@')[0] || 'Learner';
    setUser({ ...defaultUser, name, email, role });
    setIsAuthenticated(true);
  };

  const register = (name, email, _password, role = 'student') => {
    setUser({ ...defaultUser, name, email, role, enrolledCourses: [] });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const enrollCourse = (courseId) => {
    setUser((prev) => {
      if (!prev) return prev;
      if (prev.enrolledCourses.includes(courseId)) return prev;
      return { ...prev, enrolledCourses: [...prev.enrolledCourses, courseId] };
    });
  };

  const value = useMemo(
    () => ({ user, isAuthenticated, login, register, logout, enrollCourse }),
    [isAuthenticated, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
