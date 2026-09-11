import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import {
  ScrollView,
  View,
  Pressable,
  Platform,
  LayoutAnimation,
  TextInput,
} from 'react-native';
import { Image } from 'expo-image';
import Moon from 'iconsax-react-nativejs/dist/cjs/Moon';
import Sun1 from 'iconsax-react-nativejs/dist/cjs/Sun1';
import WifiSquare from 'iconsax-react-nativejs/dist/cjs/WifiSquare';
import Filter from 'iconsax-react-nativejs/dist/cjs/Filter';
import RowVertical from 'iconsax-react-nativejs/dist/cjs/RowVertical';
import Element3 from 'iconsax-react-nativejs/dist/cjs/Element3';
import SearchNormal from 'iconsax-react-nativejs/dist/cjs/SearchNormal';
import CloseCircle from 'iconsax-react-nativejs/dist/cjs/CloseCircle';
import Shop from 'iconsax-react-nativejs/dist/cjs/Shop';
import Game from 'iconsax-react-nativejs/dist/cjs/Game';
import Gift from 'iconsax-react-nativejs/dist/cjs/Gift';
import Flash from 'iconsax-react-nativejs/dist/cjs/Flash';
import ArchiveAdd from 'iconsax-react-nativejs/dist/cjs/ArchiveAdd';

import AsyncStorage from '@react-native-async-storage/async-storage';

import GiveawayItem from '@/components/custom/GiveawayItem';
import HighestWorthCarousel from '@/components/custom/HighestWorthCarousel';
import Button from '@/components/custom/Button';
import { ThemedText } from '@/components/ThemedText';

import { useTranslation } from 'react-i18next';
import i18nInstanceSource from '@/components/i18n';

import { API_ENDPOINTS } from '@/constants/api';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';
import { Giveaway } from '@/types';

const LAYOUT_STORAGE_KEY = '@giveaways_layout_variant';

const PLATFORMS = [
  {
    id: 'all',
    labelKey: 'giveaways.platforms.all',
    labelDefault: 'All',
    iconUri: null,
  },
  {
    id: 'pc',
    labelKey: 'giveaways.platforms.pc',
    labelDefault: 'PC',
    iconUri:
      'https://www.svgrepo.com/show/382713/windows-applications.svg',
  },
  {
    id: 'steam',
    labelKey: 'giveaways.platforms.steam',
    labelDefault: 'Steam',
    iconUri: 'https://www.svgrepo.com/show/452107/steam.svg',
  },
  {
    id: 'epic-games-store',
    labelKey: 'giveaways.platforms.epic',
    labelDefault: 'Epic',
    iconUri: 'https://www.cheapshark.com/img/stores/icons/24.png',
  },
  {
    id: 'gog',
    labelKey: 'giveaways.platforms.gog',
    labelDefault: 'GOG',
    iconUri: 'https://www.cheapshark.com/img/stores/icons/6.png',
  },
  {
    id: 'ps4',
    labelKey: 'giveaways.platforms.ps4',
    labelDefault: 'PS4',
    iconUri: 'https://www.svgrepo.com/show/452087/playstation.svg',
  },
  {
    id: 'ps5',
    labelKey: 'giveaways.platforms.ps5',
    labelDefault: 'PS5',
    iconUri: 'https://www.svgrepo.com/show/452087/playstation.svg',
  },
  {
    id: 'xbox-series-xs',
    labelKey: 'giveaways.platforms.xboxSeries',
    labelDefault: 'Xbox Series',
    iconUri: 'https://www.svgrepo.com/show/303368/xbox-9-logo.svg',
  },
  {
    id: 'xbox-one',
    labelKey: 'giveaways.platforms.xboxOne',
    labelDefault: 'Xbox One',
    iconUri: 'https://www.svgrepo.com/show/452137/xbox.svg',
  },
  {
    id: 'switch',
    labelKey: 'giveaways.platforms.switch',
    labelDefault: 'Switch',
    iconUri: 'https://www.svgrepo.com/show/388137/nintendo-switch.svg',
  },
  {
    id: 'android',
    labelKey: 'giveaways.platforms.android',
    labelDefault: 'Android',
    iconUri: 'https://www.svgrepo.com/show/475427/android.svg',
  },
  {
    id: 'ios',
    labelKey: 'giveaways.platforms.ios',
    labelDefault: 'iOS',
    iconUri: 'https://www.svgrepo.com/show/494331/apple-round.svg',
  },
  {
    id: 'drm-free',
    labelKey: 'giveaways.platforms.drmFree',
    labelDefault: 'DRM-Free',
    iconUri: 'https://www.svgrepo.com/show/477064/unlock.svg',
  },
  {
    id: 'itchio',
    labelKey: 'giveaways.platforms.itchio',
    labelDefault: 'itch.io',
    iconUri: 'https://www.svgrepo.com/show/452232/itch-io.svg',
  },
];

const GIVEAWAY_TYPES = [
  {
    id: 'all',
    labelKey: 'giveaways.types.all',
    labelDefault: 'All Types',
    icon: ArchiveAdd,
  },
  {
    id: 'game',
    labelKey: 'giveaways.types.game',
    labelDefault: 'Full Games',
    icon: Game,
  },
  {
    id: 'loot',
    labelKey: 'giveaways.types.loot',
    labelDefault: 'DLC & Loot',
    icon: Gift,
  },
  {
    id: 'beta',
    labelKey: 'giveaways.types.beta',
    labelDefault: 'Beta Access',
    icon: Flash,
  },
];

interface PaginationButtonProps {
  text: string;
  onPress: () => void;
  isDark: boolean;
}

function PaginationButton({
  text,
  onPress,
  isDark,
}: PaginationButtonProps) {
  const dynamicBorderColor = isDark
    ? 'rgba(255, 255, 255, 1)'
    : 'rgba(28, 28, 30, 1)';

  const dynamicTextColor = isDark ? '#ffffff' : '#1c1c1e';

  return (
    <Pressable
      onPress={onPress}
      className="w-full h-12 rounded-full border items-center justify-center active:opacity-60 bg-transparent"
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

function WorthSummarySkeleton({
  isDark,
  cardBgColor,
  adaptiveBorderColor,
}: {
  isDark: boolean;
  cardBgColor: string;
  adaptiveBorderColor: string;
}) {
  const shimmerBg = isDark
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.06)';

  const greenShimmer = isDark
    ? 'rgba(34, 197, 94, 0.25)'
    : 'rgba(34, 197, 94, 0.2)';

  const purpleShimmer = isDark
    ? 'rgba(168, 85, 247, 0.25)'
    : 'rgba(168, 85, 247, 0.2)';

  return (
    <View
      style={{
        backgroundColor: cardBgColor,
        borderWidth: 1,
        borderColor: adaptiveBorderColor,
      }}
      className="rounded-2xl p-4 mb-5 opacity-80"
    >
      <View className="flex-row items-center flex-wrap gap-y-1.5">
        <View
          className="w-16 h-3.5 rounded"
          style={{ backgroundColor: shimmerBg }}
        />
        <View
          className="w-8 h-4 rounded-md mx-1"
          style={{ backgroundColor: greenShimmer }}
        />
        <View
          className="w-36 h-3.5 rounded"
          style={{ backgroundColor: shimmerBg }}
        />
        <View
          className="w-24 h-4 rounded-md mx-1"
          style={{ backgroundColor: purpleShimmer }}
        />
        <View
          className="w-28 h-3.5 rounded"
          style={{ backgroundColor: shimmerBg }}
        />
        <View
          className="w-12 h-4 rounded-md mx-1"
          style={{ backgroundColor: greenShimmer }}
        />
        <View
          className="w-32 h-3.5 rounded"
          style={{ backgroundColor: shimmerBg }}
        />
      </View>
    </View>
  );
}

function CarouselSkeleton({
  isDark,
  cardBgColor,
  adaptiveBorderColor,
}: {
  isDark: boolean;
  cardBgColor: string;
  adaptiveBorderColor: string;
}) {
  const shimmerBg = isDark
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.06)';

  const borderLine = isDark
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(0, 0, 0, 0.04)';

  return (
    <View className="w-full mb-6 opacity-80">
      <View
        style={{
          borderWidth: 1,
          borderColor: adaptiveBorderColor,
          backgroundColor: cardBgColor,
        }}
        className="rounded-2xl overflow-hidden w-full mb-2"
      >
        <View
          style={{ height: 160, backgroundColor: shimmerBg }}
          className="w-full relative justify-between p-3"
        >
          <View className="flex-row justify-between items-center w-full">
            <View
              className="w-24 h-5 rounded-md"
              style={{ backgroundColor: shimmerBg }}
            />

            <View
              className="w-20 h-5 rounded-lg flex-row items-center px-1.5 gap-1"
              style={{
                backgroundColor: isDark
                  ? 'rgba(0, 0, 0, 0.4)'
                  : 'rgba(0, 0, 0, 0.15)',
              }}
            >
              <View
                className="w-3.5 h-3.5 rounded-sm"
                style={{ backgroundColor: shimmerBg }}
              />
              <View
                className="w-11 h-2.5 rounded"
                style={{ backgroundColor: shimmerBg }}
              />
            </View>
          </View>
        </View>

        <View className="p-4">
          <View className="mb-2">
            <View
              className="w-3/4 h-4.5 rounded-md mb-2"
              style={{ backgroundColor: shimmerBg }}
            />
            <View
              className="w-full h-3 rounded mb-1.5"
              style={{ backgroundColor: shimmerBg }}
            />
            <View
              className="w-4/5 h-3 rounded"
              style={{ backgroundColor: shimmerBg }}
            />
          </View>

          <View
            style={{ borderTopWidth: 1, borderColor: borderLine }}
            className="flex-row items-center justify-between pt-3 mt-1"
          >
            <View className="flex-row items-center gap-1.5">
              <View
                className="w-24 h-6 rounded"
                style={{
                  backgroundColor: isDark
                    ? 'rgba(147, 51, 234, 0.35)'
                    : 'rgba(147, 51, 234, 0.25)',
                }}
              />
              <View
                className="w-6 h-6 rounded-full"
                style={{
                  backgroundColor: isDark
                    ? 'rgba(147, 51, 234, 0.35)'
                    : 'rgba(147, 51, 234, 0.25)',
                }}
              />
            </View>

            <View className="flex-row items-center gap-2">
              <View
                className="w-24 h-6 rounded"
                style={{ backgroundColor: shimmerBg }}
              />
            </View>
          </View>
        </View>
      </View>

      <View className="flex-row items-center justify-center mt-2">
        {[0, 1, 2, 3, 4].map((_, dotIndex) => (
          <View
            key={dotIndex}
            style={{
              width: dotIndex === 0 ? 14 : 6,
              height: 6,
              backgroundColor:
                dotIndex === 0
                  ? '#9333ea'
                  : isDark
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'rgba(0, 0, 0, 0.15)',
              borderRadius: 999,
              marginHorizontal: 3,
            }}
          />
        ))}
      </View>
    </View>
  );
}

function CardListSkeleton({
  isDark,
  cardBgColor,
  adaptiveBorderColor,
  variant,
}: {
  isDark: boolean;
  cardBgColor: string;
  adaptiveBorderColor: string;
  variant: 'normal' | 'compact';
}) {
  const shimmerBg = isDark
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.06)';

  const borderLine = isDark
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(0, 0, 0, 0.04)';

  const buttons = isDark
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(0, 0, 0, 0.06)';

  const mockItems = [1, 2, 3, 4, 5];

  return (
    <View className="w-full">
      {mockItems.map((item) => (
        <View
          key={item}
          style={{
            borderWidth: 1,
            borderColor: adaptiveBorderColor,
            backgroundColor: cardBgColor,
          }}
          className="rounded-2xl overflow-hidden w-full mb-4 opacity-80"
        >
          {variant === 'normal' ? (
            <View>
              <View
                style={{ height: 150, backgroundColor: shimmerBg }}
                className="w-full relative justify-between p-3"
              >
                <View className="flex-row justify-between items-center w-full">
                  <View
                    className="w-16 h-5 rounded-md"
                    style={{
                      backgroundColor: isDark
                        ? 'rgba(255, 255, 255, 0.12)'
                        : 'rgba(0, 0, 0, 0.08)',
                    }}
                  />

                  <View
                    className="w-20 h-6 rounded-xl items-center justify-center"
                    style={{
                      backgroundColor: isDark
                        ? 'rgba(168, 85, 247, 0.25)'
                        : 'rgba(168, 85, 247, 0.2)',
                    }}
                  />
                </View>
              </View>

              <View className="p-4">
                <View
                  className="w-3/4 h-4.5 rounded-md mb-2"
                  style={{ backgroundColor: shimmerBg }}
                />
                <View
                  className="w-full h-3 rounded mb-1.5"
                  style={{ backgroundColor: shimmerBg }}
                />
                <View
                  className="w-1/2 h-3 rounded mb-3"
                  style={{ backgroundColor: shimmerBg }}
                />

                <View
                  style={{ borderTopWidth: 1, borderColor: borderLine }}
                  className="flex-row items-center justify-between pt-3 mt-1"
                >
                  <View className="flex-row gap-2">
                    <View
                      className="w-24 h-6 rounded-md"
                      style={{
                        backgroundColor: isDark
                          ? 'rgba(168, 85, 247, 0.25)'
                          : 'rgba(168, 85, 247, 0.2)',
                      }}
                    />
                    <View
                      className="w-6 h-6 rounded-md"
                      style={{
                        backgroundColor: isDark
                          ? 'rgba(168, 85, 247, 0.25)'
                          : 'rgba(168, 85, 247, 0.2)',
                      }}
                    />
                  </View>

                  <View className="flex-row gap-2">
                    <View
                      className="w-6 h-6 rounded-md"
                      style={{ backgroundColor: shimmerBg }}
                    />
                    <View
                      className="w-6 h-6 rounded-md"
                      style={{ backgroundColor: shimmerBg }}
                    />
                    <View
                      className="w-6 h-6 rounded-md"
                      style={{ backgroundColor: shimmerBg }}
                    />
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View className="p-3 flex-row items-center">
              <View
                style={{
                  width: 84,
                  height: 84,
                  backgroundColor: shimmerBg,
                }}
                className="rounded-xl shrink-0 mr-3 relative justify-between p-1.5"
              >
                <View
                  className="w-5 h-5 rounded-lg"
                  style={{
                    backgroundColor: isDark
                      ? 'rgba(0,0,0,0.5)'
                      : 'rgba(255,255,255,0.7)',
                  }}
                />

                <View
                  className="w-14 h-3 rounded-sm"
                  style={{
                    backgroundColor: isDark
                      ? 'rgba(168, 85, 247, 0.25)'
                      : 'rgba(168, 85, 247, 0.2)',
                  }}
                />
              </View>

              <View className="flex-1 justify-between h-20 py-0.5">
                <View>
                  <View
                    className="w-5/6 h-4 rounded mb-2"
                    style={{ backgroundColor: shimmerBg }}
                  />

                  <View
                    className="w-2/5 h-3 rounded-md"
                    style={{ backgroundColor: shimmerBg }}
                  />
                </View>

                <View className="flex-row items-center justify-between mt-auto">
                  <View
                    className="w-16 h-3 rounded"
                    style={{ backgroundColor: shimmerBg }}
                  />

                  <View className="flex-row items-center gap-2">
                    <View
                      className="w-7 h-7 rounded-lg items-center justify-center"
                      style={{ backgroundColor: buttons }}
                    />
                    <View
                      className="w-7 h-7 rounded-lg items-center justify-center"
                      style={{ backgroundColor: buttons }}
                    />
                    <View
                      className="w-7 h-7 rounded-lg items-center justify-center"
                      style={{ backgroundColor: buttons }}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

export default function GiveawayScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const searchInputRef = useRef<TextInput>(null);

  // Prevent stale requests from updating the UI.
  const requestIdRef = useRef(0);

  // Abort the previous network request when a new one starts.
  const abortControllerRef = useRef<AbortController | null>(null);

  const { t } = useTranslation(undefined, {
    i18n: i18nInstanceSource,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [giveaways, setGiveaways] = useState<Giveaway[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const [prices, setPrices] = useState(0);
  const [worth, setWorth] = useState(0);

  // Filters & Search
  const [selectedPlatform, setSelectedPlatform] =
    useState<string>('all');

  const [selectedType, setSelectedType] =
    useState<string>('all');

  const [sortBy, setSortBy] =
    useState<string>('date');

  const [showFilterBar, setShowFilterBar] =
    useState(false);

  const [showSearchBar, setShowSearchBar] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState('');

  const [layoutVariant, setLayoutVariant] =
    useState<'normal' | 'compact'>('compact');

  const backgroundColor = useThemeColor({}, 'background');

  const { themeMode, toggleTheme } = useCustomTheme();

  const isDark = themeMode === 'dark';

  const cardBgColor = isDark
    ? '#2c2c35'
    : '#f1f2f6';

  const adaptiveBorderColor = isDark
    ? '#3a3a45'
    : '#e4e4e7';

  /*
   * Normalize the search query once.
   *
   * This avoids repeatedly doing trim() + toLowerCase()
   * for every giveaway during the filtering pass.
   */
  const normalizedSearchQuery = useMemo(
    () => searchQuery.trim().toLowerCase(),
    [searchQuery]
  );

  /*
   * Client-side search filtering.
   */
  const filteredGiveaways = useMemo(() => {
    if (!normalizedSearchQuery) {
      return giveaways;
    }

    return giveaways.filter((item) =>
      item.title
        .toLowerCase()
        .includes(normalizedSearchQuery)
    );
  }, [giveaways, normalizedSearchQuery]);

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const endIndex =
    startIndex + itemsPerPage;

  const currentPagedGiveaways =
    filteredGiveaways.slice(
      startIndex,
      endIndex
    );

  /*
   * Load the user's preferred card layout once.
   */
  useEffect(() => {
    let isMounted = true;

    const loadSavedLayout = async () => {
      try {
        const savedLayout =
          await AsyncStorage.getItem(
            LAYOUT_STORAGE_KEY
          );

        if (
          isMounted &&
          (savedLayout === 'normal' ||
            savedLayout === 'compact')
        ) {
          setLayoutVariant(savedLayout);
        }
      } catch (error) {
        console.error(
          'Failed to load layout variant:',
          error
        );
      }
    };

    loadSavedLayout();

    return () => {
      isMounted = false;
    };
  }, []);

  /*
   * Worth estimation is independent from the giveaway list.
   *
   * This means a failure from the worth endpoint cannot
   * accidentally make the entire giveaway screen an error.
   */
  const checkWorth = useCallback(
    async (signal?: AbortSignal) => {
      try {
        const worthResponse = await fetch(
          API_ENDPOINTS.Worth,
          { signal }
        );

        if (!worthResponse.ok) {
          throw new Error(
            'Worth endpoint returned an invalid status'
          );
        }

        const worthRes =
          await worthResponse.json();

        setPrices(
          Number(
            worthRes?.active_giveaways_number ?? 0
          )
        );

        setWorth(
          Number(
            worthRes?.worth_estimation_usd ?? 0
          )
        );
      } catch (error: any) {
        /*
         * AbortError is expected when filters change
         * or the screen unmounts, so don't log it.
         */
        if (error?.name !== 'AbortError') {
          console.error(
            "Couldn't fetch worth estimation:",
            error
          );
        }
      }
    },
    []
  );

  /*
   * Main giveaway request.
   *
   * Tier 1 improvements:
   * - cancels the previous request
   * - prevents stale requests from overwriting newer data
   * - only requests worth data when it is actually needed
   * - keeps worth failures separate from giveaway failures
   */
  const fetchData = useCallback(
    async (
      platform: string = 'all',
      type: string = 'all',
      sort: string = 'date'
    ) => {
      /*
       * Invalidate the previous request.
       */
      requestIdRef.current += 1;

      const requestId =
        requestIdRef.current;

      /*
       * Abort any request still running.
       */
      abortControllerRef.current?.abort();

      const controller =
        new AbortController();

      abortControllerRef.current =
        controller;

      setIsLoading(true);
      setHasError(false);

      try {
        const queryParams: string[] = [];

        if (platform !== 'all') {
          queryParams.push(
            `platform=${encodeURIComponent(platform)}`
          );
        }

        if (type !== 'all') {
          queryParams.push(
            `type=${encodeURIComponent(type)}`
          );
        }

        if (sort !== 'date') {
          queryParams.push(
            `sort-by=${encodeURIComponent(sort)}`
          );
        }

        const queryString =
          queryParams.length > 0
            ? `?${queryParams.join('&')}`
            : '';

        const url =
          `${API_ENDPOINTS.Giveaways}${queryString}`;

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            'Server returned invalid status payload'
          );
        }

        const finalData =
          await response.json();

        /*
         * If a newer request started while this one
         * was running, ignore this result completely.
         */
        if (
          requestId !== requestIdRef.current
        ) {
          return;
        }

        setGiveaways(
          Array.isArray(finalData)
            ? finalData
            : []
        );

        /*
         * The worth summary is only rendered when
         * all filters are at their default values.
         *
         * Don't spend a network request on it when
         * the user is viewing a filtered list.
         */
        if (
          platform === 'all' &&
          type === 'all'
        ) {
          await checkWorth(
            controller.signal
          );
        }
      } catch (error: any) {
        /*
         * Ignore intentional request cancellation.
         */
        if (
          error?.name === 'AbortError'
        ) {
          return;
        }

        /*
         * Ignore stale requests.
         */
        if (
          requestId !== requestIdRef.current
        ) {
          return;
        }

        console.error(
          'Error fetching giveaways:',
          error
        );

        setHasError(true);
      } finally {
        /*
         * Only the latest request is allowed
         * to change the loading state.
         */
        if (
          requestId === requestIdRef.current
        ) {
          setIsLoading(false);
        }
      }
    },
    [checkWorth]
  );

  /*
   * Fetch giveaways whenever server-side filters change.
   *
   * The 300ms delay is preserved to prevent rapid
   * filter taps from producing a burst of requests.
   */
  useEffect(() => {
    const handler = setTimeout(() => {
      setCurrentPage(1);

      fetchData(
        selectedPlatform,
        selectedType,
        sortBy
      );
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [
    selectedPlatform,
    selectedType,
    sortBy,
    fetchData,
  ]);

  /*
   * Abort network activity when leaving the screen.
   */
  useEffect(() => {
    return () => {
      requestIdRef.current += 1;
      abortControllerRef.current?.abort();
    };
  }, []);

  /*
   * Keep pagination valid when search results shrink.
   *
   * Example:
   * Page 4 contains results, then the user searches
   * for a game with only 2 pages. Without this clamp,
   * the screen could show an empty page.
   */
  useEffect(() => {
    const totalPages = Math.max(
      1,
      Math.ceil(
        filteredGiveaways.length /
          itemsPerPage
      )
    );

    setCurrentPage((previousPage) =>
      Math.min(
        previousPage,
        totalPages
      )
    );
  }, [filteredGiveaways.length]);

  /*
   * Reset pagination whenever the search text changes.
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [normalizedSearchQuery]);

  const handlePlatformChange = (
    platformId: string
  ) => {
    setCurrentPage(1);
    setSelectedPlatform(platformId);
  };

  const handleTypeChange = (
    typeId: string
  ) => {
    setCurrentPage(1);
    setSelectedType(typeId);
  };

  const handleNextPage = () => {
    /*
     * Guard against moving beyond the final page.
     */
    if (
      endIndex >=
      filteredGiveaways.length
    ) {
      return;
    }

    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );

    setCurrentPage(
      (previousPage) =>
        previousPage + 1
    );

    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const handlePrevPage = () => {
    if (currentPage <= 1) {
      return;
    }

    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );

    setCurrentPage(
      (previousPage) =>
        Math.max(
          previousPage - 1,
          1
        )
    );

    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const handleLayoutVariantToggle =
    async () => {
      LayoutAnimation.configureNext(
        LayoutAnimation.Presets.easeInEaseOut
      );

      const nextVariant:
        | 'normal'
        | 'compact' =
        layoutVariant === 'normal'
          ? 'compact'
          : 'normal';

      setLayoutVariant(nextVariant);

      try {
        await AsyncStorage.setItem(
          LAYOUT_STORAGE_KEY,
          nextVariant
        );
      } catch (error) {
        console.error(
          'Failed to save layout variant:',
          error
        );
      }
    };

  const handleFilterBarToggle = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );

    setShowFilterBar(
      (previous) => !previous
    );
  };

  const handleSearchBarToggle = () => {
    LayoutAnimation.configureNext(
      LayoutAnimation.Presets.easeInEaseOut
    );

    const nextState =
      !showSearchBar;

    setShowSearchBar(nextState);

    if (!nextState) {
      setSearchQuery('');
    } else {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  const now = new Date();

  const day = now.getDate();
  const year = now.getFullYear();

  const monthKeys = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ];

  const monthDefaults = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentMonthIndex =
    now.getMonth();

  const localizedMonth = t(
    `months.${monthKeys[currentMonthIndex]}`,
    monthDefaults[currentMonthIndex]
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
      }}
    >
      <ScrollView
        ref={scrollRef}
        className="flex-1 px-4 pt-10"
        style={{ backgroundColor }}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* --- BRAND HEADER ROW --- */}
        <View className="flex-row items-center justify-between w-full mb-4">
          <Pressable className="flex-row items-center gap-2 flex-1 pr-2 active:opacity-90">
            <View
              style={{
                backgroundColor: '#9333ea',
              }}
              className="w-9 h-9 rounded-xl overflow-hidden items-center justify-center shadow-sm shrink-0"
            >
              <Image
                source={require('../../assets/images/FRAPP_ICON1.png')}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                contentFit="cover"
              />
            </View>

            <ThemedText
              numberOfLines={1}
              className="text-lg font-montBlack tracking-tight flex-shrink"
            >
              {t(
                'giveaways.title',
                'Giveaways.'
              )}
            </ThemedText>
          </Pressable>

          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={
                handleSearchBarToggle
              }
              style={{
                backgroundColor:
                  showSearchBar
                    ? '#9333ea'
                    : isDark
                      ? '#27272a'
                      : '#f4f4f5',
              }}
              className="w-9 h-9 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0"
            >
              <SearchNormal
                size="18"
                color={
                  showSearchBar
                    ? '#ffffff'
                    : isDark
                      ? '#f4f4f5'
                      : '#3f3f46'
                }
                variant="Broken"
              />
            </Pressable>

            <Pressable
              onPress={
                handleLayoutVariantToggle
              }
              style={{
                backgroundColor: isDark
                  ? '#27272a'
                  : '#f4f4f5',
              }}
              className="w-9 h-9 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0"
            >
              {layoutVariant ===
              'normal' ? (
                <Element3
                  size="18"
                  color="#9333ea"
                  variant="Broken"
                />
              ) : (
                <RowVertical
                  size="18"
                  color="#9333ea"
                  variant="Broken"
                />
              )}
            </Pressable>

            <Pressable
              onPress={
                handleFilterBarToggle
              }
              style={{
                backgroundColor:
                  showFilterBar ||
                  selectedType !==
                    'all'
                    ? '#9333ea'
                    : isDark
                      ? '#27272a'
                      : '#f4f4f5',
              }}
              className="w-9 h-9 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0"
            >
              <Filter
                size="18"
                color={
                  showFilterBar ||
                  selectedType !==
                    'all'
                    ? '#ffffff'
                    : isDark
                      ? '#f4f4f5'
                      : '#3f3f46'
                }
                variant="Broken"
              />
            </Pressable>

            <Pressable
              onPress={toggleTheme}
              style={{
                backgroundColor: isDark
                  ? '#27272a'
                  : '#f4f4f5',
              }}
              className="w-9 h-9 rounded-full items-center justify-center active:opacity-70 shadow-sm shrink-0"
            >
              {isDark ? (
                <Sun1
                  size="18"
                  color="#f4f4f5"
                  variant="Broken"
                />
              ) : (
                <Moon
                  size="18"
                  color="#3f3f46"
                  variant="Broken"
                />
              )}
            </Pressable>
          </View>
        </View>

        {/* --- SEARCH INPUT BAR --- */}
        {showSearchBar && (
          <View className="w-full mb-4">
            <View
              style={{
                backgroundColor:
                  cardBgColor,
                borderWidth: 1,
                borderColor:
                  adaptiveBorderColor,
              }}
              className="flex-row items-center px-3.5 h-12 rounded-2xl shadow-sm"
            >
              <SearchNormal
                size="18"
                color={
                  isDark
                    ? '#a3a3b5'
                    : '#71717a'
                }
                variant="Broken"
              />

              <TextInput
                ref={searchInputRef}
                value={searchQuery}
                onChangeText={
                  setSearchQuery
                }
                placeholder={t(
                  'giveaways.search.placeholder',
                  'Search active giveaways...'
                )}
                placeholderTextColor={
                  isDark
                    ? '#71717a'
                    : '#a1a1aa'
                }
                style={{
                  color: isDark
                    ? '#ffffff'
                    : '#1c1c1e',
                }}
                className="flex-1 ml-2.5 mr-1 font-mont text-sm h-full"
                returnKeyType="search"
                autoCapitalize="none"
                autoCorrect={false}
              />

              {searchQuery.length >
                0 && (
                <Pressable
                  onPress={() =>
                    setSearchQuery('')
                  }
                  className="p-1 active:opacity-60"
                >
                  <CloseCircle
                    size="18"
                    color={
                      isDark
                        ? '#a3a3b5'
                        : '#71717a'
                    }
                    variant="Bold"
                  />
                </Pressable>
              )}
            </View>
          </View>
        )}

        {/* --- DYNAMIC FILTER BAR --- */}
        {showFilterBar && (
          <View className="w-full mb-5 space-y-2">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={
                false
              }
              className="-mx-4 py-1"
              style={{ height: 44 }}
              contentContainerStyle={{
                alignItems: 'center',
                gap: 8,
                paddingHorizontal: 16,
              }}
            >
              {GIVEAWAY_TYPES.map(
                (type) => {
                  const isSelected =
                    selectedType ===
                    type.id;

                  const IconComponent =
                    type.icon;

                  return (
                    <Pressable
                      key={type.id}
                      onPress={() =>
                        handleTypeChange(
                          type.id
                        )
                      }
                      style={{
                        backgroundColor:
                          isSelected
                            ? '#22c55e'
                            : isDark
                              ? '#27272a'
                              : '#f4f4f5',
                        borderWidth: 1,
                        borderColor:
                          isSelected
                            ? '#22c55e'
                            : isDark
                              ? '#3c3c3a'
                              : '#e4e4e7',
                        height: 34,
                      }}
                      className="px-3 rounded-full flex-row items-center gap-1.5 shadow-sm"
                    >
                      <IconComponent
                        size="13"
                        color={
                          isSelected
                            ? '#ffffff'
                            : isDark
                              ? '#a3a3b5'
                              : '#71717a'
                        }
                        variant="Bold"
                      />

                      <ThemedText
                        style={{
                          color:
                            isSelected
                              ? '#ffffff'
                              : isDark
                                ? '#a3a3b5'
                                : '#71717a',
                        }}
                        className={`text-xs ${
                          isSelected
                            ? 'font-montBlack'
                            : 'font-montBold'
                        }`}
                      >
                        {t(
                          type.labelKey,
                          type.labelDefault
                        )}
                      </ThemedText>
                    </Pressable>
                  );
                }
              )}
            </ScrollView>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={
                false
              }
              className="-mx-4 py-1"
              style={{ height: 44 }}
              contentContainerStyle={{
                alignItems: 'center',
                gap: 8,
                paddingHorizontal: 16,
              }}
            >
              {PLATFORMS.map(
                (platform) => {
                  const isSelected =
                    selectedPlatform ===
                    platform.id;

                  return (
                    <Pressable
                      key={platform.id}
                      onPress={() =>
                        handlePlatformChange(
                          platform.id
                        )
                      }
                      style={{
                        backgroundColor:
                          isSelected
                            ? '#9333ea'
                            : isDark
                              ? '#27272a'
                              : '#f4f4f5',
                        borderWidth: 1,
                        borderColor:
                          isSelected
                            ? '#9333ea'
                            : isDark
                              ? '#3c3c3a'
                              : '#e4e4e7',
                        height: 34,
                      }}
                      className="px-3.5 rounded-full flex-row items-center gap-1.5 shadow-sm"
                    >
                      {platform.iconUri ? (
                        <Image
                          source={{
                            uri: platform.iconUri,
                          }}
                          style={{
                            width: 14,
                            height: 14,
                          }}
                          contentFit="contain"
                        />
                      ) : (
                        <Shop
                          size="13"
                          color={
                            isSelected
                              ? '#ffffff'
                              : isDark
                                ? '#a3a3b5'
                                : '#71717a'
                          }
                          variant="Bold"
                        />
                      )}

                      <ThemedText
                        style={{
                          color:
                            isSelected
                              ? '#ffffff'
                              : isDark
                                ? '#a3a3b5'
                                : '#71717a',
                        }}
                        className={`text-xs ${
                          isSelected
                            ? 'font-montBlack'
                            : 'font-montBold'
                        }`}
                      >
                        {t(
                          platform.labelKey,
                          platform.labelDefault
                        )}
                      </ThemedText>
                    </Pressable>
                  );
                }
              )}
            </ScrollView>
          </View>
        )}

        {/* --- CAROUSEL OR SKELETON LOADER SECTION --- */}
        {isLoading ? (
          selectedPlatform ===
            'all' &&
          selectedType === 'all' &&
          !searchQuery && (
            <View className="w-full">
              <WorthSummarySkeleton
                isDark={isDark}
                cardBgColor={
                  cardBgColor
                }
                adaptiveBorderColor={
                  adaptiveBorderColor
                }
              />

              <CarouselSkeleton
                isDark={isDark}
                cardBgColor={
                  cardBgColor
                }
                adaptiveBorderColor={
                  adaptiveBorderColor
                }
              />
            </View>
          )
        ) : (
          !hasError &&
          giveaways.length > 0 &&
          selectedPlatform === 'all' &&
          selectedType === 'all' &&
          !searchQuery && (
            <>
              <View
                style={[
                  {
                    backgroundColor:
                      cardBgColor,
                    borderWidth: 1,
                    borderColor:
                      adaptiveBorderColor,
                  },
                  Platform.select({
                    ios: {
                      shadowColor:
                        '#000000',
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity:
                        0.06,
                      shadowRadius: 8,
                    },
                    android: {
                      elevation: 2,
                    },
                  }),
                ]}
                className="rounded-2xl p-4 mb-5"
              >
                <ThemedText className="font-mont text-xs leading-relaxed opacity-90">
                  {t(
                    'giveaways.summary.prefix',
                    'We found '
                  )}

                  <ThemedText
                    style={{
                      color: '#22c55e',
                    }}
                    className="font-montBlack"
                  >
                    {prices}
                  </ThemedText>

                  {t(
                    'giveaways.summary.midActive',
                    ' active game giveaways as of '
                  )}

                  <ThemedText
                    style={{
                      color: '#a855f7',
                    }}
                    className="font-montBlack"
                  >
                    {day} {localizedMonth}{' '}
                    {year}
                  </ThemedText>

                  {t(
                    'giveaways.summary.midWorth',
                    ', valued at a total of '
                  )}

                  <ThemedText
                    style={{
                      color: '#22c55e',
                    }}
                    className="font-montBlack"
                  >
                    ${worth}
                  </ThemedText>

                  {t(
                    'giveaways.summary.suffix',
                    '. Claim them before they expire!'
                  )}
                </ThemedText>
              </View>

              <HighestWorthCarousel />
            </>
          )
        )}

        {/* --- PRIMARY CONDITIONAL CONTENT AREA --- */}
        {hasError ? (
          <View
            style={[
              {
                backgroundColor:
                  cardBgColor,
                borderWidth: 1,
                borderColor:
                  adaptiveBorderColor,
              },
              Platform.select({
                ios: {
                  shadowColor:
                    '#000000',
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },
                  shadowOpacity:
                    isDark ? 0.3 : 0.08,
                  shadowRadius: 12,
                },
                android: {
                  elevation: 4,
                },
              }),
            ]}
            className="rounded-3xl p-6 items-center justify-center my-6"
          >
            <View className="w-16 h-16 rounded-2xl bg-purple-600/10 dark:bg-purple-500/10 items-center justify-center mb-4">
              <WifiSquare
                size="36"
                color="#9333ea"
                variant="Broken"
              />
            </View>

            <ThemedText className="font-montBlack text-lg text-center mb-2 tracking-tight">
              {t(
                'giveaways.error.title',
                'Connection Disrupted'
              )}
            </ThemedText>

            <ThemedText className="font-mont text-zinc-500 dark:text-zinc-400 text-sm text-center leading-relaxed mb-6 px-4">
              {t(
                'giveaways.error.description',
                'We are unable to sync up with upstream lookup pipelines right now. Check your internet access and try again.'
              )}
            </ThemedText>

            <Button
              type="primary"
              loading={isLoading}
              onPress={() =>
                fetchData(
                  selectedPlatform,
                  selectedType,
                  sortBy
                )
              }
              className="w-full"
              text={t(
                'giveaways.error.retryButton',
                'Retry Connection'
              )}
            />
          </View>
        ) : isLoading ? (
          <CardListSkeleton
            variant={layoutVariant}
            cardBgColor={cardBgColor}
            adaptiveBorderColor={
              adaptiveBorderColor
            }
            isDark={isDark}
          />
        ) : filteredGiveaways.length ===
          0 ? (
          <View
            style={[
              {
                backgroundColor:
                  cardBgColor,
                borderWidth: 1,
                borderColor:
                  adaptiveBorderColor,
              },
              Platform.select({
                ios: {
                  shadowColor:
                    '#000000',
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },
                  shadowOpacity:
                    isDark ? 0.3 : 0.08,
                  shadowRadius: 12,
                },
                android: {
                  elevation: 4,
                },
              }),
            ]}
            className="rounded-3xl p-6 items-center justify-center my-6"
          >
            <View className="w-16 h-16 rounded-2xl bg-purple-600/10 dark:bg-purple-500/10 items-center justify-center mb-4">
              <Element3
                size="36"
                color="#9333ea"
                variant="Broken"
              />
            </View>

            <ThemedText className="font-montBlack text-lg text-center mb-2 tracking-tight">
              {t(
                'giveaways.empty.title',
                'No Giveaways Found'
              )}
            </ThemedText>

            <ThemedText className="font-mont text-zinc-500 dark:text-zinc-400 text-sm text-center leading-relaxed mb-6 px-4">
              {t(
                'giveaways.empty.description',
                searchQuery
                  ? `No giveaways matching "${searchQuery}" were found.`
                  : 'There are no active giveaways available under this filter combination right now.'
              )}
            </ThemedText>

            <Button
              type="primary"
              onPress={() => {
                setSearchQuery('');
                setSelectedType('all');
                handlePlatformChange(
                  'all'
                );
              }}
              className="w-full"
              text={t(
                'giveaways.empty.viewAllButton',
                'Reset Filters'
              )}
            />
          </View>
        ) : (
          <View className="w-full">
            {currentPagedGiveaways.map(
              (giveaway) => (
                <GiveawayItem
                  key={giveaway.id}
                  giveaway={giveaway}
                  variant={
                    layoutVariant
                  }
                />
              )
            )}
          </View>
        )}

        {/* --- BALANCED PAGINATION FOOTER TOOLBAR --- */}
        {!isLoading &&
          !hasError &&
          filteredGiveaways.length >
            itemsPerPage && (
            <View className="mt-4 w-full mb-24">
              {currentPage === 1 ? (
                endIndex <
                  filteredGiveaways.length && (
                  <PaginationButton
                    text={t(
                      'giveaways.pagination.next',
                      'Next Page'
                    )}
                    onPress={
                      handleNextPage
                    }
                    isDark={isDark}
                  />
                )
              ) : (
                <View className="flex-row items-center gap-3 w-full">
                  <View className="flex-1">
                    <PaginationButton
                      text={t(
                        'giveaways.pagination.previous',
                        'Previous'
                      )}
                      onPress={
                        handlePrevPage
                      }
                      isDark={isDark}
                    />
                  </View>

                  {endIndex <
                    filteredGiveaways.length && (
                    <View className="flex-1">
                      <PaginationButton
                        text={t(
                          'giveaways.pagination.next',
                          'Next Page'
                        )}
                        onPress={
                          handleNextPage
                        }
                        isDark={isDark}
                      />
                    </View>
                  )}
                </View>
              )}
            </View>
          )}
      </ScrollView>
    </View>
  );
}

