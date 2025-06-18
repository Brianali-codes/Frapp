
// import notifee, { AndroidImportance, AuthorizationStatus, TriggerType } from '@notifee/react-native';
// import { Alert } from 'react-native';

// export const setupNotifications = async () => {
//     await notifee.createChannel({
//         id: 'default',
//         name: 'Default Channel',
//         importance: AndroidImportance.HIGH,
//     });

//     const now = new Date();
//     const nextTriggerTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 9, 0, 0);

//     await notifee.createTriggerNotification(
//         {
//             title: 'FRAPP',
//             body: 'Check out todays giveaways.You would not wanna miss out.',
//             android: {
//                 channelId: 'default',
//             },
//         },
//         {
//             type: TriggerType.TIMESTAMP,
//             timestamp: nextTriggerTime.getTime(),
//         }
//     );
// };

// export const checkNotificationPermission = async () => {
//     const settings = await notifee.requestPermission();

//     if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
//         setupNotifications();
//     } else {
//         Alert.alert(
//             'Notifications Disabled',
//             'Please enable notifications in your settings to receive updates.',
//             [{ text: 'OK' }]
//         );
//     }
// };


export const checkNotificationPermission = () => { }