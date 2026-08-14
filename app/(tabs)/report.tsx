import { Divider } from '@/components/custom/Divider';
import { ThemedText } from '@/components/ThemedText';
import { APP_URLS } from '@/constants/app';
import React, { useState } from 'react';
import { Alert, Linking, View, ScrollView, Pressable, Platform, Image } from 'react-native';
import { 
  Setting, 
  Moon, 
  Flag, 
  InfoCircle,
  BrushBig,     
  Danger,       
  Wifi,         
  LampCharge,    
  Sun1
} from 'iconsax-react-nativejs';
import { useRouter } from 'expo-router';

// Import translation hooks and explicit context instance
import { useTranslation } from 'react-i18next';
import  i18nInstanceSource  from '@/components/i18n'; // Explicit import for i18n instance

// Import custom theme hooks
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';

// Retaining original button for the final form submission action wrapper
import Button from '@/components/custom/Button';

// =========================================================================
// LOCAL THEMED GRID CATEGORY CELL COMPONENT
// =========================================================================
interface CategoryGridCellProps {
  label: string;
  IconComponent: React.ComponentType<any>;
  isSelected: boolean;
  isDark: boolean;
  onPress: () => void;
  cardBgColor: string;
}

function CategoryGridCell({ 
  label, 
  IconComponent, 
  isSelected, 
  isDark, 
  onPress, 
  cardBgColor 
}: CategoryGridCellProps) {
  
  // Theme rules setup: selected uses purple accents, unselected locks to strict black/white values
  const dynamicBorderColor = isSelected 
    ? '#a855f7' 
    : (isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(28, 28, 30, 1)');
    
  const dynamicContentColor = isSelected 
    ? '#ffffff' 
    : (isDark ? '#ffffff' : '#1c1c1e');

  const dynamicBgColor = isSelected ? '#9333ea' : cardBgColor;

  return (
    <Pressable
      onPress={onPress}
      style={[
        { 
          backgroundColor: dynamicBgColor,
          borderColor: dynamicBorderColor,
          borderWidth: isSelected ? 1 : 1.5, // Slightly heavier unselected profile for raw styling focus
          width: '48.5%', 
          height: 90
        },
        Platform.select({
          ios: {
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: isSelected ? 4 : (isDark ? 3 : 4) },
            shadowOpacity: isSelected ? 0.30 : (isDark ? 0.20 : 0.06), 
            shadowRadius: isSelected ? 8 : (isDark ? 6 : 8),     
          },
          android: {
            elevation: isSelected ? 4 : (isDark ? 2 : 3), 
          }
        })
      ]}
      className="p-3 rounded-2xl active:opacity-85 flex-col items-center justify-center gap-2 text-center"
    >
      <IconComponent 
        size="26" 
        color={dynamicContentColor} 
        variant={isSelected ? 'Bold' : 'Broken'} 
      />
      
      <ThemedText 
        style={{ color: dynamicContentColor }} 
        className="text-[11px] font-montBlack text-center tracking-tight"
        numberOfLines={1}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}

export default function ReportScreen() {
  const router = useRouter();
  
  // Initialize the translation hook tied directly to your explicit source
  const { t } = useTranslation(undefined, { i18n: i18nInstanceSource });

  // Fallback map keys tracking logic dynamically via structural definitions
  const bugCategories = [
    { id: 'ui', labelKey: 'report.categories.ui', labelDefault: 'UI/UX Bug', IconComponent: BrushBig },
    { id: 'api', labelKey: 'report.categories.api', labelDefault: 'API / Data Error', IconComponent: Wifi },
    { id: 'crash', labelKey: 'report.categories.crash', labelDefault: 'Performance / Crash', IconComponent: Danger },
    { id: 'feature', labelKey: 'report.categories.feature', labelDefault: 'Feature Request', IconComponent: LampCharge },
  ];

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const activeCategory = bugCategories[selectedCategoryIndex];
  const translatedActiveLabel = t(activeCategory.labelKey, activeCategory.labelDefault);

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const { themeMode, toggleTheme } = useCustomTheme();

  const isDark = themeMode === 'dark';
  const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';
  
  const adaptiveBorderColor = isDark
    ? 'rgba(255, 255, 255, 0.07)'
    : 'rgba(0, 0, 0, 0.07)';

  const handleGitHubIssue = () => {
    const issueTitle = `[${translatedActiveLabel}] Bug Report from Frapp User`;
    
    const issueBody = `### Bug Description\n${t('report.github.bodyDescription', '[Please enter a brief description of what happened]')}\n\n### Environment Details\n- **Platform:** ${Platform.OS === 'ios' ? 'iOS' : 'Android'} (v${Platform.Version})\n- **App Version:** Frapp v1.0.8\n\n### Steps to Reproduce\n1. ${t('report.github.step1', 'Open the App')}\n2. ${t('report.github.step2', 'Navigate to...')}\n3. ${t('report.github.step3', 'Observe...')}`;

    const encodedTitle = encodeURIComponent(issueTitle);
    const encodedBody = encodeURIComponent(issueBody);
    const githubUrl = `${APP_URLS.GITHUB_ISSUES}/new?title=${encodedTitle}&body=${encodedBody}`;

    Linking.canOpenURL(githubUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(githubUrl);
        } else {
          Linking.openURL(APP_URLS.GITHUB_ISSUES);
        }
      })
      .catch((err) => {
        console.error('An error occurred', err);
        Alert.alert(
          t('report.alerts.errorTitle', 'Error'), 
          t('report.alerts.errorMessage', 'Unable to redirect to GitHub. Check your browser permissions.')
        );
      });
  };

  return (
    <ScrollView
      style={{ backgroundColor }}
      className="flex-1 px-4 pt-10"
      contentContainerStyle={{ paddingBottom: 140 }}
      showsVerticalScrollIndicator={false}
    >
      {/* --- BRAND HEADER ROW POLISHED TO MATCH COMPACT SIZES --- */}
      <View className="flex-row items-center justify-between w-full mb-6">
        <Pressable className="flex-row items-center gap-2 flex-1 pr-2 active:opacity-90">
          <View 
            style={{ backgroundColor: '#9333ea' }} 
            className="w-9 h-9 rounded-xl overflow-hidden items-center justify-center shadow-sm shrink-0"
          >
            <Image 
              source={require('../../assets/images/FRAPP_ICON1.png')} 
              style={{ width: '100%', height: '100%' }} 
              resizeMode="cover" 
            />
          </View>
          <ThemedText numberOfLines={1} className="text-lg font-montBlack tracking-tight flex-shrink">
            {t('report.title', 'Report Bug.')}
          </ThemedText>
        </Pressable>

        <View className="flex-row items-center gap-2">
          <Pressable 
            onPress={() => router.push('/(tabs)/settings')}
            style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }}
            className="w-9 h-9 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0"
          >
            <Setting size="18" color={isDark ? '#f4f4f5' : '#3f3f46'} variant="Broken" />
          </Pressable>

          <Pressable 
            onPress={toggleTheme}
            style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }}
            className="w-9 h-9 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0"
          >
            {isDark ? (
              <Sun1 size="18" color="#f4f4f5" variant="Broken" />
            ) : (
              <Moon size="18" color="#3f3f46" variant="Broken" />
            )}
          </Pressable>
        </View>
      </View>
      
      <ThemedText className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 font-mont">
        {t('report.subtitle', 'Having trouble with the application or noticed inconsistent pricing or values? Pick a category below and file a live report.')}
      </ThemedText>

      {/* Interactive Custom Vector Category Grid */}
      <ThemedText className="text-[11px] uppercase font-montBold tracking-widest text-zinc-400 mb-3 ml-1">
        {t('report.sectionTitle', 'Select Bug Category')}
      </ThemedText>
      
      <View className="flex-row flex-wrap justify-between gap-y-3 mb-6">
        {bugCategories.map((category, index) => {
          const translatedLabel = t(category.labelKey, category.labelDefault);
          return (
            <CategoryGridCell
              key={category.id}
              label={translatedLabel}
              IconComponent={category.IconComponent}
              isSelected={selectedCategoryIndex === index}
              isDark={isDark}
              cardBgColor={cardBgColor}
              onPress={() => setSelectedCategoryIndex(index)}
            />
          );
        })}
      </View>

      {/* Primary Action Card */}
      <View 
        style={[
          { backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor },
          Platform.select({
            ios: {
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: isDark ? 4 : 8 },
              shadowOpacity: isDark ? 0.35 : 0.10, 
              shadowRadius: isDark ? 10 : 16,    
            },
            android: {
              elevation: isDark ? 4 : 5, 
            }
          })
        ]} 
        className="rounded-2xl p-5 mb-5"
      >
        <View className="flex-row items-center gap-2 mb-2">
          <Flag size="18"  color="#71717a" variant="Broken" />
          <ThemedText className="font-montBold text-xs uppercase tracking-wide">
            {t('report.githubCard.title', 'Submit directly via GitHub Issues')}
          </ThemedText>
        </View>
        
        <ThemedText className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed mb-4 font-mont">
          {t('report.githubCard.description', 'Clicking the button below will securely bundle your selection template, local device OS parameters, and open the GitHub tracker instantly.')}
        </ThemedText>

        <Button 
          onPress={handleGitHubIssue} 
          text={t('report.githubCard.buttonText', 'File {{category}}', { category: translatedActiveLabel })} 
          type="primary"
          className="font-montBold"
        />
      </View>

      {/* API Attribution Disclosure Block */}
      <View 
        style={[
          { backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor },
          Platform.select({
            ios: {
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: isDark ? 4 : 8 },
              shadowOpacity: isDark ? 0.35 : 0.10, 
              shadowRadius: isDark ? 10 : 16,    
            },
            android: {
              elevation: isDark ? 4 : 5, 
            }
          })
        ]} 
        className="rounded-2xl p-4"
      >
        <View className="flex-row items-center gap-2 mb-2">
          <InfoCircle size="18" color="#71717a" variant="Broken" />
          <ThemedText className="font-montBold text-xs uppercase tracking-wide text-zinc-400 dark:text-zinc-400">
            {t('report.attributionCard.title', 'API & Project Attribution')}
          </ThemedText>
        </View>
        <ThemedText className="text-zinc-400 dark:text-zinc-400 text-[11px] leading-relaxed font-mont">
          {t('report.attributionCard.description', 'This open source distribution relies completely on structural feeds provided by the Gamepower and Free To Game architectures. None of these independent APIs or associated content entities belong directly to FRAPP.')}
        </ThemedText>
      </View>

      {/* Separator Line and Version Tracker Footer */}
      <View className="mt-8 mb-4 items-center justify-center">
        <Divider 
          style={{ backgroundColor: textColor }} 
          className="w-12 h-0.5 rounded-full opacity-10 mb-3" 
        />
        <ThemedText className="text-center font-montBold text-xs uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
          {t('report.footerVersion', 'Frapp Build v1.1.5')}
        </ThemedText>
      </View>
    </ScrollView>
  );
}