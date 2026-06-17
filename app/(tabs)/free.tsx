import FreeGiveawayItem from '@/components/custom/FreeGiveawayItem';
import GiveawaySkeleton from '@/components/custom/GiveawaySkeleton';
import { ThemedText } from '@/components/ThemedText';
import { API_ENDPOINTS } from '@/constants/api';
import { FreeGiveaway } from '@/types';
import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, View, Pressable, Image, Platform } from 'react-native';
import { Setting, Moon, Sun1, WifiSquare, Element3, RowVertical } from 'iconsax-react-nativejs'; 
import { useRouter } from 'expo-router';

import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';

// Retaining original button for error state retry call triggers if needed
import Button from '@/components/custom/Button';

// =========================================================================
// LOCAL SCREEN-SPECIFIC THEMED PAGINATION BUTTON COMPONENT
// =========================================================================
interface PaginationButtonProps {
  text: string;
  onPress: () => void;
  isDark: boolean;
}

function PaginationButton({ text, onPress, isDark }: PaginationButtonProps) {
  const dynamicBorderColor = isDark ? 'rgba(255, 255, 255, 1)' : 'rgba(28, 28, 30, 1)';
  const dynamicTextColor = isDark ? '#ffffff' : '#1c1c1e';

  return (
    <Pressable
      onPress={onPress}
      className="w-full h-12 rounded-xl border items-center justify-center active:opacity-60 bg-transparent"
      style={{ borderColor: dynamicBorderColor }}
    >
      <ThemedText 
        style={{ color: dynamicTextColor }} 
        className="font-montBold text-sm uppercase tracking-wider"
      >
        {text}
      </ThemedText>
    </Pressable>
  );
}

export default function FreeScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [giveaways, setGiveaways] = useState<FreeGiveaway[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [layoutVariant, setLayoutVariant] = useState<'normal' | 'compact'>('normal');
  const itemsPerPage = 10;

  const backgroundColor = useThemeColor({}, 'background');
  const { themeMode, toggleTheme } = useCustomTheme();

  const isDark = themeMode === 'dark';
  const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';
  const adaptiveBorderColor = isDark ? '#3a3a45' : '#e4e4e7';

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPagedGiveaways = giveaways.slice(startIndex, endIndex);

  const fetchData = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const response = await fetch(API_ENDPOINTS.Games);
      if (!response.ok) throw new Error('Server returned invalid status payload');
      
      const finalData: FreeGiveaway[] = await response.json();
      setGiveaways(finalData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const now = new Date();
  const day = now.getDate();
  const year = now.getFullYear();
  const monthName = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ][now.getMonth()];

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <ScrollView
        ref={scrollRef}
        className='flex-1 px-4 pt-10 pb-2'
        style={{ backgroundColor }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* --- MATCHING BRAND HEADER ROW --- */}
        <View className="flex-row items-center justify-between w-full mb-6">
          <View className="flex-row items-center gap-3">
            <View
              style={{ backgroundColor: '#9333ea' }}
              className="w-10 h-10 rounded-xl overflow-hidden items-center justify-center shadow-md"
            >
              <Image
                source={require('../../assets/images/FRAPP_ICON1.png')}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>
            <ThemedText className="text-xl font-montBlack tracking-tight">
              Free Games.
            </ThemedText>
          </View>

          {/* Integrated Header Toolbar Panel */}
          <View className="flex-row items-center gap-2.5">
            <Pressable
              onPress={() => setLayoutVariant(prev => prev === 'normal' ? 'compact' : 'normal')}
              style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }}
              className="w-10 h-10 rounded-full items-center justify-center active:opacity-70 shadow-sm"
            >
              {layoutVariant === 'normal' ? (
                <Element3 size="22" color="#9333ea" variant="Broken" />
              ) : (
                <RowVertical size="22" color="#9333ea" variant="Broken" />
              )}
            </Pressable>

            <Pressable
              onPress={() => router.push('/(tabs)/settings')}
              style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }}
              className="w-10 h-10 rounded-full items-center justify-center active:opacity-70 shadow-sm"
            >
              <Setting
                size="22"
                color={isDark ? '#f4f4f5' : '#3f3f46'}
                variant="Broken"
              />
            </Pressable>

            <Pressable
              onPress={toggleTheme}
              style={{ backgroundColor: isDark ? '#27272a' : '#f4f4f5' }}
              className="w-10 h-10 rounded-full items-center justify-center active:opacity-70 shadow-sm"
            >
              {isDark ? (
                <Sun1 size="22" color="#f4f4f5" variant="Broken" />
              ) : (
                <Moon size="22" color="#3f3f46" variant="Broken" />
              )}
            </Pressable>
          </View>
        </View>

        {/* Summary Section Container */}
        {!isLoading && !hasError && giveaways.length > 0 && (
          <View
            style={[
              { backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor },
              Platform.select({
                ios: { shadowColor: '#000000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
                android: { elevation: 2 }
              })
            ]}
            className="rounded-2xl p-4 mb-6"
          >
            <ThemedText className="font-mont text-sm leading-6 opacity-90">
              We discovered{' '}
              <ThemedText style={{ color: '#22c55e' }} className="font-montBlack">{giveaways.length}</ThemedText> fully free-to-play games available as of{' '}
              <ThemedText style={{ color: '#a855f7' }} className="font-montBlack">
                {day} {monthName} {year}
              </ThemedText>. Tap any title to jump straight into the action!
            </ThemedText>
          </View>
        )}

        {/* Primary Data Render Pipeline */}
        {hasError ? (
          <View
            style={[
              { backgroundColor: cardBgColor, borderWidth: 1, borderColor: adaptiveBorderColor },
              Platform.select({
                ios: { shadowColor: '#000000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: isDark ? 0.30 : 0.08, shadowRadius: 12 },
                android: { elevation: 4 }
              })
            ]}
            className="rounded-3xl p-6 items-center justify-center my-6"
          >
            <View className="w-16 h-16 rounded-2xl bg-purple-600/10 dark:bg-purple-500/10 items-center justify-center mb-4">
              <WifiSquare size="36" color="#9333ea" variant="Broken" />
            </View>

            <ThemedText className="font-montBlack text-lg text-center mb-2 tracking-tight">
              Connection Interrupted
            </ThemedText>
            
            <ThemedText className="font-mont text-zinc-500 dark:text-zinc-400 text-sm text-center leading-relaxed mb-6 px-4">
              We can't sync up with the servers right now. Make sure your device is online and let's try that again.
            </ThemedText>

            <Button
              type="primary"
              loading={isLoading}
              onPress={fetchData}
              className="w-full"
              text="Retry Connection"
            />
          </View>
        ) : isLoading ? (
          <GiveawaySkeleton loading={true}>
            <></>
          </GiveawaySkeleton>
        ) : (
          <View className="w-full">
            {currentPagedGiveaways.map(giveaway => (
              <FreeGiveawayItem 
                key={giveaway.id} 
                giveaway={giveaway} 
                variant={layoutVariant} 
              />
            ))}
          </View>
        )}

        {/* Dual Action Pagination Footer Toolbar */}
        {!isLoading && !hasError && (
          <View className="flex-row items-center gap-3 mt-4 w-full">
            {currentPage > 1 && (
              <View className="flex-1 mb-24">
                <PaginationButton 
                  text="Previous"
                  onPress={handlePrevPage}
                  isDark={isDark}
                />
              </View>
            )}
            
            {endIndex < giveaways.length && (
              <View className="flex-1 mb-24">
                <PaginationButton 
                  text="Next Games"
                  onPress={handleNextPage}
                  isDark={isDark}
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}