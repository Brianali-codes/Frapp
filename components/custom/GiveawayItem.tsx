import Button from '@/components/custom/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { formatDate } from '@/lib/utils';
import { Giveaway } from '@/types';
import { Image, Linking, View, Platform, Pressable } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';
import { useRouter } from 'expo-router';

interface GiveawayItemProps {
  giveaway: Giveaway;
  variant?: 'normal' | 'compact';
}

export default function GiveawayItem({ giveaway, variant = 'normal' }: GiveawayItemProps) {
  const router = useRouter();
  const textColor = useThemeColor({}, 'text');
  const { themeMode } = useCustomTheme();

  const isDark = themeMode === 'dark';
  const isCompact = variant === 'compact';

  const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';

  const adaptiveBorderColor = isDark
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.05)';

  const dividerColor = isDark
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.06)';

  const normalizePlatform = (platformStr: string) => {
    if (!platformStr) return '';
    if (platformStr.toLowerCase().includes('steam')) return 'Steam';
    if (platformStr.toLowerCase().includes('epic')) return 'Epic Games';
    if (platformStr.toLowerCase().includes('gog')) return 'GOG';
    if (platformStr.toLowerCase().includes('ps') || platformStr.toLowerCase().includes('playstation')) return 'PS';
    
    // Check if it's a generic PC tag to completely filter it out
    if (platformStr.toLowerCase() === 'pc') return '';
    return platformStr;
  };

  const displayPlatform = normalizePlatform(giveaway.platform);
  const handleNavigateDetails = () => {
    router.push({ pathname: '/giveaway/[id]', params: { id: giveaway.id } });
  };

  // =========================================================================
  // COMPACT HORIZONTAL VARIANT
  // =========================================================================
  if (isCompact) {
    return (
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
        {/* Left Side: Thumbnail Panel */}
        <Pressable onPress={handleNavigateDetails} className="relative w-28 h-32 rounded-xl overflow-hidden bg-zinc-800 active:opacity-95">
          <Image source={{ uri: giveaway.thumbnail }} className="w-full h-full" resizeMode="cover" />
          
          {/* Platform Tag Render Guard */}
          {displayPlatform !== '' && (
            <View className="absolute top-1.5 left-1.5 bg-black/75 px-1.5 py-0.5 rounded border border-white/10">
              <ThemedText className="text-white font-montBold text-[8px] tracking-wide">{displayPlatform}</ThemedText>
            </View>
          )}

          <View className="absolute bottom-0 left-0 right-0 bg-green-500/90 py-1 items-center">
            <ThemedText className="text-white font-montBlack text-[9px] uppercase tracking-wider">
              {giveaway.worth === 'N/A' || !giveaway.worth ? 'FREE' : '100% OFF'}
            </ThemedText>
          </View>
        </Pressable>

        {/* Right Side: Meta Data & Fast Actions */}
        <View className="flex-1 justify-between">
          <Pressable onPress={handleNavigateDetails} className="active:opacity-90">
            <ThemedText numberOfLines={1} className="font-montBlack text-base tracking-tight mb-0.5">
              {giveaway.title}
            </ThemedText>
            <ThemedText className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-snug font-mont" numberOfLines={2}>
              {giveaway.description}
            </ThemedText>
          </Pressable>

          <View style={{ borderColor: dividerColor, borderTopWidth: 1, borderBottomWidth: 1 }} className="flex-row items-center justify-between py-1.5 my-1">
            <View className="flex-row items-baseline gap-1">
              <ThemedText style={{ color: '#ef4444' }} className="text-[10px] font-montBold line-through opacity-75">
                {giveaway.worth && giveaway.worth !== 'N/A' ? giveaway.worth : '$0.00'}
              </ThemedText>
              <ThemedText style={{ color: '#22c55e' }} className="font-montBlack text-sm">Free</ThemedText>
            </View>
            <View className="flex-row items-center gap-1">
              <ThemedText className="text-[9px] uppercase font-montBold text-zinc-400">Ends:</ThemedText>
              <ThemedText className="font-montBold text-[10px] opacity-90">
                {giveaway.end_date && giveaway.end_date !== 'N/A' ? formatDate(giveaway.end_date) : 'LTD'}
              </ThemedText>
            </View>
          </View>

          <View className="flex-row items-center gap-2">
            <Button onPress={handleNavigateDetails} className="h-8 flex-1 font-montBold text-xs" type="dark" text="Details" />
            <Button onPress={() => Linking.openURL(giveaway.open_giveaway_url)} className="h-8 flex-1 font-montBold text-xs" type="primary" text="Claim" />
          </View>
        </View>
      </ThemedView>
    );
  }

  // =========================================================================
  // NORMAL FULL-CARD VARIANT (Default)
  // =========================================================================
  return (
    <ThemedView
      key={giveaway.id}
      className="rounded-2xl mb-5 p-4"
      style={[
        { backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor },
        Platform.select({
          ios: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: isDark ? 4 : 6 },
            shadowOpacity: isDark ? 0.30 : 0.08,
            shadowRadius: isDark ? 10 : 12,
          },
          android: { elevation: isDark ? 3 : 4 }
        })
      ]}
    >
      <Pressable onPress={handleNavigateDetails} className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-zinc-800 active:opacity-95">
        <Image source={{ uri: giveaway.thumbnail }} className="w-full h-full" resizeMode="cover" />
        
        {/* Platform Tag Render Guard */}
        {displayPlatform !== '' && (
          <View className="absolute top-3 left-3 bg-black/70 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/10">
            <ThemedText className="text-white font-montBold text-[10px] tracking-wide">{displayPlatform}</ThemedText>
          </View>
        )}

        <View className="absolute top-3 right-3 bg-green-500 px-3 py-1 rounded-md shadow-sm">
          <ThemedText className="text-white font-montBlack text-[10px] uppercase tracking-widest">
            {giveaway.worth === 'N/A' || !giveaway.worth ? 'FREE' : '100% OFF'}
          </ThemedText>
        </View>
      </Pressable>

      <View className="mb-4">
        <ThemedText numberOfLines={1} className="font-montBlack text-lg tracking-tight mb-1">
          {giveaway.title}
        </ThemedText>
        <ThemedText className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed mb-3 font-mont" numberOfLines={2}>
          {giveaway.description}
        </ThemedText>

        <View style={{ borderColor: dividerColor, borderTopWidth: 1, borderBottomWidth: 1 }} className="flex-row items-center justify-between py-2.5">
          <View className="gap-0.5">
            <ThemedText className="text-[9px] uppercase font-montBold tracking-widest text-zinc-400">Original Value</ThemedText>
            <View className="flex-row items-center gap-1.5">
              <ThemedText style={{ color: '#ef4444' }} className="text-xs font-montBold line-through opacity-85">
                {giveaway.worth && giveaway.worth !== 'N/A' ? giveaway.worth : '$0.00'}
              </ThemedText>
              <ThemedText style={{ color: '#22c55e' }} className="font-montBlack text-base leading-none">Free</ThemedText>
            </View>
          </View>

          <View className="items-end gap-0.5">
            <ThemedText className="text-[9px] uppercase font-montBold tracking-widest text-zinc-400">Expirations</ThemedText>
            <ThemedText className="font-montBold text-xs opacity-90">
              {giveaway.end_date && giveaway.end_date !== 'N/A' ? formatDate(giveaway.end_date) : 'Limited Time'}
            </ThemedText>
          </View>
        </View>
      </View>

      <View className="flex-row items-center gap-3">
        <Button onPress={handleNavigateDetails} className="flex-1 font-montBold" type="dark" text="View Details" />
        <Button onPress={() => Linking.openURL(giveaway.open_giveaway_url)} className="flex-1 font-montBold" type="primary" text="Claim Now" />
      </View>
    </ThemedView>
  );
}