import { Image, Platform, StyleSheet } from 'react-native';

import { Trans, useLingui } from '@lingui/react/macro';

import ReactLogo from '@/assets/images/react-logo.png';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  const { t } = useLingui();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color='#808080'
          name='chevron.left.forwardslash.chevron.right'
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type='title'>
          <Trans>Explore</Trans>
        </ThemedText>
      </ThemedView>
      <ThemedText>
        <Trans>This app includes example code to help you get started.</Trans>
      </ThemedText>
      <Collapsible title={t`File-based routing`}>
        <ThemedText>
          <Trans>
            This app has two screens:{' '}
            <ThemedText type='defaultSemiBold'>app/(tabs)/index.tsx</ThemedText>{' '}
            and{' '}
            <ThemedText type='defaultSemiBold'>
              app/(tabs)/explore.tsx
            </ThemedText>
          </Trans>
        </ThemedText>
        <ThemedText>
          <Trans>
            The layout file in{' '}
            <ThemedText type='defaultSemiBold'>
              app/(tabs)/_layout.tsx
            </ThemedText>{' '}
            sets up the tab navigator.
          </Trans>
        </ThemedText>
        <ExternalLink href='https://docs.expo.dev/router/introduction'>
          <ThemedText type='link'>
            <Trans>Learn more</Trans>
          </ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t`Android, iOS, and web support`}>
        <ThemedText>
          <Trans>
            You can open this project on Android, iOS, and the web. To open the
            web version, press <ThemedText type='defaultSemiBold'>w</ThemedText>{' '}
            in the terminal running this project.
          </Trans>
        </ThemedText>
      </Collapsible>
      <Collapsible title={t`Images`}>
        <ThemedText>
          <Trans>
            For static images, you can use the{' '}
            <ThemedText type='defaultSemiBold'>@2x</ThemedText> and{' '}
            <ThemedText type='defaultSemiBold'>@3x</ThemedText> suffixes to
            provide files for different screen densities
          </Trans>
        </ThemedText>
        <Image source={ReactLogo} style={{ alignSelf: 'center' }} />
        <ExternalLink href='https://reactnative.dev/docs/images'>
          <ThemedText type='link'>
            <Trans>Learn more</Trans>
          </ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t`Custom fonts`}>
        <ThemedText>
          <Trans>
            Open <ThemedText type='defaultSemiBold'>app/_layout.tsx</ThemedText>{' '}
            to see how to load{' '}
            <ThemedText style={{ fontFamily: 'SpaceMono' }}>
              custom fonts such as this one.
            </ThemedText>
          </Trans>
        </ThemedText>
        <ExternalLink href='https://docs.expo.dev/versions/latest/sdk/font'>
          <ThemedText type='link'>
            <Trans>Learn more</Trans>
          </ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t`Light and dark mode components`}>
        <ThemedText>
          <Trans>
            This template has light and dark mode support. The{' '}
            <ThemedText type='defaultSemiBold'>useColorScheme()</ThemedText>{' '}
            hook lets you inspect what the user's current color scheme is, and
            so you can adjust UI colors accordingly.
          </Trans>
        </ThemedText>
        <ExternalLink href='https://docs.expo.dev/develop/user-interface/color-themes/'>
          <ThemedText type='link'>
            <Trans>Learn more</Trans>
          </ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t`Animations`}>
        <ThemedText>
          <Trans>
            This template includes an example of an animated component. The{' '}
            <ThemedText type='defaultSemiBold'>
              components/HelloWave.tsx
            </ThemedText>{' '}
            component uses the powerful{' '}
            <ThemedText type='defaultSemiBold'>
              react-native-reanimated
            </ThemedText>{' '}
            library to create a waving hand animation.
          </Trans>
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              <Trans>
                The{' '}
                <ThemedText type='defaultSemiBold'>
                  components/ParallaxScrollView.tsx
                </ThemedText>{' '}
                component provides a parallax effect for the header image.
              </Trans>
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
