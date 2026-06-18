import Button from '@/components/custom/Button';
import { Divider } from '@/components/custom/Divider';
import { ThemedText } from '@/components/ThemedText';
import { APP_REPO_URL, APP_URLS } from '@/constants/app';
import React, { useState, useEffect, useRef } from 'react';
import { Linking, View, ScrollView, Pressable, Platform, Image, Modal } from 'react-native';
import { 
  Setting, 
  Moon, 
  Sun1, 
  Notification, 
  Global, 
  Heart, 
  Coffee, 
  ArrowRight2,
  InfoCircle,
  Refresh2,
  CloseCircle,
  ToggleOnCircle,
  ToggleOffCircle
} from 'iconsax-react-nativejs';
import { useRouter } from 'expo-router';
import notifee, { AuthorizationStatus, AndroidImportance } from '@notifee/react-native';

// Import custom theme hooks
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';

// Import notification controllers
import { checkNotificationPermission } from '@/lib/notifications';

const CURRENT_VERSION = 'v1.1.2';

export default function SettingsScreen() {
  const router = useRouter();
  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  
  // --- TRACKING FOR EASTER EGG TRIPLE TAP ---
  const tapCountRef = useRef(0);
  const tapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- STATE FOR DYNAMIC CUSTOM MODAL ---
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    title: string;
    message: string;
    type: 'success' | 'update' | 'error';
    actionText?: string;
    onAction?: () => void;
  }>({ title: '', message: '', type: 'success' });

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const { themeMode, toggleTheme } = useCustomTheme();

  const isDark = themeMode === 'dark';
  const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';
  const adaptiveBorderColor = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.07)';
  const monochromeIconColor = isDark ? '#ffffff' : '#000000';
  const iconWrapperBg = 'bg-zinc-500/10 dark:bg-zinc-400/10';

  // Synchronize internal state toggle switches with system notification authorization states
  useEffect(() => {
    async function getInitialPermissionState() {
      const settings = await notifee.getNotificationSettings();
      const isGranted = 
        settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
        settings.authorizationStatus === AuthorizationStatus.PROVISIONAL;
      setNotificationsEnabled(isGranted);
    }
    getInitialPermissionState();

    // Cleanup tap timeout on unmount
    return () => {
      if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
    };
  }, []);

  const cleanVersion = (versionStr: string) => {
    return versionStr.replace(/[^0-9.]/g, '');
  };

  const handleNotificationToggle = async (newValue: boolean) => {
    if (newValue) {
      await checkNotificationPermission();
      const settings = await notifee.getNotificationSettings();
      setNotificationsEnabled(
        settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
        settings.authorizationStatus === AuthorizationStatus.PROVISIONAL
      );
    } else {
      await notifee.cancelAllNotifications();
      setNotificationsEnabled(false);
    }
  };

  // --- LOCAL NOTIFICATION TEST TRIGGER ---
  const triggerTestNotification = async () => {
    try {
      await notifee.requestPermission();

      const channelId = await notifee.createChannel({
        id: 'frapp-test-channel',
        name: 'FRAPP Radar Updates',
        importance: AndroidImportance.HIGH,
      });

      await notifee.displayNotification({
        title: '🎯 FRAPP Radar Active',
        body: 'Local notification pipeline responding. System verification test passed!',
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          pressAction: { id: 'default' },
        },
      });
    } catch (error) {
      setModalConfig({
        title: 'Test Trigger Failed',
        message: 'Could not execute instantaneous payload render. Confirm local application target permissions.',
        type: 'error',
        actionText: 'Dismiss',
        onAction: () => setModalVisible(false)
      });
      setModalVisible(true);
    }
  };

  // --- EASTER EGG INTERACTION HANDLER ---
  const handleSettingsCogTap = () => {
    tapCountRef.current += 1;

    if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);

    if (tapCountRef.current === 3) {
      // Secret combo unlocked! Run the test notification
      triggerTestNotification();
      tapCountRef.current = 0;
    } else {
      // Reset the tap counter if the user delays between clicks (1000ms threshold)
      tapTimeoutRef.current = setTimeout(() => {
        tapCountRef.current = 0;
      }, 1000);
    }
  };

  const handleCheckVersion = async () => {
    setIsCheckingUpdate(true);
    try {
      const response = await fetch('https://api.github.com/repos/Brianali-codes/FRAPP/releases/latest');
      if (!response.ok) throw new Error();
      
      const data = await response.json();
      const rawLatestVersion = data.tag_name;

      const localClean = cleanVersion(CURRENT_VERSION);
      const remoteClean = cleanVersion(rawLatestVersion);

      if (remoteClean && remoteClean !== localClean) {
        setModalConfig({
          title: 'Update Available! ',
          message: `A newer build version (${rawLatestVersion}) is out. Upgrade from your current version (${CURRENT_VERSION}) to get access to all the latest optimization patches!`,
          type: 'update',
          actionText: 'Update Now',
          onAction: () => Linking.openURL(data.html_url || APP_REPO_URL)
        });
      } else {
        setModalConfig({
          title: 'Up to Date',
          message: `You are already running our latest version (${CURRENT_VERSION}). No updates needed.`,
          type: 'success',
          actionText: 'Awesome',
          onAction: () => setModalVisible(false)
        });
      }
      setModalVisible(true);
    } catch (error) {
      setModalConfig({
        title: 'Check Failed',
        message: 'Could not complete version cross-reference check at this time. Please check your network connection and try again.',
        type: 'error',
        actionText: 'Dismiss',
        onAction: () => setModalVisible(false)
      });
      setModalVisible(true);
    } finally {
      setIsCheckingUpdate(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <ScrollView 
        style={{ backgroundColor }} 
        className="flex-1 px-4 pt-10"
        contentContainerStyle={{ paddingBottom: 140 }} 
        showsVerticalScrollIndicator={false}
      >
        {/* --- MATCHING BRAND HEADER ROW --- */}
        <View className="flex-row items-center justify-between w-full mb-6 ">
          <View className="flex-row items-center gap-3">
            <View
              style={{ backgroundColor: '#9333ea' }}
              className="w-10 h-10 rounded-xl overflow-hidden items-center justify-center shadow-md"
            >
              <Image
                source={require('../../assets/images/FRAPP_ICON1.png')}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>
            <ThemedText className="text-xl font-montBlack tracking-tight">
              Settings.
            </ThemedText>
          </View>

          <View className="flex-row items-center gap-2.5">
            {/* Hidden Easter Egg: Triple-tap this icon rapidly to trigger the push test */}
            <Pressable 
              onPress={handleSettingsCogTap}
              style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }}
              className="w-10 h-10 rounded-full items-center justify-center shadow-sm active:opacity-70"
            >
              <Setting size="22" color={isDark ? '#f4f4f5' : '#3f3f46'} variant="Broken" />
            </Pressable>

            <Pressable 
              onPress={toggleTheme}
              style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }}
              className="w-10 h-10 rounded-full items-center justify-center active:opacity-70 shadow-sm"
            >
              {isDark ? (
                <Sun1 size="22" color="#f4f4f5" variant="Broken" />
              ) : (
                <Moon size="22" color="#3f3f46" variant="Broken" />
              )}
            </Pressable>
          </View>
        </View>

        <ThemedText className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 font-mont">
          Customize your application behavior, fine-tune notifications, toggle display settings, or read open source credentials.
        </ThemedText>

        {/* SECTION: PREFERENCES */}
        <ThemedText className="text-[11px] uppercase font-montBold tracking-widest text-zinc-400 mb-2.5 ml-1">
          Preferences
        </ThemedText>
        
        <View 
          style={[{ backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor }, Platform.select({ ios: { shadowColor: '#000000', shadowOffset: { width: 0, height: isDark ? 4 : 8 }, shadowOpacity: isDark ? 0.35 : 0.10, shadowRadius: isDark ? 10 : 16 }, android: { elevation: isDark ? 4 : 5 } })]} 
          className="rounded-2xl p-2 mb-6"
        >
          <Pressable onPress={toggleTheme} className="flex-row items-center justify-between p-3 active:opacity-60">
            <View className="flex-row items-center gap-3">
              <View className={`w-8 h-8 rounded-xl items-center justify-center ${iconWrapperBg}`}>
                {isDark ? <Sun1 size="18" color={monochromeIconColor} variant="Broken" /> : <Moon size="18" color={monochromeIconColor} variant="Broken" />}
              </View>
              <ThemedText className="font-montBold text-sm">Theme Appearance</ThemedText>
            </View>
            <View className="flex-row items-center gap-1.5">
              <ThemedText className="text-xs text-zinc-400 font-montBold capitalize">{themeMode} Mode</ThemedText>
              <ArrowRight2 size="14" color="#a1a1aa" />
            </View>
          </Pressable>
          
          <Divider className="opacity-10 bg-zinc-400 dark:bg-zinc-500 mx-3" />
          
          {/* DYNAMIC TIMING ALERTS INTERACTION ROW */}
          <View className="flex-row items-center justify-between p-3">
            <View className="flex-row items-center gap-3 flex-1 pr-4">
              <View className={`w-8 h-8 rounded-xl items-center justify-center ${iconWrapperBg}`}>
                <Notification size="18" color={monochromeIconColor} variant="Broken" />
              </View>
              <View className="flex-1">
                <ThemedText className="font-montBold text-sm">Automated Loot Radar</ThemedText>
                <ThemedText className="text-[11px] text-zinc-400 mt-0.5 font-mont" numberOfLines={2}>
                  Receive multi-window updates (9AM, 1PM, 8PM)
                </ThemedText>
              </View>
            </View>
            <Pressable 
              onPress={() => handleNotificationToggle(!notificationsEnabled)}
              className="active:opacity-60"
              hitSlop={10}
            >
              {notificationsEnabled ? (
                <ToggleOnCircle size="42" color="#a855f7" variant="Bold" />
              ) : (
                <ToggleOffCircle size="42" color={isDark ? '#52525b' : '#a1a1aa'} variant="Outline" />
              )}
            </Pressable>
          </View>
          
          <Divider className="opacity-10 bg-zinc-400 dark:bg-zinc-500 mx-3" />
          
          <Pressable onPress={() => router.push('/onboarding')} className="flex-row items-center justify-between p-3 active:opacity-60">
            <View className="flex-row items-center gap-3">
              <View className={`w-8 h-8 rounded-xl items-center justify-center ${iconWrapperBg}`}>
                <InfoCircle size="18" color={monochromeIconColor} variant="Broken" />
              </View>
              <View>
                <ThemedText className="font-montBold text-sm">App Introduction</ThemedText>
                <ThemedText className="text-[11px] text-zinc-400 mt-0.5 font-mont">Revisit feature highlights and legal terms</ThemedText>
              </View>
            </View>
            <ArrowRight2 size="14" color="#a1a1aa" />
          </Pressable>

          <Divider className="opacity-10 bg-zinc-400 dark:bg-zinc-500 mx-3" />

          {/* CHECK FOR UPDATES ACTION CELL */}
          <Pressable onPress={handleCheckVersion} disabled={isCheckingUpdate} className="flex-row items-center justify-between p-3 active:opacity-60 disabled:opacity-50">
            <View className="flex-row items-center gap-3">
              <View className={`w-8 h-8 rounded-xl items-center justify-center ${iconWrapperBg}`}>
                <Refresh2 size="18" color={monochromeIconColor} variant="Broken" />
              </View>
              <View>
                <ThemedText className="font-montBold text-sm">Check for Updates</ThemedText>
                <ThemedText className="text-[11px] text-zinc-400 mt-0.5 font-mont">Verify server-side application builds</ThemedText>
              </View>
            </View>
            <View className="flex-row items-center gap-1.5">
              <ThemedText className="text-xs text-purple-500 font-montBold">{CURRENT_VERSION}</ThemedText>
              <ArrowRight2 size="14" color="#a1a1aa" />
            </View>
          </Pressable>
        </View>

        {/* SECTION: COMMUNITY & SUPPORT */}
        <ThemedText className="text-[11px] uppercase font-montBold tracking-widest text-zinc-400 mb-2.5 ml-1">
          Community & Support
        </ThemedText>
        
        <View style={[{ backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor }, Platform.select({ ios: { shadowColor: '#000000', shadowOffset: { width: 0, height: isDark ? 4 : 8 }, shadowOpacity: isDark ? 0.35 : 0.10, shadowRadius: isDark ? 10 : 16 }, android: { elevation: isDark ? 4 : 5 } })]} className="rounded-2xl p-5 mb-6">
          <View className="flex-row items-center gap-2 mb-2">
            <Heart size="18" color="#ef4444" variant="Broken" />
            <ThemedText className="font-montBlack text-sm tracking-tight">Support Open Source</ThemedText>
          </View>
          <ThemedText className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed mb-4 font-mont">
            This layout is independently engineered and hosted for free. If you find value in discovering these listings, giving us a star on GitHub goes a long way!
          </ThemedText>
          <Button onPress={() => Linking.openURL(APP_REPO_URL)} text="Star Us on GitHub" type="primary" className="font-montBold" />
        </View>

        {/* SECTION: KO-FI SUPPORT */}
        <View style={[{ backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor }, Platform.select({ ios: { shadowColor: '#000000', shadowOffset: { width: 0, height: isDark ? 4 : 8 }, shadowOpacity: isDark ? 0.35 : 0.10, shadowRadius: isDark ? 10 : 16 }, android: { elevation: isDark ? 4 : 5 } })]} className="rounded-2xl p-5 mb-6">
          <View className="flex-row items-center gap-2 mb-2">
            <Coffee size="18" color="#ff5e5b" variant="Broken" />
            <ThemedText className="font-montBlack text-sm tracking-tight">Buy me a Coffee</ThemedText>
          </View>
          <ThemedText className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed mb-4 font-mont">
            Help keep the servers running and the coffee flowing! A small donation helps us maintain the project and add new features.
          </ThemedText>
          <Button onPress={() => Linking.openURL('https://ko-fi.com/brianalicodes')} text="Donate on Ko-fi" type="primary" className="font-montBold" />
        </View>

        {/* SECTION: DATA PROVIDERS */}
        <ThemedText className="text-[11px] uppercase font-montBold tracking-widest text-zinc-400 mb-2.5 ml-1">
          Data Providers
        </ThemedText>
        <View style={[{ backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor }, Platform.select({ ios: { shadowColor: '#000000', shadowOffset: { width: 0, height: isDark ? 4 : 8 }, shadowOpacity: isDark ? 0.35 : 0.10, shadowRadius: isDark ? 10 : 16 }, android: { elevation: isDark ? 4 : 5 } })]} className="rounded-2xl p-2">
          <Pressable onPress={() => Linking.openURL(APP_URLS.GAME_POWER_URL)} className="flex-row items-center justify-between p-3 active:opacity-60">
            <View className="flex-row items-center gap-3">
              <View className={`w-8 h-8 rounded-xl items-center justify-center ${iconWrapperBg}`}>
                <Global size="18" color={monochromeIconColor} variant="Broken" />
              </View>
              <View>
                <ThemedText className="font-montBold text-sm">Gamepower Site</ThemedText>
                <ThemedText className="text-[11px] text-zinc-400 mt-0.5 font-mont">Primary giveaways engine distributor</ThemedText>
              </View>
            </View>
            <ArrowRight2 size="14" color="#a1a1aa" />
          </Pressable>
          <Divider className="opacity-10 bg-zinc-400 dark:bg-zinc-500 mx-3" />
          <Pressable onPress={() => Linking.openURL(APP_URLS.FREE_TO_GAME_URL)} className="flex-row items-center justify-between p-3 active:opacity-60">
            <View className="flex-row items-center gap-3">
              <View className={`w-8 h-8 rounded-xl items-center justify-center ${iconWrapperBg}`}>
                <Global size="18" color={monochromeIconColor} variant="Broken" />
              </View>
              <View>
                <ThemedText className="font-montBold text-sm">FreeToGame API</ThemedText>
                <ThemedText className="text-[11px] text-zinc-400 mt-0.5 font-mont">Free-to-play listings database architecture</ThemedText>
              </View>
            </View>
            <ArrowRight2 size="14" color="#a1a1aa" />
          </Pressable>
        </View>

        <View className="mt-8 mb-4 items-center justify-center">
          <Divider style={{ backgroundColor: textColor }} className="w-12 h-0.5 rounded-full opacity-10 mb-3" />
          <ThemedText className="text-center font-montBold text-[11px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Frapp Build {CURRENT_VERSION}
          </ThemedText>
        </View>
      </ScrollView>

      {/* =========================================================================
          CUSTOM HOOKED STATUS MODAL COMPONENT (Replaces Native Popups)
          ========================================================================= */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/60 px-6">
          <View 
            style={{ backgroundColor: isDark ? '#1e1e24' : '#ffffff', borderColor: adaptiveBorderColor, borderWidth: 1 }}
            className="w-full rounded-3xl p-6 items-center shadow-2xl max-w-sm"
          >
            {/* Upper Right Quick Close Vector */}
            <Pressable 
              onPress={() => setModalVisible(false)} 
              className="absolute top-4 right-4 active:opacity-60"
            >
              <CloseCircle size="22" color={isDark ? '#a1a1aa' : '#71717a'} variant="Broken" />
            </Pressable>

            {/* Dynamic Status Title */}
            <ThemedText className="font-montBlack text-lg text-center mt-2 mb-3 tracking-tight">
              {modalConfig.title}
            </ThemedText>

            {/* Status Informational Message */}
            <ThemedText className="font-mont text-zinc-500 dark:text-zinc-400 text-sm text-center leading-relaxed mb-6 px-1">
              {modalConfig.message}
            </ThemedText>

            {/* Dynamic Action Grid Trigger Section */}
            <View className="flex-row items-center gap-3 w-full">
              {modalConfig.type === 'update' && (
                <Button 
                  type="dark" 
                  text="Later" 
                  onPress={() => setModalVisible(false)} 
                  className="flex-1 font-montBold"
                />
              )}
              <Button 
                type={modalConfig.type === 'error' ? 'dark' : 'primary'} 
                text={modalConfig.actionText || 'OK'} 
                onPress={() => {
                  if (modalConfig.onAction) modalConfig.onAction();
                  setModalVisible(false);
                }} 
                className="flex-1 font-montBold"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}