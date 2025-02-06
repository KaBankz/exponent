import { Link, type LinkProps } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';

type Props = Omit<LinkProps, 'href'> & { href: string };

export function ExternalLink({ href, ...props }: Props) {
  return (
    <Link
      {...props}
      target='_blank'
      // @ts-expect-error: We are manually setting the href type to only be a string.
      href={href}
      onPress={(event) => {
        if (process.env.EXPO_OS === 'web') return;

        // Prevent the default behavior of linking to the default browser on native.
        event.preventDefault();
        // Open the link in an in-app browser.
        openBrowserAsync(href).catch((error) => {
          console.error(`Failed to open link in a browser: ${error}`);
        });
      }}
    />
  );
}
