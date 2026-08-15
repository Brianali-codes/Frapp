import notifee, {
  AndroidImportance,
  AndroidNotificationSetting,
  AndroidStyle,
  AuthorizationStatus,
  TriggerType,
  RepeatFrequency,
} from '@notifee/react-native';
import { Alert, Platform } from 'react-native';

const CHANNEL_ID = 'giveaway_alerts';
const API_URL = 'https://www.gamerpower.com/api/giveaways';

/**
 * Generates N random trigger timestamps spread across active hours (e.g., 9 AM to 10 PM)
 */
const generateRandomTimestamps = (count: number = 3, startHour: number = 9, endHour: number = 22): number[] => {
  const timestamps: number[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const randomHour = Math.floor(Math.random() * (endHour - startHour)) + startHour;
    const randomMinute = Math.floor(Math.random() * 60);

    const target = new Date(now);
    target.setHours(randomHour, randomMinute, 0, 0);

    // If the random time for today has already passed, schedule it for tomorrow
    if (now >= target) {
      target.setDate(target.getDate() + 1);
    }

    timestamps.push(target.getTime());
  }

  // Sort timestamps chronologically
  return timestamps.sort((a, b) => a - b);
};

/**
 * Fetches giveaways and schedules notifications at completely randomized daily times
 */
export const scheduleAllGiveawayTimers = async (alertCount: number = 3) => {
  try {
    // 1. Ensure notification channel exists
    await notifee.createChannel({
      id: CHANNEL_ID,
      name: 'Random Giveaway Drops',
      importance: AndroidImportance.HIGH,
      vibration: true,
    });

    // 2. Android 12+ Safety Check for Exact Alarms
    let canUseAlarmManager = true;
    if (Platform.OS === 'android') {
      const settings = await notifee.getNotificationSettings();
      if (settings.android.alarm === AndroidNotificationSetting.DISABLED) {
        canUseAlarmManager = false;
      }
    }

    // 3. Cancel previous triggers to avoid duplicates
    await notifee.cancelAllNotifications();

    // 4. Fetch latest giveaways from API
    let giveaways: any[] = [];
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        giveaways = await res.json();
      }
    } catch (err) {
      console.warn('Network request failed, falling back to cached triggers:', err);
    }

    // Shuffle giveaways so each notification gets a unique game
    const shuffledGiveaways = [...giveaways].sort(() => 0.5 - Math.random());

    // 5. Generate random trigger timestamps (e.g. 3 random times between 9 AM and 10 PM)
    const randomTimestamps = generateRandomTimestamps(alertCount, 9, 22);

    // 6. Schedule notifications
    for (let i = 0; i < randomTimestamps.length; i++) {
      const timestamp = randomTimestamps[i];
      const giveaway = shuffledGiveaways[i] || null;
      const notificationId = `giveaway-random-${i}`;

      const title = giveaway?.title ? `🎁 Free: ${giveaway.title}` : '🎁 New Giveaway Drop!';
      const body = giveaway?.worth && giveaway.worth !== 'N/A'
        ? `Worth ${giveaway.worth} • Free on ${giveaway.platforms || 'PC'}`
        : giveaway?.description || 'Tap to claim before stock runs out!';

      const imageUrl = giveaway?.image || giveaway?.thumbnail;

      await notifee.createTriggerNotification(
        {
          id: notificationId,
          title,
          body,
          android: {
            channelId: CHANNEL_ID,
            importance: AndroidImportance.HIGH,
            ...(imageUrl && {
              style: {
                type: AndroidStyle.BIGPICTURE,
                picture: imageUrl,
              },
            }),
            pressAction: {
              id: 'default',
              launchActivity: 'default',
            },
          },
          ios: {
            sound: 'default',
            ...(imageUrl && {
              attachments: [{ url: imageUrl }],
            }),
            foregroundPresentationOptions: {
              alert: true,
              badge: true,
              sound: true,
            },
          },
          data: {
            openUrl: giveaway?.open_giveaway_url || '',
          },
        },
        {
          type: TriggerType.TIMESTAMP,
          timestamp,
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
    console.error('Failed to schedule random giveaway notifications:', error);
  }
};

/**
 * Initialize on app launch
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
        'Enable notifications in your device settings to receive giveaway alerts.'
      );
    }
  } catch (error) {
    console.error('Error initializing notifications:', error);
  }
};