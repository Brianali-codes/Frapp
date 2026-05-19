import Button from '@/components/custom/Button';
import FreeGiveawayItem from '@/components/custom/FreeGiveawayItem';
import GiveawaySkeleton from '@/components/custom/GiveawaySkeleton';
import { ThemedText } from '@/components/ThemedText';
import { API_ENDPOINTS } from '@/constants/api';
import { FreeGiveaway } from '@/types';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, View, Pressable } from 'react-native';
import { Setting, Moon, Sun, Sun1 } from 'iconsax-react-nativejs'; // Icons for the utility cluster
import { useRouter } from 'expo-router';

// 1. IMPORT YOUR CUSTOM THEME HOOKS
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';

export default function FreeScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [giveaways, setGiveaways] = useState<FreeGiveaway[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 2. FETCH THE DYNAMIC COLORS
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const { themeMode, toggleTheme } = useCustomTheme();

  const fetchData = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.Games);
      const finalData: FreeGiveaway[] = await response.json();
      setGiveaways(finalData);
      setIsLoading(false);

      if (finalData.length > 0) {
        Alert.alert('Game Available', `A game has been fetched from the API: ${finalData[0].title}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
      Alert.alert('Unable to fetch games. Check your connection or relaunch the app.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const loadMoreItems = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <ScrollView
      className='flex-1 px-4 pt-10 pb-2'
      style={{ backgroundColor }}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* --- MATCHING BRAND HEADER ROW --- */}
      <View className="flex-row items-center justify-between w-full mb-6">

        {/* Left Side: Brand Logo and Title */}
        <View className="flex-row items-center gap-3">
          {/* Logo Brand Box */}
          <View className="w-10 h-10 bg-purple-600 rounded-xl items-center justify-center shadow-md">
            <ThemedText className="text-white font-black text-lg">▲</ThemedText>
          </View>

          <ThemedText className="text-xl font-extrabold tracking-tight">
            Free to redeem<ThemedText className="text-purple-500 font-extrabold text-xl"></ThemedText>
          </ThemedText>
        </View>

        {/* Right Side: Circular Utility Actions Group */}
        <View className="flex-row items-center gap-2.5">

          {/* Settings Nav Trigger */}
          <Pressable
            onPress={() => router.push('/(tabs)/settings')}
            style={{ backgroundColor: themeMode === 'dark' ? '#27272a' : '#f4f4f5' }}
            className="w-10 h-10 rounded-full items-center justify-center active:opacity-70 shadow-sm"
          >
            <Setting
              size="22"
              color={themeMode === 'dark' ? '#f4f4f5' : '#3f3f46'}
              variant="Broken"
            />
          </Pressable>

          {/* Theme State Switcher Trigger */}
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
      {/* --- END OF BRAND HEADER ROW --- */}

      {/* Summary Section */}
      {/* Summary Section for Free to Play Games */}
      {!isLoading && (
        <View
          style={{ backgroundColor: useThemeColor({}, 'background') }}
          className="rounded-xl p-4 mb-4 border border-zinc-100 dark:border-zinc-800/50 shadow-sm"
        >
          <ThemedText className="font-medium text-sm leading-6 opacity-90">
            We discovered{' '}
            <ThemedText className="text-purple-500 font-extrabold">{giveaways.length}</ThemedText> fully free-to-play games available as of{' '}
            <ThemedText className="text-zinc-500 dark:text-zinc-400 font-bold">
              {new Date().getDate()} {[
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ][new Date().getMonth()]} {new Date().getFullYear()}
            </ThemedText>. Tap any title to jump straight into the action!
          </ThemedText>
        </View>
      )}
      <GiveawaySkeleton loading={isLoading}>
        {giveaways
          .slice(0, currentPage * itemsPerPage)
          .map(giveaway => (
            <FreeGiveawayItem key={giveaway.id} giveaway={giveaway} />
          ))}
      </GiveawaySkeleton>

      {!isLoading && currentPage * itemsPerPage < giveaways.length && (
        <Button
          type="outline"
          onPress={loadMoreItems}
          className="mt-2 w-full"
          text="Load More Games"
        />
      )}
    </ScrollView>
  );
}