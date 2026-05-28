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

// Unique Notification ID hooks for our best target times
const NOTIFICATION_IDS = {
  MORNING: 'morning-giveaway',
  LUNCH: 'lunch-giveaway',
  EVENING: 'evening-giveaway',
};

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

/**
 * Universal internal timestamp scheduling calculation helper
 */
const getNextTriggerTime = (hours: number, minutes: number = 0): Date => {
  const now = new Date();
  const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
  
  // If the targeted time window has already slipped by today, push it to tomorrow
  if (now >= targetTime) {
    targetTime.setDate(targetTime.getDate() + 1);
  }
  return targetTime;
};

/**
 * Schedules a repeated daily notification template for a specific target window
 */
const scheduleSpecificNotification = async (
  notificationId: string, 
  hours: number, 
  title: string, 
  fallbackBody: string,
  giveaway: Giveaway | null
) => {
  await notifee.cancelNotification(notificationId);

  const triggerDate = getNextTriggerTime(hours);

  const notification: Parameters<typeof notifee.createTriggerNotification>[0] = {
    id: notificationId,
    title: title,
    body: giveaway ? `${giveaway.title} is free right now!` : fallbackBody,
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
    timestamp: triggerDate.getTime(),
    repeatFrequency: RepeatFrequency.DAILY,
  });
};

/**
 * Main orchestration function coordinating all optimal scheduling windows
 */
const scheduleAllGiveawayTimers = async () => {
  const giveaway = await fetchLatestGiveaway();

  // 1. Morning Drop Scan (9:00 AM)
  await scheduleSpecificNotification(
    NOTIFICATION_IDS.MORNING,
    9,
    "Morning Reminder",
    "Don't miss today's fresh giveaways. Tap to view what's free!",
    giveaway
  );

  // 2. Lunch Break Drop (1:00 PM)
  await scheduleSpecificNotification(
    NOTIFICATION_IDS.LUNCH,
    13,
    "Lunchtime Reminder",
    "Take a break and stack your library profiles with free items right now.",
    giveaway
  );

  // 3. Evening Peak Gaming Hours (8:00 PM)
  await scheduleSpecificNotification(
    NOTIFICATION_IDS.EVENING,
    20,
    "Evening Reminder",
    "Claim your evening gaming freebies before limited keys expire.",
    giveaway
  );
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
    await scheduleAllGiveawayTimers();
  } else {
    Alert.alert(
      'Notifications Disabled',
      'Enable notifications in your device settings to get daily giveaway reminders.',
      [{ text: 'OK' }]
    );
  }
};