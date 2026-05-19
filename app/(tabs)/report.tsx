import Button from '@/components/custom/Button';
import { Divider } from '@/components/custom/Divider';
import { ThemedText } from '@/components/ThemedText';
import { APP_URLS } from '@/constants/app';
import React, { useState } from 'react';
import { Alert, Linking, View, ScrollView, Pressable, Platform } from 'react-native';
import { 
  Setting, 
  Moon, 
  Flag, 
  InfoCircle,
  BrushBig,     // Icon for UI/UX
  Danger,       // Icon for Performance / Crash
  Wifi,         // Icon for API / Data Error
  LampCharge,    // Icon for Feature Request
  Sun1
} from 'iconsax-react-nativejs';
import { useRouter } from 'expo-router';

// Import custom theme hooks
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';

export default function ReportScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('UI/UX Bug');

  // Fetch dynamic theme parameters
  const backgroundColor = useThemeColor({}, 'background');
  const cardBgColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const { themeMode, toggleTheme } = useCustomTheme();

  // Dynamic Array mapping your custom components directly to their keys
  const bugCategories = [
    { 
      id: 'ui', 
      label: 'UI/UX Bug', 
      IconComponent: BrushBig 
    },
    { 
      id: 'api', 
      label: 'API / Data Error', 
      IconComponent: Wifi 
    },
    { 
      id: 'crash', 
      label: 'Performance / Crash', 
      IconComponent: Danger 
    },
    { 
      id: 'feature', 
      label: 'Feature Request', 
      IconComponent: LampCharge 
    },
  ];

  // Opens GitHub with fully structured, pre-filled markdown templates
  const handleGitHubIssue = () => {
    const issueTitle = `[${selectedCategory}] Bug Report from Frapp User`;
    const issueBody = `### Bug Description\n[Please enter a brief description of what happened]\n\n### Environment Details\n- **Platform:** ${Platform.OS === 'ios' ? 'iOS' : 'Android'} (v${Platform.Version})\n- **App Version:** Frapp v1.0.8\n\n### Steps to Reproduce\n1. Open the App\n2. Navigate to...\n3. Observe...`;

    // Constructing the full GitHub Query parameters
    const encodedTitle = encodeURIComponent(issueTitle);
    const encodedBody = encodeURIComponent(issueBody);
    const githubUrl = `${APP_URLS.GITHUB_ISSUES}/new?title=${encodedTitle}&body=${encodedBody}`;

    Linking.canOpenURL(githubUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(githubUrl);
        } else {
          // Fallback if full parameters fail on specific device browsers
          Linking.openURL(APP_URLS.GITHUB_ISSUES);
        }
      })
      .catch((err) => {
        console.error('An error occurred', err);
        Alert.alert('Error', 'Unable to redirect to GitHub. Check your browser permissions.');
      });
  };

  return (
    <ScrollView
      style={{ backgroundColor }}
      className="flex-1 px-4 pt-10"
      contentContainerStyle={{ paddingBottom: 140 }}
      showsVerticalScrollIndicator={false}
    >
      {/* --- MATCHING BRAND HEADER ROW --- */}
      <View className="flex-row items-center justify-between w-full mb-6">
        <View className="flex-row items-center gap-3">
          <View className="w-10 h-10 bg-purple-600 rounded-xl items-center justify-center shadow-md">
            <ThemedText className="text-white font-black text-lg">▲</ThemedText>
          </View>
          <ThemedText className="text-xl font-extrabold tracking-tight">
            Report Bug.<ThemedText className="text-purple-500 font-extrabold text-xl"></ThemedText>
          </ThemedText>
        </View>

        <View className="flex-row items-center gap-2.5">
          <Pressable 
            onPress={() => router.push('/(tabs)/settings')}
            style={{ backgroundColor: themeMode === 'dark' ? '#27272a' : '#f4f4f5' }}
            className="w-10 h-10 rounded-full items-center justify-center active:opacity-70 shadow-sm"
          >
            <Setting size="22" color={themeMode === 'dark' ? '#f4f4f5' : '#3f3f46'} variant="Broken" />
          </Pressable>

          <Pressable 
            onPress={toggleTheme}
            style={{ backgroundColor: themeMode === 'dark' ? '#27272a' : '#f4f4f5' }}
            className="w-10 h-10 rounded-full items-center justify-center active:opacity-70 shadow-sm"
          >
            {themeMode === 'dark' ? (
              <Sun1 size="22" color="#f4f4f5" variant="Broken" />
            ) : (
              <Moon size="22" color="#3f3f46" variant="Broken" />
            )}
          </Pressable>
        </View>
      </View>
      
      <ThemedText className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6">
        Having trouble with the application or noticed inconsistent pricing or values? Pick a category below and file a live report.
      </ThemedText>

      {/* Interactive Custom Vector Category Grid */}
      <ThemedText className="text-[11px] uppercase font-bold tracking-widest text-zinc-400 mb-3 ml-1">
        Select Bug Category
      </ThemedText>
      <View className="flex-row flex-wrap justify-between gap-y-3 mb-6">
        {bugCategories.map((category) => {
          const isSelected = selectedCategory === category.label;
          const { IconComponent } = category;

          return (
            <Pressable
              key={category.id}
              onPress={() => setSelectedCategory(category.label)}
              style={{ 
                backgroundColor: isSelected ? '#9333ea' : cardBgColor,
                borderColor: isSelected ? '#a855f7' : (themeMode === 'dark' ? '#27272a' : '#e4e4e7'),
                width: '48.5%', // Displays neatly in a 2x2 grid layout
                height: 90
              }}
              className="p-3 rounded-2xl border active:opacity-85 flex-col items-center justify-center gap-2 text-center"
            >
              {/* Dynamic Icon Rendering with active color state fallback */}
              <IconComponent 
                size="26" 
                color={isSelected ? '#ffffff' : '#FF8A65'} 
                variant={isSelected ? 'Bold' : 'Broken'} 
              />
              
              <ThemedText 
                style={{ color: isSelected ? '#ffffff' : undefined }} 
                className="text-[11px] font-extrabold text-center tracking-tight"
                numberOfLines={1}
              >
                {category.label}
              </ThemedText>
            </Pressable>
          );
        })}
      </View>

      {/* Primary Action Card */}
      <View 
        style={{ backgroundColor: cardBgColor }} 
        className="rounded-xl p-5 mb-5 border border-zinc-100 dark:border-zinc-800/60 shadow-sm"
      >
        <View className="flex-row items-center gap-2 mb-2">
          <Flag size="18" color="#a855f7" variant="Bold" />
          <ThemedText className="font-extrabold text-base tracking-tight">
            Submit directly via GitHub Issues
          </ThemedText>
        </View>
        
        <ThemedText className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed mb-4">
          Clicking the button below will securely bundle your selection template, local device OS parameters, and open the GitHub tracker instantly.
        </ThemedText>

        <Button 
          onPress={handleGitHubIssue} 
          text={`File ${selectedCategory}`} 
          type="primary"
        />
      </View>

      {/* API Attribution Disclosure Block */}
      <View 
        style={{ backgroundColor: cardBgColor }} 
        className="rounded-xl p-4 border border-zinc-100 dark:border-zinc-800/60 shadow-sm"
      >
        <View className="flex-row items-center gap-2 mb-2">
          <InfoCircle size="18" color="#71717a" variant="Broken" />
          <ThemedText className="font-bold text-xs uppercase tracking-wider text-zinc-400">
            API & Project Attribution
          </ThemedText>
        </View>
        <ThemedText className="text-zinc-400 dark:text-zinc-500 text-[11px] leading-relaxed">
          This open source distribution relies completely on structural feeds provided by the Gamepower and Free To Game architectures. None of these independent APIs or associated content entities belong directly to FRAPP.
        </ThemedText>
      </View>

      {/* Separator Line and Version Tracker Footer */}
      <View className="mt-8 mb-4 items-center justify-center">
        <Divider 
          style={{ backgroundColor: textColor }} 
          className="w-12 h-0.5 rounded-full opacity-10 mb-3" 
        />
        <ThemedText className="text-center font-bold text-[11px] uppercase tracking-widest text-zinc-400">
          Frapp Build v1.0.8
        </ThemedText>
      </View>
    </ScrollView>
  );
}