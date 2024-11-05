import { ScrollView, Text, View } from 'react-native';

import { Trans, useLingui } from '@lingui/react/macro';

import { Button } from '@/components/Button';

export default function ComponentsPage() {
  const { t } = useLingui();

  return (
    <ScrollView className='gap-2'>
      <View className='items-center justify-center p-4'>
        <Text className='pb-5 text-3xl font-bold text-black dark:text-white'>
          <Trans>Active Buttons</Trans>
        </Text>
        <View className='mb-4 flex-row'>
          <View className='w-16' />
          <View className='flex-1 flex-row justify-around'>
            <Text className='text-black dark:text-white'>
              <Trans>Plain</Trans>
            </Text>
            <Text className='text-black dark:text-white'>
              <Trans>Gray</Trans>
            </Text>
            <Text className='text-black dark:text-white'>
              <Trans>Tinted</Trans>
            </Text>
            <Text className='text-black dark:text-white'>
              <Trans>Filled</Trans>
            </Text>
          </View>
        </View>

        {[
          { label: t`Small`, size: 'sm' as const },
          { label: t`Medium`, size: 'md' as const },
          { label: t`Large`, size: 'lg' as const },
        ].map(({ label, size }) => (
          <View key={size} className='mb-4 flex-row items-center'>
            <View className='w-16'>
              <Text className='text-black dark:text-white'>{label}</Text>
            </View>
            <View className='flex-1 flex-row justify-around'>
              <Button text={t`Button`} style='plain' size={size} />
              <Button text={t`Button`} style='gray' size={size} />
              <Button text={t`Button`} style='tinted' size={size} />
              <Button text={t`Button`} style='filled' size={size} />
            </View>
          </View>
        ))}
      </View>
      <View className='items-center justify-center p-4'>
        <Text className='pb-5 text-3xl font-bold text-black dark:text-white'>
          <Trans>Disabled Buttons</Trans>
        </Text>
        <View className='mb-4 flex-row'>
          <View className='w-16' />
          <View className='flex-1 flex-row justify-around'>
            <Text className='text-black dark:text-white'>
              <Trans>Plain</Trans>
            </Text>
            <Text className='text-black dark:text-white'>
              <Trans>Gray</Trans>
            </Text>
            <Text className='text-black dark:text-white'>
              <Trans>Tinted</Trans>
            </Text>
            <Text className='text-black dark:text-white'>
              <Trans>Filled</Trans>
            </Text>
          </View>
        </View>

        {[
          { label: t`Small`, size: 'sm' as const },
          { label: t`Medium`, size: 'md' as const },
          { label: t`Large`, size: 'lg' as const },
        ].map(({ label, size }) => (
          <View key={size} className='mb-4 flex-row items-center'>
            <View className='w-16'>
              <Text className='text-black dark:text-white'>{label}</Text>
            </View>
            <View className='flex-1 flex-row justify-around'>
              <Button text={t`Button`} style='plain' size={size} disabled />
              <Button text={t`Button`} style='gray' size={size} disabled />
              <Button text={t`Button`} style='tinted' size={size} disabled />
              <Button text={t`Button`} style='filled' size={size} disabled />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
