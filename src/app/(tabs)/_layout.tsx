import React from 'react';
import { Platform } from 'react-native';

import { useLingui } from '@lingui/react/macro';
import { Tabs } from 'expo-router';

import { Pressable } from '@/components/Pressable';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useLingui();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: Pressable,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: t`Home`,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name='house.fill' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          title: t`Explore`,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name='paperplane.fill' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='components'
        options={{
          title: t`Components`,
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name='puzzlepiece.fill' color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
