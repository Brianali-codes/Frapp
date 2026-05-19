import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { Colors } from '@/constants/Colors';
import { useCustomTheme } from '@/context/ThemeContext'; // 1. Import your custom context hook
import { Game, Gift, Setting2, Warning2 } from 'iconsax-react-nativejs';


export default function TabLayout() {
  // 2. Consume the global theme state instead of hardcoding "dark"
  const { themeMode } = useCustomTheme();

  // 3. Resolve dynamic background and inactive tint colors based on current mode
  const tabBgColor = Colors[themeMode].background;
  
  // Optional: Define an explicit inactive color if it isn't in your Colors constant.
  // Generally, dark gray for light mode, light gray for dark mode.
  const inactiveTintColor = themeMode === 'dark' ? '#9ca3af' : '#6b7280'; 

  return (
    <Tabs
      screenOptions={{
        // 4. Dynamically set the active color based on 'light' or 'dark'
        tabBarActiveTintColor: Colors[themeMode].tint,
        tabBarInactiveTintColor: inactiveTintColor, 
        headerShown: false,
        tabBarButton: HapticTab,
        
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            // 5. Dynamically change the background color of the bar
            backgroundColor: tabBgColor,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Giveaways',
          tabBarIcon: ({ color, focused }) => (
            <Gift variant={focused ? 'Broken' : 'Bold'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="free"
        options={{
          title: 'F2P',
          tabBarIcon: ({ color, focused }) => (
            <Game variant={focused ? 'Broken' : 'Bold'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'Report bug',
          tabBarIcon: ({ color, focused }) => (
            <Warning2 variant={focused ? 'Broken' : 'Bold'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <Setting2 variant={focused ? 'Broken' : 'Bold'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}