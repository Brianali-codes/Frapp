import React, { useState, useRef, useMemo, useEffect } from 'react';
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
  Star,
  CalendarTick,
  Game,
  Gift,
  Heart
} from 'iconsax-react-nativejs';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface DealItemProps {
  giveaway: FreeGiveaway;
  variant?: 'normal' | 'compact' | 'minimal';
  ctaText?: string;
  // External props if parent controls state (Optional overrides)
  isSaved?: boolean;
  onToggleSave?: () => void;
}

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
  
  // Use controlled state if provided by parent, otherwise fall back to internal
  const isSaved = externalIsSaved !== undefined ? externalIsSaved : internalIsSaved;

  const translateY = useRef(new Animated.Value(0)).current;

  // Resolve localized CTA text fallback chain
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

  // --- PERSISTENCE LOGIC (AsyncStorage Sync) ---

  // 1. On Mount: Check if this item is saved (only if parent doesn't handle state)
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

  // 2. Toggle Handler
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

  // --- HELPERS & MATH SAFEGUARDS ---

  const normalizeStorePlatform = (storeId?: string | number) => {
    if (!storeId) return t('deals.retailer', 'Retailer');
    switch (storeId.toString()) {
      case '1': return 'Steam';
      case '2': return 'GamersGate';
      case '3': return 'GreenManGaming';
      case '7': return 'GOG';
      case '11': 
      case '25': return 'Epic Games';
      case '34': return 'Amazon';
      default: return `${t('deals.store', 'Store')} #${storeId}`;
    }
  };

  const displayPlatform = normalizeStorePlatform(giveaway.storeID || giveaway.platform);

  const salePriceNum = Number.isNaN(parseFloat(giveaway.salePrice || '0')) ? 0 : parseFloat(giveaway.salePrice || '0');
  const normalPriceNum = Number.isNaN(parseFloat(giveaway.normalPrice || '0')) ? 0 : parseFloat(giveaway.normalPrice || '0');
  const isFree = salePriceNum === 0;

  const totalCashSaved = Math.max(0, normalPriceNum - salePriceNum).toFixed(2);
  const hasValidPrice = giveaway.normalPrice && normalPriceNum > salePriceNum && parseFloat(totalCashSaved) > 0;

  const handleOpenClaimSite = async () => {
    const targetUrl = giveaway.open_giveaway_url || giveaway.game_url;
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

  // Static PanResponder initialization
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
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            setModalVisible(false);
            translateY.setValue(0);
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
          COMPACT VARIANT (With Save Button)
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

                {/* Compact Mode Actions */}
                <View className="flex-row items-center gap-2">
                  <Pressable onPress={handleToggleSave} hitSlop={10} style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }} className="p-1.5 rounded-lg border active:opacity-60">
                    <Heart size="15" color={isSaved ? '#22c55e' : iconColor} variant={isSaved ? 'Bold' : 'Outline'} />
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
          NORMAL VARIANT (With Save Button)
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

              {hasValidPrice && (
                <View className="absolute top-3 right-3 bg-purple-600 px-2.5 py-1 rounded-md shadow-sm">
                  <Text className="text-[10px] font-montBlack text-white uppercase tracking-wider">
                    {t('deals.save_amount', { defaultValue: 'SAVE ${{amount}}', amount: totalCashSaved })}
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
                    <Pressable onPress={handleOpenClaimSite} hitSlop={10} style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }} className="p-2 rounded-xl border active:opacity-60">
                      <ExportSquare size="15" color={isDark ? '#a78bfa' : '#9333ea'} variant="Outline" />
                    </Pressable>

                    <Pressable onPress={handleToggleSave} hitSlop={10} style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }} className="p-2 rounded-xl border active:opacity-60">
                      <Heart size="15" color={isSaved ? '#22c55e' : (isDark ? '#a78bfa' : '#9333ea')} variant={isSaved ? 'Bold' : 'Outline'} />
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
          DETAIL MODAL
          ========================================================================= */}
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

              <View className="absolute bottom-3 left-4 bg-neutral-900/90 px-2.5 py-0.5 rounded border border-purple-500/30">
                <Text className="text-[9px] font-montBlack text-purple-400 tracking-wider uppercase">
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
                  {giveaway.steamRatingPercent && (
                    <View style={{ backgroundColor: cardBgColor }} className="px-2.5 py-1 rounded-xl flex-row items-center gap-1.5">
                      <Star size="12" color="#eab308" variant="Bold" />
                      <ThemedText className="text-[10px] font-montBold opacity-85">
                        {t('deals.rating', { defaultValue: '{{percent}}% Rating', percent: giveaway.steamRatingPercent })}
                      </ThemedText>
                    </View>
                  )}
                  {giveaway.release_date && giveaway.release_date !== '0' && (
                    <View style={{ backgroundColor: cardBgColor }} className="px-2.5 py-1 rounded-xl flex-row items-center gap-1.5">
                      <CalendarTick size="12" color={iconColor} variant="Outline" />
                      <ThemedText className="text-[10px] font-montBold opacity-85">
                        {t('deals.released', { defaultValue: 'Released: {{date}}', date: giveaway.release_date })}
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
                  {giveaway.description || giveaway.short_description || t('deals.no_description', 'No additional description provided. Grab this deal before it expires or store pricing shifts back!')}
                </ThemedText>

                {hasValidPrice && giveaway.savings && (
                  <View style={{ backgroundColor: cardBgColor }} className="rounded-xl p-3 mb-2">
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
                  <Pressable
                    onPress={handleToggleSave}
                    style={{ backgroundColor: cardBgColor }}
                    className="w-11 h-11 rounded-2xl flex-row items-center justify-center active:opacity-75"
                  >
                    <Heart 
                      size="18" 
                      color={isSaved ? "#22c55e" : (isDark ? "#a78bfa" : "#7c3aed")} 
                      variant={isSaved ? "Bold" : "Outline"} 
                    />
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

                <Pressable
                  onPress={handleOpenClaimSite}
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