import '@/components/i18n'; 
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { CustomThemeProvider, useCustomTheme } from '@/context/ThemeContext';
import { Stack, useRouter, useNavigationContainerRef } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Image, Modal, Linking, Pressable } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import "../global.css";
import { initNotifications, scheduleAllGiveawayTimers } from '@/lib/notifications';
import { useAssets } from 'expo-asset';
import { ThemedText } from '@/components/ThemedText';
import Button from '@/components/custom/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CloseCircle } from 'iconsax-react-nativejs';
import { useTranslation } from 'react-i18next';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from '@expo-google-fonts/montserrat';

const NOTIFICATIONS_KEY = '@app_notifications_enabled';
const LANGUAGE_KEY = '@frapp_user_language';
const CURRENT_VERSION = 'v1.1.6';

SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const { t, i18n } = useTranslation(); 
  const { themeMode } = useCustomTheme();
  const router = useRouter();
  const rootNavigationRef = useNavigationContainerRef();
  const [isCheckingStorage, setIsCheckingStorage] = useState(true);
  const [isNavigationReady, setIsNavigationReady] = useState(false);
  const [targetRoute, setTargetRoute] = useState<'/(tabs)' | '/onboarding'>('/(tabs)');

  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({ latestTag: '', downloadUrl: 'https://frappgiveaways.vercel.app' });

  const isDark = themeMode === 'dark';
  const adaptiveBorderColor = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.07)';

  const cleanVersion = (versionStr: string) => {
    return versionStr.replace(/[^0-9.]/g, '');
  };

  const [assets, assetsError] = useAssets([require('@/assets/images/FRAPP_ICON1.png')]);

  const [fontsLoaded, fontError] = useFonts({
    'Mont-Regular': Montserrat_400Regular,
    'Mont-Bold': Montserrat_700Bold,
    'Mont-ExtraBold': Montserrat_800ExtraBold,
    'Mont-Black': Montserrat_900Black,
  });

  // Restore saved language preference on app launch
  useEffect(() => {
    async function restoreLanguage() {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (savedLanguage) {
          await i18n.changeLanguage(savedLanguage);
        }
      } catch (e) {
        console.error('Failed to load saved language on launch:', e);
      }
    }

    restoreLanguage();
  }, [i18n]);

  // Sync scheduled giveaway notifications on app launch
  useEffect(() => {
    const syncNotificationsOnLaunch = async () => {
      try {
        const savedSetting = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
        const isEnabled = savedSetting !== null ? JSON.parse(savedSetting) : true;

        if (isEnabled) {
          await scheduleAllGiveawayTimers();
        }
      } catch (error) {
        console.error('Failed to sync notifications on launch:', error);
      }
    };

    syncNotificationsOnLaunch();
  }, []);

  useEffect(() => {
    async function checkFirstLaunch() {
      try {
        const hasLaunchedBefore = await SecureStore.getItemAsync('frapp_has_launched');

        if (hasLaunchedBefore === null) {
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
              downloadUrl: 'https://frappgiveaways.vercel.app'
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

  useEffect(() => {
    const unsubscribe = rootNavigationRef?.addListener('state', () => {
      setIsNavigationReady(true);
    });
    return unsubscribe;
  }, [rootNavigationRef]);

  useEffect(() => {
    const isAppReady = !isCheckingStorage && (fontsLoaded || fontError) && (assets || assetsError);

    if (isAppReady && isNavigationReady) {
      SplashScreen.hideAsync();
      
      // Request permission and schedule local alarm.
      initNotifications();

      if (targetRoute === '/onboarding') {
        router.replace('/onboarding');
      }
    }
  }, [isCheckingStorage, fontsLoaded, fontError, assets, assetsError, isNavigationReady, targetRoute]);

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
              className="absolute top-4 right-4 active:opacity-60 z-10"
            >
              <CloseCircle size="22" color={isDark ? '#a1a1aa' : '#71717a'} variant="Broken" />
            </Pressable>

            <ThemedText className="font-montBlack text-lg text-center mt-2 mb-1 tracking-tight">
              {t('updateModal.title')}
            </ThemedText>

            <ThemedText className="font-montBold text-purple-500 text-xs text-center uppercase tracking-wider mb-4">
              {t('updateModal.subtitle', { version: updateInfo.latestTag })}
            </ThemedText>

            <ThemedText className="font-mont text-zinc-500 dark:text-zinc-400 text-[14px] text-center leading-relaxed mb-6 px-2">
              {t('updateModal.description', { latest: updateInfo.latestTag, current: CURRENT_VERSION })}
            </ThemedText>

            <View className="flex-row items-center gap-3 w-full">
              <Button
                type="dark"
                text={t('updateModal.later')}
                onPress={() => setUpdateModalVisible(false)}
                className="flex-1 font-montBold"
              />
              <Button
                type="primary"
                text={t('updateModal.updateNow')}
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
    <CustomThemeProvider>
      <RootLayoutContent />
    </CustomThemeProvider>
  );
}