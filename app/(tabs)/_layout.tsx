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

  const isDark = themeMode === 'dark';
  
  // --- NATIVE LIQUID GLASS CONFIGURATION ---
  // Reduced alpha from 0.75 to 0.55 for higher translucency
  const glassBgColor = isDark ? 'rgba(44, 44, 53, 0.95)' : 'rgba(241, 242, 246, 0.95)';
  const glassBorderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';
  const activeCapsuleColor = '#9333ea';
  const inactiveTintColor = isDark ? '#a1a1aa' : '#71717a';

  const screenWidth = Dimensions.get('window').width;
  const TAB_BAR_WIDTH = 280;

  return (
    <View
      style={[
        {
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 30 : 20,
          width: TAB_BAR_WIDTH,
          left: (screenWidth - TAB_BAR_WIDTH) / 2,
          height: 56,
          borderRadius: 9999,
          backgroundColor: glassBgColor,
          borderWidth: 1.5,
          borderColor: glassBorderColor,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          overflow: 'hidden', 
        },
        Platform.select({
          ios: {
            backdropFilter: 'blur(20px)', 
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: isDark ? 0.40 : 0.15,
            shadowRadius: 20,
          },
          android: {
            elevation: 8,
          },
        }),
      ]}
    >
      {TABS.map((tab) => {
        const focused = pathname === tab.href || (tab.href === '/' && pathname === '/');
        const color = focused ? '#ffffff' : inactiveTintColor;

        return (
          <TouchableOpacity
            key={tab.name}
            activeOpacity={0.8}
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