import DealItem from '@/components/custom/DealItem';
import GiveawaySkeleton from '@/components/custom/GiveawaySkeleton';
import BestDealsCarousel from '@/components/custom/BestDealsCarousel'; // Your newly added carousel component
import { ThemedText } from '@/components/ThemedText';
import { FreeGiveaway } from '@/types';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { ScrollView, View, Pressable, Image, Platform } from 'react-native';
import { Setting, Moon, Sun1, WifiSquare, Element3, RowVertical, Filter } from 'iconsax-react-nativejs'; 
import { useRouter } from 'expo-router';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';
import Button from '@/components/custom/Button';

const PLATFORMS = [
  { id: 'all', label: 'All Stores' },
  { id: '1', label: 'Steam' },
  { id: '11', label: 'Epic Games' },
  { id: '7', label: 'GOG' },
  { id: '3', label: 'Amazon' },
];

interface PaginationButtonProps {
  text: string;
  onPress: () => void;
  isDark: boolean;
}

function PaginationButton({ text, onPress, isDark }: PaginationButtonProps) {
  const dynamicBorderColor = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(28, 28, 30, 1)';
  const dynamicTextColor = isDark ? '#ffffff' : '#1c1c1e';

  return (
    <Pressable
      onPress={onPress}
      className="w-full h-12 rounded-xl border items-center justify-center active:opacity-60 bg-transparent"
      style={{ borderColor: dynamicBorderColor }}
    >
      <ThemedText 
        style={{ color: dynamicTextColor }} 
        className="font-montBold text-sm uppercase tracking-wider"
      >
        {text}
      </ThemedText>
    </Pressable>
  );
}

export default function FreeScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [giveaways, setGiveaways] = useState<FreeGiveaway[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [layoutVariant, setLayoutVariant] = useState<'normal' | 'compact'>('normal');
  
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  
  const itemsPerPage = 10;

  const backgroundColor = useThemeColor({}, 'background');
  const { themeMode, toggleTheme } = useCustomTheme();

  const isDark = themeMode === 'dark';
  const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';
  const adaptiveBorderColor = isDark ? '#3a3a45' : '#e4e4e7';

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPagedGiveaways = useMemo(() => {
    return giveaways.slice(startIndex, endIndex);
  }, [giveaways, startIndex, endIndex]);

  const fetchData = async (storeId: string = 'all') => {
    setIsLoading(true);
    setHasError(false);
    try {
      let url = `https://www.cheapshark.com/api/1.0/deals?upperPrice=100&pageSize=50`; 
      if (storeId !== 'all') {
        url += `&storeID=${storeId}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Server payload error');
      
      const rawDeals = await response.json();
      
      const normalizedData: FreeGiveaway[] = (Array.isArray(rawDeals) ? rawDeals : []).map((deal: any, index: number) => {
        const percentSavings = deal.savings ? Math.round(parseFloat(deal.savings)) : 0;
        const currentSalePrice = parseFloat(deal.salePrice || '0');
        const guaranteedUniqueId = deal.dealID ? deal.dealID : `deal-${index}-${deal.gameID}`;

        return {
          id: guaranteedUniqueId as any, 
          title: deal.title || 'Unknown Title',
          thumbnail: deal.thumb || '',
          image: deal.thumb || '',
          description: percentSavings > 0 
            ? `Save ${percentSavings}% off! Now $${deal.salePrice} down from $${deal.normalPrice}.`
            : `Available now for $${deal.salePrice}.`,
          short_description: `Score this offer on Store #${deal.storeID}. Deal Rating: ${deal.dealRating || 'N/A'}/10`,
          open_giveaway_url: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`,
          open_giveaway: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`,
          game_url: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`,
          worth: currentSalePrice === 0 ? 'FREE' : `$${deal.salePrice}`,
          end_date: 'Limited Time Offer',
          platform: deal.storeID || storeId, 
          genre: 'Video Game Deal',
          publisher: 'Retail Distribution',
          release_date: deal.releaseDate && deal.releaseDate > 0 ? new Date(deal.releaseDate * 1000).toISOString() : '',
          margin: '0',
          dealID: deal.dealID,
          storeID: deal.storeID,
          salePrice: deal.salePrice,
          normalPrice: deal.normalPrice,
          savings: percentSavings.toString()
        };
      });

      setGiveaways(normalizedData);
    } catch (error) {
      console.error('CheapShark network error:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedPlatform);
  }, [selectedPlatform]);

  const safeScrollToTop = () => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    }, 40);
  };

  const handlePlatformChange = (platformId: string) => {
    setCurrentPage(1);
    setSelectedPlatform(platformId);
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
    safeScrollToTop();
  };

  const handleHoldPrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
    safeScrollToTop();
  };

  const now = new Date();
  const day = now.getDate();
  const year = now.getFullYear();
  const monthName = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ][now.getMonth()];

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <ScrollView
        ref={scrollRef}
        className='flex-1 px-4 pt-10 pb-2'
        style={{ backgroundColor }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* --- PREMIUM BRAND HEADER ROW --- */}
        <View className="flex-row items-center justify-between w-full mb-6">
          <View className="flex-row items-center gap-3 flex-1 mr-2">
            <View style={{ backgroundColor: '#9333ea' }} className="w-10 h-10 rounded-xl overflow-hidden items-center justify-center shadow-md shrink-0">
              <Image source={require('../../assets/images/FRAPP_ICON1.png')} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
            </View>
            <ThemedText numberOfLines={1} className="text-xl font-montBlack tracking-tight flex-shrink">Game Deals.</ThemedText>
          </View>

          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={() => setLayoutVariant(prev => prev === 'normal' ? 'compact' : 'normal')}
              style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }}
              className="w-10 h-10 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0"
            >
              {layoutVariant === 'normal' ? <Element3 size="20" color="#9333ea" variant="Broken" /> : <RowVertical size="20" color="#9333ea" variant="Broken" />}
            </Pressable>

            <Pressable
              onPress={() => setShowFilterBar(prev => !prev)}
              style={{ backgroundColor: showFilterBar ? '#9333ea' : (isDark ? '#27272a' : '#f4f4f5') }}
              className="w-10 h-10 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0"
            >
              <Filter size="20" color={showFilterBar ? '#ffffff' : (isDark ? '#f4f4f5' : '#3f3f46')} variant="Broken" />
            </Pressable>

            <Pressable onPress={() => router.push('/(tabs)/settings')} style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }} className="w-10 h-10 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0">
              <Setting size="20" color={isDark ? '#f4f4f5' : '#3f3f46'} variant="Broken" />
            </Pressable>

            <Pressable onPress={toggleTheme} style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }} className="w-10 h-10 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0">
              {isDark ? <Sun1 size="20" color="#f4f4f5" variant="Broken" /> : <Moon size="20" color="#3f3f46" variant="Broken" />}
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
              contentContainerStyle={{ alignItems: 'center', gap: 8, paddingHorizontal: 2 }}
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
                      borderColor: isSelected ? '#9333ea' : (isDark ? '#3c3c3a' : '#e4e4e7'),
                      height: 36,
                    }}
                    className="px-4 rounded-full items-center justify-center shadow-sm"
                  >
                    <ThemedText style={{ color: isSelected ? '#ffffff' : (isDark ? '#a3a3b5' : '#71717a') }} className={`text-xs ${isSelected ? 'font-montBlack' : 'font-montBold'}`}>
                      {platform.label}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* --- SUMMARY SECTION CONTAINER --- */}
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
              We parsed through active gaming storefronts and discovered{' '}
              <ThemedText style={{ color: '#22c55e' }} className="font-montBlack">{giveaways.length}</ThemedText> massive discounts live as of{' '}
              <ThemedText style={{ color: '#a855f7' }} className="font-montBlack">{day} {monthName} {year}</ThemedText>. Tap any title to secure your key!
            </ThemedText>
          </View>
        )}

        {/* --- CAROUSEL PLACED DIRECTLY BELOW SUMMARY SECTION --- */}
        {!isLoading && !hasError && giveaways.length > 0 && (
          <BestDealsCarousel />
        )}

        {/* --- MAIN DATA CONTENT BLOCKS --- */}
        {hasError ? (
          <View style={[{ backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor }]} className="rounded-3xl p-6 items-center justify-center my-6">
            <View className="w-16 h-16 rounded-2xl bg-purple-600/10 dark:bg-purple-500/10 items-center justify-center mb-4">
              <WifiSquare size="36" color="#9333ea" variant="Broken" />
            </View>
            <ThemedText className="font-montBlack text-lg text-center mb-2 tracking-tight">Connection Interrupted</ThemedText>
            <ThemedText className="font-mont text-zinc-500 dark:text-zinc-400 text-sm text-center leading-relaxed mb-6 px-4">
              We can't sync up with the servers right now. Make sure your device is online and let's try that again.
            </ThemedText>
            <Button type="primary" loading={isLoading} onPress={() => fetchData(selectedPlatform)} className="w-full" text="Retry Connection" />
          </View>
        ) : isLoading ? (
          <GiveawaySkeleton loading={true}><></></GiveawaySkeleton>
        ) : giveaways.length === 0 ? (
          <View style={[{ backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor }]} className="rounded-3xl p-6 items-center justify-center my-6">
            <View className="w-16 h-16 rounded-2xl bg-purple-600/10 dark:bg-purple-500/10 items-center justify-center mb-4">
              <Element3 size="36" color="#9333ea" variant="Broken" />
            </View>
            <ThemedText className="font-montBlack text-lg text-center mb-2 tracking-tight">No Matches Found</ThemedText>
            <ThemedText className="font-mont text-zinc-500 dark:text-zinc-400 text-sm text-center leading-relaxed mb-6 px-4">
              No live deals found under this storefront category.
            </ThemedText>
            <Button type="primary" onPress={() => handlePlatformChange('all')} className="w-full" text="Reset Filters" />
          </View>
        ) : (
          <View className="w-full">
            {currentPagedGiveaways.map((giveaway) => (
              <DealItem key={String(giveaway.id)} giveaway={giveaway} variant={layoutVariant} />
            ))}
          </View>
        )}

        {/* --- DUAL ACTION PAGINATION FOOTER TOOLBAR --- */}
        {!isLoading && !hasError && giveaways.length > 0 && (
          <View className="flex-row items-center gap-3 mt-4 w-full">
            {currentPage > 1 ? (
              <View className="flex-1 mb-24">
                <PaginationButton text="Previous" onPress={handleHoldPrevPage} isDark={isDark} />
              </View>
            ) : (
              giveaways.length > itemsPerPage && <View className="flex-1 mb-24" />
            )}

            {endIndex < giveaways.length ? (
              <View className="flex-1 mb-24">
                <PaginationButton text="Next Games" onPress={handleNextPage} isDark={isDark} />
              </View>
            ) : (
              currentPage > 1 && giveaways.length > itemsPerPage && <View className="flex-1 mb-24" />
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}