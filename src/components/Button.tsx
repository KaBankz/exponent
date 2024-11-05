import type { ComponentPropsWithRef } from 'react';
import { Text } from 'react-native';

import { tv, type VariantProps } from 'tailwind-variants';

import { Pressable } from '@/components/Pressable';

const button = tv({
  slots: {
    pressable: 'items-center justify-center rounded-full',
    text: 'font-medium text-blue-500',
  },
  variants: {
    style: {
      plain: { pressable: 'bg-transparent' },
      gray: { pressable: 'bg-zinc-800' },
      tinted: { pressable: 'bg-blue-950' },
      filled: { pressable: 'bg-blue-500', text: 'text-white' },
    },
    size: {
      sm: { pressable: 'px-3 py-1.5', text: 'text-base' },
      md: { pressable: 'px-4 py-2', text: 'text-lg' },
      lg: { pressable: 'rounded-2xl p-4', text: 'text-xl' },
    },
    disabled: {
      true: { pressable: 'opacity-50' },
      false: { pressable: 'opacity-100 transition-opacity active:opacity-80' },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'filled',
  },
});

type ButtonProps = {
  text: string;
  textClassName?: string;
} & Omit<ComponentPropsWithRef<typeof Pressable>, 'style'> &
  VariantProps<typeof button>;

export function Button({
  text,
  size,
  style,
  disabled,
  className,
  textClassName,
  ...props
}: ButtonProps) {
  const { pressable: pressableStyle, text: textStyle } = button({
    size,
    style,
    disabled,
  });

  return (
    <Pressable
      {...props}
      disabled={disabled}
      className={pressableStyle({ className })}>
      <Text className={textStyle({ className: textClassName })}>{text}</Text>
    </Pressable>
  );
}
