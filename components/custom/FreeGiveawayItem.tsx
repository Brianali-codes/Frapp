import Button from '@/components/custom/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { formatDate } from '@/lib/utils';
import { FreeGiveaway } from '@/types';
import { Image, Linking, View } from 'react-native';

// 1. Import your custom theme hook
import { useThemeColor } from '@/hooks/useThemeColor';

export default function FreeGiveawayItem({ giveaway }: { giveaway: FreeGiveaway }) {
  // 2. Fetch semantic colors for card backgrounds
  // Usually, your global theme has a 'card' or 'background' property. 
  // Let's use 'card' here so it stands out slightly from the main screen wrapper.
  const cardBgColor = useThemeColor({}, 'background');

  return (
    // 3. Replaced 'bg-background' with inline style handling your dynamic theme
    <ThemedView style={{ backgroundColor: cardBgColor }} className="rounded-md mb-6 p-4">
      
      {/* 4. Removed 'text-white' so <ThemedText> falls back to light/dark automatically */}
      <ThemedText className="font-bold text-base">{giveaway.title}</ThemedText>
      
      <View className="my-2" />
      <Image
        source={{ uri: giveaway.thumbnail }}
        className="w-full h-48 rounded-lg self-center"
        resizeMode="cover"
      />
      <View className="my-2" />
      
      <ThemedText className="text-sm">{giveaway.short_description}</ThemedText>

      <ThemedText className="text-sm">
        Genre: <ThemedText className="font-bold">{giveaway.genre}</ThemedText>
      </ThemedText>

      <ThemedText className="text-sm">
        Publisher: <ThemedText className="font-bold">{giveaway.publisher}</ThemedText>
      </ThemedText>

      <ThemedText className="text-sm">
        Release Date: <ThemedText className="!text-green-400 font-bold">{formatDate(giveaway.release_date)}</ThemedText>
      </ThemedText>

      <View className="my-2" />
      
      {/* 5. Removed hardcoded dark blue 'bg-[#2C415A]' container color */}
      <ThemedView className="flex-row justify-between bg-transparent">
        <Button
          onPress={() => Linking.openURL(giveaway.game_url)}
          className="w-[49%]"
          text="Get for Free"
        />
        <Button
          onPress={() => Linking.openURL(giveaway.game_url)}
          className="w-[49%]"
          text="View Game on Site"
        />
      </ThemedView>
    </ThemedView>
  );
}