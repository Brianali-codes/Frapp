import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = '@user_theme_mode';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  isThemeLoaded: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useDeviceColorScheme();
  
  // Initial fallback to system theme
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    (systemScheme as ThemeMode) || 'light'
  );
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // 1. Load saved theme preference on app start
  useEffect(() => {
    async function loadTheme() {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme === 'light' || savedTheme === 'dark') {
          setThemeMode(savedTheme);
        }
      } catch (error) {
        console.error('Failed to load theme from AsyncStorage:', error);
      } finally {
        setIsThemeLoaded(true);
      }
    }

    loadTheme();
  }, []);

  // 2. Toggle function that updates state and persists choice
  const toggleTheme = async () => {
    const nextTheme: ThemeMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(nextTheme);

    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (error) {
      console.error('Failed to save theme to AsyncStorage:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, isThemeLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to grab the theme switcher in any screen
export function useCustomTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useCustomTheme must be used within a CustomThemeProvider');
  }
  return context;
}