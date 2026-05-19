import { Colors } from '@/constants/Colors';
import { useCustomTheme } from '@/context/ThemeContext'; // 1. Import our new context hook

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  // 2. Instead of checking the device, check our global state app context
  const { themeMode } = useCustomTheme(); 
  
  const colorFromProps = props[themeMode];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[themeMode][colorName];
  }
}