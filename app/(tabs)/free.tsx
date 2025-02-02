import { ScrollView, StyleSheet, Image } from 'react-native'; 
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import { Button, Divider } from 'react-native-paper';
import { Linking } from 'react-native';
import { Skeleton } from '@rneui/themed';
import { Alert } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//initital typescript magic for better error handling.
interface Giveaway {
  id: number;
  title: string;
  thumbnail: string; 
  image:string;
  short_description: string;
  open_giveaway_url : string; 
  open_giveaway:string;
  worth:string;
  game_url:string;
  genre:string;
  publisher:string;
  release_date:string;
}

export default function HomeScreen() {

  const [isLoading, setIsLoading] = useState(true);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]); // Define state with type
  const [fontsize, setFontSize] = useState('small')


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
      Alert.alert('Unable to fetch games check your connection or relaunch the app.');
    }
  };
  // Use useEffect to fetch the data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.heading}>
        <ThemedText style={styles.text}>
          Free Games.
        </ThemedText>
      </SafeAreaView>
      
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
            <React.Fragment key={giveaway.id}>
              <ThemedView style={styles.cards}>
                <ThemedText style={styles.text}>
                  {giveaway.title}
                </ThemedText>  
                <Image source={{ uri: giveaway.thumbnail }} style={styles.cardImage} />
                <Divider style={{ marginVertical: 10, height: 1, backgroundColor: 'transparent' }} />
                <ThemedText style={styles.giveawayText}>
                  {giveaway.short_description}
                </ThemedText>
                <ThemedText style={styles.giveawayText}>Genre: <ThemedText style={styles.themeTexts}>{giveaway.genre}</ThemedText></ThemedText>
                  <ThemedText style={styles.giveawayText}>Publisher: <ThemedText style={styles.themeTexts}>{giveaway.publisher}</ThemedText></ThemedText>
                  <ThemedText style={styles.giveawayText}>Release Date : <ThemedText style={styles.themeTexts}>{giveaway.release_date}</ThemedText></ThemedText>
                  <Divider style={{ marginVertical: 10, height: 1, backgroundColor: 'transparent' }} />
                <ThemedView style={styles.view4}>
                    <Button 
                      mode="contained-tonal" 
                      onPress={() => Linking.openURL(giveaway.game_url)}
                      style={styles.btns}
                    >
                      Get Game for free
                    </Button>
                    <Button 
                      mode="contained" 
                      onPress={() => Linking.openURL(giveaway.game_url)}
                      style={styles.btns}
                    >
                      View game on site
                    </Button>
                </ThemedView>
              </ThemedView>
            </React.Fragment>
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
  btns:{
    width:'49%',
  },
  view4: {
    display:'flex',
    flexDirection:'row',
    backgroundColor:'#2C415A',
    justifyContent:'space-between',
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
    marginBottom:10,
    padding:5,
    gap:5,
  },
  themeTexts: {
    color: '#00FF00',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 15,
    padding:3,
    gap:3,
  },
  heading: {
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',

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
    width: '95%',
    height: 150,
    alignSelf:'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  worth:{
    textDecorationLine:'line-through',
    color:'white',
  },
  icons: {
    padding:5,
    fontSize:23,
    marginBottom:10,
  },
  scrollViewContent: {
    paddingBottom: 20, 
    gap: 10,
    backgroundColor:'#1b2838',
  },
  giveawayText: {
    color: 'white',
    fontSize: 14,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

