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
  Share
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useTranslation } from 'react-i18next';
import { ThemedText } from '@/components/ThemedText';
import { FreeGiveaway } from '@/types'; 
import { useCustomTheme } from '@/context/ThemeContext';
import { Flash, ArrowRight, Share as ShareIcon, Star, CalendarTick, Game, Gift } from 'iconsax-react-nativejs';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const CORE_BANNER_HEIGHT = 160; 
const AUTOSCROLL_INTERVAL = 4500; 

interface BestDealsCarouselProps {
  onDealPress?: (item: FreeGiveaway) => void;
}

export default function BestDealsCarousel({ onDealPress }: BestDealsCarouselProps) {
  const { t } = useTranslation();
  const [items, setItems] = useState<FreeGiveaway[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const { themeMode } = useCustomTheme();
  const isDark = themeMode === 'dark';
  
  const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';
  const adaptiveBorderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
  const placeholderBg = isDark ? '#27272a' : '#e4e4e7';
  const iconColor = isDark ? '#a78bfa' : '#7c3aed';

  const getStoreLabel = (id: string) => {
    switch (id?.toString()) {
      case '1': return 'Steam';
      case '3': return 'GreenManGaming';
      case '7': return 'GOG';
      case '11': return 'Epic Games Store';
      case '25': return 'Epic Games Store';
      case '34': return 'Amazon';
      default: return t('deals.store');
    }
  };

  useEffect(() => {
    const fetchBestValueDeals = async () => {
      try {
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
              description: deal.salePrice === '0.00' 
                ? t('deals.no_description')
                : `Score a flawless ${deal.dealRating}/10 deal index rating! Instantly pocket $${totalSaved} in savings on ${getStoreLabel(deal.storeID)}.`,
              open_giveaway_url: `https://www.cheapshark.com/redirect?dealID=${deal.dealID}`,
              worth: markdownPrice === 0 ? t('deals.free_uppercase') : `$${deal.salePrice}`,
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

  const handleOpenDealLink = async (item: FreeGiveaway) => {
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

  const handleShare = async (item: FreeGiveaway) => {
    if (!item.open_giveaway_url) return;
    try {
      const shareMessage = t('deals.share_message', {
        title: item.title,
        price: item.worth,
        saved: item.savings ? `${item.savings}%` : `$${(parseFloat(item.normalPrice || '0') - parseFloat(item.salePrice || '0')).toFixed(2)}`,
        platform: getStoreLabel(item.platform),
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

  // Drag Gesture Engine to manage bottom sheet swiping
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 5;
      },
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

  const shadowStyle = Platform.select({
    ios: { 
      shadowColor: '#000000', 
      shadowOffset: { width: 0, height: isDark ? 4 : 5 }, 
      shadowOpacity: isDark ? 0.22 : 0.06, 
      shadowRadius: isDark ? 8 : 10 
    },
    android: { elevation: isDark ? 2 : 4 }
  });

  const salePriceNum = parseFloat(currentDeal.salePrice || '0');
  const normalPriceNum = parseFloat(currentDeal.normalPrice || '0');
  const totalCashSaved = (normalPriceNum - salePriceNum).toFixed(2);

  return (
    <View className="w-full mb-6">
      <Pressable
        onPress={() => {
          onDealPress?.(currentDeal);
          setModalVisible(true);
        }}
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

            {/* Premium Value Rating Badge */}
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
                {t('deals.save_amount', { amount: currentDeal.savings }).replace('$', '')}
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
                {t('deals.titleClaim').replace('.', '')}
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

      {/* =========================================================================
          70% HEIGHT INTERACTIVE DETAIL MODAL WITH SWIPE GESTURE
          ========================================================================= */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-end">
          {/* Transparent Backdrop to detect tap-outside dismissal */}
          <Pressable 
            style={{ ...Platform.select({ web: { cursor: 'default' } }), position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
            onPress={() => setModalVisible(false)}
          />

          {/* Sheet container constrained to 70% height */}
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
            {/* Gesture banner area (Image + Swipe Indicator overlay) */}
            <View 
              {...panResponder.panHandlers} 
              className="w-full h-[35%] relative bg-zinc-950"
            >
              {currentDeal.image ? (
                <Image
                  source={{ uri: currentDeal.image }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-full h-full items-center justify-center bg-zinc-900">
                  <Game size="40" color="#9333ea" variant="Broken" />
                </View>
              )}
              <View className="absolute inset-0 bg-black/35" />

              {/* Floating visual drag handle bar */}
              <View className="absolute top-3 inset-x-0 items-center">
                <View 
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} 
                  className="w-12 h-1 rounded-full" 
                />
              </View>

              {/* Floating Platform Badge */}
              <View className="absolute bottom-3 left-4 bg-neutral-900/90 px-2.5 py-0.5 rounded border border-purple-500/30">
                <Text className="text-[9px] font-montBlack text-purple-400 tracking-wider uppercase">
                  {getStoreLabel(currentDeal.platform)}
                </Text>
              </View>
            </View>

            {/* Scrollable Information Body */}
            <View className="flex-1">
              <ScrollView 
                className="flex-1 px-5 pt-4"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
              >
                {/* Value Rank & Pricing Line */}
                <View className="flex-row items-center justify-between mb-2">
                  <ThemedText className="font-mont text-xs tracking-wider uppercase opacity-60">
                    {t('deals.hot_deal')}
                  </ThemedText>
                  
                  <View className="flex-row items-center gap-2">
                    {currentDeal.normalPrice && (
                      <Text className="text-[11px] font-montBold line-through text-zinc-400 dark:text-zinc-500">
                        ${normalPriceNum.toFixed(2)}
                      </Text>
                    )}
                    <View className="bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-lg">
                      <ThemedText className="text-emerald-500 font-montBlack text-xs">
                        {currentDeal.worth}
                      </ThemedText>
                    </View>
                  </View>
                </View>

                {/* Title */}
                <ThemedText className="font-montBlack text-xl tracking-tight mb-3 leading-tight">
                  {currentDeal.title}
                </ThemedText>

                {/* Status Info Chips */}
                <View className="flex-row flex-wrap gap-2 mb-4">
                  <View style={{ backgroundColor: cardBgColor }} className="px-2.5 py-1 rounded-xl flex-row items-center gap-1.5">
                    <Star size="12" color={iconColor} variant="Bold" />
                    <ThemedText className="text-[10px] font-montBold opacity-85">
                      {t('deals.rating', { percent: '100' }).replace('100%', 'Top Choice')}
                    </ThemedText>
                  </View>
                  <View style={{ backgroundColor: cardBgColor }} className="px-2.5 py-1 rounded-xl flex-row items-center gap-1.5">
                    <CalendarTick size="12" color={iconColor} variant="Outline" />
                    <ThemedText className="text-[10px] font-montBold opacity-85">
                      Verified Promo
                    </ThemedText>
                  </View>
                </View>

                {/* Description Body */}
                <ThemedText className="font-mont text-[12px] leading-relaxed opacity-80 mb-4">
                  {currentDeal.description}
                </ThemedText>

                {/* Savings Breakdown Callout Block */}
                {currentDeal.normalPrice && currentDeal.savings && (
                  <View style={{ backgroundColor: cardBgColor }} className="rounded-xl p-3 mb-2">
                    <ThemedText className="font-montBold text-[11px] mb-1 text-purple-500">
                      {t('deals.breakdown_title')}
                    </ThemedText>
                    <ThemedText className="font-mont text-[10px] leading-relaxed opacity-85">
                      {t('deals.breakdown_body', {
                        saved: `$${totalCashSaved}`,
                        original: `$${normalPriceNum.toFixed(2)}`,
                        percent: currentDeal.savings
                      })}
                    </ThemedText>
                  </View>
                )}
              </ScrollView>

              {/* Action Buttons Sticky Footer */}
              <View 
                style={{ 
                  borderTopWidth: 1, 
                  borderColor: adaptiveBorderColor,
                  paddingBottom: Platform.OS === 'ios' ? 30 : 15,
                  backgroundColor: isDark ? '#1e1e24' : '#ffffff'
                }}
                className="flex-row items-center gap-3 px-5 pt-3.5"
              >
                <Pressable
                  onPress={() => handleShare(currentDeal)}
                  style={{ backgroundColor: cardBgColor }}
                  className="flex-1 h-11 rounded-full flex-row items-center justify-center gap-2 active:opacity-75"
                >
                  <ShareIcon size="16" color={isDark ? '#f4f4f5' : '#3f3f46'} variant="Broken" />
                  <ThemedText className="font-montBold text-xs uppercase tracking-wider">
                    {t('modals.socialsTitle').split(' ')[0]}
                  </ThemedText>
                </Pressable>

                <Pressable
                  onPress={() => handleOpenDealLink(currentDeal)}
                  style={{ backgroundColor: '#9333ea' }}
                  className="flex-1 h-11 rounded-full flex-row items-center justify-center gap-2 active:opacity-85 shadow-lg shadow-purple-500/20"
                >
                  <Gift size="16" color="#ffffff" variant="Broken" />
                  <ThemedText className="text-white font-montBlack text-xs uppercase tracking-wider">
                    {t('deals.claim')}
                  </ThemedText>
                </Pressable>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}