import Button from '@/components/custom/Button';
import { ThemedText } from '@/components/ThemedText';
import { APP_REPO_URL, APP_URLS, DEVICE_SETTINGS_URL } from '@/constants/app';
import { Alert, Linking, View, ScrollView } from 'react-native'; // 1. Added ScrollView import
import { useThemeColor } from '@/hooks/useThemeColor';

export default function SettingsScreen() {
  const backgroundColor = useThemeColor({}, 'background');

  const openNotificationSettings = async () => {
    try {
      await Linking.openURL(DEVICE_SETTINGS_URL);
    } catch (error) {
      Alert.alert('Error', 'Unable to open settings, please set them manually.');
    }
  };

  return (
    // 2. Changed root from View to ScrollView so the content can bounce and scroll if needed
    <ScrollView 
      style={{ backgroundColor }} 
      className="flex-1 pt-16 px-4"
      contentContainerStyle={{ paddingBottom: 40 }} // Adds safe padding at the bottom of the scroll
      showsVerticalScrollIndicator={false}
    >
      <ThemedText className="text-base font-bold p-2 text-center">
        Settings
      </ThemedText>

      <ThemedText className="text-base font-bold mb-4">
        Like the app? Star us on GitHub.
      </ThemedText>

      <View className='gap-6 mb-6'>
        <Button
          onPress={() => Linking.openURL(APP_REPO_URL)}
          text="✨ Star Us"
        />

        <Button
          onPress={openNotificationSettings}
          text="Change Notification Settings"
        />
      </View>

      <View className='my-6'>
        <ThemedText className="text-base font-bold mb-4">
          This project is made and maintained by an individual. Any act of support is appreciated.
          The project is open source, so anyone can contribute to maintenance or bring in new ideas.
        </ThemedText>

        <ThemedText className="text-base font-bold">
          To view the official site for the Gamepower API (used to fetch all games), click below.
          The free games API used is the FreeToGame API.
        </ThemedText>
      </View>

      <View className='gap-6 mb-6'>
        <Button
          onPress={() => Linking.openURL(APP_URLS.GAME_POWER_URL)}
          text="Go to Gamepower.com"
        />

        <Button
          onPress={() => Linking.openURL(APP_URLS.FREE_TO_GAME_URL)}
          text="Go to freetogame.com"
        />
      </View>
    </ScrollView>
  );
}