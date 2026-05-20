import Button from '@/components/custom/Button';
import FreeGiveawayItem from '@/components/custom/FreeGiveawayItem';
import GiveawaySkeleton from '@/components/custom/GiveawaySkeleton';
import { ThemedText } from '@/components/ThemedText';
import { API_ENDPOINTS } from '@/constants/api';
import { FreeGiveaway } from '@/types';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, View, Pressable, Image, Platform } from 'react-native';
import { Setting, Moon, Sun1 } from 'iconsax-react-nativejs'; 
import { useRouter } from 'expo-router';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';

export default function FreeScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [giveaways, setGiveaways] = useState<FreeGiveaway[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const { themeMode, toggleTheme } = useCustomTheme();

  // Unified color layout:
  // Light mode uses a sleek cool-grey (#f1f2f6) against pure white.
  // Dark mode uses a lighter slate-zinc layer (#2c2c35) to clearly float off pure dark backgrounds.
  const cardBgColor = themeMode === 'dark' ? '#2c2c35' : '#f1f2f6';

  // Tweaked border profiles to lock down the new light/dark frame depths perfectly
  const adaptiveBorderColor = themeMode === 'dark'
    ? 'rgba(255, 255, 255, 0.07)'
    : 'rgba(0, 0, 0, 0.07)';

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

        {/* Left Side: Fixed Asset Logo and Title */}
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

          {/* Integrated Montserrat Black for header cohesion */}
          <ThemedText className="text-xl font-montBlack tracking-tight">
            Free Games.
          </ThemedText>
        </View>

        {/* Right Side: Circular Utility Actions Group */}
        <View className="flex-row items-center gap-2.5">
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

      {/* Summary Section with exact matching lighter dark mode configurations */}
      {!isLoading && (
        <View
          style={[
            {
              backgroundColor: cardBgColor,
              borderWidth: 1,
              borderColor: adaptiveBorderColor,
            },
            Platform.select({
              ios: {
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: themeMode === 'dark' ? 4 : 8 },
                shadowOpacity: themeMode === 'dark' ? 0.35 : 0.10,
                shadowRadius: themeMode === 'dark' ? 10 : 16,
              },
              android: {
                elevation: themeMode === 'dark' ? 4 : 5,
              }
            })
          ]}
          className="rounded-2xl p-4 mb-6"
        >
          {/* Re-aligned typography stack using Montserrat helper weights */}
          <ThemedText className="font-mont text-sm leading-6 opacity-90">
            We discovered{' '}
            <ThemedText className="text-purple-500 font-montBlack">{giveaways.length}</ThemedText> fully free-to-play games available as of{' '}
            <ThemedText className="text-zinc-800 dark:text-zinc-200 font-montBold">
              {new Date().getDate()} {[
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ][new Date().getMonth()]} {new Date().getFullYear()}
            </ThemedText>. Tap any title to jump straight into the action!
          </ThemedText>
        </View>
      )}

      {/* List Layout Component Stack */}
      <GiveawaySkeleton loading={isLoading}>
        {giveaways
          .slice(0, currentPage * itemsPerPage)
          .map(giveaway => (
            <FreeGiveawayItem key={giveaway.id} giveaway={giveaway} />
          ))}
      </GiveawaySkeleton>

      {/* Paginated Footer Trigger */}
      {!isLoading && currentPage * itemsPerPage < giveaways.length && (
        <Button
          type="outline"
          onPress={loadMoreItems}
          className="mt-2 w-full font-montBold"
          text="Load More Games"
        />
      )}
    </ScrollView>
  );
}