import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { FreeGiveaway } from '@/types';
import { Image, Linking, View, Platform, Pressable, Share, Text } from 'react-native';
import { useCustomTheme } from '@/context/ThemeContext';
import * as WebBrowser from 'expo-web-browser';
import { ArrowCircleRight, ExportSquare, Share as ShareIcon } from 'iconsax-react-nativejs';

interface DealItemProps {
  giveaway: FreeGiveaway;
  variant?: 'normal' | 'compact' | 'minimal';
  ctaText?: string; // Supporting optional screen override props smoothly
}

export default function DealItem({ giveaway, variant = 'normal', ctaText = 'Buy Now' }: DealItemProps) {
  const { themeMode } = useCustomTheme();

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

  const normalizeStorePlatform = (storeId: string) => {
    if (!storeId) return 'Retailer';
    switch (storeId.toString()) {
      case '1': return 'Steam';
      case '2': return 'GamersGate';
      case '3': return 'GreenManGaming';
      case '7': return 'GOG';
      case '11': return 'Epic Games';
      case '25': return 'Epic Games';
      case '34': return 'Amazon';
      default: return `Store #${storeId}`;
    }
  };

  const displayPlatform = normalizeStorePlatform(giveaway.storeID || giveaway.platform);

  const salePriceNum = parseFloat(giveaway.salePrice || '0');
  const normalPriceNum = parseFloat(giveaway.normalPrice || '0');
  const isFree = salePriceNum === 0;
  
  // Calculate exact absolute cash savings value
  const totalCashSaved = (normalPriceNum - salePriceNum).toFixed(2);
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
      await Share.share({
        message: `🔥 Game Deal Alert: ${giveaway.title} is on sale for ${isFree ? 'FREE' : `$${salePriceNum}`} (Saved $${totalCashSaved}) at ${displayPlatform}!\nGet it here: ${targetUrl}`,
        title: giveaway.title,
      });
    } catch (error) {
      console.error('Error sharing link profile layer:', error);
    }
  };

  // =========================================================================
  // MINIMAL VARIANT
  // =========================================================================
  if (isMinimal) {
    return (
      <Pressable onPress={handleOpenClaimSite} className="active:opacity-95">
        <ThemedView
          key={giveaway.id}
          className="rounded-2xl mb-4 p-2.5 flex-row gap-3 border"
          style={{ backgroundColor: minimalBgColor, borderColor: adaptiveBorderColor }}
        >
          <View className="relative w-24 h-24 rounded-xl overflow-hidden bg-zinc-800">
            <Image source={{ uri: giveaway.thumbnail || giveaway.image }} className="w-full h-full" resizeMode="cover" />
            <View className="absolute inset-0 bg-black/10" />

            {/* Top Right Save Capsule for Minimal */}
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
                  {isFree ? 'FREE' : `$${salePriceNum.toFixed(2)}`}
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
    );
  }

  // =========================================================================
  // COMPACT VARIANT
  // =========================================================================
  if (isCompact) {
    return (
      <Pressable onPress={handleOpenClaimSite} className="active:opacity-95">
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

            {/* Top Right Explicit Cash Savings Capsule */}
            {hasValidPrice && (
              <View className="absolute top-1.5 right-1.5 bg-purple-600 px-1.5 py-0.5 rounded shadow-sm">
                <Text className="text-[8px] font-montBlack text-white uppercase tracking-wider">
                  SAVE ${totalCashSaved}
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
                  {isFree ? 'FREE' : `$${salePriceNum.toFixed(2)}`}
                </ThemedText>
              </View>
              
              <View className="flex-row items-center gap-2">
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
    );
  }

  // =========================================================================
  // NORMAL VARIANT
  // =========================================================================
  return (
    <Pressable onPress={handleOpenClaimSite} className="active:opacity-95">
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
        {/* Banner Hero Image Section */}
        <View className="relative w-full h-40 bg-zinc-900">
          <Image source={{ uri: giveaway.image || giveaway.thumbnail }} className="w-full h-full" resizeMode="cover" />
          <View className="absolute inset-0 bg-black/10" />

          {/* Top Right Explicit Cash Savings Capsule */}
          {hasValidPrice && (
            <View className="absolute top-3 right-3 bg-purple-600 px-2.5 py-1 rounded-md shadow-sm">
              <Text className="text-[10px] font-montBlack text-white uppercase tracking-wider">
                SAVE ${totalCashSaved}
              </Text>
            </View>
          )}
        </View>

        {/* Content Block Details */}
        <View className="p-4">
          <ThemedText numberOfLines={1} className="font-montBlack text-base tracking-tight mb-0.5">
            {giveaway.title}
          </ThemedText>
          <ThemedText className="text-zinc-500 dark:text-zinc-400 text-xs leading-snug font-mont mb-3" numberOfLines={2}>
            {giveaway.description}
          </ThemedText>

          {/* Lower Informational Banner Action Strip */}
          <View 
            style={{ borderTopWidth: 1, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }} 
            className="flex-row items-center justify-between pt-2.5 mt-0.5"
          >
            {/* Action Prompt - Standardized to resolve layout variations */}
            <View className="flex-row items-center gap-1">
              <ThemedText style={{ color: '#9333ea' }} className="text-[10px] font-montBlack uppercase tracking-widest">
                {ctaText}
              </ThemedText>
              <ArrowCircleRight size="14" color="#9333ea" variant="Bold" />
            </View>

            {/* Right Action Stack Group (Pricing remains) */}
            <View className="flex-row items-center gap-3">
              <View className="flex-row items-center gap-1.5">
                {hasValidPrice && (
                  <Text className="text-[10px] font-montBold line-through text-zinc-400 dark:text-zinc-500">
                    ${normalPriceNum.toFixed(2)}
                  </Text>
                )}
                <ThemedText className="text-[12px] font-montBlack text-emerald-500">
                  {isFree ? 'FREE' : `$${salePriceNum.toFixed(2)}`}
                </ThemedText>
              </View>

              <View className="flex-row items-center gap-2">
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
  );
}