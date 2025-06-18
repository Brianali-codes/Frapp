import Button from '@/components/custom/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { formatDate } from '@/lib/utils';
import { FreeGiveaway } from '@/types';
import { Image, Linking, View } from 'react-native';

export default function FreeGiveawayItem({ giveaway }: { giveaway: FreeGiveaway }) {
    return (
        <ThemedView className="bg-background rounded-md mb-6 p-4">
            <ThemedText className="text-white font-bold text-base">{giveaway.title}</ThemedText>
            <View className="my-2" />
            <Image
                source={{ uri: giveaway.thumbnail }}
                className="w-full h-48 rounded-lg self-center"
                resizeMode="cover"
            />
            <View className="my-2" />
            <ThemedText className="text-white text-sm">{giveaway.short_description}</ThemedText>

            <ThemedText className="text-white text-sm">
                Genre: <ThemedText className="font-bold">{giveaway.genre}</ThemedText>
            </ThemedText>

            <ThemedText className="text-white text-sm">
                Publisher: <ThemedText className=" font-bold">{giveaway.publisher}</ThemedText>
            </ThemedText>

            <ThemedText className="text-white text-sm">
                Release Date: <ThemedText className="!text-green-400 font-bold">{formatDate(giveaway.release_date)}</ThemedText>
            </ThemedText>

            <View className="my-2" />
            <ThemedView className="flex-row justify-between bg-[#2C415A]">
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
    )
}
