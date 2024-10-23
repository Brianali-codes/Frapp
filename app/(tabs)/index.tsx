import { ScrollView, StyleSheet, Image } from 'react-native'; 
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Button } from 'react-native-paper';
import { Linking } from 'react-native';
import { Alert } from 'react-native';
import notifee, { AndroidImportance, TriggerType,AuthorizationStatus } from '@notifee/react-native';
import { Divider } from 'react-native-elements';
import { Skeleton } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';

const NOTIFICATIONS = async() => {

    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });

    const now = new Date();
    const nextTriggerTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9, 0, 0);

    //this schedules the notification for specific times that are ruled out
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

  // Check the authorization status from the returned settings
  if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
    NOTIFICATIONS(); // Schedule notifications if permission granted
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
  image:string;
  description: string;
  open_giveaway_url : string; 
  open_giveaway:string;
  worth:string;
  end_date:string;
}

export default function HomeScreen() {

  const calculateTimeDifference = (startDate: string, endDate: string): { days: number; hours: number; minutes: number; seconds: number } => {
    // Convert the date strings into Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = end.getTime() - start.getTime();
  
    // Calculate time units
    const seconds = Math.floor((differenceInMilliseconds / 1000) % 60);
    const minutes = Math.floor((differenceInMilliseconds / (1000 * 60)) % 60);
    const hours = Math.floor((differenceInMilliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  
    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };
  
  // Example usage
  const startDate = '2024-10-11 12:14:19';
  const endDate = '2024-11-30 23:59:00';
  const difference = calculateTimeDifference(startDate, endDate);

  //will be used in future versions to calculate time left for respective giveaways.

  const [prices,setPrices] = useState(0)
  const [worth,setWorth] = useState(0)

  const checkWorth = async ()=>{

      const url = 'https://corsproxy.io/?https://www.gamerpower.com/api/worth'
      
      try{
        const worthResponse = await fetch(url);
        const worthRes = await worthResponse.json();
        const worthness = worthRes.active_giveaways_number
        const worthPrices = worthRes.worth_estimation_usd      
        setPrices(worthness)
        setWorth(worthPrices)
      }
      catch(e){
        Alert.alert("couldnt fetch prices")
      }
  }

  useEffect(()=>{
    checkWorth()

  }),([])
  useEffect(() => {
    //affects when prices and worth variables are going to change.
  }, [prices, worth]); 


    const [isLoading, setIsLoading] = useState(true);
    const [giveaways, setGiveaways] = useState<Giveaway[]>([]); // Define state with type
    const url = 'https://corsproxy.io/?https://www.gamerpower.com/api/giveaways';

  


  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const finalData: Giveaway[] = await response.json();
      setGiveaways(finalData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Unable to fetch giveaways check your connection or relaunch the app.');
    }
  };

  // Use useEffect to fetch data on component mount
  useEffect(() => {
    fetchData();
    checkNotificationPermission()
  }, []);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView>
        <ThemedText style={styles.text}>
          <TabBarIcon name={'gift-sharp'} style={styles.icons}/>
          GIVEAWAYS
        </ThemedText>
      </SafeAreaView>
      
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

      {isLoading ? (<>
            <Skeleton animation="wave" style={styles.skeletonImage2}/>
            <Skeleton animation="wave" style={styles.skeletonImage2}/>
        </>  
        ):(
          <ThemedView style={styles.container}>
            <ThemedText style={styles.text1}>Active Number of Giveaways today : <ThemedText style={styles.themeTexts}>{prices}</ThemedText>.</ThemedText>
            <ThemedText style={styles.text1}>Total Prices of Giveaways : <ThemedText style={styles.themeTexts}>${worth}</ThemedText>.</ThemedText>  
          </ThemedView>
        )
      }
        {isLoading ? (
            <>
              <Skeleton animation="wave" style={styles.skeletonImage}/>
              <Skeleton animation="wave" style={styles.skeletonImage2}/>
              <Skeleton animation="wave" style={styles.skeletonImage2}/>
              <Skeleton animation="wave" style={styles.skeletonImage2}/>
              <Skeleton animation="wave" style={styles.skeletonImage}/>
              <Skeleton animation="wave" style={styles.skeletonImage2}/>
            </>
        ) : (
          giveaways.map(giveaway => (

            <ThemedView key={giveaway.id} style={styles.cards}>
              <ThemedText style={styles.text1}>
                {giveaway.title}
              </ThemedText>  
              <Divider style={{ marginVertical: 10, height: 1, backgroundColor: 'transparent' }} />
              <Image source={{ uri: giveaway.thumbnail }} style={styles.cardImage}/>
              <Divider style={{ marginVertical: 10, height: 1, backgroundColor: 'transparent' }} />
              <ThemedText style={styles.giveawayText}>
                {giveaway.description}
              </ThemedText>
              <Divider style={{ marginVertical: 10, height: 1, backgroundColor: 'transparent' }} />
              <ThemedText style={styles.giveawayText}>Original Price : <ThemedText style={styles.themeTexts2}>
                {giveaway.worth}
              </ThemedText>
              </ThemedText>
              <ThemedText style={styles.giveawayText}>
                  Current Price : <ThemedText style={styles.themeTexts}>0.00$</ThemedText>
              </ThemedText>
              <ThemedText style={styles.giveawayText}>
                Ends on : {giveaway.end_date}
              </ThemedText>
              <Divider style={{ marginVertical: 10, height: 1, backgroundColor: 'transparent' }} />
                <Button mode="contained"
                  onPress={() => Linking.openURL(giveaway.open_giveaway_url || giveaway.open_giveaway)}
              >Get Giveaway</Button>
            </ThemedView>
          ))
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes the full screen height to enable scrolling.
    backgroundColor: '#1b2838',
    padding: 10,
  },
  text: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding:5,
    gap:3,
  },
  text1: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 15,
    padding:3,
    gap:3,
  },
  themeTexts: {
    color: '#00FF00',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 15,
    padding:3,
    gap:3,
  },
  themeTexts2: {
    color: 'red',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    textDecorationLine:'line-through',
    fontSize: 15,
    padding:3,
    gap:3,
  },
  skeletonImage:{
    width:'100%',
    height:300,
    borderRadius:10,
  },
  skeletonImage2:{
    width:'100%',
    height:50,
    borderRadius:10,
  },
  cards: {
    borderColor: 'white',
    backgroundColor: '#2C415A',
    marginBottom: 10,
    borderRadius: 7,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    marginVertical: 5,
    marginHorizontal: 5,
    padding:20,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  icons: {
    marginBottom: 4,
    fontSize:21,
  },
  scrollViewContent: {
    paddingBottom: 20, // Space at the bottom of the scrollable content
    gap: 10,
  },
  giveawayText: {
    color: 'white',
    fontSize: 16,
  },
  thumbnail: {
    width: 50,
    height: 60,
    marginBottom: 10,
  },
});



