import Button from '@/components/custom/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { formatDate } from '@/lib/utils';
import { FreeGiveaway } from '@/types';
import { Image, Linking, View, Platform } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function FreeGiveawayItem({ giveaway }: { giveaway: FreeGiveaway }) {
  // 1. Fetch the surface 'card' background and 'text' color for high-end shadows
  const cardBgColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <ThemedView 
      key={giveaway.id} 
      className="rounded-xl mb-6 p-4 border border-zinc-200 dark:border-zinc-800"
      style={[
        { 
          backgroundColor: cardBgColor,
          borderColor: Platform.OS === 'ios' ? 'transparent' : undefined,
        },
        // 2. Elevated Floating Drop Shadows matching the GiveawayItem profile
        Platform.select({
          ios: {
            shadowColor: textColor,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
          },
          android: {
            elevation: 4,
          }
        })
      ]}
    >
      {/* Thumbnail Container without the missing API tags */}
      <View className="w-full h-48 rounded-xl overflow-hidden mb-4 bg-zinc-800">
        <Image
          source={{ uri: giveaway.thumbnail }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Content Layout */}
      <View className="flex-1 space-y-2 mb-4">
        <ThemedText className="font-extrabold text-lg leading-tight tracking-tight mb-1">
          {giveaway.title}
        </ThemedText>
        
        <ThemedText className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-3" numberOfLines={2}>
          {giveaway.short_description}
        </ThemedText>
        
        {/* Metadata Dashboard Row */}
        <View className="flex-row items-center justify-between border-t border-b border-zinc-100 dark:border-zinc-800/60 py-3 my-1">
          <View>
            <ThemedText className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Genre</ThemedText>
            <ThemedText className="font-bold text-sm mt-0.5 opacity-90">
              {giveaway.genre}
            </ThemedText>
          </View>

          <View className="items-center">
            <ThemedText className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Publisher</ThemedText>
            <ThemedText className="font-semibold text-xs mt-1 text-zinc-500 dark:text-zinc-400" numberOfLines={1}>
              {giveaway.publisher}
            </ThemedText>
          </View>

          <View className="items-end">
            <ThemedText className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Released</ThemedText>
            <ThemedText className="font-bold text-xs mt-1 text-green-500">
              {formatDate(giveaway.release_date)}
            </ThemedText>
          </View>
        </View>
      </View>
      
      {/* Premium Split Action Buttons */}
      <ThemedView className="flex-row justify-between bg-transparent gap-3">
        <Button
          onPress={() => Linking.openURL(giveaway.game_url)}
          className="flex-1"
          type="outline"
          text="View Site"
        />
        <Button
          onPress={() => Linking.openURL(giveaway.game_url)}
          className="flex-1"
          type="primary"
          text="Play Free"
        />
      </ThemedView>
    </ThemedView>
  );
}