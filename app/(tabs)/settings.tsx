import Button from '@/components/custom/Button';
import { Divider } from '@/components/custom/Divider';
import { ThemedText } from '@/components/ThemedText';
import { APP_REPO_URL, APP_URLS, DEVICE_SETTINGS_URL } from '@/constants/app';
import React from 'react';
import { Alert, Linking, View, ScrollView, Pressable, Platform, Image } from 'react-native';
import { 
  Setting, 
  Moon, 
  Sun1, 
  Notification, 
  Global, 
  Heart, 
  Coffee, 
  ArrowRight2,
  InfoCircle 
} from 'iconsax-react-nativejs';
import { useRouter } from 'expo-router';

// Import custom theme hooks
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';

export default function SettingsScreen() {
  const router = useRouter();
  
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const { themeMode, toggleTheme } = useCustomTheme();

  const cardBgColor = themeMode === 'dark' ? '#2c2c35' : '#f1f2f6';
  const adaptiveBorderColor = themeMode === 'dark'
    ? 'rgba(255, 255, 255, 0.07)'
    : 'rgba(0, 0, 0, 0.07)';

  const monochromeIconColor = themeMode === 'dark' ? '#ffffff' : '#000000';
  const iconWrapperBg = 'bg-zinc-500/10 dark:bg-zinc-400/10';

  const openNotificationSettings = async () => {
    try {
      await Linking.openURL(DEVICE_SETTINGS_URL);
    } catch (error) {
      Alert.alert('Error', 'Unable to open settings, please set them manually.');
    }
  };

  return (
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
          <View 
            style={{ backgroundColor: themeMode === 'dark' ? '#27272a' : '#f4f4f5' }}
            className="w-10 h-10 rounded-full items-center justify-center shadow-sm"
          >
            <Setting size="22" color={themeMode === 'dark' ? '#f4f4f5' : '#3f3f46'} variant="Broken" />
          </View>

          <Pressable 
            onPress={toggleTheme}
            style={{ backgroundColor: themeMode === 'dark' ? '#27272a' : '#f4f4f5' }}
            className="w-10 h-10 rounded-full items-center justify-center active:opacity-70 shadow-sm"
          >
            {themeMode === 'dark' ? (
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
        style={[{ backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor }, Platform.select({ ios: { shadowColor: '#000000', shadowOffset: { width: 0, height: themeMode === 'dark' ? 4 : 8 }, shadowOpacity: themeMode === 'dark' ? 0.35 : 0.10, shadowRadius: themeMode === 'dark' ? 10 : 16 }, android: { elevation: themeMode === 'dark' ? 4 : 5 } })]} 
        className="rounded-2xl p-2 mb-6"
      >
        <Pressable onPress={toggleTheme} className="flex-row items-center justify-between p-3 active:opacity-60">
          <View className="flex-row items-center gap-3">
            <View className={`w-8 h-8 rounded-xl items-center justify-center ${iconWrapperBg}`}>
              {themeMode === 'dark' ? <Sun1 size="18" color={monochromeIconColor} variant="Broken" /> : <Moon size="18" color={monochromeIconColor} variant="Broken" />}
            </View>
            <ThemedText className="font-montBold text-sm">Theme Appearance</ThemedText>
          </View>
          <View className="flex-row items-center gap-1.5">
            <ThemedText className="text-xs text-zinc-400 font-montBold capitalize">{themeMode} Mode</ThemedText>
            <ArrowRight2 size="14" color="#a1a1aa" />
          </View>
        </Pressable>
        <Divider className="opacity-10 bg-zinc-400 dark:bg-zinc-500 mx-3" />
        <Pressable onPress={openNotificationSettings} className="flex-row items-center justify-between p-3 active:opacity-60">
          <View className="flex-row items-center gap-3">
            <View className={`w-8 h-8 rounded-xl items-center justify-center ${iconWrapperBg}`}>
              <Notification size="18" color={monochromeIconColor} variant="Broken" />
            </View>
            <View>
              <ThemedText className="font-montBold text-sm">Notifications</ThemedText>
              <ThemedText className="text-[11px] text-zinc-400 mt-0.5 font-mont">Toggle live alerts for new games</ThemedText>
            </View>
          </View>
          <ArrowRight2 size="14" color="#a1a1aa" />
        </Pressable>
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
      </View>

      {/* SECTION: COMMUNITY & SUPPORT */}
      <ThemedText className="text-[11px] uppercase font-montBold tracking-widest text-zinc-400 mb-2.5 ml-1">
        Community & Support
      </ThemedText>
      
      <View style={[{ backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor }, Platform.select({ ios: { shadowColor: '#000000', shadowOffset: { width: 0, height: themeMode === 'dark' ? 4 : 8 }, shadowOpacity: themeMode === 'dark' ? 0.35 : 0.10, shadowRadius: themeMode === 'dark' ? 10 : 16 }, android: { elevation: themeMode === 'dark' ? 4 : 5 } })]} className="rounded-2xl p-5 mb-6">
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
      <View style={[{ backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor }, Platform.select({ ios: { shadowColor: '#000000', shadowOffset: { width: 0, height: themeMode === 'dark' ? 4 : 8 }, shadowOpacity: themeMode === 'dark' ? 0.35 : 0.10, shadowRadius: themeMode === 'dark' ? 10 : 16 }, android: { elevation: themeMode === 'dark' ? 4 : 5 } })]} className="rounded-2xl p-5 mb-6">
        <View className="flex-row items-center gap-2 mb-2">
          <Coffee size="18" color="#ff5e5b" variant="Broken" />
          <ThemedText className="font-montBlack text-sm tracking-tight">Buy me a Coffee</ThemedText>
        </View>
        <ThemedText className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed mb-4 font-mont">
          Help keep the servers running and the coffee flowing! A small donation helps us maintain the project and add new features.
        </ThemedText>
        <Button onPress={() => Linking.openURL('https://ko-fi.com/brianali-codes')} text="Donate on Ko-fi" type="primary" className="font-montBold" />
      </View>

      {/* SECTION: DATA PROVIDERS */}
      <ThemedText className="text-[11px] uppercase font-montBold tracking-widest text-zinc-400 mb-2.5 ml-1">
        Data Providers
      </ThemedText>
      <View style={[{ backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor }, Platform.select({ ios: { shadowColor: '#000000', shadowOffset: { width: 0, height: themeMode === 'dark' ? 4 : 8 }, shadowOpacity: themeMode === 'dark' ? 0.35 : 0.10, shadowRadius: themeMode === 'dark' ? 10 : 16 }, android: { elevation: themeMode === 'dark' ? 4 : 5 } })]} className="rounded-2xl p-2">
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
          Frapp Build v1.1.0
        </ThemedText>
      </View>
    </ScrollView>
  );
}