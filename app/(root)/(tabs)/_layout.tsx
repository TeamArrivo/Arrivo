// "use client"

// import { useEffect, useState } from "react"
// import { Tabs } from "expo-router"
// import { GestureHandlerRootView } from "react-native-gesture-handler"
// import { Image, View, Text } from "react-native"
// import AsyncStorage from "@react-native-async-storage/async-storage"

// // Assuming these are your local image assets
// import home from "@/assets/icons copy/home.png"
// import list from "@/assets/icons copy/list.png"
// import profile from "@/assets/icons copy/profile.png"

// const TabIcon = ({
//   source,
//   focused,
//   label,
//   darkMode,
// }: { source: any; focused: boolean; label: string; darkMode: boolean }) => (
//   <View className="items-center justify-center">
//     <View
//       className={`w-12 h-12 rounded-full items-center justify-center ${
//         focused ? "bg-[#6EBF36]" : darkMode ? "bg-gray-800" : "bg-gray-200"
//       }`}
//     >
//       <Image
//         source={source}
//         resizeMode="contain"
//         className="w-7 h-7"
//         // You might need to add tintColor here if your icons are monochrome and need to change color
//         // tintColor={focused ? 'white' : darkMode ? 'white' : 'black'}
//       />
//     </View>
//     <Text
//       className={`text-xs mt-1 ${focused ? "text-white font-semibold" : darkMode ? "text-gray-400" : "text-gray-600"}`}
//     >
//       {label}
//     </Text>
//   </View>
// )

// export default function RiderTabsLayout() {
//   const [darkMode, setDarkMode] = useState(false)

//   useEffect(() => {
//     const loadTheme = async () => {
//       const theme = await AsyncStorage.getItem("app_theme")
//       if (theme === "dark") {
//         setDarkMode(true)
//       } else {
//         setDarkMode(false)
//       }
//     }
//     loadTheme()
//     // You might want to add an event listener here if the theme can change while this component is mounted
//     // For example, if setAppTheme dispatches an event or updates a global state.
//   }, [])

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Tabs
//         initialRouteName="home"
//         screenOptions={{
//           headerShown: false,
//           tabBarShowLabel: false,
//           tabBarStyle: {
//             backgroundColor: darkMode ? "#1a1a1a" : "#ffffff", // Darker background for dark mode, white for light mode
//             height: 90,
//             paddingBottom: 40,
//             overflow: "hidden",
//             marginTop: 0,
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexDirection: "row",
//             borderTopWidth: 0, // Remove default border if any
//             elevation: 0, // Remove shadow on Android
//             shadowOpacity: 0, // Remove shadow on iOS
//           },
//         }}
//       >
//         <Tabs.Screen
//           name="home"
//           options={{
//             tabBarIcon: ({ focused }) => <TabIcon source={home} focused={focused} label="Home" darkMode={darkMode} />,
//           }}
//         />
//         <Tabs.Screen
//           name="rides"
//           options={{
//             tabBarIcon: ({ focused }) => <TabIcon source={list} focused={focused} label="Rides" darkMode={darkMode} />,
//           }}
//         />
//         <Tabs.Screen
//           name="profile"
//           options={{
//             tabBarIcon: ({ focused }) => (
//               <TabIcon source={profile} focused={focused} label="Profile" darkMode={darkMode} />
//             ),
//           }}
//         />
//       </Tabs>
//     </GestureHandlerRootView>
//   )
// }

import { Tabs } from "expo-router"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import home from "@/assets/icons copy/home.png"
import list from "@/assets/icons copy/list.png"
import profile from "@/assets/icons copy/profile.png"
import { Image, View, Text, useColorScheme } from "react-native"

const TabIcon = ({ source, focused, label, theme }: { source: any; focused: boolean; label: string; theme: any }) => (
  <View className="items-center justify-center w-20">
    <View className={`w-12 h-12 rounded-full items-center justify-center ${focused ? "bg-[#6EBF36]" : ""}`}>
      <Image 
        source={source} 
        resizeMode="contain" 
        className="w-7 h-7" 
        style={{
          tintColor: focused 
            ? '#ffffff' // White when focused (on green background)
            : theme.tabBar.iconUnfocusedColor // Themed color when unfocused
        }}
      />
    </View>
    <Text 
      className={`text-xs mt-1 text-center ${focused ? theme.tabBar.labelFocusedText : theme.tabBar.labelUnfocusedText}`}
      numberOfLines={1}
      adjustsFontSizeToFit={true}
      minimumFontScale={0.8}
    >
      {label}
    </Text>
  </View>
)

export default function RiderTabsLayout() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"
  
  const theme = {
    tabBar: {
      background: isDark ? "#2c2c2e" : "#ffffff", // Dark gray for dark mode, white for light mode
      iconFocusedBg: "#6EBF36", // Green accent, remains constant
      iconUnfocusedColor: isDark ? "#9ca3af" : "#4b5563", // Light gray for dark mode, darker gray for light mode
      labelFocusedText: isDark ? "text-white font-semibold" : "text-gray-800 font-semibold", // White for dark, darker gray for light
      labelUnfocusedText: isDark ? "text-gray-400" : "text-gray-500", // Lighter gray for dark, medium gray for light
    },
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        initialRouteName="home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false, // still false because we're using custom label inside TabIcon
          tabBarStyle: {
            backgroundColor: theme.tabBar.background, // Apply themed background color
            height: 90,
            paddingBottom: 40,
            overflow: "hidden",
            marginTop: 0,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ focused }) => <TabIcon source={home} focused={focused} label="Home" theme={theme} />,
          }}
        />
        <Tabs.Screen
          name="rides"
          options={{
            tabBarIcon: ({ focused }) => <TabIcon source={list} focused={focused} label="Rides" theme={theme} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ focused }) => <TabIcon source={profile} focused={focused} label="Profile" theme={theme} />,
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  )
}