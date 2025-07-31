
import { Text, View, ScrollView, Image, Alert } from 'react-native';

import icon from "@/assets/icons/splash-icon-light1.png";
import email from '@/assets/icons copy/email.png';
import lock from '@/assets/icons copy/lock.png';
import InputField from '@/components/InputField';
import "@/global.css";
import { useState } from 'react';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import OAuth from '@/components/OAuth';
import api from '@/app/api/api';
import * as SecureStore from 'expo-secure-store';
import LoadingOverlay from '@/components/LoadingOverlay';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

   const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    try {
      const response = await api.post('/auth/login', {
        email: form.email.trim(),
        password: form.password,
        role: 'DRIVER'
      });

      const token = response.data?.token;
      if (token) {
        await SecureStore.setItemAsync('token', token);
        router.push('/(root)/(drivertabs)/home');
      } else {
        Alert.alert('Login failed', 'No token received');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      Alert.alert(
        'Login Error',
        error.response?.data?.message || 'Invalid credentials or server issue.'
      );
    }
  };

  return (
    <>
      <ScrollView className="flex-1 bg-[#0F101B]">
        <View className="flex-1 bg-[#0F101B]">
          {/* <View className="relative w-full h-[250px]">
            <Image source={signUp} className="z-0 w-full h-[250px]" />
            <Text className="text-2xl text-white absolute top-52 left-5 font-bold">
              Welcome
            </Text>
          </View> */}
          <View>
            <Image source={icon} className="w-64 h-64 mx-auto mt-5" />
            <Text className="text-2xl text-white text-center font-bold ">
              Driver Sign In
            </Text>
          </View>

          <View className="p-5 text-white">
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
              onChangeText={(value: string) => setForm({ ...form, password: value })}
            />
            <Link href="/(auth)/forgot-password" className="text-lg text-left text-general-200 ">
              <Text className="text-white">Forgot your password?</Text>
            </Link>

            <CustomButton title="Sign In" onPress={onSignInPress} className="mt-6" />
            <OAuth />

            <Link href="/(auth)/driver-sign-up" className="text-lg text-center text-general-200 mt-10">
              <Text className="text-white">Don't have an account?</Text>
              <Text className="text-white font-bold pl-[5px]">Register</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
      <LoadingOverlay visible={loading} message="Signing in..." />
      {/* 
      #070707
      #090909

      #0D0D0D
      #1A1A1A
      #555555
      #2563EB
      */}
    </>
  );
};

export default SignIn;
