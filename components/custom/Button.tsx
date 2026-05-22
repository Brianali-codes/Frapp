import { cn } from '@/lib/utils';
import React from 'react';
import {
    ActivityIndicator,
    Pressable,
    PressableProps,
    StyleProp,
    TextStyle,
    ViewStyle,
    Platform
} from 'react-native';
import { ThemedText } from '../ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useCustomTheme } from '@/context/ThemeContext';

interface ButtonProps extends PressableProps {
    text?: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    loading?: boolean;
    type?: 'primary' | 'destructive' | 'outline' | 'muted' | 'dark';
}

export default function Button(props: ButtonProps) {
    const {
        loading = false,
        disabled = false,
        type = "primary",
        text = '',
        children,
        style = {},
        textStyle,
        className,
        onPress = () => { },
        ...rest
    } = props;

    const textColor = useThemeColor({}, 'text');
    const { themeMode } = useCustomTheme();

    const isDark = themeMode === 'dark';

    // Exact color layering architecture from your giveaway/report cards
    const cardBgColor = isDark ? '#2c2c35' : '#f1f2f6';
    const shadowColor = isDark ? '#000000' : 'rgba(147, 51, 234, 0.15)';
    const borderColor = isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.07)';

    return (
        <Pressable
            onPress={onPress}
            disabled={loading || disabled}
            className={cn(
                // Maxed out rounding profiles for a smooth fluid pill shape
                'rounded-full justify-center items-center h-[48px] px-6 flex-row gap-2.5',

                // Primary accents stay vibrant brand tones
                (type === 'primary') ? 'bg-purple-600 dark:bg-purple-700' : null,
                (type === 'destructive') ? 'bg-red-500 dark:bg-red-600' : null,

                // Muted & Dark variants now share your perfectly balanced floating card depths
                (type === 'muted' || type === 'dark') ? 'border' : null,
                (type === 'outline') ? 'bg-transparent border-2' : null,

                // Lock down interaction opacities safely
                (disabled || loading) ? 'opacity-50' : null,
                className
            )}
            style={({ pressed }) => [
                style as ViewStyle,

                // Dynamic inline style injection to precisely target the card layering color spaces
                (type === 'muted' || type === 'dark') && {
                    backgroundColor: cardBgColor,
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.07)'
                },
                type === 'outline' && { borderColor: textColor },

                // Micro haptic scale feedback curves
                !disabled && !loading && Platform.select({
                    ios: {
                        transform: [{ scale: pressed ? 0.96 : 1 }],
                        shadowColor: type === 'primary' ? shadowColor : '#000000',
                        shadowOffset: { width: 0, height: pressed ? 1 : 4 },
                        shadowOpacity: isDark ? 0.25 : 0.08,
                        shadowRadius: pressed ? 3 : 8,
                    },
                    android: {
                        transform: [{ scale: pressed ? 0.96 : 1 }],
                        elevation: pressed ? 1 : 3,
                    }
                })
            ]}
            {...rest}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={type === 'primary' || type === 'destructive' ? '#ffffff' : textColor}
                />
            ) : text ? (
                <ThemedText
                    className={cn(
                        // REPLACE 'font-extrabold' with your custom Montserrat class
                        "font-montBlack text-sm tracking-tight",
                        type === 'primary' || type === 'destructive' ? 'text-white' : null,
                        type === 'dark' ? 'text-zinc-900 dark:text-zinc-100' : null,
                        type === 'muted' ? 'text-zinc-500 dark:text-zinc-400' : null
                    )}
                    style={[
                        textStyle,
                        type === 'outline' && { color: textColor }
                    ]}
                >
                    {text}
                </ThemedText>
            ) : (
                children
            )}
        </Pressable>
    );
}