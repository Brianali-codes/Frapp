import React, { useEffect, useState, useRef } from 'react';
import { View, ImageBackground, Pressable, Platform, Animated, Text, Linking } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { ThemedText } from '@/components/ThemedText';
import { FreeGiveaway } from '@/types'; 
import { useCustomTheme } from '@/context/ThemeContext';
import { Flash, ArrowRight } from 'iconsax-react-nativejs';

const CORE_BANNER_HEIGHT = 160; 
const AUTOSCROLL_INTERVAL = 4500; 

interface BestDealsCarouselProps {
  onDealPress?: (item: FreeGiveaway) => void;
}

export default function BestDealsCarousel({ onDealPress }: BestDealsCarouselProps) {
  const [items, setItems] = useState<FreeGiveaway[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const { themeMode } = useCustomTheme();
  const isDark = themeMode === 'dark';
  
  const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';
  const adaptiveBorderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
  const placeholderBg = isDark ? '#27272a' : '#e4e4e7';

  const getStoreLabel = (id: string) => {
    switch (id?.toString()) {
      case '1': return 'Steam';
      case '3': return 'Amazon';
      case '7': return 'GOG';
      case '11': return 'Epic Games Store';
      default: return 'Storefront';
    }
  };

  useEffect(() => {
    const fetchBestValueDeals = async () => {
      try {
        // Query parameters configured specifically for premium value aggregation
        const url = `https://www.cheapshark.com/api/1.0/deals?sortBy=DealRating&onSale=1&pageSize=5`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('API request breakdown');
        const rawDeals = await response.json();
        
        if (Array.isArray(rawDeals)) {
          const normalized = rawDeals.map((deal: any, index: number) => {
            const pctSavings = deal.savings ? Math.round(parseFloat(deal.savings)) : 0;
            const originalPrice = parseFloat(deal.normalPrice || '0');
            const markdownPrice = parseFloat(deal.salePrice || '0');
            const totalSaved = (originalPrice - markdownPrice).toFixed(2);

            return {
              id: deal.dealID || `best-deal-${index}`,
              title: deal.title || 'Unknown Title',
              thumbnail: deal.thumb || '',
              image: deal.thumb || '',
              description: `Score a flawless ${deal.dealRating}/10 deal index rating! Instantly pocket $${totalSaved} in savings on ${getStoreLabel(deal.storeID)}.`,
              open_giveaway_url: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`,
              worth: markdownPrice === 0 ? 'FREE' : `$${deal.salePrice}`,
              platform: deal.storeID,
              normalPrice: deal.normalPrice,
              salePrice: deal.salePrice,
              savings: pctSavings.toString()
            };
          });
          setItems(normalized);
        }
      } catch (error) {
        console.error("Couldn't compile top deals carousel context payload:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBestValueDeals();
  }, []);

  useEffect(() => {
    if (items.length <= 1) return;

    autoScrollTimer.current = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0.2,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setActiveIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
        
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      });
    }, AUTOSCROLL_INTERVAL);

    return () => {
      if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    };
  }, [items, fadeAnim]);

  const handleOpenDealLink = async (item: FreeGiveaway) => {
    onDealPress?.(item);
    if (!item.open_giveaway_url) return;
    
    try {
      await WebBrowser.openBrowserAsync(item.open_giveaway_url, {
        toolbarColor: isDark ? '#2c2c35' : '#f1f2f6',
        controlsColor: '#9333ea', 
        secondaryToolbarColor: isDark ? '#1c1c1e' : '#ffffff',
        enableBarCollapsing: true,
        showTitle: true,
      });
    } catch (error) {
      console.error('In-app browser layout layer execution failed:', error);
      Linking.openURL(item.open_giveaway_url);
    }
  };

  if (loading) {
    return (
      <View className="w-full mb-6">
        <View style={{ height: 265, backgroundColor: placeholderBg }} className="w-full rounded-2xl opacity-30 animate-pulse" />
      </View>
    );
  }

  if (items.length === 0) return null;

  const currentDeal = items[activeIndex];

  const shadowStyle = Platform.select({
    ios: { 
      shadowColor: '#000000', 
      shadowOffset: { width: 0, height: isDark ? 4 : 5 }, 
      shadowOpacity: isDark ? 0.22 : 0.06, 
      shadowRadius: isDark ? 8 : 10 
    },
    android: { elevation: isDark ? 2 : 4 }
  });

  return (
    <View className="w-full mb-6">
      <Pressable
        onPress={() => handleOpenDealLink(currentDeal)}
        style={[
          { 
            borderWidth: 1, 
            borderColor: adaptiveBorderColor,
            backgroundColor: cardBgColor 
          },
          shadowStyle
        ]}
        className="rounded-2xl overflow-hidden w-full mb-2 active:opacity-95"
      >
        {/* Banner Graphic Frame Layer */}
        <Animated.View style={{ height: CORE_BANNER_HEIGHT, opacity: fadeAnim }} className="w-full relative bg-zinc-900">
          <ImageBackground source={{ uri: currentDeal.image }} className="w-full h-full" resizeMode="cover">
            <View className="absolute inset-0 bg-black/25" />

            {/* Premium Algorithm Score Badge */}
            <View className="absolute top-3 left-3 bg-neutral-900/90 px-2.5 py-1 rounded-md border border-purple-500/30">
              <View className="flex-row items-center gap-1">
                <Flash size="10" color="#a855f7" variant="Bold" />
                <Text className="text-[9px] font-montBlack text-purple-400 tracking-wider">
                  VALUE RANK #{activeIndex + 1}
                </Text>
              </View>
            </View>

            {/* Savings Percent Tag */}
            <View className="absolute top-3 right-3 bg-purple-600 px-2.5 py-0.5 rounded-md shadow-sm">
              <Text className="text-[10px] font-montBlack text-white uppercase tracking-wider">
                SAVE {currentDeal.savings}%
              </Text>
            </View>
          </ImageBackground>
        </Animated.View>

        {/* Informational Summary Text Block */}
        <View className="p-4 space-y-2">
          <View>
            <ThemedText numberOfLines={1} className="font-montBlack text-base tracking-tight mb-0.5">
              {currentDeal.title}
            </ThemedText>
            <ThemedText numberOfLines={2} className="text-zinc-500 dark:text-zinc-400 text-xs leading-snug font-mont">
              {currentDeal.description}
            </ThemedText>
          </View>

          {/* Separation Border Strip & Call to Action */}
          <View style={{ borderTopWidth: 1, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }} className="flex-row items-center justify-between pt-2.5 mt-0.5">
            <View className="flex-row items-center gap-1">
              <ThemedText style={{ color: '#9333ea' }} className="text-[10px] font-montBlack uppercase tracking-widest">
                View deal on {getStoreLabel(currentDeal.platform || '')}
              </ThemedText>
              <ArrowRight size="11" color="#9333ea" variant="Bold" />
            </View>
            
            <View className="flex-row items-center gap-1.5">
              {currentDeal.normalPrice && (
                <Text className="text-[10px] font-montBold line-through text-zinc-400 dark:text-zinc-500">
                  ${currentDeal.normalPrice}
                </Text>
              )}
              <ThemedText className="text-[12px] font-montBlack text-emerald-500">
                {currentDeal.worth}
              </ThemedText>
            </View>
          </View>
        </View>
      </Pressable>

      {/* Tracker Pagination Dots */}
      <View className="flex-row items-center justify-center gap-1.5 mt-1.5">
        {items.map((_, dotIndex) => {
          const isSelected = activeIndex === dotIndex;
          return (
            <View
              key={dotIndex}
              style={{
                width: isSelected ? 14 : 6,
                height: 6,
                backgroundColor: isSelected ? '#9333ea' : (isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)'),
                borderRadius: 999,
              }}
            />
          );
        })}
      </View>
    </View>
  );
}