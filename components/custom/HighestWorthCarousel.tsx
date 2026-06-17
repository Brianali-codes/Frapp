import React, { useEffect, useState, useRef } from 'react';
import { View, ImageBackground, Pressable, Platform, Animated, Text, Linking } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { ThemedText } from '@/components/ThemedText';
import { API_ENDPOINTS } from '@/constants/api';
import { Giveaway } from '@/types';
import { useCustomTheme } from '@/context/ThemeContext';
import { Flash, ArrowRight } from 'iconsax-react-nativejs';

const CORE_BANNER_HEIGHT = 160; 
const AUTOSCROLL_INTERVAL = 4000; 

interface HighestWorthCarouselProps {
  onClaimPress?: (item: Giveaway) => void;
}

export default function HighestWorthCarousel({ onClaimPress }: HighestWorthCarouselProps) {
  const [items, setItems] = useState<Giveaway[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
  // FIXED: Dynamic type inference handles both number (browser/RN) and NodeJS.Timeout smoothly
  const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const { themeMode } = useCustomTheme();
  const isDark = themeMode === 'dark';
  
  const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';
  const adaptiveBorderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
  const placeholderBg = isDark ? '#27272a' : '#e4e4e7';

  useEffect(() => {
    const fetchTopWorth = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.HighestWorth);
        if (!response.ok) throw new Error();
        const data: Giveaway[] = await response.json();
        if (Array.isArray(data)) {
          setItems(data.slice(0, 5));
        }
      } catch (error) {
        console.error("Couldn't sync carousel assets:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTopWorth();
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

  // Integrated native and in-app browser router
  const handleOpenClaimSite = async (item: Giveaway) => {
    // Notify parent layout if hooks are registered
    onClaimPress?.(item);

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
      console.error('Failed to launch in-app web view layer inside carousel:', error);
      // Hard fallback wrapper link routing check
      const canOpen = await Linking.canOpenURL(item.open_giveaway_url);
      if (canOpen) {
        await Linking.openURL(item.open_giveaway_url);
      }
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

  const currentItem = items[activeIndex];

  // Process visual layer configuration objects
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
        onPress={() => handleOpenClaimSite(currentItem)}
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
        <Animated.View style={{ height: CORE_BANNER_HEIGHT, opacity: fadeAnim }} className="w-full relative bg-zinc-900">
          <ImageBackground source={{ uri: currentItem.image }} className="w-full h-full" resizeMode="cover">
            <View className="absolute inset-0 bg-black/15" />

            {/* Top Left Ranking Badge */}
            <View className="absolute top-3 left-3 bg-black/75 px-2.5 py-1 rounded-md border border-white/10">
              <View className="flex-row items-center gap-1">
                <Flash size="10" color="#eab308" variant="Bold" />
                <Text className="text-[9px] font-montBlack text-yellow-500 tracking-wider">
                  TOP #{activeIndex + 1} VALUE
                </Text>
              </View>
            </View>

            {/* Top Right Worth Metric Tag */}
            <View className="absolute top-3 right-3 bg-emerald-500 px-2.5 py-0.5 rounded-md shadow-sm">
              <Text className="text-[10px] font-montBlack text-white uppercase tracking-wider">
                {currentItem.worth && currentItem.worth !== 'N/A' ? 'VALUED' : 'FREE'}
              </Text>
            </View>
          </ImageBackground>
        </Animated.View>

        <View className="p-4 space-y-2">
          <View>
            <ThemedText numberOfLines={1} className="font-montBlack text-base tracking-tight mb-0.5">
              {currentItem.title}
            </ThemedText>
            <ThemedText numberOfLines={2} className="text-zinc-500 dark:text-zinc-400 text-xs leading-snug font-mont">
              {currentItem.description}
            </ThemedText>
          </View>

          <View style={{ borderTopWidth: 1, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }} className="flex-row items-center justify-between pt-2.5 mt-0.5">
            <View className="flex-row items-center gap-1">
              <ThemedText style={{ color: '#9333ea' }} className="text-[10px] font-montBlack uppercase tracking-widest">
                Claim drop offer
              </ThemedText>
              <ArrowRight size="11" color="#9333ea" variant="Bold" />
            </View>
            <ThemedText className="text-[11px] font-montBlack text-emerald-500">
              {currentItem.worth}
            </ThemedText>
          </View>
        </View>
      </Pressable>

      {/* Indicator Dots */}
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