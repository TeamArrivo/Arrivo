import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SafetyToolkit() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-black px-6 pt-16">
      {/* Back Arrow */}
      <TouchableOpacity
        onPress={() => router.push('/')}
        className="absolute top-14 left-2 z-10"
      >
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      {/* Header */}
      <View className="items-center mb-8 mt-4">
        <Ionicons name="shield-checkmark-outline" size={48} color="#4ade80" />
        <Text className="text-white text-2xl font-bold mt-4 text-center">
          Arrivo Safety Toolkit
        </Text>
        <Text className="text-gray-400 text-base text-center mt-2 leading-relaxed">
          Tools designed to protect you and keep you connected on every ride.
        </Text>
      </View>

      {/* Feature Cards */}
      <View className="space-y-6">
        <View className="bg-zinc-900 p-5 rounded-xl">
          <Text className="text-white text-lg font-semibold mb-1">
            🚨 Emergency SOS
          </Text>
          <Text className="text-gray-400 text-sm">
            Instantly alert emergency services and your trusted contacts when you’re in danger.
          </Text>
        </View>

        <View className="bg-zinc-900 p-5 rounded-xl">
          <Text className="text-white text-lg font-semibold mb-1">
            🛰️ Real-time Tracking
          </Text>
          <Text className="text-gray-400 text-sm">
            Let your friends and family follow your ride live, from pickup to drop-off.
          </Text>
        </View>

        <View className="bg-zinc-900 p-5 rounded-xl">
          <Text className="text-white text-lg font-semibold mb-1">
            👩‍💼 24/7 In-App Support
          </Text>
          <Text className="text-gray-400 text-sm">
            Get help quickly through our built-in chat, with dedicated agents always ready to assist.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
