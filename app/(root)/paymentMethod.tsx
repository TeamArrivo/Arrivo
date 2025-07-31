// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { usePaymentStore } from '@/stores/usePaymentStore';

// interface PaymentMethod {
//   id: string;
//   label: string;
//   icon: string;
//   color: string;
// }

// export default function PaymentMethodScreen() {
//   const [selectedMethod, setSelectedMethod] = useState<string>('');
//   const router = useRouter();
//   const { setSelectedPaymentMethod } = usePaymentStore();

//   const methods: PaymentMethod[] = [
//     { id: 'mastercard', label: 'Mastercard ****3894', icon: 'card', color: '#EB001B' },
//     { id: 'visa', label: 'Visa ****3894', icon: 'card', color: '#1A1F71' },
//     { id: 'cash', label: 'Cash', icon: 'cash', color: '#10B981' },
//   ];

//   const handleContinue = () => {
//     if (!selectedMethod) {
//       return;
//     }

//     const selectedPaymentMethod = methods.find(method => method.id === selectedMethod);
    
//     if (selectedPaymentMethod) {
//       // Store the selected payment method in the global store
//       setSelectedPaymentMethod(selectedPaymentMethod);
      
//       // Navigate back to book ride screen
//       router.back();
//     }
//   };

//   const handleBack = () => {
//     router.back();
//   };

//   return (
//     <View className="flex-1 bg-black px-4 pt-16">
//       {/* Header */}
//       <View className="flex-row items-center mb-6">
//         <TouchableOpacity className="mr-3" onPress={handleBack}>
//           <Ionicons name="arrow-back" size={24} color="white" />
//         </TouchableOpacity>
//         <Text className="text-white text-lg font-semibold">Payment method</Text>
//       </View>

//       {/* Subtitle */}
//       <Text className="text-gray-400 text-sm mb-6">Select a payment method to use</Text>

//       {/* Methods List */}
//       <ScrollView className="mb-6">
//         {methods.map((method) => (
//           <TouchableOpacity
//             key={method.id}
//             onPress={() => setSelectedMethod(method.id)}
//             className={`flex-row items-center justify-between p-4 rounded-xl mb-3 ${
//               selectedMethod === method.id ? 'bg-blue-600' : 'bg-[#121212]'
//             }`}
//           >
//             <View className="flex-row items-center space-x-3">
//               <View className="w-5 h-5 rounded-full" style={{ backgroundColor: method.color }} />
//               <Text className="text-white">{method.label}</Text>
//             </View>
//             {selectedMethod === method.id && (
//               <Ionicons name="checkmark-circle" size={24} color="white" />
//             )}
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Add Payment Method */}
//       <TouchableOpacity className="bg-[#2A2A2A] p-4 rounded-xl mb-4">
//         <View className="flex-row items-center justify-center">
//           <Ionicons name="add" size={20} color="white" />
//           <Text className="text-white text-center ml-2">Add payment method</Text>
//         </View>
//       </TouchableOpacity>

//       {/* Continue Button */}
//       <TouchableOpacity 
//         className={`p-4 rounded-xl ${
//           selectedMethod ? 'bg-[#6EBF36]' : 'bg-gray-600'
//         }`}
//         onPress={handleContinue}
//         disabled={!selectedMethod}
//       >
//         <Text className={`text-center font-semibold ${
//           selectedMethod ? 'text-black' : 'text-gray-400'
//         }`}>
//           {selectedMethod ? 'Continue' : 'Select a payment method'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }




// "use client"

// import { useState, useEffect } from "react"
// import { View, Text, TouchableOpacity, ScrollView } from "react-native"
// import { Ionicons } from "@expo/vector-icons"
// import { useRouter } from "expo-router"
// import { usePaymentStore, type PaymentMethod } from "@/stores/usePaymentStore"

// export default function PaymentMethodScreen() {
//   const [selectedMethod, setSelectedMethod] = useState<string>("")
//   const router = useRouter()
//   const { setSelectedPaymentMethod, getPaymentMethods, savedCards } = usePaymentStore()

//   const [methods, setMethods] = useState<PaymentMethod[]>([])

//   useEffect(() => {
//     // Get updated payment methods including saved cards
//     const updatedMethods = getPaymentMethods()
//     setMethods(updatedMethods)
//   }, [savedCards])

//   const handleContinue = () => {
//     if (!selectedMethod) {
//       return
//     }

//     const selectedPaymentMethod = methods.find((method) => method.id === selectedMethod)

//     if (selectedPaymentMethod) {
//       // Store the selected payment method in the global store
//       setSelectedPaymentMethod(selectedPaymentMethod)

//       // Navigate back to book ride screen
//       router.back()
//     }
//   }

//   const handleAddCard = () => {
//     router.push("/AddCardScreen")
//   }

//   const handleManageCards = () => {
//     router.push("/CardManagementScreen")
//   }

//   const handleBack = () => {
//     router.back()
//   }

//   return (
//     <View className="flex-1 bg-black px-4 pt-16">
//       {/* Header */}
//       <View className="flex-row items-center justify-between mb-6 mt-20">
//         <View className="flex-row items-center">
//           <TouchableOpacity className="mr-3" onPress={handleBack}>
//             <Ionicons name="arrow-back" size={24} color="white" />
//           </TouchableOpacity>
//           <Text className="text-white text-lg font-semibold text-center">Payment method</Text>
//         </View>
//         {savedCards.length > 0 && (
//           <TouchableOpacity onPress={handleManageCards}>
//             <Text className="text-blue-500 text-sm font-medium">Manage</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Subtitle */}
//       <Text className="text-gray-400 text-sm mb-6">Select a payment method to use</Text>

//       {/* Methods List */}
//       <ScrollView className="mb-6">
//         {methods.map((method) => (
//           <TouchableOpacity
//             key={method.id}
//             onPress={() => setSelectedMethod(method.id)}
//             className={`flex-row items-center justify-between p-4 rounded-xl mb-3 ${
//               selectedMethod === method.id ? "bg-blue-600" : "bg-[#121212]"
//             }`}
//           >
//             <View className="flex-row items-center space-x-3">
//               <View className="w-5 h-5 rounded-full" style={{ backgroundColor: method.color }} />
//               <View>
//                 <Text className="text-white font-medium">{method.label}</Text>
//                 {method.cardData?.isDefault && <Text className="text-gray-400 text-xs">Default payment method</Text>}
//               </View>
//             </View>
//             <View className="flex-row items-center">
//               {method.cardData?.isDefault && (
//                 <View className="bg-green-600 px-2 py-1 rounded-full mr-2">
//                   <Text className="text-white text-xs font-medium">Default</Text>
//                 </View>
//               )}
//               {selectedMethod === method.id && <Ionicons name="checkmark-circle" size={24} color="white" />}
//             </View>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Add Payment Method */}
//       <TouchableOpacity className="bg-[#2A2A2A] p-4 rounded-xl mb-4" onPress={handleAddCard}>
//         <View className="flex-row items-center justify-center">
//           <Ionicons name="add" size={20} color="white" />
//           <Text className="text-white text-center ml-2">Add payment card</Text>
//         </View>
//       </TouchableOpacity>

//       {/* Manage Cards Button (if cards exist) */}
//       {savedCards.length > 0 && (
//         <TouchableOpacity className="bg-neutral-800 p-4 rounded-xl mb-4" onPress={handleManageCards}>
//           <View className="flex-row items-center justify-center">
//             <Ionicons name="settings" size={20} color="white" />
//             <Text className="text-white text-center ml-2">Manage saved cards</Text>
//           </View>
//         </TouchableOpacity>
//       )}

//       {/* Continue Button */}
//       <TouchableOpacity
//         className={`p-4 rounded-xl ${selectedMethod ? "bg-[#6EBF36]" : "bg-gray-600"}`}
//         onPress={handleContinue}
//         disabled={!selectedMethod}
//       >
//         <Text className={`text-center font-semibold ${selectedMethod ? "text-black" : "text-gray-400"}`}>
//           {selectedMethod ? "Continue" : "Select a payment method"}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   )
// }





// "use client"

// import { useState, useEffect } from "react"
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   useColorScheme,
// } from "react-native"
// import { Ionicons } from "@expo/vector-icons"
// import { useRouter } from "expo-router"
// import { usePaymentStore, type PaymentMethod } from "@/stores/usePaymentStore"

// export default function PaymentMethodScreen() {
//   const colorScheme = useColorScheme()
//   const isDark = colorScheme === "dark"

//   const [selectedMethod, setSelectedMethod] = useState<string>("")
//   const router = useRouter()
//   const { setSelectedPaymentMethod, getPaymentMethods, savedCards } = usePaymentStore()

//   const [methods, setMethods] = useState<PaymentMethod[]>([])

//   useEffect(() => {
//     const updatedMethods = getPaymentMethods()
//     setMethods(updatedMethods)
//   }, [savedCards])

//   const handleContinue = () => {
//     if (!selectedMethod) return

//     const selectedPaymentMethod = methods.find((method) => method.id === selectedMethod)
//     if (selectedPaymentMethod) {
//       setSelectedPaymentMethod(selectedPaymentMethod)
//       router.back()
//     }
//   }

//   const handleAddCard = () => router.push("/AddCardScreen")
//   const handleManageCards = () => router.push("/CardManagementScreen")
//   const handleBack = () => router.back()

//   return (
//     <View className={`flex-1 px-4 pt-16 ${isDark ? "bg-black" : "bg-white"}`}>
//       {/* Header */}
//       <View className="flex-row items-center justify-between mb-6 mt-20">
//         <View className="flex-row items-center">
//           <TouchableOpacity className="mr-3" onPress={handleBack}>
//             <Ionicons name="arrow-back" size={24} color={isDark ? "white" : "black"} />
//           </TouchableOpacity>
//           <Text className={`text-lg font-semibold text-center ${isDark ? "text-white" : "text-black"}`}>
//             Payment method
//           </Text>
//         </View>
//         {savedCards.length > 0 && (
//           <TouchableOpacity onPress={handleManageCards}>
//             <Text className="text-blue-500 text-sm font-medium">Manage</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* Subtitle */}
//       <Text className={`text-sm mb-6 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
//         Select a payment method to use
//       </Text>

//       {/* Methods List */}
//       <ScrollView className="mb-6">
//         {methods.map((method) => (
//           <TouchableOpacity
//             key={method.id}
//             onPress={() => setSelectedMethod(method.id)}
//             className={`flex-row items-center justify-between p-4 rounded-xl mb-3 ${
//               selectedMethod === method.id
//                 ? "bg-blue-600"
//                 : isDark
//                 ? "bg-[#121212]"
//                 : "bg-gray-100"
//             }`}
//           >
//             <View className="flex-row items-center space-x-3">
//               <View className="w-5 h-5 rounded-full" style={{ backgroundColor: method.color }} />
//               <View>
//                 <Text className={`${isDark ? "text-white" : "text-black"} font-medium`}>
//                   {method.label}
//                 </Text>
//                 {method.cardData?.isDefault && (
//                   <Text className={`${isDark ? "text-gray-400" : "text-gray-500"} text-xs`}>
//                     Default payment method
//                   </Text>
//                 )}
//               </View>
//             </View>
//             <View className="flex-row items-center">
//               {method.cardData?.isDefault && (
//                 <View className="bg-green-600 px-2 py-1 rounded-full mr-2">
//                   <Text className="text-white text-xs font-medium">Default</Text>
//                 </View>
//               )}
//               {selectedMethod === method.id && (
//                 <Ionicons name="checkmark-circle" size={24} color={isDark ? "white" : "black"} />
//               )}
//             </View>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Add Payment Method */}
//       <TouchableOpacity
//         className={`${isDark ? "bg-[#2A2A2A]" : "bg-gray-200"} p-4 rounded-xl mb-4`}
//         onPress={handleAddCard}
//       >
//         <View className="flex-row items-center justify-center">
//           <Ionicons name="add" size={20} color={isDark ? "white" : "black"} />
//           <Text className={`text-center ml-2 ${isDark ? "text-white" : "text-black"}`}>
//             Add payment card
//           </Text>
//         </View>
//       </TouchableOpacity>

//       {/* Manage Cards Button */}
//       {savedCards.length > 0 && (
//         <TouchableOpacity
//           className={`${isDark ? "bg-neutral-800" : "bg-gray-300"} p-4 rounded-xl mb-4`}
//           onPress={handleManageCards}
//         >
//           <View className="flex-row items-center justify-center">
//             <Ionicons name="settings" size={20} color={isDark ? "white" : "black"} />
//             <Text className={`text-center ml-2 ${isDark ? "text-white" : "text-black"}`}>
//               Manage saved cards
//             </Text>
//           </View>
//         </TouchableOpacity>
//       )}

//       {/* Continue Button */}
//       <TouchableOpacity
//         className={`p-4 rounded-xl ${
//           selectedMethod ? "bg-[#6EBF36]" : "bg-gray-400"
//         }`}
//         onPress={handleContinue}
//         disabled={!selectedMethod}
//       >
//         <Text
//           className={`text-center font-semibold ${
//             selectedMethod ? "text-black" : isDark ? "text-gray-300" : "text-white"
//           }`}
//         >
//           {selectedMethod ? "Continue" : "Select a payment method"}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   )
// }



"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { usePaymentStore, type PaymentMethod } from "@/stores/usePaymentStore"

export default function PaymentMethodScreen() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  const [selectedMethod, setSelectedMethod] = useState<string>("")
  const router = useRouter()
  const { setSelectedPaymentMethod, getPaymentMethods, savedCards } = usePaymentStore()

  const [methods, setMethods] = useState<PaymentMethod[]>([])

  useEffect(() => {
    const updatedMethods = getPaymentMethods()
    setMethods(updatedMethods)
  }, [savedCards])

  const handleContinue = () => {
    if (!selectedMethod) return

    const selectedPaymentMethod = methods.find((method) => method.id === selectedMethod)
    if (selectedPaymentMethod) {
      setSelectedPaymentMethod(selectedPaymentMethod)
      router.back()
    }
  }

  const handleAddCard = () => router.push("/AddCardScreen")
  const handleManageCards = () => router.push("/CardManagementScreen")
  const handleBack = () => router.back()

  return (
    <View className={`flex-1 px-4 pt-16 ${isDark ? "bg-black" : "bg-white"}`}>
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6 mt-20">
        <View className="flex-row items-center">
          <TouchableOpacity className="mr-3" onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color={isDark ? "white" : "black"} />
          </TouchableOpacity>
          <Text className={`text-lg font-semibold text-center ml-20 mb-4 ${isDark ? "text-white" : "text-black"}`}>
            Payment method
          </Text>
        </View>
        {savedCards.length > 0 && (
          <TouchableOpacity onPress={handleManageCards}>
            <Text className="text-blue-500 text-sm font-medium">Manage</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Subtitle */}
      <Text className={`text-sm mb-6 ml-20 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        Select a payment method to use
      </Text>

      {/* Methods List */}
      <ScrollView className="mb-6">
        {methods.map((method) => (
          <TouchableOpacity
            key={method.id}
            onPress={() => setSelectedMethod(method.id)}
            className={`flex-row items-center justify-between p-4 rounded-xl mb-3 ${
              selectedMethod === method.id
                ? "bg-blue-600"
                : isDark
                ? "bg-[#121212]"
                : "bg-gray-100"
            }`}
          >
            <View className="flex-row items-center space-x-3">
              <View className="w-5 h-5 rounded-full" style={{ backgroundColor: method.color }} />
              <View>
                <Text className={`${isDark ? "text-white" : "text-black"} font-medium`}>
                  {method.label}
                </Text>
                {method.cardData?.isDefault && (
                  <Text className={`${isDark ? "text-gray-400" : "text-gray-500"} text-xs`}>
                    Default payment method
                  </Text>
                )}
              </View>
            </View>
            <View className="flex-row items-center">
              {method.cardData?.isDefault && (
                <View className="bg-green-600 px-2 py-1 rounded-full mr-2">
                  <Text className="text-white text-xs font-medium">Default</Text>
                </View>
              )}
              {selectedMethod === method.id && (
                <Ionicons name="checkmark-circle" size={24} color={isDark ? "white" : "black"} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Add Payment Method */}
      <TouchableOpacity
        className={`p-4 rounded-xl mb-4  -mt-4 ${isDark ? "bg-[#2A2A2A]" : "bg-gray-200"}`}
        onPress={handleAddCard}
      >
        <View className="flex-row items-center justify-center">
          <Ionicons name="add" size={20} color={isDark ? "white" : "black"} />
          <Text className={`ml-2 ${isDark ? "text-white" : "text-black"}`}>
            Add payment card
          </Text>
        </View>
      </TouchableOpacity>

      {/* Manage Cards */}
      {savedCards.length > 0 && (
        <TouchableOpacity
          className={`p-4 rounded-xl mb-4 ${isDark ? "bg-neutral-800" : "bg-gray-300"}`}
          onPress={handleManageCards}
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="settings" size={20} color={isDark ? "white" : "black"} />
            <Text className={`ml-2 ${isDark ? "text-white" : "text-black"}`}>
              Manage saved cards
            </Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Continue Button */}
      <TouchableOpacity
        className={`p-4 rounded-xl ${
          selectedMethod ? "bg-[#6EBF36]" : "bg-gray-400"
        }`}
        onPress={handleContinue}
        disabled={!selectedMethod}
      >
        <Text
          className={`text-center font-semibold  ${
            selectedMethod ? "text-black" : isDark ? "text-gray-300" : "text-white"
          }`}
        >
          {selectedMethod ? "Continue" : "Select a payment method"}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
