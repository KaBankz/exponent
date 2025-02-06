import { type GestureResponderEvent } from 'react-native';
import * as Haptics from 'expo-haptics';

import type { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';

/**
 * A wrapper around React Navigation's PlatformPressable that adds haptic
 * feedback for tab bar buttons.
 *
 * Automatically triggers a light haptic impact when pressing tab bar items.
 *
 * @param props - Standard bottom tab bar button props from React Navigation
 * @platform ios android
 */
export function HapticTab({ onPress, ...props }: BottomTabBarButtonProps) {
  const handlePress = (event: GestureResponderEvent) => {
    if (process.env.EXPO_OS === 'web') return onPress;

    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    return onPress?.(event);
  };

  return <PlatformPressable onPress={handlePress} {...props} />;
}
