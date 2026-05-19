import Button from '@/components/custom/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { formatDate } from '@/lib/utils';
import { Giveaway } from '@/types';
import { Image, Linking, View, Platform } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function GiveawayItem({ giveaway }: { giveaway: Giveaway }) {
  // 1. Fetch the surface 'card' background and 'text' color for the border
  const cardBgColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  return (
    <ThemedView 
      key={giveaway.id} 
      className="rounded-xl mb-6 p-4 border border-zinc-200 dark:border-zinc-800"
      style={[
        { 
          backgroundColor: cardBgColor,
          // 2. Dynamic border matching the theme line subtly via opacity
          borderColor: Platform.OS === 'ios' ? 'transparent' : undefined,
        },
        // 3. Elevated Drop Shadows that look great on both light and dark modes
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
      {/* Thumbnail with Overlay Badges */}
      <View className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-zinc-800">
        <Image
          source={{ uri: giveaway.thumbnail }}
          className="w-full h-full"
          resizeMode="cover"
        />
        {/* Dynamic Tag/Badge over the image */}
        <View className="absolute top-3 right-3 bg-green-500/90 px-3 py-1 rounded-full backdrop-blur-md">
          <ThemedText className="text-white font-black text-xs uppercase tracking-wider">
            {giveaway.worth === 'N/A' || !giveaway.worth ? 'FREE' : '100% OFF'}
          </ThemedText>
        </View>
      </View>

      {/* Content Layout */}
      <View className="flex-1 space-y-2 mb-4">
        <ThemedText className="font-extrabold text-lg leading-tight tracking-tight mb-1">
          {giveaway.title}
        </ThemedText>
        
        <ThemedText className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-3" numberOfLines={2}>
          {giveaway.description}
        </ThemedText>
        
        {/* Price & Meta Dashboard Row */}
        <View className="flex-row items-center justify-between border-t border-b border-zinc-100 dark:border-zinc-800/60 py-3 my-1">
          <View>
            <ThemedText className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Value</ThemedText>
            <View className="flex-row items-center gap-1.5 mt-0.5">
              <ThemedText className="text-zinc-400 text-xs font-semibold line-through">
                {giveaway.worth}
              </ThemedText>
              <ThemedText className="text-green-500 font-extrabold text-base">
                Free
              </ThemedText>
            </View>
          </View>

          <View className="items-end">
            <ThemedText className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Ends On</ThemedText>
            <ThemedText className="font-semibold text-sm mt-0.5 opacity-90">
              {formatDate(giveaway.end_date)}
            </ThemedText>
          </View>
        </View>
      </View>
      
      {/* Modernised Action Bar Buttons */}
      <ThemedView className="flex-row justify-between bg-transparent gap-3">
        <Button
          onPress={() => Linking.openURL(giveaway.open_giveaway_url)}
          className="flex-1"
          type="outline"
          text="View Details"
        />
        <Button
          onPress={() => Linking.openURL(giveaway.open_giveaway_url)}
          className="flex-1"
          type="primary"
          text="Claim Now 🎮"
        />
      </ThemedView>
    </ThemedView>
  );
}