import React, { useState, useRef, useCallback } from 'react';
import { ScrollView, View, Pressable, Platform, LayoutAnimation, UIManager, Modal } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee, { TriggerType, AndroidImportance } from '@notifee/react-native';
import { 
  Setting, 
  Moon, 
  Sun1, 
  Heart, 
  Trash, 
  Element3, 
  RowVertical
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

export default function SavedItemsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const scrollRef = useRef<ScrollView>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [savedGiveaways, setSavedGiveaways] = useState<FreeGiveaway[]>([]);
  const [layoutVariant, setLayoutVariant] = useState<'normal' | 'compact'>('compact');
  
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const backgroundColor = useThemeColor({}, 'background');
  const { themeMode, toggleTheme } = useCustomTheme();

  const isDark = themeMode === 'dark';
  const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';
  const modalOverlayColor = isDark ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)';
  const adaptiveBorderColor = isDark ? '#3a3a45' : '#e4e4e7';

  // Helper to safely extract and parse end dates
  const parseEndDate = (giveaway: FreeGiveaway): Date | null => {
    const rawDate = giveaway.end_date || (giveaway as any).until || (giveaway as any).endDate;
    if (!rawDate || rawDate === 'N/A') return null;
    const parsed = new Date(rawDate);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  // Check and schedule 1-day reminders using Notifee
  const scheduleExpirationReminders = async (giveaways: FreeGiveaway[]) => {
    try {
      // 1. Request notification permissions
      await notifee.requestPermission();

      // 2. Create high-priority notification channel for Android
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

        // Skip if already expired or already scheduled
        if (timeRemaining <= 0 || trackedIds[item.id]) continue;

        const gameTitle = item.title || (item as any).name || 'Your saved game';
        const notificationId = `giveaway_${item.id}`;
        const reminderTriggerTime = expiryTimeMs - ONE_DAY_MS;

        // Case A: Expiry is > 24 hours away -> Schedule trigger for 24h before expiry
        if (timeRemaining > ONE_DAY_MS) {
          await notifee.createTriggerNotification(
            {
              id: notificationId,
              title: '⏰ 1 Day Left to Redeem!',
              body: `Don't miss out! "${gameTitle}" giveaway expires tomorrow.`,
              android: {
                channelId,
                pressAction: { id: 'default' },
              },
              data: { giveawayId: String(item.id) },
            },
            {
              type: TriggerType.TIMESTAMP,
              timestamp: reminderTriggerTime,
            }
          );
          trackedIds[item.id] = true;
        } 
        // Case B: Expiry is within 24 hours RIGHT NOW -> Display immediately
        else if (timeRemaining <= ONE_DAY_MS && timeRemaining > 0) {
          await notifee.displayNotification({
            id: notificationId,
            title: '⏰ Less than 24 Hours Left!',
            body: `Hurry! "${gameTitle}" expires soon. Redeem it before it's gone!`,
            android: {
              channelId,
              pressAction: { id: 'default' },
            },
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

  // Load Saved giveaways from local storage
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

  // Calculate total worth
  const totalWorthSaved = savedGiveaways.reduce((accum, current) => {
    const valueStr = current.worth || current.normalPrice || '0';
    const parsedNum = parseFloat(valueStr.replace(/[^0-9.]/g, ''));
    return accum + (isNaN(parsedNum) ? 0 : parsedNum);
  }, 0).toFixed(2);

  const handleLayoutVariantToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setLayoutVariant(prev => prev === 'normal' ? 'compact' : 'normal');
  };

  // Remove Notifee notification when un-saving single item
  const handleToggleSave = async (giveawayId: string | number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSavedGiveaways(prev => prev.filter(item => item.id !== giveawayId));

    try {
      const notificationId = `giveaway_${giveawayId}`;
      await notifee.cancelNotification(notificationId);

      const trackedRaw = await AsyncStorage.getItem('scheduled_reminder_ids');
      if (trackedRaw) {
        const trackedIds: Record<string | number, boolean> = JSON.parse(trackedRaw);
        if (trackedIds[giveawayId]) {
          delete trackedIds[giveawayId];
          await AsyncStorage.setItem('scheduled_reminder_ids', JSON.stringify(trackedIds));
        }
      }
    } catch (error) {
      console.error('Error cancelling Notifee notification:', error);
    }
  };

  // Clear all Notifee notifications when wiping list
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
        <View className="flex-row items-center justify-between w-full mb-6">
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

        {/* --- WORTH ESTIMATION CONTAINER --- */}
        {!isLoading && savedGiveaways.length > 0 && (
          <View
            style={[
              { backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor },
              Platform.select({
                ios: { shadowColor: '#000000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
                android: { elevation: 2 }
              })
            ]}
            className="rounded-2xl p-4 mb-5"
          >
            <ThemedText className="font-mont text-xs leading-relaxed opacity-90">
              {t('giveaways1.summary.prefix', { defaultValue: 'We found ' })}
              <ThemedText style={{ color: '#22c55e' }} className="font-montBlack">{savedGiveaways.length}</ThemedText>
              {t('giveaways1.summary.midActive', { defaultValue: ' active video game giveaways as of ' })}
              {t('giveaways1.summary.midWorth', { defaultValue: ', carrying a combined structural value of ' })}
              <ThemedText style={{ color: '#a855f7' }} className="font-montBlack">${totalWorthSaved}</ThemedText>
              {t('giveaways1.summary.suffix', { defaultValue: '. Claim yours before the countdown matrix expires!' })}
            </ThemedText>
          </View>
        )}

        {/* --- MAIN INTERACTIVE CONTAINER AREA --- */}
        {isLoading ? (
          <GiveawaySkeleton loading={true} variant={layoutVariant}>
            <></>
          </GiveawaySkeleton>
        ) : savedGiveaways.length === 0 ? (
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
              {t('giveaways.empty.title', { defaultValue: 'Your Library is Empty' })}
            </ThemedText>
            <ThemedText className="font-mont text-zinc-500 dark:text-zinc-400 text-sm text-center leading-relaxed mb-6 px-4">
              {t('giveaways.empty.description', { defaultValue: 'Explore ongoing free drops and tap the heart icon to save them here for easy claiming later!' })}
            </ThemedText>
            <Button
              type="primary"
              onPress={() => router.push('/(tabs)')}
              className="w-full"
              text={t('giveaways1.empty.viewAllButton', { defaultValue: 'Explore the App' })}
            />
          </View>
        ) : (
          <View className="w-full mb-20">
            {savedGiveaways.map(giveaway => (
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