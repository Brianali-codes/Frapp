import Button from '@/components/custom/Button';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { formatDate } from '@/lib/utils';
import { Giveaway } from '@/types';
import { Image, Linking, View } from 'react-native';

export default function GiveawayItem({ giveaway }: { giveaway: Giveaway }) {
    return (
        <ThemedView key={giveaway.id} className="bg-background rounded-md mb-6 p-4">
            <ThemedText className="text-white font-bold text-base">{giveaway.title}</ThemedText>
            <View className="my-2" />
            <Image
                source={{ uri: giveaway.thumbnail }}
                className="w-full h-48 rounded-lg self-center"
            />
            <View className="my-2" />
            <ThemedText className="text-white text-sm">{giveaway.description}</ThemedText>
            <View className="my-1" />
            <ThemedText className="text-white text-sm">
                Original Price:{' '}
                <ThemedText className="!text-red-600 font-bold line-through">{giveaway.worth}</ThemedText>
            </ThemedText>
            <ThemedText className="text-white text-sm">
                Current Price: <ThemedText className="!text-green-500 font-bold">Free</ThemedText>
            </ThemedText>
            <ThemedText className="text-white text-sm">Ends on: {formatDate(giveaway.end_date)}</ThemedText>
            <View className="my-2" />
            <ThemedView className="flex-row justify-between bg-[#2C415A]">
                <Button
                    onPress={() => Linking.openURL(giveaway.open_giveaway_url)}
                    className="w-[49%]"
                    text="Redeem"
                />
                <Button
                    onPress={() => Linking.openURL(giveaway.open_giveaway_url)}
                    className="w-[49%]"
                    text="View on Site"
                />
            </ThemedView>
        </ThemedView>
    )
}
