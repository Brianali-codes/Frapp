import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { CustomThemeProvider, useCustomTheme } from '@/context/ThemeContext';
import { Stack, useRouter, useNavigationContainerRef } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import "../global.css";
import { checkNotificationPermission, initNotifications } from '@/lib/notifications';
import { useAssets } from 'expo-asset'; // Pre-load asset reference

import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from '@expo-google-fonts/montserrat';

// Prevent the splash screen from auto-hiding prematurely
SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const { themeMode } = useCustomTheme();
  const router = useRouter();
  const rootNavigationRef = useNavigationContainerRef();
  const [isCheckingStorage, setIsCheckingStorage] = useState(true);
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const [targetRoute, setTargetRoute] = useState<'/(tabs)' | '/onboarding'>('/(tabs)');

  // 1. Force the image asset memory stack to resolve synchronously
  const [assets, assetsError] = useAssets([require('@/assets/images/FRAPP_ICON1.png')]);

  // 2. Register Montserrat Font weights inside the bundler map
  const [fontsLoaded, fontError] = useFonts({
    'Mont-Regular': Montserrat_400Regular,
    'Mont-Bold': Montserrat_700Bold,
    'Mont-ExtraBold': Montserrat_800ExtraBold,
    'Mont-Black': Montserrat_900Black,
  });

  // 3. Check storage settings to determine destination route
  useEffect(() => {
    async function checkFirstLaunch() {
      try {
        const hasLaunchedBefore = await SecureStore.getItemAsync('frapp_has_launched');

        if (hasLaunchedBefore === null) {
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

  // 4. Monitor navigation state readiness to prevent early tab injection bugs
  useEffect(() => {
    const unsubscribe = rootNavigationRef?.addListener('state', () => {
      setIsNavigationReady(true);
    });
    return unsubscribe;
  }, [rootNavigationRef]);

  // 5. Hide native splash ONLY when fonts, storage, AND assets are confirmed ready together
  useEffect(() => {
    const isAppReady = !isCheckingStorage && (fontsLoaded || fontError) && (assets || assetsError);

    if (isAppReady && isNavigationReady) {
      SplashScreen.hideAsync();
      initNotifications();
      checkNotificationPermission();

      if (targetRoute === '/onboarding') {
        router.replace('/onboarding');
      }
    }
  }, [isCheckingStorage, fontsLoaded, fontError, assets, assetsError, isNavigationReady, targetRoute]);

  // --- MINIMAL DESIGN ENGINE LOADING SPLASH ---
  // If fonts are loading OR assets are loading OR storage is checking, keep layout locked
  if (isCheckingStorage || !fontsLoaded || !assets) {
    return (
      <View className="flex-1 items-center justify-center bg-zinc-950">
        <Image
          source={require('@/assets/images/FRAPP_ICON1.png')}
          style={{ width: 96, height: 96, borderRadius: 16 }}
          className="w-24 h-24"
          resizeMode="cover" // Clean crop edges over rounded corners
        />

        {/* Rendered at the exact same fraction of a second with no delay */}
        <ActivityIndicator size="small" color="#a855f7" className="mt-8" />
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <ThemeProvider value={themeMode === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
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