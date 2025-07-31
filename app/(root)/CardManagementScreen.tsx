// "use client"
// import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native"
// import { Ionicons } from "@expo/vector-icons"
// import { useRouter } from "expo-router"
// import { usePaymentStore, type PaymentCard } from "@/stores/usePaymentStore"

// export default function CardManagementScreen() {
//   const router = useRouter()
//   const { savedCards, deleteCard, setDefaultCard } = usePaymentStore()

//   const handleDeleteCard = (card: PaymentCard) => {
//     Alert.alert("Delete Card", `Are you sure you want to delete ${card.type} ****${card.lastFourDigits}?`, [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: () => {
//           deleteCard(card.id)
//           Alert.alert("Success", "Card deleted successfully")
//         },
//       },
//     ])
//   }

//   const handleSetDefault = (card: PaymentCard) => {
//     if (card.isDefault) return

//     setDefaultCard(card.id)
//     Alert.alert("Success", "Default payment method updated")
//   }

//   const getCardIcon = (type: string) => {
//     switch (type) {
//       case "visa":
//         return "card"
//       case "mastercard":
//         return "card"
//       default:
//         return 'alert';
//     }
//   }

//   const getCardColor = (type: string) => {
//     switch (type) {
//       case "visa":
//         return "#1A1F71"
//       case "mastercard":
//         return "#EB001B"
//       default:
//         return "#666"
//     }
//   }

//   return (
//     <View className="flex-1 bg-black px-4 pt-16">
//       {/* Header */}
//       <View className="flex-row items-center justify-between mb-6">
//         <View className="flex-row items-center">
//           <TouchableOpacity className="mr-3" onPress={() => router.back()}>
//             <Ionicons name="arrow-back" size={24} color="white" />
//           </TouchableOpacity>
//           <Text className="text-white text-lg font-semibold">Manage Cards</Text>
//         </View>
//         <TouchableOpacity onPress={() => router.push("/AddCardScreen")}>
//           <Ionicons name="add" size={24} color="#2563EB" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView className="flex-1">
//         {savedCards.length === 0 ? (
//           <View className="flex-1 justify-center items-center py-20">
//             <Ionicons name="card-outline" size={64} color="#555" />
//             <Text className="text-gray-400 text-lg font-medium mt-4">No Cards Added</Text>
//             <Text className="text-gray-500 text-sm text-center mt-2 px-8">
//               Add your first payment card to get started with seamless payments
//             </Text>
//             <TouchableOpacity
//               className="bg-blue-600 px-6 py-3 rounded-xl mt-6"
//               onPress={() => router.push("/AddCardScreen")}
//             >
//               <Text className="text-white font-semibold">Add Card</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <View>
//             {savedCards.map((card) => (
//               <View key={card.id} className="bg-neutral-900 rounded-xl p-4 mb-4">
//                 {/* Card Header */}
//                 <View className="flex-row items-center justify-between mb-3">
//                   <View className="flex-row items-center">
//                     <View
//                       className="w-8 h-8 rounded-full items-center justify-center mr-3"
//                       style={{ backgroundColor: getCardColor(card.type) }}
//                     >
//                       <Ionicons name={getCardIcon(card.type)} size={16} color="white" />
//                     </View>
//                     <View>
//                       <Text className="text-white font-semibold text-base">
//                         {card.type.charAt(0).toUpperCase() + card.type.slice(1)} ****{card.lastFourDigits}
//                       </Text>
//                       <Text className="text-gray-400 text-sm">{card.cardholderName}</Text>
//                     </View>
//                   </View>
//                   {card.isDefault && (
//                     <View className="bg-green-600 px-2 py-1 rounded-full">
//                       <Text className="text-white text-xs font-medium">Default</Text>
//                     </View>
//                   )}
//                 </View>

//                 {/* Card Details */}
//                 <View className="flex-row justify-between items-center mb-4">
//                   <Text className="text-gray-400 text-sm">Expires {card.expiryDate}</Text>
//                   <Text className="text-gray-400 text-sm">Added {card.createdAt.toLocaleDateString()}</Text>
//                 </View>

//                 {/* Card Actions */}
//                 <View className="flex-row space-x-3">
//                   {!card.isDefault && (
//                     <TouchableOpacity
//                       className="flex-1 bg-blue-600 py-3 rounded-lg"
//                       onPress={() => handleSetDefault(card)}
//                     >
//                       <Text className="text-white text-center font-medium">Set as Default</Text>
//                     </TouchableOpacity>
//                   )}
//                   <TouchableOpacity
//                     className="flex-1 bg-red-600 py-3 rounded-lg"
//                     onPress={() => handleDeleteCard(card)}
//                   >
//                     <Text className="text-white text-center font-medium">Delete</Text>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             ))}

//             {/* Add New Card Button */}
//             <TouchableOpacity
//               className="bg-neutral-800 border-2 border-dashed border-gray-600 rounded-xl p-6 items-center justify-center mt-4"
//               onPress={() => router.push("/AddCardScreen")}
//             >
//               <Ionicons name="add-circle-outline" size={32} color="#666" />
//               <Text className="text-gray-400 text-base font-medium mt-2">Add New Card</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </ScrollView>
//     </View>
//   )
// }



"use client"

import { View, Text, TouchableOpacity, ScrollView, Alert, useColorScheme } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { usePaymentStore, type PaymentCard } from "@/stores/usePaymentStore"

export default function CardManagementScreen() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  const { savedCards, deleteCard, setDefaultCard } = usePaymentStore()

  const handleDeleteCard = (card: PaymentCard) => {
    Alert.alert("Delete Card", `Are you sure you want to delete ${card.type} ****${card.lastFourDigits}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteCard(card.id)
          Alert.alert("Success", "Card deleted successfully")
        },
      },
    ])
  }

  const handleSetDefault = (card: PaymentCard) => {
    if (card.isDefault) return
    setDefaultCard(card.id)
    Alert.alert("Success", "Default payment method updated")
  }

  const getCardIcon = (type: string) => {
    switch (type) {
      case "visa":
      case "mastercard":
        return "card"
      default:
        return "alert"
    }
  }

  const getCardColor = (type: string) => {
    switch (type) {
      case "visa":
        return "#1A1F71"
      case "mastercard":
        return "#EB001B"
      default:
        return "#666"
    }
  }

  return (
    <View className={`flex-1 px-4 pt-16 ${isDark ? "bg-black" : "bg-white"}`}>
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-3" onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={isDark ? "white" : "black"} />
          </TouchableOpacity>
          <Text className={`text-lg font-semibold ${isDark ? "text-white" : "text-black"}`}>
            Manage Cards
          </Text>
        </View>
        <TouchableOpacity onPress={() => router.push("/AddCardScreen")}>
          <Ionicons name="add" size={24} color="#2563EB" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {savedCards.length === 0 ? (
          <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="card-outline" size={64} color="#555" />
            <Text className={`text-lg font-medium mt-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              No Cards Added
            </Text>
            <Text className={`text-sm text-center mt-2 px-8 ${isDark ? "text-gray-500" : "text-gray-500"}`}>
              Add your first payment card to get started with seamless payments
            </Text>
            <TouchableOpacity
              className="bg-blue-600 px-6 py-3 rounded-xl mt-6"
              onPress={() => router.push("/AddCardScreen")}
            >
              <Text className="text-white font-semibold">Add Card</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {savedCards.map((card) => (
              <View
                key={card.id}
                className={`rounded-xl p-4 mb-4 ${isDark ? "bg-neutral-900" : "bg-gray-100"}`}
              >
                {/* Card Header */}
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center">
                    <View
                      className="w-8 h-8 rounded-full items-center justify-center mr-3"
                      style={{ backgroundColor: getCardColor(card.type) }}
                    >
                      <Ionicons name={getCardIcon(card.type)} size={16} color="white" />
                    </View>
                    <View>
                      <Text className={`${isDark ? "text-white" : "text-black"} font-semibold text-base`}>
                        {card.type.charAt(0).toUpperCase() + card.type.slice(1)} ****{card.lastFourDigits}
                      </Text>
                      <Text className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm`}>
                        {card.cardholderName}
                      </Text>
                    </View>
                  </View>
                  {card.isDefault && (
                    <View className="bg-green-600 px-2 py-1 rounded-full">
                      <Text className="text-white text-xs font-medium">Default</Text>
                    </View>
                  )}
                </View>

                {/* Card Details */}
                <View className="flex-row justify-between items-center mb-4">
                  <Text className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm`}>
                    Expires {card.expiryDate}
                  </Text>
                  <Text className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm`}>
                    Added {card.createdAt.toLocaleDateString()}
                  </Text>
                </View>

                {/* Card Actions */}
                <View className="flex-row space-x-3">
                  {!card.isDefault && (
                    <TouchableOpacity
                      className="flex-1 bg-blue-600 py-3 rounded-lg"
                      onPress={() => handleSetDefault(card)}
                    >
                      <Text className="text-white text-center font-medium">Set as Default</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    className="flex-1 bg-red-600 py-3 rounded-lg"
                    onPress={() => handleDeleteCard(card)}
                  >
                    <Text className="text-white text-center font-medium">Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {/* Add New Card Button */}
            <TouchableOpacity
              className={`border-2 border-dashed rounded-xl p-6 items-center justify-center mt-4 ${
                isDark
                  ? "bg-neutral-800 border-gray-600"
                  : "bg-gray-200 border-gray-400"
              }`}
              onPress={() => router.push("/AddCardScreen")}
            >
              <Ionicons name="add-circle-outline" size={32} color={isDark ? "#888" : "#555"} />
              <Text className={`${isDark ? "text-gray-400" : "text-gray-700"} text-base font-medium mt-2`}>
                Add New Card
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

