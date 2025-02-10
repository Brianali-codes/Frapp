import { ScrollView, StyleSheet, Image, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import { Button, Divider } from 'react-native-paper';
import { Linking, Alert } from 'react-native';
import { Skeleton } from '@rneui/themed';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';


interface Giveaway {
  id: number;
  title: string;
  thumbnail: string; 
  image: string;
  short_description: string;
  open_giveaway_url: string; 
  open_giveaway: string;
  worth: string;
  game_url: string;
  genre: string;
  publisher: string;
  release_date: string;
  margin:string;
}

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const url = 'https://api.codetabs.com/v1/proxy?quest=https://www.freetogame.com/api/games';

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const finalData: Giveaway[] = await response.json();
      setGiveaways(finalData);
      setIsLoading(false);

      // Notify the user that a game is available
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

  const additionalStyles = {
    // Add any additional styles you want to apply
    // Example:
    resizeMode: 'cover', // or any other ImageStyle properties
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.heading}>
        <ThemedText style={styles.text}>
          Free to Play.</ThemedText>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {isLoading ? (
          <>
            {Array.from({ length: 5 }).map((_, index) => (
              <ThemedView key={index} style={styles.cards}>
                <Skeleton animation="wave" style={styles.skeletonImage} />
                
                <Skeleton animation="wave" style={styles.skeletonImage2} />
                <Skeleton animation="wave" style={styles.skeletonImage2} />
                <Skeleton animation="wave" style={styles.skeletonImage2} />
                
              </ThemedView>
            ))}
          </>
        ) : (
          giveaways
            .slice(0, currentPage * itemsPerPage)
            .map(giveaway => (
              <ThemedView key={giveaway.id} style={styles.cards}>
                <ThemedText style={styles.text}>{giveaway.title}</ThemedText>
                <View style={{ marginVertical: 10 }} />
                <Image source={{ uri: giveaway.thumbnail }} style={styles.cardImage} />
                <View style={{ marginVertical: 10 }} />
                <ThemedText style={styles.giveawayText}>{giveaway.short_description}</ThemedText>
                
                <ThemedText style={styles.giveawayText}>Genre: <ThemedText style={styles.themeTexts}>{giveaway.genre}</ThemedText></ThemedText>
                
                <ThemedText style={styles.giveawayText}>Publisher: <ThemedText style={styles.themeTexts}>{giveaway.publisher}</ThemedText></ThemedText>
                
                <ThemedText style={styles.giveawayText}>Release Date: <ThemedText style={styles.themeTexts}>{giveaway.release_date}</ThemedText></ThemedText>
                <View style={{ marginVertical: 10 }} />
                <ThemedView style={styles.view4}>
                  <Button mode="contained-tonal" onPress={() => Linking.openURL(giveaway.game_url)} style={styles.btns}>
                    Get for Free
                  </Button>
                  <Button mode="contained" onPress={() => Linking.openURL(giveaway.game_url)} style={styles.btns}>
                    View Game on Site
                  </Button>
                </ThemedView>
              </ThemedView>
            ))
        )}

        {!isLoading && currentPage * itemsPerPage < giveaways.length && (
          <Button mode="outlined" onPress={loadMoreItems} style={{ marginTop: 10 }}>
            Load More
          </Button>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b2838',
    padding: 3,
  },
  btns: {
    width: '49%',
  },
  view4: {
    flexDirection: 'row',
    backgroundColor: '#2C415A',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 5,
    margin:'auto',
    padding: 5,
  },
  themeTexts: {
    color: '#00FF00',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 3,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skeletonImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  skeletonImage2: {
    width: '100%',
    height: 30,
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 5,
  },
  cards: {
    borderColor: 'white',
    backgroundColor: '#2C415A',
    marginBottom: 5,
    borderRadius: 7,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginVertical: 5,
    marginHorizontal: 5,
    padding: 15,
  },
  cardImage: {
    width: '100%',
    height: 150,
    alignSelf: 'center',
    borderRadius: 10,
  },
  giveawayText: {
    color: 'white',
    fontSize: 14,
  },
  scrollViewContent: {
    paddingBottom: 20,
    backgroundColor: '#1b2838',
  },
});
