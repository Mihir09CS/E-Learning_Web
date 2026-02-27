import { createTheme } from '@mui/material/styles';

export function getAppTheme(mode = 'dark') {
  return createTheme({
    palette: {
      mode,
      primary: { main: '#6366f1' },
      secondary: { main: '#8b5cf6' },
      background: {
        default: mode === 'dark' ? '#090c1a' : '#f8fafc',
        paper: mode === 'dark' ? 'rgba(255,255,255,0.72)' : '#ffffff',
      },
      text: {
        primary: '#0f172a',
        secondary: '#475569',
      },
    },
    shape: {
      borderRadius: 14,
    },
    typography: {
      fontFamily: '"Inter","Segoe UI",Tahoma,Geneva,Verdana,sans-serif',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 600 },
      h3: { fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    spacing: 8,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            boxShadow: 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(10px)',
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          size: 'small',
        },
      },
    },
  });
}
