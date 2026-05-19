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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [agreed, setAgreed] = useState(false);

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
    <View className="flex-1 bg-zinc-950 justify-between px-6 pt-16 pb-10">
      
      {/* STEP METADATA / PROGRESS PILLS */}
      <View className="flex-row items-center justify-center gap-2 mt-2">
        <View className={`h-1.5 rounded-full ${currentStep === 1 ? 'w-8 bg-purple-500' : 'w-2 bg-zinc-800'}`} />
        <View className={`h-1.5 rounded-full ${currentStep === 2 ? 'w-8 bg-purple-500' : 'w-2 bg-zinc-800'}`} />
      </View>

      {/* --- STEP 1: FEATURE HIGHLIGHTS PANEL --- */}
      {currentStep === 1 && (
        <View className="flex-1 justify-between my-auto py-6">
          <View className="items-center">
            <View className="w-14 h-14 bg-purple-600 rounded-2xl items-center justify-center shadow-md mb-3">
              <ThemedText className="text-white font-black text-2xl">▲</ThemedText>
            </View>
            <ThemedText className="text-white text-3xl font-black tracking-tight text-center">
              Welcome to Frapp<ThemedText className="text-purple-500 font-black">Store</ThemedText>
            </ThemedText>
            <ThemedText className="text-zinc-400 text-sm text-center px-4 mt-2 leading-relaxed">
              Your centralized operational hub for aggregating commercial gaming promotions and open-source packages.
            </ThemedText>
          </View>

          <View className="space-y-5 my-auto max-w-md self-center w-full">
            {featureHighlights.map((feat, index) => {
              const FeatureIcon = feat.Icon;
              return (
                <View key={index} className="flex-row items-start gap-4 px-2">
                  <View 
                    style={{ backgroundColor: `${feat.color}15` }} 
                    className="p-3 rounded-2xl items-center justify-center border border-purple-500/10"
                  >
                    <FeatureIcon size="24" color={feat.color} variant="Bulk" />
                  </View>
                  <View className="flex-1">
                    <ThemedText className="text-white font-extrabold text-base tracking-tight">
                      {feat.title}
                    </ThemedText>
                    <ThemedText className="text-zinc-400 text-xs mt-1 leading-relaxed">
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
              <SecuritySafe size="28" color="#f59e0b" variant="Bulk" />
            </View>
            <ThemedText className="text-white text-2xl font-black tracking-tight text-center">
              Legal Agreements
            </ThemedText>
            <ThemedText className="text-zinc-400 text-sm text-center px-4 mt-1 leading-relaxed">
              Please review the privacy conditions before accessing our global data sync pipelines.
            </ThemedText>
          </View>

          {/* Legal Content Box Container */}
          <View className="flex-1 my-6 max-h-[280px] bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4">
            <ScrollView showsVerticalScrollIndicator={true} className="pr-1">
              <View className="flex-row items-center gap-2 mb-2">
                <Eye size="14" color="#a855f7" variant="Bold" />
                <ThemedText className="text-xs font-black uppercase text-purple-400 tracking-wider">
                  Privacy Core Framework
                </ThemedText>
              </View>
              <ThemedText className="text-zinc-400 text-xs leading-relaxed mb-4">
                FrappStore operates entirely as an open-source data aggregator tool. We do not maintain localized storage platforms, harvest physical account structures, or trace user telemetry histories.
              </ThemedText>

              <View className="flex-row items-center gap-2 mb-2">
                <SecuritySafe size="14" color="#a855f7" variant="Bold" />
                <ThemedText className="text-xs font-black uppercase text-purple-400 tracking-wider">
                  Third-Party API Disclosures
                </ThemedText>
              </View>
              <ThemedText className="text-zinc-400 text-xs leading-relaxed">
                All data indexes visible throughout the interface are fetched directly from external networks via the Gamepower and FreeToGame open public architectures. Use of these indexes complies directly with their native distribution rules.
              </ThemedText>
            </ScrollView>
          </View>

          {/* Custom Checkbox Row Button Layout */}
          <Pressable 
            onPress={() => setAgreed(!agreed)}
            className="flex-row items-center gap-3 bg-zinc-900 border border-zinc-800 p-4 rounded-xl mb-4 active:opacity-90 max-w-md w-full self-center"
          >
            <View className="w-6 h-6 items-center justify-center">
              {agreed ? (
                <TickCircle size="24" color="#10b981" variant="Bold" />
              ) : (
                <View className="w-5 h-5 rounded-md border-2 border-zinc-700 bg-transparent" />
              )}
            </View>
            <View className="flex-1">
              <ThemedText className="text-white font-bold text-xs leading-tight">
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
            backgroundColor: currentStep === 2 && !agreed ? '#3f3f46' : '#9333ea',
            opacity: currentStep === 2 && !agreed ? 0.4 : 1
          }}
          className="w-full h-14 rounded-xl flex-row items-center justify-center shadow-lg gap-2"
        >
          <ThemedText className="text-white font-black text-sm tracking-wide">
            {currentStep === 1 ? 'Continue' : 'Get Started'}
          </ThemedText>
          <ArrowRight2 size="16" color="#ffffff" variant="Bold" />
        </Pressable>
        
        <ThemedText className="text-zinc-600 text-[10px] uppercase text-center font-bold tracking-widest mt-5">
          Frapp Architecture Distribution • v1.0.8
        </ThemedText>
      </View>

    </View>
  );
}