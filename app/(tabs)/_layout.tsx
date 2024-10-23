import { Tabs } from 'expo-router';
import React from 'react';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Giveaways',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'gift-sharp' : 'gift-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="free"
        options={{
          title: 'Free',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'game-controller' : 'game-controller-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'Report bug',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'bug' : 'bug-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
