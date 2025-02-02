import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ScrollView, Linking, Alert } from 'react-native';
import { Divider, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const handleGitHubIssue = () => {
    const githubIssuesLink = 'https://github.com/Brianali-codes/Frapp/issues';
    Linking.canOpenURL(githubIssuesLink)
      .then((supported) => {
        if (supported) {
          Linking.openURL(githubIssuesLink);
        } else {
          Alert.alert('Error', 'Unable to open the GitHub issues page. Please try again later.');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  return (
    <ThemedView style={styles.stepContainer}>
      <SafeAreaView>
        <ThemedText style={styles.text}>Report a bug</ThemedText>
      </SafeAreaView>

      <ScrollView style={styles.scrollViewContent}>
        <ThemedText style={styles.text2}>
          Having trouble with the app or noticed some bugs? Please file a report to let us know.
        </ThemedText>
        <Divider style={{ marginVertical: 10, height: 1, backgroundColor: 'transparent' }} />

        <Button mode="contained" onPress={handleGitHubIssue}>
          File a Report
        </Button>

        <Divider style={{ marginVertical: 10, height: 1, backgroundColor: 'transparent' }} />

        <ThemedText style={styles.text2}>
          For more detailed reports, file an issue at the GitHub repository. Feedback will be provided as soon as possible.
        </ThemedText>

        <Divider style={{ marginVertical: 10, height: 1, backgroundColor: 'transparent' }} />

        <ThemedText style={styles.text2}>
          This project utilizes the Gamepower API as well as the Free To Game API for fetching data and dynamically providing it to users. None of these APIs, as well as FRAPP, belong to me.
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    backgroundColor: 'black',
    gap: 8,
    marginBottom: 8,
    padding: 10,
  },
  text: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10,
    padding: 5,
  },
  text2: {
    color: 'white',
  },
  scrollViewContent: {
    paddingBottom: 20,
    gap: 10,
    padding: 5,
    margin: 5,
    backgroundColor: 'black',
  },
});
