import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CourseProvider } from './context/CourseContext.jsx';
import { ThemeModeProvider } from './context/ThemeModeContext.jsx';
import './index.css';

const STORAGE_KEY = 'learnflow-theme-mode';

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  try {
    const savedMode = window.localStorage.getItem(STORAGE_KEY);
    const mode = savedMode === 'light' || savedMode === 'dark' ? savedMode : 'dark';
    document.documentElement.setAttribute('data-theme', mode);
  } catch {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeModeProvider>
      <BrowserRouter>
        <AuthProvider>
          <CourseProvider>
            <App />
          </CourseProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeModeProvider>
  </StrictMode>
);
