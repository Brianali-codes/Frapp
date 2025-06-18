import React, { ReactNode } from 'react'
import { View } from 'react-native'
import { Skeleton } from './Skeleton'

interface GiveawaySkeletonProps {
    loading: boolean,
    children: ReactNode | ReactNode[]
}
export default function GiveawaySkeleton({ loading = false, children }: GiveawaySkeletonProps) {
    if (loading) {
        return (
            <>
                {
                    Array.from({ length: 6 }).map((_, index) => (
                        <View key={index} className="bg-background rounded-lg p-4 shadow-md mb-4">
                            <Skeleton className="w-full h-36 rounded-lg mb-3" />
                            <Skeleton className="w-full h-5 rounded mb-2" />
                            <Skeleton className="w-full h-4 rounded mb-2" />
                            <Skeleton className="w-full h-4 rounded" />
                        </View>
                    ))}
            </>
        )
    }
    return children
}
