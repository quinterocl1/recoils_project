import React, { createContext, useContext, useState } from 'react';
import { lightTheme, darkTheme } from './theme';
import { ThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

export function ThemeProviderComponent({ children }) {
  const [mode, setMode] = useState('light'); // Modo predeterminado

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
