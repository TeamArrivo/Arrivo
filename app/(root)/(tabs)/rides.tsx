

import React, { useState } from "react"
import { View, Text, FlatList, TouchableOpacity, RefreshControl } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRideStore, type Ride } from "@/stores/useRideStore"

export default function Rides() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming")

  const [refreshing, setRefreshing] = useState(false)

  const { rides, getRidesByStatus } = useRideStore()

  // Get rides based on active tab
  const upcomingRides = getRidesByStatus("upcoming")
  const pastRides = [...getRidesByStatus("completed"), ...getRidesByStatus("cancelled")]

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }, [])

  const formatRideStatus = (status: Ride["status"]) => {
    switch (status) {
      case "upcoming":
        return { text: "Upcoming", color: "text-blue-400" }
      case "completed":
        return { text: "Completed", color: "text-green-400" }
      case "cancelled":
        return { text: "Cancelled", color: "text-red-400" }
      default:
        return { text: status, color: "text-gray-400" }
    }
  }

  const renderRide = ({ item }: { item: Ride }) => {
    const statusInfo = formatRideStatus(item.status)

    return (
      <TouchableOpacity className="bg-gray-100 p-4 rounded-xl mb-4 border border-gray-200 shadow-sm dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-none">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1">
            <Text className="text-gray-900 font-bold text-lg mb-1 dark:text-white">
              {item.from} → {item.to}
            </Text>
            <Text className="text-gray-900 font-bold text-lg mb-1 dark:text-white">
              {item.date} | {item.time}
            </Text>
          </View>
          <View className="items-end">
            {item.fare && <Text className="text-green-600 font-bold text-lg mb-1 dark:text-green-400">{item.fare}</Text>}
            <Text className={`text-xs font-medium ${statusInfo.color}`}>{statusInfo.text}</Text>
          </View>
        </View>

        <View className="flex-row items-center justify-between mt-3 border-t border-gray-200 pt-3 dark:border-neutral-800">
          <View className="flex-row items-center">
            <Ionicons name={item.rideType === "go" ? "car" : "cube"} size={16} className="text-gray-500" />
            <Text className="ml-2 capitalize text-sm text-gray-600 dark:text-gray-400">{item.rideType}</Text>
          </View>

          {item.estimatedTime && (
            <View className="flex-row items-center">
              <Ionicons name="time" size={16} color="#888888" />
              <Text className="text-gray-400 text-sm ml-1">{item.estimatedTime}</Text>
            </View>
          )}
        </View>

        {item.driver && (
          <View className="mt-3 border-t border-gray-200 pt-3 dark:border-neutral-800">
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              Driver: {item.driver.name} ⭐ {item.driver.rating}
            </Text>
            <Text className="text-gray-500 text-xs">
              {item.driver.vehicleInfo.make} {item.driver.vehicleInfo.model} • {item.driver.vehicleInfo.plateNumber}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    )
  }

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center py-20">
      <Ionicons name={activeTab === "upcoming" ? "car-outline" : "time-outline"} size={64} color="#555555" />
      <Text className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-400">No {activeTab} rides</Text>
      <Text className="mt-2 px-8 text-center text-sm text-gray-500">
        {activeTab === "upcoming"
          ? "Book your first ride to see it here"
          : "Your completed and cancelled rides will appear here"}
      </Text>
    </View>
  )

  const currentRides = activeTab === "upcoming" ? upcomingRides : pastRides

  return (
    <View className="flex-1 bg-white p-5 dark:bg-black ">
      <View className="flex-row items-center justify-between mb-6 mt-20">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">My Rides</Text>
        <View className="rounded-full bg-gray-200 px-3 py-1 dark:bg-neutral-800">
          <Text className="text-sm font-medium text-gray-800 dark:text-white">{rides.length} total</Text>
        </View>
      </View>

      {/* Tabs */}
      <View className="mb-6 flex-row rounded-xl bg-gray-100 p-1 dark:bg-neutral-900">
        <TouchableOpacity
          onPress={() => setActiveTab("upcoming")}
          className={`flex-1 py-3 rounded-lg items-center ${
            activeTab === "upcoming" ? "bg-[#6EBF36]" : "bg-transparent"
          }`}
        >
          <Text
            className={`font-medium ${activeTab === "upcoming" ? "text-white" : "text-gray-600 dark:text-gray-400"}`}
          >
            Upcoming ({upcomingRides.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("past")}
          className={`flex-1 py-3 rounded-lg items-center ${activeTab === "past" ? "bg-[#6EBF36]" : "bg-transparent"}`}
        >
          <Text className={`font-medium ${activeTab === "past" ? "text-white" : "text-gray-600 dark:text-gray-400"}`}>
            Past ({pastRides.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Ride List */}
      <FlatList
        data={currentRides}
        keyExtractor={(item) => item.id}
        renderItem={renderRide}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#ffffff" colors={["#2563EB"]} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={currentRides.length === 0 ? { flex: 1 } : {}}
      />
    </View>
  )
}

