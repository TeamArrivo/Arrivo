"use client"
import { useState } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Platform,
  Dimensions,
  Modal,
  Pressable,
  useColorScheme,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useRouter } from "expo-router"
import { useLocationStore } from "@/stores/useLocationStore"

const { height } = Dimensions.get("window")

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [modalText, setModalText] = useState("")
  const router = useRouter()
  const { destination } = useLocationStore()
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  const handlePress = () => {
    Keyboard.dismiss()
    router.push("/bookride")
  }

  return (
    <GestureHandlerRootView className="flex-1">
      <View className={`flex-1 px-4 ${Platform.OS === "ios" ? "pt-12" : "pt-5"} ${isDark ? "bg-black" : "bg-gray-50"}`}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Premium Search Input */}
          <View
            className={`mt-16 mb-4 flex-row items-center rounded-xl bg-white dark:bg-[#1c1c1e] px-4 py-3 shadow-md ${
              isDark ? "shadow-black/30 border-0" : "shadow-black/10 border border-gray-200"
            }`}
          >
            <Ionicons name="search" size={20} color={isDark ? "#ffffff" : "#1f2937"}  />
            <TouchableOpacity onPress={handlePress} activeOpacity={1} className="ml-2 flex-1 h-10 justify-center">
              <Text
                className={`text-lg ${searchText ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}
              >
                {searchText || "Where would you like to go?"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="ml-3">
              <Ionicons name="time-outline" size={20} color={isDark ? "#ffffff" : "#1f2937"}  />
            </TouchableOpacity>
          </View>

          {/* Recent Destination */}
          {destination && (
            <TouchableOpacity
              className={`mb-4 flex-row items-center rounded-xl bg-white dark:bg-gray-500 p-4 shadow-sm ${
                isDark ? "shadow-black/30 border-0" : "shadow-black/10 border border-gray-200"
              }`}
            >
              <Ionicons name="time" size={20} color={isDark ? "#ffffff" : "#1f2937"}  />
              <View className="ml-4">
                <Text className="text-sm font-semibold text-gray-900 dark:text-white">{destination.name}</Text>
                <Text className="text-xs text-gray-600 dark:text-white">
                  {destination.address.length > 45 ? `${destination.address.slice(0, 45)}...` : destination.address}
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Services */}
          <Text className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Your Premium Ride Options</Text>
          <View className="mb-6 flex-row justify-between">
            {[
              { label: "Luxury Ride", icon: "car-outline" as const, type: "go" },
              { label: "Group Travel", icon: "people-outline" as const, type: "group" },
              { label: "Arrivo Courier", icon: "cube-outline" as const, type: "courier" },
            ].map((item) => (
              <View key={item.label} className="items-center">
                <Pressable
                  onPress={() => {
                    if (item.type === "go") {
                      router.push("/bookride")
                    } else if (item.type === "courier") {
                      router.push("/bookride?type=courier") // Navigate with type param
                    } else {
                      setModalText(`${item.label} coming soon to Arrivo.`)
                      setModalVisible(true)
                    }
                  }}
                  className={`mb-2 rounded-full p-4 shadow-md ${
                    isDark
                      ? "bg-neutral-700 shadow-black/30 border-0"
                      : "bg-gray-50 shadow-black/10 border border-gray-200"
                  }`}
                >
                  <Ionicons name={item.icon} size={24} color={isDark ? "#ffffff" : "#1f2937"}  />
                </Pressable>
                <Text className="text-center text-xs text-gray-900 dark:text-white">{item.label}</Text>
              </View>
            ))}
          </View>

          {/* Premium Promo Card */}
          <TouchableOpacity className="mb-8 flex-row items-center justify-between rounded-2xl bg-green-500 p-6 shadow-lg shadow-black/20">
            <View className="w-3/5">
              <Text className="mb-1 text-xl font-bold text-white">Same-Day Delivery, Arrivo Style</Text>
              <TouchableOpacity
                className={`mt-1 w-32 rounded-2xl px-3 py-1 ${isDark ? "bg-neutral-700" : "bg-white/20"}`}
                onPress={() => router.push("/bookride?type=courier")} // Navigate with type param
              >
                <Text className="text-center text-sm text-white">Send a Package</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          {/* Arrivo for Business */}
          <Text className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">Arrivo for Business</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row gap-4">
              <TouchableOpacity
                className={`w-64 rounded-2xl overflow-hidden shadow-lg ${
                  isDark ? "bg-neutral-800 shadow-black/30 border-0" : "bg-white shadow-black/10 border border-gray-200"
                }`}
                onPress={() => router.push("/support")}
              >
                <View className="flex-center h-32 bg-blue-600">
                  <Ionicons name="shield-checkmark-outline" size={40} color="white" />
                </View>
                <View className="p-4">
                  <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-white">Executive Safety</Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-400">Real-time support during rides</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                className={`w-64 rounded-2xl overflow-hidden shadow-lg ${
                  isDark ? "bg-neutral-800 shadow-black/30 border-0" : "bg-white shadow-black/10 border border-gray-200"
                }`}
                onPress={() => router.push("/about")}
              >
                <View className="flex-center h-32 bg-purple-600">
                  <Ionicons name="information-circle-outline" size={40} color="white" />
                </View>
                <View className="p-4">
                  <Text className="mb-1 text-base font-semibold text-gray-900 dark:text-white">More About Arrivo</Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-400">
                    Our promise of excellence and service
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Modal for Coming Soon */}
          <Modal transparent animationType="fade" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
            <View className="flex-1 items-center justify-center bg-black/70 px-6 dark:bg-black/70">
              <View
                className={`w-full max-w-xs items-center rounded-2xl p-6 ${
                  isDark ? "bg-neutral-800 border-0" : "bg-white border border-gray-200"
                } shadow-xl shadow-black/30`}
              >
                <Ionicons name="information-circle-outline" size={40} color="#4fbcff" className="mb-3" />
                <Text className="mb-5 text-center text-base leading-6 text-gray-900 dark:text-white">{modalText}</Text>
                <Pressable onPress={() => setModalVisible(false)} className="rounded-lg bg-sky-500 px-5 py-2">
                  <Text className="text-base font-semibold text-white">OK</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  )
}
