import React, { useEffect, useState, useRef, useMemo } from 'react';
import { ScrollView, View, Pressable, Image, Platform, LayoutAnimation, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Setting, Moon, Sun1, WifiSquare, Element3, RowVertical, Filter, CloseCircle, SearchNormal, Shop, Flash } from 'iconsax-react-nativejs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import i18nInstanceSource from '@/components/i18n';

import DealItem from '@/components/custom/DealItem';
import BestDealsCarousel from '@/components/custom/BestDealsCarousel';
import Button from '@/components/custom/Button';
import { ThemedText } from '@/components/ThemedText';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';
import { FreeGiveaway } from '@/types';

const LAYOUT_STORAGE_KEY = '@deals_layout_variant';

const PLATFORMS = [
  { id: 'all', key: 'deals.stores.all', label: 'All Stores', iconUri: null },
  { id: '1', key: 'deals.stores.steam', label: 'Steam', iconUri: 'https://www.cheapshark.com/img/stores/icons/0.png' },
  { id: '2', key: 'deals.stores.gamersgate', label: 'GamersGate', iconUri: 'https://www.cheapshark.com/img/stores/icons/1.png' },
  { id: '3', key: 'deals.stores.gmg', label: 'GreenManGaming', iconUri: 'https://www.cheapshark.com/img/stores/icons/2.png' },
  { id: '7', key: 'deals.stores.gog', label: 'GOG', iconUri: 'https://www.cheapshark.com/img/stores/icons/6.png' },
  { id: '8', key: 'deals.stores.humble', label: 'Humble Store', iconUri: 'https://www.cheapshark.com/img/stores/icons/7.png' },
  { id: '11', key: 'deals.stores.macgamestore', label: 'MacGamestore', iconUri: 'https://www.cheapshark.com/img/stores/icons/10.png' },
  { id: '13', key: 'deals.stores.ubisoft', label: 'Ubisoft Store', iconUri: 'https://www.cheapshark.com/img/stores/icons/12.png' },
  { id: '15', key: 'deals.stores.fanatical', label: 'Fanatical', iconUri: 'https://www.cheapshark.com/img/stores/icons/14.png' },
  { id: '21', key: 'deals.stores.wingamestore', label: 'WinGameStore', iconUri: 'https://www.cheapshark.com/img/stores/icons/20.png' },
  { id: '23', key: 'deals.stores.gamebillet', label: 'GameBillet', iconUri: 'https://www.cheapshark.com/img/stores/icons/22.png' },
  { id: '24', key: 'deals.stores.voidu', label: 'Voidu', iconUri: 'https://www.cheapshark.com/img/stores/icons/23.png' },
  { id: '25', key: 'deals.stores.epic', label: 'Epic Games Store', iconUri: 'https://www.cheapshark.com/img/stores/icons/24.png' },
  { id: '27', key: 'deals.stores.gamesplanet', label: 'Gamesplanet', iconUri: 'https://www.cheapshark.com/img/stores/icons/26.png' },
  { id: '28', key: 'deals.stores.gamesload', label: 'Gamesload', iconUri: 'https://www.cheapshark.com/img/stores/icons/27.png' },
  { id: '29', key: 'deals.stores.2game', label: '2Game', iconUri: 'https://www.cheapshark.com/img/stores/icons/28.png' },
  { id: '30', key: 'deals.stores.indiegala', label: 'IndieGala', iconUri: 'https://www.cheapshark.com/img/stores/icons/29.png' },
  { id: '31', key: 'deals.stores.blizzard', label: 'Blizzard Shop', iconUri: 'https://www.cheapshark.com/img/stores/icons/30.png' },
  { id: '32', key: 'deals.stores.allyouplay', label: 'AllYouPlay', iconUri: 'https://www.cheapshark.com/img/stores/icons/31.png' },
  { id: '33', key: 'deals.stores.dlgamer', label: 'DLGamer', iconUri: 'https://www.cheapshark.com/img/stores/icons/32.png' },
  { id: '34', key: 'deals.stores.noctre', label: 'Noctre', iconUri: 'https://www.cheapshark.com/img/stores/icons/33.png' },
  { id: '35', key: 'deals.stores.dreamgame', label: 'DreamGame', iconUri: 'https://www.cheapshark.com/img/stores/icons/34.png' },
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
// HIGH FIDELITY WORTH SUMMARY SKELETON
// =========================================================================
function WorthSummarySkeleton({ isDark, cardBgColor, adaptiveBorderColor }: { isDark: boolean; cardBgColor: string; adaptiveBorderColor: string }) {
  const shimmerBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';

  return (
    <View
      style={{ backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor }}
      className="rounded-2xl p-4 mb-5 min-h-[64px] justify-center animate-pulse opacity-85"
    >
      <View className="flex-row items-center flex-wrap gap-y-1.5">
        <View className="w-44 h-3 rounded mr-1" style={{ backgroundColor: shimmerBg }} />
        <View className="w-8 h-3 rounded mr-1" style={{ backgroundColor: isDark ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.1)' }} />
        <View className="w-28 h-3 rounded mr-1" style={{ backgroundColor: shimmerBg }} />
        <View className="w-16 h-3 rounded mr-1" style={{ backgroundColor: isDark ? 'rgba(147,51,234,0.15)' : 'rgba(147,51,234,0.1)' }} />
        <View className="w-20 h-3 rounded" style={{ backgroundColor: shimmerBg }} />
      </View>
    </View>
  );
}

// =========================================================================
// HIGH FIDELITY BEST DEALS CAROUSEL SKELETON
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
        <View style={{ height: 160, backgroundColor: shimmerBg }} className="w-full relative justify-between p-3">
          <View className="flex-row justify-between items-center w-full">
            <View className="w-28 h-5 rounded" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }} />
            <View className="w-16 h-5 rounded" style={{ backgroundColor: isDark ? 'rgba(147,51,234,0.25)' : 'rgba(147,51,234,0.15)' }} />
          </View>
        </View>

        <View className="p-4">
          <View className="mb-3">
            <View className="w-2/3 h-4 rounded mb-2.5" style={{ backgroundColor: shimmerBg }} />
            <View>
              <View className="w-full h-3 rounded mb-1.5" style={{ backgroundColor: shimmerBg }} />
              <View className="w-4/5 h-3 rounded" style={{ backgroundColor: shimmerBg }} />
            </View>
          </View>

          <View
            style={{ borderTopWidth: 1, borderColor: borderLine }}
            className="flex-row items-center justify-between pt-2.5 mt-0.5"
          >
            <View className="flex-row items-center">
              <View className="w-28 h-3 rounded mr-1" style={{ backgroundColor: shimmerBg }} />
              <View className="w-3.5 h-3.5 rounded" style={{ backgroundColor: isDark ? 'rgba(147,51,234,0.15)' : 'rgba(147,51,234,0.1)' }} />
            </View>

            <View className="flex-row items-center">
              <View className="w-8 h-3 rounded mr-1.5" style={{ backgroundColor: shimmerBg }} />
              <View className="w-12 h-4 rounded" style={{ backgroundColor: isDark ? 'rgba(34,197,94,0.15)' : 'rgba(34,197,94,0.1)' }} />
            </View>
          </View>
        </View>
      </View>

      <View className="flex-row items-center justify-center mt-1.5">
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
              marginHorizontal: 3,
            }}
          />
        ))}
      </View>
    </View>
  );
}

// =========================================================================
// HIGH FIDELITY CARD LIST SKELETON
// =========================================================================
function CardListSkeleton({ isDark, cardBgColor, adaptiveBorderColor, variant }: { isDark: boolean; cardBgColor: string; adaptiveBorderColor: string; variant: 'normal' | 'compact' }) {
  const shimmerBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';
  const borderLine = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';
  const mockItems = [1, 2, 3, 4, 5];

  return (
    <View className="w-full">
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
            <View>
              <View style={{ height: 150, backgroundColor: shimmerBg }} className="w-full" />

              <View className="p-4">
                <View className="w-3/4 h-4 rounded mb-3" style={{ backgroundColor: shimmerBg }} />
                <View className="w-full h-3 rounded mb-3" style={{ backgroundColor: shimmerBg }} />
                <View className="w-1/2 h-3 rounded mb-3" style={{ backgroundColor: shimmerBg }} />

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
            <View className="p-3 flex-row items-center">
              <View
                style={{ width: 84, height: 84, backgroundColor: shimmerBg }}
                className="rounded-xl shrink-0 mr-3"
              />

              <View className="flex-1 justify-between h-[84px] py-0.5">
                <View>
                  <View className="w-5/6 h-3.5 rounded mb-2" style={{ backgroundColor: shimmerBg }} />
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
  const searchInputRef = useRef<TextInput>(null);
  const { t } = useTranslation(undefined, { i18n: i18nInstanceSource });

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [giveaways, setGiveaways] = useState<FreeGiveaway[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [layoutVariant, setLayoutVariant] = useState<'compact' | 'normal'>('compact');

  const [showFilterBar, setShowFilterBar] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [isAAA, setIsAAA] = useState(false);

  // Search States
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const itemsPerPage = 10;

  const backgroundColor = useThemeColor({}, 'background');
  const { themeMode, toggleTheme } = useCustomTheme();

  const isDark = themeMode === 'dark';
  const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';
  const adaptiveBorderColor = isDark ? '#3a3a45' : '#e4e4e7';

  // Load saved layout preference from AsyncStorage
  useEffect(() => {
    const loadSavedLayout = async () => {
      try {
        const savedLayout = await AsyncStorage.getItem(LAYOUT_STORAGE_KEY);
        if (savedLayout === 'normal' || savedLayout === 'compact') {
          setLayoutVariant(savedLayout);
        }
      } catch (error) {
        console.error('Failed to load deals layout variant:', error);
      }
    };

    loadSavedLayout();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPagedGiveaways = useMemo(() => {
    return giveaways.slice(startIndex, endIndex);
  }, [giveaways, startIndex, endIndex]);

  const fetchData = async (storeId: string = 'all', query: string = '', aaaOnly: boolean = false) => {
    setIsLoading(true);
    setHasError(false);
    try {
      let url = `https://www.cheapshark.com/api/1.0/deals?upperPrice=100&pageSize=50`;
      if (storeId !== 'all') {
        url += `&storeID=${storeId}`;
      }
      if (query.trim()) {
        url += `&title=${encodeURIComponent(query.trim())}`;
      }
      if (aaaOnly) {
        url += `&AAA=1`;
      }

      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'FrappApp/1.1 (React Native)',
        },
      });
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
            ? t('deals.save_description', {
                defaultValue: 'Save {{savings}}% off! Now ${{sale}} down from ${{normal}}.',
                savings: percentSavings,
                sale: deal.salePrice,
                normal: deal.normalPrice
              })
            : t('deals.available_description', {
                defaultValue: 'Available now for ${{sale}}.',
                sale: deal.salePrice
              }),
          short_description: t('deals.short_description', {
            defaultValue: 'Score this offer on Store #{{store}}. Deal Rating: {{rating}}/10',
            store: deal.storeID,
            rating: deal.dealRating || 'N/A'
          }),
          open_giveaway_url: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`,
          open_giveaway: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`,
          game_url: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`,
          worth: currentSalePrice === 0 ? t('deals.free_uppercase', 'FREE') : `$${deal.salePrice}`,
          end_date: t('deals.limited_time', 'Limited Time Offer'),
          platform: deal.storeID || storeId,
          genre: t('deals.genre', 'Video Game Deal'),
          publisher: t('deals.publisher', 'Retail Distribution'),
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

  // Debounced search / platform / AAA update trigger
  useEffect(() => {
    const handler = setTimeout(() => {
      setCurrentPage(1);
      fetchData(selectedPlatform, searchQuery, isAAA);
    }, 400);

    return () => clearTimeout(handler);
  }, [selectedPlatform, searchQuery, isAAA]);

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

  const handleLayoutVariantToggle = async () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const nextVariant: 'compact' | 'normal' = layoutVariant === 'normal' ? 'compact' : 'normal';
    setLayoutVariant(nextVariant);

    try {
      await AsyncStorage.setItem(LAYOUT_STORAGE_KEY, nextVariant);
    } catch (error) {
      console.error('Failed to save deals layout variant:', error);
    }
  };

  const handleFilterBarToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowFilterBar(prev => !prev);
  };

  const handleSearchBarToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const nextState = !showSearchBar;
    setShowSearchBar(nextState);
    if (!nextState) {
      setSearchQuery('');
    } else {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const now = new Date();
  const day = now.getDate();
  const year = now.getFullYear();

  const monthKeys = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  const monthDefaults = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentMonthIndex = now.getMonth();
  const localizedMonth = t(`months.${monthKeys[currentMonthIndex]}`, monthDefaults[currentMonthIndex]);

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
        <View className="flex-row items-center justify-between w-full mb-4">
          <Pressable className="flex-row items-center gap-2 flex-1 pr-2 active:opacity-90">
            <View style={{ backgroundColor: '#9333ea' }} className="w-9 h-9 rounded-xl overflow-hidden items-center justify-center shadow-sm shrink-0">
              <Image source={require('../../assets/images/FRAPP_ICON1.png')} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
            </View>
            <ThemedText numberOfLines={1} className="text-lg font-montBlack tracking-tight flex-shrink">
              {t('deals.title', 'Game Deals.')}
            </ThemedText>
          </Pressable>

          <View className="flex-row items-center gap-2">
            {/* Search Toggle Icon */}
            <Pressable
              onPress={handleSearchBarToggle}
              style={{ backgroundColor: showSearchBar ? '#9333ea' : (isDark ? '#27272a' : '#f4f4f5') }}
              className="w-9 h-9 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0"
            >
              <SearchNormal size="18" color={showSearchBar ? '#ffffff' : (isDark ? '#f4f4f5' : '#3f3f46')} variant="Broken" />
            </Pressable>

            {/* Layout Toggle Icon */}
            <Pressable
              onPress={handleLayoutVariantToggle}
              style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }}
              className="w-9 h-9 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0"
            >
              {layoutVariant === 'normal' ? <Element3 size="18" color="#9333ea" variant="Broken" /> : <RowVertical size="18" color="#9333ea" variant="Broken" />}
            </Pressable>

            {/* Filter Bar Toggle Icon */}
            <Pressable
              onPress={handleFilterBarToggle}
              style={{ backgroundColor: showFilterBar || isAAA ? '#9333ea' : (isDark ? '#27272a' : '#f4f4f5') }}
              className="w-9 h-9 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0"
            >
              <Filter size="18" color={showFilterBar || isAAA ? '#ffffff' : (isDark ? '#f4f4f5' : '#3f3f46')} variant="Broken" />
            </Pressable>

            {/* Theme Toggle Icon */}
            <Pressable onPress={toggleTheme} style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }} className="w-9 h-9 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0">
              {isDark ? <Sun1 size="18" color="#f4f4f5" variant="Broken" /> : <Moon size="18" color="#3f3f46" variant="Broken" />}
            </Pressable>
          </View>
        </View>

        {/* --- SEARCH INPUT BAR SECTION --- */}
        {showSearchBar && (
          <View className="w-full mb-4">
            <View
              style={{
                backgroundColor: cardBgColor,
                borderWidth: 1,
                borderColor: adaptiveBorderColor,
              }}
              className="flex-row items-center px-3.5 h-12 rounded-2xl shadow-sm"
            >
              <SearchNormal size="18" color={isDark ? '#a3a3b5' : '#71717a'} variant="Broken" />
              <TextInput
                ref={searchInputRef}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder={t('deals.search.placeholder', 'Find out if your favorite game is on sale...')}
                placeholderTextColor={isDark ? '#71717a' : '#a1a1aa'}
                style={{ color: isDark ? '#ffffff' : '#1c1c1e' }}
                className="flex-1 ml-2.5 mr-1 font-mont text-sm h-full"
                returnKeyType="search"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {searchQuery.length > 0 && (
                <Pressable onPress={handleClearSearch} className="p-1 active:opacity-60">
                  <CloseCircle size="18" color={isDark ? '#a3a3b5' : '#71717a'} variant="Bold" />
                </Pressable>
              )}
            </View>
          </View>
        )}

        {/* --- ENHANCED FILTER BAR WITH LOGOS AND AAA TOGGLE --- */}
        {showFilterBar && (
          <View className="w-full mb-5">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="-mx-4 py-1"
              style={{ height: 50 }}
              contentContainerStyle={{ alignItems: 'center', gap: 8, paddingHorizontal: 16 }}
            >
              {/* AAA Blockbusters Filter Toggle */}
              <Pressable
                onPress={() => {
                  setCurrentPage(1);
                  setIsAAA(prev => !prev);
                }}
                style={{
                  backgroundColor: isAAA ? '#f59e0b' : (isDark ? '#27272a' : '#f4f4f5'),
                  borderWidth: 1,
                  borderColor: isAAA ? '#f59e0b' : (isDark ? '#3c3c3a' : '#e4e4e7'),
                  height: 36,
                }}
                className="px-3.5 rounded-full flex-row items-center gap-1.5 shadow-sm"
              >
                <Flash size="14" color={isAAA ? '#ffffff' : '#f59e0b'} variant={isAAA ? 'Bold' : 'Outline'} />
                <ThemedText
                  style={{ color: isAAA ? '#ffffff' : (isDark ? '#f59e0b' : '#d97706') }}
                  className={`text-xs ${isAAA ? 'font-montBlack' : 'font-montBold'}`}
                >
                  {t('deals.filters.aaa', 'AAA Deals')}
                </ThemedText>
              </Pressable>

              {/* Visual Divider */}
              <View className="h-5 w-[1px] bg-zinc-300 dark:bg-zinc-700 mx-0.5" />

              {/* Store Category Chips */}
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
                    className="px-3.5 rounded-full flex-row items-center gap-1.5 shadow-sm"
                  >
                    {platform.iconUri ? (
                      <Image
                        source={{ uri: platform.iconUri }}
                        className="w-4 h-4 rounded-sm"
                        resizeMode="contain"
                      />
                    ) : (
                      <Shop
                        size="14"
                        color={isSelected ? '#ffffff' : (isDark ? '#a3a3b5' : '#71717a')}
                        variant="Bold"
                      />
                    )}
                    <ThemedText
                      style={{ color: isSelected ? '#ffffff' : (isDark ? '#a3a3b5' : '#71717a') }}
                      className={`text-xs ${isSelected ? 'font-montBlack' : 'font-montBold'}`}
                    >
                      {t(platform.key, platform.label)}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* --- CAROUSEL / SKELETON LOADER SECTION --- */}
        {isLoading ? (
          selectedPlatform === 'all' && !searchQuery && !isAAA && (
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
          !hasError && giveaways.length > 0 && selectedPlatform === 'all' && !searchQuery && !isAAA && (
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
                  {t('deals.summary.prefix', 'We parsed through active gaming storefronts and discovered ')}
                  <ThemedText style={{ color: '#22c55e' }} className="font-montBlack">{giveaways.length}</ThemedText>
                  {t('deals.summary.midActive', ' massive discounts live as of ')}
                  <ThemedText style={{ color: '#a855f7' }} className="font-montBlack">{day} {localizedMonth} {year}</ThemedText>
                  {t('deals.summary.suffix', '. Tap any title to secure your key!')}
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
            <ThemedText className="font-montBlack text-lg text-center mb-2 tracking-tight">
              {t('deals.error.title', 'Connection Interrupted')}
            </ThemedText>
            <ThemedText className="font-mont text-zinc-500 dark:text-zinc-400 text-sm text-center leading-relaxed mb-6 px-4">
              {t('deals.error.description', "We can't sync up with the servers right now. Make sure your device is online and let's try that again.")}
            </ThemedText>
            <Button type="primary" loading={isLoading} onPress={() => fetchData(selectedPlatform, searchQuery, isAAA)} className="w-full" text={t('deals.error.retryButton', 'Retry Connection')} />
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
            <ThemedText className="font-montBlack text-lg text-center mb-2 tracking-tight">
              {t('deals.empty.title', 'No Matches Found')}
            </ThemedText>
            <ThemedText className="font-mont text-zinc-500 dark:text-zinc-400 text-sm text-center leading-relaxed mb-6 px-4">
              {t('deals.empty.description', searchQuery ? `No games matching "${searchQuery}" were found.` : 'No live deals found under this storefront category.')}
            </ThemedText>
            <Button
              type="primary"
              onPress={() => {
                setSearchQuery('');
                setIsAAA(false);
                handlePlatformChange('all');
              }}
              className="w-full"
              text={t('deals.empty.resetButton', 'Reset Filters')}
            />
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
                <PaginationButton text={t('deals.pagination.next', 'Next Games')} onPress={handleNextPage} isDark={isDark} />
              )
            ) : (
              <View className="flex-row items-center gap-3 w-full">
                <View className="flex-1">
                  <PaginationButton text={t('deals.pagination.prev', 'Previous')} onPress={handleHoldPrevPage} isDark={isDark} />
                </View>
                {hasNextPage && (
                  <View className="flex-1">
                    <PaginationButton text={t('deals.pagination.next', 'Next Games')} onPress={handleNextPage} isDark={isDark} />
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