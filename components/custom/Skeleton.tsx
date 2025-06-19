import { cn } from '@/lib/utils'
import React, { useEffect, useRef } from 'react'
import { Animated, Easing, ViewStyle } from 'react-native'

interface SkeletonProps {
    style?: ViewStyle,
    className?: string
}

export const Skeleton = ({ style, className = "" }: SkeletonProps) => {
    const shimmer = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.loop(
            Animated.timing(shimmer, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start()
    }, [shimmer])

    const shimmerTranslate = shimmer.interpolate({
        inputRange: [0, 1],
        outputRange: [-100, 100], // adjust for shimmer size
    })

    return (
        <Animated.View
            className={cn("bg-gray-600 overflow-hidden rounded-md", className)}
            style={[style]}
        >
            <Animated.View
                className="absolute top-0 left-0 h-full w-full bg-gray-600 opacity-10"
                style={{
                    transform: [{ translateX: shimmerTranslate }],
                }}
            />
        </Animated.View>
    )
}
