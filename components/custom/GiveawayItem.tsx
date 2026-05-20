import Button from '@/components/custom/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { formatDate } from '@/lib/utils';
import { Giveaway } from '@/types';
import { Image, Linking, View, Platform } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';

export default function GiveawayItem({ giveaway }: { giveaway: Giveaway }) {
  const textColor = useThemeColor({}, 'text');
  const { themeMode } = useCustomTheme();

  const cardBgColor = themeMode === 'dark' ? '#2c2c35' : '#f1f2f6';

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
      {/* Thumbnail with Overlay Badges */}
      <View className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-zinc-800">
        <Image
          source={{ uri: giveaway.thumbnail }}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute top-3 right-3 bg-green-500/90 px-3 py-1 rounded-full backdrop-blur-md">
          <ThemedText className="text-white font-montBlack text-xs uppercase tracking-wider">
            {giveaway.worth === 'N/A' || !giveaway.worth ? 'FREE' : '100% OFF'}
          </ThemedText>
        </View>
      </View>

      {/* Content Layout */}
      <View className="flex-1 space-y-2 mb-4">
        <ThemedText className="font-montBlack text-lg leading-tight tracking-tight mb-1">
          {giveaway.title}
        </ThemedText>
        
        <ThemedText className="text-zinc-500 dark:text-zinc-300 text-sm leading-relaxed mb-3 font-mont" numberOfLines={2}>
          {giveaway.description}
        </ThemedText>
        
        {/* Price & Meta Dashboard Row */}
        <View 
          style={{ borderColor: dividerColor, borderTopWidth: 1, borderBottomWidth: 1 }}
          className="flex-row items-center justify-between py-3 my-1"
        >
          <View>
            <ThemedText className="text-[10px] uppercase font-montBold tracking-widest text-zinc-400 dark:text-zinc-400">Value</ThemedText>
            <View className="flex-row items-center gap-1.5 mt-0.5">
              <ThemedText className="text-zinc-400 dark:text-zinc-400 text-xs font-montBold line-through">
                {giveaway.worth}
              </ThemedText>
              {/* TARGETED GREEN VALUE LIGHTING */}
              <ThemedText className="text-green-500 font-montBlack text-base">
                Free
              </ThemedText>
            </View>
          </View>

          <View className="items-end">
            <ThemedText className="text-[10px] uppercase font-montBold tracking-widest text-zinc-400 dark:text-zinc-400">Ends On</ThemedText>
            <ThemedText className="font-montBold text-sm mt-0.5 opacity-90">
              {formatDate(giveaway.end_date)}
            </ThemedText>
          </View>
        </View>
      </View>
      
      {/* Premium Buttons Container */}
      <View className="flex-row justify-between gap-3">
        <Button
          onPress={() => Linking.openURL(giveaway.open_giveaway_url)}
          className="flex-1 font-montBold"
          type="dark" 
          text="View Details"
        />
        <Button
          onPress={() => Linking.openURL(giveaway.open_giveaway_url)}
          className="flex-1 font-montBold"
          type="primary"
          text="Claim Now"
        />
      </View>
    </ThemedView>
  );
}