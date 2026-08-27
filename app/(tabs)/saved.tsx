import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { 
  ScrollView, 
  View, 
  Pressable, 
  Platform, 
  LayoutAnimation, 
  UIManager, 
  Modal 
} from 'react-native';
import { Image } from 'expo-image';
import { useRouter, useFocusEffect } from 'expo-router';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, { TriggerType, AndroidImportance } from '@notifee/react-native';
import { 
  Moon, 
  Sun1, 
  Heart, 
  Trash, 
  Element3, 
  RowVertical, 
  Shop, 
  ArchiveBook
} from 'iconsax-react-nativejs';

import DealItem from '@/components/custom/DealItem';
import GiveawayItem from '@/components/custom/GiveawayItem'; 
import Button from '@/components/custom/Button';
import { ThemedText } from '@/components/ThemedText';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';
import { FreeGiveaway } from '@/types';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const LAYOUT_STORAGE_KEY = '@saved_items_layout_variant';

const FILTER_OPTIONS = [
  { id: 'all', key: 'giveaways.platforms.all', label: 'All Saved', icon: ArchiveBook, iconUri: null },
  { id: 'pc', key: 'giveaways.platforms.pc', label: 'PC', icon: Shop, iconUri: 'https://www.svgrepo.com/show/382713/windows-applications.svg' },
  { id: 'steam', key: 'giveaways.platforms.steam', label: 'Steam', icon: Shop, iconUri: 'https://www.svgrepo.com/show/452107/steam.svg' },
  { id: 'epic-games-store', key: 'giveaways.platforms.epic', label: 'Epic', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/24.png' },
  { id: 'gog', key: 'giveaways.platforms.gog', label: 'GOG', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/6.png' },
  { id: 'ps4', key: 'giveaways.platforms.ps4', label: 'PS4', icon: Shop, iconUri: 'https://www.svgrepo.com/show/452087/playstation.svg' },
  { id: 'ps5', key: 'giveaways.platforms.ps5', label: 'PS5', icon: Shop, iconUri: 'https://www.svgrepo.com/show/452087/playstation.svg' },
  { id: 'xbox-series-xs', key: 'giveaways.platforms.xboxSeries', label: 'Xbox Series', icon: Shop, iconUri: 'https://www.svgrepo.com/show/303368/xbox-9-logo.svg' },
  { id: 'xbox-one', key: 'giveaways.platforms.xboxOne', label: 'Xbox One', icon: Shop, iconUri: 'https://www.svgrepo.com/show/452137/xbox.svg' },
  { id: 'switch', key: 'giveaways.platforms.switch', label: 'Switch', icon: Shop, iconUri: 'https://www.svgrepo.com/show/388137/nintendo-switch.svg' },
  { id: 'android', key: 'giveaways.platforms.android', label: 'Android', icon: Shop, iconUri: 'https://www.svgrepo.com/show/475427/android.svg' },
  { id: 'ios', key: 'giveaways.platforms.ios', label: 'iOS', icon: Shop, iconUri: 'https://www.svgrepo.com/show/494331/apple-round.svg' },
  { id: 'drm-free', key: 'giveaways.platforms.drmFree', label: 'DRM-Free', icon: Shop, iconUri: 'https://www.svgrepo.com/show/477064/unlock.svg' },
  { id: 'itchio', key: 'giveaways.platforms.itchio', label: 'itch.io', icon: Shop, iconUri: 'https://www.svgrepo.com/show/452232/itch-io.svg' },
];

function CardListSkeleton({ isDark, cardBgColor, adaptiveBorderColor, variant }: { isDark: boolean; cardBgColor: string; adaptiveBorderColor: string; variant: 'normal' | 'compact' }) {
  const shimmerBg = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
  const borderLine = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';
  const buttons = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
  const mockItems = [1, 2, 3, 4, 5];

  return (
    <View className="w-full">
      {mockItems.map((item) => (
        <View
          key={item}
          style={{
            borderWidth: 1,
            borderColor: adaptiveBorderColor,
            backgroundColor: cardBgColor,
          }}
          className="rounded-2xl overflow-hidden w-full mb-4 opacity-80"
        >
          {variant === 'normal' ? (
            <View>
              {/* Normal Card Top Image Skeleton */}
              <View style={{ height: 150, backgroundColor: shimmerBg }} className="w-full relative justify-between p-3">
                <View className="flex-row justify-between items-center w-full">
                  {/* Platform / Type Pill Skeleton */}
                  <View className="w-16 h-5 rounded-md" style={{ backgroundColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)' }} />
                  {/* Favorite Heart Button Skeleton */}
                  <View className="w-20 h-6 rounded-xl items-center justify-center" style={{ backgroundColor: isDark ? 'rgba(168, 85, 247, 0.25)' : 'rgba(168, 85, 247, 0.2)' }} />
                </View>
              </View>

              {/* Normal Card Details */}
              <View className="p-4">
                <View className="w-3/4 h-4.5 rounded-md mb-2" style={{ backgroundColor: shimmerBg }} />
                <View className="w-full h-3 rounded mb-1.5" style={{ backgroundColor: shimmerBg }} />
                <View className="w-1/2 h-3 rounded mb-3" style={{ backgroundColor: shimmerBg }} />

                {/* Bottom Row */}
                <View
                  style={{ borderTopWidth: 1, borderColor: borderLine }}
                  className="flex-row items-center justify-between pt-3 mt-1"
                >
                  <View className="flex-row gap-2">
                    <View className="w-24 h-6 rounded-md" style={{ backgroundColor: isDark ? 'rgba(168, 85, 247, 0.25)' : 'rgba(168, 85, 247, 0.2)' }} />
                    <View className="w-6 h-6 rounded-md" style={{ backgroundColor: isDark ? 'rgba(168, 85, 247, 0.25)' : 'rgba(168, 85, 247, 0.2)' }} />
                  </View>

                  <View className="flex-row gap-2">
                    <View className="w-6 h-6 rounded-md" style={{ backgroundColor: shimmerBg }} />
                    <View className="w-6 h-6 rounded-md" style={{ backgroundColor: shimmerBg }} />
                    <View className="w-6 h-6 rounded-md" style={{ backgroundColor: shimmerBg }} />
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View className="p-3 flex-row items-center">
              {/* Compact Thumbnail Image Skeleton */}
              <View
                style={{ width: 84, height: 84, backgroundColor: shimmerBg }}
                className="rounded-xl shrink-0 mr-3 relative justify-between p-1.5"
              >
                <View className="w-5 h-5 rounded-lg" style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)' }} />
                <View className="w-14 h-3 rounded-sm" style={{ backgroundColor: isDark ? 'rgba(168, 85, 247, 0.25)' : 'rgba(168, 85, 247, 0.2)' }} />
              </View>

              {/* Compact Card Content */}
              <View className="flex-1 justify-between h-20 py-0.5">
                <View>
                  {/* Title Skeleton */}
                  <View className="w-5/6 h-4 rounded mb-2" style={{ backgroundColor: shimmerBg }} />
                  {/* Subtitle / Platform Tag Skeleton */}
                  <View className="w-2/5 h-3 rounded-md" style={{ backgroundColor: shimmerBg }} />
                </View>

                {/* Bottom Row */}
                <View className="flex-row items-center justify-between mt-auto">
                  {/* Expiration / Keys left info */}
                  <View className="w-16 h-3 rounded" style={{ backgroundColor: shimmerBg }} />
                  <View className="flex-row items-center gap-2">
                    <View className="w-7 h-7 rounded-lg items-center justify-center" style={{ backgroundColor: buttons }} />
                    <View className="w-7 h-7 rounded-lg items-center justify-center" style={{ backgroundColor: buttons }} />
                    <View className="w-7 h-7 rounded-lg items-center justify-center" style={{ backgroundColor: buttons }} />
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

export default function SavedItemsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const scrollRef = useRef<ScrollView>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [savedGiveaways, setSavedGiveaways] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [layoutVariant, setLayoutVariant] = useState<'normal' | 'compact'>('compact');
  
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const backgroundColor = useThemeColor({}, 'background');
  const { themeMode, toggleTheme } = useCustomTheme();

  const isDark = themeMode === 'dark';
  const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';
  const modalOverlayColor = isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)';
  const adaptiveBorderColor = isDark ? '#3a3a45' : '#e4e4e7';

  // Load Layout Preference from AsyncStorage
  useEffect(() => {
    const loadStoredPreferences = async () => {
      try {
        const savedLayout = await AsyncStorage.getItem(LAYOUT_STORAGE_KEY);
        if (savedLayout === 'normal' || savedLayout === 'compact') {
          setLayoutVariant(savedLayout);
        }
      } catch (error) {
        console.error('Failed to load local storage configurations:', error);
      }
    };

    loadStoredPreferences();
  }, []);

  const parseEndDate = (giveaway: any): Date | null => {
    const rawDate = giveaway.end_date || giveaway.until || giveaway.endDate;
    if (!rawDate || rawDate === 'N/A') return null;
    const parsed = new Date(rawDate);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const scheduleExpirationReminders = async (giveaways: any[]) => {
    try {
      await notifee.requestPermission();
      const channelId = await notifee.createChannel({
        id: 'giveaway_reminders',
        name: 'Giveaway Reminders',
        importance: AndroidImportance.HIGH,
      });

      const trackedRaw = await AsyncStorage.getItem('scheduled_reminder_ids');
      const trackedIds: Record<string | number, boolean> = trackedRaw ? JSON.parse(trackedRaw) : {};

      const now = Date.now();
      const ONE_DAY_MS = 24 * 60 * 60 * 1000;

      for (const item of giveaways) {
        const endDate = parseEndDate(item);
        if (!endDate) continue;

        const expiryTimeMs = endDate.getTime();
        const timeRemaining = expiryTimeMs - now;

        if (timeRemaining <= 0 || trackedIds[item.id]) continue;

        const gameTitle = item.title || item.name || 'Your saved game';
        const notificationId = `giveaway_${item.id}`;
        const reminderTriggerTime = expiryTimeMs - ONE_DAY_MS;

        if (timeRemaining > ONE_DAY_MS) {
          await notifee.createTriggerNotification(
            {
              id: notificationId,
              title: '⏰ 1 Day Left to Redeem!',
              body: `Don't miss out! "${gameTitle}" giveaway expires tomorrow.`,
              android: { channelId, pressAction: { id: 'default' } },
              data: { giveawayId: String(item.id) },
            },
            { type: TriggerType.TIMESTAMP, timestamp: reminderTriggerTime }
          );
          trackedIds[item.id] = true;
        } else if (timeRemaining <= ONE_DAY_MS && timeRemaining > 0) {
          await notifee.displayNotification({
            id: notificationId,
            title: 'Less than 24 Hours Left!',
            body: `Hurry! "${gameTitle}" expires soon. Redeem it before it's gone!`,
            android: { channelId, pressAction: { id: 'default' } },
            data: { giveawayId: String(item.id) },
          });
          trackedIds[item.id] = true;
        }
      }

      await AsyncStorage.setItem('scheduled_reminder_ids', JSON.stringify(trackedIds));
    } catch (error) {
      console.error('Failed to schedule Notifee reminders:', error);
    }
  };

  const loadSavedItems = async () => {
    try {
      const stored = await AsyncStorage.getItem('saved_giveaways');
      if (stored) {
        const parsed: any[] = JSON.parse(stored);
        setSavedGiveaways(parsed);
        scheduleExpirationReminders(parsed);
      } else {
        setSavedGiveaways([]);
      }
    } catch (error) {
      console.error('Failed to load local saved items profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadSavedItems();
    }, [])
  );

  // Filtered Giveaways Calculation
  const filteredGiveaways = useMemo(() => {
    return savedGiveaways.filter((item) => {
      if (selectedFilter === 'all') return true;
      const platformStr = String(item.platform || item.platforms || item.storeID || '').toLowerCase();
      return platformStr.includes(selectedFilter.toLowerCase()) || String(item.storeID) === selectedFilter;
    });
  }, [savedGiveaways, selectedFilter]);

  const handleLayoutVariantToggle = async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const nextVariant: 'compact' | 'normal' = layoutVariant === 'normal' ? 'compact' : 'normal';
    setLayoutVariant(nextVariant);

    try {
      await AsyncStorage.setItem(LAYOUT_STORAGE_KEY, nextVariant);
    } catch (error) {
      console.error('Failed to persist layout variant preference:', error);
    }
  };

  const handleToggleSave = async (giveawayId: string | number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const updatedList = savedGiveaways.filter(item => (item.id || item.dealID) !== giveawayId);
    setSavedGiveaways(updatedList);

    try {
      await AsyncStorage.setItem('saved_giveaways', JSON.stringify(updatedList));
      const notificationId = `giveaway_${giveawayId}`;
      await notifee.cancelNotification(notificationId);
    } catch (error) {
      console.error('Error updating saved list in AsyncStorage:', error);
    }
  };

  const clearAllSaved = async () => {
    setShowClearConfirm(false);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    try {
      await AsyncStorage.removeItem('saved_giveaways');
      await AsyncStorage.removeItem('scheduled_reminder_ids');
      await notifee.cancelAllNotifications();
      await notifee.cancelTriggerNotifications();
      setSavedGiveaways([]);
    } catch (error) {
      console.error('Error wiping saved list:', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <ScrollView
        ref={scrollRef}
        className="flex-1 px-4 pt-10"
        style={{ backgroundColor }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* --- HEADER ROW --- */}
        <View className="flex-row items-center justify-between w-full mb-4">
          <View className="flex-row items-center gap-2.5 flex-1 mr-2">
            <View
              style={{ backgroundColor: '#9333ea' }}
              className="w-9 h-9 rounded-xl items-center justify-center shadow-sm shrink-0"
            >
              <Heart size="18" color="#ffffff" variant="Bold" />
            </View>

            <ThemedText numberOfLines={1} className="text-xl font-montBlack tracking-tight flex-shrink">
              {t('preferences.savedGiveaways', { defaultValue: 'My Library.' })}
            </ThemedText>
          </View>

          <View className="flex-row items-center gap-2">
            {savedGiveaways.length > 0 && (
              <Pressable
                onPress={() => setShowClearConfirm(true)}
                style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }}
                className="w-9 h-9 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0"
              >
                <Trash size="18" color="#ef4444" variant="Broken" />
              </Pressable>
            )}

            <Pressable
              onPress={handleLayoutVariantToggle}
              style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }}
              className="w-9 h-9 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0"
            >
              {layoutVariant === 'normal' ? (
                <Element3 size="18" color="#9333ea" variant="Broken" />
              ) : (
                <RowVertical size="18" color="#9333ea" variant="Broken" />
              )}
            </Pressable>

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

        {/* --- LIBRARY FILTER CHIPS BAR --- */}
        {!isLoading && savedGiveaways.length > 0 && (
          <View className="w-full mb-4">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="-mx-4 py-1"
              style={{ height: 46 }}
              contentContainerStyle={{ alignItems: 'center', gap: 8, paddingHorizontal: 16 }}
            >
              {FILTER_OPTIONS.map((filter) => {
                const isSelected = selectedFilter === filter.id;
                const IconComponent = filter.icon;
                return (
                  <Pressable
                    key={filter.id}
                    onPress={() => setSelectedFilter(filter.id)}
                    style={{
                      backgroundColor: isSelected ? '#9333ea' : (isDark ? '#27272a' : '#f4f4f5'),
                      borderWidth: 1,
                      borderColor: isSelected ? '#9333ea' : (isDark ? '#3c3c3a' : '#e4e4e7'),
                      height: 34,
                    }}
                    className="px-3 rounded-full flex-row items-center gap-1.5 shadow-sm"
                  >
                    {filter.iconUri ? (
                      <Image source={{ uri: filter.iconUri }} style={{ width: 14, height: 14 }} contentFit="contain" />
                    ) : (
                      <IconComponent size="13" color={isSelected ? '#ffffff' : (isDark ? '#a3a3b5' : '#71717a')} variant="Bold" />
                    )}
                    <ThemedText
                      style={{ color: isSelected ? '#ffffff' : (isDark ? '#a3a3b5' : '#71717a') }}
                      className={`text-[11px] ${isSelected ? 'font-montBlack' : 'font-montBold'}`}
                    >
                      {t(filter.key, filter.label)}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* --- MAIN GAMES CONTAINER --- */}
        {isLoading ? (
          <CardListSkeleton
            variant={layoutVariant}
            cardBgColor={cardBgColor}
            adaptiveBorderColor={adaptiveBorderColor}
            isDark={isDark}
          />
        ) : filteredGiveaways.length === 0 ? (
          <View
            style={[
              { backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor },
              Platform.select({
                ios: { shadowColor: '#000000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: isDark ? 0.30 : 0.08, shadowRadius: 12 },
                android: { elevation: 4 }
              })
            ]}
            className="rounded-3xl p-6 items-center justify-center my-6"
          >
            <View className="w-16 h-16 rounded-2xl bg-purple-600/10 dark:bg-purple-500/10 items-center justify-center mb-4">
              <Heart size="36" color="#9333ea" variant="Broken" />
            </View>
            <ThemedText className="font-montBlack text-lg text-center mb-2 tracking-tight">
              {t('giveaways.empty.title', { defaultValue: savedGiveaways.length === 0 ? 'Your Library is Empty' : 'No Items Found' })}
            </ThemedText>
            <ThemedText className="font-mont text-zinc-500 dark:text-zinc-400 text-sm text-center leading-relaxed mb-6 px-4">
              {t('giveaways.empty.description', { defaultValue: savedGiveaways.length === 0 ? 'Explore ongoing free drops and tap the heart icon to save them here for easy claiming later!' : 'No pinned items match this specific category filter.' })}
            </ThemedText>
            <Button
              type="primary"
              onPress={() => {
                if (savedGiveaways.length === 0) {
                  router.push('/(tabs)');
                } else {
                  setSelectedFilter('all');
                }
              }}
              className="w-full"
              text={t('giveaways1.empty.viewAllButton', { defaultValue: savedGiveaways.length === 0 ? 'Explore the App' : 'Reset Filter' })}
            />
          </View>
        ) : (
          <View className="w-full mb-20 gap-1">
            {filteredGiveaways.map((item) => {
              // Differentiate between CheapShark Deal vs GamerPower Giveaway
              const isDeal = Boolean(item.dealID || item.savings || (item.storeID && item.normalPrice && item.storeID !== '0'));
              const itemId = item.id || item.dealID;

              if (isDeal) {
                return (
                  <DealItem
                    key={itemId}
                    deal={item}
                    giveaway={item}
                    variant={layoutVariant}
                    ctaText={t('deals.get_deal', { defaultValue: 'Get Deal' })}
                    isSaved={true}
                    onToggleSave={() => handleToggleSave(itemId)}
                  />
                );
              }

              return (
                <GiveawayItem
                  key={itemId}
                  giveaway={item}
                  variant={layoutVariant}
                  ctaText={t('deals.claim', { defaultValue: 'Claim Now' })}
                  isSaved={true}
                  onToggleSave={() => handleToggleSave(itemId)}
                />
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* --- THEMED DELETE CONFIRMATION MODAL --- */}
      <Modal
        visible={showClearConfirm}
        transparent={true}
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setShowClearConfirm(false)}
      >
        <View 
          style={{ backgroundColor: modalOverlayColor }} 
          className="flex-1 justify-center items-center px-6"
        >
          <View
            style={[
              { backgroundColor: isDark ? '#1e1e24' : '#ffffff', borderWidth: 1, borderColor: adaptiveBorderColor },
              Platform.select({
                ios: { shadowColor: '#000000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 15 },
                android: { elevation: 10 }
              })
            ]}
            className="w-full rounded-3xl p-6 max-w-sm overflow-hidden"
          >
            <View className="items-center justify-center mb-4">
              <View className="w-14 h-14 rounded-2xl bg-red-500/10 items-center justify-center">
                <Trash size="28" color="#ef4444" variant="Broken" />
              </View>
            </View>

            <ThemedText className="font-montBlack text-lg text-center mb-2 tracking-tight">
              {t('giveaways1.delete.title', { defaultValue: 'Clear Saved Library?' })}
            </ThemedText>
            
            <ThemedText className="font-mont text-zinc-500 dark:text-zinc-400 text-[13px] text-center leading-relaxed mb-6 px-2">
              {t('giveaways1.delete.description', { defaultValue: "This action will permanently remove all pinned giveaways from your saved list. You'll need to explore and re-add them manually." })}
            </ThemedText>

            <View className="flex-row gap-3">
              <Pressable
                onPress={() => setShowClearConfirm(false)}
                style={{ backgroundColor: isDark ? '#2c2c35' : '#f1f2f6' }}
                className="flex-1 h-11 rounded-full items-center justify-center active:opacity-75"
              >
                <ThemedText className="font-montBold text-xs uppercase tracking-wider">
                  {t('updateModal.later', { defaultValue: 'Cancel' })}
                </ThemedText>
              </Pressable>

              <Pressable
                onPress={clearAllSaved}
                style={{ backgroundColor: '#ef4444' }}
                className="flex-1 h-11 rounded-full items-center justify-center active:opacity-90 shadow-md shadow-red-500/20"
              >
                <ThemedText className="text-white font-montBlack text-xs uppercase tracking-wider">
                  {t('giveaways1.delete.confirmButton', { defaultValue: 'Wipe All' })}
                </ThemedText>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}