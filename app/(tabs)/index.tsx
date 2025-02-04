import { ScrollView, StyleSheet, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import { Button } from 'react-native-paper';
import { Linking } from 'react-native';
import { Alert } from 'react-native';
import notifee, { AndroidImportance, TriggerType, AuthorizationStatus } from '@notifee/react-native';
import { Divider } from 'react-native-elements';
import { Skeleton } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';

const NOTIFICATIONS = async () => {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  const now = new Date();
  const nextTriggerTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9, 0, 0);

  await notifee.createTriggerNotification(
    {
      title: 'FRAPP',
      body: 'Check out todays giveaways.You would not wanna miss out.',
      android: {
        channelId: 'default',
      },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp: nextTriggerTime.getTime(),
    }
  );
};

const checkNotificationPermission = async () => {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
    NOTIFICATIONS();
  } else {
    Alert.alert(
      'Notifications Disabled',
      'Please enable notifications in your settings to receive updates.',
      [{ text: 'OK' }]
    );
  }
};

interface Giveaway {
  id: number;
  title: string;
  thumbnail: string;
  image: string;
  description: string;
  open_giveaway_url: string;
  open_giveaway: string;
  worth: string;
  end_date: string;
}

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [prices, setPrices] = useState(0);
  const [worth, setWorth] = useState(0);

  const checkWorth = async () => {
    const url = 'https://api.codetabs.com/v1/proxy?quest=https://www.gamerpower.com/api/worth';

    try {
      const worthResponse = await fetch(url);
      const worthRes = await worthResponse.json();
      const worthness = worthRes.active_giveaways_number;
      const worthPrices = worthRes.worth_estimation_usd;
      setPrices(worthness);
      setWorth(worthPrices);
    } catch (e) {
      Alert.alert("Couldn't fetch prices");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('https://api.codetabs.com/v1/proxy?quest=https://www.gamerpower.com/api/giveaways');
      const finalData: Giveaway[] = await response.json();
      setGiveaways(finalData);
      setIsLoading(false);
    } catch (error) {
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
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const monthName = monthNames[now.getMonth()];

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.heading}>
        <ThemedText style={styles.text}>Giveaways</ThemedText>
      </SafeAreaView>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {isLoading ? (
          <>
            <Skeleton animation="wave" style={styles.skeletonImage2} />
            <Skeleton animation="wave" style={styles.skeletonImage2} />
          </>
        ) : (
          <ThemedView style={styles.container}>
            <ThemedText style={styles.text1}>
              We have found <ThemedText style={styles.themeTexts}>{prices}</ThemedText> video game giveaways as of{' '}
              <ThemedText style={styles.themeTexts3}>{day} {monthName} {year}</ThemedText> with a total price of{' '}
              <ThemedText style={styles.themeTexts}>${worth}</ThemedText> for you to take advantage of before time expires.
            </ThemedText>
          </ThemedView>
        )}

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
              <ThemedView key={giveaway.id} style={styles.cards}>
                <ThemedText style={styles.text1}>{giveaway.title}</ThemedText>
                <Divider style={{ marginVertical: 10, height: 1, backgroundColor: 'transparent' }} />
                <Image source={{ uri: giveaway.thumbnail }} style={styles.cardImage} />
                <Divider style={{ marginVertical: 10, height: 1, backgroundColor: 'transparent' }} />
                <ThemedText style={styles.giveawayText}>{giveaway.description}</ThemedText>
                <Divider style={{ marginVertical: 10, height: 1, backgroundColor: 'transparent' }} />
                <ThemedText style={styles.giveawayText}>
                  Original Price: <ThemedText style={styles.themeTexts2}>{giveaway.worth}</ThemedText>
                </ThemedText>
                <ThemedText style={styles.giveawayText}>
                  Current Price: <ThemedText style={styles.themeTexts}>Free</ThemedText>
                </ThemedText>
                <ThemedText style={styles.giveawayText}>Ends on: {giveaway.end_date}</ThemedText>
                <Divider style={{ marginVertical: 10, height: 1, backgroundColor: 'transparent' }} />
                <ThemedView style={styles.view4}>
                  <Button mode="contained-tonal" style={styles.btns} onPress={() => Linking.openURL(giveaway.open_giveaway_url || giveaway.open_giveaway)}>
                    Get Giveaway
                  </Button>
                  <Button mode="contained" textColor="white" buttonColor="#6200ee" style={styles.btns} onPress={() => Linking.openURL(giveaway.open_giveaway_url || giveaway.open_giveaway)}>
                    View on Site
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
    padding: 10,
  },
  text: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
    padding: 5,
    gap: 5,
  },
  text1: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 3,
    gap: 3,
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  themeTexts: {
    color: '#00FF00',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 3,
    gap: 3,
  },
  themeTexts2: {
    color: 'red',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
    fontSize: 15,
    padding: 3,
    gap: 3,
  },
  themeTexts3: {
    color: 'lime',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 3,
    gap: 3,
  },
  skeletonImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  skeletonImage2: {
    height: 50,
    borderRadius: 10,
  },
  view4: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#2C415A',
    justifyContent: 'space-between',
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
  btns: {
    width: '49%',
  },
  cardImage: {
    width: '95%',
    height: 150,
    alignSelf: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  scrollViewContent: {
    paddingBottom: 20,
    gap: 10,
  },
  giveawayText: {
    color: 'white',
    fontSize: 14,
  },
});