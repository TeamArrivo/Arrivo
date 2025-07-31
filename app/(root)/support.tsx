// import React from 'react';
// import { View, Text, TouchableOpacity, ScrollView, Linking } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';

// const SUPPORT_EMAIL = 'support@ravon.com';
// const SUPPORT_PHONE = '+1234567890';

// const SupportScreen = () => {
//   const router = useRouter();

//   const handleEmailPress = () => {
//     Linking.openURL(`mailto:${SUPPORT_EMAIL}`);
//   };

//   const handlePhonePress = () => {
//     Linking.openURL(`tel:${SUPPORT_PHONE}`);
//   };

//   return (
//     <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-black px-6 pt-16 pb-10">
//       {/* Back Button */}
//       <TouchableOpacity onPress={() => router.back()} className="absolute top-14 left-6 z-10">
//         <Ionicons name="arrow-back" size={28} color="white" />
//       </TouchableOpacity>

//       {/* Title */}
//       <Text className="text-3xl font-bold text-white mb-3 text-center">Support</Text>

//       {/* Description */}
//       <Text className="text-base text-gray-400 mb-6 text-center leading-relaxed">
//         Need help? Our support team is here for you. Contact us via email or phone, or check our FAQ for quick answers.
//       </Text>

//       {/* Contact Buttons */}
//       <TouchableOpacity
//         onPress={handleEmailPress}
//         className="bg-blue-600 rounded-xl py-4 mb-4 items-center shadow-lg shadow-blue-900/30"
//       >
//         <Text className="text-white text-base font-semibold">Email Support</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         onPress={handlePhonePress}
//         className="bg-green-600 rounded-xl py-4 mb-8 items-center shadow-lg shadow-green-900/30"
//       >
//         <Text className="text-white text-base font-semibold">Call Support</Text>
//       </TouchableOpacity>

//       {/* FAQ Section */}
//       <View className="mt-6 bg-zinc-900 rounded-xl p-5">
//         <Text className="text-xl font-bold text-white mb-4">Frequently Asked Questions</Text>
//         {[
//           'How do I reset my password?',
//           'How can I update my profile?',
//           'How do I contact customer service?',
//         ].map((question, index) => (
//           <Text key={index} className="text-base text-gray-400 mb-2">
//             • {question}
//           </Text>
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// export default SupportScreen;


"use client"

import { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  useColorScheme,
  Alert,
  Platform,
  Animated,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

const SUPPORT_EMAIL = "samuelbrefomarfo1047@gmail.com"
const SUPPORT_PHONE = "+1234567890"
const WEBSITE_URL = "https://arrivo.com"


interface FAQItem {
  question: string
  answer: string
  category: "account" | "rides" | "payments" | "safety" | "general"
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "How do I reset my password?",
    answer:
      'Go to the sign-in screen and tap "Forgot Password". Enter your email address and we\'ll send you a reset link. You can also reset it from your profile settings.',
    category: "account",
  },
  {
    question: "How can I update my profile information?",
    answer:
      'Open the app, go to your profile by tapping the menu icon, then select "Edit Profile". You can update your name, phone number, email, and profile picture.',
    category: "account",
  },
  {
    question: "How do I book a ride?",
    answer:
      "Tap the search bar on the home screen, enter your destination, select your ride type, and confirm your booking. You can track your driver in real-time.",
    category: "rides",
  },
  {
    question: "Can I cancel my ride?",
    answer:
      'Yes, you can cancel your ride before the driver arrives. Go to your active ride and tap "Cancel Ride". Cancellation fees may apply depending on timing.',
    category: "rides",
  },
  {
    question: "How do I add a payment method?",
    answer:
      "Go to Settings > Payment Methods > Add Payment Method. You can add credit cards, debit cards, or digital wallets like Apple Pay or Google Pay.",
    category: "payments",
  },
  {
    question: "Why was I charged a different amount?",
    answer:
      "Ride prices can vary based on demand, traffic, tolls, and waiting time. You'll always see the estimated fare before booking, and the final amount in your receipt.",
    category: "payments",
  },
  {
    question: "What safety features does Arrivo offer?",
    answer:
      "We offer real-time ride tracking, driver verification, emergency assistance button, ride sharing with contacts, and 24/7 safety support.",
    category: "safety",
  },
  {
    question: "How do I report a safety concern?",
    answer:
      "Use the emergency button during your ride, or go to Help > Safety > Report Safety Issue. Our safety team responds immediately to all reports.",
    category: "safety",
  },
  {
    question: "How do I contact customer service?",
    answer:
      "You can reach us via email, phone, live chat, or through the in-app help center. Our support team is available 24/7 to assist you.",
    category: "general",
  },
  {
    question: "What areas does Arrivo serve?",
    answer:
      "Arrivo operates in major cities across the country. Check our website or app for the complete list of service areas and coverage maps.",
    category: "general",
  },
]

const CATEGORIES = [
  { key: "all", label: "All", icon: "list-outline" },
  { key: "account", label: "Account", icon: "person-outline" },
  { key: "rides", label: "Rides", icon: "car-outline" },
  { key: "payments", label: "Payments", icon: "card-outline" },
  { key: "safety", label: "Safety", icon: "shield-outline" },
  { key: "general", label: "General", icon: "help-outline" },
]

const SupportScreen = () => {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [animatedValues] = useState(() => FAQ_DATA.map(() => new Animated.Value(0)))

  const theme = {
    background: isDark ? "#000000" : "#f8f9fa",
    card: isDark ? "#1a1a1a" : "#ffffff",
    text: isDark ? "#ffffff" : "#1a1a1a",
    subText: isDark ? "#a1a1aa" : "#6b7280",
    border: isDark ? "#374151" : "#e5e7eb",
    accent: "#6EBF36",
    shadow: isDark ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)",
  }

  const handleEmailPress = async () => {
    try {
     const subject = encodeURIComponent("Support Request");
const body = encodeURIComponent("Hi Arrivo Support Team,\n\nPlease describe your issue here...");
const url = `mailto:${SUPPORT_EMAIL}?subject=${subject}&body=${body}`;


      const canOpen = await Linking.canOpenURL(url)
      if (canOpen) {
        await Linking.openURL(url)
      } else {
        Alert.alert("Email Not Available", "Please install an email app to contact support.")
      }
    } catch (error) {
      Alert.alert("Error", "Unable to open email app. Please try again.")
    }
  }

  const handlePhonePress = async () => {
    try {
      const url = `tel:${SUPPORT_PHONE}`
      const canOpen = await Linking.canOpenURL(url)
      if (canOpen) {
        await Linking.openURL(url)
      } else {
        Alert.alert("Phone Not Available", "Unable to make phone calls on this device.")
      }
    } catch (error) {
      Alert.alert("Error", "Unable to make phone call. Please try again.")
    }
  }



  const handleWebsitePress = async () => {
    try {
      const canOpen = await Linking.canOpenURL(WEBSITE_URL)
      if (canOpen) {
        await Linking.openURL(WEBSITE_URL)
      } else {
        Alert.alert("Website Unavailable", "Unable to open website. Please check your internet connection.")
      }
    } catch (error) {
      Alert.alert("Error", "Unable to open website. Please try again.")
    }
  }

  const toggleFAQ = (index: number) => {
    const isExpanding = expandedFAQ !== index

    if (expandedFAQ !== null && expandedFAQ !== index) {
      Animated.timing(animatedValues[expandedFAQ], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start()
    }

    if (isExpanding) {
      setExpandedFAQ(index)
      Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(animatedValues[index], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        setExpandedFAQ(null)
      })
    }
  }

  const filteredFAQ =
    selectedCategory === "all" ? FAQ_DATA : FAQ_DATA.filter((item) => item.category === selectedCategory)

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ backgroundColor: theme.background }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingHorizontal: 24, paddingTop: Platform.OS === "ios" ? 60 : 40, paddingBottom: 40 }}>
        {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 32 }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              padding: 8,
              marginRight: 16,
              backgroundColor: theme.card,
              borderRadius: 12,
              shadowColor: theme.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={{ fontSize: 28, fontWeight: "bold", color: theme.text, flex: 1 }}>Support Center</Text>
        </View>

        {/* Description */}
        <Text
          style={{
            fontSize: 16,
            color: theme.subText,
            textAlign: "center",
            lineHeight: 24,
            marginBottom: 32,
          }}
        >
          Need help? Our support team is here for you 24/7. Contact us directly or browse our FAQ for quick answers.
        </Text>

        {/* Contact Options */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{ fontSize: 20, fontWeight: "600", color: theme.text, marginBottom: 16 }}>Contact Us</Text>

          <View style={{ gap: 12 }}>
            <TouchableOpacity
              onPress={handleEmailPress}
              style={{
                backgroundColor: "#3b82f6",
                borderRadius: 12,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#3b82f6",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <Ionicons name="mail-outline" size={20} color="white" style={{ marginRight: 8 }} />
              <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>Email Support</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handlePhonePress}
              style={{
                backgroundColor: "#10b981",
                borderRadius: 12,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                shadowColor: "#10b981",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <Ionicons name="call-outline" size={20} color="white" style={{ marginRight: 8 }} />
              <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>Call Support</Text>
            </TouchableOpacity>


            <TouchableOpacity
              onPress={handleWebsitePress}
              style={{
                backgroundColor: theme.card,
                borderRadius: 12,
                padding: 16,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: theme.border,
                shadowColor: theme.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <Ionicons name="globe-outline" size={20} color={theme.text} style={{ marginRight: 8 }} />
              <Text style={{ color: theme.text, fontSize: 16, fontWeight: "600" }}>Visit Website</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* FAQ Section */}
        <View>
          <Text style={{ fontSize: 20, fontWeight: "600", color: theme.text, marginBottom: 16 }}>
            Frequently Asked Questions
          </Text>

          {/* Category Filter */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 20 }}
            contentContainerStyle={{ gap: 8 }}
          >
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.key}
                onPress={() => setSelectedCategory(category.key)}
                style={{
                  backgroundColor: selectedCategory === category.key ? theme.accent : theme.card,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: selectedCategory === category.key ? theme.accent : theme.border,
                }}
              >
                <Ionicons
                  name={category.icon as any}
                  size={16}
                  color={selectedCategory === category.key ? "white" : theme.text}
                  style={{ marginRight: 4 }}
                />
                <Text
                  style={{
                    color: selectedCategory === category.key ? "white" : theme.text,
                    fontSize: 14,
                    fontWeight: "500",
                  }}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* FAQ Items */}
          <View style={{ gap: 12 }}>
            {filteredFAQ.map((item, index) => {
              const originalIndex = FAQ_DATA.indexOf(item)
              const isExpanded = expandedFAQ === originalIndex

              return (
                <View
                  key={originalIndex}
                  style={{
                    backgroundColor: theme.card,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: theme.border,
                    overflow: "hidden",
                    shadowColor: theme.shadow,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => toggleFAQ(originalIndex)}
                    style={{
                      padding: 16,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        color: theme.text,
                        fontSize: 16,
                        fontWeight: "500",
                        flex: 1,
                        marginRight: 12,
                      }}
                    >
                      {item.question}
                    </Text>
                    <Ionicons name={isExpanded ? "chevron-up" : "chevron-down"} size={20} color={theme.subText} />
                  </TouchableOpacity>

                  <Animated.View
                    style={{
                      maxHeight: animatedValues[originalIndex].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 200],
                      }),
                      opacity: animatedValues[originalIndex],
                    }}
                  >
                    <View
                      style={{
                        paddingHorizontal: 16,
                        paddingBottom: 16,
                        borderTopWidth: 1,
                        borderTopColor: theme.border,
                      }}
                    >
                      <Text
                        style={{
                          color: theme.subText,
                          fontSize: 14,
                          lineHeight: 20,
                          marginTop: 12,
                        }}
                      >
                        {item.answer}
                      </Text>
                    </View>
                  </Animated.View>
                </View>
              )
            })}
          </View>
        </View>

        {/* Additional Help */}
        <View
          style={{
            marginTop: 32,
            padding: 20,
            backgroundColor: theme.card,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "600", color: theme.text, marginBottom: 8 }}>Still need help?</Text>
          <Text style={{ color: theme.subText, fontSize: 14, lineHeight: 20, marginBottom: 16 }}>
            Can't find what you're looking for? Our support team is available 24/7 to help you with any questions or
            concerns.
          </Text>
          <TouchableOpacity
            onPress={handleEmailPress}
            style={{
              backgroundColor: theme.accent,
              borderRadius: 8,
              padding: 12,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "600" }}>Contact Support Team</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default SupportScreen
