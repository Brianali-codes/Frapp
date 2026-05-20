import { cn } from '@/lib/utils'
import React, { useEffect, useRef } from 'react'
import { Animated, Easing, ViewStyle, StyleProp } from 'react-native'

interface SkeletonProps {
    style?: StyleProp<ViewStyle>,
    className?: string,
    color?: string
}

export const Skeleton = ({ style, className = "", color }: SkeletonProps) => {
    const shimmer = useRef(new Animated.Value(0)).current

    useEffect(() => {
        const animation = Animated.loop(
            Animated.timing(shimmer, {
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        )
        animation.start()
        return () => animation.stop()
    }, [shimmer])

    const shimmerTranslate = shimmer.interpolate({
        inputRange: [0, 1],
        outputRange: [-150, 150],
    })

    return (
        <Animated.View
            // We use a template string to guarantee only strings are passed to cn()
            className={cn(
                "overflow-hidden rounded-md relative", 
                !color ? "bg-zinc-300 dark:bg-zinc-700" : "", 
                className
            )}
            style={[
                color ? { backgroundColor: color } : {}, 
                style
            ]}
        >
            <Animated.View
                // w-[200%] ensures the shimmer is wider than the parent container
                className="absolute top-0 left-0 h-full w-[200%] bg-white opacity-20"
                style={{
                    transform: [{ translateX: shimmerTranslate }],
                }}
            />
        </Animated.View>
    )
}