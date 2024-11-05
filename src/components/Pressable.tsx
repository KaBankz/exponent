import type { ComponentPropsWithRef } from 'react';
import { Platform, Pressable as RNPressable } from 'react-native';

import * as Haptics from 'expo-haptics';

export function Pressable({
  onPressIn,
  ...props
}: ComponentPropsWithRef<typeof RNPressable>) {
  return (
    <RNPressable
      {...props}
      onPressIn={(event) => {
        if (Platform.OS === 'ios') {
          void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onPressIn?.(event);
      }}
    />
  );
}
