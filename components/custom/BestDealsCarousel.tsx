import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  ImageBackground, 
  Image,
  Pressable, 
  Platform, 
  Animated, 
  Text, 
  Linking,
  Modal,
  ScrollView,
  Dimensions,
  PanResponder,
  Share,
  ActivityIndicator
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { ThemedText } from '@/components/ThemedText';
import { FreeGiveaway } from '@/types'; 
import { useCustomTheme } from '@/context/ThemeContext';
import { 
  Flash, 
  ArrowRight, 
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
const CORE_BANNER_HEIGHT = 160; 
const AUTOSCROLL_INTERVAL = 4500; 

// Animated Favorite Button Component with Sparkle Burst
const SPARKLE_COUNT = 6;
const SPARKLE_PARTICLES = Array.from({ length: SPARKLE_COUNT }).map((_, i) => {
  const angle = (i * 2 * Math.PI) / SPARKLE_COUNT;
  return {
    x: Math.cos(angle) * 26,
    y: Math.sin(angle) * 26,
  };
});

interface FavoriteButtonProps {
  isSaved: boolean;
  onToggle: () => void;
  cardBgColor: string;
  isDark: boolean;
}

function FavoriteButton({ isSaved, onToggle, cardBgColor, isDark }: FavoriteButtonProps) {
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
      {/* Sparkle Particles Burst */}
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
        style={{ backgroundColor: cardBgColor }}
        className="w-11 h-11 rounded-2xl flex-row items-center justify-center active:opacity-75"
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Heart
            size="18"
            color={isSaved ? '#22c55e' : isDark ? '#a78bfa' : '#7c3aed'}
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

interface BestDealsCarouselProps {
  onDealPress?: (item: FreeGiveaway) => void;
}

// Global in-memory store cache
let storeMetadataCache: Record<string, StoreMeta> | null = null;
let isStoreFetchPending = false;

export default function BestDealsCarousel({ onDealPress }: BestDealsCarouselProps) {
  const { t } = useTranslation();
  const [items, setItems] = useState<FreeGiveaway[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<FreeGiveaway | null>(null);
  const [localIsSaved, setLocalIsSaved] = useState(false);

  // Dynamic Store Map State
  const [storeMap, setStoreMap] = useState<Record<string, StoreMeta>>(storeMetadataCache || {});

  // Extended CheapShark metrics state for Modal
  const [extendedData, setExtendedData] = useState<ExtendedDealData | null>(null);
  const [loadingExtended, setLoadingExtended] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const { themeMode } = useCustomTheme();
  const isDark = themeMode === 'dark';

  const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';
  const adaptiveBorderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
  const placeholderBg = isDark ? '#27272a' : '#e4e4e7';
  const iconColor = isDark ? '#a78bfa' : '#7c3aed';
  const iconBtnBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';
  const iconBtnBorder = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';

  // 1. Dynamic Store Metadata Lookup & Storage Sync
  useEffect(() => {
    let isMounted = true;

    const loadStoreMetadata = async () => {
      if (storeMetadataCache) {
        if (isMounted) setStoreMap(storeMetadataCache);
        return;
      }

      try {
        const storedMap = await AsyncStorage.getItem('cheapshark_stores_map');
        if (storedMap) {
          const parsed = JSON.parse(storedMap);
          storeMetadataCache = parsed;
          if (isMounted) setStoreMap(parsed);
          return;
        }

        if (!isStoreFetchPending) {
          isStoreFetchPending = true;
          const res = await fetch('https://www.cheapshark.com/api/1.0/stores');
          if (res.ok) {
            const rawStores: CheapSharkStore[] = await res.json();
            const compiledMap: Record<string, StoreMeta> = {};

            rawStores.forEach((s) => {
              compiledMap[s.storeID] = {
                name: s.storeName,
                icon: `https://www.cheapshark.com${s.images.icon}`
              };
            });

            storeMetadataCache = compiledMap;
            await AsyncStorage.setItem('cheapshark_stores_map', JSON.stringify(compiledMap));
            if (isMounted) setStoreMap(compiledMap);
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

  // Reset drag position whenever modal visibility changes
  useEffect(() => {
    if (modalVisible) {
      translateY.setValue(0);
    }
  }, [modalVisible]);

  // Sync saved status from AsyncStorage when selectedItem changes
  useEffect(() => {
    if (!selectedItem) return;

    const checkSavedStatus = async () => {
      try {
        const stored = await AsyncStorage.getItem('saved_giveaways');
        if (stored) {
          const parsed: FreeGiveaway[] = JSON.parse(stored);
          const exists = parsed.some((item) => item.id === selectedItem.id);
          setLocalIsSaved(exists);
        } else {
          setLocalIsSaved(false);
        }
      } catch (error) {
        console.error('Failed to read saved list in best deals modal:', error);
        setLocalIsSaved(false);
      }
    };

    checkSavedStatus();
  }, [selectedItem]);

  // Fetch CheapShark ratings, lowest price ever & live multi-store comparison when modal opens
  useEffect(() => {
    if (!modalVisible || !selectedItem) return;

    let isMounted = true;
    const fetchCheapSharkExtendedMetrics = async () => {
      const dealId = selectedItem.id;
      if (!dealId) return;

      setLoadingExtended(true);
      try {
        const dealRes = await fetch(`https://www.cheapshark.com/api/1.0/deals?id=${dealId}`);
        if (!dealRes.ok) throw new Error('Failed to fetch deal metrics');
        const dealData = await dealRes.json();

        const gameID = dealData.gameInfo?.gameID;
        let comparisons: StoreDealComparison[] = [];
        let cheapestEver: CheapestPriceEver | undefined = undefined;

        if (gameID) {
          const gameRes = await fetch(`https://www.cheapshark.com/api/1.0/games?id=${gameID}`);
          if (gameRes.ok) {
            const gameData = await gameRes.json();
            if (Array.isArray(gameData.deals)) {
              comparisons = gameData.deals;
            }
            cheapestEver = gameData.cheapestPriceEver;
          }
        }

        if (isMounted) {
          setExtendedData({
            metacriticScore: dealData.gameInfo?.metacriticScore !== '0' ? dealData.gameInfo?.metacriticScore : undefined,
            steamRatingPercent: dealData.gameInfo?.steamRatingPercent !== '0' ? dealData.gameInfo?.steamRatingPercent : undefined,
            steamRatingText: dealData.gameInfo?.steamRatingText || undefined,
            steamRatingCount: dealData.gameInfo?.steamRatingCount || undefined,
            otherStores: comparisons,
            cheapestPriceEver: cheapestEver
          });
        }
      } catch (error) {
        console.error('Error fetching extended CheapShark payload:', error);
      } finally {
        if (isMounted) setLoadingExtended(false);
      }
    };

    fetchCheapSharkExtendedMetrics();
    return () => { isMounted = false; };
  }, [modalVisible, selectedItem]);

  const handleToggleSave = async (item: FreeGiveaway) => {
    const nextSavedState = !localIsSaved;
    setLocalIsSaved(nextSavedState);

    try {
      const stored = await AsyncStorage.getItem('saved_giveaways');
      let parsed: FreeGiveaway[] = stored ? JSON.parse(stored) : [];

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

  useEffect(() => {
    const fetchBestValueDeals = async () => {
      try {
        const url = `https://www.cheapshark.com/api/1.0/deals?sortBy=DealRating&onSale=1&pageSize=5`;
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'FrappApp/1.1 (React Native)',
          },
        });
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
              description: deal.salePrice === '0.00' 
                ? t('deals.no_description', { defaultValue: 'No additional description provided.' })
                : t('deals.carousel_description', {
                    defaultValue: 'Score a flawless {{rating}}/10 deal index rating! Instantly pocket ${{saved}} in savings.',
                    rating: deal.dealRating,
                    saved: totalSaved
                  }),
              open_giveaway_url: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`,
              worth: markdownPrice === 0 ? t('deals.free_uppercase', { defaultValue: 'FREE' }) : `$${deal.salePrice}`,
              platform: deal.storeID,
              storeID: deal.storeID,
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
        loading && setLoading(false);
      }
    };

    fetchBestValueDeals();
  }, [t]);

  // Autoplay cycle (paused while modal is displayed)
  useEffect(() => {
    if (items.length <= 1 || modalVisible) return;

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
  }, [items, fadeAnim, modalVisible]);

  const handleCardPress = (item: FreeGiveaway) => {
    onDealPress?.(item);
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleOpenDealLink = async (customUrl?: string) => {
    const targetUrl = customUrl || selectedItem?.open_giveaway_url;
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
      console.error('In-app browser layout layer execution failed:', error);
      Linking.openURL(targetUrl);
    }
  };

  const handleShare = async (item: FreeGiveaway) => {
    if (!item.open_giveaway_url) return;
    const storeInfo = storeMap[item.storeID || item.platform || ''];
    const platformName = storeInfo?.name || t('deals.store', { defaultValue: 'Digital Store' });

    try {
      const shareMessage = t('deals.share_message', {
        defaultValue: `🔥 Game Deal Alert: {{title}} is on sale for {{price}} (Saved {{saved}}) at {{platform}}!\nGet it here: {{url}}`,
        title: item.title,
        price: item.worth,
        saved: item.savings ? `${item.savings}%` : `$${(parseFloat(item.normalPrice || '0') - parseFloat(item.salePrice || '0')).toFixed(2)}`,
        platform: platformName,
        url: item.open_giveaway_url
      });

      await Share.share({
        message: shareMessage,
        title: item.title,
      });
    } catch (error) {
      console.error('Error sharing carousel deal payload:', error);
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
            setExtendedData(null);
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

  const currentDeal = items[activeIndex];
  const currentStoreInfo = storeMap[currentDeal.storeID || currentDeal.platform || ''];
  const currentStoreName = currentStoreInfo?.name || t('deals.store', { defaultValue: 'Digital Store' });
  const currentStoreIcon = currentStoreInfo?.icon || null;

  const shadowStyle = Platform.select({
    ios: { 
      shadowColor: '#000000', 
      shadowOffset: { width: 0, height: isDark ? 4 : 5 }, 
      shadowOpacity: isDark ? 0.22 : 0.06, 
      shadowRadius: isDark ? 8 : 10 
    },
    android: { elevation: isDark ? 2 : 4 }
  });

  const selSalePriceNum = parseFloat(selectedItem?.salePrice || '0');
  const selNormalPriceNum = parseFloat(selectedItem?.normalPrice || '0');
  const selTotalCashSaved = Math.max(0, selNormalPriceNum - selSalePriceNum).toFixed(2);

  const selStoreInfo = storeMap[selectedItem?.storeID || selectedItem?.platform || ''];
  const selStoreName = selStoreInfo?.name || t('deals.store', { defaultValue: 'Digital Store' });
  const selStoreIcon = selStoreInfo?.icon || null;

  const activeSteamPercent = extendedData?.steamRatingPercent || selectedItem?.steamRatingPercent;
  const activeSteamText = extendedData?.steamRatingText;
  const activeMetacritic = extendedData?.metacriticScore;

  // Lowest Price Ever calculations for modal
  const lowestPriceEverVal = extendedData?.cheapestPriceEver?.price
    ? parseFloat(extendedData.cheapestPriceEver.price)
    : null;
  const isAllTimeLow = lowestPriceEverVal !== null && selSalePriceNum <= lowestPriceEverVal;
  const lowestPriceEverDate = extendedData?.cheapestPriceEver?.date
    ? new Date(extendedData.cheapestPriceEver.date * 1000).toLocaleDateString()
    : null;

  return (
    <View className="w-full mb-6">
      <Pressable
        onPress={() => handleCardPress(currentDeal)}
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
          <ImageBackground source={{ uri: currentDeal.image }} className="w-full h-full" resizeMode="cover">
            <View className="absolute inset-0 bg-black/25" />

            {/* Top-Left Rank & Savings Badges */}
            <View className="absolute top-3 left-3 flex-row items-center gap-1.5">
              {currentDeal.savings && (
                <View className="bg-purple-600 px-2.5 py-1 rounded-md shadow-sm">
                  <Text className="text-[10px] font-montBlack text-white uppercase tracking-wider">
                    {t('deals.save_amount', { defaultValue: 'SAVE ${{amount}}', amount: currentDeal.savings })}
                  </Text>
                </View>
              )}
            </View>

            {/* Top-Right Deal Store Logo & Name Overlay */}
            <View className="absolute top-3 right-3 bg-black/75 px-2 py-1 rounded-lg border border-white/10 flex-row items-center gap-1.5">
              {currentStoreIcon ? (
                <Image source={{ uri: currentStoreIcon }} className="w-4 h-4 rounded-sm" resizeMode="contain" />
              ) : (
                <Shop size="14" color="#c084fc" variant="Bold" />
              )}
              <Text className="text-[9px] font-montBlack text-purple-300 uppercase tracking-wider">
                {currentStoreName}
              </Text>
            </View>
          </ImageBackground>
        </Animated.View>

        <View className="p-4 space-y-2">
          <View>
            <ThemedText numberOfLines={1} className="font-montBlack text-base tracking-tight mb-0.5">
              {currentDeal.title}
            </ThemedText>
            <ThemedText numberOfLines={2} className="text-zinc-500 dark:text-zinc-400 text-xs leading-snug font-mont">
              {currentDeal.description}
            </ThemedText>
          </View>

          <View style={{ borderTopWidth: 1, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }} className="flex-row items-center justify-between pt-2.5 mt-0.5">
            <View className="flex-row items-center gap-1">
              <ThemedText style={{ color: '#9333ea' }} className="text-[10px] font-montBlack uppercase tracking-widest">
                {t('deals.titleClaim', { defaultValue: 'Claim' }).replace('.', '')}
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

      {/* 70% HEIGHT INTERACTIVE DETAIL MODAL WITH CHEAPSHARK COMPARISONS */}
      <Modal
        visible={modalVisible && !!selectedItem}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
          setSelectedItem(null);
          setExtendedData(null);
        }}
      >
        {selectedItem && (
          <View className="flex-1 justify-end">
            <Pressable 
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              onPress={() => {
                setModalVisible(false);
                setSelectedItem(null);
                setExtendedData(null);
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

                {/* Dynamic Store Logo Badge Overlay */}
                <View className="absolute bottom-3 left-4 bg-neutral-900/90 px-2.5 py-1 rounded-lg border border-purple-500/30 flex-row items-center gap-2">
                  {selStoreIcon ? (
                    <Image source={{ uri: selStoreIcon }} className="w-4 h-4 rounded-sm" resizeMode="contain" />
                  ) : (
                    <Shop size="14" color="#c084fc" variant="Bold" />
                  )}
                  <Text className="text-[10px] font-montBlack text-purple-400 tracking-wider uppercase">
                    {selStoreName}
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
                      {t('deals.hot_deal', { defaultValue: 'Hot Game Deal' })}
                    </ThemedText>

                    <View className="flex-row items-center gap-2">
                      {selectedItem.normalPrice && (
                        <Text className="text-[11px] font-montBold line-through text-zinc-400 dark:text-zinc-500">
                          ${selNormalPriceNum.toFixed(2)}
                        </Text>
                      )}
                      <View className="bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-lg">
                        <ThemedText className="text-emerald-500 font-montBlack text-xs">
                          {selectedItem.worth}
                        </ThemedText>
                      </View>
                    </View>
                  </View>

                  <ThemedText className="font-montBlack text-xl tracking-tight mb-3 leading-tight">
                    {selectedItem.title}
                  </ThemedText>

                  {/* Status & Trust Badges Row */}
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

                    <View style={{ backgroundColor: cardBgColor }} className="px-2.5 py-1 rounded-xl flex-row items-center gap-1.5">
                      <CalendarTick size="12" color={iconColor} variant="Outline" />
                      <ThemedText className="text-[10px] font-montBold opacity-85">
                        {t('deals.verified_promo', { defaultValue: 'Verified Promo' })}
                      </ThemedText>
                    </View>
                  </View>

                  <ThemedText className="font-mont text-[12px] leading-relaxed opacity-80 mb-4">
                    {selectedItem.description}
                  </ThemedText>

                  {selectedItem.normalPrice && selectedItem.savings && (
                    <View style={{ backgroundColor: cardBgColor }} className="rounded-xl p-3 mb-4">
                      <ThemedText className="font-montBold text-[11px] mb-1 text-purple-500">
                        {t('deals.breakdown_title', { defaultValue: 'Deal Breakdown:' })}
                      </ThemedText>
                      <ThemedText className="font-mont text-[10px] leading-relaxed opacity-85">
                        {t('deals.breakdown_body', {
                          defaultValue: `You save {{saved}} off the original retail valuation of {{original}} ({{percent}}% discount).`,
                          saved: `$${selTotalCashSaved}`,
                          original: `$${selNormalPriceNum.toFixed(2)}`,
                          percent: selectedItem.savings
                        })}
                      </ThemedText>
                    </View>
                  )}

                  {/* HISTORICAL LOWEST PRICE EVER SECTION */}
                  {lowestPriceEverVal !== null && (
                    <View style={{ backgroundColor: cardBgColor }} className="rounded-xl p-3 mb-4 flex-row items-center justify-between border border-emerald-500/20">
                      <View className="flex-1 pr-2">
                        <View className="flex-row items-center gap-1.5 mb-1">
                          <TrendDown size="16" color="#10b981" variant="Outline" />
                          <ThemedText className="font-montBold text-[11px] text-emerald-500">
                            {t('deals.lowest_price_ever', { defaultValue: 'Lowest Price Ever' })}
                          </ThemedText>
                          {isAllTimeLow && (
                            <View className="bg-emerald-500/20 px-1.5 py-0.2 rounded">
                              <Text className="text-[8px] font-montBlack text-emerald-400 uppercase">
                                {t('deals.all_time_low', { defaultValue: 'All-Time Low!' })}
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

                  {/* LIVE MULTI-STORE PRICE COMPARISON SECTION */}
                  <View className="mb-4">
                    <View className="flex-row items-center justify-between mb-2">
                      <ThemedText className="font-montBlack text-xs uppercase tracking-wider text-purple-500">
                        {t('deals.live_store_comparisons', { defaultValue: 'Live Store Comparisons' })}
                      </ThemedText>
                      {loadingExtended && <ActivityIndicator size="small" color="#9333ea" />}
                    </View>

                    {extendedData?.otherStores && extendedData.otherStores.length > 0 ? (
                      <View style={{ backgroundColor: cardBgColor }} className="rounded-2xl p-2.5 space-y-2 border border-white/5">
                        {extendedData.otherStores.map((comp) => {
                          const compStoreInfo = storeMap[comp.storeID];
                          const compStoreName = compStoreInfo?.name || t('deals.store', { defaultValue: 'Digital Store' });
                          const compIcon = compStoreInfo?.icon || null;
                          const compPriceNum = parseFloat(comp.price || '0');
                          const isCheapestStore = compPriceNum <= selSalePriceNum;

                          return (
                            <View key={comp.dealID} className="flex-row items-center justify-between py-1.5 px-2 rounded-xl bg-black/10">
                              <View className="flex-row items-center gap-2">
                                {compIcon ? (
                                  <Image source={{ uri: compIcon }} className="w-4 h-4 rounded" resizeMode="contain" />
                                ) : (
                                  <Shop size="14" color={iconColor} variant="Outline" />
                                )}
                                <ThemedText className="font-montBold text-[11px]">
                                  {compStoreName}
                                </ThemedText>
                                {isCheapestStore && (
                                  <View className="bg-emerald-500/20 px-1.5 py-0.2 rounded">
                                    <Text className="text-[8px] font-montBlack text-emerald-400 uppercase">
                                      {t('deals.best_price', { defaultValue: 'Best Price' })}
                                    </Text>
                                  </View>
                                )}
                              </View>

                              <View className="flex-row items-center gap-2">
                                <Text className="text-[11px] font-montBlack text-emerald-500">
                                  ${compPriceNum.toFixed(2)}
                                </Text>
                                <Pressable
                                  onPress={() => handleOpenDealLink(`https://www.cheapshark.com/redirect?dealID=${comp.dealID}`)}
                                  className="bg-purple-600/20 px-2 py-1 rounded-lg border border-purple-500/30 active:opacity-60"
                                >
                                  <Text className="text-[9px] font-montBold text-purple-400">
                                    {t('deals.view', { defaultValue: 'View' })}
                                  </Text>
                                </Pressable>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    ) : !loadingExtended ? (
                      <ThemedText className="text-[11px] font-mont opacity-50 italic">
                        {t('deals.no_competing_offers', { defaultValue: 'No competing store offers currently registered for this title.' })}
                      </ThemedText>
                    ) : null}
                  </View>
                </ScrollView>

                {/* Bottom Action Bar */}
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
                      cardBgColor={cardBgColor}
                      isDark={isDark}
                    />

                    <Pressable
                      onPress={() => handleShare(selectedItem)}
                      hitSlop={10} 
                      style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }} 
                      className="p-2.5 rounded-xl border active:opacity-60"
                    >
                      <ShareIcon size="16" color={isDark ? "#a78bfa" : "#7c3aed"} variant="Outline" />
                    </Pressable>
                  </View>

                  <Pressable
                    onPress={() => handleOpenDealLink()}
                    style={{ backgroundColor: '#9333ea' }}
                    className="flex-1 h-11 rounded-full flex-row items-center justify-center gap-2 active:opacity-85 shadow-lg shadow-purple-500/20"
                  >
                    <Gift size="16" color="#ffffff" variant="Broken" />
                    <ThemedText className="text-white font-montBlack text-xs uppercase tracking-wider">
                      {t('deals.claim', { defaultValue: 'Claim' })}
                    </ThemedText>
                  </Pressable>
                </View>
              </View>
            </Animated.View>
          </View>
        )}
      </Modal>
    </View>
  );
}