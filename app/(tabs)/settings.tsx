import Button from '@/components/custom/Button';
import { Divider } from '@/components/custom/Divider';
import { ThemedText } from '@/components/ThemedText';
import { APP_REPO_URL, APP_URLS, DEVICE_SETTINGS_URL } from '@/constants/app';
import React from 'react';
import { Alert, Linking, View, ScrollView, Pressable, Platform } from 'react-native';
import { 
  Setting, 
  Moon, 
  Sun1, 
  Star, 
  Notification, 
  Global, 
  Heart, 
  ArrowRight2,
  InfoCircle // Added for Revisit Onboarding row
} from 'iconsax-react-nativejs';
import { useRouter } from 'expo-router';

// Import custom theme hooks
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';

export default function SettingsScreen() {
  const router = useRouter();
  
  // Fetch dynamic surface elements
  const backgroundColor = useThemeColor({}, 'background');
  const cardBgColor = useThemeColor({}, 'background'); // Fixed: Changed from 'background' to 'card' surface
  const textColor = useThemeColor({}, 'text');
  const { themeMode, toggleTheme } = useCustomTheme();

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
          <View className="w-10 h-10 bg-purple-600 rounded-xl items-center justify-center shadow-md">
            <ThemedText className="text-white font-black text-lg">▲</ThemedText>
          </View>
          <ThemedText className="text-xl font-extrabold tracking-tight">
            Settings<ThemedText className="text-purple-500 font-extrabold text-xl"></ThemedText>
          </ThemedText>
        </View>

        {/* Right Utility Cluster */}
        <View className="flex-row items-center gap-2.5">
          <View 
            style={{ backgroundColor: themeMode === 'dark' ? '#27272a' : '#f4f4f5' }}
            className="w-10 h-10 rounded-full items-center justify-center border border-purple-500/20"
          >
            <Setting size="22" color="#a855f7" variant="Bold" />
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

      <ThemedText className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6">
        Customize your application behavior, fine-tune notifications, toggle display settings, or read open source credentials.
      </ThemedText>

      {/* SECTION: PREFERENCES CARD */}
      <ThemedText className="text-[11px] uppercase font-bold tracking-widest text-zinc-400 mb-2.5 ml-1">
        Preferences
      </ThemedText>
      
      <View 
        style={{ backgroundColor: cardBgColor }} 
        className="rounded-2xl p-2 mb-6 border border-zinc-100 dark:border-zinc-800/60 shadow-sm"
      >
        {/* Dynamic Display Mode Row Selector */}
        <Pressable 
          onPress={toggleTheme}
          className="flex-row items-center justify-between p-3 active:opacity-60"
        >
          <View className="flex-row items-center gap-3">
            <View className="w-8 h-8 rounded-xl items-center justify-center bg-orange-500/10">
              {themeMode === 'dark' ? (
                <Sun1 size="18" color="#f97316" variant="Broken" />
              ) : (
                <Moon size="18" color="#f97316" variant="Broken" />
              )}
            </View>
            <ThemedText className="font-bold text-sm">Theme Appearance</ThemedText>
          </View>
          <View className="flex-row items-center gap-1.5">
            <ThemedText className="text-xs text-zinc-400 font-semibold capitalize">{themeMode} Mode</ThemedText>
            <ArrowRight2 size="14" color="#a1a1aa" />
          </View>
        </Pressable>

        <Divider className="h-px mx-3 bg-zinc-100 dark:bg-zinc-800/60" />

        {/* Notification Settings Row Toggle Trigger */}
        <Pressable 
          onPress={openNotificationSettings}
          className="flex-row items-center justify-between p-3 active:opacity-60"
        >
          <View className="flex-row items-center gap-3">
            <View className="w-8 h-8 rounded-xl items-center justify-center bg-blue-500/10">
              <Notification size="18" color="#3b82f6" variant="Broken" />
            </View>
            <View>
              <ThemedText className="font-bold text-sm">Notifications</ThemedText>
              <ThemedText className="text-[11px] text-zinc-400 mt-0.5">Toggle live alerts for new games</ThemedText>
            </View>
          </View>
          <ArrowRight2 size="14" color="#a1a1aa" />
        </Pressable>

        <Divider className="h-px mx-3 bg-zinc-100 dark:bg-zinc-800/60" />

        {/* Revisit Onboarding Integration Row */}
        <Pressable 
          onPress={() => router.push('/onboarding')}
          className="flex-row items-center justify-between p-3 active:opacity-60"
        >
          <View className="flex-row items-center gap-3">
            <View className="w-8 h-8 rounded-xl items-center justify-center bg-purple-500/10">
              <InfoCircle size="18" color="#a855f7" variant="Broken" />
            </View>
            <View>
              <ThemedText className="font-bold text-sm">App Introduction</ThemedText>
              <ThemedText className="text-[11px] text-zinc-400 mt-0.5">Revisit feature highlights and legal terms</ThemedText>
            </View>
          </View>
          <ArrowRight2 size="14" color="#a1a1aa" />
        </Pressable>
      </View>

      {/* SECTION: COMMUNITY & SUPPORT */}
      <ThemedText className="text-[11px] uppercase font-bold tracking-widest text-zinc-400 mb-2.5 ml-1">
        Community & Support
      </ThemedText>
      
      <View 
        style={{ backgroundColor: cardBgColor }} 
        className="rounded-2xl p-4 mb-6 border border-zinc-100 dark:border-zinc-800/60 shadow-sm"
      >
        <View className="flex-row items-center gap-2 mb-2">
          <Heart size="18" color="#ef4444" variant="Broken" />
          <ThemedText className="font-extrabold text-sm tracking-tight">
            Support Open Source Development
          </ThemedText>
        </View>
        
        <ThemedText className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed mb-4">
          This layout is independently engineered and hosted for free. If you find value in discovering these listings, giving us a star on GitHub goes a long way!
        </ThemedText>

        <Button
          onPress={() => Linking.openURL(APP_REPO_URL)}
          text="✨ Star Us on GitHub"
          type="primary"
        />
      </View>

      {/* SECTION: CREDENTIALS & SOURCE DATA SECTOR */}
      <ThemedText className="text-[11px] uppercase font-bold tracking-widest text-zinc-400 mb-2.5 ml-1">
        Data Providers
      </ThemedText>

      <View 
        style={{ backgroundColor: cardBgColor }} 
        className="rounded-2xl p-2 border border-zinc-100 dark:border-zinc-800/60 shadow-sm"
      >
        <Pressable 
          onPress={() => Linking.openURL(APP_URLS.GAME_POWER_URL)}
          className="flex-row items-center justify-between p-3 active:opacity-60"
        >
          <View className="flex-row items-center gap-3">
            <View className="w-8 h-8 rounded-xl items-center justify-center bg-purple-500/10">
              <Global size="18" color="#a855f7" variant="Broken" />
            </View>
            <View>
              <ThemedText className="font-bold text-sm">Gamepower Site</ThemedText>
              <ThemedText className="text-[11px] text-zinc-400 mt-0.5">Primary giveaways engine distributor</ThemedText>
            </View>
          </View>
          <ArrowRight2 size="14" color="#a1a1aa" />
        </Pressable>

        <Divider className="h-px mx-3 bg-zinc-100 dark:bg-zinc-800/60" />

        <Pressable 
          onPress={() => Linking.openURL(APP_URLS.FREE_TO_GAME_URL)}
          className="flex-row items-center justify-between p-3 active:opacity-60"
        >
          <View className="flex-row items-center gap-3">
            <View className="w-8 h-8 rounded-xl items-center justify-center bg-emerald-500/10">
              <Global size="18" color="#10b981" variant="Broken" />
            </View>
            <View>
              <ThemedText className="font-bold text-sm">FreeToGame API</ThemedText>
              <ThemedText className="text-[11px] text-zinc-400 mt-0.5">Free-to-play listings database architecture</ThemedText>
            </View>
          </View>
          <ArrowRight2 size="14" color="#a1a1aa" />
        </Pressable>
      </View>

      {/* Separator Footer Line and Info Details */}
      <View className="mt-8 mb-4 items-center justify-center">
        <Divider 
          style={{ backgroundColor: textColor }} 
          className="w-12 h-0.5 rounded-full opacity-10 mb-3" 
        />
        <ThemedText className="text-center font-bold text-[11px] uppercase tracking-widest text-zinc-400">
          Frapp Build v1.0.8
        </ThemedText>
      </View>
    </ScrollView>
  );
}