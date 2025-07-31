import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ScrollView, 
  useColorScheme,
  ActivityIndicator 
} from 'react-native';
import { useRouter } from 'expo-router';
import api from '@/app/api/api';
import { Ionicons } from '@expo/vector-icons';

export default function EditProfileScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/auth/me')
      .then(res => {
        setFullName(res.data.fullName);
        setEmail(res.data.email);
      })
      .catch(() => Alert.alert('Error', 'Could not load profile'))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    if (!fullName.trim() || !email.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setSaving(true);
      await api.put('/auth/me', { fullName, email });
      Alert.alert('Success', 'Profile updated successfully');
      router.back();
    } catch {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View className={`flex-1 justify-center items-center ${isDark ? 'bg-black' : 'bg-white'}`}>
        <ActivityIndicator size="large" color={isDark ? '#ffffff' : '#000000'} />
        <Text className={`mt-4 ${isDark ? 'text-white' : 'text-black'}`}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${isDark ? 'bg-black' : 'bg-white'}`}>
      {/* Header */}
      <View className={`pt-14 pb-6 px-6 ${isDark ? 'bg-black' : 'bg-white'} border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
        <View className="flex-row items-center">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="mr-4 p-2 -ml-2"
            activeOpacity={0.7}
          >
            <Ionicons 
              name="arrow-back" 
              size={24} 
              color={isDark ? 'white' : 'black'} 
            />
          </TouchableOpacity>
          <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
            Edit Profile
          </Text>
        </View>
      </View>

      <ScrollView 
        className="flex-1 px-6"
        contentContainerStyle={{ paddingTop: 24, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Form */}
        <View className="space-y-6">
          {/* Full Name Input */}
          <View className="space-y-2">
            <Text className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Full Name
            </Text>
            <TextInput
              className={`rounded-xl px-4 py-4 text-base border ${
                isDark 
                  ? 'bg-gray-900 text-white border-gray-700 focus:border-blue-500' 
                  : 'bg-gray-50 text-black border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Enter your full name"
              placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>

          {/* Email Input */}
          <View className="space-y-2">
            <Text className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Email Address
            </Text>
            <TextInput
              className={`rounded-xl px-4 py-4 text-base border ${
                isDark 
                  ? 'bg-gray-900 text-white border-gray-700 focus:border-blue-500' 
                  : 'bg-gray-50 text-black border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Enter your email address"
              placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              returnKeyType="done"
              onSubmitEditing={handleSave}
            />
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          onPress={handleSave}
          disabled={saving || !fullName.trim() || !email.trim()}
          className={`mt-8 rounded-xl py-4 px-6 flex-row items-center justify-center ${
            saving || !fullName.trim() || !email.trim()
              ? isDark ? 'bg-gray-800' : 'bg-gray-300'
              : 'bg-[#6EBF36]'
          }`}
          activeOpacity={0.8}
        >
          {saving ? (
            <>
              <ActivityIndicator size="small" color="white" className="mr-2" />
              <Text className="text-white font-semibold text-base">Saving...</Text>
            </>
          ) : (
            <Text className={`font-semibold text-base ${
              !fullName.trim() || !email.trim()
                ? isDark ? 'text-gray-500' : 'text-gray-600'
                : 'text-white'
            }`}>
              Save Changes
            </Text>
          )}
        </TouchableOpacity>

        {/* Additional Info */}
        <View className={`mt-6 p-4 rounded-xl ${isDark ? 'bg-gray-900' : 'bg-blue-50'}`}>
          <View className="flex-row items-start">
            <Ionicons 
              name="information-circle-outline" 
              size={20} 
              color={isDark ? '#60A5FA' : '#3B82F6'} 
              className="mt-0.5 mr-3" 
            />
            <Text className={`text-sm flex-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Your profile information is used to personalize your experience and for account verification purposes.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}