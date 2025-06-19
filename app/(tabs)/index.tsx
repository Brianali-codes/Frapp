import Button from '@/components/custom/Button';
import GiveawayItem from '@/components/custom/GiveawayItem';
import GiveawaySkeleton from '@/components/custom/GiveawaySkeleton';
import { ThemedText } from '@/components/ThemedText';
import { API_ENDPOINTS } from '@/constants/api';
import { checkNotificationPermission } from '@/lib/notifications';
import { Giveaway } from '@/types';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';

export default function GiveawayScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [prices, setPrices] = useState(0);
  const [worth, setWorth] = useState(0);

  const checkWorth = async () => {
    try {
      const worthResponse = await fetch(API_ENDPOINTS.Worth);
      const worthRes = await worthResponse.json();
      setPrices(worthRes.active_giveaways_number);
      setWorth(worthRes.worth_estimation_usd);
    } catch {
      Alert.alert("Couldn't fetch prices");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.Giveaways);
      const finalData: Giveaway[] = await response.json();
      setGiveaways(finalData);
      setIsLoading(false);
    } catch {
      setIsLoading(false);
      Alert.alert('Unable to fetch giveaways. Check your connection or relaunch the app.');
    }
  };

  useEffect(() => {
    fetchData();
    checkNotificationPermission();
    checkWorth();
  }, []);

  const loadMoreItems = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const now = new Date();
  const day = now.getDate();
  const year = now.getFullYear();
  const monthName = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ][now.getMonth()];

  return (
    <ScrollView
      className='flex-1 px-4 pt-16 bg-black pb-32'
      contentContainerStyle={{ paddingBottom: 100 }}
    // stickyHeaderIndices={[0]}
    >
      <ThemedText className="text-white text-3xl font-extrabold text-center my-4">
        🎮 Free to Redeem
      </ThemedText>
      {/* Summary Section */}
      {!isLoading && (
        <View className="rounded-lg p-4">
          <ThemedText className="text-white font-semibold text-base leading-6">
            We have found{' '}
            <ThemedText className="text-green-400 font-bold">${prices}</ThemedText> video game giveaways as of{' '}
            <ThemedText className="text-lime-400 font-bold">{day} {monthName} {year}</ThemedText>, with a total value of{' '}
            <ThemedText className="text-green-400 font-bold">${worth}</ThemedText>. Claim them before time runs out!
          </ThemedText>
        </View>
      )}

      {/* Skeleton / Giveaways List */}
      <GiveawaySkeleton loading={isLoading}>
        {giveaways
          .slice(0, currentPage * itemsPerPage)
          .map(giveaway => (
            <GiveawayItem key={giveaway.id} giveaway={giveaway} />
          ))}
      </GiveawaySkeleton>


      {/* Load More */}
      {!isLoading && currentPage * itemsPerPage < giveaways.length && (
        <Button
          type="outline"
          onPress={loadMoreItems}
          className="mt-2"
          text="Load More"
        />
      )}
    </ScrollView>

  );
}
