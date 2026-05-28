import Button from '@/components/custom/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { formatDate } from '@/lib/utils';
import { FreeGiveaway } from '@/types';
import { Image, Linking, View, Platform, Pressable } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';
import * as WebBrowser from 'expo-web-browser';

interface FreeGiveawayItemProps {
  giveaway: FreeGiveaway;
  variant?: 'normal' | 'compact';
}

export default function FreeGiveawayItem({ giveaway, variant = 'normal' }: FreeGiveawayItemProps) {
  const { themeMode } = useCustomTheme();

  const isDark = themeMode === 'dark';
  const isCompact = variant === 'compact';

  const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';

  const adaptiveBorderColor = isDark 
    ? 'rgba(255, 255, 255, 0.07)' 
    : 'rgba(0, 0, 0, 0.07)';

  const dividerColor = isDark
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.06)';

  // Safe handler to launch native in-app WebBrowser sheets
  const handleOpenGameSite = async () => {
    if (!giveaway.game_url) return;
    try {
      await WebBrowser.openBrowserAsync(giveaway.game_url, {
        toolbarColor: isDark ? '#2c2c35' : '#f1f2f6',
        controlsColor: '#9333ea', // Primary purple branding accent
        secondaryToolbarColor: isDark ? '#1c1c1e' : '#ffffff',
        enableBarCollapsing: true,
        showTitle: true,
      });
    } catch (error) {
      console.error('Failed to launch in-app web view layer:', error);
      // Graceful native fallback environment handling
      Linking.openURL(giveaway.game_url);
    }
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
        <Pressable onPress={handleOpenGameSite} className="relative w-28 h-32 rounded-xl overflow-hidden bg-zinc-800 active:opacity-95">
          <Image source={{ uri: giveaway.thumbnail }} className="w-full h-full" resizeMode="cover" />
          
          <View className="absolute bottom-0 left-0 right-0 bg-purple-600/90 py-1 items-center">
            <ThemedText className="text-white font-montBlack text-[9px] uppercase tracking-wider">
              {giveaway.genre ? giveaway.genre.split(' ')[0] : 'PLAY'}
            </ThemedText>
          </View>
        </Pressable>

        {/* Right Side: Meta Data & Fast Actions */}
        <View className="flex-1 justify-between">
          <Pressable onPress={handleOpenGameSite} className="active:opacity-90">
            <ThemedText numberOfLines={1} className="font-montBlack text-base tracking-tight mb-0.5">
              {giveaway.title}
            </ThemedText>
            <ThemedText className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-snug font-mont" numberOfLines={2}>
              {giveaway.short_description}
            </ThemedText>
          </Pressable>

          <View style={{ borderColor: dividerColor, borderTopWidth: 1, borderBottomWidth: 1 }} className="flex-row items-center justify-between py-1.5 my-1">
            <View className="flex-row items-baseline gap-1">
              <ThemedText style={{ color: '#22c55e' }} className="font-montBlack text-sm">Free</ThemedText>
            </View>
            <View className="flex-row items-center gap-1">
              <ThemedText className="text-[9px] uppercase font-montBold text-zinc-400">Launch:</ThemedText>
              <ThemedText className="font-montBold text-[10px] opacity-90">
                {giveaway.release_date ? formatDate(giveaway.release_date) : 'N/A'}
              </ThemedText>
            </View>
          </View>

          <View className="flex-row items-center gap-2">
            <Button 
              onPress={handleOpenGameSite} 
              style={{ borderColor: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.15)', borderWidth: 1 }}
              className="h-8 flex-1 font-montBold text-xs" 
              type="dark" 
              text="Site" 
            />
            <Button 
              onPress={handleOpenGameSite} 
              className="h-8 flex-1 font-montBold text-xs" 
              type="primary" 
              text="Play" 
            />
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
      className="rounded-2xl mb-6 p-4" 
      style={[
        { 
          backgroundColor: cardBgColor,
          borderWidth: 1,
          borderColor: adaptiveBorderColor,
        },
        Platform.select({
          ios: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: isDark ? 4 : 8 },
            shadowOpacity: isDark ? 0.35 : 0.10, 
            shadowRadius: isDark ? 10 : 16,     
          },
          android: {
            elevation: isDark ? 4 : 5, 
          }
        })
      ]}
    >
      {/* Thumbnail Container */}
      <Pressable onPress={handleOpenGameSite} className="w-full h-48 rounded-xl overflow-hidden mb-4 bg-zinc-800 active:opacity-95">
        <Image
          source={{ uri: giveaway.thumbnail }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </Pressable>

      {/* Content Layout */}
      <View className="flex-1 space-y-2 mb-4">
        <ThemedText className="font-montBlack text-lg leading-tight tracking-tight mb-1">
          {giveaway.title}
        </ThemedText>
        
        <ThemedText className="text-zinc-500 dark:text-zinc-300 text-sm leading-relaxed mb-3 font-mont" numberOfLines={2}>
          {giveaway.short_description}
        </ThemedText>
        
        {/* Metadata Dashboard Row */}
        <View 
          style={{ borderColor: dividerColor, borderTopWidth: 1, borderBottomWidth: 1 }}
          className="flex-row items-center justify-between py-3 my-1"
        >
          <View>
            <ThemedText className="text-[10px] uppercase font-montBold tracking-widest text-zinc-400">Genre</ThemedText>
            <ThemedText className="font-montBold text-sm mt-0.5 opacity-90">
              {giveaway.genre}
            </ThemedText>
          </View>

          <View className="items-center">
            <ThemedText className="text-[10px] uppercase font-montBold tracking-widest text-zinc-400">Publisher</ThemedText>
            <ThemedText className="font-mont text-xs mt-1 text-zinc-500 dark:text-zinc-300" numberOfLines={1}>
              {giveaway.publisher}
            </ThemedText>
          </View>

          <View className="items-end">
            <ThemedText className="text-[10px] uppercase font-montBold tracking-widest text-zinc-400">Released</ThemedText>
            <ThemedText className="font-montBold text-xs mt-1 text-green-500">
              {formatDate(giveaway.release_date)}
            </ThemedText>
          </View>
        </View>
      </View>
      
      {/* Premium Split Action Buttons Container */}
      <View className="flex-row justify-between gap-3">
        <Button
          onPress={handleOpenGameSite}
          className="flex-1 font-montBold"
          style={{ 
            borderColor: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.15)',
            borderWidth: 1 
          }}
          type="dark"
          text="View Site"
        />
        <Button
          onPress={handleOpenGameSite}
          className="flex-1 font-montBold"
          type="primary"
          text="Play Free"
        />
      </View>
    </ThemedView>
  );
}