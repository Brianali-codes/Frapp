import { cn } from '@/lib/utils'
import React from 'react'
import { View, ViewStyle } from 'react-native'

interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  thickness?: number
  colorClass?: string // e.g., "bg-gray-300"
  inset?: number
  className?: string
  style?: ViewStyle
}

export const Divider = ({
  orientation = 'horizontal',
  thickness = 1,
  colorClass = 'bg-gray-300',
  inset = 0,
  style = {},
  className = ""
}: DividerProps) => {
  const isVertical = orientation === 'vertical'

  const baseClass = `${colorClass} ${isVertical ? 'w-[1px] h-full' : 'h-[1px] w-full'}`

  const insetStyle: ViewStyle = isVertical
    ? { marginTop: inset, marginBottom: inset }
    : { marginLeft: inset, marginRight: inset }

  return (
    <View
      className={cn(baseClass, className)}
      style={[insetStyle, { height: isVertical ? '100%' : thickness, width: isVertical ? thickness : '100%' }, style]}
    />
  )
}
