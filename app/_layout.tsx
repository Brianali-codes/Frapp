import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { CustomThemeProvider, useCustomTheme } from '@/context/ThemeContext';
import { Stack, useRouter, useNavigationContainerRef } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Image, Modal, Linking, Pressable } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import "../global.css";
import { checkNotificationPermission, initNotifications } from '@/lib/notifications';
import { useAssets } from 'expo-asset'; // Pre-load asset reference
import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/custom/Button';
import { CloseCircle } from 'iconsax-react-nativejs';

import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from '@expo-google-fonts/montserrat';

// Local app tracking baseline
const CURRENT_VERSION = 'v1.1.1';

// Prevent the splash screen from auto-hiding prematurely
SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const { themeMode } = useCustomTheme();
  const router = useRouter();
  const rootNavigationRef = useNavigationContainerRef();
  const [isCheckingStorage, setIsCheckingStorage] = useState(true);
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const [targetRoute, setTargetRoute] = useState<'/(tabs)' | '/onboarding'>('/(tabs)');

  // --- AUTOMATED UPDATE CHECK STATES ---
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({ latestTag: '', downloadUrl: '' });

  const isDark = themeMode === 'dark';
  const adaptiveBorderColor = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.07)';

  // Helper function to sanitize version prefixes (e.g. "Frappv1.1.0" or "v1.1.0" -> "1.1.0")
  const cleanVersion = (versionStr: string) => {
    return versionStr.replace(/[^0-9.]/g, '');
  };

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

  // --- BACKGROUND UPDATE CHECK LOGIC ---
  useEffect(() => {
    async function silentLaunchUpdateCheck() {
      try {
        const response = await fetch('https://api.github.com/repos/Brianali-codes/FRAPP/releases/latest');
        if (!response.ok) return; // Fail silently in background on launch

        const data = await response.json();
        const rawLatestVersion = data.tag_name;

        if (rawLatestVersion) {
          const localClean = cleanVersion(CURRENT_VERSION);
          const remoteClean = cleanVersion(rawLatestVersion);

          if (remoteClean && remoteClean !== localClean) {
            setUpdateInfo({
              latestTag: rawLatestVersion,
              downloadUrl: data.html_url || 'https://github.com/Brianali-codes/FRAPP'
            });
            setUpdateModalVisible(true);
          }
        }
      } catch (error) {
        // Fail completely silently to allow seamless offline app startup usage
        console.log('Silent update verification check bypassed (likely offline state).');
      }
    }
    
    // Only verify server states when core dependencies are finalized
    if (!isCheckingStorage && fontsLoaded && assets) {
      silentLaunchUpdateCheck();
    }
  }, [isCheckingStorage, fontsLoaded, assets]);

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
  if (isCheckingStorage || !fontsLoaded || !assets) {
    return (
      <View className="flex-1 items-center justify-center bg-zinc-950">
        <Image
          source={require('@/assets/images/FRAPP_ICON1.png')}
          style={{ width: 96, height: 96, borderRadius: 16 }}
          className="w-24 h-24"
          resizeMode="cover"
        />
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

      {/* =========================================================================
          GLOBAL OVERLAY LAUNCH DISCOVERED UPDATE MODAL ENGINE
          ========================================================================= */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={updateModalVisible}
        onRequestClose={() => setUpdateModalVisible(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/60 px-6">
          <View 
            style={{ backgroundColor: isDark ? '#1e1e24' : '#ffffff', borderColor: adaptiveBorderColor, borderWidth: 1 }}
            className="w-full rounded-3xl p-6 items-center shadow-2xl max-w-sm"
          >
            <Pressable 
              onPress={() => setUpdateModalVisible(false)} 
              className="absolute top-4 right-4 active:opacity-60"
            >
              <CloseCircle size="22" color={isDark ? '#a1a1aa' : '#71717a'} variant="Broken" />
            </Pressable>

            <ThemedText className="font-montBlack text-lg text-center mt-2 mb-3 tracking-tight">
              Update Available! 🎉
            </ThemedText>

            <ThemedText className="font-mont text-zinc-500 dark:text-zinc-400 text-sm text-center leading-relaxed mb-6 px-1">
              A newer build version ({updateInfo.latestTag}) is out. Upgrade from your current version ({CURRENT_VERSION}) to get access to all the latest optimization patches!
            </ThemedText>

            <View className="flex-row items-center gap-3 w-full">
              <Button 
                type="dark" 
                text="Later" 
                onPress={() => setUpdateModalVisible(false)} 
                className="flex-1 font-montBold"
              />
              <Button 
                type="primary" 
                text="Update Now" 
                onPress={() => {
                  setUpdateModalVisible(false);
                  Linking.openURL(updateInfo.downloadUrl);
                }} 
                className="flex-1 font-montBold"
              />
            </View>
          </View>
        </View>
      </Modal>
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