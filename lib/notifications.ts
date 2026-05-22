import notifee, {
  AndroidImportance,
  AndroidStyle,
  AuthorizationStatus,
  TriggerType,
  RepeatFrequency,
} from '@notifee/react-native';
import { Alert, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { API_ENDPOINTS } from '@/constants/api';
import { Giveaway } from '@/types';

const CHANNEL_ID = 'default';
const NOTIFICATION_ID = 'daily-giveaway';

const createChannel = async () => {
  await notifee.createChannel({
    id: CHANNEL_ID,
    name: 'Daily Giveaway Reminders',
    importance: AndroidImportance.HIGH,
  });
};

const fetchLatestGiveaway = async (): Promise<Giveaway | null> => {
  try {
    const response = await fetch(API_ENDPOINTS.Giveaways);
    if (!response.ok) return null;
    const data: Giveaway[] = await response.json();
    return data?.[0] ?? null;
  } catch {
    return null;
  }
};

const downloadImage = async (url: string): Promise<string | null> => {
  try {
    const filename = url.split('/').pop() ?? 'giveaway.jpg';
    const localPath = `${FileSystem.cacheDirectory}${filename}`;

    const existing = await FileSystem.getInfoAsync(localPath);
    if (existing.exists) return localPath;

    const result = await FileSystem.downloadAsync(url, localPath);
    return result.uri;
  } catch {
    return null;
  }
};

const scheduleDailyNotification = async () => {
  await notifee.cancelNotification(NOTIFICATION_ID);

 
const now = new Date();
const todayAt9 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);

const trigger = now < todayAt9
  ? todayAt9
  : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9, 0, 0);

  const giveaway = await fetchLatestGiveaway();

  const notification: Parameters<typeof notifee.createTriggerNotification>[0] = {
    id: NOTIFICATION_ID,
    title: 'Todays Giveaways Are Live!',
    body: giveaway
      ? ` ${giveaway.title} is free right now!`
      : "Today's free game giveaways are live. Don't miss out!",
    android: {
      channelId: CHANNEL_ID,
    },
  };

  if (Platform.OS === 'android' && giveaway?.image) {
    const localImagePath = await downloadImage(giveaway.image);

    if (localImagePath && notification.android) {
      notification.android.style = {
        type: AndroidStyle.BIGPICTURE,
        picture: localImagePath,
      };
      notification.android.largeIcon = localImagePath;
    }
  }

  await notifee.createTriggerNotification(notification, {
    type: TriggerType.TIMESTAMP,
    timestamp: trigger.getTime(),
    repeatFrequency: RepeatFrequency.DAILY,
  });
};

export const initNotifications = async () => {
  await createChannel();
};

export const checkNotificationPermission = async () => {
  const settings = await notifee.requestPermission();
  const granted =
    settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
    settings.authorizationStatus === AuthorizationStatus.PROVISIONAL;

  if (granted) {
    await scheduleDailyNotification();
  } else {
    Alert.alert(
      'Notifications Disabled',
      'Enable notifications in your device settings to get daily giveaway reminders.',
      [{ text: 'OK' }]
    );
  }
};