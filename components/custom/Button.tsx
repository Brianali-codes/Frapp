import { cn } from '@/lib/utils';
import React from 'react';
import {
    Pressable,
    PressableProps,
    StyleProp,
    TextStyle,
    ViewStyle
} from 'react-native';
import { ThemedText } from '../ThemedText';

// 1. Import your custom theme hook
import { useThemeColor } from '@/hooks/useThemeColor';

interface ButtonProps extends PressableProps {
    text?: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    loading?: boolean;
    type?: 'primary' | 'destructive' | 'outline' | 'muted' | 'dark'
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

    // 2. Fetch primary text and background colors to make variants dynamic
    const textColor = useThemeColor({}, 'text');

    return (
        <Pressable
            onPress={onPress}
            disabled={loading || disabled}
            className={cn(
                'rounded-lg justify-center items-center h-[43px]',
                (type === 'primary') ? 'bg-purple-600' : null,
                (type === 'muted') ? 'bg-background border-border border' : null,
                (type === 'dark') ? 'bg-zinc-900 dark:bg-black' : null, 
                (type === 'outline') ? 'bg-transparent border' : null,
                className
            )}
            // 3. Merged into a single style attribute accepting a state callback function
            style={({ pressed }) => [
                style as ViewStyle, 
                type === 'outline' && { borderColor: textColor },
                pressed && { opacity: 0.7 } 
            ]}
            {...rest}
        >
            {text ? (
                <ThemedText
                    className={cn(
                        "font-medium",
                        type === 'primary' || type === 'dark' ? 'text-white' : null,
                        type === 'muted' ? 'text-zinc-500' : null
                    )}
                    // 4. Merged text styles into a single style array attribute
                    style={[
                        textStyle,
                        type === 'outline' && { color: textColor }
                    ]}
                >
                    {loading ? 'Loading...' : text}
                </ThemedText>
            ) : (
                children
            )}
        </Pressable>
    );
}