import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { Skeleton } from './Skeleton';

// 1. Import your custom theme hook
import { useThemeColor } from '@/hooks/useThemeColor';

interface GiveawaySkeletonProps {
  loading: boolean;
  children: ReactNode | ReactNode[];
}

export default function GiveawaySkeleton({ loading = false, children }: GiveawaySkeletonProps) {
  // 2. Fetch the dynamic card background color
  const cardBgColor = useThemeColor({}, 'background');

  if (loading) {
    return (
      <>
        {Array.from({ length: 6 }).map((_, index) => (
          // 3. Removed 'bg-background' and injected the styled theme background
          <View 
            key={index} 
            style={{ backgroundColor: cardBgColor }} 
            className="rounded-lg p-4 shadow-md mb-4"
          >
            <Skeleton className="w-full h-36 rounded-lg mb-3" />
            <Skeleton className="w-full h-5 rounded mb-2" />
            <Skeleton className="w-full h-4 rounded mb-2" />
            <Skeleton className="w-full h-4 rounded" />
          </View>
        ))}
      </>
    );
  }
  
  return children;
}