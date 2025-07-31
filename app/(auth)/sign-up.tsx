"use client"

import { Text, View, ScrollView, Image, Alert } from "react-native"
import icon from "@/assets/icons/splash-icon-light1.png"
import person from "@/assets/icons copy/person.png"
import email from "@/assets/icons copy/email.png"
import lock from "@/assets/icons copy/lock.png"
import phone from "@/assets/icons copy/phone.png" // New import for phone icon
import InputField from "@/components/InputField"
import "@/global.css"
import { useState } from "react"
import CustomButton from "@/components/CustomButton"
import { Link, router } from "expo-router"
import api from "@/app/api/api"
import * as SecureStore from "expo-secure-store"
import { LinearGradient } from "expo-linear-gradient"
import LoadingOverlay from "@/components/LoadingOverlay"
// import { Ionicons } from '@expo/vector-icons'; // Removed as image asset is used

const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
  })

  const onSignUpPress = async () => {
    setLoading(true) // Start loading
    const payload = {
      email: form.email.trim(),
      password: form.password,
      phoneNumber: form.number.trim(),
      role: "RIDER", // must match backend's expected values
      firstName: form.name.split(" ")[0] || null,
      lastName: form.name.split(" ")[1] || null,
      profileImageUrl: null,
    }
    try {
      const response = await api.post("/auth/register", payload, {
        headers: { Accept: "application/json" },
      })
      const token = response.data?.token
      if (token) {
        await SecureStore.setItemAsync("token", token)
        router.push(`/(root)/(tabs)/home`)
      } else {
        Alert.alert("Signup failed", "Token not received.")
      }
    } catch (error: any) {
      console.error("Signup Error:", error.response || error)
      const msg = error.response?.data?.message || "Check your input or try again later."
      Alert.alert("Signup Error", msg)
    } finally {
      setLoading(false) // End loading
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <LinearGradient
        colors={["#17152D", "#319F43"]}
        locations={[0.3, 1.0]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView className="flex-1">
          <View className="flex-1">
            <View>
              <Image source={icon} className="w-64 h-64 mx-auto mt-5" />
              <Text className="text-2xl text-white text-center font-bold">Register</Text>
            </View>
            <View className="p-5">
              <InputField
                label="Name"
                placeholder="Enter your full name"
                icon={person}
                value={form.name}
                onChangeText={(value: string) => setForm({ ...form, name: value })}
              />
              <InputField
                label="Email"
                placeholder="Enter email"
                icon={email}
                textContentType="emailAddress"
                value={form.email}
                onChangeText={(value: string) => setForm({ ...form, email: value })}
              />
              <InputField
                label="Password"
                placeholder="Enter password"
                icon={lock}
                secureTextEntry
                textContentType="password"
                value={form.password}
                showPasswordToggle={true}
                onTogglePassword={togglePasswordVisibility}
                isPasswordVisible={showPassword}
                onChangeText={(value: string) => setForm({ ...form, password: value })}
              />
              <InputField
                label="Phone Number"
                placeholder="Enter phone number"
                textContentType="telephoneNumber"
                value={form.number}
                icon={phone} // Correctly pass the phone icon
                onChangeText={(value: string) => setForm({ ...form, number: value })}
              />
              <CustomButton title="Register" onPress={onSignUpPress} className="mt-6 bg-[#6EBF36]" />
              {/* <OAuth /> */}
              <Link href="/(auth)/sign-in" className="text-lg text-center text-general-200 mt-5">
                <Text className="text-white">Already have an account?</Text>
                <Text className="text-white font-bold pl-[5px]">Log In</Text>
              </Link>
              {/* <Link href="/(auth)/driver-sign-up" className="text-lg text-center text-general-200 mt-5">
                <Text className="text-white">Want to get started as a driver?</Text>
                <Text className="text-white font-bold pl-[5px]">Register</Text>
              </Link> */}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
      <LoadingOverlay visible={loading} message="Signing up…" />
    </>
  )
}

export default SignUp





































// import { Text, View, ScrollView, Image, Alert } from 'react-native';
// import signUp from "@/assets/images/signup-car.png";
// import icon from "@/assets/icons/splash-icon-light1.png";
// import person from '@/assets/icons copy/person.png';
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

// const SignUp = () => {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     number: '',
//     identificationNumber: '',
//   });


//   const onSignUpPress = async () => {
//   const payload = {
//     email: form.email.trim(),
//     password: form.password,
//     phoneNumber: form.number.trim(),
//     role: "RIDER",
//     firstName: form.name.split(' ')[0] || null,
//     lastName: form.name.split(' ')[1] || null,
//     profileImageUrl: null
//   };

//   try {
//     const response = await api.post('/api/auth/register', payload, {
//       headers: { Accept: 'application/json' }
//     });

//     const token = response.data?.token;
//     if (token) {
//       await SecureStore.setItemAsync('token', token);
//       router.push(`/(root)/(tabs)/home`);
//     } else {
//       Alert.alert('Signup failed', 'Token not received.');
//     }
//   } catch (error) {
//     console.error(error);
//     const msg = error.response?.data?.message || 'Check your input.';
//     Alert.alert('Signup Error', msg);
//   }
// };


  

//   return (
//     <ScrollView className="flex-1 bg-[#0D0D0D]">
//       <View className='flex-1 bg-[#0D0D0D]'>
//         <View>
//           <Image source={icon} className="w-64 h-64 mx-auto mt-5" />
//           <Text className="text-2xl text-white text-center font-bold ">
//             Register
//           </Text>
//         </View>
//         <View className='p-5 text-white'>
//           <InputField
//             label="Name"
//             placeholder="Enter your name"
//             icon={person}
//             value={form.name}
//             onChangeText={(value: string) => setForm({ ...form, name: value })}
//           />
//           <InputField
//             label="Email"
//             placeholder="Enter email"
//             icon={email}
//             textContentType="emailAddress"
//             value={form.email}
//             onChangeText={(value: string) => setForm({ ...form, email: value })}
//           />
//           <InputField
//             label="Password"
//             placeholder="Enter password"
//             icon={lock}
//             secureTextEntry
//             textContentType="password"
//             value={form.password}
//             onChangeText={(value: string) => setForm({ ...form, password: value })}
//           />
//           <InputField
//             label="Phone Number"
//             placeholder="Enter phone number"
//             // icon={lock}
//             textContentType="telephoneNumber"
//             value={form.number}
//             onChangeText={(value: string) => setForm({ ...form, number: value })}
//           />

//             <InputField
//             label="National Identification Number"
//             placeholder="Enter ID number"
//             // icon={email}
//             keyboardType="numeric"
//             value={form.identificationNumber}
//             onChangeText={(value: string) => setForm({ ...form, identificationNumber: value })}
//           />

//           <CustomButton title='Register' onPress={onSignUpPress} className='mt-6' />
//           <OAuth />

//           <Link href="/(auth)/sign-in" className="text-lg text-center text-general-200 mt-5">
//             <Text className='text-white'>Already have an account?</Text>
//             <Text className='text-white font-bold pl-[5px]'>Log In</Text>
//           </Link>
//           <Link href="/(auth)/driver-sign-up" className="text-lg text-center text-general-200 mt-5">
//             <Text className='text-white'>Want to get started as a driver?</Text>
//             <Text className='text-white font-bold pl-[5px]'>Register</Text>
//           </Link>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default SignUp;












// const onSignUpPress = async () => {
//     try {
//       const payload = {
//         name: form.name.trim(),
//         email: form.email.trim(),
//         password: form.password,
//         phoneNumber: form.number.trim(),
//         role: "rider", // or "driver" if applicable
//         identificationNumber: "ID-PLACEHOLDER", 
//         driverLicenseNumber: null,             
//         profilePictureUrl: null,                
//       };

//       const response = await api.post('/auth/signup/rider', payload, {
//         headers: {
//           Accept: 'application/json',
//         },
//       });

//       const token = response.data?.token;

//       if (token) {
//         await SecureStore.setItemAsync('token', token);
//         router.push(`/(root)/(tabs)/home`);
//       } else {
//         Alert.alert('Signup failed', 'Token not received.');
//       }
//     } catch (error: any) {
//       console.error('Full Error:', JSON.stringify(error, null, 2));

//       Alert.alert(
//         'Signup Error',
//         error.response?.data?.message || 'Check your input or try again later.'
//       );
      
//     }
//   };