


"use client"

import type React from "react"
import { useCallback, useEffect, useState } from "react"
import { View, Text, ScrollView, TouchableOpacity, Switch, ActivityIndicator, Alert } from "react-native"
import { Ionicons, Feather } from "@expo/vector-icons"
import { useFocusEffect, useRouter } from "expo-router"
import * as SecureStore from "expo-secure-store"
import api from "@/app/api/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { setAppTheme } from "@/components/ui/theme"
import { SafeAreaView } from "react-native-safe-area-context"

interface UserDto {
  id: number
  fullName: string
  email: string
  phoneNumber?: string
}

const ProfileScreen: React.FC = () => {
  const [name, setName] = useState<string | null>(null)
  const [rating, setRating] = useState<number>(0) // Assuming rating comes from somewhere, currently hardcoded to 0
  const [loading, setLoading] = useState(true)
  const [riderId, setRiderId] = useState<number | null>(null)
  const [darkMode, setDarkMode] = useState(false)
  const router = useRouter()

  useEffect(() => {
    AsyncStorage.getItem("app_theme").then((theme) => {
      if (theme === "dark") {
        setDarkMode(true)
      }
    })
  }, [])

  const toggleTheme = async (value: boolean) => {
    setDarkMode(value)
    await setAppTheme(value ? "dark" : "light")
  }

  useFocusEffect(
    useCallback(() => {
      const loadProfile = async () => {
        try {
          const { data: user }: { data: UserDto } = await api.get("/auth/me")
          setName(user.fullName ?? "Guest")
          setRiderId(user.id)
          // If rating is part of UserDto or another API call, fetch it here
          // For now, keeping it at 0 as per original code
        } catch (error) {
          console.error("Failed to load profile", error)
          setName("Guest") // fallback name
          Alert.alert("Error", "Unable to load profile.")
        } finally {
          setLoading(false)
        }
      }
      loadProfile()
    }, []), // The useCallback hook memoizes the loadProfile function [^2].
  )

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token")
    router.replace("/(auth)/sign-in")
    Alert.alert("Logged out", "You have been logged out successfully.")
  }

  const handleDeleteAccount = () => {
    if (!riderId) return
    Alert.alert("Confirm Deletion", "Are you sure you want to delete your account? This action is irreversible.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/riders/${riderId}`)
            await SecureStore.deleteItemAsync("token")
            router.replace("/(auth)/sign-up")
            Alert.alert("Account deleted", "Your account was deleted successfully.")
          } catch (err) {
            console.error("Failed to delete account", err)
            Alert.alert("Error", "Account deletion failed. Please try again later.")
          }
        },
      },
    ])
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <ScrollView className="flex-1">
        <View className="px-5">
          {/* Wrapper for consistent horizontal padding */}
          <View className="items-center mb-12 mt-14">
            <View className="bg-gray-300 dark:bg-gray-600 rounded-full w-24 h-24 flex items-center justify-center">
              <Ionicons name="person" size={50} color={darkMode ? "white" : "black"} />
            </View>
            {loading ? (
              <ActivityIndicator className="mt-4" size="large" color={darkMode ? "white" : "black"} />
            ) : (
              <>
                <Text className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">{name}</Text>
                <Text className="text-base text-gray-600 dark:text-gray-400 mt-1">⭐ {rating.toFixed(2)}</Text>
              </>
            )}
          </View>
          {/* Account Section */}
          <SectionTitle title="Account" darkMode={darkMode} />
          <MenuItem
            icon="user"
            label="Edit Profile"
            onPress={() => {
              router.push("/EditProfileScreen")
            }}
            darkMode={darkMode}
          />
          
          {/* Preferences Section */}
          <SectionTitle title="Preferences" darkMode={darkMode} />
          <View className="flex-row justify-between items-center py-4 mb-4 border-b border-gray-200 dark:border-gray-700">
            <View className="flex-row items-center">
              <Feather name="sun" size={20} color={darkMode ? "white" : "black"} />
              <Text className="ml-3 text-gray-900 dark:text-white">Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={darkMode ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
            />
          </View>
          {/* Actions Section */}
          <SectionTitle title="Actions" darkMode={darkMode} />
          <MenuItem icon="log-out" label="Log Out" onPress={handleLogout} darkMode={darkMode} />
          <MenuItem
            icon="trash-2"
            label="Delete Account"
            onPress={handleDeleteAccount}
            isDestructive={true}
            darkMode={darkMode}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

type MenuItemProps = {
  icon: React.ComponentProps<typeof Feather>["name"]
  label: string
  value?: string
  onPress?: () => void
  isDestructive?: boolean
  darkMode: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, value, onPress, isDestructive = false, darkMode }) => (
  <TouchableOpacity
    className="flex-row justify-between items-center py-4 border-b border-gray-200 dark:border-gray-700"
    onPress={onPress}
    activeOpacity={onPress ? 0.7 : 1}
  >
    <View className="flex-row items-center">
      <Feather name={icon} size={20} color={isDestructive ? "red" : darkMode ? "white" : "black"} />
      <Text className={`ml-3 ${isDestructive ? "text-red-500" : "text-gray-900 dark:text-white"}`}>{label}</Text>
    </View>
    <View className="flex-row items-center">
      {value && <Text className="text-gray-500 dark:text-gray-400 mr-2">{value}</Text>}
      {onPress && <Feather name="chevron-right" size={20} color={darkMode ? "#a0a0a0" : "#a0a0a0"} />}
    </View>
  </TouchableOpacity>
)

type SectionTitleProps = {
  title: string
  darkMode: boolean
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, darkMode }) => (
  <Text className={`mt-6 mb-2 font-semibold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>{title}</Text>
)

export default ProfileScreen