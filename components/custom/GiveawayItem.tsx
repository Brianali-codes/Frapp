import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { formatDate } from '@/lib/utils';
import { Giveaway } from '@/types';
import { Image, Linking, View, Platform, Pressable, Share } from 'react-native';
import { useCustomTheme } from '@/context/ThemeContext';
import * as WebBrowser from 'expo-web-browser';
import { ArrowCircleRight, ExportCurve, ExportSquare, Share as ShareIcon } from 'iconsax-react-nativejs';


interface GiveawayItemProps {
  giveaway: Giveaway;
  variant?: 'normal' | 'compact' | 'minimal';
  
}

export default function GiveawayItem({ giveaway, variant = 'normal' }: GiveawayItemProps) {
  const { themeMode } = useCustomTheme();

  const isDark = themeMode === 'dark';
  const isCompact = variant === 'compact';
  const isMinimal = variant === 'minimal';

  const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';
  const minimalBgColor = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)';

  const adaptiveBorderColor = isDark
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.05)';

  // Action Button Dynamic Theme Styles
  const iconBtnBg = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';
  const iconBtnBorder = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
  const iconColor = isDark ? '#a78bfa' : '#7c3aed';

  // Fixed Theme Compatibility for the Pricing Capsule
  const badgeBgColor = isDark ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.92)';
  const badgeBorderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
  const strikeThroughOpacity = isDark ? 'opacity-85' : 'opacity-60';

  const normalizePlatform = (platformStr: string) => {
    if (!platformStr) return '';
    if (platformStr.toLowerCase().includes('steam')) return 'Steam';
    if (platformStr.toLowerCase().includes('epic')) return 'Epic Games';
    if (platformStr.toLowerCase().includes('gog')) return 'GOG';
    if (platformStr.toLowerCase().includes('ps') || platformStr.toLowerCase().includes('playstation')) return 'PS';
    if (platformStr.toLowerCase() === 'pc') return '';
    return platformStr;
  };

  const displayPlatform = normalizePlatform(giveaway.platform);

  const handleOpenClaimSite = async () => {
    if (!giveaway.open_giveaway_url) return;
    try {
      await WebBrowser.openBrowserAsync(giveaway.open_giveaway_url, {
        toolbarColor: isDark ? '#2c2c35' : '#f1f2f6',
        controlsColor: '#9333ea', 
        secondaryToolbarColor: isDark ? '#1c1c1e' : '#ffffff',
        enableBarCollapsing: true,
        showTitle: true,
      });
    } catch (error) {
      console.error('Failed to launch in-app web view layer:', error);
      Linking.openURL(giveaway.open_giveaway_url);
    }
  };

  const handleShare = async () => {
    if (!giveaway.open_giveaway_url) return;
    try {
      await Share.share({
        message: `Check out this giveaway: ${giveaway.title}\nClaim it here: ${giveaway.open_giveaway_url}`,
        title: giveaway.title,
      });
    } catch (error) {
      console.error('Error sharing link profile layer:', error);
    }
  };

  const hasValidPrice = giveaway.worth && giveaway.worth !== 'N/A' && giveaway.worth !== '$0.00';

  // =========================================================================
  // MINIMAL VARIANT
  // =========================================================================
  if (isMinimal) {
    return (
      <Pressable onPress={handleOpenClaimSite} className="active:opacity-95">
        <ThemedView
          key={giveaway.id}
          className="rounded-2xl mb-4 p-2.5 flex-row gap-3 border"
          style={{ 
            backgroundColor: minimalBgColor, 
            borderColor: adaptiveBorderColor 
          }}
        >
          <View className="relative w-24 h-24 rounded-xl overflow-hidden bg-zinc-800">
            <Image source={{ uri: giveaway.thumbnail }} className="w-full h-full" resizeMode="cover" />
            <View 
              style={{ backgroundColor: badgeBgColor, borderColor: badgeBorderColor }} 
              className="absolute top-1 left-1 px-1.5 py-0.5 rounded border"
            >
              <ThemedText className="text-[8px] font-montBlack tracking-wide text-emerald-500 dark:text-emerald-400">
                FREE
              </ThemedText>
            </View>
          </View>

          <View className="flex-1 justify-between py-0.5">
            <View>
              <View className="flex-row items-center justify-between mb-0.5 pr-1">
                <ThemedText numberOfLines={1} className="font-montBlack text-sm flex-1 tracking-tight">
                  {giveaway.title}
                </ThemedText>
                {displayPlatform !== '' && (
                  <View className="ml-2 bg-purple-500/10 dark:bg-purple-500/20 px-1.5 py-0.5 rounded-md">
                    <ThemedText className="text-purple-600 dark:text-purple-400 font-montBold text-[8px] uppercase tracking-wider">
                      {displayPlatform}
                    </ThemedText>
                  </View>
                )}
              </View>
              <ThemedText className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-normal font-mont" numberOfLines={2}>
                {giveaway.description}
              </ThemedText>
            </View>

            <View className="flex-row items-center justify-between mt-1">
              <ThemedText className="font-montBold text-[10px] text-zinc-400 dark:text-zinc-500">
                Ends: {giveaway.end_date && giveaway.end_date !== 'N/A' ? formatDate(giveaway.end_date) : 'LTD'}
              </ThemedText>
              
              <View className="flex-row items-center gap-2">
                <Pressable 
                  onPress={handleOpenClaimSite} 
                  hitSlop={8} 
                  style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }}
                  className="p-1.5 rounded-lg border active:opacity-60"
                >
                  <ExportSquare size="13" color={iconColor} variant="Outline" />
                </Pressable>
                <Pressable 
                  onPress={handleShare} 
                  hitSlop={8} 
                  style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }}
                  className="p-1.5 rounded-lg border active:opacity-60"
                >
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
              ios: {
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: isDark ? 2 : 4 },
                shadowOpacity: isDark ? 0.25 : 0.06,
                shadowRadius: isDark ? 8 : 10,
              },
              android: { elevation: isDark ? 2 : 3 }
            })
          ]}
        >
          <View className="relative w-28 h-28 rounded-xl overflow-hidden bg-zinc-800">
            <Image source={{ uri: giveaway.thumbnail }} className="w-full h-full" resizeMode="cover" />
            {displayPlatform !== '' && (
              <View className="absolute top-1.5 left-1.5 bg-black/75 px-1.5 py-0.5 rounded border border-white/10">
                <ThemedText className="text-white font-montBold text-[8px] tracking-wide">{displayPlatform}</ThemedText>
              </View>
            )}
            <View 
              style={{ backgroundColor: badgeBgColor, borderTopWidth: 1, borderColor: badgeBorderColor }} 
              className="absolute bottom-0 left-0 right-0 px-1 py-1 flex-row items-center justify-center gap-1"
            >
              {hasValidPrice && (
                <ThemedText style={{ color: '#ef4444' }} className={`text-[9px] font-montBold line-through ${strikeThroughOpacity}`}>
                  {giveaway.worth}
                </ThemedText>
              )}
              <ThemedText className="text-emerald-500 dark:text-emerald-400 font-montBlack text-[9px] uppercase tracking-wider">
                FREE
              </ThemedText>
            </View>
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
              <ThemedText className="font-montBold text-[10px] text-zinc-400 dark:text-zinc-500">
                Ends: {giveaway.end_date && giveaway.end_date !== 'N/A' ? formatDate(giveaway.end_date) : 'LTD'}
              </ThemedText>
              
              <View className="flex-row items-center gap-2">
                <Pressable 
                  onPress={handleOpenClaimSite} 
                  hitSlop={10} 
                  style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }}
                  className="p-1.5 rounded-lg border active:opacity-60"
                >
                  <ExportSquare size="15" color={iconColor} variant="Outline" />
                </Pressable>
                <Pressable 
                  onPress={handleShare} 
                  hitSlop={10} 
                  style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }}
                  className="p-1.5 rounded-lg border active:opacity-60"
                >
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
          { 
            backgroundColor: cardBgColor, 
            borderWidth: 1, 
            borderColor: adaptiveBorderColor,
            overflow: 'hidden'
          },
          Platform.select({
            ios: {
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: isDark ? 4 : 5 },
              shadowOpacity: isDark ? 0.22 : 0.06,
              shadowRadius: isDark ? 8 : 10,
            },
            android: { elevation: isDark ? 2 : 4 }
          })
        ]}
      >
        {/* Banner Hero Image Section */}
        <View className="relative w-full h-40 bg-zinc-900">
          <Image source={{ uri: giveaway.image }} className="w-full h-full" resizeMode="cover" />
          <View className="absolute inset-0 bg-black/15" />
          
          {displayPlatform !== '' && (
            <View className="absolute top-3 left-3 bg-black/75 px-2.5 py-1 rounded-md border border-white/10">
              <ThemedText className="text-white font-montBold text-[10px] tracking-wide uppercase">
                {displayPlatform}
              </ThemedText>
            </View>
          )}

          {/* Theme-Adaptive Top-Right Pricing Capsule */}
          <View 
            style={{ backgroundColor: badgeBgColor, borderColor: badgeBorderColor }} 
            className="absolute top-3 right-3 px-2.5 py-1.5 rounded-md flex-row items-center gap-1.5 shadow-sm border"
          >
            {hasValidPrice && (
              <ThemedText style={{ color: '#ef4444' }} className={`text-[10px] font-montBold line-through ${strikeThroughOpacity}`}>
                {giveaway.worth}
              </ThemedText>
            )}
            <ThemedText className="text-emerald-600 dark:text-emerald-400 font-montBlack text-[10px] uppercase tracking-wider">
              FREE
            </ThemedText>
          </View>
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
            style={{ 
              borderTopWidth: 1, 
              borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' 
            }} 
            className="flex-row items-center justify-between pt-2.5 mt-0.5"
          >
            {/* Action Prompt */}
            <View className="flex-row items-center gap-1">
              <ThemedText style={{ color: '#9333ea' }} className="text-[10px] font-montBlack uppercase tracking-widest">
                Claim drop offer
              </ThemedText>
              <ArrowCircleRight size="14" color="#9333ea" variant="Bold" />
            </View>

            {/* Right Action Stack Group: Icon-only Buttons */}
            <View className="flex-row items-center gap-2">
              <Pressable 
                onPress={handleOpenClaimSite} 
                hitSlop={10}
                style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }}
                className="p-2 rounded-xl border active:opacity-60"
              >
               <ExportSquare size="15" color={isDark ? '#a78bfa' : '#9333ea'} variant="Outline" />
              </Pressable>

              <Pressable 
                onPress={handleShare} 
                hitSlop={10}
                style={{ backgroundColor: iconBtnBg, borderColor: iconBtnBorder }}
                className="p-2 rounded-xl border active:opacity-60"
              >
                 <ShareIcon size="15" color={isDark ? '#a78bfa' : '#9333ea'} variant="Outline" />
              </Pressable>
            </View>
          </View>
        </View>
      </ThemedView>
    </Pressable>
  );
}