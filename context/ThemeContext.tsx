import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  // 1. Fallback to the device's default system theme initially
  const systemScheme = useDeviceColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>((systemScheme as ThemeMode) || 'light');

  // 2. Synchronize with system changes if they happen
  useEffect(() => {
    if (systemScheme) {
      setThemeMode(systemScheme as ThemeMode);
    }
  }, [systemScheme]);

  // 3. The toggle function that your button will press
  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to easily grab the theme switcher in any screen
export function useCustomTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
}