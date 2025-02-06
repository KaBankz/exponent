import { View } from 'react-native';

import { SignIn } from '@clerk/clerk-expo/web';

export default function SignInScreen() {
  return (
    <View className='flex-1 items-center justify-center'>
      <SignIn />
    </View>
  );
}
