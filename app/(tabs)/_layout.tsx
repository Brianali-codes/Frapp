import { Tabs, usePathname, router } from 'expo-router';
import React from 'react';
import { Platform, View, Dimensions, TouchableOpacity } from 'react-native';
import { useCustomTheme } from '@/context/ThemeContext';
import { ThemedText } from '@/components/ThemedText';
import { Game, Gift, Warning2 } from 'iconsax-react-nativejs';

const TABS = [
  { name: 'index', href: '/', title: 'Get', icon: Gift },
  { name: 'free', href: '/free', title: 'Free', icon: Game },
  { name: 'report', href: '/report', title: 'Bug', icon: Warning2 },
];

function FloatingTabBar() {
  const { themeMode } = useCustomTheme();
  const pathname = usePathname();

  const tabBgColor = themeMode === 'dark' ? '#2f2f36' : '#ede6e6';
  const activeCapsuleColor = '#9333ea';
  const inactiveTintColor = themeMode === 'dark' ? '#a1a1aa' : '#71717a';
  const tabBorderColor = themeMode === 'dark' ? '#a3a3b5' : '#3c3c40';

  const screenWidth = Dimensions.get('window').width;

  return (
    <View
      style={{
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 30 : 20,
        width: 280,
        left: (screenWidth - 280) / 2,
        height: 56,
        borderRadius: 100,
        backgroundColor: tabBgColor,
        borderWidth: 1,
        borderColor: tabBorderColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        elevation: 20,
        ...Platform.select({
          ios: {
            shadowColor: activeCapsuleColor,
            shadowOffset: { width: 0, height: 12 },
            shadowOpacity: 0.18,
            shadowRadius: 16,
          },
        }),
      }}
    >
      {TABS.map((tab) => {
        const focused = pathname === tab.href || (tab.href === '/' && pathname === '/');
        const color = focused ? '#ffffff' : inactiveTintColor;

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={() => router.push(tab.href as any)}
            style={{
              paddingHorizontal: focused ? 14 : 0,
              paddingVertical: 8,
              borderRadius: 100,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              backgroundColor: focused ? activeCapsuleColor : 'transparent',
              minWidth: focused ? 75 : 40,
            }}
          >
            <tab.icon variant={focused ? 'Bold' : 'Broken'} color={color} size={22} />
            {focused && (
              <ThemedText
                style={{ color: '#ffffff' }}
                className="font-montBlack text-xs tracking-tight"
                numberOfLines={1}
              >
                {tab.title}
              </ThemedText>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={() => <FloatingTabBar />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="free" />
      <Tabs.Screen name="report" />
      <Tabs.Screen name="settings" options={{ href: null }} />
    </Tabs>
  );
}