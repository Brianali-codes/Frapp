import Button from '@/components/custom/Button';
import GiveawayItem from '@/components/custom/GiveawayItem';
import { Setting, Moon, Sun1 } from 'iconsax-react-nativejs';
import GiveawaySkeleton from '@/components/custom/GiveawaySkeleton';
import { ThemedText } from '@/components/ThemedText';
import { API_ENDPOINTS } from '@/constants/api';
import { checkNotificationPermission } from '@/lib/notifications';
import { Giveaway } from '@/types';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, View, Pressable, Image, Platform } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';

export default function GiveawayScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [prices, setPrices] = useState(0);
  const [worth, setWorth] = useState(0);

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
      className='flex-1 px-4 pt-10 pb-2 mb-20'
      style={{ backgroundColor }}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      {/* --- PREMIUM BRAND HEADER ROW --- */}
      <View className="flex-row items-center justify-between w-full mb-6">

        {/* Left Side: Brand Logo with Asset Image and Title */}
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

          {/* Integrated Montserrat Black for a solid clean geometric header */}
          <ThemedText className="text-xl font-montBlack tracking-tight">
            Free to Redeem.
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

      {/* Summary Section with dynamic Montserrat mappings */}
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
          <ThemedText className="font-mont text-sm leading-relaxed opacity-90">
            We have found{' '}
            <ThemedText className="text-green-500 font-montBlack">{prices}</ThemedText> video game giveaways as of{' '}
            <ThemedText className="text-purple-500 font-montBold">{day} {monthName} {year}</ThemedText>, with a total value of{' '}
            <ThemedText className="text-green-500 font-montBlack">${worth}</ThemedText>. Claim them before time runs out!
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
          className="mt-2 w-full font-montBold" // Added font class support reference
          text="Load More Giveaways"
        />
      )}
    </ScrollView>
  );
}