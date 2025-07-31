import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { GiftedChat, IMessage, User } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface Driver {
  id: string;
  name: string;
  rating?: number;
  vehicleInfo?: {
    make: string;
    model: string;
    plateNumber: string;
  };
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Get driver info from params or your global state
  const driver: Driver = {
    id: params.driverId as string || 'driver1',
    name: params.driverName as string || 'John Doe',
    rating: parseFloat(params.driverRating as string) || 4.8,
    vehicleInfo: {
      make: params.vehicleMake as string || 'Toyota',
      model: params.vehicleModel as string || 'Camry',
      plateNumber: params.plateNumber as string || 'ABC-123'
    }
  };

  const rider: User = {
    _id: 1,
    name: 'You',
  };

  const driverUser: User = {
    _id: 2,
    name: driver.name,
    avatar: undefined, // You can add driver avatar URL here
  };

  useEffect(() => {
    // Initialize chat with driver's greeting
    setMessages([
      {
        _id: 1,
        text: `Hi! I'm ${driver.name}. I'm on my way to your pickup location.`,
        createdAt: new Date(),
        user: driverUser,
      },
    ]);
  }, [driver.name, driverUser]);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
    
    const riderMessage = newMessages[0].text;
    
    // Simulate driver response
    setTimeout(() => {
      const reply: IMessage = {
        _id: Math.random().toString(),
        text: generateDriverReply(riderMessage),
        createdAt: new Date(),
        user: driverUser,
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [reply])
      );
    }, 1500);
  }, [driverUser]);

  const generateDriverReply = (msg: string) => {
    const lowerMsg = msg.toLowerCase();
    
    if (lowerMsg.includes('how far') || lowerMsg.includes('eta') || lowerMsg.includes('time')) {
      return 'I\'m about 2 minutes away from your location.';
    }
    if (lowerMsg.includes('cancel')) {
      return 'Okay, no problem. Have a great day!';
    }
    if (lowerMsg.includes('where') || lowerMsg.includes('location')) {
      return 'I can see your location on the map. Almost there!';
    }
    if (lowerMsg.includes('thank') || lowerMsg.includes('thanks')) {
      return 'You\'re welcome! Happy to help.';
    }
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      return 'Hello! I\'m on my way to pick you up.';
    }
    if (lowerMsg.includes('traffic')) {
      return 'Traffic looks good on my end. Should be there soon!';
    }
    if (lowerMsg.includes('wait') || lowerMsg.includes('waiting')) {
      return 'No worries, I can wait a few minutes for you.';
    }
    if (lowerMsg.includes('color') || lowerMsg.includes('car')) {
      return `I'm driving a ${driver.vehicleInfo?.make} ${driver.vehicleInfo?.model}, plate number ${driver.vehicleInfo?.plateNumber}.`;
    }
    
    return 'Got it! I\'ll be there shortly.';
  };

  const handleCall = () => {
    // In a real app, you would initiate a phone call here
    // For example: Linking.openURL(`tel:${driverPhoneNumber}`)
    console.log('Calling driver...');
  };

  const handleBack = () => {
    router.back();
  };

  const renderBubble = (props: any) => {
    const isCurrentUser = props.currentMessage?.user._id === rider._id;
    
    return (
      <View
        style={{
          backgroundColor: isCurrentUser ? '#2563EB' : '#E5E7EB',
          padding: 12,
          borderRadius: 16,
          marginBottom: 4,
          marginHorizontal: 8,
          maxWidth: '80%',
          alignSelf: isCurrentUser ? 'flex-end' : 'flex-start'
        }}
      >
        <Text
          style={{
            color: isCurrentUser ? 'white' : 'black',
            fontSize: 16
          }}
        >
          {props.currentMessage?.text}
        </Text>
        <Text
          style={{
            color: isCurrentUser ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)',
            fontSize: 12,
            marginTop: 4
          }}
        >
          {new Date(props.currentMessage?.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Text>
      </View>
    );
  };

  const renderInputToolbar = (props: any) => (
    <View
      style={{
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB'
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 24,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderWidth: 1,
          borderColor: '#D1D5DB'
        }}
      >
        <TextInput
          {...props.textInputProps}
          style={{
            flex: 1,
            fontSize: 16,
            color: 'black',
            paddingVertical: 8
          }}
          placeholder="Type your message..."
          placeholderTextColor="#9CA3AF"
          multiline
        />
        <TouchableOpacity
          onPress={() => {
            if (props.text && props.text.trim()) {
              props.onSend([{
                _id: Math.random().toString(),
                text: props.text.trim(),
                createdAt: new Date(),
                user: rider
              }]);
            }
          }}
          style={{
            backgroundColor: props.text && props.text.trim() ? '#2563EB' : '#D1D5DB',
            borderRadius: 20,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 8
          }}
          disabled={!props.text || !props.text.trim()}
        >
          <Ionicons 
            name="send" 
            size={20} 
            color={props.text && props.text.trim() ? 'white' : '#9CA3AF'} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: '#2563EB',
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={handleBack} style={{ marginRight: 16 }}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              {driver.name}
            </Text>
            <Text style={{ color: '#BFDBFE', fontSize: 14 }}>
              ⭐ {driver.rating} • {driver.vehicleInfo?.plateNumber}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleCall}
          style={{
            backgroundColor: '#10B981',
            borderRadius: 20,
            padding: 8
          }}
        >
          <Ionicons name="call" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View
        style={{
          backgroundColor: '#F9FAFB',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#E5E7EB'
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity
            onPress={() => onSend([{
              _id: Math.random().toString(),
              text: 'How far are you?',
              createdAt: new Date(),
              user: rider
            }])}
            style={{
              backgroundColor: '#EBF5FF',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#2563EB'
            }}
          >
            <Text style={{ color: '#2563EB', fontSize: 12, fontWeight: '500' }}>
              How far?
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => onSend([{
              _id: Math.random().toString(),
              text: 'I\'m waiting for you',
              createdAt: new Date(),
              user: rider
            }])}
            style={{
              backgroundColor: '#EBF5FF',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#2563EB'
            }}
          >
            <Text style={{ color: '#2563EB', fontSize: 12, fontWeight: '500' }}>
              I'm waiting
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => onSend([{
              _id: Math.random().toString(),
              text: 'Thank you!',
              createdAt: new Date(),
              user: rider
            }])}
            style={{
              backgroundColor: '#EBF5FF',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#2563EB'
            }}
          >
            <Text style={{ color: '#2563EB', fontSize: 12, fontWeight: '500' }}>
              Thank you
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat Interface */}
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={rider}
        placeholder="Type your message..."
        alwaysShowSend
        showAvatarForEveryMessage={false}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        minInputToolbarHeight={80}
        messagesContainerStyle={{
          backgroundColor: 'white',
          paddingHorizontal: 8
        }}
      />
    </SafeAreaView>
  );
}