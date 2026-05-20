import React, { ReactNode } from 'react';
import { View, Platform } from 'react-native';
import { Skeleton } from './Skeleton';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext'; // Ensure this is imported

interface GiveawaySkeletonProps {
  loading: boolean;
  children: ReactNode | ReactNode[];
}

export default function GiveawaySkeleton({ loading = false, children }: GiveawaySkeletonProps) {
  const { themeMode } = useCustomTheme();

  // These variables now match your main card theme exactly
  const cardBgColor = themeMode === 'dark' ? '#2c2c35' : '#f1f2f6';
  const textColor = useThemeColor({}, 'text');

  // This color ensures the skeleton "pops" correctly against the cardBgColor
  const skeletonColor = themeMode === 'dark' ? '#3d3d4a' : '#e0e1e6';

  if (loading) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          <View
            key={index}
            className="rounded-2xl mb-6 p-4 border"
            style={[
              {
                backgroundColor: cardBgColor,
                borderColor: themeMode === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
              },
              Platform.select({
                ios: {
                  shadowColor: textColor,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: themeMode === 'dark' ? 0.2 : 0.06,
                  shadowRadius: 8,
                },
                android: { elevation: 4 }
              })
            ]}
          >
            {/* Thumbnail */}
            <View className="w-full h-48 rounded-xl overflow-hidden mb-4">
              <Skeleton className="w-full h-full" color={skeletonColor} />
            </View>

            {/* Content */}
            <View className="flex-1 space-y-2 mb-4">
              <Skeleton className="w-3/4 h-5 rounded mb-2" color={skeletonColor} />
              <Skeleton className="w-full h-4 rounded mb-1.5" color={skeletonColor} />
              <Skeleton className="w-5/6 h-4 rounded mb-4" color={skeletonColor} />

              <View
                style={{ borderColor: themeMode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' }}
                className="border-t border-b py-3 my-1 flex-row justify-between"
              >
                <View className="space-y-1">
                  <Skeleton className="w-12 h-2.5 rounded mb-1" color={skeletonColor} />
                  <Skeleton className="w-16 h-4 rounded" color={skeletonColor} />
                </View>
                <View className="items-end space-y-1">
                  <Skeleton className="w-16 h-2.5 rounded mb-1" color={skeletonColor} />
                  <Skeleton className="w-20 h-4 rounded" color={skeletonColor} />
                </View>
              </View>
            </View>

            {/* Buttons */}
            {/* Dual Action Button Placeholders */}
            <View className="flex-row justify-between gap-3">
              <Skeleton className="flex-1 h-12 rounded-lg" color={skeletonColor} />
              <Skeleton className="flex-1 h-12 rounded-lg" color={skeletonColor} />
            </View>
          </View>
        ))}
      </>
    );
  }

  return <>{children}</>;
}