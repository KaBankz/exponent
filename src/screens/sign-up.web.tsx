import { View } from 'react-native';

import { SignUp } from '@clerk/clerk-expo/web';

export default function SignUpScreen() {
  return (
    <View className='flex-1 items-center justify-center'>
      <SignUp />
    </View>
  );
}
