import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  ImageBackground, 
  Pressable, 
  Platform, 
  Animated, 
  Text, 
  Linking, 
  Modal, 
  ScrollView, 
  Dimensions, 
  PanResponder, 
  Share
} from 'react-native';
import { Image } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { ThemedText } from '@/components/ThemedText';
import { API_ENDPOINTS } from '@/constants/api';
import { Giveaway } from '@/types';
import { useCustomTheme } from '@/context/ThemeContext';
import { 
  Flash, 
  ArrowRight, 
  Share as ShareIcon, 
  Gift, 
  CalendarTick, 
  InfoCircle, 
  Game,
  TimerStart,
  Heart,
  Star1,
  Shop
} from 'iconsax-react-nativejs';

const CORE_BANNER_HEIGHT = 160; 
const AUTOSCROLL_INTERVAL = 5000; 
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

// Sparkle Burst Particle Constants
const SPARKLE_COUNT = 6;
const SPARKLE_PARTICLES = Array.from({ length: SPARKLE_COUNT }).map((_, i) => {
  const angle = (i * 2 * Math.PI) / SPARKLE_COUNT;
  return {
    x: Math.cos(angle) * 24,
    y: Math.sin(angle) * 24,
  };
});

// GamerPower Native Platform Icon Dictionary
const GAMERPOWER_PLATFORMS_MAP: Record<string, { name: string; icon: string }> = {
  'steam': { name: 'Steam', icon: 'https://www.svgrepo.com/show/452107/steam.svg' },
  'epic-games-store': { name: 'Epic Games', icon: 'https://www.cheapshark.com/img/stores/icons/24.png' },
  'epic games': { name: 'Epic Games', icon: 'https://www.cheapshark.com/img/stores/icons/24.png' },
  'epic': { name: 'Epic Games', icon: 'https://www.cheapshark.com/img/stores/icons/24.png' },
  'gog': { name: 'GOG', icon: 'https://www.cheapshark.com/img/stores/icons/6.png' },
  'ubisoft': { name: 'Ubisoft', icon: 'https://www.cheapshark.com/img/stores/icons/13.png' },
  'uplay': { name: 'Ubisoft', icon: 'https://www.cheapshark.com/img/stores/icons/13.png' },
  'origin': { name: 'EA Play', icon: 'https://www.cheapshark.com/img/stores/icons/7.png' },
  'ea': { name: 'EA Play', icon: 'https://www.cheapshark.com/img/stores/icons/7.png' },
  'itch.io': { name: 'itch.io', icon: 'https://www.svgrepo.com/show/452232/itch-io.svg' },
  'itchio': { name: 'itch.io', icon: 'https://www.svgrepo.com/show/452232/itch-io.svg' },
  'ps5': { name: 'PS5', icon: 'https://www.svgrepo.com/show/452087/playstation.svg' },
  'ps4': { name: 'PS4', icon: 'https://www.svgrepo.com/show/452087/playstation.svg' },
  'playstation': { name: 'PlayStation', icon: 'https://www.svgrepo.com/show/452087/playstation.svg' },
  'xbox-series-xs': { name: 'Xbox Series', icon: 'https://www.svgrepo.com/show/303368/xbox-9-logo.svg' },
  'xbox-one': { name: 'Xbox One', icon: 'https://www.svgrepo.com/show/452137/xbox.svg' },
  'xbox': { name: 'Xbox', icon: 'https://www.svgrepo.com/show/452137/xbox.svg' },
  'switch': { name: 'Switch', icon: 'https://www.svgrepo.com/show/388137/nintendo-switch.svg' },
  'android': { name: 'Android', icon: 'https://www.svgrepo.com/show/475427/android.svg' },
  'ios': { name: 'iOS', icon: 'https://www.svgrepo.com/show/494331/apple-round.svg' },
  'drm-free': { name: 'DRM-Free', icon: 'https://www.svgrepo.com/show/477064/unlock.svg' },
  'pc': { name: 'PC', icon: 'https://www.svgrepo.com/show/382713/windows-applications.svg' },
};

interface CheapSharkStore {
  storeID: string;
  storeName: string;
  isActive: number;
  images: {
    banner: string;
    logo: string;
    icon: string;
  };
}

interface StoreMeta {
  name: string;
  icon: string;
}

let storeMetadataCache: Record<string, StoreMeta> | null = null;
let isStoreFetchPending = false;

const compileStoreDictionary = (rawStores: CheapSharkStore[]): Record<string, StoreMeta> => {
  const compiledMap: Record<string, StoreMeta> = {};

  rawStores.forEach((s) => {
    const iconPath = s.images?.icon || '';
    const fullIcon = iconPath.startsWith('http')
      ? iconPath
      : `https://www.cheapshark.com${iconPath}`;

    const meta: StoreMeta = {
      name: s.storeName,
      icon: fullIcon
    };

    compiledMap[s.storeID] = meta;
    compiledMap[s.storeName.toLowerCase()] = meta;
  });

  return compiledMap;
};

interface FavoriteButtonProps {
  isSaved: boolean;
  onToggle: () => void;
  containerStyle?: any;
  className?: string;
  iconSize?: string;
  inactiveColor?: string;
  hitSlop?: number | { top?: number; bottom?: number; left?: number; right?: number };
}

function FavoriteButton({
  isSaved,
  onToggle,
  containerStyle,
  className,
  iconSize = '18',
  inactiveColor,
  hitSlop
}: FavoriteButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    if (!isSaved) {
      sparkleAnim.setValue(0);
      scaleAnim.setValue(0.75);

      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          tension: 200,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 0.8, duration: 90, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, friction: 4, useNativeDriver: true }),
      ]).start();
    }

    onToggle();
  };

  return (
    <View className="relative items-center justify-center">
      {SPARKLE_PARTICLES.map((sparkle, idx) => {
        const sparkleScale = sparkleAnim.interpolate({
          inputRange: [0, 0.4, 1],
          outputRange: [0, 1.2, 0],
        });
        const sparkleOpacity = sparkleAnim.interpolate({
          inputRange: [0, 0.7, 1],
          outputRange: [1, 1, 0],
        });
        const translateX = sparkleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, sparkle.x],
        });
        const translateY = sparkleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, sparkle.y],
        });

        return (
          <Animated.View
            key={idx}
            pointerEvents="none"
            style={{
              position: 'absolute',
              transform: [{ translateX }, { translateY }, { scale: sparkleScale }],
              opacity: sparkleOpacity,
              zIndex: 10,
            }}
          >
            <Star1 size="10" color="#22c55e" variant="Bold" />
          </Animated.View>
        );
      })}

      <Pressable
        onPress={handlePress}
        hitSlop={hitSlop}
        style={containerStyle}
        className={className}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Heart
            size={iconSize}
            color={isSaved ? '#22c55e' : inactiveColor}
            variant={isSaved ? 'Bold' : 'Outline'}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
}

interface HighestWorthCarouselProps {
  onClaimPress?: (item: Giveaway) => void;
}

export default function HighestWorthCarousel({ onClaimPress }: HighestWorthCarouselProps) {
  const { t } = useTranslation();
  const [items, setItems] = useState<Giveaway[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Giveaway | null>(null);
  const [localIsSaved, setLocalIsSaved] = useState(false);
  const [storeMap, setStoreMap] = useState<Record<string, StoreMeta>>(storeMetadataCache || {});
  const [containerWidth, setContainerWidth] = useState(SCREEN_WIDTH - 48);
  
  const slideAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  // Touch claim animation scale state
  const claimScale = useRef(new Animated.Value(1)).current;

  // Live countdown state
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  } | null>(null);
  
  const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const { themeMode } = useCustomTheme();
  const isDark = themeMode === 'dark';
  
  const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';
  const adaptiveBorderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
  const placeholderBg = isDark ? '#27272a' : '#e4e4e7';
  const iconColor = isDark ? '#a78bfa' : '#7c3aed';
  const iconBtnBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';
  const iconBtnBorder = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';

  const padZero = (n: number) => String(n).padStart(2, '0');

  // Load store metadata for store logos and names
  useEffect(() => {
    let isMounted = true;

    const loadStoreMetadata = async () => {
      if (storeMetadataCache) {
        if (isMounted) setStoreMap(storeMetadataCache);
        return;
      }

      try {
        const storedMap = await AsyncStorage.getItem('cheapshark_stores_map_v5');
        if (storedMap) {
          const parsed = JSON.parse(storedMap);
          storeMetadataCache = parsed;
          if (isMounted) setStoreMap(parsed);
          return;
        }

        if (!isStoreFetchPending) {
          isStoreFetchPending = true;
          const res = await fetch('https://www.cheapshark.com/api/1.0/stores', {
            headers: { 
              'Accept': 'application/json',
              'User-Agent': 'GameDealsApp/1.0'
            }
          });
          if (res.ok) {
            const rawStores: CheapSharkStore[] = await res.json();
            const compiled = compileStoreDictionary(rawStores);

            storeMetadataCache = compiled;
            await AsyncStorage.setItem('cheapshark_stores_map_v5', JSON.stringify(compiled));
            if (isMounted) setStoreMap(compiled);
          }
        }
      } catch (error) {
        console.error('Failed to synchronize CheapShark store dictionary:', error);
      } finally {
        isStoreFetchPending = false;
      }
    };

    loadStoreMetadata();
    return () => { isMounted = false; };
  }, []);

  // Reset slide animation position when active index changes
  useEffect(() => {
    slideAnim.setValue(0);
  }, [activeIndex]);

  // Helper to retrieve resolved Store Name & Icon
  const getStoreMeta = (item: Giveaway | null): StoreMeta | null => {
    if (!item) return null;
    const rawTarget = (item.platforms || item.platform || (item as any).storeID || '').toString().trim().toLowerCase();
    if (!rawTarget) return null;

    for (const key of Object.keys(GAMERPOWER_PLATFORMS_MAP)) {
      if (rawTarget === key || rawTarget.includes(key)) {
        return GAMERPOWER_PLATFORMS_MAP[key];
      }
    }

    if (storeMap[rawTarget]) return storeMap[rawTarget];

    for (const key of Object.keys(storeMap)) {
      if (key.length > 2 && rawTarget.includes(key)) {
        return storeMap[key];
      }
    }

    return null;
  };

  // Reset drag animation whenever modal visibility changes
  useEffect(() => {
    if (modalVisible) {
      translateY.setValue(0);
    }
  }, [modalVisible]);

  // Real-time tick timer calculating remaining duration down to seconds
  useEffect(() => {
    if (!selectedItem?.end_date || selectedItem.end_date === 'N/A') {
      setTimeLeft(null);
      return;
    }

    const parsedDate = Date.parse(selectedItem.end_date);
    if (isNaN(parsedDate)) {
      setTimeLeft(null);
      return;
    }

    const updateCountdown = () => {
      const now = Date.now();
      const diff = parsedDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);

    return () => clearInterval(timerInterval);
  }, [selectedItem?.end_date]);

  // Sync saved state from AsyncStorage whenever selectedItem changes
  useEffect(() => {
    if (!selectedItem) return;

    const checkSavedStatus = async () => {
      try {
        const stored = await AsyncStorage.getItem('saved_giveaways');
        if (stored) {
          const parsed: Giveaway[] = JSON.parse(stored);
          const exists = parsed.some((item) => item.id === selectedItem.id);
          setLocalIsSaved(exists);
        } else {
          setLocalIsSaved(false);
        }
      } catch (error) {
        console.error('Failed to read saved list in carousel modal:', error);
        setLocalIsSaved(false);
      }
    };

    checkSavedStatus();
  }, [selectedItem]);

  const handleToggleSave = async (item: Giveaway) => {
    const nextSavedState = !localIsSaved;
    setLocalIsSaved(nextSavedState);

    try {
      const stored = await AsyncStorage.getItem('saved_giveaways');
      let parsed: Giveaway[] = stored ? JSON.parse(stored) : [];

      if (!nextSavedState) {
        parsed = parsed.filter((entry) => entry.id !== item.id);
      } else {
        parsed.push(item);
      }

      await AsyncStorage.setItem('saved_giveaways', JSON.stringify(parsed));
    } catch (error) {
      console.error('Error modifying saved list in AsyncStorage:', error);
    }
  };

  const handleClaimPressIn = () => {
    Animated.spring(claimScale, {
      toValue: 0.93,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handleClaimPressOut = () => {
    Animated.spring(claimScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 25,
      bounciness: 8,
    }).start();
  };

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

  const nextIndex = items.length > 0 ? (activeIndex === items.length - 1 ? 0 : activeIndex + 1) : 0;

  useEffect(() => {
    if (items.length <= 1 || modalVisible || containerWidth === 0) {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
        autoScrollTimer.current = null;
      }
      return;
    }

    autoScrollTimer.current = setInterval(() => {
      Animated.timing(slideAnim, {
        toValue: -containerWidth,
        duration: 450,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
        }
      });
    }, AUTOSCROLL_INTERVAL);

    return () => {
      if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    };
  }, [items, slideAnim, modalVisible, containerWidth]);

  const handleCardPress = (item: Giveaway) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleOpenClaimSite = async (item: Giveaway) => {
    onClaimPress?.(item);

    const targetUrl = item.open_giveaway_url || item.open_giveaway || item.game_url;
    if (!targetUrl) return;
    
    try {
      await WebBrowser.openBrowserAsync(targetUrl, {
        toolbarColor: isDark ? '#2c2c35' : '#f1f2f6',
        controlsColor: '#9333ea', 
        secondaryToolbarColor: isDark ? '#1c1c1e' : '#ffffff',
        enableBarCollapsing: true,
        showTitle: true,
      });
    } catch (error) {
      console.error('Failed to launch in-app web view layer inside carousel:', error);
      const canOpen = await Linking.canOpenURL(targetUrl);
      if (canOpen) {
        await Linking.openURL(targetUrl);
      }
    }
  };

  const handleShare = async (item: Giveaway) => {
    const targetUrl = item.open_giveaway_url || item.open_giveaway || item.game_url;
    if (!targetUrl) return;
    try {
      const worthVal = item.worth || 'N/A';
      const plainSavedVal = worthVal.replace(/[^0-9.]/g, '');
      const meta = getStoreMeta(item);
      const platformName = meta?.name || item.platform || item.platforms || 'PC';
      
      const shareMessage = t('deals.share_message', {
        title: item.title,
        price: t('deals.free_uppercase'),
        saved: plainSavedVal || '0',
        platform: platformName,
        url: targetUrl
      });

      await Share.share({
        message: shareMessage,
        title: item.title,
      });
    } catch (error) {
      console.error('Error sharing giveaway:', error);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT * 0.7,
            duration: 220,
            useNativeDriver: true,
          }).start(() => {
            setModalVisible(false);
            setSelectedItem(null);
            translateY.setValue(0);
          });
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            friction: 6,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  if (loading) {
    return (
      <View className="w-full mb-6">
        <View style={{ height: 265, backgroundColor: placeholderBg }} className="w-full rounded-2xl opacity-30 animate-pulse" />
      </View>
    );
  }

  if (items.length === 0) return null;

  const currentItem = items[activeIndex];

  const selectedStoreMeta = getStoreMeta(selectedItem);
  const selectedDisplayPlatform = selectedStoreMeta?.name || selectedItem?.platform || selectedItem?.platforms || t('deals.store', 'Digital Store');
  const selectedStoreIcon = selectedStoreMeta?.icon || null;

  const shadowStyle = Platform.select({
    ios: { 
      shadowColor: '#000000', 
      shadowOffset: { width: 0, height: isDark ? 4 : 5 }, 
      shadowOpacity: isDark ? 0.22 : 0.06, 
      shadowRadius: isDark ? 8 : 10 
    },
    android: { elevation: isDark ? 2 : 4 }
  });

  const selectedItemWorth = selectedItem?.worth || 'N/A';
  const selectedItemHasWorth = selectedItemWorth !== 'N/A' && selectedItemWorth !== '0' && selectedItemWorth !== '$0.00';

  const renderCardContent = (item: Giveaway, rankIndex: number) => {
    const meta = getStoreMeta(item);
    const platform = meta?.name || item.platform || item.platforms || t('deals.store', 'Digital Store');
    const storeIcon = meta?.icon || null;
    const worth = item.worth || 'N/A';

    return (
      <View style={{ width: containerWidth }} className="w-full">
        <View style={{ height: CORE_BANNER_HEIGHT }} className="w-full relative bg-zinc-900 overflow-hidden">
          <ImageBackground source={{ uri: item.image }} className="w-full h-full" resizeMode="cover">
            <View className="absolute inset-0 bg-black/15" />

            {/* TOP LEFT VALUE BADGE */}
            <View className="absolute top-3 left-3 bg-black/75 px-2.5 py-1 rounded-md border border-white/10 z-10">
              <View className="flex-row items-center gap-1">
                <Flash size="10" color="#eab308" variant="Bold" />
                <Text className="text-[9px] font-montBlack text-yellow-500 tracking-wider">
                  TOP #{rankIndex + 1} VALUE
                </Text>
              </View>
            </View>

            {/* TOP RIGHT STORE ICON & NAME BADGE */}
            <View className="absolute top-3 right-3 bg-black/75 px-2 py-1 rounded-lg border border-white/10 flex-row items-center gap-1.5 z-10">
              {storeIcon ? (
                <Image source={{ uri: storeIcon }} style={{ width: 16, height: 16 }} contentFit="contain" />
              ) : (
                <Shop size="14" color="#c084fc" variant="Bold" />
              )}
              <Text className="text-[9px] font-montBlack text-purple-300 uppercase tracking-wider">
                {platform}
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View className="p-4 space-y-2">
          <View>
            <ThemedText numberOfLines={1} className="font-montBlack text-base tracking-tight mb-0.5">
              {item.title}
            </ThemedText>
            <ThemedText numberOfLines={2} className="text-zinc-500 dark:text-zinc-400 text-xs leading-snug font-mont">
              {item.description}
            </ThemedText>
          </View>

          <View style={{ borderTopWidth: 1, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }} className="flex-row items-center justify-between pt-2.5 mt-0.5">
            <View className="flex-row items-center gap-1">
              <ThemedText style={{ color: '#9333ea' }} className="text-[10px] font-montBlack uppercase tracking-widest">
                {t('deals.breakdown_title')}
              </ThemedText>
              <ArrowRight size="11" color="#9333ea" variant="Bold" />
            </View>
            <ThemedText className="text-[10px] line-through decoration-red-500 font-montBlack text-emerald-500">
              {worth}
            </ThemedText>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View className="w-full mb-6">
      <Pressable
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
        onPress={() => handleCardPress(currentItem)}
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
        <View style={{ width: '100%', overflow: 'hidden' }}>
          <Animated.View 
            style={{ 
              flexDirection: 'row', 
              width: containerWidth * 2,
              transform: [{ translateX: slideAnim }]
            }}
          >
            {/* Current Active Card */}
            {renderCardContent(currentItem, activeIndex)}

            {/* Next Card Sliding In */}
            {items[nextIndex] && renderCardContent(items[nextIndex], nextIndex)}
          </Animated.View>
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

      {/* 70% HEIGHT INTERACTIVE DETAIL MODAL */}
      <Modal
        visible={modalVisible && !!selectedItem}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedItem(null);
        }}
      >
        {selectedItem && (
          <View className="flex-1 justify-end">
            <Pressable 
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              onPress={() => {
                setModalVisible(false);
                setSelectedItem(null);
              }}
            />

            <Animated.View 
              style={{ 
                height: SCREEN_HEIGHT * 0.7, 
                backgroundColor: isDark ? '#1e1e24' : '#ffffff',
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
                overflow: 'hidden',
                transform: [{ translateY }]
              }}
              className="w-full flex-col shadow-2xl"
            >
              <View 
                {...panResponder.panHandlers} 
                className="w-full h-[35%] relative bg-zinc-950"
              >
                {selectedItem.image ? (
                  <Image
                    source={{ uri: selectedItem.image }}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover"
                  />
                ) : (
                  <View className="w-full h-full items-center justify-center bg-zinc-900">
                    <Game size="40" color="#9333ea" variant="Broken" />
                  </View>
                )}
                <View className="absolute inset-0 bg-black/35" />

                <View className="absolute top-3 inset-x-0 items-center">
                  <View 
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} 
                    className="w-12 h-1 rounded-full" 
                  />
                </View>

                {/* MODAL HEADER STORE ICON BADGE */}
                <View className="absolute bottom-3 left-4 bg-neutral-900/90 px-2.5 py-1 rounded-lg border border-purple-500/30 flex-row items-center gap-2">
                  {selectedStoreIcon ? (
                    <Image source={{ uri: selectedStoreIcon }} style={{ width: 16, height: 16 }} contentFit="contain" />
                  ) : (
                    <Shop size="14" color="#c084fc" variant="Bold" />
                  )}
                  <Text className="text-[10px] font-montBlack text-purple-400 tracking-wider uppercase">
                    {selectedDisplayPlatform}
                  </Text>
                </View>
              </View>

              <View className="flex-1">
                <ScrollView 
                  className="flex-1 px-5 pt-4"
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 20 }}
                >
                  <View className="flex-row items-center justify-between mb-2">
                    <ThemedText className="font-mont text-xs tracking-wider uppercase opacity-60">
                      {selectedItem.type || 'Free Game Loot'}
                    </ThemedText>
                    
                    <View className="flex-row items-center gap-2">
                      {selectedItemHasWorth && (
                        <Text className="text-[11px] font-montBold line-through text-zinc-400 dark:text-zinc-500">
                          {selectedItemWorth}
                        </Text>
                      )}
                      <View className="bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-lg">
                        <ThemedText className="text-emerald-500 font-montBlack text-xs">
                          {t('deals.free_uppercase')}
                        </ThemedText>
                      </View>
                    </View>
                  </View>

                  <ThemedText className="font-montBlack text-xl tracking-tight mb-3 leading-tight">
                    {selectedItem.title}
                  </ThemedText>

                  <View className="flex-row flex-wrap gap-2 mb-4">
                    {selectedItem.status && (
                      <View style={{ backgroundColor: cardBgColor }} className="px-2.5 py-1 rounded-xl flex-row items-center gap-1.5">
                        <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <ThemedText className="text-[10px] font-montBold opacity-85 uppercase tracking-wide">
                          {selectedItem.status}
                        </ThemedText>
                      </View>
                    )}
                    
                    {timeLeft ? (
                      <View style={{ backgroundColor: cardBgColor }} className="px-2.5 py-1 rounded-xl flex-row items-center gap-1.5">
                        <TimerStart size="12" color={timeLeft.isExpired ? '#f43f5e' : '#e11d48'} variant="Outline" />
                        <ThemedText className={`text-[10px] font-montBold ${timeLeft.isExpired ? 'text-rose-500' : 'text-rose-500 dark:text-rose-400'}`}>
                          {timeLeft.isExpired
                            ? 'Expired'
                            : `${timeLeft.days > 0 ? `${timeLeft.days}d ` : ''}${padZero(timeLeft.hours)}h ${padZero(timeLeft.minutes)}m ${padZero(timeLeft.seconds)}s left`}
                        </ThemedText>
                      </View>
                    ) : (
                      <View style={{ backgroundColor: cardBgColor }} className="px-2.5 py-1 rounded-xl flex-row items-center gap-1.5">
                        <CalendarTick size="12" color={iconColor} variant="Outline" />
                        <ThemedText className="text-[10px] font-montBold opacity-85">
                          {selectedItem.end_date && selectedItem.end_date !== 'N/A' ? selectedItem.end_date : 'Limited Time'}
                        </ThemedText>
                      </View>
                    )}

                    {selectedItem.keys_left && selectedItem.keys_left !== 'N/A' && (
                      <View style={{ backgroundColor: cardBgColor }} className="px-2.5 py-1 rounded-xl flex-row items-center gap-1.5">
                        <InfoCircle size="12" color={iconColor} variant="Outline" />
                        <ThemedText className="text-[10px] font-montBold opacity-85">
                          Keys Left: {selectedItem.keys_left}
                        </ThemedText>
                      </View>
                    )}
                  </View>

                  <ThemedText className="font-mont text-[12px] leading-relaxed opacity-80 mb-4">
                    {selectedItem.description || t('deals.no_description')}
                  </ThemedText>

                  {selectedItem.instructions ? (
                    <View style={{ backgroundColor: cardBgColor }} className="rounded-xl p-3 mb-2">
                      <ThemedText className="font-montBold text-[11px] mb-1 text-purple-500">
                        {t('giveaways.tracking.instructions_title')}
                      </ThemedText>
                      <ThemedText className="font-mont text-[10px] leading-relaxed opacity-85">
                        {selectedItem.instructions}
                      </ThemedText>
                    </View>
                  ) : selectedItemHasWorth && (
                    <View style={{ backgroundColor: cardBgColor }} className="rounded-xl p-3 mb-2">
                      <ThemedText className="font-montBold text-[11px] mb-1 text-purple-500">
                        {t('deals.breakdown_title')}
                      </ThemedText>
                      <ThemedText className="font-mont text-[10px] leading-relaxed opacity-85">
                        {t('deals.breakdown_body', { saved: selectedItemWorth, original: selectedItemWorth, percent: '100' })}
                      </ThemedText>
                    </View>
                  )}
                </ScrollView>

                {/* Bottom Sticky Action Bar */}
                <View 
                  style={{ 
                    borderTopWidth: 1, 
                    borderColor: adaptiveBorderColor,
                    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
                    backgroundColor: isDark ? '#1e1e24' : '#ffffff'
                  }}
                  className="flex-row items-center gap-3 px-5 pt-3.5"
                >
                  <View className="flex-row items-center gap-3">
                    <FavoriteButton
                      isSaved={localIsSaved}
                      onToggle={() => handleToggleSave(selectedItem)}
                      containerStyle={{ backgroundColor: cardBgColor }}
                      className="w-11 h-11 rounded-2xl flex-row items-center justify-center active:opacity-75"
                      iconSize="18"
                      inactiveColor={isDark ? '#a78bfa' : '#7c3aed'}
                    />

                    <Pressable
                      onPress={() => handleShare(selectedItem)}
                      hitSlop={10} 
                      style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }} 
                      className="p-2.5 rounded-xl border active:opacity-60"
                    >
                      <ShareIcon size="16" color={isDark ? "#a78bfa" : "#7c3aed"} variant="Broken" />
                    </Pressable>
                  </View>

                  <Animated.View style={{ flex: 1, transform: [{ scale: claimScale }] }}>
                    <Pressable
                      onPressIn={handleClaimPressIn}
                      onPressOut={handleClaimPressOut}
                      onPress={() => handleOpenClaimSite(selectedItem)}
                      style={{ backgroundColor: '#9333ea' }}
                      className="w-full h-11 rounded-full flex-row items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
                    >
                      <Gift size="16" color="#ffffff" variant="Broken" />
                      <ThemedText className="text-white font-montBlack text-xs uppercase tracking-wider">
                        {t('deals.claim')}
                      </ThemedText>
                    </Pressable>
                  </Animated.View>
                </View>
              </View>
            </Animated.View>
          </View>
        )}
      </Modal>
    </View>
  );
}