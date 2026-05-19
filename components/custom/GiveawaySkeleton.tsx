import React, { ReactNode } from 'react';
import { View, Platform } from 'react-native';
import { Skeleton } from './Skeleton';

// 1. Import your custom theme hook
import { useThemeColor } from '@/hooks/useThemeColor';

interface GiveawaySkeletonProps {
  loading: boolean;
  children: ReactNode | ReactNode[];
}

export default function GiveawaySkeleton({ loading = false, children }: GiveawaySkeletonProps) {
  // 2. Fetch 'card' to prevent flattening into background, and 'text' for contrast shadows
  const cardBgColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  if (loading) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          <View 
            key={index} 
            className="rounded-xl mb-6 p-4 border border-zinc-200 dark:border-zinc-800"
            style={[
              { 
                backgroundColor: cardBgColor,
                borderColor: Platform.OS === 'ios' ? 'transparent' : undefined,
              },
              // 3. Match the drop shadow profile exactly to your new GiveawayItem
              Platform.select({
                ios: {
                  shadowColor: textColor,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.06,
                  shadowRadius: 8,
                },
                android: {
                  elevation: 4,
                }
              })
            ]}
          >
            {/* Thumbnail Image Placeholder */}
            <View className="w-full h-48 rounded-xl overflow-hidden mb-4">
              <Skeleton className="w-full h-full" />
            </View>

            {/* Content Text Placeholders */}
            <View className="flex-1 space-y-2 mb-4">
              {/* Title Block */}
              <Skeleton className="w-3/4 h-5 rounded mb-2" />
              
              {/* Description Blocks */}
              <Skeleton className="w-full h-4 rounded mb-1.5" />
              <Skeleton className="w-5/6 h-4 rounded mb-4" />
              
              {/* Divider Dashboard Container Block */}
              <View className="border-t border-b border-zinc-100 dark:border-zinc-800/60 py-3 my-1 flex-row justify-between">
                <View className="space-y-1">
                  <Skeleton className="w-12 h-2.5 rounded mb-1" />
                  <Skeleton className="w-16 h-4 rounded" />
                </View>
                <View className="items-end space-y-1">
                  <Skeleton className="w-16 h-2.5 rounded mb-1" />
                  <Skeleton className="w-20 h-4 rounded" />
                </View>
              </View>
            </View>
            
            {/* Dual Action Button Placeholders */}
            <View className="flex-row justify-between bg-transparent gap-3">
              <Skeleton className="flex-1 h-[43px] rounded-lg" />
              <Skeleton className="flex-1 h-[43px] rounded-lg" />
            </View>
          </View>
        ))}
      </>
    );
  }
  
  return children;
}