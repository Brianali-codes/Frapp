import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { CustomThemeProvider, useCustomTheme } from '@/context/ThemeContext';
import { Stack, useRouter, useNavigationContainerRef } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import * as SecureStore from 'expo-secure-store';
import { DeviceMessage } from 'iconsax-react-nativejs'; // Premium icon choice for splash
import 'react-native-reanimated';
import "../global.css";

function RootLayoutContent() {
  const { themeMode } = useCustomTheme();
  const router = useRouter();
  const rootNavigationRef = useNavigationContainerRef();
  const [isCheckingStorage, setIsCheckingStorage] = useState(true);
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const [targetRoute, setTargetRoute] = useState<'/(tabs)' | '/onboarding'>('/(tabs)');

  // 1. Check storage settings to determine destination route
  useEffect(() => {
    async function checkFirstLaunch() {
      try {
        const hasLaunchedBefore = await SecureStore.getItemAsync('frapp_has_launched');
        
        if (hasLaunchedBefore === null) {
          // Absolute first launch: update storage key and flag the onboarding route
          await SecureStore.setItemAsync('frapp_has_launched', 'true');
          setTargetRoute('/onboarding');
        }
      } catch (error) {
        console.error('Initialization error querying storage context:', error);
      } finally {
        setIsCheckingStorage(false);
      }
    }
    checkFirstLaunch();
  }, []);

  // 2. Monitor navigation state readiness to prevent early tab injection bugs
  useEffect(() => {
    const unsubscribe = rootNavigationRef?.addListener('state', () => {
      setIsNavigationReady(true);
    });
    return unsubscribe;
  }, [rootNavigationRef]);

  // 3. Fire the redirect only when storage checks pass AND the routing stack is ready
  useEffect(() => {
    if (!isCheckingStorage && isNavigationReady) {
      if (targetRoute === '/onboarding') {
        router.replace('/onboarding');
      }
    }
  }, [isCheckingStorage, isNavigationReady, targetRoute]);

  // --- FULL SCREEN LOADING SPLASH ---
  if (isCheckingStorage) {
    return (
      <View className="flex-1 items-center justify-center bg-zinc-950">
        <View className="w-16 h-16 bg-purple-600 rounded-2xl items-center justify-center shadow-lg mb-4">
          {/* Replaced static symbol text with premium Iconsax asset */}
          <DeviceMessage size="32" color="#ffffff" variant="Bold" />
        </View>
        <ThemedText className="text-white text-2xl font-black tracking-tight">
          Frapp<ThemedText className="text-purple-500 font-black">Store</ThemedText>
        </ThemedText>
        <ActivityIndicator size="small" color="#a855f7" className="mt-6" />
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <ThemeProvider value={themeMode === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Placed explicitly out of (tabs) context to render completely standalone */}
        <Stack.Screen name="onboarding" options={{ gestureEnabled: false, animation: 'fade' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: true }} />
      </Stack>
      
      <StatusBar style={themeMode === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView className='flex-1'>
      <CustomThemeProvider>
        <RootLayoutContent />
      </CustomThemeProvider>
    </GestureHandlerRootView>
  );
}