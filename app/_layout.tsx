

"use client"

import { Stack } from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import * as Font from "expo-font"
import { useEffect, useState } from "react"
import { View } from "react-native"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { AuthProvider, useAuth } from "@/contexts/AuthContext" // Corrected path to context

SplashScreen.preventAutoHideAsync()

function Navigator() {
  const { isLoading, token } = useAuth()

  // Wait for auth to finish initializing and fonts to load before hiding splash screen
  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync()
    }
  }, [isLoading])

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Public routes */}
      <Stack.Screen name="(auth)" />
      {/* Protected root tabs */}
      <Stack.Protected guard={!!token}>
        <Stack.Screen name="(root)" />
      </Stack.Protected>
      {/* Fallback for any unmatched routes */}
      <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
    </Stack>
  )
}

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        await Font.loadAsync({
          "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
        })
      } catch (e) {
        console.warn(e)
      } finally {
        setFontsLoaded(true)
      }
    })()
  }, [])

  if (!fontsLoaded) {
    // Render a blank view or a custom loading component while fonts are loading
    return <View style={{ flex: 1, backgroundColor: "#fff" }} />
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <Navigator />
      </AuthProvider>
    </GestureHandlerRootView>
  )
}
