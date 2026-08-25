import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { 
  ScrollView, 
  View, 
  Pressable, 
  Platform, 
  LayoutAnimation, 
  UIManager, 
  Modal, 
  Image 
} from 'react-native';
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
import GiveawaySkeleton from '@/components/custom/GiveawaySkeleton';
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
  { id: 'all', key: 'deals.filters.all', label: 'All Saved', icon: ArchiveBook, iconUri: null },
  { id: '1', key: 'deals.stores.steam', label: 'Steam', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/0.png' },
  { id: '2', key: 'deals.stores.gamersgate', label: 'GamersGate', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/1.png' },
  { id: '3', key: 'deals.stores.gmg', label: 'GreenManGaming', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/2.png' },
  { id: '7', key: 'deals.stores.gog', label: 'GOG', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/6.png' },
  { id: '8', key: 'deals.stores.humble', label: 'Humble Store', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/7.png' },
  { id: '11', key: 'deals.stores.macgamestore', label: 'MacGamestore', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/10.png' },
  { id: '13', key: 'deals.stores.ubisoft', label: 'Ubisoft Store', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/12.png' },
  { id: '15', key: 'deals.stores.fanatical', label: 'Fanatical', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/14.png' },
  { id: '21', key: 'deals.stores.wingamestore', label: 'WinGameStore', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/20.png' },
  { id: '23', key: 'deals.stores.gamebillet', label: 'GameBillet', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/22.png' },
  { id: '24', key: 'deals.stores.voidu', label: 'Voidu', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/23.png' },
  { id: '25', key: 'deals.stores.epic', label: 'Epic Games Store', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/24.png' },
  { id: '27', key: 'deals.stores.gamesplanet', label: 'Gamesplanet', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/26.png' },
  { id: '28', key: 'deals.stores.gamesload', label: 'Gamesload', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/27.png' },
  { id: '29', key: 'deals.stores.2game', label: '2Game', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/28.png' },
  { id: '30', key: 'deals.stores.indiegala', label: 'IndieGala', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/29.png' },
  { id: '31', key: 'deals.stores.blizzard', label: 'Blizzard Shop', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/30.png' },
  { id: '32', key: 'deals.stores.allyouplay', label: 'AllYouPlay', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/31.png' },
  { id: '33', key: 'deals.stores.dlgamer', label: 'DLGamer', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/32.png' },
  { id: '34', key: 'deals.stores.noctre', label: 'Noctre', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/33.png' },
  { id: '35', key: 'deals.stores.dreamgame', label: 'DreamGame', icon: Shop, iconUri: 'https://www.cheapshark.com/img/stores/icons/34.png' },
];

export default function SavedItemsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const scrollRef = useRef<ScrollView>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [savedGiveaways, setSavedGiveaways] = useState<FreeGiveaway[]>([]);
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

  const parseEndDate = (giveaway: FreeGiveaway): Date | null => {
    const rawDate = giveaway.end_date || (giveaway as any).until || (giveaway as any).endDate;
    if (!rawDate || rawDate === 'N/A') return null;
    const parsed = new Date(rawDate);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const scheduleExpirationReminders = async (giveaways: FreeGiveaway[]) => {
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

        const gameTitle = item.title || (item as any).name || 'Your saved game';
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
            title: '⏰ Less than 24 Hours Left!',
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
        const parsed: FreeGiveaway[] = JSON.parse(stored);
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
      if (selectedFilter === 'free') {
        return item.worth === 'FREE' || item.salePrice === '0.00' || item.salePrice === '0';
      }
      if (selectedFilter === 'deals') {
        return item.worth !== 'FREE' && item.salePrice !== '0.00' && item.salePrice !== '0';
      }
      const platformStr = String(item.platform || item.storeID || '');
      return platformStr === selectedFilter;
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
    const updatedList = savedGiveaways.filter(item => item.id !== giveawayId);
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
                      <Image source={{ uri: filter.iconUri }} className="w-3.5 h-3.5 rounded-sm" resizeMode="contain" />
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
          <GiveawaySkeleton loading={true} variant={layoutVariant}>
            <></>
          </GiveawaySkeleton>
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
          <View className="w-full mb-20 gap-4">
            {filteredGiveaways.map((giveaway) => (
              <DealItem
                key={giveaway.id}
                giveaway={giveaway}
                variant={layoutVariant}
                ctaText={t('deals.claim', { defaultValue: 'Claim Now' })}
                isSaved={true}
                onToggleSave={() => handleToggleSave(giveaway.id)}
              />
            ))}
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