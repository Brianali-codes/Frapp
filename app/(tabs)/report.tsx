import Button from '@/components/custom/Button';
import { Divider } from '@/components/custom/Divider';
import { ThemedText } from '@/components/ThemedText';
import { APP_URLS } from '@/constants/app';
import { Alert, Linking, View } from 'react-native';

export default function ReportScreen() {
  const handleGitHubIssue = () => {
    Linking.canOpenURL(APP_URLS.GITHUB_ISSUES)
      .then((supported) => {
        if (supported) {
          Linking.openURL(APP_URLS.GITHUB_ISSUES);
        } else {
          Alert.alert('Error', 'Unable to open the GitHub issues page. Please try again later.');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  return (
    <View
      className="flex-1 pt-16 bg-black pb-32">
      <ThemedText className="text-white font-bold text-base mb-2 text-center p-1">
        Report a bug
      </ThemedText>
      <View className='px-4'>
        <ThemedText className="text-white">
          Having trouble with the app or noticed some bugs? Please file a report to let us know.
        </ThemedText>

        <Divider className="my-2 h-px bg-transparent" />

        <Button onPress={handleGitHubIssue} text='File a Report' />

        <Divider className="my-2 h-px bg-transparent" />

        <ThemedText className="text-white">
          For more detailed reports, file an issue at the GitHub repository. Feedback will be provided as soon as possible.
        </ThemedText>

        <Divider className="my-2 h-px bg-transparent" />

        <ThemedText className="text-white">
          This project utilizes the Gamepower API as well as the Free To Game API for fetching data and dynamically providing it to users. None of these APIs, as well as FRAPP, belong to me.
        </ThemedText>

        <Divider className="my-2 h-px bg-transparent" />
      </View>

      <View className='absolute bottom-[100px] left-0 right-0 w-full'>
        <Divider className="my-2 h-px bg-white" />

        <ThemedText className="text-white text-center">
          Frapp v1.0.8.
        </ThemedText>

      </View>
    </View>
  );
}
