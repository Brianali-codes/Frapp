import Button from '@/components/custom/Button';
import GiveawayItem from '@/components/custom/GiveawayItem';
import { Setting, Moon, Sun1, WifiSquare, Filter, RowVertical, Element3 } from 'iconsax-react-nativejs';
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

const PLATFORMS = [
  { id: 'all', label: 'All' },
  { id: 'pc', label: 'PC' },
  { id: 'steam', label: 'Steam' },
  { id: 'epic-games-store', label: 'Epic' },
  { id: 'gog', label: 'GOG' },
  { id: 'ps4', label: 'PS' },
];

export default function GiveawayScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [prices, setPrices] = useState(0);
  const [worth, setWorth] = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [layoutVariant, setLayoutVariant] = useState<'normal' | 'compact'>('normal');

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const { themeMode, toggleTheme } = useCustomTheme();

  const isDark = themeMode === 'dark';
  const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';
  const adaptiveBorderColor = isDark ? '#3a3a45' : '#e4e4e7';

  // Glassmorphism specs for the floating element
  const glassBgColor = isDark ? 'rgba(44, 44, 53, 0.75)' : 'rgba(255, 255, 255, 0.75)';
  const glassBorderColor = isDark ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.08)';

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

  const fetchData = async (platform: string = 'all') => {
    setIsLoading(true);
    setHasError(false);
    try {
      const url = platform === 'all' 
        ? API_ENDPOINTS.Giveaways 
        : `${API_ENDPOINTS.Giveaways}?platform=${platform}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Server returned invalid status payload');

      const finalData: Giveaway[] = await response.json();
      setGiveaways(Array.isArray(finalData) ? finalData : []);
      await checkWorth();
    } catch (error) {
      console.error('Error fetching data:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedPlatform);
  }, [selectedPlatform]);

  const handlePlatformChange = (platformId: string) => {
    setCurrentPage(1);
    setSelectedPlatform(platformId);
  };

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
    <View style={{ flex: 1, backgroundColor }}>
      <ScrollView
        ref={scrollRef}
        className='flex-1 px-4 pt-10 pb-2'
        style={{ backgroundColor }}
        contentContainerStyle={{ paddingBottom: 100 }} // Extra pad prevents layout clipping behind the FAB
        showsVerticalScrollIndicator={false}
      >
        {/* --- PREMIUM BRAND HEADER ROW --- */}
        <View className="flex-row items-center justify-between w-full mb-6">
          <View className="flex-row items-center gap-3 flex-1 mr-2">
            <View
              style={{ backgroundColor: '#9333ea' }}
              className="w-10 h-10 rounded-xl overflow-hidden items-center justify-center shadow-md shrink-0"
            >
              <Image
                source={require('../../assets/images/FRAPP_ICON1.png')}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>

            <ThemedText numberOfLines={1} className="text-xl font-montBlack tracking-tight flex-shrink">
              Free to Redeem.
            </ThemedText>
          </View>

          {/* Header Action Buttons Panel */}
          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={() => setShowFilterBar(prev => !prev)}
              style={{ 
                backgroundColor: showFilterBar 
                  ? '#9333ea' 
                  : (isDark ? '#27272a' : '#f4f4f5') 
              }}
              className="w-10 h-10 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0"
            >
              <Filter
                size="20"
                color={showFilterBar ? '#ffffff' : (isDark ? '#f4f4f5' : '#3f3f46')}
                variant="Broken"
              />
            </Pressable>

            <Pressable
              onPress={() => router.push('/(tabs)/settings')}
              style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }}
              className="w-10 h-10 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0"
            >
              <Setting
                size="20"
                color={isDark ? '#f4f4f5' : '#3f3f46'}
                variant="Broken"
              />
            </Pressable>

            <Pressable
              onPress={toggleTheme}
              style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }}
              className="w-10 h-10 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0"
            >
              {isDark ? (
                <Sun1 size="20" color="#f4f4f5" variant="Broken" />
              ) : (
                <Moon size="20" color="#3f3f46" variant="Broken" />
              )}
            </Pressable>
          </View>
        </View>

        {/* --- CONDITIONAL SCROLLFILTER SECTION --- */}
        {showFilterBar && (
          <View className="w-full mb-5">
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              className="py-1"
              style={{ height: 50 }}
              contentContainerStyle={{ 
                alignItems: 'center', 
                gap: 8, 
                paddingHorizontal: 2 
              }}
            >
              {PLATFORMS.map((platform) => {
                const isSelected = selectedPlatform === platform.id;
                return (
                  <Pressable
                    key={platform.id}
                    onPress={() => handlePlatformChange(platform.id)}
                    style={{
                      backgroundColor: isSelected ? '#9333ea' : (isDark ? '#27272a' : '#f4f4f5'),
                      borderWidth: 1,
                      borderColor: isSelected ? '#9333ea' : (isDark ? '#3c3c40' : '#e4e4e7'),
                      height: 36,
                    }}
                    className="px-4 rounded-full items-center justify-center shadow-sm"
                  >
                    <ThemedText
                      style={{ color: isSelected ? '#ffffff' : (isDark ? '#a3a3b5' : '#71717a') }}
                      className={`text-xs ${isSelected ? 'font-montBlack' : 'font-montBold'}`}
                    >
                      {platform.label}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* Summary Section Container */}
        {!isLoading && !hasError && giveaways.length > 0 && (
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
              { backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor },
              Platform.select({
                ios: { shadowColor: '#000000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: isDark ? 0.30 : 0.08, shadowRadius: 12 },
                android: { elevation: 4 }
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
              onPress={() => fetchData(selectedPlatform)}
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
              <GiveawayItem 
                key={giveaway.id} 
                giveaway={giveaway} 
                variant={layoutVariant} 
              />
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

      {/* --- LIQUID GLASS FLOATING ACTION BUTTON (FAB) --- */}
      {!isLoading && !hasError && (
        <View 
          style={[
            {
              position: 'absolute',
              bottom: 70,
              right: 20,
              backgroundColor: glassBgColor,
              borderWidth: 1.5,
              borderColor: glassBorderColor,
              borderRadius: 9999,
              overflow: 'hidden',
            },
            Platform.select({
              ios: {
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: isDark ? 0.40 : 0.15,
                shadowRadius: 20,
              },
              android: {
                elevation: 8,
              }
            })
          ]}
        >
          <Pressable
            onPress={() => setLayoutVariant(prev => prev === 'normal' ? 'compact' : 'normal')}
            android_ripple={{ color: 'rgba(255, 255, 255, 0.2)', borderless: true }}
            className="w-14 h-14 items-center justify-center active:opacity-80"
          >
            {layoutVariant === 'normal' ? (
              <Element3 size="24" color="#9333ea" variant="Broken" />
            ) : (
              <RowVertical size="24" color="#9333ea" variant="Broken" />
            )}
          </Pressable>
        </View>
      )}
    </View>
  );
}