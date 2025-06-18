import Button from '@/components/custom/Button';
import FreeGiveawayItem from '@/components/custom/FreeGiveawayItem';
import GiveawaySkeleton from '@/components/custom/GiveawaySkeleton';
import { ThemedText } from '@/components/ThemedText';
import { API_ENDPOINTS } from '@/constants/api';
import { FreeGiveaway } from '@/types';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';

export default function FreeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [giveaways, setGiveaways] = useState<FreeGiveaway[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.Games);
      const finalData: FreeGiveaway[] = await response.json();
      setGiveaways(finalData);
      setIsLoading(false);

      if (finalData.length > 0) {
        Alert.alert('Game Available', `A game has been fetched from the API: ${finalData[0].title}`);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
      Alert.alert('Unable to fetch games. Check your connection or relaunch the app.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const loadMoreItems = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <ScrollView className='flex-1 px-4 pt-16 bg-black pb-32' contentContainerStyle={{ paddingBottom: 100 }}>
      <ThemedText className="text-white font-bold text-base text-center mb-4">Free to Play.</ThemedText>
      <GiveawaySkeleton loading={isLoading}>
        {giveaways
          .slice(0, currentPage * itemsPerPage)
          .map(giveaway => (
            <FreeGiveawayItem key={giveaway.id} giveaway={giveaway} />
          ))}
      </GiveawaySkeleton>

      {!isLoading && currentPage * itemsPerPage < giveaways.length && (
        <Button
          type="outline"
          onPress={loadMoreItems}
          className="mt-2 mx-2"
          text="Load More"
        />
      )}
    </ScrollView>
  );
}
