


// app/(root)/_layout.tsx
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import 'react-native-reanimated';

export default function RootStackLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Rider + Driver tabs accessible only to signed-in users */}
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(drivertabs)" />

        {/* Secondary screens: accessible within authenticated context */}
        <Stack.Screen name="bookride" options={{ presentation: 'card' }} />
        <Stack.Screen name="paymentMethod" options={{ presentation: 'card' }} />
        <Stack.Screen name="about" options={{ presentation: 'modal' }} />
        <Stack.Screen name="support" options={{ presentation: 'modal' }} />
        <Stack.Screen name="features" options={{ presentation: 'modal' }} />
        <Stack.Screen name="services" options={{ presentation: 'modal' }} />
        <Stack.Screen name="EditProfileScreen" options={{ presentation: 'modal' }} />
        <Stack.Screen name="ChatScreen" options={{ presentation: 'modal' }} />
         <Stack.Screen name="AddCardScreen" options={{ presentation: 'modal' }} />
         <Stack.Screen name="CardManagementScreen" options={{ presentation: 'modal' }} />

      
      </Stack>
    </GestureHandlerRootView>
  );
}
