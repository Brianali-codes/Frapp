import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, View, Pressable, Platform, LayoutAnimation } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store'; // Swapped for SecureStore
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

export default function SavedItemsScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [savedGiveaways, setSavedGiveaways] = useState<FreeGiveaway[]>([]);
  const [layoutVariant, setLayoutVariant] = useState<'normal' | 'compact'>('compact');

  const backgroundColor = useThemeColor({}, 'background');
  const { themeMode, toggleTheme } = useCustomTheme();

  const isDark = themeMode === 'dark';
  const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';
  const adaptiveBorderColor = isDark ? '#3a3a45' : '#e4e4e7';

  // Load Saved giveaways from local storage on mount/focus
  const loadSavedItems = async () => {
    setIsLoading(true);
    try {
      // Swapped from AsyncStorage to SecureStore
      const stored = await SecureStore.getItemAsync('saved_giveaways');
      if (stored) {
        const parsed: FreeGiveaway[] = JSON.parse(stored);
        setSavedGiveaways(parsed);
      } else {
        setSavedGiveaways([]);
      }
    } catch (error) {
      console.error('Failed to load local saved items profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSavedItems();
  }, []);

  // Calculate the total worth of saved games
  const totalWorthSaved = savedGiveaways.reduce((accum, current) => {
    const valueStr = current.worth || current.normalPrice || '0';
    const parsedNum = parseFloat(valueStr.replace(/[^0-9.]/g, ''));
    return accum + (isNaN(parsedNum) ? 0 : parsedNum);
  }, 0).toFixed(2);

  const handleLayoutVariantToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setLayoutVariant(prev => prev === 'normal' ? 'compact' : 'normal');
  };

  const clearAllSaved = async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    try {
      // Swapped from AsyncStorage to SecureStore
      await SecureStore.deleteItemAsync('saved_giveaways');
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
              My Library
            </ThemedText>
          </View>

          {/* Symmetrical Header Action Controls Group */}
          <View className="flex-row items-center gap-2">
            {savedGiveaways.length > 0 && (
              <Pressable
                onPress={clearAllSaved}
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
              onPress={() => router.push('/(tabs)/settings')}
              style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }}
              className="w-9 h-9 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0"
            >
              <Setting
                size="18"
                color={isDark ? '#f4f4f5' : '#3f3f46'}
                variant="Broken"
              />
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
              You have pinned{' '}
              <ThemedText style={{ color: '#22c55e' }} className="font-montBlack">{savedGiveaways.length}</ThemedText> giveaways to claim, saving you a total of{' '}
              <ThemedText style={{ color: '#a855f7' }} className="font-montBlack">${totalWorthSaved}</ThemedText>! Make sure to claim them before they expire.
            </ThemedText>
          </View>
        )}

        {/* --- MAIN INTERACTIVE CONTAINER AREA --- */}
        {isLoading ? (
          <GiveawaySkeleton loading={true} variant={layoutVariant}>
            <></>
          </GiveawaySkeleton>
        ) : savedGiveaways.length === 0 ? (
          /* Empty State view matching App layout styling */
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
              Your Library is Empty
            </ThemedText>
            <ThemedText className="font-mont text-zinc-500 dark:text-zinc-400 text-sm text-center leading-relaxed mb-6 px-4">
              Explore ongoing free drops and tap the heart icon to save them here for easy claiming later!
            </ThemedText>
            <Button
              type="primary"
              onPress={() => router.push('/(tabs)')}
              className="w-full"
              text="Explore the App"
            />
          </View>
        ) : (
          /* Render list using your updated custom DealItem component */
          <View className="w-full mb-20">
            {savedGiveaways.map(giveaway => (
              <DealItem
                key={giveaway.id}
                giveaway={giveaway}
                variant={layoutVariant}
                ctaText="Claim Now"
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}