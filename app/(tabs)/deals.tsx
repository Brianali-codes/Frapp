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
  Animated
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store'; // Added for local data persistence
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FreeGiveaway } from '@/types';
import { useCustomTheme } from '@/context/ThemeContext';
import { 
  ArrowCircleRight, 
  ExportSquare, 
  Share as ShareIcon, 
  CalendarTick, 
  Game, 
  Gift,
  InfoCircle,
  TimerStart,
  Heart         
} from 'iconsax-react-nativejs';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface GiveawayItemProps {
  giveaway: FreeGiveaway;
  variant?: 'normal' | 'compact' | 'minimal';
  ctaText?: string; 
  isSaved?: boolean;             
  onToggleSave?: () => void;     
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

export default function GiveawayItem({ 
  giveaway, 
  variant = 'normal', 
  ctaText = 'Claim',
  isSaved = false,
  onToggleSave = () => {} 
}: GiveawayItemProps) {
  const { themeMode } = useCustomTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [localIsSaved, setLocalIsSaved] = useState(isSaved);
  const translateY = useRef(new Animated.Value(0)).current;

  // --- PERSISTENCE LOGIC (SECURESTORE SYNC) ---

  // 1. On Mount: Query storage to see if this giveaway is already saved
  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        const stored = await SecureStore.getItemAsync('saved_giveaways');
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

  // 2. Local Toggle and Write handler
  const handleToggle = async () => {
    const nextSavedState = !localIsSaved;
    setLocalIsSaved(nextSavedState);
    
    // Call the parent callback to notify upper components (if any UI updates are expected there)
    onToggleSave();

    try {
      const stored = await SecureStore.getItemAsync('saved_giveaways');
      let parsed: FreeGiveaway[] = stored ? JSON.parse(stored) : [];

      if (!nextSavedState) {
        // Unsave: Filter out current giveaway
        parsed = parsed.filter((item) => item.id !== giveaway.id);
      } else {
        // Save: Add to storage
        parsed.push(giveaway);
      }

      await SecureStore.setItemAsync('saved_giveaways', JSON.stringify(parsed));
    } catch (error) {
      console.error('Error modifying saved list in SecureStore:', error);
    }
  };

  // --- END OF PERSISTENCE LOGIC ---

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

  const daysRemainingInfo = getDaysRemainingText(giveaway.end_date);

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
      await Share.share({
        message: `🔥 Freebie Alert: Get "${giveaway.title}" for FREE ${hasWorth ? `(Worth ${worthValue})` : ''} on ${giveaway.platform || 'PC'}!\nClaim here: ${targetUrl}`,
        title: giveaway.title,
      });
    } catch (error) {
      console.error('Error sharing giveaway:', error);
    }
  };

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

  return (
    <>
      {/* =========================================================================
          MINIMAL VARIANT
          ========================================================================= */}
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

              {hasWorth && (
                <View className="absolute bottom-1 left-1 bg-purple-600 px-1 py-0.5 rounded shadow-sm">
                  <Text className="text-[7px] font-montBlack text-white uppercase tracking-tight">
                    {worthValue} VALUE
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
                    FREE
                  </ThemedText>
                  {hasWorth && (
                    <Text className="text-[10px] font-montBold line-through text-zinc-400 dark:text-zinc-500">
                      {worthValue}
                    </Text>
                  )}
                </View>
                
                <View className="flex-row items-center gap-1.5">
                  <Pressable onPress={handleToggle} hitSlop={8} style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }} className="p-1.5 rounded-lg border active:opacity-60">
                    {localIsSaved ? (
                      <Heart size="13" color="#22c55e" variant="Bold" />
                    ) : (
                      <Heart size="13" color={iconColor} variant="Outline" />
                    )}
                  </Pressable>
                  <Pressable onPress={handleOpenClaimSite} hitSlop={8} style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }} className="p-1.5 rounded-lg border active:opacity-60">
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

      {/* =========================================================================
          COMPACT VARIANT
          ========================================================================= */}
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

              {hasWorth && (
                <View className="absolute bottom-1.5 left-1.5 bg-purple-600 px-1.5 py-0.5 rounded shadow-sm">
                  <Text className="text-[8px] font-montBlack text-white uppercase tracking-wider">
                    {worthValue} VALUE
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
                    FREE
                  </ThemedText>
                  {hasWorth && (
                    <Text className="text-[10px] font-montBold line-through text-zinc-400 dark:text-zinc-500">
                      {worthValue}
                    </Text>
                  )}
                </View>
                
                <View className="flex-row items-center gap-1.5">
                  <Pressable onPress={handleToggle} hitSlop={10} style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }} className="p-1.5 rounded-lg border active:opacity-60">
                    {localIsSaved ? (
                      <Heart size="15" color="#22c55e" variant="Bold" />
                    ) : (
                      <Heart size="15" color={iconColor} variant="Outline" />
                    )}
                  </Pressable>
                  <Pressable onPress={handleOpenClaimSite} hitSlop={10} style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }} className="p-1.5 rounded-lg border active:opacity-60">
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

      {/* =========================================================================
          NORMAL VARIANT
          ========================================================================= */}
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

              {hasWorth && (
                <View className="absolute top-3 left-3 bg-purple-600 px-2.5 py-1 rounded-md shadow-sm">
                  <Text className="text-[10px] font-montBlack text-white uppercase tracking-wider">
                    {worthValue} VALUE
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
                <View className="flex-row items-center gap-1">
                  <ThemedText style={{ color: '#9333ea' }} className="text-[10px] font-montBlack uppercase tracking-widest">
                    {ctaText}
                  </ThemedText>
                  <ArrowCircleRight size="14" color="#9333ea" variant="Bold" />
                </View>

                <View className="flex-row items-center gap-3">
                  <View className="flex-row items-center gap-1.5">
                    <ThemedText className="text-[12px] font-montBlack text-emerald-500">
                      FREE
                    </ThemedText>
                    {hasWorth && (
                      <Text className="text-[10px] font-montBold line-through text-zinc-400 dark:text-zinc-500">
                        {worthValue}
                      </Text>
                    )}
                  </View>

                  <View className="flex-row items-center gap-1.5">
                    <Pressable onPress={handleToggle} hitSlop={10} style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }} className="p-2 rounded-xl border active:opacity-60">
                      {localIsSaved ? (
                        <Heart size="15" color="#22c55e" variant="Bold" />
                      ) : (
                        <Heart size="15" color={isDark ? '#a78bfa' : '#9333ea'} variant="Outline" />
                      )}
                    </Pressable>

                    <Pressable onPress={handleOpenClaimSite} hitSlop={10} style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }} className="p-2 rounded-xl border active:opacity-60">
                      <ExportSquare size="15" color={isDark ? '#a78bfa' : '#9333ea'} variant="Outline" />
                    </Pressable>

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

              {/* Floating modern visual drag handle bar */}
              <View className="absolute top-3 inset-x-0 items-center">
                <View 
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} 
                  className="w-12 h-1 rounded-full" 
                />
              </View>

              {/* Floating Platform Badge */}
              <View className="absolute bottom-3 left-4 bg-neutral-900/90 px-2.5 py-0.5 rounded border border-purple-500/30">
                <Text className="text-[9px] font-montBlack text-purple-400 tracking-wider uppercase">
                  {giveaway.platform || 'Multi-platform'}
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
                {/* Type & Value Line */}
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
                        FREE
                      </ThemedText>
                    </View>
                  </View>
                </View>

                {/* Title */}
                <ThemedText className="font-montBlack text-xl tracking-tight mb-3 leading-tight">
                  {giveaway.title}
                </ThemedText>

                {/* Status Info Chips */}
                <View className="flex-row flex-wrap gap-2 mb-4">
                  {giveaway.status && (
                    <View style={{ backgroundColor: cardBgColor }} className="px-2.5 py-1 rounded-xl flex-row items-center gap-1.5">
                      <View className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <ThemedText className="text-[10px] font-montBold opacity-85 uppercase tracking-wide">
                        {giveaway.status}
                      </ThemedText>
                    </View>
                  )}
                  
                  {/* DYNAMIC DAYS REMAINING CHIP */}
                  {daysRemainingInfo && (
                    <View style={{ backgroundColor: cardBgColor }} className="px-2.5 py-1 rounded-xl flex-row items-center gap-1.5">
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

                  {giveaway.keys_left && giveaway.keys_left !== 'N/A' && (
                    <View style={{ backgroundColor: cardBgColor }} className="px-2.5 py-1 rounded-xl flex-row items-center gap-1.5">
                      <InfoCircle size="12" color={iconColor} variant="Outline" />
                      <ThemedText className="text-[10px] font-montBold opacity-85">
                        Keys Left: {giveaway.keys_left}
                      </ThemedText>
                    </View>
                  )}
                </View>

                {/* Description Body */}
                <ThemedText className="font-mont text-[12px] leading-relaxed opacity-80 mb-4">
                  {giveaway.description || 'Grab this awesome promotional giveaway before keys run out or the deal active window closes!'}
                </ThemedText>

                {/* Instructions / Savings Breakdown Block */}
                {giveaway.instructions && (
                  <View style={{ backgroundColor: cardBgColor }} className="rounded-xl p-3 mb-2">
                    <ThemedText className="font-montBold text-[11px] mb-1 text-purple-500">
                      Instructions to Claim:
                    </ThemedText>
                    <ThemedText className="font-mont text-[10px] leading-relaxed opacity-85">
                      {giveaway.instructions}
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
                {/* Left side actions: Sync Local Save state inside Modal footer */}
                <View className="flex-row items-center gap-3">
                  <Pressable
                    onPress={handleToggle}
                    style={{ backgroundColor: cardBgColor }}
                    className="w-11 h-11 rounded-2xl flex-row items-center justify-center active:opacity-75"
                  >
                    {localIsSaved ? (
                      <Heart size="18" color="#22c55e" variant="Bold" />
                    ) : (
                      <Heart size="18" color={isDark ? "#a78bfa" : "#7c3aed"} variant="Outline" />
                    )}
                  </Pressable>

                  <Pressable
                    onPress={handleShare}
                    hitSlop={10} 
                    style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }} 
                    className="p-2.5 rounded-xl border active:opacity-60"
                  >
                    <ShareIcon size="16" color={isDark ? "#a78bfa" : "#7c3aed"} variant="Broken" />
                  </Pressable>
                </View>

                {/* Right side CTA Button */}
                <Pressable
                  onPress={handleOpenClaimSite}
                  style={{ backgroundColor: '#9333ea' }}
                  className="flex-1 h-11 rounded-full flex-row items-center justify-center gap-2 active:opacity-85 shadow-lg shadow-purple-500/20"
                >
                  <Gift size="16" color="#ffffff" variant="Broken" />
                  <ThemedText className="text-white font-montBlack text-xs uppercase tracking-wider">
                    {ctaText}
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