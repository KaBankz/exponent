import { forwardRef } from 'react';
import {
  Platform,
  Pressable as RNPressable,
  type GestureResponderEvent,
  type PressableProps as RNPressableProps,
  type View,
} from 'react-native';
import * as Haptics from 'expo-haptics';

type HapticFeedbackType =
  | 'light'
  | 'medium'
  | 'heavy'
  | 'soft'
  | 'rigid'
  | 'success'
  | 'warning'
  | 'error';

type PressEvent = 'onPress' | 'onPressIn';

export type PressableProps = {
  hapticsFeedback?: HapticFeedbackType | false;
  hapticsEventTrigger?: PressEvent;
} & RNPressableProps;

function triggerHaptic(type: HapticFeedbackType) {
  switch (type) {
    // Impact feedback styles
    case 'light':
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      break;
    case 'medium':
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      break;
    case 'heavy':
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      break;
    case 'soft':
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      break;
    case 'rigid':
      void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
      break;
    // Notification feedback types
    case 'success':
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      break;
    case 'warning':
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      break;
    case 'error':
      void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      break;
  }
}

function PressableComponent(
  {
    onPressIn,
    onPress,
    hapticsFeedback = 'light',
    hapticsEventTrigger = 'onPress',
    ...props
  }: PressableProps,
  ref: React.ForwardedRef<View>
) {
  const handlePress = (
    type: PressEvent,
    handler?: ((event: GestureResponderEvent) => void) | null
  ) => {
    if (Platform.OS === 'web') return handler;

    return (event: GestureResponderEvent) => {
      if (type === hapticsEventTrigger && hapticsFeedback) {
        triggerHaptic(hapticsFeedback);
      }
      handler?.(event);
    };
  };

  return (
    <RNPressable
      ref={ref}
      onPressIn={handlePress('onPressIn', onPressIn)}
      onPress={handlePress('onPress', onPress)}
      {...props}
    />
  );
}

/**
 * A wrapper around React Native's Pressable that adds haptic feedback.
 *
 * @param hapticsFeedback - The type of haptic feedback to trigger. Supports both impact ('light', 'medium', 'heavy', 'soft', 'rigid')
 * and notification ('success', 'warning', 'error') styles. Set to false to disable.
 * @param hapticsEventTrigger - When to trigger the haptic feedback. Defaults to 'onPress'.
 * @default hapticsFeedback="light"
 * @default hapticsEventTrigger="onPress"
 * @platform ios android
 */
export const Pressable = forwardRef(PressableComponent);
