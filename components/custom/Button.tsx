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
    return (
        <Pressable
            style={[style]}
            onPress={onPress}
            disabled={loading || disabled}
            className={cn(
                'rounded-lg justify-center items-center h-[43px]',
                (type === 'primary') ? 'bg-purple-600' : null,
                (type === 'muted') ? 'bg-background border-border border' : null,
                (type === 'dark') ? 'bg-black border-black border' : null,
                (type === 'outline') ? 'bg-black border-white border' : null,
                className
            )}
            {...rest}>
            {text ? (
                <ThemedText
                    style={textStyle}
                    className={cn(
                        "font-medium",
                        ['outline', 'muted'].includes(type) ? 'text-black' : 'text-white'
                    )}>
                    {loading ? 'Loading...' : text}
                </ThemedText>
            ) : (
                children
            )}
        </Pressable>
    );
}
