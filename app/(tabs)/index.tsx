import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, View, Pressable, Image, Platform, LayoutAnimation } from 'react-native';
import { useRouter } from 'expo-router';
import { Setting, Moon, Sun1, WifiSquare, Filter, RowVertical, Element3 } from 'iconsax-react-nativejs';

import GiveawayItem from '@/components/custom/GiveawayItem';
import HighestWorthCarousel from '@/components/custom/HighestWorthCarousel';
import Button from '@/components/custom/Button';
import { ThemedText } from '@/components/ThemedText';

// Import translation hooks and explicit context instance
import { useTranslation } from 'react-i18next';
import  i18nInstanceSource from '@/components/i18n'; 

import { API_ENDPOINTS } from '@/constants/api';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';
import { Giveaway } from '@/types';

const PLATFORMS = [
  { id: 'all', labelKey: 'giveaways.platforms.all', labelDefault: 'All' },
  { id: 'pc', labelKey: 'giveaways.platforms.pc', labelDefault: 'PC' },
  { id: 'steam', labelKey: 'giveaways.platforms.steam', labelDefault: 'Steam' },
  { id: 'epic-games-store', labelKey: 'giveaways.platforms.epic', labelDefault: 'Epic' },
  { id: 'gog', labelKey: 'giveaways.platforms.gog', labelDefault: 'GOG' },
  { id: 'ps4', labelKey: 'giveaways.platforms.ps4', labelDefault: 'PS4' },
  { id: 'ps5', labelKey: 'giveaways.platforms.ps5', labelDefault: 'PS5' },
  { id: 'xbox-series-xs', labelKey: 'giveaways.platforms.xboxSeries', labelDefault: 'Xbox Series' },
  { id: 'xbox-one', labelKey: 'giveaways.platforms.xboxOne', labelDefault: 'Xbox One' },
  { id: 'switch', labelKey: 'giveaways.platforms.switch', labelDefault: 'Switch' },
  { id: 'android', labelKey: 'giveaways.platforms.android', labelDefault: 'Android' },
  { id: 'ios', labelKey: 'giveaways.platforms.ios', labelDefault: 'iOS' },
  { id: 'drm-free', labelKey: 'giveaways.platforms.drmFree', labelDefault: 'DRM-Free' },
  { id: 'itchio', labelKey: 'giveaways.platforms.itchio', labelDefault: 'itch.io' },
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
      className="rounded-2xl p-4 mb-5 h-16 justify-center animate-pulse opacity-85"
    >
      <View className="flex-row items-center flex-wrap gap-y-1.5">
        <View className="w-24 h-3 rounded" style={{ backgroundColor: shimmerBg }} />
        <View className="w-8 h-3 rounded mx-1" style={{ backgroundColor: shimmerBg }} />
        <View className="w-40 h-3 rounded" style={{ backgroundColor: shimmerBg }} />
        <View className="w-16 h-3 rounded mx-1" style={{ backgroundColor: shimmerBg }} />
        <View className="w-12 h-3 rounded" style={{ backgroundColor: shimmerBg }} />
        <View className="w-10 h-3 rounded mx-1" style={{ backgroundColor: shimmerBg }} />
      </View>
    </View>
  );
}

// =========================================================================
// HIGH FIDELITY HIGHEST WORTH CAROUSEL SKELETON
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
            {/* Worth / Value Badge */}
            <View className="w-28 h-5 rounded" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }} />
            
            {/* Promo Tag Badge */}
            <View className="w-16 h-5 rounded" style={{ backgroundColor: isDark ? 'rgba(147,51,234,0.25)' : 'rgba(147,51,234,0.15)' }} />
          </View>
        </View>

        {/* Informational Details matching Carousel structure */}
        <View className="p-4 space-y-3">
          <View>
            {/* Title segment */}
            <View className="w-2/3 h-4 rounded mb-2.5" style={{ backgroundColor: shimmerBg }} />
            {/* Description block */}
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
            {/* Platform / Store link component */}
            <View className="flex-row items-center gap-1">
              <View className="w-28 h-3 rounded" style={{ backgroundColor: shimmerBg }} />
              <View className="w-3.5 h-3.5 rounded" style={{ backgroundColor: isDark ? 'rgba(147,51,234,0.15)' : 'rgba(147,51,234,0.1)' }} />
            </View>
            
            {/* Value tags */}
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
// HIGH FIDELITY CARD LIST SKELETON
// =========================================================================
function CardListSkeleton({ isDark, cardBgColor, adaptiveBorderColor, variant }: { isDark: boolean; cardBgColor: string; adaptiveBorderColor: string; variant: 'normal' | 'compact' }) {
  const shimmerBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';
  const borderLine = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';
  const mockItems = [1, 2, 3, 4, 5];

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
              {/* Full Width Image Space Frame */}
              <View style={{ height: 150, backgroundColor: shimmerBg }} className="w-full" />
              
              {/* Content text stack details */}
              <View className="p-4 space-y-3">
                <View className="w-3/4 h-4 rounded" style={{ backgroundColor: shimmerBg }} />
                <View className="w-full h-3 rounded" style={{ backgroundColor: shimmerBg }} />
                <View className="w-1/2 h-3 rounded" style={{ backgroundColor: shimmerBg }} />
                
                {/* Horizontal footer action area separation mock */}
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
              {/* Left Square Thumbnail Image frame */}
              <View 
                style={{ width: 84, height: 84, backgroundColor: shimmerBg }} 
                className="rounded-xl shrink-0 mr-3" 
              />
              
              {/* Right Side Info Stack details */}
              <View className="flex-1 justify-between h-20 py-0.5">
                <View className="space-y-2">
                  {/* Card Main Title */}
                  <View className="w-5/6 h-3.5 rounded" style={{ backgroundColor: shimmerBg }} />
                  {/* Subtitle text / Info properties */}
                  <View className="w-1/2 h-2.5 rounded" style={{ backgroundColor: shimmerBg }} />
                </View>

                {/* Bottom row platform info or utility tags */}
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

export default function GiveawayScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  
  // Initialize the translation hook tied directly to your explicit source
  const { t } = useTranslation(undefined, { i18n: i18nInstanceSource });

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [prices, setPrices] = useState(0);
  const [worth, setWorth] = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  const [showFilterBar, setShowFilterBar] = useState(false);
  const [layoutVariant, setLayoutVariant] = useState<'normal' | 'compact'>('compact');

  const backgroundColor = useThemeColor({}, 'background');
  const { themeMode, toggleTheme } = useCustomTheme();

  const isDark = themeMode === 'dark';
  const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';
  const adaptiveBorderColor = isDark ? '#3a3a45' : '#e4e4e7';

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
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCurrentPage(prev => prev + 1);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handlePrevPage = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCurrentPage(prev => Math.max(prev - 1, 1));
    scrollRef.current?.scrollTo({ y: 0, animated: true });
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
  
  // Array mapping for localized months
  const monthKeys = [
    'january', 'february', 'march', 'april', 'may', 'june',
    'july', 'august', 'september', 'october', 'november', 'december'
  ];
  const monthDefaults = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonthIndex = now.getMonth();
  const localizedMonth = t(`months.${monthKeys[currentMonthIndex]}`, monthDefaults[currentMonthIndex]);

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <ScrollView
        ref={scrollRef}
        className="flex-1 px-4 pt-10"
        style={{ backgroundColor }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* --- PREMIUM BRAND HEADER ROW --- */}
        <View className="flex-row items-center justify-between w-full mb-6">
          <View className="flex-row items-center gap-2.5 flex-1 mr-2">
            <View
              style={{ backgroundColor: '#9333ea' }}
              className="w-9 h-9 rounded-xl overflow-hidden items-center justify-center shadow-sm shrink-0"
            >
              <Image
                source={require('../../assets/images/FRAPP_ICON1.png')}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>

            <ThemedText numberOfLines={1} className="text-xl font-montBlack tracking-tight flex-shrink">
              {t('giveaways.title', 'Giveaways')}
            </ThemedText>
          </View>

          {/* Symmetrical Header Action Controls Group */}
          <View className="flex-row items-center gap-2">
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
              onPress={handleFilterBarToggle}
              style={{
                backgroundColor: showFilterBar
                  ? '#9333ea'
                  : (isDark ? '#27272a' : '#f4f4f5')
              }}
              className="w-9 h-9 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0"
            >
              <Filter
                size="18"
                color={showFilterBar ? '#ffffff' : (isDark ? '#f4f4f5' : '#3f3f46')}
                variant="Broken"
              />
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

        {/* --- UNCLIPPED HORIZONTAL SCROLLFILTER SECTION --- */}
        {showFilterBar && (
          <View className="w-full mb-5">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="-mx-4 py-1"
              style={{ height: 50 }}
              contentContainerStyle={{
                alignItems: 'center',
                gap: 8,
                paddingHorizontal: 16
              }}
            >
              {PLATFORMS.map((platform) => {
                const isSelected = selectedPlatform === platform.id;
                const localizedLabel = t(platform.labelKey, platform.labelDefault);
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
                    <ThemedText
                      style={{ color: isSelected ? '#ffffff' : (isDark ? '#a3a3b5' : '#71717a') }}
                      className={`text-xs ${isSelected ? 'font-montBlack' : 'font-montBold'}`}
                    >
                      {localizedLabel}
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
              {/* High Fidelity Worth Summary Skeleton */}
              <WorthSummarySkeleton 
                isDark={isDark}
                cardBgColor={cardBgColor} 
                adaptiveBorderColor={adaptiveBorderColor} 
              />
              {/* High Fidelity Carousel Skeleton */}
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
                  {t('giveaways.summary.prefix', 'We found ')}
                  <ThemedText style={{ color: '#22c55e' }} className="font-montBlack">{prices}</ThemedText>
                  {t('giveaways.summary.midActive', ' active game giveaways as of ')}
                  <ThemedText style={{ color: '#a855f7' }} className="font-montBlack">{day} {localizedMonth} {year}</ThemedText>
                  {t('giveaways.summary.midWorth', ', valued at a total of ')}
                  <ThemedText style={{ color: '#22c55e' }} className="font-montBlack">${worth}</ThemedText>
                  {t('giveaways.summary.suffix', '. Claim them before they expire!')}
                </ThemedText>
              </View>
              <HighestWorthCarousel />
            </>
          )
        )}

        {/* --- PRIMARY CONDITIONAL CONTENT AREA --- */}
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
              {t('giveaways.error.title', 'Connection Disrupted')}
            </ThemedText>
            <ThemedText className="font-mont text-zinc-500 dark:text-zinc-400 text-sm text-center leading-relaxed mb-6 px-4">
              {t('giveaways.error.description', "We are unable to sync up with upstream lookup pipelines right now. Check your internet access and try again.")}
            </ThemedText>
            <Button
              type="primary"
              loading={isLoading}
              onPress={() => fetchData(selectedPlatform)}
              className="w-full"
              text={t('giveaways.error.retryButton', 'Retry Connection')}
            />
          </View>
        ) : isLoading ? (
          /* High Fidelity List Card Skeletons mirroring regular data structure styles */
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
              {t('giveaways.empty.title', 'No Giveaways Found')}
            </ThemedText>
            <ThemedText className="font-mont text-zinc-500 dark:text-zinc-400 text-sm text-center leading-relaxed mb-6 px-4">
              {t('giveaways.empty.description', 'There are no active giveaways available for this platform right now.')}
            </ThemedText>
            <Button
              type="primary"
              onPress={() => handlePlatformChange('all')}
              className="w-full"
              text={t('giveaways.empty.viewAllButton', 'View All Platforms')}
            />
          </View>
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

        {/* --- BALANCED PAGINATION FOOTER TOOLBAR --- */}
        {!isLoading && !hasError && giveaways.length > 0 && (
          <View className="mt-4 w-full mb-24">
            {currentPage === 1 ? (
              // Page 1: Single Full-Width Button
              endIndex < giveaways.length && (
                <PaginationButton
                  text={t('giveaways.pagination.next', 'Next Page')}
                  onPress={handleNextPage}
                  isDark={isDark}
                />
              )
            ) : (
              // Page 2+: Split Flex Row (50/50 Layout)
              <View className="flex-row items-center gap-3 w-full">
                <View className="flex-1">
                  <PaginationButton
                    text={t('giveaways.pagination.previous', 'Previous')}
                    onPress={handlePrevPage}
                    isDark={isDark}
                  />
                </View>
                {endIndex < giveaways.length && (
                  <View className="flex-1">
                    <PaginationButton
                      text={t('giveaways.pagination.next', 'Next Page')}
                      onPress={handleNextPage}
                      isDark={isDark}
                    />
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