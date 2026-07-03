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
import { CloseCircle, TicketDiscount } from 'iconsax-react-nativejs';

import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from '@expo-google-fonts/montserrat';

// Local app tracking baseline
const CURRENT_VERSION = 'v1.1.2';

// Prevent the splash screen from auto-hiding prematurely
SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const { themeMode } = useCustomTheme();
  const router = useRouter();
  const rootNavigationRef = useNavigationContainerRef();
  const [isCheckingStorage, setIsCheckingStorage] = useState(true);
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const [targetRoute, setTargetRoute] = useState<'/(tabs)' | '/onboarding'>('/(tabs)');

  // --- MODAL ENGINE STATES ---
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({ latestTag: '', downloadUrl: '' });
  
  // NEW FEATURE CHANGELOG MODAL STATE
  const [featureModalVisible, setFeatureModalVisible] = useState(false);

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

  // 3. Check storage settings to determine destination route baseline
  useEffect(() => {
    async function checkFirstLaunch() {
      try {
        const hasLaunchedBefore = await SecureStore.getItemAsync('frapp_has_launched');

        if (hasLaunchedBefore === null) {
          // Fresh install: push to onboarding workflow
          await SecureStore.setItemAsync('frapp_has_launched', 'true');
          await SecureStore.setItemAsync(`frapp_seen_update_${CURRENT_VERSION}`, 'true');
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
        if (!response.ok) return;

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
        console.log('Silent update verification check bypassed (likely offline state).');
      }
    }
    
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

  // 5. Safe Core Initialization Hook: Runs cleanly AFTER everything is completely loaded
  useEffect(() => {
    const isAppReady = !isCheckingStorage && (fontsLoaded || fontError) && (assets || assetsError);

    if (isAppReady && isNavigationReady) {
      SplashScreen.hideAsync();
      initNotifications();
      checkNotificationPermission();

      if (targetRoute === '/onboarding') {
        router.replace('/onboarding');
      } else {
        // Returning user -> Verify if they have seen this specific build version update notification
        async function verifyFeatureChangelogStatus() {
          try {
            // NOTE: Change this to `const hasSeenCurrentUpdate = null;` if you need to pop it up for testing again!
            const hasSeenCurrentUpdate = await SecureStore.getItemAsync(`frapp_seen_update_${CURRENT_VERSION}`);
            if (hasSeenCurrentUpdate === null) {
              // Add minor delay execution tick so native container rendering stabilizes
              setTimeout(() => {
                setFeatureModalVisible(true);
              }, 100);
            }
          } catch (e) {
            console.error('Failed reading changelog version flag metrics:', e);
          }
        }
        verifyFeatureChangelogStatus();
      }
    }
  }, [isCheckingStorage, fontsLoaded, fontError, assets, assetsError, isNavigationReady, targetRoute]);

  // Dismiss feature layout overlay helper and deep links route configuration
  const handleDismissFeatureModal = async (shouldRouteToDeals: boolean) => {
    setFeatureModalVisible(false);
    try {
      // Seal current version key so this specific build announcement modal never flashes back
      await SecureStore.setItemAsync(`frapp_seen_update_${CURRENT_VERSION}`, 'true');
      
      if (shouldRouteToDeals) {
        // Defer execution slightly to let the native modal finish closing completely before changing tabs
        setTimeout(() => {
          // FIXED: Redirects directly to the root of your tabs group where the Deals feed live
          router.navigate('/(tabs)');
        }, 100);
      }
    } catch (e) {
      console.error('Failed to update feature announcement message state context:', e);
    }
  };

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
          1. LOCAL RELEASES FEATURES & CHANGELOG ANNOUNCEMENT MODAL
          ========================================================================= */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={featureModalVisible}
        onRequestClose={() => handleDismissFeatureModal(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/60 px-6">
          <View 
            style={{ backgroundColor: isDark ? '#1e1e24' : '#ffffff', borderColor: adaptiveBorderColor, borderWidth: 1 }}
            className="w-full rounded-3xl p-6 items-center shadow-2xl max-w-sm"
          >
            <Pressable 
              onPress={() => handleDismissFeatureModal(false)} 
              className="absolute top-4 right-4 active:opacity-60"
            >
              <CloseCircle size="22" color={isDark ? '#a1a1aa' : '#71717a'} variant="Broken" />
            </Pressable>

            <View className="w-12 h-12 rounded-2xl bg-purple-500/10 items-center justify-center mt-2 mb-3 border border-purple-500/20">
              <TicketDiscount size="24" color="#a855f7" variant="Broken" />
            </View>

            <ThemedText className="font-montBlack text-lg text-center mb-1 tracking-tight">
              New Feature Update! 🚀
            </ThemedText>

            <ThemedText className="font-montBold text-purple-500 text-xs text-center uppercase tracking-wider mb-4">
              Version {CURRENT_VERSION}
            </ThemedText>

            <ThemedText className="font-mont text-zinc-500 dark:text-zinc-400 text-sm text-center leading-relaxed mb-6 px-1">
              We've integrated an all-new storefront price monitoring feature right into the client interface! Drop in to browse hot discounts and ongoing sales feeds.
            </ThemedText>

            <View className="flex-row items-center gap-3 w-full">
              <Button 
                type="dark" 
                text="Dismiss" 
                onPress={() => handleDismissFeatureModal(false)} 
                className="flex-1 font-montBold"
              />
              <Button 
                type="primary" 
                text="Check it Out" 
                onPress={() => handleDismissFeatureModal(true)} 
                className="flex-1 font-montBold"
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* =========================================================================
          2. GLOBAL OVERLAY LAUNCH DISCOVERED REMOTE GITHUB UPDATE MODAL
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