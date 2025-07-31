// import { Stack } from "expo-router";


// export default function Layout() {
 
//   return (
//     <Stack>
//       <Stack.Screen name="welcome" options={{ headerShown: false }} />
//       <Stack.Screen name="sign-up" options={{ headerShown: false }} />
//       <Stack.Screen name="sign-in" options={{ headerShown: false }} />
//       <Stack.Screen name="driver-sign-in" options={{ headerShown: false }} />
//       <Stack.Screen name="driver-sign-up" options={{ headerShown: false }} />
//       <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
//       <Stack.Screen name="reset-password" options={{ headerShown: false }} />


//     </Stack>
//   );
// }


// app/(auth)/_layout.tsx
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack initialRouteName="welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="driver-sign-in" />
      <Stack.Screen name="driver-sign-up" />
      
    </Stack>
  );
}
