import React, { useState, useEffect } from 'react';
import { View, Dimensions, Pressable, ScrollView, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import notifee, { AndroidNotificationSetting, AuthorizationStatus } from '@notifee/react-native';
import { ThemedText } from '@/components/ThemedText';
import {
  SecuritySafe,
  Eye,
  ArrowRight2,
  TickCircle,
  Notification,
  TimerStart,
  ShieldTick
} from 'iconsax-react-nativejs';
import LottieView from 'lottie-react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [agreed, setAgreed] = useState(false);

  // Permission States
  const [pushGranted, setPushGranted] = useState(false);
  const [alarmGranted, setAlarmGranted] = useState(false);

  const backgroundColor = useThemeColor({}, 'background');
  const cardBgColor = useThemeColor({}, 'background');
  const { themeMode } = useCustomTheme();

  const isDark = themeMode === 'dark';

  useEffect(() => {
    checkCurrentPermissions();
  }, [currentStep]);

  const checkCurrentPermissions = async () => {
    try {
      // 1. Check Push Notifications
      const settings = await notifee.getNotificationSettings();
      const isPushOk =
        settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
        settings.authorizationStatus === AuthorizationStatus.PROVISIONAL;
      setPushGranted(isPushOk);

      if (Platform.OS === 'android') {
        // 2. Check Exact Alarms (Android 12+)
        const isAlarmOk = settings.android.alarm !== AndroidNotificationSetting.DISABLED;
        setAlarmGranted(isAlarmOk);
      } else {
        setAlarmGranted(true);
      }
    } catch (error) {
      console.error('Error reading permission states:', error);
    }
  };

  const handleRequestPush = async () => {
    try {
      const settings = await notifee.requestPermission();
      const isOk =
        settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
        settings.authorizationStatus === AuthorizationStatus.PROVISIONAL;
      setPushGranted(isOk);
    } catch (err) {
      console.error('Push permission error:', err);
    }
  };

  const handleRequestAlarms = async () => {
    try {
      if (Platform.OS === 'android') {
        await notifee.openAlarmPermissionSettings();
        checkCurrentPermissions();
      }
    } catch (err) {
      console.error('Alarm permission error:', err);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3 && agreed) {
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={{ backgroundColor }} className="flex-1 justify-between px-6 pt-16 pb-10">
      {/* STEP METADATA / PROGRESS PILLS */}
      <View className="flex-row items-center justify-center gap-2 mt-2">
        <View className={`h-1.5 rounded-full ${currentStep === 1 ? 'w-8 bg-purple-500' : 'w-2 bg-zinc-300 dark:bg-zinc-800'}`} />
        <View className={`h-1.5 rounded-full ${currentStep === 2 ? 'w-8 bg-purple-500' : 'w-2 bg-zinc-300 dark:bg-zinc-800'}`} />
        <View className={`h-1.5 rounded-full ${currentStep === 3 ? 'w-8 bg-purple-500' : 'w-2 bg-zinc-300 dark:bg-zinc-800'}`} />
      </View>

      {/* --- STEP 1 --- */}
      {currentStep === 1 && (
        <View className="flex-1 justify-between my-auto py-4">
          <View className="items-center mt-4">
            <View className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg shadow-purple-500/20 mb-4 border border-purple-400/20">
              <Image
                source={require('@/assets/images/FRAPP_ICON1.png')}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>

            <ThemedText className="text-3xl font-montBlack tracking-tight text-center">
              {t('onboarding.welcome', { defaultValue: 'Welcome to Frapp' })}
            </ThemedText>

            <View className="bg-purple-500/10 px-3 py-1 rounded-full mt-2 border border-purple-500/20">
              <ThemedText className="text-purple-500 font-montBold text-[11px] uppercase">
                {t('onboarding.title2', { defaultValue: 'Giveaways and Deals in One Place' })}
              </ThemedText>
            </View>
          </View>

          <View className="w-full max-w-sm h-64 self-center justify-center items-center my-4">
            <LottieView
              source={require('@/assets/images/onboarding-anim.json')}
              autoPlay
              loop
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          </View>

          <View className="max-w-md self-center w-full px-4 mb-6">
            <ThemedText className="text-center font-montBold text-base leading-snug tracking-tight mb-2">
              {t('onboarding.title', { defaultValue: 'Track Video game giveaways and premium game deals.' })}
            </ThemedText>
            <ThemedText className="text-zinc-500 dark:text-zinc-400 text-center text-xs leading-relaxed font-mont">
              {t('onboarding.description', { defaultValue: 'Frapp deals in both game giveaways and massive video game Deals, We aggregate the latest 100% free claimable rewards alongside deep retail discounts across storefronts so you always play more for less.' })}
            </ThemedText>
          </View>
        </View>
      )}

      {/* --- STEP 2: PERMISSIONS --- */}
      {currentStep === 2 && (
        <View className="flex-1 justify-between my-auto py-4">
          <View className="items-center mt-2">
            <View className="w-14 h-14 bg-purple-500/10 rounded-2xl items-center justify-center border border-purple-500/20 mb-3">
              <ShieldTick size="28" color="#9333ea" variant="Broken" />
            </View>
            <ThemedText className="text-2xl font-montBlack tracking-tight text-center">
              {t('onboarding.permissionsTitle', { defaultValue: 'App Permissions' })}
            </ThemedText>
            <ThemedText className="text-zinc-500 dark:text-zinc-400 text-xs text-center px-4 mt-1 leading-relaxed font-mont">
              {t('onboarding.permissionsSubtitle', { defaultValue: 'Frapp requires access to your device\'s Notifications and Alarm permissions, Please grant the necessary permissions to ensure a seamless experience, Android 14+ devices may require you to allow Exact Alarm permissions.' })}
            </ThemedText>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} className="my-4 space-y-3">
            {/* 1. Push Notifications Card */}
            <View
              style={{ backgroundColor: cardBgColor }}
              className="flex-row items-center justify-between border border-zinc-100 dark:border-zinc-800/60 p-4 rounded-2xl shadow-sm mb-3"
            >
              <View className="flex-row items-center gap-3 flex-1 mr-3">
                <View className="w-10 h-10 rounded-xl bg-purple-500/10 items-center justify-center shrink-0">
                  <Notification size="20" color="#9333ea" variant="Bold" />
                </View>
                <View className="flex-1">
                  <ThemedText className="font-montBold text-xs">
                    {t('onboarding.pushTitle', { defaultValue: 'Push Alerts' })}
                  </ThemedText>
                  <ThemedText className="text-zinc-500 dark:text-zinc-400 text-[10px] leading-tight font-mont mt-0.5">
                    {t('onboarding.pushDesc', { defaultValue: 'Get instant alerts when free games or huge discounts land.' })}
                  </ThemedText>
                </View>
              </View>

              <Pressable
                onPress={handleRequestPush}
                disabled={pushGranted}
                style={{ backgroundColor: pushGranted ? 'rgba(34, 197, 94, 0.15)' : '#9333ea' }}
                className="px-3 py-2 rounded-xl flex-row items-center gap-1 shrink-0"
              >
                {pushGranted ? (
                  <>
                    <TickCircle size="14" color="#22c55e" variant="Bold" />
                    <ThemedText className="text-emerald-500 font-montBlack text-[10px] uppercase">
                      {t('onboarding.granted', { defaultValue: 'Ready' })}
                    </ThemedText>
                  </>
                ) : (
                  <ThemedText className="text-white font-montBlack text-[10px] uppercase">
                    {t('onboarding.allow', { defaultValue: 'Allow' })}
                  </ThemedText>
                )}
              </Pressable>
            </View>

            {/* 2. Exact Alarms Card (Android) */}
            <View
              style={{ backgroundColor: cardBgColor }}
              className="flex-row items-center justify-between border border-zinc-100 dark:border-zinc-800/60 p-4 rounded-2xl shadow-sm mb-3"
            >
              <View className="flex-row items-center gap-3 flex-1 mr-3">
                <View className="w-10 h-10 rounded-xl bg-blue-500/10 items-center justify-center shrink-0">
                  <TimerStart size="20" color="#3b82f6" variant="Bold" />
                </View>
                <View className="flex-1">
                  <ThemedText className="font-montBold text-xs">
                    {t('onboarding.alarmTitle', { defaultValue: 'Exact Reminders' })}
                  </ThemedText>
                  <ThemedText className="text-zinc-500 dark:text-zinc-400 text-[10px] leading-tight font-mont mt-0.5">
                    {t('onboarding.alarmDesc', { defaultValue: 'Schedule precise 24h expiration alerts for saved library drops.' })}
                  </ThemedText>
                </View>
              </View>

              <Pressable
                onPress={handleRequestAlarms}
                disabled={alarmGranted}
                style={{ backgroundColor: alarmGranted ? 'rgba(34, 197, 94, 0.15)' : (isDark ? '#27272a' : '#f4f4f5') }}
                className="px-3 py-2 rounded-xl flex-row items-center gap-1 shrink-0 border border-zinc-200 dark:border-zinc-700/60"
              >
                {alarmGranted ? (
                  <>
                    <TickCircle size="14" color="#22c55e" variant="Bold" />
                    <ThemedText className="text-emerald-500 font-montBlack text-[10px] uppercase">
                      {t('onboarding.granted', { defaultValue: 'Ready' })}
                    </ThemedText>
                  </>
                ) : (
                  <ThemedText className="text-purple-500 font-montBlack text-[10px] uppercase">
                    {t('onboarding.setup', { defaultValue: 'Setup' })}
                  </ThemedText>
                )}
              </Pressable>
            </View>
          </ScrollView>
        </View>
      )}

      {/* --- STEP 3: LEGAL --- */}
      {currentStep === 3 && (
        <View className="flex-1 justify-between my-auto py-6">
          <View className="items-center">
            <View className="w-14 h-14 bg-white rounded-2xl items-center justify-center border border-[#9333ea] mb-3">
              <SecuritySafe size="28" color="#9333ea" variant="Broken" />
            </View>
            <ThemedText className="text-2xl font-montBlack tracking-tight text-center">
              {t('onboarding.legalTitle', { defaultValue: 'Legal Agreements' })}
            </ThemedText>
            <ThemedText className="text-zinc-500 dark:text-zinc-400 text-sm text-center px-4 mt-1 leading-relaxed font-mont">
              {t('onboarding.legalSubtitle', { defaultValue: 'Please review the privacy conditions before accessing our global data sync pipelines.' })}
            </ThemedText>
          </View>

          <View
            style={{ backgroundColor: cardBgColor }}
            className="flex-1 my-6 max-h-[280px] border border-zinc-100 dark:border-zinc-800/60 rounded-2xl p-4 shadow-sm"
          >
            <ScrollView showsVerticalScrollIndicator={true} className="pr-1">
              <View className="flex-row items-center gap-2 mb-2">
                <Eye size="14" color="#a855f7" variant="Broken" />
                <ThemedText className="text-xs font-montBlack uppercase text-purple-500 tracking-wider">
                  {t('onboarding.privacyHeader', { defaultValue: 'Privacy Core Framework' })}
                </ThemedText>
              </View>
              <ThemedText className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed mb-4 font-mont">
                {t('onboarding.privacyBody', { defaultValue: 'Frapp operates entirely as an open-source data aggregator tool. We do not maintain localized storage platforms, harvest physical account structures, or trace user telemetry histories. Because all processes run directly on your hardware, no data is ever transmitted, processed, or logged by an internal master hub or centralized administrative network. Your localized configuration profiles, historical cache files, and interactive preferences remain securely on your device.' })}
              </ThemedText>

              <View className="flex-row items-center gap-2 mb-2">
                <SecuritySafe size="14" color="#a855f7" variant="Broken" />
                <ThemedText className="text-xs font-montBlack uppercase text-purple-500 tracking-wider">
                  {t('report.attributionCard.title', { defaultValue: 'Third-Party API Disclosures' })}
                </ThemedText>
              </View>
              <ThemedText className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed font-mont">
                {t('report.attributionCard.description', { defaultValue: 'All data indexes visible throughout the interface are fetched directly from external networks via the Gamepower and CheapShark open public architectures. Use of these indexes complies directly with their native distribution rules. Frapp does not manipulate individual item listings, alter pricing structures, or manage distribution timelines. Consequently, we cannot guarantee the uninterrupted availability, accuracy, or ongoing support of external nodes or keys distributed through those respective platforms.' })}
              </ThemedText>
            </ScrollView>
          </View>

          <Pressable
            onPress={() => setAgreed(!agreed)}
            style={{ backgroundColor: cardBgColor }}
            className="flex-row items-center gap-3 border border-zinc-100 dark:border-zinc-800/60 p-4 rounded-xl mb-4 active:opacity-90 max-w-md w-full self-center shadow-sm"
          >
            <View className="w-6 h-6 items-center justify-center">
              {agreed ? (
                <TickCircle size="24" color="#9333ea" variant="Bold" />
              ) : (
                <View className="w-5 h-5 rounded-md border-2 border-zinc-300 dark:border-zinc-700 bg-transparent" />
              )}
            </View>
            <View className="flex-1">
              <ThemedText className="font-montBold text-xs leading-tight">
                {t('onboarding.consentLabel', { defaultValue: 'I accept the Terms of Service & Privacy Statement' })}
              </ThemedText>
            </View>
          </Pressable>
        </View>
      )}

      {/* --- FOOTER --- */}
      <View className="w-full max-w-md self-center">
        <Pressable
          onPress={handleNextStep}
          disabled={currentStep === 3 && !agreed}
          style={{
            backgroundColor: currentStep === 3 && !agreed
              ? (themeMode === 'dark' ? '#27272a' : '#e4e4e7')
              : '#9333ea',
          }}
          className="w-full h-14 rounded-full flex-row items-center justify-center shadow-md gap-2 active:opacity-90"
        >
          <ThemedText
            style={{
              color: currentStep === 3 && !agreed
                ? (themeMode === 'dark' ? '#71717a' : '#a1a1aa')
                : '#ffffff'
            }}
            className="font-montBlack text-sm tracking-wide"
          >
            {currentStep === 1 
              ? t('onboarding.btnStep1', { defaultValue: 'Continue' }) 
              : currentStep === 2
              ? t('onboarding.btnStep2', { defaultValue: 'Continue to Terms' })
              : t('onboarding.btnStep3', { defaultValue: 'Get Started' })
            }
          </ThemedText>
          <ArrowRight2
            size="16"
            color={currentStep === 3 && !agreed ? (themeMode === 'dark' ? '#71717a' : '#a1a1aa') : '#ffffff'}
            variant="Bold"
          />
        </Pressable>

        <ThemedText className="text-zinc-400 dark:text-zinc-600 text-xs text-center font-mont tracking-widest mt-5">
          {t('onboarding.versionLabel', { defaultValue: 'v1.1.6' })}
        </ThemedText>
      </View>
    </View>
  );
}