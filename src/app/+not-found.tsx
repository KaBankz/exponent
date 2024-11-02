import { StyleSheet } from 'react-native';

import { Trans, useLingui } from '@lingui/react/macro';
import { Link, Stack } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  const { t } = useLingui();

  return (
    <>
      <Stack.Screen options={{ title: t`Oops!` }} />
      <ThemedView style={styles.container}>
        <ThemedText type='title'>
          <Trans>This screen doesn't exist.</Trans>
        </ThemedText>
        <Link href='/' style={styles.link}>
          <ThemedText type='link'>
            <Trans>Go to home screen!</Trans>
          </ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
