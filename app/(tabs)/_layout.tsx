import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { useCustomTheme } from '@/context/ThemeContext'; 
import { ThemedText } from '@/components/ThemedText'; 
import { Game, Gift, Warning2 } from 'iconsax-react-nativejs';

export default function TabLayout() {
  const { themeMode } = useCustomTheme();

  const tabBgColor = themeMode === 'dark' ? '#18181b' : '#ffffff'; 
  const activeCapsuleColor = '#9333ea';
  const inactiveTintColor = themeMode === 'dark' ? '#a1a1aa' : '#71717a';
  const tabBorderColor = themeMode === 'dark' ? '#3f3f46' : '#e4e4e7';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: inactiveTintColor, 
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false, 
        tabBarStyle: {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 30 : 20, 
          // Increased horizontal padding (left/right) makes the bar smaller
          left: 60, 
          right: 60,
          height: 56, 
          borderRadius: 100, 
          backgroundColor: tabBgColor,
          borderWidth: 1,
          borderColor: tabBorderColor,
          elevation: 20,
          ...Platform.select({
            ios: {
              shadowColor: activeCapsuleColor,
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.18,
              shadowRadius: 16,
            },
          }),
        },
        
        tabBarItemStyle: {
          paddingVertical: 8,
        },
      }}
    >
      {[
        { name: 'index', title: 'Get', icon: Gift },
        { name: 'free', title: 'Free', icon: Game },
        { name: 'report', title: 'Bug', icon: Warning2 },
      ].map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View 
                style={[
                  { 
                    paddingHorizontal: focused ? 14 : 0, // Text only appears when focused
                    paddingVertical: 8, 
                    borderRadius: 100, 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: 6,
                    backgroundColor: focused ? activeCapsuleColor : 'transparent',
                    // Force a minWidth to keep it from collapsing
                    minWidth: focused ? 70 : 40,
                  }
                ]}
              >
                <tab.icon variant={focused ? 'Bold' : 'Broken'} color={focused ? '#ffffff' : color} size={22} />
                {focused && (
                  <ThemedText 
                    className="text-white font-montBlack text-xs tracking-tight"
                    numberOfLines={1} // Prevents text wrapping
                  >
                    {tab.title}
                  </ThemedText>
                )}
              </View>
            ),
          }}
        />
      ))}
      <Tabs.Screen name="settings" options={{ href: null }} />
    </Tabs>
  );
}