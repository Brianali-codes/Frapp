import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { Colors } from '@/constants/Colors';
import { useCustomTheme } from '@/context/ThemeContext'; 
import { ThemedText } from '@/components/ThemedText'; // Imported to cleanly handle dynamic text colors
import { Game, Gift, Setting2, Warning2 } from 'iconsax-react-nativejs';

export default function TabLayout() {
  const { themeMode } = useCustomTheme();

  // Capsule container background colors matching the theme depth
  const tabBgColor = themeMode === 'dark' ? '#18181b' : '#ffffff'; 
  const activeCapsuleColor = '#6366f1'; // Premium purple color from screenshot
  const inactiveTintColor = themeMode === 'dark' ? '#a1a1aa' : '#71717a';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: inactiveTintColor, 
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false, // Standard labels hidden since we are creating custom active pill items

        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 30 : 20, 
          left: 16,
          right: 16,
          height: 54, // Thinner profile height (down from 64)
          borderRadius: 100, 
          backgroundColor: tabBgColor,
          borderTopWidth: 0, 
          paddingBottom: 0,  
          
          // Android High-Contrast Shadow Separation
          elevation: 12,
          
          // iOS Glow / High-Contrast Shadow Modification
          ...Platform.select({
            ios: {
              // Switches to a beautiful premium purple ambient glow in dark mode, and a sharp deep shadow in light mode
              shadowColor: themeMode === 'dark' ? activeCapsuleColor : '#000000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: themeMode === 'dark' ? 0.45 : 0.15,
              shadowRadius: 14,
            },
          }),
        },
        
        tabBarItemStyle: {
          marginVertical: 4, // Keeps padding proportional inside a thinner bar frame
          borderRadius: 100,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Giveaways',
          tabBarIcon: ({ color, focused }) => (
            <View 
              style={[
                focused && { backgroundColor: activeCapsuleColor },
                { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 100, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 }
              ]}
            >
              <Gift variant={focused ? 'Bold' : 'Broken'} color={focused ? '#ffffff' : color} size={20} />
              {focused && (
                <ThemedText className="text-white font-extrabold text-xs tracking-tight">
                  Giveaways
                </ThemedText>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="free"
        options={{
          title: 'F2P',
          tabBarIcon: ({ color, focused }) => (
            <View 
              style={[
                focused && { backgroundColor: activeCapsuleColor },
                { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 100, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 }
              ]}
            >
              <Game variant={focused ? 'Bold' : 'Broken'} color={focused ? '#ffffff' : color} size={20} />
              {focused && (
                <ThemedText className="text-white font-extrabold text-xs tracking-tight">
                  Free
                </ThemedText>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="report"
        options={{
          title: 'Report bug',
          tabBarIcon: ({ color, focused }) => (
            <View 
              style={[
                focused && { backgroundColor: activeCapsuleColor },
                { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 100, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 }
              ]}
            >
              <Warning2 variant={focused ? 'Bold' : 'Broken'} color={focused ? '#ffffff' : color} size={20} />
              {focused && (
                <ThemedText className="text-white font-extrabold text-xs tracking-tight">
                  Report
                </ThemedText>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <View 
              style={[
                focused && { backgroundColor: activeCapsuleColor },
                { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 100, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 }
              ]}
            >
              <Setting2 variant={focused ? 'Bold' : 'Broken'} color={focused ? '#ffffff' : color} size={20} />
              {focused && (
                <ThemedText className="text-white font-extrabold text-xs tracking-tight">
                  Settings
                </ThemedText>
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}