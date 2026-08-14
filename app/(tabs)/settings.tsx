import Button from '@/components/custom/Button';
import { Divider } from '@/components/custom/Divider';
import { ThemedText } from '@/components/ThemedText';
import { APP_REPO_URL, APP_URLS } from '@/constants/app';
import React, { useState, useEffect, useRef } from 'react';
import { Linking, View, ScrollView, Pressable, Platform, Image, Modal } from 'react-native';
import {
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
  ToggleOffCircle,
  User,
  Mobile,
  Share,
  Lock1,
  TickCircle,
  Warning2,
  Star,
  Star1,
} from 'iconsax-react-nativejs';
import { useRouter } from 'expo-router';
import notifee, { AuthorizationStatus, AndroidImportance } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import i18nInstanceSource from '@/components/i18n';
import { Alert } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';

const NOTIFICATIONS_KEY = '@frapp_user_notifications_enabled';
const LANGUAGE_KEY = '@frapp_user_language'


const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  zh: '中文',
  sw: 'Kiswahili',
  pt: 'Português',
  jp: '日本語',
  de: 'Deutsch',
  hi: 'हिन्दी',
};

const CURRENT_VERSION = 'v1.1.5';

export default function SettingsScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation(undefined, { i18n: i18nInstanceSource });

  const [isCheckingUpdate, setIsCheckingUpdate] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [socialsModalVisible, setSocialsModalVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const tapCountRef = useRef(0);
  const tapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // This will now dynamically pick the correct name from the dictionary!
  const currentLanguageCode = i18n?.language || 'en';

  // Quick defensive tip: use .split('-')[0] in case i18n returns regional variations like 'es-US'
  const shortLangCode = currentLanguageCode.split('-')[0];
  const activeLanguageName = LANGUAGE_NAMES[shortLangCode] || 'English';

  const handleSelectLanguage = async (
    langCode: 'en' | 'fr' | 'es' | 'zh' | 'sw' | 'hi' | 'pt' | 'jp' | 'de'
  ) => {
    try {
      // 1. Save language preference to storage
      await AsyncStorage.setItem(LANGUAGE_KEY, langCode);

      // 2. Change active i18n language
      try {
        await i18n.changeLanguage(langCode);
      } catch (e) {
        await i18nInstanceSource.changeLanguage(langCode);
      }
    } catch (e) {
      console.error('Failed to save language to AsyncStorage:', e);
    } finally {
      setLanguageModalVisible(false);
    }
  };

  const [starCount, setStarCount] = useState<string | null>(null);

useEffect(() => {
  const fetchGithubStars = async () => {
    try {
      // Shields.io proxies & caches GitHub star counts, bypassing rate limits
      const response = await fetch(
        'https://img.shields.io/github/stars/brianali-codes/frapp.json'
      );

      if (response.ok) {
        const data = await response.json();
        // data.value returns formatted strings like "21" or "1.2k"
        if (data?.value) {
          setStarCount(data.value);
        }
      }
    } catch (error) {
      console.warn('Failed to fetch GitHub stars:', error);
    }
  };

  fetchGithubStars();
}, []);

// Formatted display text
const formattedStars = starCount ? `${starCount} stars` : '★ star repo';

  useEffect(() => {
    async function syncNotificationState() {
      try {
        const savedPref = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
        const settings = await notifee.getNotificationSettings();
        const isGranted =
          settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
          settings.authorizationStatus === AuthorizationStatus.PROVISIONAL;

        if (savedPref !== null) {
          const userChoice = JSON.parse(savedPref);
          setNotificationsEnabled(userChoice && isGranted);
        } else {
          setNotificationsEnabled(isGranted);
        }
      } catch (e) {
        console.error('Error loading notification preference:', e);
      }
    }

    syncNotificationState();

    return () => {
      if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
    };
  }, []);
  const cleanVersion = (versionStr: string) => {
    return versionStr.replace(/[^0-9.]/g, '');
  };

  const handleNotificationToggle = async (newValue: boolean) => {
    try {
      if (newValue) {
        const settings = await notifee.requestPermission();
        const isGranted =
          settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
          settings.authorizationStatus === AuthorizationStatus.PROVISIONAL;

        if (!isGranted) {
          Alert.alert(
            t('notifications.permissionDeniedTitle', 'Permissions Required'),
            t('notifications.permissionDeniedMsg', 'Please enable notifications in system settings to receive giveaway alerts.'),
            [
              { text: t('common.cancel', 'Cancel'), style: 'cancel' },
              { text: t('common.settings', 'Open Settings'), onPress: () => Linking.openSettings() },
            ]
          );
          setNotificationsEnabled(false);
          await AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(false));
          return;
        }

        await AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true));
        setNotificationsEnabled(true);
      } else {
        await notifee.cancelAllNotifications();
        await AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(false));
        setNotificationsEnabled(false);
      }
    } catch (error) {
      console.error('Failed to toggle notifications:', error);
    }
  };

  const triggerTestNotification = async () => {
    try {
      await notifee.requestPermission();
      const channelId = await notifee.createChannel({
        id: 'frapp-test-channel',
        name: 'FRAPP Radar Updates',
        importance: AndroidImportance.HIGH,
      });

      await notifee.displayNotification({
        title: 'You discovered an Easter Egg!',
        body: 'You have successfully triggered a test notification. This confirms that your device is ready to receive FRAPP notifications.',
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
          pressAction: { id: 'default' },
        },
      });
    } catch (error) {
      setModalConfig({
        title: t('modals.testFailedTitle', 'Test Trigger Failed'),
        message: t('modals.testFailedMessage', 'Could not execute instantaneous payload render. Confirm local application target permissions.'),
        type: 'error',
        actionText: t('modals.dismiss', 'Dismiss'),
        onAction: () => setModalVisible(false)
      });
      setModalVisible(true);
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
          title: t('updateModal.title', 'Update Available'),
          message: t('updateModal.description', 'A newer version of the app ({{latest}}) is out. Upgrade from your current build ({{current}}) to get access to the latest changes.', { latest: rawLatestVersion, current: CURRENT_VERSION }),
          type: 'update',
          actionText: t('updateModal.updateNow', 'Update Now'),
          onAction: () => Linking.openURL(data.html_url || APP_REPO_URL)
        });
      } else {
        setModalConfig({
          title: t('modals.upToDateTitle', 'Up to Date'),
          message: t('modals.upToDateMessage', 'You are already running our latest version ({{version}}). No updates needed.', { version: CURRENT_VERSION }),
          type: 'success',
          actionText: t('modals.upToDateAction', 'Awesome'),
          onAction: () => setModalVisible(false)
        });
      }
      setModalVisible(true);
    } catch (error) {
      setModalConfig({
        title: t('modals.checkFailedTitle', 'Check Failed'),
        message: t('modals.checkFailedMessage', 'Could not complete version cross-reference check at this time. Please check your network connection and try again.'),
        type: 'error',
        actionText: t('modals.failedAction', 'Close'),
        onAction: () => setModalVisible(false)
      });
      setModalVisible(true);
    } finally {
      setIsCheckingUpdate(false);
    }
  };


  useEffect(() => {
    async function restoreLanguagePreference() {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (savedLanguage) {
          try {
            await i18n.changeLanguage(savedLanguage);
          } catch (e) {
            await i18nInstanceSource.changeLanguage(savedLanguage);
          }
        }
      } catch (e) {
        console.error('Failed to load saved language from AsyncStorage:', e);
      }
    }

    restoreLanguagePreference();
  }, []);



  return (
    <View style={{ flex: 1, backgroundColor }}>
      <ScrollView
        style={{ backgroundColor }}
        className="flex-1 px-4 pt-10"
        contentContainerStyle={{ paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        {/* --- BRAND HEADER ROW --- */}
        <View className="flex-row items-center justify-between w-full mb-6">
          <Pressable className="flex-row items-center gap-2 flex-1 pr-2 active:opacity-90">
            <View
              style={{ backgroundColor: '#9333ea' }}
              className="w-9 h-9 rounded-xl overflow-hidden items-center justify-center shadow-sm shrink-0"
            >
              <Image
                source={require('../../assets/images/FRAPP_ICON1.png')}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>
            <ThemedText numberOfLines={1} className="text-lg font-montBlack tracking-tight flex-shrink">
              {t('header.title', 'Settings.')}
            </ThemedText>
          </Pressable>

          <View className="flex-row items-center gap-2">


            <Pressable
              onPress={toggleTheme}
              style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }}
              className="w-9 h-9 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0"
            >
              {isDark ? (
                <Sun1 size="18" color="#f4f4f5" variant="Broken" />
              ) : (
                <Moon size="18" color="#3f3f46" variant="Broken" />
              )}
            </Pressable>
          </View>
        </View>

        <ThemedText className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 font-mont">
          {t('header.subtitle', 'Customize your application behavior, fine-tune notifications, toggle display settings, or read open source credentials.')}
        </ThemedText>

        {/* SECTION: PREFERENCES */}
        <ThemedText className="text-[11px] uppercase font-montBold tracking-widest text-zinc-400 mb-2.5 ml-1">
          {t('sections.preferences', 'Preferences.')}
        </ThemedText>

        <View
          style={[{ backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor }, Platform.select({ ios: { shadowColor: '#000000', shadowOffset: { width: 0, height: isDark ? 4 : 8 }, shadowOpacity: isDark ? 0.35 : 0.10, shadowRadius: isDark ? 10 : 16 }, android: { elevation: isDark ? 4 : 5 } })]}
          className="rounded-2xl p-2 mb-6"
        >
          {/* THEME APPEARANCE ROW */}
          <Pressable onPress={toggleTheme} className="flex-row items-center justify-between p-3 active:opacity-60">
            <View className="flex-row items-center gap-3">
              <View className={`w-8 h-8 rounded-xl items-center justify-center ${iconWrapperBg}`}>
                {isDark ? <Sun1 size="18" color={monochromeIconColor} variant="Broken" /> : <Moon size="18" color={monochromeIconColor} variant="Broken" />}
              </View>
              <ThemedText className="font-montBold text-sm">
                {t('preferences.themeAppearance', 'Theme Appearance')}
              </ThemedText>
            </View>
            <View className="flex-row items-center gap-1.5">
              <ThemedText className="text-xs text-zinc-400 font-montBold capitalize">
                {themeMode === 'dark' ? t('preferences.themeDark', 'Dark Mode') : t('preferences.themeLight', 'Light Mode')}
              </ThemedText>
              <ArrowRight2 size="14" color="#a1a1aa" />
            </View>
          </Pressable>

          <Divider className="opacity-10 bg-zinc-400 dark:bg-zinc-500 mx-3" />

          {/* APP LANGUAGE SELECTION CELL */}
          <Pressable onPress={() => setLanguageModalVisible(true)} className="flex-row items-center justify-between p-3 active:opacity-60">
            <View className="flex-row items-center gap-3">
              <View className={`w-8 h-8 rounded-xl items-center justify-center ${iconWrapperBg}`}>
                <Global size="18" color={monochromeIconColor} variant="Broken" />
              </View>
              <View>
                <ThemedText className="font-montBold text-sm">
                  {t('preferences.appLanguage', 'App Language')}
                </ThemedText>
                <ThemedText className="text-[11px] text-zinc-400 mt-0.5 font-mont">
                  {t('preferences.appLanguageSub', 'Switch translation layers')}
                </ThemedText>
              </View>
            </View>
            <View className="flex-row items-center gap-1.5">
              <ThemedText className="text-xs text-purple-500 font-montBold">{activeLanguageName}</ThemedText>
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
                <ThemedText className="font-montBold text-sm">
                  {t('preferences.notificationSettings', 'Notification Settings')}
                </ThemedText>
                <ThemedText className="text-[11px] text-zinc-400 mt-0.5 font-mont" numberOfLines={2}>
                  {t('preferences.notificationSettingsSub', 'Turn Notifications On or Off')}
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

          {/* APP INTRODUCTION ONBOARDING */}
          <Pressable onPress={() => router.push('/onboarding')} className="flex-row items-center justify-between p-3 active:opacity-60">
            <View className="flex-row items-center gap-3">
              <View className={`w-8 h-8 rounded-xl items-center justify-center ${iconWrapperBg}`}>
                <InfoCircle size="18" color={monochromeIconColor} variant="Broken" />
              </View>
              <View>
                <ThemedText className="font-montBold text-sm">
                  {t('preferences.appIntroduction', 'App Introduction')}
                </ThemedText>
                <ThemedText className="text-[11px] text-zinc-400 mt-0.5 font-mont">
                  {t('preferences.appIntroductionSub', 'Revisit Onboarding')}
                </ThemedText>
              </View>
            </View>
            <ArrowRight2 size="14" color="#a1a1aa" />
          </Pressable>

          <Divider className="opacity-10 bg-zinc-400 dark:bg-zinc-500 mx-3" />

          {/*  Report Bug*/}
          <Pressable onPress={() => router.push('/report')} className="flex-row items-center justify-between p-3 active:opacity-60">
            <View className="flex-row items-center gap-3">
              <View className={`w-8 h-8 rounded-xl items-center justify-center ${iconWrapperBg}`}>
                <Warning2 size="18" color={monochromeIconColor} variant="Broken" />
              </View>
              <View>
                <ThemedText className="font-montBold text-sm">
                  {t('preferences.Report', 'Report Bug')}
                </ThemedText>
                <ThemedText className="text-[11px] text-zinc-400 mt-0.5 font-mont">
                  {t('preferences.ReportSub', 'Report Bugs or Issues')}
                </ThemedText>
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
                <ThemedText className="font-montBold text-sm">
                  {t('preferences.checkForUpdates', 'Check for Updates')}
                </ThemedText>
                <ThemedText className="text-[11px] text-zinc-400 mt-0.5 font-mont">
                  {t('preferences.checkForUpdatesSub', 'Verify server-side app builds')}
                </ThemedText>
              </View>
            </View>
            <View className="flex-row items-center gap-1.5">
              <ThemedText className="text-xs text-purple-500 font-montBold">{CURRENT_VERSION}</ThemedText>
              <ArrowRight2 size="14" color="#a1a1aa" />
            </View>
          </Pressable>
        </View>

        {/* SECTION: ABOUT */}
        <ThemedText className="text-[11px] uppercase font-montBold tracking-widest text-zinc-400 mb-2.5 ml-1">
          {t('sections.about', 'About.')}
        </ThemedText>

        <View
          style={[{ backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor }, Platform.select({ ios: { shadowColor: '#000000', shadowOffset: { width: 0, height: isDark ? 4 : 8 }, shadowOpacity: isDark ? 0.35 : 0.10, shadowRadius: isDark ? 10 : 16 }, android: { elevation: isDark ? 4 : 5 } })]}
          className="rounded-2xl p-2 mb-6"
        >
          {/* ABOUT DEVELOPER */}
          <Pressable onPress={() => Linking.openURL('https://brian-ali.netlify.app')} className="flex-row items-center justify-between p-3 active:opacity-60">
            <View className="flex-row items-center gap-3">
              <View className={`w-8 h-8 rounded-xl items-center justify-center ${iconWrapperBg}`}>
                <User size="18" color={monochromeIconColor} variant="Broken" />
              </View>
              <View>
                <ThemedText className="font-montBold text-sm">
                  {t('about.developer', 'About Developer')}
                </ThemedText>
                <ThemedText className="text-[11px] text-zinc-400 mt-0.5 font-mont">
                  {t('about.developerSub', 'Visit personal portfolio')}
                </ThemedText>
              </View>
            </View>
            <ArrowRight2 size="14" color="#a1a1aa" />
          </Pressable>

          <Divider className="opacity-10 bg-zinc-400 dark:bg-zinc-500 mx-3" />

          {/* MORE APPS */}
          <Pressable onPress={() => Linking.openURL('https://github.com/brianali-codes')} className="flex-row items-center justify-between p-3 active:opacity-60">
            <View className="flex-row items-center gap-3">
              <View className={`w-8 h-8 rounded-xl items-center justify-center ${iconWrapperBg}`}>
                <Mobile size="18" color={monochromeIconColor} variant="Broken" />
              </View>
              <View>
                <ThemedText className="font-montBold text-sm">
                  {t('about.moreApps', 'More Apps')}
                </ThemedText>
                <ThemedText className="text-[11px] text-zinc-400 mt-0.5 font-mont">
                  {t('about.moreAppsSub', 'Explore GitHub projects')}
                </ThemedText>
              </View>
            </View>
            <ArrowRight2 size="14" color="#a1a1aa" />
          </Pressable>

          <Divider className="opacity-10 bg-zinc-400 dark:bg-zinc-500 mx-3" />

          {/* SOCIALS */}
          <Pressable onPress={() => setSocialsModalVisible(true)} className="flex-row items-center justify-between p-3 active:opacity-60">
            <View className="flex-row items-center gap-3">
              <View className={`w-8 h-8 rounded-xl items-center justify-center ${iconWrapperBg}`}>
                <Share size="18" color={monochromeIconColor} variant="Broken" />
              </View>
              <View>
                <ThemedText className="font-montBold text-sm">
                  {t('about.socials', 'Socials')}
                </ThemedText>
                <ThemedText className="text-[11px] text-zinc-400 mt-0.5 font-mont">
                  {t('about.socialsSub', 'Connect across networks')}
                </ThemedText>
              </View>
            </View>
            <ArrowRight2 size="14" color="#a1a1aa" />
          </Pressable>

          <Divider className="opacity-10 bg-zinc-400 dark:bg-zinc-500 mx-3" />

          {/* Privacy Policy */}
          <Pressable onPress={() => Linking.openURL('https://frappgiveaways.vercel.app/privacy-policy')} className="flex-row items-center justify-between p-3 active:opacity-60">
            <View className="flex-row items-center gap-3">
              <View className={`w-8 h-8 rounded-xl items-center justify-center ${iconWrapperBg}`}>
                <Lock1 size="18" color={monochromeIconColor} variant="Broken" />
              </View>
              <View>
                <ThemedText className="font-montBold text-sm">
                  {t('about.privacy', 'Privacy Policy')}
                </ThemedText>
                <ThemedText className="text-[11px] text-zinc-400 mt-0.5 font-mont">
                  {t('about.privacySub', "View Frapp's Policies")}
                </ThemedText>
              </View>
            </View>
            <ArrowRight2 size="14" color="#a1a1aa" />
          </Pressable>
        </View>

        {/* SECTION: COMMUNITY & SUPPORT */}
        <ThemedText className="text-[11px] uppercase font-montBold tracking-widest text-zinc-400 mb-2.5 ml-1">
          {t('sections.community', 'Community & Support.')}
        </ThemedText>

        <View className="w-full mb-6">
          <Pressable
            onPress={() => Linking.openURL(APP_REPO_URL)}
            style={[
              { backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor },
              Platform.select({
                ios: {
                  shadowColor: '#000000',
                  shadowOffset: { width: 0, height: isDark ? 2 : 4 },
                  shadowOpacity: isDark ? 0.25 : 0.06,
                  shadowRadius: 8,
                },
                android: { elevation: 2 },
              }),
            ]}
            className="rounded-2xl p-4 mb-3 active:opacity-85"
          >

            {/* Main Hook */}
            <ThemedText className="font-montBlack text-base tracking-tight mb-1">
              {t('community.supportOpenSource', '100% Free & Transparent')}
            </ThemedText>

            <ThemedText className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed font-mont mb-4">
              {t('community.supportOpenSourceSub', 'No ads, no tracking. If Frapp helped you grab game deals, consider dropping a star on GitHub!')}
            </ThemedText>

          
            <View
             style={{
                  borderColor: adaptiveBorderColor,
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
              }}
              className="flex-row items-center justify-between px-3.5 py-2.5 rounded-xl border"
            >
             

              <View 
              style={{
                  borderColor: adaptiveBorderColor,
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
              }}
              className="bg-purple-600 p-3 rounded-lg ">
                <ThemedText className="font-montBlack text-xs text-white">
                  {t('community.starGithub', 'Star Us')}
                </ThemedText>
              </View>

               <View className="flex-row items-center gap-2">
                <Star1 size="16" color="#9333ea" variant="Bold" />
                <ThemedText className="font-montBold text-xs text-zinc-700 dark:text-zinc-200">
                  {formattedStars}
                </ThemedText>
              </View>
            </View>
          </Pressable>

          {/* 2. KO-FI & PATREON SUPPORT CARD */}
          <View
            style={[
              { backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor },
              Platform.select({
                ios: {
                  shadowColor: '#000000',
                  shadowOffset: { width: 0, height: isDark ? 2 : 4 },
                  shadowOpacity: isDark ? 0.25 : 0.06,
                  shadowRadius: 8,
                },
                android: { elevation: 2 },
              }),
            ]}
            className="rounded-2xl p-4"
          >
            <View className="flex-row items-center gap-2 mb-1.5">
              <ThemedText className="font-montBlack text-sm tracking-tight">
                {t('community.buyCoffee', 'Buy me a Coffee')}
              </ThemedText>
            </View>

            <ThemedText className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed mb-4 font-mont">
              {t('community.buyCoffeeSub', 'Help keep the servers running and the coffee flowing! A small donation helps us maintain the project and add new features.')}
            </ThemedText>

            {/* Responsive Equal Action Tiles */}
            <View className="flex-row items-center gap-3 w-full">
              {/* Ko-fi Button */}
              <Pressable
                onPress={() => Linking.openURL('https://ko-fi.com/brianalicodes')}
                style={{
                  borderColor: adaptiveBorderColor,
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                }}
                className="flex-1 flex-row items-center justify-center gap-2 py-3 px-2 rounded-xl border active:opacity-70"
              >
                <Coffee size="16" color={isDark ? '#e4e4e7' : '#27272a'} variant="Broken" />
                <ThemedText className="font-montBold text-xs">
                  {t('community.donateKofi', 'Ko-fi')}
                </ThemedText>
              </Pressable>

              {/* Patreon Button */}
              <Pressable
                onPress={() => Linking.openURL('https://www.patreon.com/c/brianali_codes')}
                style={{
                  borderColor: adaptiveBorderColor,
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                }}
                className="flex-1 flex-row items-center justify-center gap-2 py-3 px-2 rounded-xl border active:opacity-70"
              >
                <Heart size="16" color={isDark ? '#e4e4e7' : '#27272a'} variant="Broken" />
                <ThemedText className="font-montBold text-xs">
                  {t('community.donatePatreon', 'Patreon')}
                </ThemedText>
              </Pressable>
            </View>
          </View>
        </View>

        {/* SECTION: DATA PROVIDERS */}
        <ThemedText className="text-[11px] uppercase font-montBold tracking-widest text-zinc-400 mb-2.5 ml-1">
          {t('sections.providers', 'Data Providers.')}
        </ThemedText>
        <View style={[{ backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor }, Platform.select({ ios: { shadowColor: '#000000', shadowOffset: { width: 0, height: isDark ? 4 : 8 }, shadowOpacity: isDark ? 0.35 : 0.10, shadowRadius: isDark ? 10 : 16 }, android: { elevation: isDark ? 4 : 5 } })]} className="rounded-2xl p-2">
          <Pressable onPress={() => Linking.openURL(APP_URLS.GAME_POWER_URL)} className="flex-row items-center justify-between p-3 active:opacity-60">
            <View className="flex-row items-center gap-3">
              <View className={`w-8 h-8 rounded-xl items-center justify-center ${iconWrapperBg}`}>
                <Global size="18" color={monochromeIconColor} variant="Broken" />
              </View>
              <View>
                <ThemedText className="font-montBold text-sm">
                  {t('providers.gamepower', 'Gamepower Site')}
                </ThemedText>
                <ThemedText className="text-[11px] text-zinc-400 mt-0.5 font-mont">
                  {t('providers.gamepowerSub', 'Primary giveaways API')}
                </ThemedText>
              </View>
            </View>
            <ArrowRight2 size="14" color="#a1a1aa" />
          </Pressable>
          <Divider className="opacity-10 bg-zinc-400 dark:bg-zinc-500 mx-3" />
          <Pressable onPress={() => Linking.openURL(APP_URLS.CHEAP_SHARK_URL)} className="flex-row items-center justify-between p-3 active:opacity-60">
            <View className="flex-row items-center gap-3">
              <View className={`w-8 h-8 rounded-xl items-center justify-center ${iconWrapperBg}`}>
                <Global size="18" color={monochromeIconColor} variant="Broken" />
              </View>
              <View>
                <ThemedText className="font-montBold text-sm">
                  {t('providers.cheapshark', 'CheapShark API')}
                </ThemedText>
                <ThemedText className="text-[11px] text-zinc-400 mt-0.5 font-mont">
                  {t('providers.cheapsharkSub', 'Video Game Deals API')}
                </ThemedText>
              </View>
            </View>
            <ArrowRight2 size="14" color="#a1a1aa" />
          </Pressable>
        </View>

        <View className="mt-8 mb-4 items-center justify-center">
          <Divider style={{ backgroundColor: textColor }} className="w-12 h-0.5 rounded-full opacity-10 mb-3" />
          <ThemedText className="text-center font-montBold text-[11px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            {t('footer.build', 'Frapp Build {{version}}', { version: CURRENT_VERSION })}
          </ThemedText>
        </View>
      </ScrollView>

      {/* --- SERVER CROSS-REFERENCE STATUS MODAL --- */}
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
            <Pressable
              onPress={() => setModalVisible(false)}
              className="absolute top-4 right-4 active:opacity-60"
            >
              <CloseCircle size="22" color={isDark ? '#a1a1aa' : '#71717a'} variant="Broken" />
            </Pressable>

            <ThemedText className="font-montBlack text-lg text-center mt-2 mb-3 tracking-tight">
              {modalConfig.title}
            </ThemedText>

            <ThemedText className="font-mont text-zinc-500 dark:text-zinc-400 text-sm text-center leading-relaxed mb-6 px-1">
              {modalConfig.message}
            </ThemedText>

            <View className="flex-row items-center gap-3 w-full">
              {modalConfig.type === 'update' && (
                <Button
                  type="dark"
                  text={t('updateModal.later', 'Later')}
                  onPress={() => modalVisible && setModalVisible(false)}
                  className="flex-1 font-montBold"
                />
              )}
              <Button
                type={modalConfig.type === 'error' ? 'dark' : 'primary'}
                text={modalConfig.actionText || t('modals.ok', 'OK')}
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

      {/* --- SOCIALS CONNECT SELECTION MODAL --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={socialsModalVisible}
        onRequestClose={() => setSocialsModalVisible(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/60 px-6">
          <View
            style={{ backgroundColor: isDark ? '#1e1e24' : '#ffffff', borderColor: adaptiveBorderColor, borderWidth: 1 }}
            className="w-full rounded-3xl p-6 shadow-2xl max-w-sm"
          >
            <Pressable
              onPress={() => setSocialsModalVisible(false)}
              className="absolute top-4 right-4 active:opacity-60 z-10"
            >
              <CloseCircle size="22" color={isDark ? '#a1a1aa' : '#71717a'} variant="Broken" />
            </Pressable>

            <ThemedText className="font-montBlack text-lg text-center mt-2 mb-5 tracking-tight">
              {t('modals.socialsTitle', 'Connect with Me')}
            </ThemedText>

            <View className="gap-2 w-full mb-2">
              <Button
                type="primary"
                text="Twitter / X"
                onPress={() => {
                  Linking.openURL('https://x.com/brianali427');
                  setSocialsModalVisible(false);
                }}
                className="w-full font-montBold"
              />
              <Button
                type="dark"
                text="Instagram"
                onPress={() => {
                  Linking.openURL('https://instagram.com/brianali_codes');
                  setSocialsModalVisible(false);
                }}
                className="w-full font-montBold"
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* --- TWO-LANGUAGE MODAL COMPONENT SELECTION LAYER --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={languageModalVisible}
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/60 px-6">
          <View
            style={{ backgroundColor: isDark ? '#1e1e24' : '#ffffff', borderColor: adaptiveBorderColor, borderWidth: 1 }}
            className="w-full rounded-3xl p-6 shadow-2xl max-w-sm"
          >
            <Pressable
              onPress={() => setLanguageModalVisible(false)}
              className="absolute top-4 right-4 active:opacity-60 z-10"
            >
              <CloseCircle size="22" color={isDark ? '#a1a1aa' : '#71717a'} variant="Broken" />
            </Pressable>

            <ThemedText className="font-montBlack text-lg text-center mt-2 mb-5 tracking-tight">
              {t('modals.languageTitle', 'Select Language')}
            </ThemedText>

            <View className="gap-3 w-full mb-2">
              <Pressable
                onPress={() => handleSelectLanguage('en')}
                style={{ backgroundColor: cardBgColor }}
                className="flex-row items-center justify-between p-4 rounded-xl active:opacity-70"
              >
                <ThemedText className="font-montBold text-sm">English</ThemedText>
                {currentLanguageCode.startsWith('en') && (
                  <TickCircle size="20" color="#a855f7" variant="Bold" />
                )}
              </Pressable>

              <Pressable
                onPress={() => handleSelectLanguage('es')}
                style={{ backgroundColor: cardBgColor }}
                className="flex-row items-center justify-between p-4 rounded-xl active:opacity-70"
              >
                <ThemedText className="font-montBold text-sm">Español</ThemedText>
                {currentLanguageCode.startsWith('es') && (
                  <TickCircle size="20" color="#a855f7" variant="Bold" />
                )}
              </Pressable>

              <Pressable
                onPress={() => handleSelectLanguage('jp')}
                style={{ backgroundColor: cardBgColor }}
                className="flex-row items-center justify-between p-4 rounded-xl active:opacity-70"
              >
                <ThemedText className="font-montBold text-sm">日本語</ThemedText>
                {currentLanguageCode.startsWith('jp') && (
                  <TickCircle size="20" color="#a855f7" variant="Bold" />
                )}
              </Pressable>

              <Pressable
                onPress={() => handleSelectLanguage('sw')}
                style={{ backgroundColor: cardBgColor }}
                className="flex-row items-center justify-between p-4 rounded-xl active:opacity-70"
              >
                <ThemedText className="font-montBold text-sm">Kiswahili</ThemedText>
                {currentLanguageCode.startsWith('sw') && (
                  <TickCircle size="20" color="#a855f7" variant="Bold" />
                )}
              </Pressable>



              <Pressable
                onPress={() => handleSelectLanguage('pt')}
                style={{ backgroundColor: cardBgColor }}
                className="flex-row items-center justify-between p-4 rounded-xl active:opacity-70"
              >
                <ThemedText className="font-montBold text-sm">Português</ThemedText>
                {currentLanguageCode.startsWith('pt') && (
                  <TickCircle size="20" color="#a855f7" variant="Bold" />
                )}
              </Pressable>

              <Pressable
                onPress={() => handleSelectLanguage('hi')}
                style={{ backgroundColor: cardBgColor }}
                className="flex-row items-center justify-between p-4 rounded-xl active:opacity-70"
              >
                <ThemedText className="font-montBold text-sm">हिन्दी</ThemedText>
                {currentLanguageCode.startsWith('hi') && (
                  <TickCircle size="20" color="#a855f7" variant="Bold" />
                )}
              </Pressable>

              <Pressable
                onPress={() => handleSelectLanguage('zh')}
                style={{ backgroundColor: cardBgColor }}
                className="flex-row items-center justify-between p-4 rounded-xl active:opacity-70"
              >
                <ThemedText className="font-montBold text-sm">中文</ThemedText>
                {currentLanguageCode.startsWith('zh') && (
                  <TickCircle size="20" color="#a855f7" variant="Bold" />
                )}
              </Pressable>

              <Pressable
                onPress={() => handleSelectLanguage('fr')}
                style={{ backgroundColor: cardBgColor }}
                className="flex-row items-center justify-between p-4 rounded-xl active:opacity-70"
              >
                <ThemedText className="font-montBold text-sm">Français</ThemedText>
                {currentLanguageCode.startsWith('fr') && (
                  <TickCircle size="20" color="#a855f7" variant="Bold" />
                )}
              </Pressable>

              <Pressable
                onPress={() => handleSelectLanguage('de')}
                style={{ backgroundColor: cardBgColor }}
                className="flex-row items-center justify-between p-4 rounded-xl active:opacity-70"
              >
                <ThemedText className="font-montBold text-sm">Deutsch</ThemedText>
                {currentLanguageCode.startsWith('de') && (
                  <TickCircle size="20" color="#a855f7" variant="Bold" />
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}