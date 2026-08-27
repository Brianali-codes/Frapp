import notifee, {
  AlarmType,
  AndroidImportance,
  AndroidNotificationSetting,
  AndroidStyle,
  AuthorizationStatus,
  TriggerType,
  RepeatFrequency,
} from '@notifee/react-native';
import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHANNEL_ID = 'giveaway_alerts';
const API_URL = 'https://www.gamerpower.com/api/giveaways';

// Storage key for exact alarms
const ALARM_PROMPT_KEY = '@exact_alarm_prompted';

/**
 * Generates trigger timestamps distributed across Morning, Afternoon, and Evening slots.
 */
const generateTimeOfDayTimestamps = (): number[] => {
  const timestamps: number[] = [];
  const now = new Date();

  const windows = [
    { startHour: 8, endHour: 11 },  // Morning (8:00 AM - 11:59 AM)
    { startHour: 12, endHour: 16 }, // Afternoon (12:00 PM - 4:59 PM)
    { startHour: 17, endHour: 21 }, // Evening (5:00 PM - 9:59 PM)
  ];

  windows.forEach((window) => {
    const randomHour = Math.floor(Math.random() * (window.endHour - window.startHour + 1)) + window.startHour;
    const randomMinute = Math.floor(Math.random() * 60);

    const target = new Date(now);
    target.setHours(randomHour, randomMinute, 0, 0);

    if (now >= target) {
      target.setDate(target.getDate() + 1);
    }

    timestamps.push(target.getTime());
  });

  return timestamps.sort((a, b) => a - b);
};

/**
 * Prompts the user ONCE for Android exact alarms settings.
 */
export const checkBackgroundDeliveryHealth = async (): Promise<void> => {
  if (Platform.OS !== 'android') return;

  // Check for Exact Alarm permissions (Android 12+)
  const hasPromptedAlarm = await AsyncStorage.getItem(ALARM_PROMPT_KEY);
  const settings = await notifee.getNotificationSettings();

  if (!hasPromptedAlarm && settings.android.alarm === AndroidNotificationSetting.DISABLED) {
    Alert.alert(
      'Allow Exact Alarms',
      'To receive giveaway drops right on time, allow the app to schedule exact alarms.',
      [
        {
          text: 'Allow',
          onPress: async () => {
            await AsyncStorage.setItem(ALARM_PROMPT_KEY, 'true');
            await notifee.openAlarmPermissionSettings();
          },
        },
        {
          text: 'Dismiss',
          style: 'cancel',
          onPress: async () => {
            await AsyncStorage.setItem(ALARM_PROMPT_KEY, 'true');
          },
        },
      ]
    );
  }
};

/**
 * Fetches giveaways and schedules notifications at morning, afternoon, and evening times
 */
export const scheduleAllGiveawayTimers = async () => {
  try {
    await notifee.createChannel({
      id: CHANNEL_ID,
      name: 'Random Giveaway Drops',
      importance: AndroidImportance.HIGH,
      vibration: true,
    });

    let canUseAlarmManager = true;
    if (Platform.OS === 'android') {
      const settings = await notifee.getNotificationSettings();
      if (settings.android.alarm === AndroidNotificationSetting.DISABLED) {
        canUseAlarmManager = false;
      }
    }

    for (let i = 0; i < 3; i++) {
      await notifee.cancelNotification(`giveaway-random-${i}`);
    }

    let giveaways: any[] = [];
    try {
      const res = await fetch(API_URL);
      if (res.ok) {
        giveaways = await res.json();
      }
    } catch (err) {
      console.warn('Network request failed, falling back to cached triggers:', err);
    }

    const shuffledGiveaways = [...giveaways].sort(() => 0.5 - Math.random());
    const timeOfDayTimestamps = generateTimeOfDayTimestamps();

    for (let i = 0; i < timeOfDayTimestamps.length; i++) {
      const timestamp = timeOfDayTimestamps[i];
      const giveaway = shuffledGiveaways[i] || null;
      const notificationId = `giveaway-random-${i}`;

      const title = giveaway?.title ? `Free: ${giveaway.title}` : 'New Giveaway Drop!';
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
              type: AlarmType.SET_EXACT_AND_ALLOW_WHILE_IDLE,
            },
          }),
        }
      );
    }
  } catch (error) {
    console.error('Failed to schedule giveaway notifications:', error);
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
      await checkBackgroundDeliveryHealth();
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