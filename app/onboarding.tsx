import React, { useState } from 'react';
import { View, Dimensions, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { 
  Gift, 
  Game, 
  Notification, 
  SecuritySafe, 
  Eye, 
  ArrowRight2, 
  TickCircle 
} from 'iconsax-react-nativejs';

// Import custom theme hooks
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [agreed, setAgreed] = useState(false);

  // Fetch dynamic system theme parameters
  const backgroundColor = useThemeColor({}, 'background');
  const cardBgColor = useThemeColor({}, 'background');
  const { themeMode } = useCustomTheme();

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2 && agreed) {
      // Complete initialization and jump past onboarding
      router.replace('/(tabs)');
    }
  };

  const featureHighlights = [
    {
      Icon: Gift,
      color: '#a855f7',
      title: 'Premium Giveaways',
      desc: 'Track premium commercial titles temporarily listed at 100% price deductions across platforms.'
    },
    {
      Icon: Game,
      color: '#10b981',
      title: 'Free-to-Play Catalogs',
      desc: 'Sift through dynamic public indexes containing top-tier open database game selections.'
    },
    {
      Icon: Notification,
      color: '#3b82f6',
      title: 'Instant Reminders',
      desc: 'Claim promotional activations and bundle keys directly before local distribution time limits expire.'
    }
  ];

  return (
    <View style={{ backgroundColor }} className="flex-1 justify-between px-6 pt-16 pb-10">
      
      {/* STEP METADATA / PROGRESS PILLS */}
      <View className="flex-row items-center justify-center gap-2 mt-2">
        <View className={`h-1.5 rounded-full ${currentStep === 1 ? 'w-8 bg-purple-500' : 'w-2 bg-zinc-300 dark:bg-zinc-800'}`} />
        <View className={`h-1.5 rounded-full ${currentStep === 2 ? 'w-8 bg-purple-500' : 'w-2 bg-zinc-300 dark:bg-zinc-800'}`} />
      </View>

      {/* --- STEP 1: RE-DESIGNED FEATURE HIGHLIGHTS PANEL --- */}
      {currentStep === 1 && (
        <View className="flex-1 justify-between my-auto py-4">
          {/* Enhanced Core Branding Hero Section */}
          <View className="items-center mt-4">
            <View className="w-16 h-16 bg-purple-600 rounded-2xl items-center justify-center shadow-lg shadow-purple-500/20 mb-4 border border-purple-400/20">
              <ThemedText className="text-white font-black text-3xl">▲</ThemedText>
            </View>
            
            <ThemedText className="text-3xl font-black tracking-tight text-center">
              Welcome to Frapp<ThemedText className="text-purple-500 font-black"></ThemedText>
            </ThemedText>
            
            <View className="bg-purple-500/10 px-3 py-1 rounded-full mt-2 border border-purple-500/20">
              <ThemedText className="text-purple-500 font-bold text-[11px] uppercase tracking-wider">
                Next-Gen Aggregate Engine
              </ThemedText>
            </View>

            <ThemedText className="text-zinc-500 dark:text-zinc-400 text-sm text-center px-6 mt-4 leading-relaxed font-medium">
              Your centralized operational hub for tracking premium commercial gaming promotions and indexing free-to-play platforms.
            </ThemedText>
          </View>

          {/* Clean Card-Style Modular Feature Layout */}
          <View className="space-y-4 my-auto max-w-md self-center w-full">
            {featureHighlights.map((feat, index) => {
              const FeatureIcon = feat.Icon;
              return (
                <View 
                  key={index} 
                  style={{ backgroundColor: cardBgColor }}
                  className="flex-row items-center gap-4 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800/60 shadow-sm"
                >
                  <View 
                    style={{ backgroundColor: `${feat.color}12` }} 
                    className="p-3 rounded-xl items-center justify-center border border-purple-500/5"
                  >
                    <FeatureIcon size="22" color={feat.color} variant="Broken" />
                  </View>
                  <View className="flex-1">
                    <ThemedText className="font-bold text-sm tracking-tight">
                      {feat.title}
                    </ThemedText>
                    <ThemedText className="text-zinc-400 dark:text-zinc-500 text-xs mt-0.5 leading-normal">
                      {feat.desc}
                    </ThemedText>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      )}

      {/* --- STEP 2: TERMS & PRIVACY CONSENT PANEL --- */}
      {currentStep === 2 && (
        <View className="flex-1 justify-between my-auto py-6">
          <View className="items-center">
            <View className="w-14 h-14 bg-amber-500/10 rounded-2xl items-center justify-center border border-amber-500/20 mb-3">
              <SecuritySafe size="28" color="#f59e0b" variant="Broken" />
            </View>
            <ThemedText className="text-2xl font-black tracking-tight text-center">
              Legal Agreements
            </ThemedText>
            <ThemedText className="text-zinc-500 dark:text-zinc-400 text-sm text-center px-4 mt-1 leading-relaxed">
              Please review the privacy conditions before accessing our global data sync pipelines.
            </ThemedText>
          </View>

          {/* Legal Content Box Container */}
          <View 
            style={{ backgroundColor: cardBgColor }}
            className="flex-1 my-6 max-h-[280px] border border-zinc-100 dark:border-zinc-800/60 rounded-2xl p-4 shadow-sm"
          >
            <ScrollView showsVerticalScrollIndicator={true} className="pr-1">
              <View className="flex-row items-center gap-2 mb-2">
                <Eye size="14" color="#a855f7" variant="Broken" />
                <ThemedText className="text-xs font-black uppercase text-purple-500 tracking-wider">
                  Privacy Core Framework
                </ThemedText>
              </View>
              <ThemedText className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed mb-4">
                Frapp operates entirely as an open-source data aggregator tool. We do not maintain localized storage platforms, harvest physical account structures, or trace user telemetry histories.
              </ThemedText>

              <View className="flex-row items-center gap-2 mb-2">
                <SecuritySafe size="14" color="#a855f7" variant="Broken" />
                <ThemedText className="text-xs font-black uppercase text-purple-500 tracking-wider">
                  Third-Party API Disclosures
                </ThemedText>
              </View>
              <ThemedText className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">
                All data indexes visible throughout the interface are fetched directly from external networks via the Gamepower and FreeToGame open public architectures. Use of these indexes complies directly with their native distribution rules.
              </ThemedText>
            </ScrollView>
          </View>

          {/* Custom Checkbox Row Layout */}
          <Pressable 
            onPress={() => setAgreed(!agreed)}
            style={{ backgroundColor: cardBgColor }}
            className="flex-row items-center gap-3 border border-zinc-100 dark:border-zinc-800/60 p-4 rounded-xl mb-4 active:opacity-90 max-w-md w-full self-center shadow-sm"
          >
            <View className="w-6 h-6 items-center justify-center">
              {agreed ? (
                <TickCircle size="24" color="#10b981" variant="Bold" />
              ) : (
                <View className="w-5 h-5 rounded-md border-2 border-zinc-300 dark:border-zinc-700 bg-transparent" />
              )}
            </View>
            <View className="flex-1">
              <ThemedText className="font-bold text-xs leading-tight">
                I accept the Terms of Service & Privacy Statement
              </ThemedText>
            </View>
          </Pressable>
        </View>
      )}

      {/* --- FOOTER ACTION HUB BUTTONS --- */}
      <View className="w-full max-w-md self-center">
        <Pressable
          onPress={handleNextStep}
          disabled={currentStep === 2 && !agreed}
          style={{
            backgroundColor: currentStep === 2 && !agreed 
              ? (themeMode === 'dark' ? '#27272a' : '#e4e4e7') 
              : '#9333ea',
          }}
          className="w-full h-14 rounded-xl flex-row items-center justify-center shadow-md gap-2 active:opacity-90"
        >
          <ThemedText 
            style={{
              color: currentStep === 2 && !agreed 
                ? (themeMode === 'dark' ? '#71717a' : '#a1a1aa') 
                : '#ffffff'
            }}
            className="font-black text-sm tracking-wide"
          >
            {currentStep === 1 ? 'Continue' : 'Get Started'}
          </ThemedText>
          <ArrowRight2 
            size="16" 
            color={currentStep === 2 && !agreed ? (themeMode === 'dark' ? '#71717a' : '#a1a1aa') : '#ffffff'} 
            variant="Bold" 
          />
        </Pressable>
        
        <ThemedText className="text-zinc-400 dark:text-zinc-600 text-[10px] uppercase text-center font-bold tracking-widest mt-5">
          Frapp Architecture Distribution • v1.0.8
        </ThemedText>
      </View>

    </View>
  );
}