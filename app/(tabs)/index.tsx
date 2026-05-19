import Button from '@/components/custom/Button';
import GiveawayItem from '@/components/custom/GiveawayItem';
import { Setting, Moon, Sun1 } from 'iconsax-react-nativejs';
import GiveawaySkeleton from '@/components/custom/GiveawaySkeleton';
import { ThemedText } from '@/components/ThemedText';
import { API_ENDPOINTS } from '@/constants/api';
import { checkNotificationPermission } from '@/lib/notifications';
import { Giveaway } from '@/types';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, View, Pressable } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router'; // Used to route to your settings screen

export default function GiveawayScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [prices, setPrices] = useState(0);
  const [worth, setWorth] = useState(0);

  const backgroundColor = useThemeColor({}, 'background');
  const cardColor = useThemeColor({}, 'background'); // Used for button circle backgrounds
  const textColor = useThemeColor({}, 'text');

  const { themeMode, toggleTheme } = useCustomTheme();

  const checkWorth = async () => {
    try {
      const worthResponse = await fetch(API_ENDPOINTS.Worth);
      const worthRes = await worthResponse.json();
      setPrices(worthRes.active_giveaways_number);
      setWorth(worthRes.worth_estimation_usd);
    } catch {
      Alert.alert("Couldn't fetch prices");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.Giveaways);
      const finalData: Giveaway[] = await response.json();
      setGiveaways(finalData);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      Alert.alert('Unable to fetch giveaways. Check your connection or relaunch the app.');
    }
  };

  useEffect(() => {
    fetchData();
    checkNotificationPermission();
    checkWorth();
  }, []);

  const loadMoreItems = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const now = new Date();
  const day = now.getDate();
  const year = now.getFullYear();
  const monthName = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ][now.getMonth()];

  return (
    <ScrollView
      className='flex-1 px-4 pt-14 pb-2'
      style={{ backgroundColor }}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      {/* --- PREMIUM BRAND HEADER ROW (Matches Screenshot Layout) --- */}
      <View className="flex-row items-center justify-between w-full mb-6">

        {/* Left Side: Brand Logo and Title */}
        <View className="flex-row items-center gap-3">
          {/* Logo Brand Box Placeholder */}
          <View className="w-10 h-10 bg-purple-600 rounded-xl items-center justify-center shadow-md">
            {/* REPLACE THIS TEXT WITH YOUR LOGO SVG OR ICON */}
            <ThemedText className="text-white font-black text-lg">▲</ThemedText>
          </View>

          <ThemedText className="text-xl font-extrabold tracking-tight">
            Frapp<ThemedText className="text-purple-500 font-extrabold text-xl"></ThemedText>
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

          {/* Theme State Switcher Trigger */}
          <Pressable
            onPress={toggleTheme}
            style={{ backgroundColor: themeMode === 'dark' ? '#27272a' : '#f4f4f5' }}
            className="w-10 h-10 rounded-full items-center justify-center active:opacity-70 shadow-sm"
          >
            {themeMode === 'dark' ? (
              <Sun1
                size="22"
                color="#f4f4f5" // Clean off-white for Dark Mode
                variant="Broken"
              />
            ) : (
              <Moon
                size="22"
                color="#3f3f46" // Deep zinc/slate gray for Light Mode
                variant="Broken"
              />
            )}
          </Pressable>

        </View>
      </View>
      {/* --- END OF BRAND HEADER ROW --- */}

      <ThemedText className="text-2xl font-black text-left mb-2 tracking-tight">
        🎮 Free to Redeem
      </ThemedText>

      {/* Summary Section */}
      {!isLoading && (
        <View style={{ backgroundColor: cardColor }} className="rounded-xl p-4 mb-4 border border-zinc-100 dark:border-zinc-800/50 shadow-sm">
          <ThemedText className="font-medium text-sm leading-6 opacity-90">
            We have found{' '}
            <ThemedText className="text-green-500 font-extrabold">${prices}</ThemedText> video game giveaways as of{' '}
            <ThemedText className="text-purple-500 font-bold">{day} {monthName} {year}</ThemedText>, with a total value of{' '}
            <ThemedText className="text-green-500 font-extrabold">${worth}</ThemedText>. Claim them before time runs out!
          </ThemedText>
        </View>
      )}

      {/* Skeleton / Giveaways List */}
      <GiveawaySkeleton loading={isLoading}>
        {giveaways
          .slice(0, currentPage * itemsPerPage)
          .map(giveaway => (
            <GiveawayItem key={giveaway.id} giveaway={giveaway} />
          ))}
      </GiveawaySkeleton>

      {/* Load More */}
      {!isLoading && currentPage * itemsPerPage < giveaways.length && (
        <Button
          type="outline"
          onPress={loadMoreItems}
          className="mt-2 w-full"
          text="Load More Giveaways"
        />
      )}
    </ScrollView>
  );
}