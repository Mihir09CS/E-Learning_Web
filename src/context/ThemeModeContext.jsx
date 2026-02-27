import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { getAppTheme } from '../theme/appTheme.js';

const ThemeModeContext = createContext({
  mode: 'dark',
  toggleTheme: () => {},
});

const STORAGE_KEY = 'learnflow-theme-mode';

function getInitialMode() {
  if (typeof window === 'undefined') return 'dark';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return 'dark';
}

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      toggleTheme: () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark')),
    }),
    [mode]
  );

  const muiTheme = useMemo(() => getAppTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  return useContext(ThemeModeContext);
}
