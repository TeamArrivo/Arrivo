import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AboutArrivo() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-white px-6 pt-16 dark:bg-black">
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.push('/')}
        className="absolute top-14 left-6 z-10"
      >
        <Ionicons name="arrow-back" size={28}  className="text-black dark:text-white"/>
      </TouchableOpacity>

      {/* Header Section */}
      <View className="items-center mt-4 mb-8">
        <Ionicons name="information-circle-outline" size={48} color="#60a5fa" />
        <Text className="text-gray-900 dark:text-white text-2xl font-bold mt-4 text-center">
          About Arrivo
        </Text>
        <Text className="text-gray-400 text-base text-center mt-2 leading-relaxed text-gray-600 dark:text-gray-400">
          Arrivo is built to deliver luxury ride experiences and secure package delivery with
          speed, safety, and elegance.
        </Text>
      </View>

      {/* Vision / Mission */}
      <View className="space-y-6">
        <View className="dark:bg-zinc-900 dark:shadow-none p-5 rounded-xl bg-gray-100 mb-4">
          <Text className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">🌍 Our Vision</Text>
          <Text className="text-sm text-gray-700 dark:text-gray-400">
            Redefine urban mobility through innovation, efficiency, and trust. From rides to
            deliveries, we ensure every experience is seamless.
          </Text>
        </View>

        <View className="dark:bg-zinc-900 dark:shadow-none p-5 rounded-xl bg-gray-100 mb-4">
          <Text className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">🤝 Our Commitment</Text>
          <Text className="text-sm text-gray-700 dark:text-gray-400">
            We're committed to safety, user empowerment, and modern transport infrastructure
            built for tomorrow's cities.
          </Text>
        </View>

        <View className="dark:bg-zinc-900 dark:shadow-none p-5 rounded-xl bg-gray-100">
          <Text className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">🚗 Services You Can Trust</Text>
          <Text className="text-sm text-gray-700 dark:text-gray-400">
            Whether it’s a premium ride or a same-day package drop-off, Arrivo delivers with
            confidence, every time.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
