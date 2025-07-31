

// "use client"

// import { useState, useEffect } from "react"
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from "react-native"

// interface Message {
//   id: string
//   text: string
//   sender: "user" | "driver"
//   timestamp: Date
// }

// interface SmartReply {
//   id: string
//   text: string
//   category: string
// }

// export default function ChatApp() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: "1",
//       text: "Hi! I'm on my way to pick you up. I'll be there in about 5 minutes.",
//       sender: "driver",
//       timestamp: new Date(),
//     },
//   ])
//   const [inputText, setInputText] = useState("")
//   const [smartReplies, setSmartReplies] = useState<SmartReply[]>([])

//   // Generate smart replies based on the last driver message
//   const generateSmartReplies = (lastDriverMessage: string) => {
//     const message = lastDriverMessage.toLowerCase()
//     let replies: SmartReply[] = []

//     // Location/arrival related
//     if (message.includes('on my way') || message.includes('coming') || message.includes('minutes')) {
//       replies.push(
//         { id: '1', text: 'Thank you!', category: 'acknowledgment' },
//         { id: '2', text: 'How far are you?', category: 'location' },
//         { id: '3', text: 'I\'ll be waiting', category: 'confirmation' }
//       )
//     }
    
//     // Arrival/here related
//     else if (message.includes('here') || message.includes('arrived') || message.includes('outside')) {
//       replies.push(
//         { id: '4', text: 'Coming out now', category: 'action' },
//         { id: '5', text: 'Give me 2 minutes', category: 'time' },
//         { id: '6', text: 'I can see you', category: 'confirmation' }
//       )
//     }
    
//     // Delay/traffic related
//     else if (message.includes('delay') || message.includes('traffic') || message.includes('late')) {
//       replies.push(
//         { id: '7', text: 'No problem', category: 'understanding' },
//         { id: '8', text: 'How much longer?', category: 'time' },
//         { id: '9', text: 'Take your time', category: 'patience' }
//       )
//     }
    
//     // Location confirmation
//     else if (message.includes('right place') || message.includes('location') || message.includes('address')) {
//       replies.push(
//         { id: '10', text: 'Yes, that\'s correct', category: 'confirmation' },
//         { id: '11', text: 'Actually, I\'m at...', category: 'correction' },
//         { id: '12', text: 'Let me share my location', category: 'location' }
//       )
//     }
    
//     // Payment/fare related
//     else if (message.includes('payment') || message.includes('fare') || message.includes('cost')) {
//       replies.push(
//         { id: '13', text: 'Card payment please', category: 'payment' },
//         { id: '14', text: 'Cash is fine', category: 'payment' },
//         { id: '15', text: 'How much will it be?', category: 'inquiry' }
//       )
//     }
    
//     // General questions
//     else if (message.includes('?')) {
//       replies.push(
//         { id: '16', text: 'Yes', category: 'answer' },
//         { id: '17', text: 'No', category: 'answer' },
//         { id: '18', text: 'Let me check', category: 'consideration' }
//       )
//     }
    
//     // Default replies for any driver message
//     else {
//       replies.push(
//         { id: '19', text: 'OK', category: 'acknowledgment' },
//         { id: '20', text: 'Thanks', category: 'gratitude' },
//         { id: '21', text: 'Got it', category: 'understanding' }
//       )
//     }

//     // Add some universal quick replies
//     replies.push(
//       { id: '22', text: 'Call me', category: 'action' },
//       { id: '23', text: 'Cancel ride', category: 'action' }
//     )

//     return replies.slice(0, 6) // Limit to 6 replies to avoid clutter
//   }

//   // Update smart replies when messages change
//   useEffect(() => {
//     const driverMessages = messages.filter(m => m.sender === 'driver')
//     if (driverMessages.length > 0) {
//       const lastDriverMessage = driverMessages[driverMessages.length - 1]
//       const replies = generateSmartReplies(lastDriverMessage.text)
//       setSmartReplies(replies)
//     }
//   }, [messages])

//   const sendMessage = (messageText?: string) => {
//     const textToSend = messageText || inputText
//     if (textToSend.trim() === "") return

//     const newMessage: Message = {
//       id: Date.now().toString(),
//       text: textToSend,
//       sender: "user",
//       timestamp: new Date(),
//     }

//     setMessages((prev) => [...prev, newMessage])
//     setInputText("")

//     // Simulate driver response based on user message
//     setTimeout(() => {
//       const driverResponse = generateDriverResponse(textToSend)
//       const assistantMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         text: driverResponse,
//         sender: "driver",
//         timestamp: new Date(),
//       }
//       setMessages((prev) => [...prev, assistantMessage])
//     }, 1000)
//   }

//   const generateDriverResponse = (userMessage: string) => {
//     const message = userMessage.toLowerCase()
    
//     if (message.includes('how far') || message.includes('how long')) {
//       return "I'm about 3 minutes away from your location."
//     } else if (message.includes('cancel')) {
//       return "Sure, I'll cancel the ride. Have a great day!"
//     } else if (message.includes('call')) {
//       return "I'll give you a call now."
//     } else if (message.includes('waiting') || message.includes('here')) {
//       return "Perfect! I can see you now."
//     } else if (message.includes('location') || message.includes('where')) {
//       return "I'm at the main entrance. Look for a blue Toyota."
//     } else if (message.includes('payment')) {
//       return "We can do card or cash, whatever works for you."
//     } else if (message.includes('thank') || message.includes('ok') || message.includes('got it')) {
//       return "You're welcome! See you soon."
//     } else {
//       return "Got it, thanks for letting me know!"
//     }
//   }

//   const handleSmartReply = (reply: SmartReply) => {
//     sendMessage(reply.text)
//     // Clear smart replies after selection to avoid spam
//     setSmartReplies([])
//   }

//   const renderMessage = ({ item }: { item: Message }) => {
//     const isUser = item.sender === "user"

//     return (
//       <View className={`my-1 ${isUser ? "items-end" : "items-start"}`}>
//         <View
//           className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm ${
//             isUser
//               ? "bg-blue-500 rounded-br-md"
//               : "bg-white rounded-bl-md"
//           }`}
//         >
//           <Text className={`text-base leading-5 ${isUser ? "text-white" : "text-gray-800"}`}>
//             {item.text}
//           </Text>
//           <Text className={`text-xs mt-1 ${isUser ? "text-white/70 text-right" : "text-gray-500"}`}>
//             {item.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//           </Text>
//         </View>
//       </View>
//     )
//   }

//   return (
//     <SafeAreaView className="flex-1 bg-gray-100">
//       <KeyboardAvoidingView
//         className="flex-1"
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//       >
//         {/* Header */}
//         <View className="bg-blue-500 py-4 px-5 border-b border-gray-200">
//           <Text className="text-white text-lg font-bold text-center">Chat with Driver</Text>
//         </View>

//         {/* Messages */}
//         <FlatList
//           data={messages}
//           renderItem={renderMessage}
//           keyExtractor={(item) => item.id}
//           className="flex-1"
//           contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
//           showsVerticalScrollIndicator={false}
//         />

//         {/* Smart Replies */}
//         {smartReplies.length > 0 && (
//           <View className="bg-white border-t border-gray-200 px-4 py-2">
//             <ScrollView
//               horizontal
//               showsHorizontalScrollIndicator={false}
//               contentContainerStyle={{ paddingRight: 16 }}
//             >
//               {smartReplies.map((reply) => (
//                 <TouchableOpacity
//                   key={reply.id}
//                   className="bg-gray-100 border border-gray-300 rounded-full px-4 py-2 mr-2"
//                   onPress={() => handleSmartReply(reply)}
//                 >
//                   <Text className="text-gray-700 text-sm font-medium">
//                     {reply.text}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </View>
//         )}

//         {/* Input Area */}
//         <View className="flex-row items-end bg-white border-t border-gray-200 p-4">
//           <TextInput
//             className="flex-1 border border-gray-200 rounded-full px-4 py-3 max-h-[100px] text-base bg-gray-50"
//             value={inputText}
//             onChangeText={setInputText}
//             placeholder="Type a message..."
//             placeholderTextColor="#999"
//             multiline
//             maxLength={500}
//           />
//           <TouchableOpacity
//             className={`ml-3 px-5 py-3 rounded-full justify-center items-center ${
//               inputText.trim() ? "bg-blue-500" : "bg-gray-300"
//             }`}
//             onPress={() => sendMessage()}
//             disabled={!inputText.trim()}
//           >
//             <Text
//               className={`text-base font-semibold ${
//                 inputText.trim() ? "text-white" : "text-gray-500"
//               }`}
//             >
//               Send
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   )
// }



// "use client"

// import { useState, useEffect } from "react"
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from "react-native"
// import { useChatStore, type ChatMessage } from "@/stores/useChatStore"

// interface SmartReply {
//   id: string
//   text: string
//   category: string
// }

// export default function ChatApp() {
//   const [inputText, setInputText] = useState("")
//   const [smartReplies, setSmartReplies] = useState<SmartReply[]>([])

//   // Get chat store functions and data
//   const { messages, currentRideId, addMessage, getMessagesForRide } = useChatStore()

//   // Get messages for current ride only
//   const currentRideMessages = currentRideId ? getMessagesForRide(currentRideId) : []

//   // Generate smart replies based on the last driver message
//   const generateSmartReplies = (lastDriverMessage: string) => {
//     const message = lastDriverMessage.toLowerCase()
//     const replies: SmartReply[] = []

//     // Location/arrival related
//     if (message.includes("on my way") || message.includes("coming") || message.includes("minutes")) {
//       replies.push(
//         { id: "1", text: "Thank you!", category: "acknowledgment" },
//         { id: "2", text: "How far are you?", category: "location" },
//         { id: "3", text: "I'll be waiting", category: "confirmation" },
//       )
//     }
//     // Arrival/here related
//     else if (message.includes("here") || message.includes("arrived") || message.includes("outside")) {
//       replies.push(
//         { id: "4", text: "Coming out now", category: "action" },
//         { id: "5", text: "Give me 2 minutes", category: "time" },
//         { id: "6", text: "I can see you", category: "confirmation" },
//       )
//     }
//     // Delay/traffic related
//     else if (message.includes("delay") || message.includes("traffic") || message.includes("late")) {
//       replies.push(
//         { id: "7", text: "No problem", category: "understanding" },
//         { id: "8", text: "How much longer?", category: "time" },
//         { id: "9", text: "Take your time", category: "patience" },
//       )
//     }
//     // Location confirmation
//     else if (message.includes("right place") || message.includes("location") || message.includes("address")) {
//       replies.push(
//         { id: "10", text: "Yes, that's correct", category: "confirmation" },
//         { id: "11", text: "Actually, I'm at...", category: "correction" },
//         { id: "12", text: "Let me share my location", category: "location" },
//       )
//     }
//     // Payment/fare related
//     else if (message.includes("payment") || message.includes("fare") || message.includes("cost")) {
//       replies.push(
//         { id: "13", text: "Card payment please", category: "payment" },
//         { id: "14", text: "Cash is fine", category: "payment" },
//         { id: "15", text: "How much will it be?", category: "inquiry" },
//       )
//     }
//     // General questions
//     else if (message.includes("?")) {
//       replies.push(
//         { id: "16", text: "Yes", category: "answer" },
//         { id: "17", text: "No", category: "answer" },
//         { id: "18", text: "Let me check", category: "consideration" },
//       )
//     }
//     // Default replies for any driver message
//     else {
//       replies.push(
//         { id: "19", text: "OK", category: "acknowledgment" },
//         { id: "20", text: "Thanks", category: "gratitude" },
//         { id: "21", text: "Got it", category: "understanding" },
//       )
//     }

//     // Add some universal quick replies
//     replies.push(
//       { id: "22", text: "Call me", category: "action" },
//       { id: "23", text: "Cancel ride", category: "action" },
//     )

//     return replies.slice(0, 6) // Limit to 6 replies to avoid clutter
//   }

//   // Update smart replies when messages change
//   useEffect(() => {
//     const driverMessages = currentRideMessages.filter((m) => m.sender === "driver")
//     if (driverMessages.length > 0) {
//       const lastDriverMessage = driverMessages[driverMessages.length - 1]
//       const replies = generateSmartReplies(lastDriverMessage.text)
//       setSmartReplies(replies)
//     }
//   }, [currentRideMessages])

//   const sendMessage = (messageText?: string) => {
//     const textToSend = messageText || inputText
//     if (textToSend.trim() === "") return

//     // Add user message to store
//     addMessage({
//       text: textToSend,
//       sender: "user",
//       timestamp: new Date(),
//     })

//     setInputText("")

//     // Simulate driver response based on user message
//     setTimeout(() => {
//       const driverResponse = generateDriverResponse(textToSend)
//       addMessage({
//         text: driverResponse,
//         sender: "driver",
//         timestamp: new Date(),
//       })
//     }, 1000)
//   }

//   const generateDriverResponse = (userMessage: string) => {
//     const message = userMessage.toLowerCase()

//     if (message.includes("how far") || message.includes("how long")) {
//       return "I'm about 3 minutes away from your location."
//     } else if (message.includes("cancel")) {
//       return "Sure, I'll cancel the ride. Have a great day!"
//     } else if (message.includes("call")) {
//       return "I'll give you a call now."
//     } else if (message.includes("waiting") || message.includes("here")) {
//       return "Perfect! I can see you now."
//     } else if (message.includes("location") || message.includes("where")) {
//       return "I'm at the main entrance. Look for a blue Toyota."
//     } else if (message.includes("payment")) {
//       return "We can do card or cash, whatever works for you."
//     } else if (message.includes("thank") || message.includes("ok") || message.includes("got it")) {
//       return "You're welcome! See you soon."
//     } else {
//       return "Got it, thanks for letting me know!"
//     }
//   }

//   const handleSmartReply = (reply: SmartReply) => {
//     sendMessage(reply.text)
//     // Clear smart replies after selection to avoid spam
//     setSmartReplies([])
//   }

//   const renderMessage = ({ item }: { item: ChatMessage }) => {
//     const isUser = item.sender === "user"
//     return (
//       <View className={`my-1 ${isUser ? "items-end" : "items-start"}`}>
//         <View
//           className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm ${
//             isUser ? "bg-blue-500 rounded-br-md" : "bg-white rounded-bl-md"
//           }`}
//         >
//           <Text className={`text-base leading-5 ${isUser ? "text-white" : "text-gray-800"}`}>{item.text}</Text>
//           <Text className={`text-xs mt-1 ${isUser ? "text-white/70 text-right" : "text-gray-500"}`}>
//             {item.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
//           </Text>
//         </View>
//       </View>
//     )
//   }

//   // Show message if no active ride
//   if (!currentRideId) {
//     return (
//       <SafeAreaView className="flex-1 bg-gray-100">
//         <View className="bg-blue-500 py-4 px-5 border-b border-gray-200">
//           <Text className="text-white text-lg font-bold text-center">Chat with Driver</Text>
//         </View>
//         <View className="flex-1 justify-center items-center p-8">
//           <Text className="text-gray-500 text-lg font-medium text-center">No Active Ride</Text>
//           <Text className="text-gray-400 text-sm text-center mt-2">Start a ride to chat with your driver</Text>
//         </View>
//       </SafeAreaView>
//     )
//   }

//   return (
//     <SafeAreaView className="flex-1 bg-gray-100">
//       <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : "height"}>
//         {/* Header */}
//         <View className="bg-blue-500 py-4 px-5 border-b border-gray-200">
//           <Text className="text-white text-lg font-bold text-center">Chat with Driver</Text>
//           <Text className="text-white/80 text-sm text-center mt-1">{currentRideMessages.length} messages</Text>
//         </View>

//         {/* Messages */}
//         <FlatList
//           data={currentRideMessages}
//           renderItem={renderMessage}
//           keyExtractor={(item) => item.id}
//           className="flex-1"
//           contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
//           showsVerticalScrollIndicator={false}
//         />

//         {/* Smart Replies */}
//         {smartReplies.length > 0 && (
//           <View className="bg-white border-t border-gray-200 px-4 py-2">
//             <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16 }}>
//               {smartReplies.map((reply) => (
//                 <TouchableOpacity
//                   key={reply.id}
//                   className="bg-gray-100 border border-gray-300 rounded-full px-4 py-2 mr-2"
//                   onPress={() => handleSmartReply(reply)}
//                 >
//                   <Text className="text-gray-700 text-sm font-medium">{reply.text}</Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </View>
//         )}

//         {/* Input Area */}
//         <View className="flex-row items-end bg-white border-t border-gray-200 p-4">
//           <TextInput
//             className="flex-1 border border-gray-200 rounded-full px-4 py-3 max-h-[100px] text-base bg-gray-50"
//             value={inputText}
//             onChangeText={setInputText}
//             placeholder="Type a message..."
//             placeholderTextColor="#999"
//             multiline
//             maxLength={500}
//           />
//           <TouchableOpacity
//             className={`ml-3 px-5 py-3 rounded-full justify-center items-center ${
//               inputText.trim() ? "bg-blue-500" : "bg-gray-300"
//             }`}
//             onPress={() => sendMessage()}
//             disabled={!inputText.trim()}
//           >
//             <Text className={`text-base font-semibold ${inputText.trim() ? "text-white" : "text-gray-500"}`}>Send</Text>
//           </TouchableOpacity>
//         </View>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   )
// }

import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useChatStore } from '@/stores/useChatStore';
import { v4 as uuidv4 } from 'uuid';

type SmartReply = { text: string };

const ChatApp = () => {
  const {
    messages,
    currentRideId,
    addMessage,
  } = useChatStore();

  // ✅ Filter messages for current ride safely
  const currentRideMessages = messages.filter(
    (msg) => msg.rideId === currentRideId
  );

  const [text, setText] = useState('');
  const [smartReplies, setSmartReplies] = useState<SmartReply[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSmartReplies, setShowSmartReplies] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const [lastDriverText, setLastDriverText] = useState('');
  const [conversationContext, setConversationContext] = useState({
    hasGreeted: false,
    rideStage: 'initial' as 'initial' | 'on_way' | 'arriving' | 'completed',
    lastInteractionTime: null as Date | null,
  });

  // Enhanced driver response generation
  const generateDriverResponse = (userMessage: string, context: any) => {
    const lowerText = userMessage.toLowerCase();
    const responses = {
      greeting: [
        "Hi! I'm on my way to pick you up. Should be there in about 8 minutes.",
        "Hello! Just started heading your way. Traffic looks good - see you soon!",
        "Hey there! En route to your location. I'll be in a blue Toyota Camry.",
      ],
      acknowledgment: [
        "Perfect, thanks for letting me know!",
        "Got it, see you soon!",
        "Sounds good, thanks!",
        "Great, I'll keep an eye out for you.",
      ],
      arrival: [
        "I'm here! I'm parked right outside the main entrance.",
        "Just arrived - I'm in the blue car by the curb.",
        "I'm outside now. Take your time, no rush!",
        "Here and ready when you are. I'm near the front door.",
      ],
      delay: [
        "No worries at all! I'll wait right here.",
        "Take your time, I'm not in any hurry.",
        "That's totally fine - I'll be here when you're ready.",
        "No problem! I'll keep the car running.",
      ],
      location_help: [
        "I'm in a blue Toyota Camry, license plate ABC-123. Do you see me?",
        "I'm right by the main entrance. I can flash my headlights if that helps?",
        "Let me know what you're wearing and I'll keep an eye out!",
        "I'm parked on the street side. Should I move somewhere more visible?",
      ],
      small_talk: [
        "Thanks! How's your day going so far?",
        "Appreciate it! Beautiful weather today, isn't it?",
        "Thanks! Hope your day is treating you well.",
        "That's kind of you to say! Ready for a smooth ride?",
      ],
      default: [
        "Thanks for the message!",
        "Got it, thanks!",
        "Sounds good!",
        "Perfect!",
      ]
    };

    // Determine response category based on message content
    if (!context.hasGreeted && (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey'))) {
      return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    } else if (lowerText.includes('wait') || lowerText.includes('minute') || lowerText.includes('second')) {
      return responses.delay[Math.floor(Math.random() * responses.delay.length)];
    } else if (lowerText.includes('here') || lowerText.includes('outside') || lowerText.includes('ready')) {
      return responses.arrival[Math.floor(Math.random() * responses.arrival.length)];
    } else if (lowerText.includes('see') || lowerText.includes('find') || lowerText.includes('where') || lowerText.includes('car')) {
      return responses.location_help[Math.floor(Math.random() * responses.location_help.length)];
    } else if (lowerText.includes('thank') || lowerText.includes('great') || lowerText.includes('awesome')) {
      return responses.small_talk[Math.floor(Math.random() * responses.small_talk.length)];
    } else if (lowerText.includes('ok') || lowerText.includes('got it') || lowerText.includes('sure')) {
      return responses.acknowledgment[Math.floor(Math.random() * responses.acknowledgment.length)];
    }

    return responses.default[Math.floor(Math.random() * responses.default.length)];
  };

  // Generate smart replies based on last driver message
  useEffect(() => {
    const driverMessages = currentRideMessages.filter((m) => m.sender === 'driver');
    if (driverMessages.length === 0) return;

    const latestDriverText = driverMessages[driverMessages.length - 1].text;

    if (latestDriverText !== lastDriverText) {
      const replies = generateSmartReplies(latestDriverText);
      setSmartReplies(replies);
      setLastDriverText(latestDriverText);
      
      // Animate smart replies appearance
      if (replies.length > 0) {
        setShowSmartReplies(true);
        Animated.spring(slideAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 120,
          friction: 8,
        }).start();
      }
    }
  }, [currentRideMessages, lastDriverText]);

  // Auto-scroll on new message
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [currentRideMessages]);

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Animate send button
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    addMessage({
      text: textToSend,
      sender: 'user',
      timestamp: new Date(),
    });

    setText('');
    setShowSmartReplies(false);
    slideAnim.setValue(0);
    Keyboard.dismiss();

    // Show typing indicator
    setIsTyping(true);

    // Simulate realistic typing delay based on message length
    const typingDelay = Math.min(Math.max(textToSend.length * 50, 1000), 3000);

    setTimeout(() => {
      setIsTyping(false);
      
      const driverResponse = generateDriverResponse(textToSend, conversationContext);
      
      addMessage({
        text: driverResponse,
        sender: 'driver',
        timestamp: new Date(),
      });

      // Update conversation context
      setConversationContext(prev => ({
        ...prev,
        hasGreeted: true,
        lastInteractionTime: new Date(),
      }));
    }, typingDelay);
  };

  const generateSmartReplies = (text: string): SmartReply[] => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('on my way') || lowerText.includes('heading') || lowerText.includes('minutes')) {
      return [
        { text: 'Perfect, thanks!' },
        { text: 'Great! I\'ll be ready' },
        { text: 'Sounds good 👍' },
      ];
    } else if (lowerText.includes('here') || lowerText.includes('arrived') || lowerText.includes('outside')) {
      return [
        { text: 'Coming out now!' },
        { text: 'Be right there!' },
        { text: 'Just grabbing my things' },
      ];
    } else if (lowerText.includes('delayed') || lowerText.includes('late') || lowerText.includes('traffic')) {
      return [
        { text: 'No problem at all' },
        { text: 'Take your time' },
        { text: 'Thanks for the heads up' },
      ];
    } else if (lowerText.includes('car') || lowerText.includes('license') || lowerText.includes('flash')) {
      return [
        { text: 'I can see you!' },
        { text: 'Yes, that would help' },
        { text: 'I\'m in a red jacket' },
      ];
    } else if (lowerText.includes('wait') || lowerText.includes('no rush')) {
      return [
        { text: 'Almost ready!' },
        { text: 'Just one more minute' },
        { text: 'Appreciate your patience' },
      ];
    } else if (lowerText.includes('weather') || lowerText.includes('day') || lowerText.includes('how')) {
      return [
        { text: 'It really is nice!' },
        { text: 'Going well, thanks!' },
        { text: 'Can\'t complain!' },
      ];
    } else if (lowerText.includes('thank') || lowerText.includes('great') || lowerText.includes('perfect')) {
      return [
        { text: 'You too!' },
        { text: 'My pleasure' },
        { text: 'Glad to help' },
      ];
    }
    
    // Default replies for general messages
    return [
      { text: 'Thanks!' },
      { text: 'Got it 👍' },
      { text: 'Sounds good' },
    ];
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const renderTypingIndicator = () => (
    <View className="max-w-[70%] my-2 p-3 bg-gray-200 dark:bg-gray-700 self-start rounded-2xl rounded-bl-md">
      <View className="flex-row items-center">
        <Text className="text-gray-600 dark:text-gray-300 mr-2">Driver is typing</Text>
        <View className="flex-row">
          {[0, 1, 2].map((index) => (
            <Animated.View
              key={index}
              className="w-2 h-2 bg-gray-500 rounded-full mx-0.5"
              style={{
                transform: [{
                  scale: slideAnim.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.5, 1, 0.5],
                  })
                }],
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );

  const renderMessage = ({ item, index }: { item: any; index: number }) => {
    const isUser = item.sender === 'user';
    const isLastMessage = index === currentRideMessages.length - 1;
    
    return (
      <Animated.View
        style={{
          transform: [{
            translateY: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            })
          }],
          opacity: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.7, 1],
          })
        }}
      >
        <View
          className={`max-w-[80%] my-1 ${
            isUser ? 'self-end' : 'self-start'
          }`}
        >
          <View
            className={`p-4 ${
              isUser 
                ? 'bg-blue-500 shadow-lg shadow-blue-500/25' 
                : 'bg-white dark:bg-gray-800 shadow-lg shadow-gray-500/10'
            } rounded-3xl ${
              isUser ? 'rounded-br-lg' : 'rounded-bl-lg'
            }`}
            style={{
              elevation: 3,
            }}
          >
            <Text 
              className={`text-base leading-5 ${
                isUser ? 'text-white' : 'text-gray-900 dark:text-white'
              }`}
            >
              {item.text}
            </Text>
          </View>
          <Text 
            className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${
              isUser ? 'text-right mr-2' : 'text-left ml-2'
            }`}
          >
            {formatTime(item.timestamp)}
          </Text>
        </View>
      </Animated.View>
    );
  };

  const renderSmartReply = (reply: SmartReply, index: number) => (
    <Animated.View
      key={index}
      style={{
        transform: [{
          translateY: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [30, 0],
          })
        }],
        opacity: slideAnim,
      }}
    >
      <TouchableOpacity
        onPress={() => handleSend(reply.text)}
        className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 rounded-full mr-2 mb-2 shadow-sm"
        style={{
          elevation: 1,
        }}
        activeOpacity={0.8}
      >
        <Text className="text-gray-800 dark:text-gray-200 font-medium">
          {reply.text}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-50 dark:bg-gray-900"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      {/* Chat Header */}
      <View className="bg-white dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <View className="flex-row items-center mt-12">
          <View className="w-3 h-3 bg-green-500 rounded-full mr-3" />
          <Text className="text-lg font-semibold text-gray-900 dark:text-white">
            Driver Chat
          </Text>
        </View>
      </View>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={currentRideMessages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ 
          padding: 16,
          paddingBottom: showSmartReplies ? 8 : 16 
        }}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        ListFooterComponent={isTyping ? renderTypingIndicator : null}
      />

      {/* Smart Replies */}
      {showSmartReplies && smartReplies.length > 0 && (
        <Animated.View 
          className="px-4 pb-2"
          style={{
            transform: [{
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              })
            }],
          }}
        >
          <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-medium">
            Quick replies:
          </Text>
          <View className="flex-row flex-wrap">
            {smartReplies.map(renderSmartReply)}
          </View>
        </Animated.View>
      )}

      {/* Input Area */}
      <View className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <View className="flex-row items-end">
          <View className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-3xl px-4 py-2 mr-3 shadow-sm">
            <TextInput
              ref={inputRef}
              className="text-base text-gray-900 dark:text-white max-h-24"
              placeholder="Type a message..."
              placeholderTextColor="#9CA3AF"
              value={text}
              onChangeText={setText}
              multiline
              textAlignVertical="center"
              onFocus={() => {
                setTimeout(() => {
                  flatListRef.current?.scrollToEnd({ animated: true });
                }, 100);
              }}
            />
          </View>
          
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity
              onPress={() => handleSend(text)}
              className={`w-12 h-12 rounded-full items-center justify-center shadow-lg ${
                text.trim() 
                  ? 'bg-blue-500 shadow-blue-500/25' 
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
              style={{ elevation: 3 }}
              disabled={!text.trim()}
              activeOpacity={0.8}
            >
              <Ionicons 
                name="send" 
                size={20} 
                color={text.trim() ? "white" : "#9CA3AF"} 
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatApp;