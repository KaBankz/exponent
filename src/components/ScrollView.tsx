import { ScrollView as RNScrollView, type ScrollViewProps } from 'react-native';

import { cn } from '@/lib/cn';

/**
 * A wrapper around React Native's ScrollView component with default styling and behavior.
 */
export function ScrollView({
  className,
  contentContainerStyle,
  ...props
}: ScrollViewProps) {
  return (
    <RNScrollView
      {...props}
      className={cn('flex-1', className)}
      contentContainerStyle={contentContainerStyle ?? { padding: 22 }}
      automaticallyAdjustsScrollIndicatorInsets
      contentInsetAdjustmentBehavior='automatic'
    />
  );
}
