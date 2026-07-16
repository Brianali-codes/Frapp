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

const CHANNEL_ID = 'giveaway_alerts';

const NOTIFICATION_IDS = {
  MORNING: 'morning-giveaway',
  LUNCH: 'lunch-giveaway',
  EVENING: 'evening-giveaway',
};

/**
 * Ensures the Android high-importance notification channel exists
 */
const createChannel = async () => {
  await notifee.createChannel({
    id: CHANNEL_ID,
    name: 'Daily Giveaway Reminders',
    importance: AndroidImportance.HIGH,
    vibration: true,
  });
};

/**
 * Network fetching pipeline with timeout limits
 */
const fetchLatestGiveaway = async (): Promise<Giveaway | null> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second network limit

    const response = await fetch(API_ENDPOINTS.Giveaways, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) return null;
    const data: Giveaway[] = await response.json();
    return data?.[0] ?? null;
  } catch {
    return null;
  }
};

/**
 * Downloads image safely into storage and manages cache limits to save device memory
 */
const downloadImage = async (url: string): Promise<string | null> => {
  try {
    const filename = url.split('/').pop()?.split('?')[0] ?? 'giveaway.jpg';
    const cacheFolder = `${FileSystem.cacheDirectory}giveaway_banners/`;
    const localPath = `${cacheFolder}${filename}`;

    // Ensure our sub-directory exists
    const dirInfo = await FileSystem.getInfoAsync(cacheFolder);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(cacheFolder, { intermediates: true });
    } else {
      // Production Self-Cleaning Utility: If total directory holds too many assets, flush them
      const files = await FileSystem.readDirectoryAsync(cacheFolder);
      if (files.length > 10) {
        for (const file of files) {
          await FileSystem.deleteAsync(`${cacheFolder}${file}`, { idempotent: true });
        }
      }
    }

    const existing = await FileSystem.getInfoAsync(localPath);
    if (existing.exists) return localPath;

    const result = await FileSystem.downloadAsync(url, localPath);
    return result.uri;
  } catch {
    return null;
  }
};

/**
 * Universal timestamp calculation strategy targeting future event schedules
 */
const getNextTriggerTime = (hours: number, minutes: number = 0): Date => {
  const now = new Date();
  const targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
  
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
  giveaway: Giveaway | null
) => {
  await notifee.cancelNotification(notificationId);

  const triggerDate = getNextTriggerTime(hours);
  
  const displayTitle = giveaway ? `${giveaway.title} is live right now!` : "New free giveaway is live right now!";
  const displayBody = giveaway?.description ? giveaway.description : "Tap to claim your free reward before keys run out!";

  const notification: Parameters<typeof notifee.createTriggerNotification>[0] = {
    id: notificationId,
    title: displayTitle,
    body: displayBody,
    android: {
      channelId: CHANNEL_ID,
      importance: AndroidImportance.HIGH,
      pressAction: {
        id: 'default',
        launchActivity: 'default', // Ensures app wakes up when tapped in background
      },
    },
    ios: {
      sound: 'default',
      critical: false,
    }
  };

  if (Platform.OS === 'android' && giveaway?.image) {
    const localImagePath = await downloadImage(giveaway.image);
    if (localImagePath && notification.android) {
      notification.android.style = {
        type: AndroidStyle.BIGPICTURE,
        picture: localImagePath,
      };
    }
  }

  await notifee.createTriggerNotification(notification, {
    type: TriggerType.TIMESTAMP,
    timestamp: triggerDate.getTime(),
    repeatFrequency: RepeatFrequency.DAILY,
  });
};

/**
 * Orchestrates and maps all production notification target channels
 */
export const scheduleAllGiveawayTimers = async () => {
  try {
    const giveaway = await fetchLatestGiveaway();

    // 1. Morning Drop Scan (9:00 AM)
    await scheduleSpecificNotification(NOTIFICATION_IDS.MORNING, 9, giveaway);

    // 2. Lunch Break Drop (1:00 PM)
    await scheduleSpecificNotification(NOTIFICATION_IDS.LUNCH, 13, giveaway);

    // 3. Evening Peak Gaming Hours (8:00 PM)
    await scheduleSpecificNotification(NOTIFICATION_IDS.EVENING, 20, giveaway);
  } catch {
    // Fail silently in production background execution paths
  }
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

/**
 * PRODUCTION-SAFE DEVELOPMENT TESTING UTILITY
 */
export const testImmediateNotification = async () => {
  if (__DEV__) {
    try {
      await createChannel();
      const giveaway = await fetchLatestGiveaway();

      const displayTitle = giveaway ? `"${giveaway.title}" is live right now!` : "Test Giveaway is live right now!";
      const displayBody = giveaway?.description ? giveaway.description : "This is an instant production verification test pipeline.";

      const notificationPayload: any = {
        title: displayTitle,
        body: displayBody,
        android: {
          channelId: CHANNEL_ID,
          pressAction: { id: 'default', launchActivity: 'default' },
        },
      };

      if (Platform.OS === 'android' && giveaway?.image) {
        const localImagePath = await downloadImage(giveaway.image);
        if (localImagePath) {
          notificationPayload.android.style = {
            type: AndroidStyle.BIGPICTURE,
            picture: localImagePath,
          };
        }
      }
      await notifee.displayNotification(notificationPayload);
    } catch (error) {
      console.warn('[Notifee Dev Error]:', error);
    }
  }
};