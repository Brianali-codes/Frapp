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
  Share,
  Image
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { ThemedText } from '@/components/ThemedText';
import { API_ENDPOINTS } from '@/constants/api';
import { Giveaway } from '@/types';
import { useCustomTheme } from '@/context/ThemeContext';
import { 
  Flash, 
  ArrowRight, 
  Share as ShareIcon, 
  Gift, 
  ExportSquare, 
  CalendarTick, 
  InfoCircle, 
  Game,
  TimerStart 
} from 'iconsax-react-nativejs';

const CORE_BANNER_HEIGHT = 160; 
const AUTOSCROLL_INTERVAL = 4000; 
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface HighestWorthCarouselProps {
  onClaimPress?: (item: Giveaway) => void;
}

// Helper to calculate relative days remaining
const getDaysRemainingText = (endDateString: string | undefined): { label: string; isDays: boolean } | null => {
  if (!endDateString || endDateString === 'N/A') return null;

  const parsedDate = Date.parse(endDateString);
  if (isNaN(parsedDate)) {
    return { label: `Ends: ${endDateString}`, isDays: false };
  }

  const targetDate = new Date(parsedDate);
  const today = new Date();
  
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return { label: 'Expired', isDays: true };
  } else if (diffDays === 0) {
    return { label: 'Ends Today', isDays: true };
  } else if (diffDays === 1) {
    return { label: '1 Day Left', isDays: true };
  } else {
    return { label: `${diffDays} Days Left`, isDays: true };
  }
};

export default function HighestWorthCarousel({ onClaimPress }: HighestWorthCarouselProps) {
  const [items, setItems] = useState<Giveaway[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Giveaway | null>(null);
  
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  
  const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const { themeMode } = useCustomTheme();
  const isDark = themeMode === 'dark';
  
  const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';
  const adaptiveBorderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
  const placeholderBg = isDark ? '#27272a' : '#e4e4e7';
  const iconColor = isDark ? '#a78bfa' : '#7c3aed';

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

  // Pause auto-scrolling when the modal is actively open
  useEffect(() => {
    if (items.length <= 1 || modalVisible) {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
        autoScrollTimer.current = null;
      }
      return;
    }

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
      const worthValue = item.worth || 'N/A';
      const hasWorth = worthValue !== 'N/A' && worthValue !== '0' && worthValue !== '$0.00';
      await Share.share({
        message: `🔥 Freebie Alert: Get "${item.title}" for FREE ${hasWorth ? `(Worth ${worthValue})` : ''} on ${item.platform || 'PC'}!\nClaim here: ${targetUrl}`,
        title: item.title,
      });
    } catch (error) {
      console.error('Error sharing giveaway:', error);
    }
  };

  // PanResponder to handle vertical swipe down to dismiss details modal
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

  const shadowStyle = Platform.select({
    ios: { 
      shadowColor: '#000000', 
      shadowOffset: { width: 0, height: isDark ? 4 : 5 }, 
      shadowOpacity: isDark ? 0.22 : 0.06, 
      shadowRadius: isDark ? 8 : 10 
    },
    android: { elevation: isDark ? 2 : 4 }
  });

  const worthValue = currentItem.worth || 'N/A';
  const hasWorth = worthValue !== 'N/A' && worthValue !== '0' && worthValue !== '$0.00';
  const daysRemainingInfo = selectedItem ? getDaysRemainingText(selectedItem.end_date) : null;

  return (
    <View className="w-full mb-6">
      <Pressable
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
                {hasWorth ? 'VALUED' : 'FREE'}
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
                View Deal Info
              </ThemedText>
              <ArrowRight size="11" color="#9333ea" variant="Bold" />
            </View>
            <ThemedText className="text-[10px] line-through decoration-red-500 font-montBlack text-emerald-500">
              {worthValue}
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

      {/* =========================================================================
          70% HEIGHT INTERACTIVE DETAIL MODAL WITH SWIPE GESTURE
          ========================================================================= */}
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
            {/* Transparent Backdrop */}
            <Pressable 
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
              onPress={() => {
                setModalVisible(false);
                setSelectedItem(null);
              }}
            />

            {/* Sheet container */}
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
              {/* Swipe/Drag Area */}
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

                {/* Floating Modern Drag Handle */}
                <View className="absolute top-3 inset-x-0 items-center">
                  <View 
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} 
                    className="w-12 h-1 rounded-full" 
                  />
                </View>

                {/* Floating Platform Badge */}
                <View className="absolute bottom-3 left-4 bg-neutral-900/90 px-2.5 py-0.5 rounded border border-purple-500/30">
                  <Text className="text-[9px] font-montBlack text-purple-400 tracking-wider uppercase">
                    {selectedItem.platform || 'Multi-platform'}
                  </Text>
                </View>
              </View>

              {/* Scrollable Details */}
              <View className="flex-1">
                <ScrollView 
                  className="flex-1 px-5 pt-4"
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 20 }}
                >
                  {/* Category & Price Breakdown Row */}
                  <View className="flex-row items-center justify-between mb-2">
                    <ThemedText className="font-mont text-xs tracking-wider uppercase opacity-60">
                      {selectedItem.type || 'Loot Drop'}
                    </ThemedText>
                    
                    <View className="flex-row items-center gap-2">
                      {selectedItem.worth && selectedItem.worth !== 'N/A' && (
                        <Text className="text-[11px] font-montBold line-through text-zinc-400 dark:text-zinc-500">
                          {selectedItem.worth}
                        </Text>
                      )}
                      <View className="bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-lg">
                        <ThemedText className="text-emerald-500 font-montBlack text-xs">
                          FREE
                        </ThemedText>
                      </View>
                    </View>
                  </View>

                  {/* Title */}
                  <ThemedText className="font-montBlack text-xl tracking-tight mb-3 leading-tight">
                    {selectedItem.title}
                  </ThemedText>

                  {/* Status Badges & Time Limits */}
                  <View className="flex-row flex-wrap gap-2 mb-4">
                    {selectedItem.status && (
                      <View style={{ backgroundColor: isDark ? '#2c2c35' : '#f1f2f6' }} className="px-2.5 py-1 rounded-xl flex-row items-center gap-1.5">
                        <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <ThemedText className="text-[10px] font-montBold opacity-85 uppercase tracking-wide">
                          {selectedItem.status}
                        </ThemedText>
                      </View>
                    )}
                    
                    {daysRemainingInfo && (
                      <View style={{ backgroundColor: isDark ? '#2c2c35' : '#f1f2f6' }} className="px-2.5 py-1 rounded-xl flex-row items-center gap-1.5">
                        {daysRemainingInfo.isDays ? (
                          <TimerStart size="12" color="#e11d48" variant="Outline" />
                        ) : (
                          <CalendarTick size="12" color={iconColor} variant="Outline" />
                        )}
                        <ThemedText className={`text-[10px] font-montBold ${daysRemainingInfo.isDays ? 'text-rose-500 dark:text-rose-400' : 'opacity-85'}`}>
                          {daysRemainingInfo.label}
                        </ThemedText>
                      </View>
                    )}

                    {selectedItem.keys_left && selectedItem.keys_left !== 'N/A' && (
                      <View style={{ backgroundColor: isDark ? '#2c2c35' : '#f1f2f6' }} className="px-2.5 py-1 rounded-xl flex-row items-center gap-1.5">
                        <InfoCircle size="12" color={iconColor} variant="Outline" />
                        <ThemedText className="text-[10px] font-montBold opacity-85">
                          Keys Left: {selectedItem.keys_left}
                        </ThemedText>
                      </View>
                    )}
                  </View>

                  {/* Description text */}
                  <ThemedText className="font-mont text-[12px] leading-relaxed opacity-80 mb-4">
                    {selectedItem.description || 'No description available for this high-value giveaway item.'}
                  </ThemedText>

                  {/* Redirection steps / Custom Instructions */}
                  {selectedItem.instructions && (
                    <View style={{ backgroundColor: isDark ? '#2c2c35' : '#f1f2f6' }} className="rounded-xl p-3 mb-2">
                      <ThemedText className="font-montBold text-[11px] mb-1 text-purple-500">
                        Instructions to Claim:
                      </ThemedText>
                      <ThemedText className="font-mont text-[10px] leading-relaxed opacity-85">
                        {selectedItem.instructions}
                      </ThemedText>
                    </View>
                  )}
                </ScrollView>

                {/* Floating Bottom Sticky Bar */}
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
                    onPress={() => handleShare(selectedItem)}
                    style={{ backgroundColor: isDark ? '#2c2c35' : '#f1f2f6' }}
                    className="flex-1 h-11 rounded-full flex-row items-center justify-center gap-2 active:opacity-75"
                  >
                    <ShareIcon size="16" color={isDark ? '#f4f4f5' : '#3f3f46'} variant="Broken" />
                    <ThemedText className="font-montBold text-xs uppercase tracking-wider">
                      Share
                    </ThemedText>
                  </Pressable>

                  <Pressable
                    onPress={() => handleOpenClaimSite(selectedItem)}
                    style={{ backgroundColor: '#9333ea' }}
                    className="flex-1 h-11 rounded-full flex-row items-center justify-center gap-2 active:opacity-85 shadow-lg shadow-purple-500/20"
                  >
                    <Gift size="16" color="#ffffff" variant="Broken" />
                    <ThemedText className="text-white font-montBlack text-xs uppercase tracking-wider">
                      Claim Now
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