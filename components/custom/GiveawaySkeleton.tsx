import React, { ReactNode } from 'react';
import { View, Platform } from 'react-native';
import { Skeleton } from './Skeleton';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';

interface GiveawaySkeletonProps {
  loading: boolean;
  variant?: 'normal' | 'compact' | 'minimal';
  children: ReactNode | ReactNode[];
}

export default function GiveawaySkeleton({ loading = false, variant = 'normal', children }: GiveawaySkeletonProps) {
  const { themeMode } = useCustomTheme();
  const isDark = themeMode === 'dark';

  const isCompact = variant === 'compact';
  const isMinimal = variant === 'minimal';

  // Exact theme matches from live components
  const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';
  const minimalBgColor = isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)';
  const textColor = useThemeColor({}, 'text');
  
  const adaptiveBorderColor = isDark
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.05)';

  // Pop color configuration
  const skeletonColor = isDark ? '#3d3d4a' : '#e0e1e6';

  const shadowStyle = Platform.select({
    ios: { 
      shadowColor: '#000000', 
      shadowOffset: { width: 0, height: isDark ? 4 : 5 }, 
      shadowOpacity: isDark ? 0.22 : 0.06, 
      shadowRadius: isDark ? 8 : 10 
    },
    android: { elevation: isDark ? 2 : 4 }
  });

  if (loading) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, index) => {
          // =========================================================================
          // MINIMAL VARIANT SKELETON
          // =========================================================================
          if (isMinimal) {
            return (
              <View
                key={index}
                className="rounded-2xl mb-4 p-2.5 flex-row gap-3 border"
                style={{ 
                  backgroundColor: minimalBgColor, 
                  borderColor: adaptiveBorderColor 
                }}
              >
                {/* Thumbnail Image Wrapper */}
                <Skeleton className="w-24 h-24 rounded-xl" color={skeletonColor} />

                {/* Content Area */}
                <View className="flex-1 justify-between py-0.5">
                  <View>
                    <View className="flex-row items-center justify-between mb-1.5 pr-1">
                      <Skeleton className="h-4 w-2/3 rounded-md" color={skeletonColor} />
                      <Skeleton className="h-4 w-10 rounded-md" color={skeletonColor} />
                    </View>
                    <Skeleton className="h-3 w-full rounded-md mb-1" color={skeletonColor} />
                    <Skeleton className="h-3 w-4/5 rounded-md" color={skeletonColor} />
                  </View>

                  <View className="flex-row items-center justify-between mt-1">
                    <Skeleton className="h-3 w-16 rounded-md" color={skeletonColor} />
                    <View className="flex-row items-center gap-2">
                      <Skeleton className="w-7 h-7 rounded-lg" color={skeletonColor} />
                      <Skeleton className="w-7 h-7 rounded-lg" color={skeletonColor} />
                    </View>
                  </View>
                </View>
              </View>
            );
          }

          // =========================================================================
          // COMPACT VARIANT SKELETON
          // =========================================================================
          if (isCompact) {
            return (
              <View
                key={index}
                className="rounded-2xl mb-4 p-3 flex-row gap-3"
                style={[
                  { backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor },
                  Platform.select({
                    ios: {
                      shadowColor: '#000000',
                      shadowOffset: { width: 0, height: isDark ? 2 : 4 },
                      shadowOpacity: isDark ? 0.25 : 0.06,
                      shadowRadius: isDark ? 8 : 10,
                    },
                    android: { elevation: isDark ? 2 : 3 }
                  })
                ]}
              >
                {/* Thumbnail Frame */}
                <Skeleton className="w-28 h-28 rounded-xl" color={skeletonColor} />

                {/* Info Text Stack */}
                <View className="flex-1 justify-between py-0.5">
                  <View>
                    <Skeleton className="h-4.5 w-3/4 rounded-md mb-2" color={skeletonColor} />
                    <Skeleton className="h-3 w-full rounded-md mb-1" color={skeletonColor} />
                    <Skeleton className="h-3 w-5/6 rounded-md" color={skeletonColor} />
                  </View>

                  <View className="flex-row items-center justify-between mt-1">
                    <Skeleton className="h-3 w-20 rounded-md" color={skeletonColor} />
                    <View className="flex-row items-center gap-2">
                      <Skeleton className="w-7 h-7 rounded-lg" color={skeletonColor} />
                      <Skeleton className="w-7 h-7 rounded-lg" color={skeletonColor} />
                    </View>
                  </View>
                </View>
              </View>
            );
          }

          // =========================================================================
          // NORMAL VARIANT SKELETON (FULL BANNER CAROUSEL RENDER)
          // =========================================================================
          return (
            <View
              key={index}
              style={[
                { 
                  borderWidth: 1, 
                  borderColor: adaptiveBorderColor,
                  backgroundColor: cardBgColor 
                },
                shadowStyle
              ]}
              className="rounded-2xl overflow-hidden w-full mb-6"
            >
              {/* Image Graphic Row Area */}
              <Skeleton className="w-full h-40 rounded-none" color={skeletonColor} />

              {/* Informational Panel Blocks */}
              <View className="p-4">
                <View className="mb-4">
                  <Skeleton className="h-4.5 w-1/2 rounded-md mb-2" color={skeletonColor} />
                  <Skeleton className="h-3.5 w-full rounded-md mb-1" color={skeletonColor} />
                  <Skeleton className="h-3.5 w-4/5 rounded-md" color={skeletonColor} />
                </View>

                {/* Split Action & Claim Offer Details Strip */}
                <View 
                  style={{ borderTopWidth: 1, borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)' }} 
                  className="flex-row items-center justify-between pt-3 mt-0.5"
                >
                  <Skeleton className="h-3.5 w-28 rounded-md" color={skeletonColor} />
                  
                  <View className="flex-row items-center gap-2">
                    <View className="flex-row items-center gap-1.5 mr-1">
                      <Skeleton className="h-3.5 w-8 rounded-md" color={skeletonColor} />
                      <Skeleton className="h-4 w-10 rounded-md" color={skeletonColor} />
                    </View>
                    <Skeleton className="w-7 h-7 rounded-lg" color={skeletonColor} />
                    <Skeleton className="w-7 h-7 rounded-lg" color={skeletonColor} />
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </>
    );
  }

  return <>{children}</>;
}