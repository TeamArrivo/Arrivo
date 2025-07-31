
// import { Text, View, ScrollView, Image, Alert } from 'react-native';

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
//   });

//   const onSignUpPress = async () => {
//     try {
//       const payload = {
//         name: form.name.trim(),
//         email: form.email.trim(),
//         password: form.password,
//         phoneNumber: form.number.trim(),
//         role: "driver", // or "driver" if applicable
//         identificationNumber: "ID-PLACEHOLDER", // later allow user to enter
//         driverLicenseNumber: null,              // for riders it's null
//         profilePictureUrl: null,                // upload feature later
//       };

//       const response = await api.post('/auth/signup/driver', payload, {
//         headers: {
//           Accept: 'application/json',
//         },
//       });

//       const token = response.data?.token;

//       if (token) {
//         await SecureStore.setItemAsync('token', token);
//         router.push(`/(root)/(drivertabs)/home`);
//       } else {
//         Alert.alert('Signup failed', 'Token not received.');
//       }
//     } catch (error: any) {
//       console.error('Signup error:', error);
//       Alert.alert(
//         'Signup Error',
//         error.response?.data?.message || 'Check your input or try again later.'
//       );
//     }
//   };

//   return (
//     <ScrollView className=" bg-[#0D0D0D]">
//       <View className='flex-1 bg-[#0D0D0D]'>

//         <View>
//           <Image source={icon} className="w-64 h-64 mx-auto mt-5" />
//           <Text className="text-2xl text-white text-center font-bold ">
//             Driver Register
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
//             icon={lock}
//             textContentType="telephoneNumber"
//             value={form.number}
//             onChangeText={(value: string) => setForm({ ...form, number: value })}
//           />

//             <InputField
//             label="National Identification Number"
//             placeholder="Enter ID number"
//             // icon={email}
//             value={form.number}
//             onChangeText={(value: string) => setForm({ ...form, email: value })}
//           />

//           <CustomButton title='Register' onPress={onSignUpPress} className='mt-6' />
//           <OAuth />

//           <Link href="/(auth)/driver-sign-in" className="text-lg text-center text-general-200 mt-10">
//             <Text className='text-white'>Already have an account?</Text>
//             <Text className='text-white font-bold pl-[5px]'>Log In</Text>
//           </Link>
        
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// export default SignUp;







import { Text, View, ScrollView, Image, Alert } from 'react-native';
import icon from "@/assets/icons/splash-icon-light1.png";
import person from '@/assets/icons copy/person.png';
import emailIcon from '@/assets/icons copy/email.png';
import lockIcon from '@/assets/icons copy/lock.png';
import InputField from '@/components/InputField';
import "@/global.css";
import { useState } from 'react';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import OAuth from '@/components/OAuth';
import api from '@/app/api/api';  // configured with baseURL to backend
import * as SecureStore from 'expo-secure-store';

const DriverSignUp = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    number: '',
    identificationNumber: '',
  });

  const onSignUpPress = async () => {
    try {
      const [firstName, lastName] = form.name.split(' ');
      const payload = {
        email: form.email.trim(),
        password: form.password,
        phoneNumber: form.number.trim(),
        role: "DRIVER",
        firstName: firstName || null,
        lastName: lastName || null,
        profileImageUrl: null,
      };

      const response = await api.post('/auth/register', payload, {
        headers: { Accept: 'application/json' },
      });

      const token = response.data?.token;
      if (token) {
        await SecureStore.setItemAsync('token', token);
        router.push(`/(root)/(drivertabs)/home`);
      } else {
        Alert.alert('Signup failed', 'Token not received.');
      }

    } catch (error: any) {
      console.error('Signup error:', error.response || error);
      Alert.alert(
        'Signup Error',
        error.response?.data?.message || 'Check your input or try again later.'
      );
    }
  };

  return (
    <ScrollView className="bg-[#0D0D0D]">
      <View className="flex-1 bg-[#0D0D0D]">
        <View>
          <Image source={icon} className="w-64 h-64 mx-auto mt-5" />
          <Text className="text-2xl text-white text-center font-bold">
            Driver Register
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your full name"
            icon={person}
            value={form.name}
            onChangeText={v => setForm({ ...form, name: v })}
          />
          <InputField
            label="Email"
            placeholder="Enter email"
            icon={emailIcon}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={v => setForm({ ...form, email: v })}
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            icon={lockIcon}
            secureTextEntry
            textContentType="password"
            value={form.password}
            onChangeText={v => setForm({ ...form, password: v })}
          />
          <InputField
            label="Phone Number"
            placeholder="Enter phone number"
            icon={lockIcon}
            textContentType="telephoneNumber"
            value={form.number}
            onChangeText={v => setForm({ ...form, number: v })}
          />

          <CustomButton title="Register" onPress={onSignUpPress} className="mt-6" />
          <OAuth />

          <Link href="/(auth)/driver-sign-in" className="text-center text-general-200 mt-10">
            <Text className="text-white">Already have an account? </Text>
            <Text className="text-white font-bold">Log In</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default DriverSignUp;

