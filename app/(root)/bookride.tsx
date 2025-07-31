"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Keyboard,
  Dimensions,
  useColorScheme, // Import useColorScheme
} from "react-native"
import * as Location from "expo-location"
import MapView, { type Region, Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps"
import { useLocalSearchParams, useRouter } from "expo-router"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { Ionicons } from "@expo/vector-icons"
import polyline from "@mapbox/polyline"

import { useLocationStore } from "@/stores/useLocationStore"
import { usePaymentStore } from "@/stores/usePaymentStore"
import { useRideStore } from "@/stores/useRideStore"
import { useChatStore } from "@/stores/useChatStore"
import darkMapStyle from "@/app/styles/darkMapStyle" // Assuming this is a JSON array for dark mode

// Types (keep existing types)
type RideStatus =
  | "idle"
  | "searching"
  | "driver_assigned"
  | "driver_arriving"
  | "in_progress"
  | "completed"
  | "cancelled"
type RideType = "go" | "courier"

interface PlaceSuggestion {
  name: string
  description: string
  placeId: string
}

interface LocationCoords {
  latitude: number
  longitude: number
}

interface Driver {
  id: string
  latitude: number
  longitude: number
  name?: string
  rating?: number
  vehicleInfo?: {
    make: string
    model: string
    plateNumber: string
  }
}

// Constants
const GOOGLE_API_KEY = "AIzaSyB17GrmMGL9Wc-uYI0BbqXguvLpZxLaAbY" // Replace with your actual API key
const { width: SCREEN_WIDTH } = Dimensions.get("window")

export default function BookRideScreen() {
  // State variables

    const { type } = useLocalSearchParams() // Get query parameters
  const initialRideType: RideType = type === "courier" ? "courier" : "go"
  const [region, setRegion] = useState<Region | null>(null)
  const [currentLocation, setCurrentLocation] = useState<LocationCoords | null>(null)
  const [currentAddress, setCurrentAddress] = useState("")
  const [destinationCoords, setDestinationCoords] = useState<LocationCoords | null>(null)
  const [destination, setDestination] = useState<string | null>(null)
  const [searchText, setSearchText] = useState("")
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [rideStatus, setRideStatus] = useState<RideStatus>("idle")
  const [selectedRideType, setSelectedRideType] = useState<RideType>("go")
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null)
  const [estimatedTime, setEstimatedTime] = useState<string | null>(null)
  const [nearbyDrivers, setNearbyDrivers] = useState<Driver[]>([])
  const [assignedDriver, setAssignedDriver] = useState<Driver | null>(null)
  const [driverLocation, setDriverLocation] = useState<LocationCoords | null>(null)
  const [routeCoords, setRouteCoords] = useState<LocationCoords[]>([])
  const [routeDistance, setRouteDistance] = useState<number | null>(null)
  const [routeDuration, setRouteDuration] = useState<number | null>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const [isConfirmingRide, setIsConfirmingRide] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [currentRideId, setCurrentRideId] = useState<string | null>(null)

  // Store references
  const { selectedPaymentMethod } = usePaymentStore()
  const { addRide, updateRideStatus } = useRideStore()
  const { setCurrentRideId: setChatRideId, clearMessagesForRide, addMessage } = useChatStore()

  // Refs
  const sheetRef1 = useRef<BottomSheet>(null)
  const sheetRef2 = useRef<BottomSheet>(null)
  const sheetRef3 = useRef<BottomSheet>(null)
  const whereToInputRef = useRef<TextInput>(null)
  const mapRef = useRef<MapView>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const searchTimeoutRef = useRef<number | null>(null)

  const router = useRouter()
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  // Theme definition
  const theme = {
    background: isDark ? "#000000" : "#f8f9fa",
    cardBackground: isDark ? "#1a1a1a" : "#ffffff",
    text: isDark ? "#ffffff" : "#1a1a1a",
    subText: isDark ? "#a1a1aa" : "#6b7280",
    inputBackground: isDark ? "#2c2c2e" : "#e9ecef",
    inputPlaceholder: isDark ? "#888888" : "#adb5bd",
    border: isDark ? "#374151" : "#e5e7eb",
    accent: "#3b82f6", // Primary accent blue
    selectedRideBg: "#3b82f6", // Blue for selected ride type
    selectedRideText: "white",
    unselectedRideBg: isDark ? "#2c2c2e" : "#f1f3f4",
    unselectedRideText: isDark ? "#ffffff" : "#1a1a1a",
    warningBg: "rgba(239, 68, 68, 0.1)", // Red with opacity
    warningBorder: "#ef4444", // Red border
    warningText: "#ef4444", // Red text
    buttonPrimaryBg: "#3b82f6", // Blue button
    buttonPrimaryText: "white",
    buttonSecondaryBg: isDark ? "#2c2c2e" : "#e9ecef",
    buttonSecondaryText: isDark ? "#ffffff" : "#1a1a1a",
    buttonDisabledBg: isDark ? "#4b5563" : "#ced4da",
    buttonDisabledText: isDark ? "#a1a1aa" : "#6b7280",
    shadow: isDark ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)",
    driverMarkerBg: "#22c55e", // Green for nearby drivers
    assignedDriverMarkerBg: "#3b82f6", // Blue for assigned driver
    cancelButtonBg: "#dc2626", // Red for cancel
    completeButtonBg: "#16a34a", // Green for complete
    chatButtonBg: "#3b82f6", // Blue for chat
    unreadBadgeBg: "#ef4444", // Red for unread badge
  }

  // Snap points for bottom sheets
  const snapPoints1 = useMemo(() => ["25%", "50%", "85%"], [])
  const snapPoints2 = useMemo(() => ["45%", "70%"], [])
  const snapPoints3 = useMemo(() => ["30%", "60%"], [])

  // Effects
  useEffect(() => {
    initializeLocation()
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

    useEffect(() => {
    if (type === "courier") {
      setSelectedRideType("courier")
    } else {
      setSelectedRideType("go")
    }
  }, [type])

  useEffect(() => {
    if (currentLocation) {
      fetchNearbyDrivers()
    }
  }, [currentLocation])

  useEffect(() => {
    if (currentLocation && destinationCoords) {
      calculateRoute(currentLocation, destinationCoords)
    }
  }, [currentLocation, destinationCoords])

  // Mock unread message count for chat
  useEffect(() => {
    const timer = setTimeout(() => {
      setUnreadCount((prev) => prev + 1)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])

  // Functions
  const initializeLocation = async () => {
    try {
      setIsLoadingLocation(true)
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        Alert.alert("Location Permission Required", "Please enable location access to use this feature.", [
          { text: "OK", onPress: () => router.back() },
        ])
        return
      }
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      })
      const coords = location.coords
      const newRegion: Region = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
      setCurrentLocation({ latitude: coords.latitude, longitude: coords.longitude })
      setRegion(newRegion)
      const addresses = await Location.reverseGeocodeAsync(coords)
      if (addresses.length > 0) {
        const addr = addresses[0]
        const formattedAddress = [addr.name, addr.street, addr.city, addr.region].filter(Boolean).join(", ")
        setCurrentAddress(formattedAddress)
      }
    } catch (error) {
      console.error("Location initialization error:", error)
      Alert.alert("Location Error", "Unable to get your current location. Please try again.", [
        { text: "Retry", onPress: initializeLocation },
        { text: "Cancel", onPress: () => router.back() },
      ])
    } finally {
      setIsLoadingLocation(false)
    }
  }

  const fetchNearbyDrivers = async () => {
    if (!currentLocation) return
    try {
      // Simulate fetching nearby drivers from an API
      const mockDrivers: Driver[] = [
        {
          id: "driver1",
          latitude: currentLocation.latitude + 0.001,
          longitude: currentLocation.longitude + 0.001,
          name: "John Doe",
          rating: 4.8,
          vehicleInfo: {
            make: "Toyota",
            model: "Camry",
            plateNumber: "ABC-123",
          },
        },
        {
          id: "driver2",
          latitude: currentLocation.latitude - 0.0012,
          longitude: currentLocation.longitude - 0.001,
          name: "Jane Smith",
          rating: 4.9,
          vehicleInfo: {
            make: "Honda",
            model: "Civic",
            plateNumber: "XYZ-789",
          },
        },
      ]
      setNearbyDrivers(mockDrivers)
    } catch (error) {
      console.error("Error fetching nearby drivers:", error)
    }
  }

  const handleConfirmRide = async () => {
    if (!currentLocation || !destinationCoords) {
      Alert.alert("Error", "Please select a destination first.")
      return
    }
    if (!selectedPaymentMethod) {
      Alert.alert("Payment Method Required", "Please select a payment method before confirming your ride.", [
        { text: "OK" },
      ])
      return
    }

    try {
      setIsConfirmingRide(true)
      setRideStatus("searching")

      // Generate unique ride ID
      const rideId = `ride_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      setCurrentRideId(rideId)
      setChatRideId(rideId) // Set the current ride ID in chat store

      // Create and save the ride to store
      const newRide = {
        id: rideId, // Pass the generated ID to the store
        from: "Current Location",
        fromAddress: currentAddress,
        to: destination || "Destination",
        toAddress: destination || "Selected destination",
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        fare: `₵${estimatedPrice?.toFixed(2) || "15.50"}`,
        status: "upcoming" as const,
        rideType: selectedRideType,
        estimatedTime: estimatedTime || "8 min",
        distance: routeDistance || 0,
      }
      addRide(newRide)

      sheetRef2.current?.close()
      setTimeout(() => {
        sheetRef3.current?.snapToIndex(1)
      }, 300)

      // Mock driver assignment
      setTimeout(() => {
        const assignedDriver = nearbyDrivers[0]
        if (assignedDriver) {
          setAssignedDriver(assignedDriver)
          setDriverLocation({
            latitude: assignedDriver.latitude,
            longitude: assignedDriver.longitude,
          })
          setRideStatus("driver_assigned")
          // Add initial driver message when driver is assigned
          addMessage({
            rideId: rideId, // Ensure rideId is passed
            text: `Hi! I'm ${assignedDriver.name}, your driver. I'm on my way to pick you up. I'll be there in about 5 minutes.`,
            sender: "driver",
            timestamp: new Date(),
          })

        }
      }, 3000)
    } catch (error) {
      console.error("Confirm ride error:", error)
      Alert.alert("Error", "Failed to confirm ride. Please try again.")
    } finally {
      setIsConfirmingRide(false)
    }
  }

  const handleStartRide = () => {
    setRideStatus("in_progress")
    if (currentLocation && destinationCoords) {
      calculateRoute(currentLocation, destinationCoords)
    }
    // Add message when ride starts
    if (currentRideId) {
      addMessage({
        rideId: currentRideId, // Ensure rideId is passed
        text: "Great! I can see you. Let's start the ride to your destination.",
        sender: "driver",
        timestamp: new Date(),
      })
    }
  }

  const handleCompleteRide = () => {
    Alert.alert("Complete Ride", "Has the ride been completed successfully?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        onPress: () => {
          setRideStatus("completed")
          // Update ride status in store
          if (currentRideId) {
            updateRideStatus(currentRideId, "completed")
            // Add final message before clearing
            addMessage({
              rideId: currentRideId, // Ensure rideId is passed
              text: "Thank you for riding with us! Your ride has been completed. Have a great day!",
              sender: "driver",
              timestamp: new Date(),
            })
            // Clear messages for this completed ride after a short delay to show the final message
            setTimeout(() => {
              if (currentRideId) {
                clearMessagesForRide(currentRideId)
              }
            }, 2000)
          }
          // Show completion message
          Alert.alert(
            "Ride Completed!",
            "Thank you for using our service. Your ride has been completed successfully.",
            [
              {
                text: "View Rides",
                onPress: () => {
                  resetRideState()
                  router.push("/rides")
                },
              },
              {
                text: "Book Another",
                onPress: () => {
                  resetRideState()
                },
              },
            ],
          )
        },
      },
    ])
  }

  const resetRideState = () => {
    setRideStatus("idle")
    setAssignedDriver(null)
    setDriverLocation(null)
    setRouteCoords([])
    setDestination(null)
    setDestinationCoords(null)
    setSearchText("")
    setCurrentRideId(null)
    setChatRideId(null) // Clear chat ride context
    setUnreadCount(0) // Reset unread count
    sheetRef3.current?.close()
    setTimeout(() => {
      sheetRef1.current?.snapToIndex(0)
    }, 300)
  }

  const handleCancelRide = () => {
    Alert.alert("Cancel Ride", "Are you sure you want to cancel this ride?", [
      { text: "No", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          setRideStatus("cancelled")
          // Update ride status in store and clear messages
          if (currentRideId) {
            updateRideStatus(currentRideId, "cancelled")
            clearMessagesForRide(currentRideId) // Clear messages for cancelled ride
          }
          resetRideState()
        },
      },
    ])
  }

  const handleSearchChange = useCallback((text: string) => {
    setSearchText(text)
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    if (text.length < 3) {
      setSuggestions([])
      return
    }
    setIsSearching(true)
    searchTimeoutRef.current = setTimeout(() => {
      searchPlaces(text)
    }, 300)
  }, [])

  const searchPlaces = async (query: string) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        query,
      )}&key=${GOOGLE_API_KEY}&components=country:gh&types=establishment|geocode`
      const response = await fetch(url)
      const data = await response.json()
      if (data.status === "OK") {
        const results: PlaceSuggestion[] = data.predictions.map((item: any) => ({
          name: item.structured_formatting.main_text,
          description: item.description,
          placeId: item.place_id,
        }))
        setSuggestions(results)
      } else {
        console.warn("Google Places API error:", data.status)
        setSuggestions([])
      }
    } catch (error) {
      console.error("Search places error:", error)
      setSuggestions([])
    } finally {
      setIsSearching(false)
    }
  }

  const fetchPlaceDetails = async (placeId: string): Promise<LocationCoords | null> => {
    try {
      const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GOOGLE_API_KEY}&fields=geometry,formatted_address`
      const response = await fetch(url)
      const data = await response.json()
      if (data.status === "OK" && data.result?.geometry?.location) {
        const location = data.result.geometry.location
        return {
          latitude: location.lat,
          longitude: location.lng,
        }
      }
      return null
    } catch (error) {
      console.error("Fetch place details error:", error)
      return null
    }
  }

  const handleSuggestionSelect = async (suggestion: PlaceSuggestion) => {
    try {
      const coords = await fetchPlaceDetails(suggestion.placeId)
      if (!coords) {
        Alert.alert("Error", "Unable to get location details. Please try another location.")
        return
      }
      setDestination(suggestion.name)
      setDestinationCoords(coords)
      setSearchText(suggestion.name)
      setSuggestions([])
      useLocationStore.getState().setDestination({
        name: suggestion.name,
        address: suggestion.description,
      })
      if (currentLocation && mapRef.current) {
        const minLat = Math.min(currentLocation.latitude, coords.latitude)
        const maxLat = Math.max(currentLocation.latitude, coords.latitude)
        const minLng = Math.min(currentLocation.longitude, coords.longitude)
        const maxLng = Math.max(currentLocation.longitude, coords.longitude)
        const latDelta = (maxLat - minLat) * 1.5
        const lngDelta = (maxLng - minLng) * 1.5
        mapRef.current.animateToRegion(
          {
            latitude: (minLat + maxLat) / 2,
            longitude: (minLng + maxLng) / 2,
            latitudeDelta: Math.max(latDelta, 0.01),
            longitudeDelta: Math.max(lngDelta, 0.01),
          },
          1000,
        )
      }
      sheetRef1.current?.close()
      setTimeout(() => {
        sheetRef2.current?.snapToIndex(1)
      }, 300)
    } catch (error) {
      console.error("Handle suggestion select error:", error)
      Alert.alert("Error", "Failed to select location. Please try again.")
    }
  }

  const calculateRoute = async (origin: LocationCoords, destination: LocationCoords) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${GOOGLE_API_KEY}&mode=driving`
      const response = await fetch(url)
      const data = await response.json()
      if (data.status === "OK" && data.routes.length > 0) {
        const route = data.routes[0]
        const leg = route.legs[0]
        const points = polyline.decode(route.overview_polyline.points)
        const coordinates = points.map(([lat, lng]: [number, number]) => ({
          latitude: lat,
          longitude: lng,
        }))
        setRouteCoords(coordinates)
        setRouteDistance(leg.distance.value)
        setRouteDuration(leg.duration.value)

        const pricePerKm = 2.5
        const baseFare = 5.0
        const distanceKm = leg.distance.value / 1000
        const estimatedCost = baseFare + distanceKm * pricePerKm
        setEstimatedPrice(Math.round(estimatedCost * 100) / 100)

        const minutes = Math.ceil(leg.duration.value / 60)
        setEstimatedTime(`${minutes} min`)
      } else {
        console.warn("Directions API error:", data.status)
      }
    } catch (error) {
      console.error("Calculate route error:", error)
    }
  }

  const handleSheetChange = useCallback((index: number) => {
    if (index === 2) {
      setTimeout(() => whereToInputRef.current?.focus(), 300)
    }
  }, [])

  const handlePayment = () => {
    router.push("/paymentMethod")
  }

  // Render loading state
  if (isLoadingLocation || !region) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.accent} />
        <Text style={{ color: theme.text, marginTop: 16, fontSize: 18 }}>Getting your location...</Text>
      </View>
    )
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        initialRegion={region}
        showsUserLocation
        showsMyLocationButton={false}
        customMapStyle={isDark ? darkMapStyle : []} // Apply dark style conditionally
        onPress={() => Keyboard.dismiss()}
        style={{ flex: 1 }}
        showsCompass={false}
        showsScale={false}
        showsBuildings={false}
        showsTraffic={false}
        showsIndoors={false}
      >
        {/* Nearby Drivers Markers */}
        {nearbyDrivers.map((driver) => (
          <Marker
            key={driver.id}
            coordinate={{ latitude: driver.latitude, longitude: driver.longitude }}
            title={`Driver: ${driver.name}`}
            description={driver.vehicleInfo ? `${driver.vehicleInfo.make} ${driver.vehicleInfo.model}` : "Available"}
          >
            <View style={{ backgroundColor: theme.driverMarkerBg, borderRadius: 999, padding: 8 }}>
              <Ionicons name="car" size={20} color="white" />
            </View>
          </Marker>
        ))}

        {/* Assigned Driver Marker */}
        {assignedDriver && driverLocation && (
          <Marker
            coordinate={driverLocation}
            title={`Your Driver: ${assignedDriver.name}`}
            description={
              assignedDriver.vehicleInfo ? `${assignedDriver.vehicleInfo.make} ${assignedDriver.vehicleInfo.model}` : ""
            }
          >
            <View style={{ backgroundColor: theme.assignedDriverMarkerBg, borderRadius: 999, padding: 8 }}>
              <Ionicons name="car" size={24} color="white" />
            </View>
          </Marker>
        )}

        {/* Destination Marker */}
        {destinationCoords && <Marker coordinate={destinationCoords} title="Destination" pinColor="red" />}

        {/* Route Polyline */}
        {routeCoords.length > 0 && <Polyline coordinates={routeCoords} strokeColor={theme.accent} strokeWidth={4} />}
      </MapView>

            <BottomSheet
        ref={sheetRef1}
        index={0}
        snapPoints={snapPoints1}
        onChange={handleSheetChange}
        backgroundStyle={{ backgroundColor: isDark ? "#1a1a1a" : "#ffffff" }}
        handleIndicatorStyle={{ backgroundColor: isDark ? "#a1a1aa" : "#6b7280" }}
      >
        <BottomSheetView className="flex-1 p-4">
          <View className="mb-6 flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="p-2">
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
              {selectedRideType === "courier" ? "Plan your delivery" : "Plan your ride"}
            </Text>
          </View>
          <View className="mb-3 rounded-xl bg-gray-100 p-4 dark:bg-neutral-700">
            <View className="flex-row items-center">
              <View className="mr-3 h-3 w-3 rounded-full bg-green-500" />
              <Text className="flex-1 text-base text-gray-900 dark:text-white" numberOfLines={2}>
                {currentAddress || "Current Location"}
              </Text>
            </View>
          </View>
          <View className="mb-3 flex-row items-center rounded-xl bg-gray-100 p-4 dark:bg-neutral-700">
            <View className="mr-3 h-3 w-3 rounded-full bg-red-500" />
            <TextInput
              ref={whereToInputRef}
              className="flex-1 text-base text-gray-900 dark:text-white"
              placeholder="Where to?"
              placeholderTextColor={isDark ? "#888888" : "#adb5bd"}
              value={searchText}
              onChangeText={handleSearchChange}
              returnKeyType="search"
            />
            {isSearching && <ActivityIndicator size="small" color={isDark ? "#a1a1aa" : "#6b7280"} />}
          </View>
          {suggestions.length > 0 && (
            <View className="max-h-80">
              {suggestions.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  className="mb-2 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-neutral-800"
                  onPress={() => handleSuggestionSelect(item)}
                >
                  <Text className="text-base font-medium text-gray-900 dark:text-white">{item.name}</Text>
                  <Text className="mt-1 text-sm text-gray-600 dark:text-gray-400" numberOfLines={2}>
                    {item.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </BottomSheetView>
      </BottomSheet>
      {/* Ride Confirmation Bottom Sheet */}
      <BottomSheet
        ref={sheetRef2}
        index={-1}
        snapPoints={snapPoints2}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: isDark ? "#1a1a1a" : "#ffffff" }}
        handleIndicatorStyle={{ backgroundColor: isDark ? "#a1a1aa" : "#6b7280" }}
      >
        <BottomSheetView className="flex-1 p-4">
          <View className="mb-6 flex-row items-center">
            <TouchableOpacity
              onPress={() => {
                sheetRef2.current?.close()
                setTimeout(() => {
                  sheetRef1.current?.snapToIndex(1)
                }, 300)
              }}
              className="p-2"
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <Text className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">Choose a ride</Text>
          </View>

          {/* Go Ride Type */}
          <TouchableOpacity
            className={`mb-3 flex-row items-center justify-between rounded-xl p-4 ${
              selectedRideType === "go" ? "bg-blue-600" : "bg-gray-100 dark:bg-neutral-700 dark:text-white"
            }`}
            onPress={() => setSelectedRideType("go")}
          >
            <View className="flex-1 flex-row items-center">
              <Ionicons
                name="car"
                size={28}
                color={selectedRideType === "go" ? "white" : isDark ? "white" : "#1a1a1a"}
              />
              <View className="ml-4 flex-1">
                <Text
                  className={`text-lg font-semibold ${selectedRideType === "go" ? "text-white" : "text-gray-900 dark:text-white"}`}
                >
                  Go
                </Text>
                <Text
                  className={`text-sm opacity-80 ${selectedRideType === "go" ? "text-white" : "text-gray-600 dark:text-gray-400"}`}
                >
                  {estimatedTime || "8 min"}
                </Text>
              </View>
            </View>
            <View className="items-end">
              <Text
                className={`text-lg font-bold ${selectedRideType === "go" ? "text-white" : "text-green-600 dark:text-green-400"}`}
              >
                ₵{estimatedPrice?.toFixed(2) || "15.50"}
              </Text>
              {selectedRideType === "go" && (
                <View className={`mt-1 rounded-full px-2 py-1 ${isDark ? "bg-white" : "bg-blue-600"}`}>
                  <Text className={`text-xs font-medium ${isDark ? "text-black" : "text-white"}`}>Selected</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          {/* Courier Ride Type */}
          <TouchableOpacity
            className={`mb-4 flex-row items-center justify-between rounded-xl p-4 ${
              selectedRideType === "courier" ? "bg-blue-600" : "bg-gray-100 dark:bg-neutral-700 dark:text-white"
            }`}
            onPress={() => setSelectedRideType("courier")}
          >
            <View className="flex-1 flex-row items-center">
              <Ionicons
                name="cube"
                size={28}
                color={selectedRideType === "courier" ? "white" : isDark ? "white" : "#1a1a1a"}
              />
              <View className="ml-4 flex-1">
                <Text
                  className={`text-lg font-semibold ${selectedRideType === "courier" ? "text-white" : "text-gray-900 dark:text-white"}`}
                >
                  Courier
                </Text>
                <Text
                  className={`text-sm opacity-80 ${selectedRideType === "courier" ? "text-white" : "text-gray-600 dark:text-gray-400"}`}
                >
                  {estimatedTime || "8 min"} • Package delivery
                </Text>
              </View>
            </View>
            <View className="items-end">
              <Text
                className={`text-lg font-bold ${selectedRideType === "courier" ? "text-white" : "text-green-600 dark:text-green-400"}`}
              >
                ₵{estimatedPrice ? (estimatedPrice * 0.8).toFixed(2) : "12.40"}
              </Text>
              {selectedRideType === "courier" && (
                <View className={`mt-1 rounded-full px-2 py-1 ${isDark ? "bg-white" : "bg-blue-600"}`}>
                  <Text className={`text-xs font-medium ${isDark ? "text-black" : "text-white"}`}>Selected</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          {/* Payment Method Selection */}
          <TouchableOpacity
            className={`mb-4 flex-row items-center rounded-xl border p-4 ${
              !selectedPaymentMethod
                ? "border-red-500 bg-red-100 dark:bg-red-900/20"
                : "border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-neutral-700"
            }`}
            onPress={handlePayment}
          >
            <Ionicons
              name={selectedPaymentMethod ? "card" : "warning"}
              size={24}
              color={selectedPaymentMethod ? (isDark ? "white" : "#1a1a1a") : "#ef4444"}
            />
            <View className="ml-4 flex-1">
              <Text
                className={`text-base font-medium ${
                  selectedPaymentMethod ? "text-gray-900 dark:text-white" : "text-red-500"
                }`}
              >
                {selectedPaymentMethod ? selectedPaymentMethod.label : "Select payment method"}
              </Text>
              {!selectedPaymentMethod && (
                <Text className="mt-1 text-xs text-red-500">Payment method required to continue</Text>
              )}
            </View>
            <Ionicons name="chevron-forward" size={20} className="text-gray-600 dark:text-gray-400" />
          </TouchableOpacity>

          {/* Confirm Ride Button */}
          <TouchableOpacity
            className={`mb-2 items-center rounded-xl py-4 ${
              selectedPaymentMethod ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-700"
            }`}
            onPress={handleConfirmRide}
            disabled={isConfirmingRide || !selectedPaymentMethod}
          >
            {isConfirmingRide ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text
                className={`text-lg font-bold ${
                  selectedPaymentMethod ? "text-white" : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {selectedPaymentMethod
                  ? `Confirm ${selectedRideType === "go" ? "Go" : "Courier"}`
                  : "Select Payment Method First"}
              </Text>
            )}
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>

      {/* Ride Tracking Bottom Sheet */}
      <BottomSheet
        ref={sheetRef3}
        index={-1}
        snapPoints={snapPoints3}
        backgroundStyle={{ backgroundColor: theme.cardBackground }}
        handleIndicatorStyle={{ backgroundColor: theme.subText }}
      >
        <BottomSheetView style={{ flex: 1, padding: 16 }}>
          {rideStatus === "searching" && (
            <View style={{ alignItems: "center", paddingVertical: 32 }}>
              <ActivityIndicator size="large" color={theme.accent} />
              <Text style={{ color: theme.text, fontSize: 18, fontWeight: "500", marginTop: 16 }}>
                Finding your driver...
              </Text>
              <Text style={{ color: theme.subText, fontSize: 14, marginTop: 8 }}>
                This usually takes less than a minute
              </Text>
            </View>
          )}

          {rideStatus === "driver_assigned" && assignedDriver && (
            <View>
              <Text style={{ color: theme.text, fontSize: 20, fontWeight: "600", marginBottom: 16 }}>
                Driver Found!
              </Text>
              <View
                style={{
                  backgroundColor: theme.unselectedRideBg,
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: theme.border,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      width: 48,
                      height: 48,
                      backgroundColor: theme.assignedDriverMarkerBg,
                      borderRadius: 999,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
                      {assignedDriver.name?.charAt(0) || "D"}
                    </Text>
                  </View>
                  <View style={{ marginLeft: 16, flex: 1 }}>
                    <Text style={{ color: theme.text, fontWeight: "600", fontSize: 18 }}>{assignedDriver.name}</Text>
                    <Text style={{ color: theme.subText, fontSize: 14 }}>
                      ⭐ {assignedDriver.rating} • {assignedDriver.vehicleInfo?.plateNumber}
                    </Text>
                  </View>
                  <TouchableOpacity style={{ backgroundColor: theme.completeButtonBg, borderRadius: 999, padding: 12 }}>
                    <Ionicons name="call" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 16 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: theme.cancelButtonBg,
                    borderRadius: 12,
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    flex: 1,
                    marginRight: 8,
                    alignItems: "center",
                  }}
                  onPress={handleCancelRide}
                >
                  <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: theme.buttonPrimaryBg,
                    borderRadius: 12,
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    flex: 1,
                    marginLeft: 8,
                    alignItems: "center",
                  }}
                  onPress={handleStartRide}
                >
                  <Text style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>Start Ride</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {rideStatus === "in_progress" && (
            <View>
              <Text style={{ color: theme.text, fontSize: 20, fontWeight: "600", marginBottom: 16 }}>
                Ride in Progress
              </Text>
              <Text style={{ color: theme.subText, fontSize: 16, marginBottom: 16 }}>
                Arriving at destination in {estimatedTime}
              </Text>

              {/* Complete Ride Button */}
              <TouchableOpacity
                style={{
                  backgroundColor: theme.completeButtonBg,
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: "center",
                  marginBottom: 16,
                }}
                onPress={handleCompleteRide}
              >
                <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>Complete Ride</Text>
              </TouchableOpacity>

              {/* Chat Button with notification badge */}
              <View style={{ position: "absolute", bottom: 16, right: 16 }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: theme.chatButtonBg,
                    borderRadius: 999,
                    padding: 16,
                    shadowColor: theme.shadow,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                  }}
                  onPress={() => {
                    setUnreadCount(0)
                    router.push("/ChatScreen")
                  }}
                >
                  <Ionicons name="chatbubble" size={24} color="white" />
                  {unreadCount > 0 && (
                    <View
                      style={{
                        position: "absolute",
                        top: -4,
                        right: -4,
                        backgroundColor: theme.unreadBadgeBg,
                        borderRadius: 999,
                        minWidth: 20,
                        height: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 4,
                      }}
                    >
                      
                    </View>
                  )}
                </TouchableOpacity>
                {/* This button is for testing unread count, remove in production */}
                <TouchableOpacity
                  style={{ backgroundColor: theme.unreadBadgeBg, borderRadius: 4, padding: 8, marginTop: 8 }}
                  onPress={() => setUnreadCount((prev) => prev + 1)}
                >
                  <Text style={{ color: "white", fontSize: 12 }}>+1 Unread</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  )
}
