import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { Colors, appDarkColor } from '@/constants/colors';
// import { useColorScheme } from '@/hooks/useColorScheme';
import { Game, Gift, Setting2, Warning2 } from 'iconsax-react-nativejs';

export default function TabLayout() {
  // const colorScheme = useColorScheme();
  const colorScheme = "dark"

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        // tabBarBackground: ,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            backgroundColor: appDarkColor
          },
        }),

        // tabBarActiveTintColor: primaryColor,
        // tabBarStyle: { paddingTop: 10, height: 80 },

        // headerShown: false,
        // tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Giveaways',
          tabBarIcon: ({ color, focused }) => (
            <Gift variant={focused ? 'Outline' : 'Bold'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="free"
        options={{
          title: 'F2P',
          tabBarIcon: ({ color, focused }) => (
            <Game variant={focused ? 'Outline' : 'Bold'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'Report bug',
          tabBarIcon: ({ color, focused }) => (
            <Warning2 variant={focused ? 'Outline' : 'Bold'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Setting2 variant={focused ? 'Outline' : 'Bold'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
