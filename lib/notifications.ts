import notifee, {
  AndroidImportance,
  AndroidNotificationSetting,
  AuthorizationStatus,
  TriggerType,
  RepeatFrequency,
} from '@notifee/react-native';
import { Alert, Platform } from 'react-native';

const CHANNEL_ID = 'giveaway_alerts';

const NOTIFICATION_IDS = {
  MORNING: 'morning-giveaway',
  LUNCH: 'lunch-giveaway',
  EVENING: 'evening-giveaway',
};

/**
 * Calculates the next trigger timestamp (e.g. 9:00 AM)
 */
const getNextTriggerTime = (hours: number): number => {
  const now = new Date();
  const targetTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    0,
    0
  );

  if (now >= targetTime) {
    targetTime.setDate(targetTime.getDate() + 1);
  }
  return targetTime.getTime();
};

/**
 * Schedules the 3 daily recurring alarms directly into the OS Alarm Manager
 */
export const scheduleAllGiveawayTimers = async () => {
  try {
    // 1. Ensure notification channel exists
    await notifee.createChannel({
      id: CHANNEL_ID,
      name: 'Daily Giveaway Reminders',
      importance: AndroidImportance.HIGH,
      vibration: true,
    });

    // 2. Android 12+ Safety Check for Exact Alarms
    let canUseAlarmManager = true;
    if (Platform.OS === 'android') {
      const settings = await notifee.getNotificationSettings();
      // If alarm permission is disabled or not supported on device, fall back safely
      if (settings.android.alarm === AndroidNotificationSetting.DISABLED) {
        canUseAlarmManager = false;
      }
    }

    const schedules = [
      {
        id: NOTIFICATION_IDS.MORNING,
        hour: 9,
        title: 'Morning Giveaway Drop!',
        body: 'New free giveaway keys are live right now! Tap to claim.',
      },
      {
        id: NOTIFICATION_IDS.LUNCH,
        hour: 13,
        title: 'Lunch Break Giveaway!',
        body: 'Check out the midday free loot drop before keys run out!',
      },
      {
        id: NOTIFICATION_IDS.EVENING,
        hour: 20,
        title: 'Evening Gaming Hours Drop!',
        body: "Tonight's featured giveaway is live! Tap to enter.",
      },
    ];

    // 3. Schedule each alarm
    for (const item of schedules) {
      await notifee.cancelNotification(item.id);

      await notifee.createTriggerNotification(
        {
          id: item.id,
          title: item.title,
          body: item.body,
          android: {
            channelId: CHANNEL_ID,
            importance: AndroidImportance.HIGH,
            pressAction: {
              id: 'default',
              launchActivity: 'default',
            },
          },
          ios: {
            sound: 'default',
            foregroundPresentationOptions: {
              alert: true,
              badge: true,
              sound: true,
            },
          },
        },
        {
          type: TriggerType.TIMESTAMP,
          timestamp: getNextTriggerTime(item.hour),
          repeatFrequency: RepeatFrequency.DAILY,
          ...(canUseAlarmManager && {
            alarmManager: {
              allowWhileIdle: true,
            },
          }),
        }
      );
    }
  } catch (error) {
    console.error('Failed to schedule triggers:', error);
  }
};

/**
 * Call this in RootLayout on mount. Prompts permission and sets timers automatically!
 */
export const initNotifications = async () => {
  try {
    const settings = await notifee.requestPermission();
    const granted =
      settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
      settings.authorizationStatus === AuthorizationStatus.PROVISIONAL;

    if (granted) {
      await scheduleAllGiveawayTimers();
    } else {
      Alert.alert(
        'Notifications Disabled',
        'Enable notifications in your device settings to get daily giveaway reminders.'
      );
    }
  } catch (error) {
    console.error('Error initializing notifications:', error);
  }
};