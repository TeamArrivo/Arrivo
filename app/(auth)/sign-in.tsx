
// // import { Text, View, ScrollView, Image, Alert } from 'react-native';
// // import icon from "@/assets/icons/splash-icon-light.png";
// // import email from '@/assets/icons copy/email.png';
// // import lock from '@/assets/icons copy/lock.png';
// // import InputField from '@/components/InputField';
// // import "@/global.css";
// // import { useState } from 'react';
// // import CustomButton from '@/components/CustomButton';
// // import { Link, router } from 'expo-router';
// // import OAuth from '@/components/OAuth';
// // import api from '@/app/api/api';
// // import * as SecureStore from 'expo-secure-store';

// // const SignIn = () => {
// //   const [form, setForm] = useState({
// //     email: '',
// //     password: '',
// //   });

// //   const onSignInPress = async () => {
// //     try {
// //       const response = await api.post('/auth/login', {
// //         email: form.email.trim(),
// //         password: form.password,
// //       });

// //       const token = response.data?.token;
// //       if (token) {
// //         await SecureStore.setItemAsync('token', token);
// //         router.push('/(root)/(tabs)/home');
// //       } else {
// //         Alert.alert('Login failed', 'No token received');
// //       }
// //     } catch (error: any) {
// //       console.error('Full Error:', JSON.stringify(error, null, 2));

// //       Alert.alert(
// //         'Login Error',
// //         error.response?.data?.message || 'Invalid credentials or server issue.'
// //       );
      
// //     }
// //   };

// //   return (
// //     <ScrollView className="flex-1 bg-[#0D0D0D]">
// //       <View className="flex-1 bg-[#0D0D0D]">
// //         {/* <View className="relative w-full h-[250px]">
// //           <Image source={signUp} className="z-0 w-full h-[250px]" />
// //           <Text className="text-2xl text-white absolute top-52 left-5 font-bold">
// //             Welcome
// //           </Text>
// //         </View> */}

// //         <View>
// //           <Image source={icon} className="w-64 h-64 mx-auto mt-5" />
// //           <Text className="text-2xl text-white text-center font-bold ">
// //             Sign In
// //           </Text>
// //         </View>

// //         <View className="p-5 text-white">
// //           <InputField
// //             label="Email"
// //             placeholder="Enter email"
// //             icon={email}
// //             textContentType="emailAddress"
// //             value={form.email}
// //             onChangeText={(value: string) => setForm({ ...form, email: value })}
// //           />
// //           <InputField
// //             label="Password"
// //             placeholder="Enter password"
// //             icon={lock}
// //             secureTextEntry
// //             textContentType="password"
// //             value={form.password}
// //             onChangeText={(value: string) => setForm({ ...form, password: value })}
// //           />
// //           <Link href="/(auth)/forgot-password" className="text-lg text-right pr-5 text-general-200 mt-2">
// //             <Text className="text-white">Forgot your password?</Text>
// //           </Link>

// //           <CustomButton title="Sign In" onPress={onSignInPress} className="mt-10" />
// //           <OAuth />

// //           <Link href="/(auth)/sign-up" className="text-lg text-center text-general-200 mt-10">
// //             <Text className="text-white">Don't have an account?</Text>
// //             <Text className="text-white font-bold pl-[5px]">Register</Text>
// //           </Link>
// //         </View>
// //       </View>
// //     </ScrollView>
// //     // #070707
// //     // #090909

// //     // #0D0D0D
// //     // #1A1A1A
// //     // #555555
// //     // #2563EB
// //   );
// // };

// // export default SignIn;


// import { Text, View, ScrollView, Image, Alert } from 'react-native';
// import icon from "@/assets/icons/splash-icon-light1.png";
// import email from '@/assets/icons copy/email.png';
// import lock from '@/assets/icons copy/lock.png';
// import InputField from '@/components/InputField';
// import "@/global.css";
// import { useState } from 'react';
// import CustomButton from '@/components/CustomButton';
// import { Link, router } from 'expo-router';
// import OAuth from '@/components/OAuth';
// import api from '@/app/api/api';
// import * as SecureStore from 'expo-secure-store';
// import LoadingOverlay from '@/components/LoadingOverlay'; // ✅ IMPORT

// const SignIn = () => {
//   const [form, setForm] = useState({
//     email: '',
//     password: '',
//   });
//   const [loading, setLoading] = useState(false); // ✅ State for loading spinner

//   const onSignInPress = async () => {
//     setLoading(true);
//     try {
//       const response = await api.post('/auth/login', {
//         email: form.email.trim(),
//         password: form.password,
//       });

//       const token = response.data?.token;
//       if (token) {
//         await SecureStore.setItemAsync('token', token);
//         router.push('/(root)/(tabs)/home');
//       } else {
//         Alert.alert('Login failed', 'No token received');
//       }
//     } catch (error: any) {
//       console.error('Full Error:', JSON.stringify(error, null, 2));
//       Alert.alert(
//         'Login Error',
//         error.response?.data?.message || 'Invalid credentials or server issue.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <ScrollView className="flex-1 bg-[#0D0D0D]">
//         <View className="flex-1 bg-[#0D0D0D]">
//           <View>
//             <Image source={icon} className="w-64 h-64 mx-auto mt-5" />
//             <Text className="text-2xl text-white text-center font-bold">Sign In</Text>
//           </View>

//           <View className="p-5 text-white">
//             <InputField
//               label="Email"
//               placeholder="Enter email"
//               icon={email}
//               textContentType="emailAddress"
//               value={form.email}
//               onChangeText={(value: string) => setForm({ ...form, email: value })}
//             />
//             <InputField
//               label="Password"
//               placeholder="Enter password"
//               icon={lock}
//               secureTextEntry
//               textContentType="password"
//               value={form.password}
//               onChangeText={(value: string) => setForm({ ...form, password: value })}
//             />
//             <Link href="/(auth)/forgot-password" className="text-lg text-right pr-5 text-general-200 mt-2">
//               <Text className="text-white">Forgot your password?</Text>
//             </Link>

//             <CustomButton title="Sign In" onPress={onSignInPress} className="mt-10" />
//             <OAuth />

//             <Link href="/(auth)/sign-up" className="text-lg text-center text-general-200 mt-10">
//               <Text className="text-white">Don't have an account?</Text>
//               <Text className="text-white font-bold pl-[5px]">Register</Text>
//             </Link>
//           </View>
//         </View>
//       </ScrollView>

//       {/* 🔄 Loading Spinner Overlay */}
//       <LoadingOverlay visible={loading} message="Signing in..." />
//     </>
//   );
// };

// export default SignIn;

import { Text, View, ScrollView, Image, Alert, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import icon from "@/assets/icons/splash-icon-light1.png";
import emailIcon from '@/assets/icons copy/email.png';
import lockIcon from '@/assets/icons copy/lock.png';
import InputField from '@/components/InputField';
import "@/global.css";
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import OAuth from '@/components/OAuth';
import api from '@/app/api/api';
import * as SecureStore from 'expo-secure-store';
import LoadingOverlay from '@/components/LoadingOverlay';
import * as WebBrowser from 'expo-web-browser';
import { LinearGradient } from 'expo-linear-gradient';

import { Ionicons } from "@expo/vector-icons";

WebBrowser.maybeCompleteAuthSession();

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSignInPress = async () => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', {
        email: form.email.trim(),
        password: form.password,
        role: 'RIDER'
      });

      const token = response.data?.token;
      if (token) {
        await SecureStore.setItemAsync('token', token);
        router.push(`/(root)/(tabs)/home`);
      } else {
        Alert.alert('Login failed', 'No token received from server.');
      }
    } catch (err: any) {
      console.error('SignIn Error:', err.response || err);
      const msg = err.response?.data?.message || 'Invalid credentials or server issue.';
      Alert.alert('Login Error', msg);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <LinearGradient
        colors={['#17152D', '#319F43']}
        locations={[0.3, 1.0]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView className="flex-1">
          <View className="flex-1">
            <View>
              <Image source={icon} className="w-64 h-64 mx-auto mt-5" />
              <Text className="text-2xl text-white text-center font-bold">Sign In</Text>
            </View>
            <View className="p-5">
              <InputField
                label="Email"
                placeholder="Enter your email"
                icon={emailIcon}
                textContentType="emailAddress"
                value={form.email}
                onChangeText={(value: string) => setForm({ ...form, email: value })}
              />
              <InputField
                label="Password"
                placeholder="Enter your password"
                icon={lockIcon}
                secureTextEntry={!showPassword}
                textContentType="password"
                value={form.password}
                onChangeText={(value: string) => setForm({ ...form, password: value })}
                placeholderClassName='text-black'
                showPasswordToggle={true}
                onTogglePassword={togglePasswordVisibility}
                isPasswordVisible={showPassword}
                
              />
              
              <CustomButton title="Sign In" onPress={onSignInPress} className="mt-10 bg-[#6EBF36]" />
              {/* <OAuth /> */}
              <Link href="/(auth)/sign-up" className="text-center text-general-200 mt-10">
                <Text className="text-white">Don't have an account?</Text>
                <Text className="text-white font-bold pl-[5px]">Register</Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
      <LoadingOverlay visible={loading} message="Signing in…" />
    </>
  );
};

export default SignIn;