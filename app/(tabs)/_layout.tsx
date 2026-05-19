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

  // Dynamic crisp border color to separate the floating bar from content underneath
  const tabBorderColor = themeMode === 'dark' ? '#c1c1c9' : '#9d9da3';

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
          left: 10,
          right: 10,
          height: 56, 
          borderRadius: 100, 
          backgroundColor: tabBgColor,
          paddingBottom: 0,  
          
          
          // --- FLOATING VISUAL SEPARATION CONFIGS ---
          borderTopWidth: 1, // Restored and set to 1 to work with custom coloring
          borderWidth: 1,
          borderColor: tabBorderColor,
          borderTopColor: tabBorderColor,
          
          // Android Floating High-Contrast Depth
          elevation: 20,
          
          // iOS Smooth Floating Glow & Shadow Depth
          ...Platform.select({
            ios: {
              shadowColor: themeMode === 'dark' ? activeCapsuleColor : '#000000',
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: themeMode === 'dark' ? 0.4 : 0.12,
              shadowRadius: 16,
            },
          }),
        },
        
        tabBarItemStyle: {
          margin: 7, // Keeps padding proportional inside a thinner bar frame
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
               { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 100, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 }
              ]}
            >
              <Gift variant={focused ? 'Bold' : 'Broken'} color={focused ? '#ffffff' : color} size={22} />
              {focused && (
                <ThemedText className="text-white font-extrabold text-xs tracking-tight">
                  Get
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
               { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 100, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 }
              ]}
            >
              <Game variant={focused ? 'Bold' : 'Broken'} color={focused ? '#ffffff' : color} size={22} />
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
               { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 100, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 }
              ]}
            >
              <Warning2 variant={focused ? 'Bold' : 'Broken'} color={focused ? '#ffffff' : color} size={22} />
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
                { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 100, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 }
              ]}
            >
              <Setting2 variant={focused ? 'Bold' : 'Broken'} color={focused ? '#ffffff' : color} size={22} />
              {focused && (
                <ThemedText className="text-white font-extrabold text-xs tracking-tight">
                  Config
                </ThemedText>
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}