// r
"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useColorScheme, // Import useColorScheme
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { usePaymentStore } from "@/stores/usePaymentStore"

export default function AddCardScreen() {
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardholderName, setCardholderName] = useState("")
  const [isDefault, setIsDefault] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { addCard, savedCards } = usePaymentStore()

  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  const theme = {
    background: isDark ? "#000000" : "#f8f9fa",
    cardBackground: isDark ? "#1a1a1a" : "#ffffff",
    text: isDark ? "#ffffff" : "#1a1a1a",
    subText: isDark ? "#a1a1aa" : "#6b7280",
    inputBackground: isDark ? "#2c2c2e" : "#e9ecef",
    inputPlaceholder: isDark ? "#666" : "#adb5bd",
    border: isDark ? "#374151" : "#dee2e6",
    accentButton: "#3b82f6", // Blue for primary action
    disabledButton: isDark ? "#4b5563" : "#ced4da",
    toggleBackground: isDark ? "#2c2c2e" : "#e9ecef",
    secureInfoBackground: isDark ? "#1a1a1a" : "#e9ecef",
    secureInfoText: isDark ? "#a1a1aa" : "#495057",
    shadow: isDark ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.1)",
  }

  const formatCardNumber = (text: string) => {
    const cleaned = text.replace(/\s/g, "").replace(/[^0-9]/gi, "")
    const matches = cleaned.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(" ") : cleaned
  }

  const formatExpiryDate = (text: string) => {
    const cleaned = text.replace(/\D/g, "")
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4)
    }
    return cleaned
  }

  const getCardType = (number: string): "visa" | "mastercard" | "unknown" => {
    const cleaned = number.replace(/\s/g, "")
    if (cleaned.startsWith("4")) return "visa"
    if (cleaned.startsWith("5") || cleaned.startsWith("2")) return "mastercard"
    return "unknown"
  }

  const validateForm = () => {
    // Basic validation (can be expanded)
    if (cardNumber.replace(/\s/g, "").length !== 16) {
      Alert.alert("Validation Error", "Card number must be 16 digits.")
      return false
    }
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      Alert.alert("Validation Error", "Expiry date must be in MM/YY format.")
      return false
    }
    const [month, year] = expiryDate.split("/").map(Number)
    const currentYear = new Date().getFullYear() % 100 // Get last two digits of current year
    const currentMonth = new Date().getMonth() + 1 // Month is 0-indexed

    if (month < 1 || month > 12) {
      Alert.alert("Validation Error", "Invalid month in expiry date.")
      return false
    }
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      Alert.alert("Validation Error", "Expiry date cannot be in the past.")
      return false
    }

    if (cvv.length < 3 || cvv.length > 4) {
      Alert.alert("Validation Error", "CVV must be 3 or 4 digits.")
      return false
    }
    if (cardholderName.trim().length === 0) {
      Alert.alert("Validation Error", "Cardholder name cannot be empty.")
      return false
    }
    return true
  }

  const handleSaveCard = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const cardType = getCardType(cardNumber)
      const cleanedCardNumber = cardNumber.replace(/\s/g, "")

      addCard({
     
        type: cardType as "visa" | "mastercard",
        cardNumber: cleanedCardNumber,
        expiryDate,
        cvv, // In a real app, CVV would not be stored
        cardholderName: cardholderName.trim(),
        isDefault: isDefault || savedCards.length === 0, // Set as default if it's the first card or explicitly chosen
      })

      Alert.alert("Success", "Card added successfully!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ])
    } catch (error) {
      Alert.alert("Error", "Failed to add card. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const cardType = getCardType(cardNumber)

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={{ flex: 1, paddingHorizontal: 16, paddingTop: 64 }}>
        {/* Header */}
        <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
          <TouchableOpacity style={{ marginRight: 12 }} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
          <Text style={{ color: theme.text, fontSize: 20, fontWeight: "600" }}>Add Payment Card</Text>
        </View>

        {/* Card Preview */}
        <View
          style={{
            backgroundColor: "#4f46e5", // Fixed gradient for card preview
            borderRadius: 16,
            padding: 24,
            marginBottom: 24,
            minHeight: 180,
            justifyContent: "space-between",
            shadowColor: isDark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.2)",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
            <View>
              <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>Card Number</Text>
              <Text style={{ color: "white", fontSize: 18, fontFamily: "monospace" }}>
                {cardNumber || "•••• •••• •••• ••••"}
              </Text>
            </View>
            {cardType !== "unknown" && (
              <View
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                }}
              >
                <Text style={{ color: "white", fontSize: 12, fontWeight: "600", textTransform: "uppercase" }}>
                  {cardType}
                </Text>
              </View>
            )}
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
            <View>
              <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>Cardholder Name</Text>
              <Text style={{ color: "white", fontSize: 16 }}>{cardholderName || "YOUR NAME"}</Text>
            </View>
            <View>
              <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 13 }}>Expires</Text>
              <Text style={{ color: "white", fontSize: 16, fontFamily: "monospace" }}>{expiryDate || "MM/YY"}</Text>
            </View>
          </View>
        </View>

        {/* Form Fields */}
        <View style={{ gap: 16 }}>
          <View>
            <Text style={{ color: theme.text, fontSize: 14, fontWeight: "500", marginBottom: 8 }}>Card Number</Text>
            <TextInput
              style={{
                backgroundColor: theme.inputBackground,
                color: theme.text,
                padding: 16,
                borderRadius: 12,
                fontSize: 16,
                fontFamily: "monospace",
                borderWidth: 1,
                borderColor: theme.border,
              }}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor={theme.inputPlaceholder}
              value={cardNumber}
              onChangeText={(text) => setCardNumber(formatCardNumber(text))}
              keyboardType="numeric"
              maxLength={19}
            />
          </View>

          <View style={{ flexDirection: "row", gap: 16 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontSize: 14, fontWeight: "500", marginBottom: 8 }}>Expiry Date</Text>
              <TextInput
                style={{
                  backgroundColor: theme.inputBackground,
                  color: theme.text,
                  padding: 16,
                  borderRadius: 12,
                  fontSize: 16,
                  fontFamily: "monospace",
                  borderWidth: 1,
                  borderColor: theme.border,
                }}
                placeholder="MM/YY"
                placeholderTextColor={theme.inputPlaceholder}
                value={expiryDate}
                onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                keyboardType="numeric"
                maxLength={5}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontSize: 14, fontWeight: "500", marginBottom: 8 }}>CVV</Text>
              <TextInput
                style={{
                  backgroundColor: theme.inputBackground,
                  color: theme.text,
                  padding: 16,
                  borderRadius: 12,
                  fontSize: 16,
                  fontFamily: "monospace",
                  borderWidth: 1,
                  borderColor: theme.border,
                }}
                placeholder="123"
                placeholderTextColor={theme.inputPlaceholder}
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
              />
            </View>
          </View>

          <View>
            <Text style={{ color: theme.text, fontSize: 14, fontWeight: "500", marginBottom: 8 }}>Cardholder Name</Text>
            <TextInput
              style={{
                backgroundColor: theme.inputBackground,
                color: theme.text,
                padding: 16,
                borderRadius: 12,
                fontSize: 16,
                borderWidth: 1,
                borderColor: theme.border,
              }}
              placeholder="John Doe"
              placeholderTextColor={theme.inputPlaceholder}
              value={cardholderName}
              onChangeText={setCardholderName}
              autoCapitalize="words"
            />
          </View>

          {/* Set as Default Toggle */}
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: theme.toggleBackground,
              padding: 16,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: theme.border,
            }}
            onPress={() => setIsDefault(!isDefault)}
          >
            <View>
              <Text style={{ color: theme.text, fontSize: 16, fontWeight: "500" }}>Set as default payment method</Text>
              <Text style={{ color: theme.subText, fontSize: 13 }}>Use this card for future rides</Text>
            </View>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 12,
                borderWidth: 2,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isDefault ? theme.accentButton : "transparent",
                borderColor: isDefault ? theme.accentButton : theme.subText,
              }}
            >
              {isDefault && <Ionicons name="checkmark" size={16} color="white" />}
            </View>
          </TouchableOpacity>
        </View>

        {/* Secure Payment Info */}
        <View
          style={{
            backgroundColor: theme.secureInfoBackground,
            padding: 16,
            borderRadius: 12,
            marginTop: 24,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
            <Ionicons name="shield-checkmark" size={20} color="#10B981" />
            <Text style={{ color: theme.text, fontSize: 14, fontWeight: "500", marginLeft: 8 }}>Secure Payment</Text>
          </View>
          <Text style={{ color: theme.secureInfoText, fontSize: 12, lineHeight: 18 }}>
            Your card information is encrypted and stored securely. We never store your CVV.
          </Text>
        </View>

        {/* Add Card Button */}
        <TouchableOpacity
          style={{
            padding: 16,
            borderRadius: 12,
            marginBottom: 62,
            backgroundColor: !isLoading ? theme.accentButton : theme.disabledButton,
            shadowColor: !isLoading ? theme.accentButton : theme.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: !isLoading ? 0.3 : 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
          onPress={handleSaveCard}
          disabled={isLoading}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "600",
              color: !isLoading ? "white" : theme.subText,
              fontSize: 18,
            }}
          >
            {isLoading ? "Adding Card..." : "Add Card"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
