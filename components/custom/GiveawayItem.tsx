import React, { useState, useRef, useEffect } from 'react';
import { 
  Linking, 
  View, 
  Platform, 
  Pressable, 
  Share, 
  Text, 
  Modal, 
  ScrollView, 
  Dimensions,
  PanResponder,
  Animated
} from 'react-native';
import { Image } from 'expo-image';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FreeGiveaway } from '@/types';
import { useCustomTheme } from '@/context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { 
  ArrowCircleRight, 
  ExportSquare, 
  Share as ShareIcon, 
  CalendarTick, 
  Game, 
  Gift,
  InfoCircle,
  TimerStart,
  Heart,
  Star1,
  Shop
} from 'iconsax-react-nativejs';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

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

interface GiveawayItemProps {
  giveaway: FreeGiveaway;
  variant?: 'normal' | 'compact' | 'minimal';
  ctaText?: string; 
  isSaved?: boolean;             
  onToggleSave?: () => void;     
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

export default function GiveawayItem({ 
  giveaway, 
  variant = 'normal', 
  ctaText,
  isSaved = false,
  onToggleSave = () => {} 
}: GiveawayItemProps) {
  const { themeMode } = useCustomTheme();
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [localIsSaved, setLocalIsSaved] = useState(isSaved);
  const [storeMap, setStoreMap] = useState<Record<string, StoreMeta>>(storeMetadataCache || {});
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

  const activeCtaText = ctaText || t('deals.claim');

  useEffect(() => {
    if (modalVisible) {
      translateY.setValue(0);
    }
  }, [modalVisible]);

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

  useEffect(() => {
    if (!giveaway.end_date || giveaway.end_date === 'N/A') {
      setTimeLeft(null);
      return;
    }

    const parsedDate = Date.parse(giveaway.end_date);
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
  }, [giveaway.end_date]);

  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        const stored = await AsyncStorage.getItem('saved_giveaways');
        if (stored) {
          const parsed: FreeGiveaway[] = JSON.parse(stored);
          const exists = parsed.some((item) => item.id === giveaway.id);
          setLocalIsSaved(exists);
        } else {
          setLocalIsSaved(isSaved);
        }
      } catch (error) {
        console.error('Failed to read saved list:', error);
        setLocalIsSaved(isSaved);
      }
    };
    checkSavedStatus();
  }, [giveaway.id, isSaved]);

  const handleToggle = async () => {
    const nextSavedState = !localIsSaved;
    setLocalIsSaved(nextSavedState);
    
    onToggleSave();

    try {
      const stored = await AsyncStorage.getItem('saved_giveaways');
      let parsed: FreeGiveaway[] = stored ? JSON.parse(stored) : [];

      if (!nextSavedState) {
        parsed = parsed.filter((item) => item.id !== giveaway.id);
      } else {
        parsed.push(giveaway);
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

  const handleOpenClaimSite = async () => {
    const targetUrl = giveaway.open_giveaway_url || giveaway.open_giveaway || giveaway.game_url;
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
      console.error('Failed to launch in-app web view layer:', error);
      if (targetUrl) Linking.openURL(targetUrl);
    }
  };

  const handleShare = async () => {
    const targetUrl = giveaway.open_giveaway_url || giveaway.open_giveaway || giveaway.game_url;
    if (!targetUrl) return;
    try {
      const plainSavedVal = worthValue.replace(/[^0-9.]/g, '');
      await Share.share({
        message: t('deals.share_message', {
          title: giveaway.title,
          price: t('deals.free_uppercase'),
          saved: plainSavedVal || '0',
          platform: displayPlatform,
          url: targetUrl
        }),
        title: giveaway.title,
      });
    } catch (error) {
      console.error('Error sharing giveaway:', error);
    }
  };

  const getStoreMeta = (): StoreMeta | null => {
    const rawTarget = (giveaway.platforms || giveaway.platform || giveaway.storeID || '').toString().trim().toLowerCase();
    if (!rawTarget) return null;

    // 1. Cross-check against GamerPower API platform mapping dictionary first
    for (const key of Object.keys(GAMERPOWER_PLATFORMS_MAP)) {
      if (rawTarget === key || rawTarget.includes(key)) {
        return GAMERPOWER_PLATFORMS_MAP[key];
      }
    }

    // 2. Fall back to CheapShark store dictionary
    if (storeMap[rawTarget]) return storeMap[rawTarget];

    for (const key of Object.keys(storeMap)) {
      if (key.length > 2 && rawTarget.includes(key)) {
        return storeMap[key];
      }
    }

    return null;
  };

  const storeMetaInfo = getStoreMeta();
  const displayPlatform = storeMetaInfo?.name || 
    (giveaway.platforms || giveaway.platform ? (giveaway.platforms || giveaway.platform) : t('deals.store', 'Digital Store'));
  const currentStoreIcon = storeMetaInfo?.icon || null;

  const isDark = themeMode === 'dark';
  const isCompact = variant === 'compact';
  const isMinimal = variant === 'minimal';

  const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';
  const minimalBgColor = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)';

  const adaptiveBorderColor = isDark
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.05)';

  const iconBtnBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';
  const iconBtnBorder = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
  const iconColor = isDark ? '#a78bfa' : '#7c3aed';

  const worthValue = giveaway.worth || 'N/A';
  const hasWorth = worthValue !== 'N/A' && worthValue !== '0' && worthValue !== '$0.00';
  const imageUri = giveaway.thumbnail || giveaway.image;

  const padZero = (n: number) => String(n).padStart(2, '0');

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
            toValue: SCREEN_HEIGHT,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            setModalVisible(false);
          });
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            friction: 7,
            tension: 40,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <>
      {/* MINIMAL VARIANT */}
      {isMinimal && (
        <Pressable onPress={() => setModalVisible(true)} className="active:opacity-95">
          <ThemedView
            key={giveaway.id}
            className="rounded-2xl mb-4 p-2.5 flex-row gap-3 border"
            style={{ backgroundColor: minimalBgColor, borderColor: adaptiveBorderColor }}
          >
            <View className="relative w-24 h-24 rounded-xl overflow-hidden bg-zinc-800">
              <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
              <View className="absolute inset-0 bg-black/10" />

              {/* TOP LEFT STORE ICON BADGE */}
              <View className="absolute top-1 left-1 bg-black/75 p-1 rounded-md border border-white/10 flex-row items-center justify-center z-10">
                {currentStoreIcon ? (
                  <Image source={{ uri: currentStoreIcon }} style={{ width: 12, height: 12 }} contentFit="contain" />
                ) : (
                  <Shop size="10" color="#c084fc" variant="Bold" />
                )}
              </View>

              {hasWorth && (
                <View className="absolute bottom-1 left-1 bg-purple-600 px-1 py-0.5 rounded shadow-sm">
                  <Text className="text-[7px] font-montBlack text-white uppercase tracking-tight">
                    {worthValue} {t('deals.store').toUpperCase()}
                  </Text>
                </View>
              )}
            </View>

            <View className="flex-1 justify-between py-0.5">
              <View>
                <View className="flex-row items-center justify-between mb-0.5 pr-1">
                  <ThemedText numberOfLines={1} className="font-montBlack text-sm flex-1 tracking-tight">
                    {giveaway.title}
                  </ThemedText>
                </View>
                <ThemedText className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-normal font-mont" numberOfLines={2}>
                  {giveaway.description}
                </ThemedText>
              </View>

              <View className="flex-row items-center justify-between mt-1">
                <View className="flex-row items-center gap-1.5">
                  <ThemedText className="font-montBlack text-[12px] text-emerald-500">
                    {t('deals.free_uppercase')}
                  </ThemedText>
                  {hasWorth && (
                    <Text className="text-[10px] font-montBold line-through text-zinc-400 dark:text-zinc-500">
                      {worthValue}
                    </Text>
                  )}
                </View>
                
                <View className="flex-row items-center gap-1.5">
                  <FavoriteButton
                    isSaved={localIsSaved}
                    onToggle={handleToggle}
                    containerStyle={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }}
                    className="p-1.5 rounded-lg border active:opacity-60"
                    iconSize="13"
                    inactiveColor={iconColor}
                    hitSlop={8}
                  />
                  <Animated.View style={{ transform: [{ scale: claimScale }] }}>
                    <Pressable 
                      onPressIn={handleClaimPressIn}
                      onPressOut={handleClaimPressOut}
                      onPress={handleOpenClaimSite} 
                      hitSlop={8} 
                      style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }} 
                      className="p-1.5 rounded-lg border"
                    >
                      <ExportSquare size="13" color={iconColor} variant="Outline" />
                    </Pressable>
                  </Animated.View>
                  <Pressable onPress={handleShare} hitSlop={8} style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }} className="p-1.5 rounded-lg border active:opacity-60">
                    <ShareIcon size="13" color={iconColor} variant="Outline" />
                  </Pressable>
                </View>
              </View>
            </View>
          </ThemedView>
        </Pressable>
      )}

      {/* COMPACT VARIANT */}
      {isCompact && (
        <Pressable onPress={() => setModalVisible(true)} className="active:opacity-95">
          <ThemedView
            key={giveaway.id}
            className="rounded-2xl mb-4 p-3 flex-row gap-3"
            style={[
              { backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor },
              Platform.select({
                ios: { shadowColor: '#000000', shadowOffset: { width: 0, height: isDark ? 2 : 4 }, shadowOpacity: isDark ? 0.25 : 0.06, shadowRadius: isDark ? 8 : 10 },
                android: { elevation: isDark ? 2 : 3 }
              })
            ]}
          >
            <View className="relative w-28 h-28 rounded-xl overflow-hidden bg-zinc-800">
              <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
              <View className="absolute inset-0 bg-black/10" />

              {/* TOP LEFT STORE ICON BADGE */}
              <View className="absolute top-1.5 left-1.5 bg-black/75 p-1 rounded-lg border border-white/10 flex-row items-center justify-center z-10">
                {currentStoreIcon ? (
                  <Image source={{ uri: currentStoreIcon }} style={{ width: 14, height: 14 }} contentFit="contain" />
                ) : (
                  <Shop size="12" color="#c084fc" variant="Bold" />
                )}
              </View>

              {hasWorth && (
                <View className="absolute bottom-1.5 left-1.5 bg-purple-600 px-1.5 py-0.5 rounded shadow-sm">
                  <Text className="text-[8px] font-montBlack text-white uppercase tracking-wider">
                    {worthValue} {t('deals.store').toUpperCase()}
                  </Text>
                </View>
              )}
            </View>

            <View className="flex-1 justify-between py-0.5">
              <View>
                <ThemedText numberOfLines={1} className="font-montBlack text-base tracking-tight mb-1">
                  {giveaway.title}
                </ThemedText>
                <ThemedText className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-snug font-mont" numberOfLines={2}>
                  {giveaway.description}
                </ThemedText>
              </View>

              <View className="flex-row items-center justify-between mt-1">
                <View className="flex-row items-center gap-1.5">
                  <ThemedText className="font-montBlack text-[12px] text-emerald-500">
                    {t('deals.free_uppercase')}
                  </ThemedText>
                  {hasWorth && (
                    <Text className="text-[10px] font-montBold line-through text-zinc-400 dark:text-zinc-500">
                      {worthValue}
                    </Text>
                  )}
                </View>
                
                <View className="flex-row items-center gap-1.5">
                  <FavoriteButton
                    isSaved={localIsSaved}
                    onToggle={handleToggle}
                    containerStyle={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }}
                    className="p-1.5 rounded-lg border active:opacity-60"
                    iconSize="15"
                    inactiveColor={iconColor}
                    hitSlop={10}
                  />
                  <Animated.View style={{ transform: [{ scale: claimScale }] }}>
                    <Pressable 
                      onPressIn={handleClaimPressIn}
                      onPressOut={handleClaimPressOut}
                      onPress={handleOpenClaimSite} 
                      hitSlop={10} 
                      style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }} 
                      className="p-1.5 rounded-lg border"
                    >
                      <ExportSquare size="15" color={iconColor} variant="Outline" />
                    </Pressable>
                  </Animated.View>
                  <Pressable onPress={handleShare} hitSlop={10} style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }} className="p-1.5 rounded-lg border active:opacity-60">
                    <ShareIcon size="15" color={iconColor} variant="Outline" />
                  </Pressable>
                </View>
              </View>
            </View>
          </ThemedView>
        </Pressable>
      )}

      {/* NORMAL VARIANT */}
      {!isMinimal && !isCompact && (
        <Pressable onPress={() => setModalVisible(true)} className="active:opacity-95">
          <ThemedView
            key={giveaway.id}
            className="rounded-2xl mb-5"
            style={[
              { backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor, overflow: 'hidden' },
              Platform.select({
                ios: { shadowColor: '#000000', shadowOffset: { width: 0, height: isDark ? 4 : 5 }, shadowOpacity: isDark ? 0.22 : 0.06, shadowRadius: isDark ? 8 : 10 },
                android: { elevation: isDark ? 2 : 4 }
              })
            ]}
          >
            <View className="relative w-full h-40 bg-zinc-900">
              <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} contentFit="cover" />
              <View className="absolute inset-0 bg-black/10" />

              {/* TOP LEFT STORE ICON & PLATFORM BADGE */}
              <View className="absolute top-3 left-3 bg-black/75 px-2 py-1 rounded-lg border border-white/10 flex-row items-center gap-1.5 z-10">
                {currentStoreIcon ? (
                  <Image source={{ uri: currentStoreIcon }} style={{ width: 16, height: 16 }} contentFit="contain" />
                ) : (
                  <Shop size="14" color="#c084fc" variant="Bold" />
                )}
                <Text className="text-[9px] font-montBlack text-purple-300 uppercase tracking-wider">
                  {displayPlatform}
                </Text>
              </View>

              {/* TOP RIGHT VALUE BADGE */}
              {hasWorth && (
                <View className="absolute top-3 right-3 bg-purple-600 px-2.5 py-1 rounded-md shadow-sm">
                  <Text className="text-[10px] font-montBlack text-white uppercase tracking-wider">
                    {worthValue} {t('deals.store').toUpperCase()}
                  </Text>
                </View>
              )}
            </View>

            <View className="p-4">
              <ThemedText numberOfLines={1} className="font-montBlack text-base tracking-tight mb-0.5">
                {giveaway.title}
              </ThemedText>
              <ThemedText className="text-zinc-500 dark:text-zinc-400 text-xs leading-snug font-mont mb-3" numberOfLines={2}>
                {giveaway.description}
              </ThemedText>

              <View 
                style={{ borderTopWidth: 1, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }} 
                className="flex-row items-center justify-between pt-2.5 mt-0.5"
              >
                <Animated.View style={{ transform: [{ scale: claimScale }] }}>
                  <Pressable 
                    onPressIn={handleClaimPressIn}
                    onPressOut={handleClaimPressOut}
                    onPress={handleOpenClaimSite}
                    className="flex-row items-center gap-1"
                  >
                    <ThemedText style={{ color: '#9333ea' }} className="text-[10px] font-montBlack uppercase tracking-widest">
                      {activeCtaText}
                    </ThemedText>
                    <ArrowCircleRight size="14" color="#9333ea" variant="Bold" />
                  </Pressable>
                </Animated.View>

                <View className="flex-row items-center gap-3">
                  <View className="flex-row items-center gap-1.5">
                    <ThemedText className="text-[12px] font-montBlack text-emerald-500">
                      {t('deals.free_uppercase')}
                    </ThemedText>
                    {hasWorth && (
                      <Text className="text-[10px] font-montBold line-through text-zinc-400 dark:text-zinc-500">
                        {worthValue}
                      </Text>
                    )}
                  </View>

                  <View className="flex-row items-center gap-1.5">
                    <FavoriteButton
                      isSaved={localIsSaved}
                      onToggle={handleToggle}
                      containerStyle={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }}
                      className="p-2 rounded-xl border active:opacity-60"
                      iconSize="15"
                      inactiveColor={isDark ? '#a78bfa' : '#9333ea'}
                      hitSlop={10}
                    />

                    <Animated.View style={{ transform: [{ scale: claimScale }] }}>
                      <Pressable 
                        onPressIn={handleClaimPressIn}
                        onPressOut={handleClaimPressOut}
                        onPress={handleOpenClaimSite} 
                        hitSlop={10} 
                        style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }} 
                        className="p-2 rounded-xl border"
                      >
                        <ExportSquare size="15" color={isDark ? '#a78bfa' : '#9333ea'} variant="Outline" />
                      </Pressable>
                    </Animated.View>

                    <Pressable onPress={handleShare} hitSlop={10} style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }} className="p-2 rounded-xl border active:opacity-60">
                       <ShareIcon size="15" color={isDark ? '#a78bfa' : '#9333ea'} variant="Outline" />
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </ThemedView>
        </Pressable>
      )}

      {/* 70% HEIGHT INTERACTIVE DETAIL MODAL */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end">
          <Pressable 
            style={{ ...Platform.select({ web: { cursor: 'default' } }), position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            onPress={() => setModalVisible(false)}
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
              {imageUri ? (
                <Image
                  source={{ uri: imageUri }}
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

              <View className="absolute bottom-3 left-4 bg-neutral-900/90 px-2.5 py-1 rounded-lg border border-purple-500/30 flex-row items-center gap-2">
                {currentStoreIcon ? (
                  <Image source={{ uri: currentStoreIcon }} style={{ width: 16, height: 16 }} contentFit="contain" />
                ) : (
                  <Shop size="14" color="#c084fc" variant="Bold" />
                )}
                <Text className="text-[10px] font-montBlack text-purple-400 tracking-wider uppercase">
                  {displayPlatform}
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
                    {giveaway.type || 'Free Game Loot'}
                  </ThemedText>
                  
                  <View className="flex-row items-center gap-2">
                    {hasWorth && (
                      <Text className="text-[11px] font-montBold line-through text-zinc-400 dark:text-zinc-500">
                        {worthValue}
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
                  {giveaway.title}
                </ThemedText>

                <View className="flex-row flex-wrap gap-2 mb-4">
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
                        {giveaway.end_date && giveaway.end_date !== 'N/A' ? giveaway.end_date : 'Limited Time'}
                      </ThemedText>
                    </View>
                  )}

                  {giveaway.keys_left && giveaway.keys_left !== 'N/A' && (
                    <View style={{ backgroundColor: cardBgColor }} className="px-2.5 py-1 rounded-xl flex-row items-center gap-1.5">
                      <InfoCircle size="12" color={iconColor} variant="Outline" />
                      <ThemedText className="text-[10px] font-montBold opacity-85">
                        Keys Left: {giveaway.keys_left}
                      </ThemedText>
                    </View>
                  )}
                </View>

                <ThemedText className="font-mont text-[12px] leading-relaxed opacity-80 mb-4">
                  {giveaway.description || t('deals.no_description')}
                </ThemedText>

                {giveaway.instructions ? (
                  <View style={{ backgroundColor: cardBgColor }} className="rounded-xl p-3 mb-2">
                    <ThemedText className="font-montBold text-[11px] mb-1 text-purple-500">
                      {t('giveaways.tracking.instructions_title')}
                    </ThemedText>
                    <ThemedText className="font-mont text-[10px] leading-relaxed opacity-85">
                      {giveaway.instructions}
                    </ThemedText>
                  </View>
                ) : hasWorth && (
                  <View style={{ backgroundColor: cardBgColor }} className="rounded-xl p-3 mb-2">
                    <ThemedText className="font-montBold text-[11px] mb-1 text-purple-500">
                      {t('deals.breakdown_title')}
                    </ThemedText>
                    <ThemedText className="font-mont text-[10px] leading-relaxed opacity-85">
                      {t('deals.breakdown_body', { saved: worthValue, original: worthValue, percent: '100' })}
                    </ThemedText>
                  </View>
                )}
              </ScrollView>

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
                    onToggle={handleToggle}
                    containerStyle={{ backgroundColor: cardBgColor }}
                    className="w-11 h-11 rounded-2xl flex-row items-center justify-center active:opacity-75"
                    iconSize="18"
                    inactiveColor={isDark ? '#a78bfa' : '#7c3aed'}
                  />

                  <Pressable
                    onPress={handleShare}
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
                    onPress={handleOpenClaimSite}
                    style={{ backgroundColor: '#9333ea' }}
                    className="w-full h-11 rounded-full flex-row items-center justify-center gap-2 shadow-lg shadow-purple-500/20"
                  >
                    <Gift size="16" color="#ffffff" variant="Broken" />
                    <ThemedText className="text-white font-montBlack text-xs uppercase tracking-wider">
                      {activeCtaText}
                    </ThemedText>
                  </Pressable>
                </Animated.View>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}