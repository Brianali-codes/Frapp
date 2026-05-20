import Button from '@/components/custom/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { formatDate } from '@/lib/utils';
import { FreeGiveaway } from '@/types';
import { Image, Linking, View, Platform } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';

export default function FreeGiveawayItem({ giveaway }: { giveaway: FreeGiveaway }) {
  const { themeMode } = useCustomTheme();

  // Lifted Dark Mode to #2c2c35 (a cleaner, highly visible slate-zinc)
  // to give it a distinct, gorgeous pop off absolute dark system screens.
  const cardBgColor = themeMode === 'dark' ? '#2c2c35' : '#f1f2f6';

  // Tweaked border and divider opacity profiles to match the lighter dark container
  const adaptiveBorderColor = themeMode === 'dark' 
    ? 'rgba(255, 255, 255, 0.07)' 
    : 'rgba(0, 0, 0, 0.07)';

  const dividerColor = themeMode === 'dark'
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.06)';

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
            shadowOffset: { width: 0, height: themeMode === 'dark' ? 4 : 8 },
            shadowOpacity: themeMode === 'dark' ? 0.35 : 0.10, 
            shadowRadius: themeMode === 'dark' ? 10 : 16,     
          },
          android: {
            elevation: themeMode === 'dark' ? 4 : 5, 
          }
        })
      ]}
    >
      {/* Thumbnail Container */}
      <View className="w-full h-48 rounded-xl overflow-hidden mb-4 bg-zinc-800">
        <Image
          source={{ uri: giveaway.thumbnail }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

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
            <ThemedText className="text-[10px] uppercase font-montBold tracking-widest text-zinc-400 dark:text-zinc-400">Genre</ThemedText>
            <ThemedText className="font-montBold text-sm mt-0.5 opacity-90">
              {giveaway.genre}
            </ThemedText>
          </View>

          <View className="items-center">
            <ThemedText className="text-[10px] uppercase font-montBold tracking-widest text-zinc-400 dark:text-zinc-400">Publisher</ThemedText>
            <ThemedText className="font-mont text-xs mt-1 text-zinc-500 dark:text-zinc-300" numberOfLines={1}>
              {giveaway.publisher}
            </ThemedText>
          </View>

          <View className="items-end">
            <ThemedText className="text-[10px] uppercase font-montBold tracking-widest text-zinc-400 dark:text-zinc-400">Released</ThemedText>
            <ThemedText className="font-montBold text-xs mt-1 text-green-500">
              {formatDate(giveaway.release_date)}
            </ThemedText>
          </View>
        </View>
      </View>
      
      {/* Premium Split Action Buttons Container */}
      <View className="flex-row justify-between gap-3">
        <Button
          onPress={() => Linking.openURL(giveaway.game_url)}
          className="flex-1 font-montBold"
          style={{ 
            borderColor: themeMode === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.15)',
            borderWidth: 1 
          }}
          type="dark"
          text="View Site"
        />
        <Button
          onPress={() => Linking.openURL(giveaway.game_url)}
          className="flex-1 font-montBold"
          type="primary"
          text="Play Free"
        />
      </View>
    </ThemedView>
  );
}