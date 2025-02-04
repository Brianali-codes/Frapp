import { ScrollView, StyleSheet, Image } from 'react-native';
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
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.heading}>
        <ThemedText style={styles.text}>Free Games.</ThemedText>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {isLoading ? (
          <>
            <Skeleton animation="wave" style={styles.skeletonImage} />
            <Skeleton animation="wave" style={styles.skeletonImage2} />
            <Skeleton animation="wave" style={styles.skeletonImage2} />
            <Skeleton animation="wave" style={styles.skeletonImage2} />
            <Skeleton animation="wave" style={styles.skeletonImage} />
            <Skeleton animation="wave" style={styles.skeletonImage2} />
          </>
        ) : (
          giveaways
            .slice(0, currentPage * itemsPerPage)
            .map(giveaway => (
              <React.Fragment key={giveaway.id}>
                <ThemedView style={styles.cards}>
                  <ThemedText style={styles.text}>{giveaway.title}</ThemedText>
                  <Image source={{ uri: giveaway.thumbnail }} style={styles.cardImage} />
                  <Divider style={{ marginVertical: 10, height: 1, backgroundColor: 'transparent' }} />
                  <ThemedText style={styles.giveawayText}>{giveaway.short_description}</ThemedText>
                  <ThemedText style={styles.giveawayText}>Genre: <ThemedText style={styles.themeTexts}>{giveaway.genre}</ThemedText></ThemedText>
                  <ThemedText style={styles.giveawayText}>Publisher: <ThemedText style={styles.themeTexts}>{giveaway.publisher}</ThemedText></ThemedText>
                  <ThemedText style={styles.giveawayText}>Release Date: <ThemedText style={styles.themeTexts}>{giveaway.release_date}</ThemedText></ThemedText>
                  <Divider style={{ marginVertical: 10, height: 1, backgroundColor: 'transparent' }} />
                  <ThemedView style={styles.view4}>
                    <Button mode="contained-tonal" onPress={() => Linking.openURL(giveaway.game_url)} style={styles.btns}>
                      Get Game for Free
                    </Button>
                    <Button mode="contained" onPress={() => Linking.openURL(giveaway.game_url)} style={styles.btns}>
                      View Game on Site
                    </Button>
                  </ThemedView>
                </ThemedView>
              </React.Fragment>
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
    padding: 10,
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
    marginBottom: 10,
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
    height: 300,
    borderRadius: 10,
  },
  skeletonImage2: {
    width: '100%',
    height: 50,
    borderRadius: 10,
  },
  cards: {
    backgroundColor: '#2C415A',
    marginBottom: 10,
    borderRadius: 7,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginVertical: 5,
    padding: 20,
  },
  cardImage: {
    width: '95%',
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
