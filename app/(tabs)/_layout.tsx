import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { useCustomTheme } from '@/context/ThemeContext'; 
import { ThemedText } from '@/components/ThemedText'; 
import { Game, Gift, Warning2 } from 'iconsax-react-nativejs';

export default function TabLayout() {
  const { themeMode } = useCustomTheme();

  const tabBgColor = themeMode === 'dark' ? '#2f2f36' : '#ede6e6'; 
  const activeCapsuleColor = '#9333ea';
  const inactiveTintColor = themeMode === 'dark' ? '#a1a1aa' : '#71717a';
  const tabBorderColor = themeMode === 'dark' ? '#a3a3b5' : '#3c3c40';

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
          
          // FIX: Explicitly limits container width and centers it via midpoint transform offsets
          width: 280,
          left: '50%',
          transform: [{ translateX: -140 }], 
          
          height: 56, 
          borderRadius: 100, 
          backgroundColor: tabBgColor,
          borderWidth: 1,
          borderColor: tabBorderColor,
          elevation: 20,
          
          // Clean alignment rules inside the newly fixed 280px bounding container
          flexDirection: 'row',
          justifyContent: 'space-around', 
          alignItems: 'center',
          
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
          height: 56,
          justifyContent: 'center',
          alignItems: 'center',
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
                    paddingHorizontal: focused ? 14 : 0, 
                    paddingVertical: 8, 
                    borderRadius: 100, 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: 6,
                    backgroundColor: focused ? activeCapsuleColor : 'transparent',
                    minWidth: focused ? 75 : 40,
                  }
                ]}
              >
                <tab.icon variant={focused ? 'Bold' : 'Broken'} color={focused ? '#ffffff' : color} size={22} />
                {focused && (
                  <ThemedText 
                    style={{ color: '#ffffff' }} 
                    className="font-montBlack text-xs tracking-tight"
                    numberOfLines={1} 
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