import React, { useState } from 'react';
import { View, Dimensions, Pressable, ScrollView, Image } from 'react-native'; 
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { 
  SecuritySafe, 
  Eye, 
  ArrowRight2, 
  TickCircle 
} from 'iconsax-react-nativejs';
import LottieView from 'lottie-react-native'; 

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

  return (
    <View style={{ backgroundColor }} className="flex-1 justify-between px-6 pt-16 pb-10">
      
      {/* STEP METADATA / PROGRESS PILLS */}
      <View className="flex-row items-center justify-center gap-2 mt-2">
        <View className={`h-1.5 rounded-full ${currentStep === 1 ? 'w-8 bg-purple-500' : 'w-2 bg-zinc-300 dark:bg-zinc-800'}`} />
        <View className={`h-1.5 rounded-full ${currentStep === 2 ? 'w-8 bg-purple-500' : 'w-2 bg-zinc-300 dark:bg-zinc-800'}`} />
      </View>

      {/* --- STEP 1: RE-DESIGNED LOTTIE & SUMMARY PANEL --- */}
      {currentStep === 1 && (
        <View className="flex-1 justify-between my-auto py-4">
          {/* Enhanced Core Branding Hero Section */}
          <View className="items-center mt-4">
            {/* Native Branding Asset Container retaining original dimensions */}
            <View className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg shadow-purple-500/20 mb-4 border border-purple-400/20">
              <Image 
                source={require('@/assets/images/FRAPP_ICON1.png')} 
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>
            
            <ThemedText className="text-3xl font-montBlack tracking-tight text-center">
              Welcome to Frapp<ThemedText className="text-purple-500 font-montBlack"></ThemedText>
            </ThemedText>
            
            <View className="bg-purple-500/10 px-3 py-1 rounded-full mt-2 border border-purple-500/20">
              <ThemedText className="text-purple-500 font-montBold text-[11px] uppercase tracking-wider">
                Next-Gen Aggregate Engine
              </ThemedText>
            </View>
          </View>

          {/* Core Interactive Lottie Space Area */}
          <View className="w-full max-w-sm h-64 self-center justify-center items-center my-4">
            <LottieView
              source={require('@/assets/images/onboarding-anim.json')}
              autoPlay
              loop
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          </View>

          {/* New 2-Line High-Fidelity Summary Layout */}
          <View className="max-w-md self-center w-full px-4 mb-6">
            <ThemedText className="text-center font-montBold text-base leading-snug tracking-tight mb-2">
              Track giveaways and premium free-to-play listings instantly.
            </ThemedText>
            <ThemedText className="text-zinc-500 dark:text-zinc-400 text-center text-xs leading-relaxed font-mont">
              A streamlined aggregator that fetches continuous database updates, alerts you before distributions expire, and operates entirely client-side.
            </ThemedText>
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
            <ThemedText className="text-2xl font-montBlack tracking-tight text-center">
              Legal Agreements
            </ThemedText>
            <ThemedText className="text-zinc-500 dark:text-zinc-400 text-sm text-center px-4 mt-1 leading-relaxed font-mont">
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
                <ThemedText className="text-xs font-montBlack uppercase text-purple-500 tracking-wider">
                  Privacy Core Framework
                </ThemedText>
              </View>
              <ThemedText className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed mb-4 font-mont">
                Frapp operates entirely as an open-source data aggregator tool. We do not maintain localized storage platforms, harvest physical account structures, or trace user telemetry histories. Because all processes run directly on your hardware, no data is ever transmitted, processed, or logged by an internal master hub or centralized administrative network. Your localized configuration profiles, historical cache files, and interactive preferences remain securely on your device.
              </ThemedText>

              <View className="flex-row items-center gap-2 mb-2">
                <SecuritySafe size="14" color="#a855f7" variant="Broken" />
                <ThemedText className="text-xs font-montBlack uppercase text-purple-500 tracking-wider">
                  Third-Party API Disclosures
                </ThemedText>
              </View>
              <ThemedText className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed font-mont">
                All data indexes visible throughout the interface are fetched directly from external networks via the Gamepower and FreeToGame open public architectures. Use of these indexes complies directly with their native distribution rules. Frapp does not manipulate individual item listings, alter pricing structures, or manage distribution timelines. Consequently, we cannot guarantee the uninterrupted availability, accuracy, or ongoing support of external nodes or keys distributed through those respective platforms.
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
                <TickCircle size="24" color="#9333ea" variant="Bold" />
              ) : (
                <View className="w-5 h-5 rounded-md border-2 border-zinc-300 dark:border-zinc-700 bg-transparent" />
              )}
            </View>
            <View className="flex-1">
              <ThemedText className="font-montBold text-xs leading-tight">
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
          className="w-full h-14 rounded-3xl flex-row items-center justify-center shadow-md gap-2 active:opacity-90"
        >
          <ThemedText 
            style={{
              color: currentStep === 2 && !agreed 
                ? (themeMode === 'dark' ? '#71717a' : '#a1a1aa') 
                : '#ffffff'
            }}
            className="font-montBlack text-sm tracking-wide"
          >
            {currentStep === 1 ? 'Continue' : 'Get Started'}
          </ThemedText>
          <ArrowRight2 
            size="16" 
            color={currentStep === 2 && !agreed ? (themeMode === 'dark' ? '#71717a' : '#a1a1aa') : '#ffffff'} 
            variant="Bold" 
          />
        </Pressable>
        
        <ThemedText className="text-zinc-400 dark:text-zinc-600 text-[10px] uppercase text-center font-montBold tracking-widest mt-5">
          Frapp Architecture Distribution • v1.1.0
        </ThemedText>
      </View>

    </View>
  );
}