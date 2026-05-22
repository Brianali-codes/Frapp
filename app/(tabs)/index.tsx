import Button from '@/components/custom/Button';
import GiveawayItem from '@/components/custom/GiveawayItem';
import { Setting, Moon, Sun1, WifiSquare } from 'iconsax-react-nativejs';
import GiveawaySkeleton from '@/components/custom/GiveawaySkeleton';
import { ThemedText } from '@/components/ThemedText';
import { API_ENDPOINTS } from '@/constants/api';
import { checkNotificationPermission } from '@/lib/notifications';
import { Giveaway } from '@/types';
import { useEffect, useState, useRef } from 'react';
import { ScrollView, View, Pressable, Image, Platform } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';

export default function GiveawayScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null); // Anchor point for automated viewport snapping
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [prices, setPrices] = useState(0);
  const [worth, setWorth] = useState(0);

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const { themeMode, toggleTheme } = useCustomTheme();

  const isDark = themeMode === 'dark';
  const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';
  const adaptiveBorderColor = isDark ? '#a3a3b5' : '#3c3c40';

  // Calculate dynamic chunk limits for precise 10-item extraction windows
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPagedGiveaways = giveaways.slice(startIndex, endIndex);

  const checkWorth = async () => {
    try {
      const worthResponse = await fetch(API_ENDPOINTS.Worth);
      if (!worthResponse.ok) throw new Error();
      const worthRes = await worthResponse.json();
      setPrices(worthRes.active_giveaways_number);
      setWorth(worthRes.worth_estimation_usd);
    } catch (error) {
      console.error("Couldn't fetch prices:", error);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const response = await fetch(API_ENDPOINTS.Giveaways);
      if (!response.ok) throw new Error('Server returned invalid status payload');

      const finalData: Giveaway[] = await response.json();
      setGiveaways(finalData);
      await checkWorth();
    } catch (error) {
      console.error('Error fetching data:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    checkNotificationPermission();
  }, []);

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
    scrollRef.current?.scrollTo({ y: 0, animated: true });
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
      ref={scrollRef}
      className='flex-1 px-4 pt-10 pb-2'
      style={{ backgroundColor }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* --- PREMIUM BRAND HEADER ROW --- */}
      <View className="flex-row items-center justify-between w-full mb-6">
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
            Free to Redeem.
          </ThemedText>
        </View>

        <View className="flex-row items-center gap-2.5">
          <Pressable
            onPress={() => router.push('/(tabs)/settings')}
            style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }}
            className="w-10 h-10 rounded-full items-center justify-center active:opacity-70 shadow-sm"
          >
            <Setting
              size="22"
              color={isDark ? '#f4f4f5' : '#3f3f46'}
              variant="Broken"
            />
          </Pressable>

          <Pressable
            onPress={toggleTheme}
            style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }}
            className="w-10 h-10 rounded-full items-center justify-center active:opacity-70 shadow-sm"
          >
            {isDark ? (
              <Sun1 size="22" color="#f4f4f5" variant="Broken" />
            ) : (
              <Moon size="22" color="#3f3f46" variant="Broken" />
            )}
          </Pressable>
        </View>
      </View>

      {/* Summary Section Container */}
      {!isLoading && !hasError && giveaways.length > 0 && (
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
                shadowOffset: { width: 0, height: isDark ? 4 : 8 },
                shadowOpacity: isDark ? 0.35 : 0.10,
                shadowRadius: isDark ? 10 : 16,
              },
              android: {
                elevation: isDark ? 4 : 5,
              }
            })
          ]}
          className="rounded-2xl p-4 mb-6"
        >
          <ThemedText className="font-mont text-sm leading-relaxed opacity-90">
            We have found{' '}
            <ThemedText style={{ color: '#22c55e' }} className="font-montBlack">{prices}</ThemedText> video game giveaways as of{' '}
            <ThemedText style={{ color: '#a855f7' }} className="font-montBlack">{day} {monthName} {year}</ThemedText>, with a total value of{' '}
            <ThemedText style={{ color: '#22c55e' }} className="font-montBlack">${worth}</ThemedText>. Claim them before time runs out!
          </ThemedText>
        </View>
      )}

      {/* Primary Context Layer: Error Architecture vs Data Mapping */}
      {hasError ? (
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
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: isDark ? 0.30 : 0.08,
                shadowRadius: 12,
              },
              android: {
                elevation: 4,
              }
            })
          ]}
          className="rounded-3xl p-6 items-center justify-center my-6"
        >
          <View className="w-16 h-16 rounded-2xl bg-purple-600/10 dark:bg-purple-500/10 items-center justify-center mb-4">
            <WifiSquare size="36" color="#9333ea" variant="Broken" />
          </View>

          <ThemedText className="font-montBlack text-lg text-center mb-2 tracking-tight">
            Connection Interrupted
          </ThemedText>

          <ThemedText className="font-mont text-zinc-500 dark:text-zinc-400 text-sm text-center leading-relaxed mb-6 px-4">
            We can't sync up with the servers right now. Make sure your device is online and let's try that again.
          </ThemedText>

          <Button
            type="primary"
            loading={isLoading}
            onPress={fetchData}
            className="w-full"
            text="Retry Connection"
          />
        </View>
      ) : isLoading ? (
        <GiveawaySkeleton loading={true}>
          <></>
        </GiveawaySkeleton>
      ) : (
        <View className="w-full">
          {currentPagedGiveaways.map(giveaway => (
            <GiveawayItem key={giveaway.id} giveaway={giveaway} />
          ))}
        </View>
      )}

      {/* Dual Action Pagination Footer Toolbar */}
      {!isLoading && !hasError && (
        <View className="flex-row items-center gap-3 mt-4 w-full">
          {currentPage > 1 && (
            <View className="flex-1 mb-24">
              <Button
                type="outline"
                onPress={handlePrevPage}
                className="w-full font-montBold"
                text="Previous"
              />
            </View>
          )}
          
          {endIndex < giveaways.length && (
            <View className="flex-1 mb-24">
              <Button
                type="outline"
                onPress={handleNextPage}
                className="w-full font-montBold"
                text="Next Games"
                
              />
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}