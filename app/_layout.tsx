import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { CustomThemeProvider, useCustomTheme } from '@/context/ThemeContext';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import "../global.css";

// 1. Create a wrapper component inside the layout file so we can consume the theme context safely.
// (You cannot call useCustomTheme() in the same component that creates the <CustomThemeProvider>).
function RootLayoutContent() {
  const { themeMode } = useCustomTheme();

  return (
    <ThemeProvider value={themeMode === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      {/* 2. Dynamically change the Status Bar text style based on the manual theme toggle */}
      <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView className='flex-1'>
      {/* 3. The Provider sits at the absolute top, passing down the theme global state */}
      <CustomThemeProvider>
        <RootLayoutContent />
      </CustomThemeProvider>
    </GestureHandlerRootView>
  );
}