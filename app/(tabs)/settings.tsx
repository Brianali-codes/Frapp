import { StyleSheet, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Divider } from 'react-native-paper';
import { Linking } from 'react-native';
import { Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function HomeScreen() {


  const openNotificationSettings = async () => {
    const url =
      Platform.OS === 'ios'
        ? 'app-settings:' // For iOS
        : 'android.settings.APP_NOTIFICATION_SETTINGS'; // For Android 
  
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Error', 'Unable to open settings');
    }
  };
  return (
      <ThemedView style={styles.stepContainer}>

        <SafeAreaView>
            <ThemedText style={styles.text}>
                  SETTINGS
            </ThemedText>
        </SafeAreaView>
        
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <ThemedText style={styles.text}>Like The app? star us on github.</ThemedText>
          <Button mode="contained"
                  onPress={() => Linking.openURL('https://github.com/Brianali-codes/Frapp1.0.0official')}
          >Star Us</Button>
          <Button mode="contained"
                  onPress={openNotificationSettings}
          >Change notification settings</Button>

          <ThemedText style={styles.text}>This Project is made and maintained by an individual therefore any act of support is appreciated, The project is also open source therefore any person(s) can contribute to maintain as well as formulate new ideas regarding the project.</ThemedText>
          <ThemedText style={styles.text}>In order to view the official site for the API provider (Gamepower api) who provides all games in the app you can find them by clicking the button below.</ThemedText>
          
          <Button mode="contained"
                  onPress={() => Linking.openURL('https://www.gamerpower.com/')}
          >Go to Gamepower.com</Button>

        </ScrollView>
        
        
      </ThemedView>
    
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    backgroundColor:'black',
    gap: 8,
    marginBottom: 8,
    padding:5,
  },
  text: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10,
    display: 'flex',
    padding:5,
    gap:5,
  },
  scrollViewContent: {
    paddingBottom: 20, // Space at the bottom of the scrollable content
    gap: 10,
    backgroundColor:'black',
  },
  icons: {
    fontSize:18,
  },
});
