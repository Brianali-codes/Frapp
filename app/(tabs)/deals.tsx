import React, { useEffect, useState, useRef, useMemo } from 'react';
import { ScrollView, View, Pressable, Image, Platform, LayoutAnimation } from 'react-native';
import { useRouter } from 'expo-router';
import { Setting, Moon, Sun1, WifiSquare, Element3, RowVertical, Filter } from 'iconsax-react-nativejs'; 

import DealItem from '@/components/custom/DealItem';
import BestDealsCarousel from '@/components/custom/BestDealsCarousel'; 
import Button from '@/components/custom/Button';
import { ThemedText } from '@/components/ThemedText';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';
import { FreeGiveaway } from '@/types';

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
      className="w-full h-12 rounded-full border items-center justify-center active:opacity-60 bg-transparent"
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

// =========================================================================
// HIGH FIDELITY WORTH SUMMARY SKELETON (UNIFORM WITH MAIN SCREEN)
// =========================================================================
function WorthSummarySkeleton({ isDark, cardBgColor, adaptiveBorderColor }: { isDark: boolean; cardBgColor: string; adaptiveBorderColor: string }) {
  const shimmerBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';

  return (
    <View 
      style={{ backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor }}
      className="rounded-2xl p-4 mb-5 h-16 justify-center animate-pulse opacity-85"
    >
      <View className="flex-row items-center flex-wrap gap-y-1.5">
        <View className="w-44 h-3 rounded" style={{ backgroundColor: shimmerBg }} />
        <View className="w-8 h-3 rounded mx-1" style={{ backgroundColor: isDark ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.1)' }} />
        <View className="w-28 h-3 rounded" style={{ backgroundColor: shimmerBg }} />
        <View className="w-16 h-3 rounded mx-1" style={{ backgroundColor: isDark ? 'rgba(147,51,234,0.15)' : 'rgba(147,51,234,0.1)' }} />
        <View className="w-20 h-3 rounded" style={{ backgroundColor: shimmerBg }} />
      </View>
    </View>
  );
}

// =========================================================================
// HIGH FIDELITY BEST DEALS CAROUSEL SKELETON (UNIFORM WITH MAIN SCREEN)
// =========================================================================
function CarouselSkeleton({ isDark, cardBgColor, adaptiveBorderColor }: { isDark: boolean; cardBgColor: string; adaptiveBorderColor: string }) {
  const shimmerBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';
  const borderLine = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';

  return (
    <View className="w-full mb-6 animate-pulse opacity-85">
      <View
        style={{ 
          borderWidth: 1, 
          borderColor: adaptiveBorderColor,
          backgroundColor: cardBgColor 
        }}
        className="rounded-2xl overflow-hidden w-full mb-2"
      >
        {/* Banner Graphic Frame Placeholder */}
        <View style={{ height: 160, backgroundColor: shimmerBg }} className="w-full relative justify-between p-3">
          <View className="flex-row justify-between items-center w-full">
            <View className="w-28 h-5 rounded" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }} />
            <View className="w-16 h-5 rounded" style={{ backgroundColor: isDark ? 'rgba(147,51,234,0.25)' : 'rgba(147,51,234,0.15)' }} />
          </View>
        </View>

        {/* Informational Details matching Carousel structure */}
        <View className="p-4 space-y-3">
          <View>
            <View className="w-2/3 h-4 rounded mb-2.5" style={{ backgroundColor: shimmerBg }} />
            <View className="space-y-1.5">
              <View className="w-full h-3 rounded" style={{ backgroundColor: shimmerBg }} />
              <View className="w-4/5 h-3 rounded" style={{ backgroundColor: shimmerBg }} />
            </View>
          </View>

          {/* Separation Border & Call-To-Action Mock placeholders */}
          <View 
            style={{ borderTopWidth: 1, borderColor: borderLine }} 
            className="flex-row items-center justify-between pt-2.5 mt-0.5"
          >
            <View className="flex-row items-center gap-1">
              <View className="w-28 h-3 rounded" style={{ backgroundColor: shimmerBg }} />
              <View className="w-3.5 h-3.5 rounded" style={{ backgroundColor: isDark ? 'rgba(147,51,234,0.15)' : 'rgba(147,51,234,0.1)' }} />
            </View>
            
            <View className="flex-row items-center gap-1.5">
              <View className="w-8 h-3 rounded" style={{ backgroundColor: shimmerBg }} />
              <View className="w-12 h-4 rounded" style={{ backgroundColor: isDark ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.1)' }} />
            </View>
          </View>
        </View>
      </View>

      {/* Interactive Dot pagination controller mockups */}
      <View className="flex-row items-center justify-center gap-1.5 mt-1.5">
        {[0, 1, 2, 3, 4].map((_, dotIndex) => (
          <View
            key={dotIndex}
            style={{
              width: dotIndex === 0 ? 14 : 6,
              height: 6,
              backgroundColor: dotIndex === 0 
                ? '#9333ea' 
                : (isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)'),
              borderRadius: 999,
            }}
          />
        ))}
      </View>
    </View>
  );
}

// =========================================================================
// HIGH FIDELITY CARD LIST SKELETON (UNIFORM WITH MAIN SCREEN)
// =========================================================================
function CardListSkeleton({ isDark, cardBgColor, adaptiveBorderColor, variant }: { isDark: boolean; cardBgColor: string; adaptiveBorderColor: string; variant: 'normal' | 'compact' }) {
  const shimmerBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';
  const borderLine = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';
  const mockItems = [1, 2, 3, 4];

  return (
    <View className="w-full space-y-4">
      {mockItems.map((item) => (
        <View
          key={item}
          style={{
            borderWidth: 1,
            borderColor: adaptiveBorderColor,
            backgroundColor: cardBgColor,
          }}
          className="rounded-2xl overflow-hidden w-full mb-4 animate-pulse opacity-85"
        >
          {variant === 'normal' ? (
            /* --- NORMAL/LARGE DISPLAY VARIANT --- */
            <View>
              <View style={{ height: 150, backgroundColor: shimmerBg }} className="w-full" />
              
              <View className="p-4 space-y-3">
                <View className="w-3/4 h-4 rounded" style={{ backgroundColor: shimmerBg }} />
                <View className="w-full h-3 rounded" style={{ backgroundColor: shimmerBg }} />
                <View className="w-1/2 h-3 rounded" style={{ backgroundColor: shimmerBg }} />
                
                <View 
                  style={{ borderTopWidth: 1, borderColor: borderLine }} 
                  className="flex-row items-center justify-between pt-3 mt-1"
                >
                  <View className="w-20 h-3 rounded" style={{ backgroundColor: shimmerBg }} />
                  <View className="w-16 h-5 rounded" style={{ backgroundColor: isDark ? 'rgba(147,51,234,0.15)' : 'rgba(147,51,234,0.1)' }} />
                </View>
              </View>
            </View>
          ) : (
            /* --- COMPACT LIST STYLE VARIANT --- */
            <View className="p-3 flex-row items-center">
              <View 
                style={{ width: 84, height: 84, backgroundColor: shimmerBg }} 
                className="rounded-xl shrink-0 mr-3" 
              />
              
              <View className="flex-1 justify-between h-20 py-0.5">
                <View className="space-y-2">
                  <View className="w-5/6 h-3.5 rounded" style={{ backgroundColor: shimmerBg }} />
                  <View className="w-1/2 h-2.5 rounded" style={{ backgroundColor: shimmerBg }} />
                </View>

                <View className="flex-row items-center justify-between">
                  <View className="w-16 h-2.5 rounded" style={{ backgroundColor: shimmerBg }} />
                  <View className="w-12 h-4.5 rounded" style={{ backgroundColor: isDark ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.1)' }} />
                </View>
              </View>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

export default function FreeScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null); 
  
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [giveaways, setGiveaways] = useState<FreeGiveaway[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [layoutVariant, setLayoutVariant] = useState<'compact' | 'normal'>('compact');
  
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
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCurrentPage(prev => prev + 1);
    safeScrollToTop();
  };

  const handleHoldPrevPage = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCurrentPage(prev => Math.max(prev - 1, 1));
    safeScrollToTop();
  };

  const handleLayoutVariantToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setLayoutVariant(prev => prev === 'normal' ? 'compact' : 'normal');
  };

  const handleFilterBarToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowFilterBar(prev => !prev);
  };

  const now = new Date();
  const day = now.getDate();
  const year = now.getFullYear();
  const monthName = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ][now.getMonth()];

  const hasNextPage = endIndex < giveaways.length;

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <ScrollView
        ref={scrollRef}
        className='flex-1 px-4 pt-10'
        style={{ backgroundColor }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* --- BRAND HEADER ROW --- */}
        <View className="flex-row items-center justify-between w-full mb-6">
          <Pressable className="flex-row items-center gap-2 flex-1 pr-2 active:opacity-90">
            <View style={{ backgroundColor: '#9333ea' }} className="w-9 h-9 rounded-xl overflow-hidden items-center justify-center shadow-sm shrink-0">
              <Image source={require('../../assets/images/FRAPP_ICON1.png')} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
            </View>
            <ThemedText numberOfLines={1} className="text-lg font-montBlack tracking-tight flex-shrink">Game Deals.</ThemedText>
          </Pressable>

          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={handleLayoutVariantToggle}
              style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }}
              className="w-9 h-9 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0"
            >
              {layoutVariant === 'normal' ? <Element3 size="18" color="#9333ea" variant="Broken" /> : <RowVertical size="18" color="#9333ea" variant="Broken" />}
            </Pressable>

            <Pressable
              onPress={handleFilterBarToggle}
              style={{ backgroundColor: showFilterBar ? '#9333ea' : (isDark ? '#27272a' : '#f4f4f5') }}
              className="w-9 h-9 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0"
            >
              <Filter size="18" color={showFilterBar ? '#ffffff' : (isDark ? '#f4f4f5' : '#3f3f46')} variant="Broken" />
            </Pressable>

            <Pressable onPress={() => router.push('/(tabs)/settings')} style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }} className="w-9 h-9 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0">
              <Setting size="18" color={isDark ? '#f4f4f5' : '#3f3f46'} variant="Broken" />
            </Pressable>

            <Pressable onPress={toggleTheme} style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }} className="w-9 h-9 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0">
              {isDark ? <Sun1 size="18" color="#f4f4f5" variant="Broken" /> : <Moon size="18" color="#3f3f46" variant="Broken" />}
            </Pressable>
          </View>
        </View>

        {/* --- UNCLIPPED HORIZONTAL SCROLLFILTER SECTION --- */}
        {showFilterBar && (
          <View className="w-full mb-5">
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              className="-mx-4 py-1"
              style={{ height: 50 }}
              contentContainerStyle={{ alignItems: 'center', gap: 8, paddingHorizontal: 16 }}
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

        {/* --- CAROUSEL OR SKELETON LOADER SECTION --- */}
        {isLoading ? (
          selectedPlatform === 'all' && (
            <View className="w-full">
              <WorthSummarySkeleton 
                isDark={isDark}
                cardBgColor={cardBgColor} 
                adaptiveBorderColor={adaptiveBorderColor} 
              />
              <CarouselSkeleton 
                isDark={isDark} 
                cardBgColor={cardBgColor} 
                adaptiveBorderColor={adaptiveBorderColor} 
              />
            </View>
          )
        ) : (
          !hasError && giveaways.length > 0 && selectedPlatform === 'all' && (
            <>
              {/* --- SUMMARY SECTION CONTAINER --- */}
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

              <BestDealsCarousel />
            </>
          )
        )}

        {/* --- MAIN DATA CONTENT BLOCKS --- */}
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
            <ThemedText className="font-montBlack text-lg text-center mb-2 tracking-tight">Connection Interrupted</ThemedText>
            <ThemedText className="font-mont text-zinc-500 dark:text-zinc-400 text-sm text-center leading-relaxed mb-6 px-4">
              We can't sync up with the servers right now. Make sure your device is online and let's try that again.
            </ThemedText>
            <Button type="primary" loading={isLoading} onPress={() => fetchData(selectedPlatform)} className="w-full" text="Retry Connection" />
          </View>
        ) : isLoading ? (
          <CardListSkeleton 
            variant={layoutVariant} 
            cardBgColor={cardBgColor}
            adaptiveBorderColor={adaptiveBorderColor}
            isDark={isDark}
          />
        ) : giveaways.length === 0 ? (
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

        {/* --- DYNAMIC PACKED PAGINATION TOOLBAR --- */}
        {!isLoading && !hasError && giveaways.length > itemsPerPage && (
          <View className="mt-4 mb-24 w-full">
            {currentPage === 1 ? (
              hasNextPage && (
                <PaginationButton text="Next Games" onPress={handleNextPage} isDark={isDark} />
              )
            ) : (
              <View className="flex-row items-center gap-3 w-full">
                <View className="flex-1">
                  <PaginationButton text="Previous" onPress={handleHoldPrevPage} isDark={isDark} />
                </View>
                {hasNextPage && (
                  <View className="flex-1">
                    <PaginationButton text="Next Games" onPress={handleNextPage} isDark={isDark} />
                  </View>
                )}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}