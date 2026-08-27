import React, { useState, useRef, useEffect } from 'react';
import {
  Image,
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
  Animated,
  ActivityIndicator
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FreeGiveaway } from '@/types';
import { useCustomTheme } from '@/context/ThemeContext';
import {
  ArrowCircleRight,
  ExportSquare,
  Share as ShareIcon,
  Star1,
  CalendarTick,
  Game,
  Gift,
  Heart,
  Shop,
  TrendDown
} from 'iconsax-react-nativejs';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Animated Favorite Button Component with Sparkle Burst
const SPARKLE_COUNT = 6;
const SPARKLE_PARTICLES = Array.from({ length: SPARKLE_COUNT }).map((_, i) => {
  const angle = (i * 2 * Math.PI) / SPARKLE_COUNT;
  return {
    x: Math.cos(angle) * 24,
    y: Math.sin(angle) * 24,
  };
});

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

interface StoreDealComparison {
  storeID: string;
  price: string;
  retailPrice: string;
  savings: string;
  dealID: string;
}

interface CheapestPriceEver {
  price: string;
  date?: number;
}

interface ExtendedDealData {
  metacriticScore?: string;
  steamRatingPercent?: string;
  steamRatingText?: string;
  steamRatingCount?: string;
  otherStores?: StoreDealComparison[];
  cheapestPriceEver?: CheapestPriceEver;
}

interface DealItemProps {
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

  const aliases: Record<string, string> = {
    'steam': 'steam',
    'epic': 'epic games store',
    'epic games': 'epic games store',
    'gog': 'gog',
    'ubisoft': 'ubisoft connect',
    'uplay': 'ubisoft connect',
    'origin': 'ea play',
    'ea': 'ea play',
    'itch.io': 'itch.io',
    'itch': 'itch.io',
  };

  Object.entries(aliases).forEach(([alias, targetKey]) => {
    if (compiledMap[targetKey]) {
      compiledMap[alias] = compiledMap[targetKey];
    }
  });

  return compiledMap;
};

export default function DealItem({ 
  giveaway, 
  variant = 'normal', 
  ctaText,
  isSaved: externalIsSaved,
  onToggleSave: externalOnToggleSave
}: DealItemProps) {
  const { themeMode } = useCustomTheme();
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [internalIsSaved, setInternalIsSaved] = useState(false);
  
  const [storeMap, setStoreMap] = useState<Record<string, StoreMeta>>(storeMetadataCache || {});
  const [extendedData, setExtendedData] = useState<ExtendedDealData | null>(null);
  const [loadingExtended, setLoadingExtended] = useState(false);

  const isSaved = externalIsSaved !== undefined ? externalIsSaved : internalIsSaved;
  const translateY = useRef(new Animated.Value(0)).current;

  const resolvedCtaText = ctaText || t('deals.claim', 'Claim');

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
    if (externalIsSaved !== undefined) return;

    let isMounted = true;
    const checkSavedStatus = async () => {
      try {
        const stored = await AsyncStorage.getItem('saved_giveaways');
        if (stored && isMounted) {
          const parsed: FreeGiveaway[] = JSON.parse(stored);
          const exists = parsed.some((item) => item.id === giveaway.id);
          setInternalIsSaved(exists);
        }
      } catch (error) {
        console.error('Failed to read saved list:', error);
      }
    };
    checkSavedStatus();
    return () => { isMounted = false; };
  }, [giveaway.id, externalIsSaved]);

  useEffect(() => {
    if (!modalVisible) return;

    let isMounted = true;
    const fetchCheapSharkExtendedMetrics = async () => {
      setLoadingExtended(true);
      try {
        const headers = { 
          'Accept': 'application/json',
          'User-Agent': 'GameDealsApp/1.0'
        };
        const rawTitle = giveaway.title || '';
        
        const baseTitle = rawTitle.split(/[-–:(\[]/)[0];
        const cleanTitle = baseTitle.replace(/[™®©!]/g, '').trim();

        let searchRes = await fetch(
          `https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(cleanTitle)}&limit=5`,
          { headers }
        );

        let searchData = searchRes.ok ? await searchRes.json() : [];

        if ((!Array.isArray(searchData) || searchData.length === 0) && cleanTitle !== rawTitle) {
          const fallbackClean = rawTitle.replace(/[™®©!]/g, '').trim();
          searchRes = await fetch(
            `https://www.cheapshark.com/api/1.0/games?title=${encodeURIComponent(fallbackClean)}&limit=5`,
            { headers }
          );
          if (searchRes.ok) searchData = await searchRes.json();
        }

        if (!Array.isArray(searchData) || searchData.length === 0) {
          if (isMounted) setLoadingExtended(false);
          return;
        }

        const gameID = searchData[0].gameID;
        let comparisons: StoreDealComparison[] = [];
        let cheapestEver: CheapestPriceEver | undefined = undefined;
        let metacritic: string | undefined = undefined;
        let steamPercent: string | undefined = undefined;
        let steamText: string | undefined = undefined;

        if (gameID) {
          const gameRes = await fetch(`https://www.cheapshark.com/api/1.0/games?id=${gameID}`, { headers });
          if (gameRes.ok) {
            const gameData = await gameRes.json();
            if (Array.isArray(gameData.deals)) {
              comparisons = gameData.deals;
            }
            cheapestEver = gameData.cheapestPriceEver;
            metacritic = gameData.info?.metacriticScore !== '0' ? gameData.info?.metacriticScore : undefined;
            steamPercent = gameData.info?.steamRatingPercent !== '0' ? gameData.info?.steamRatingPercent : undefined;
            steamText = gameData.info?.steamRatingText || undefined;
          }
        }

        if (isMounted) {
          setExtendedData({
            metacriticScore: metacritic,
            steamRatingPercent: steamPercent,
            steamRatingText: steamText,
            otherStores: comparisons,
            cheapestPriceEver: cheapestEver
          });
        }
      } catch (error) {
        console.warn('Extended metrics fetch failed:', error);
      } finally {
        if (isMounted) setLoadingExtended(false);
      }
    };

    fetchCheapSharkExtendedMetrics();
    return () => { isMounted = false; };
  }, [modalVisible, giveaway.title]);

  const handleToggleSave = async () => {
    if (externalOnToggleSave) {
      externalOnToggleSave();
      return;
    }

    try {
      const stored = await AsyncStorage.getItem('saved_giveaways');
      let parsed: FreeGiveaway[] = stored ? JSON.parse(stored) : [];

      if (isSaved) {
        parsed = parsed.filter((item) => item.id !== giveaway.id);
        setInternalIsSaved(false);
      } else {
        parsed.push(giveaway);
        setInternalIsSaved(true);
      }

      await AsyncStorage.setItem('saved_giveaways', JSON.stringify(parsed));
    } catch (error) {
      console.error('Error modifying saved list:', error);
    }
  };

  const getStoreMeta = (): StoreMeta | null => {
    const rawTarget = (giveaway.storeID || giveaway.platform || '').toString().trim().toLowerCase();
    if (!rawTarget) return null;

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
    (giveaway.platform && !/^\d+$/.test(giveaway.platform) ? giveaway.platform : t('deals.store', 'Store'));
  const currentStoreIcon = storeMetaInfo?.icon || null;

  const salePriceNum = Number.isNaN(parseFloat(giveaway.salePrice || '0')) ? 0 : parseFloat(giveaway.salePrice || '0');
  const normalPriceNum = Number.isNaN(parseFloat(giveaway.normalPrice || '0')) ? 0 : parseFloat(giveaway.normalPrice || '0');
  const isFree = salePriceNum === 0;

  const totalCashSaved = Math.max(0, normalPriceNum - salePriceNum).toFixed(2);
  const hasValidPrice = giveaway.normalPrice && normalPriceNum > salePriceNum && parseFloat(totalCashSaved) > 0;

  const lowestPriceEverVal = extendedData?.cheapestPriceEver?.price
    ? parseFloat(extendedData.cheapestPriceEver.price)
    : null;
  const isAllTimeLow = lowestPriceEverVal !== null && salePriceNum <= lowestPriceEverVal;
  const lowestPriceEverDate = extendedData?.cheapestPriceEver?.date
    ? new Date(extendedData.cheapestPriceEver.date * 1000).toLocaleDateString()
    : null;

  const handleOpenClaimSite = async (customUrl?: string) => {
    const targetUrl = customUrl || giveaway.open_giveaway_url || giveaway.game_url;
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
    const targetUrl = giveaway.open_giveaway_url || giveaway.game_url;
    if (!targetUrl) return;
    try {
      const localizedPriceText = isFree ? t('deals.free_uppercase', 'FREE') : `$${salePriceNum}`;
      const shareMessage = t('deals.share_message', {
        defaultValue: `🔥 Game Deal Alert: {{title}} is on sale for {{price}} (Saved \${{saved}}) at {{platform}}!\nGet it here: {{url}}`,
        title: giveaway.title,
        price: localizedPriceText,
        saved: totalCashSaved,
        platform: displayPlatform,
        url: targetUrl
      });

      await Share.share({
        message: shareMessage,
        title: giveaway.title,
      });
    } catch (error) {
      console.error('Error sharing link profile layer:', error);
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

  const activeSteamPercent = extendedData?.steamRatingPercent || giveaway.steamRatingPercent;
  const activeSteamText = extendedData?.steamRatingText;
  const activeMetacritic = extendedData?.metacriticScore;

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
              <Image source={{ uri: giveaway.thumbnail || giveaway.image }} className="w-full h-full" resizeMode="cover" />
              <View className="absolute inset-0 bg-black/10" />

              {hasValidPrice && (
                <View className="absolute top-1 left-1 bg-purple-600 px-1 py-0.5 rounded shadow-sm">
                  <Text className="text-[7px] font-montBlack text-white uppercase tracking-tight">
                    -${parseFloat(totalCashSaved)}
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
                  {hasValidPrice && (
                    <Text className="text-[10px] font-montBold line-through text-zinc-400 dark:text-zinc-500">
                      ${normalPriceNum.toFixed(2)}
                    </Text>
                  )}
                  <ThemedText className="font-montBlack text-[12px] text-emerald-500">
                    {isFree ? t('deals.free_uppercase', 'FREE') : `$${salePriceNum.toFixed(2)}`}
                  </ThemedText>
                </View>

                <View className="flex-row items-center gap-2">
                  <Pressable onPress={() => handleOpenClaimSite()} hitSlop={8} style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }} className="p-1.5 rounded-lg border active:opacity-60">
                    <ExportSquare size="13" color={iconColor} variant="Outline" />
                  </Pressable>
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
              <Image source={{ uri: giveaway.thumbnail || giveaway.image }} className="w-full h-full" resizeMode="cover" />
              <View className="absolute inset-0 bg-black/10" />

              <View className="absolute top-1.5 left-1.5 bg-black/70 p-1 rounded-lg border border-white/10 flex-row items-center justify-center">
                {currentStoreIcon ? (
                  <Image source={{ uri: currentStoreIcon }} style={{ width: 14, height: 14 }} className="w-3.5 h-3.5 rounded-sm" resizeMode="contain" />
                ) : (
                  <Shop size="12" color="#c084fc" variant="Bold" />
                )}
              </View>

              {hasValidPrice && (
                <View className="absolute bottom-1.5 left-1.5 bg-purple-600 px-1.5 py-0.5 rounded shadow-sm">
                  <Text className="text-[8px] font-montBlack text-white uppercase tracking-wider">
                    {t('deals.save_amount', { defaultValue: 'SAVE ${{amount}}', amount: totalCashSaved })}
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
                  {hasValidPrice && (
                    <Text className="text-[10px] font-montBold line-through text-zinc-400 dark:text-zinc-500">
                      ${normalPriceNum.toFixed(2)}
                    </Text>
                  )}
                  <ThemedText className="font-montBlack text-[12px] text-emerald-500">
                    {isFree ? t('deals.free_uppercase', 'FREE') : `$${salePriceNum.toFixed(2)}`}
                  </ThemedText>
                </View>

                <View className="flex-row items-center gap-2">
                  <FavoriteButton
                    isSaved={isSaved}
                    onToggle={handleToggleSave}
                    containerStyle={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }}
                    className="p-1.5 rounded-lg border active:opacity-60"
                    iconSize="15"
                    inactiveColor={iconColor}
                    hitSlop={10}
                  />
                  <Pressable onPress={() => handleOpenClaimSite()} hitSlop={10} style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }} className="p-1.5 rounded-lg border active:opacity-60">
                    <ExportSquare size="15" color={iconColor} variant="Outline" />
                  </Pressable>
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
              <Image source={{ uri: giveaway.image || giveaway.thumbnail }} className="w-full h-full" resizeMode="cover" />
              <View className="absolute inset-0 bg-black/10" />

              {hasValidPrice && (
                <View className="absolute top-3 left-3 bg-purple-600 px-2.5 py-1 rounded-md shadow-sm">
                  <Text className="text-[10px] font-montBlack text-white uppercase tracking-wider">
                    {t('deals.save_amount', { defaultValue: 'SAVE ${{amount}}', amount: totalCashSaved })}
                  </Text>
                </View>
              )}

              <View className="absolute bottom-3 left-3 bg-black/75 px-2 py-1 rounded-lg border border-white/10 flex-row items-center gap-1.5">
                {currentStoreIcon ? (
                  <Image source={{ uri: currentStoreIcon }} style={{ width: 16, height: 16 }} className="w-4 h-4 rounded-sm" resizeMode="contain" />
                ) : (
                  <Shop size="14" color="#c084fc" variant="Bold" />
                )}
                <Text className="text-[9px] font-montBlack text-purple-300 uppercase tracking-wider">
                  {displayPlatform}
                </Text>
              </View>
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
                <View className="flex-row items-center gap-1">
                  <ThemedText style={{ color: '#9333ea' }} className="text-[10px] font-montBlack uppercase tracking-widest">
                    {resolvedCtaText}
                  </ThemedText>
                  <ArrowCircleRight size="14" color="#9333ea" variant="Bold" />
                </View>

                <View className="flex-row items-center gap-3">
                  <View className="flex-row items-center gap-1.5">
                    {hasValidPrice && (
                      <Text className="text-[10px] font-montBold line-through text-zinc-400 dark:text-zinc-500">
                        ${normalPriceNum.toFixed(2)}
                      </Text>
                    )}
                    <ThemedText className="text-[12px] font-montBlack text-emerald-500">
                      {isFree ? t('deals.free_uppercase', 'FREE') : `$${salePriceNum.toFixed(2)}`}
                    </ThemedText>
                  </View>

                  <View className="flex-row items-center gap-2">
                    <Pressable onPress={() => handleOpenClaimSite()} hitSlop={10} style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }} className="p-2 rounded-xl border active:opacity-60">
                      <ExportSquare size="15" color={isDark ? '#a78bfa' : '#9333ea'} variant="Outline" />
                    </Pressable>

                    <FavoriteButton
                      isSaved={isSaved}
                      onToggle={handleToggleSave}
                      containerStyle={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }}
                      className="p-2 rounded-xl border active:opacity-60"
                      iconSize="15"
                      inactiveColor={isDark ? '#a78bfa' : '#9333ea'}
                      hitSlop={10}
                    />

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

      {/* DETAIL MODAL WITH ENLARGED CHEAPSHARK COMPARISONS */}
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
              {giveaway.image || giveaway.thumbnail ? (
                <Image
                  source={{ uri: giveaway.image || giveaway.thumbnail }}
                  className="w-full h-full"
                  resizeMode="cover"
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
                  <Image source={{ uri: currentStoreIcon }} style={{ width: 16, height: 16 }} className="w-4 h-4 rounded-sm" resizeMode="contain" />
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
                    {giveaway.genre || t('deals.hot_deal', 'Hot Game Deal')}
                  </ThemedText>

                  <View className="flex-row items-center gap-2">
                    {hasValidPrice && (
                      <Text className="text-[11px] font-montBold line-through text-zinc-400 dark:text-zinc-500">
                        ${normalPriceNum.toFixed(2)}
                      </Text>
                    )}
                    <View className="bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-lg">
                      <ThemedText className="text-emerald-500 font-montBlack text-xs">
                        {isFree ? t('deals.free_uppercase', 'FREE') : `$${salePriceNum.toFixed(2)}`}
                      </ThemedText>
                    </View>
                  </View>
                </View>

                <ThemedText className="font-montBlack text-xl tracking-tight mb-3 leading-tight">
                  {giveaway.title}
                </ThemedText>

                <View className="flex-row flex-wrap gap-2 mb-4">
                  {activeSteamPercent && (
                    <View style={{ backgroundColor: cardBgColor }} className="px-2.5 py-1 rounded-xl flex-row items-center gap-1.5">
                      <Star1 size="14" color="#eab308" variant="Outline" />
                      <ThemedText className="text-[10px] font-montBold opacity-85">
                        {t('deals.steam_rating', {
                          defaultValue: '{{percent}}% Steam Rating {{text}}',
                          percent: activeSteamPercent,
                          text: activeSteamText ? `(${activeSteamText})` : ''
                        })}
                      </ThemedText>
                    </View>
                  )}

                  {activeMetacritic && (
                    <View className="bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 rounded-xl flex-row items-center gap-1.5">
                      <ThemedText className="text-[10px] font-montBlack text-amber-500">
                        {t('deals.metacritic_score', { defaultValue: 'Metacritic: {{score}}', score: activeMetacritic })}
                      </ThemedText>
                    </View>
                  )}

    

                  {giveaway.publisher && (
                    <View style={{ backgroundColor: cardBgColor }} className="px-2.5 py-1 rounded-xl flex-row items-center gap-1.5">
                      <Game size="12" color={iconColor} variant="Outline" />
                      <ThemedText className="text-[10px] font-montBold opacity-85" numberOfLines={1}>
                        {giveaway.publisher}
                      </ThemedText>
                    </View>
                  )}
                </View>

                <ThemedText className="font-mont text-[12px] leading-relaxed opacity-80 mb-4">
                  {giveaway.description || giveaway.short_description || t('deals.no_description', 'No additional description provided.')}
                </ThemedText>

                {hasValidPrice && giveaway.savings && (
                  <View style={{ backgroundColor: cardBgColor }} className="rounded-xl p-3 mb-4">
                    <ThemedText className="font-montBold text-[11px] mb-1 text-purple-500">
                      {t('deals.breakdown_title', 'Deal Breakdown:')}
                    </ThemedText>
                    <ThemedText className="font-mont text-[10px] leading-relaxed opacity-85">
                      {t('deals.breakdown_body', {
                        defaultValue: `You save {{saved}} off the original retail valuation of {{original}} ({{percent}}% discount).`,
                        saved: `$${totalCashSaved}`,
                        original: `$${normalPriceNum.toFixed(2)}`,
                        percent: parseFloat(giveaway.savings).toFixed(0)
                      })}
                    </ThemedText>
                  </View>
                )}

                {lowestPriceEverVal !== null && (
                  <View style={{ backgroundColor: cardBgColor }} className="rounded-xl p-3 mb-4 flex-row items-center justify-between border border-emerald-500/20">
                    <View className="flex-1 pr-2">
                      <View className="flex-row items-center gap-1.5 mb-1">
                        <TrendDown size="16" color="#10b981" variant="Outline" />
                        <ThemedText className="font-montBold text-[11px] text-emerald-500">
                          {t('deals.lowest_price_ever', 'Lowest Price Ever')}
                        </ThemedText>
                        {isAllTimeLow && (
                          <View className="bg-emerald-500/20 px-1.5 py-0.2 rounded">
                            <Text className="text-[8px] font-montBlack text-emerald-400 uppercase">
                              {t('deals.all_time_low', 'All-Time Low!')}
                            </Text>
                          </View>
                        )}
                      </View>
                      <ThemedText className="font-mont text-[10px] leading-relaxed opacity-85">
                        {lowestPriceEverDate
                          ? t('deals.lowest_price_record', {
                              defaultValue: 'Historical low of ${{price}} reached on {{date}}',
                              price: lowestPriceEverVal.toFixed(2),
                              date: lowestPriceEverDate
                            })
                          : t('deals.lowest_price_nodate', {
                              defaultValue: 'Historical low recorded at ${{price}}',
                              price: lowestPriceEverVal.toFixed(2)
                            })}
                      </ThemedText>
                    </View>
                    <ThemedText className="font-montBlack text-sm text-emerald-500">
                      ${lowestPriceEverVal.toFixed(2)}
                    </ThemedText>
                  </View>
                )}

                {/* ENLARGED LIVE STORE COMPARISONS WITH GAP SPACING */}
                <View className="mb-4">
                  <View className="flex-row items-center justify-between mb-2.5">
                    <ThemedText className="font-montBlack text-xs uppercase tracking-wider text-purple-500">
                      {t('deals.live_store_comparisons', 'Live Store Comparisons')}
                    </ThemedText>
                    {loadingExtended && <ActivityIndicator size="small" color="#9333ea" />}
                  </View>

                  {extendedData?.otherStores && extendedData.otherStores.length > 0 ? (
                    <View style={{ backgroundColor: cardBgColor }} className="rounded-2xl p-3 gap-2.5 border border-white/5">
                      {extendedData.otherStores.map((comp) => {
                        const compStoreInfo = storeMap[comp.storeID];
                        const compStoreName = compStoreInfo?.name || t('deals.store', 'Digital Store');
                        const compIcon = compStoreInfo?.icon || null;
                        const compPriceNum = parseFloat(comp.price || '0');
                        const isCheapestStore = compPriceNum <= salePriceNum;

                        return (
                          <View key={comp.dealID} className="flex-row items-center justify-between py-2.5 px-3 rounded-xl bg-black/10">
                            <View className="flex-row items-center gap-2.5 flex-1 pr-2">
                              {compIcon ? (
                                <Image source={{ uri: compIcon }} style={{ width: 20, height: 20 }} className="w-5 h-5 rounded-sm" resizeMode="contain" />
                              ) : (
                                <Shop size="18" color={iconColor} variant="Outline" />
                              )}
                              <ThemedText className="font-montBold text-xs flex-shrink" numberOfLines={1}>
                                {compStoreName}
                              </ThemedText>
                              {isCheapestStore && (
                                <View className="bg-emerald-500/20 px-2 py-0.5 rounded-md">
                                  <Text className="text-[9px] font-montBlack text-emerald-400 uppercase">
                                    {t('deals.best_price', 'Best Price')}
                                  </Text>
                                </View>
                              )}
                            </View>

                            <View className="flex-row items-center gap-3">
                              <Text className="text-sm font-montBlack text-emerald-500">
                                ${compPriceNum.toFixed(2)}
                              </Text>
                              <Pressable
                                onPress={() => handleOpenClaimSite(`https://www.cheapshark.com/redirect?dealID=${comp.dealID}`)}
                                hitSlop={6}
                                className="bg-purple-600/20 px-3.5 py-1.5 rounded-lg border border-purple-500/30 active:opacity-60"
                              >
                                <Text className="text-[11px] font-montBold text-purple-400">
                                  {t('deals.view', 'View')}
                                </Text>
                              </Pressable>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  ) : !loadingExtended ? (
                    <ThemedText className="text-[11px] font-mont opacity-50 italic">
                      {t('deals.no_competing_offers', 'No competing store offers currently registered for this title.')}
                    </ThemedText>
                  ) : null}
                </View>
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
                    isSaved={isSaved}
                    onToggle={handleToggleSave}
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

                <Pressable
                  onPress={() => handleOpenClaimSite()}
                  style={{ backgroundColor: '#9333ea' }}
                  className="flex-1 h-11 rounded-full flex-row items-center justify-center gap-2 active:opacity-85 shadow-lg shadow-purple-500/20"
                >
                  <Gift size="16" color="#ffffff" variant="Broken" />
                  <ThemedText className="text-white font-montBlack text-xs uppercase tracking-wider">
                    {resolvedCtaText}
                  </ThemedText>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}