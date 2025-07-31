// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Modal,
//   Pressable,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';

// type ServiceItem = {
//   name: string;
//   available: boolean;
//    route?: string; // valid expo-router route
// };


// const services = [
//   { name: 'Ride Booking', available: true, route: '/bookride' },
//   { name: 'Parcel Delivery', available: false },
//   { name: 'Food Orders', available: false },
//   { name: 'Wallet & Payments', available: true, route: '/wallet' },
//   { name: 'Trip History', available: true, route: '/trip-history' },
// ];

// const SupportScreen = () => {
//   const router = useRouter();
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalService, setModalService] = useState('');

//   const handleServicePress = (service: typeof services[0]) => {
//     if (service.available && service.route) {
//       router.push(service.route as any);
//     } else {
//       setModalService(service.name);
//       setModalVisible(true);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-black px-6 pt-16 pb-10">
//       {/* Back Button */}
//       <TouchableOpacity onPress={() => router.back()} className="absolute top-14 left-6 z-10">
//         <Ionicons name="arrow-back" size={28} color="white" />
//       </TouchableOpacity>

//       {/* Header */}
//       <Text className="text-3xl font-bold text-white mb-2 text-center">
//         Discover Our Services
//       </Text>
//       <Text className="text-base text-gray-400 text-center mb-6">
//         Explore all that our app offers. Tap a service to learn more.
//       </Text>

//       {/* Services List */}
//       <View className="space-y-4">
//         {services.map((service, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => handleServicePress(service)}
//             className={`rounded-2xl px-5 py-4 ${
//               service.available ? 'bg-zinc-800' : 'bg-zinc-900'
//             } border border-zinc-700`}
//           >
//             <Text className="text-lg font-semibold text-white">{service.name}</Text>
//             {!service.available && (
//               <Text className="text-sm text-yellow-400 mt-1">Coming Soon</Text>
//             )}
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Coming Soon Modal */}
//       <Modal
//         transparent
//         visible={modalVisible}
//         animationType="fade"
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View className="flex-1 justify-center items-center bg-black/60 px-6">
//           <View className="bg-zinc-900 p-6 rounded-2xl w-full max-w-md shadow-lg">
//             <Text className="text-xl font-bold text-white mb-2">Coming Soon</Text>
//             <Text className="text-base text-gray-300 mb-6">
//               The "{modalService}" service is not available yet. Stay tuned!
//             </Text>
//             <Pressable
//               onPress={() => setModalVisible(false)}
//               className="bg-blue-600 py-3 rounded-xl items-center"
//             >
//               <Text className="text-white font-semibold text-base">Okay</Text>
//             </Pressable>
//           </View>
//         </View>
//       </Modal>
//     </ScrollView>
//   );
// };

// export default SupportScreen;



import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type ServiceItem = {
  name: string;
  available: boolean;
  route?: string;
};

const services: ServiceItem[] = [
  { name: 'Ride Booking', available: true, route: '/bookride' },
  { name: 'Parcel Delivery', available: false },
  { name: 'Food Orders', available: false },
  { name: 'Wallet & Payments', available: true, route: '/wallet' },
  { name: 'Trip History', available: true, route: '/trip-history' },
];

const SupportScreen = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [modalVisible, setModalVisible] = useState(false);
  const [modalService, setModalService] = useState('');

  const handleServicePress = (service: ServiceItem) => {
    if (service.available && service.route) {
      router.push(service.route as any);
    } else {
      setModalService(service.name);
      setModalVisible(true);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      className={`${isDark ? 'bg-black' : 'bg-white'} px-6 pt-16 pb-10`}
    >
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-14 left-6 z-10"
      >
        <Ionicons
          name="arrow-back"
          size={28}
          color={isDark ? 'white' : 'black'}
        />
      </TouchableOpacity>

      {/* Header */}
      <Text
        className={`text-3xl font-bold mb-2 text-center ${
          isDark ? 'text-white' : 'text-black'
        }`}
      >
        Discover Our Services
      </Text>
      <Text
        className={`text-base text-center mb-6 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}
      >
        Explore all that our app offers. Tap a service to learn more.
      </Text>

      {/* Services List */}
      <View className="space-y-4">
        {services.map((service, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleServicePress(service)}
            className={`rounded-2xl px-5 py-4 border ${
              service.available
                ? isDark
                  ? 'bg-zinc-800 border-zinc-700'
                  : 'bg-gray-100 border-gray-300'
                : isDark
                ? 'bg-zinc-900 border-zinc-800'
                : 'bg-gray-200 border-gray-300'
            }`}
          >
            <Text
              className={`text-lg font-semibold ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              {service.name}
            </Text>
            {!service.available && (
              <Text
                className={`text-sm mt-1 ${
                  isDark ? 'text-yellow-400' : 'text-yellow-600'
                }`}
              >
                Coming Soon
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Coming Soon Modal */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/60 px-6">
          <View
            className={`p-6 rounded-2xl w-full max-w-md shadow-lg ${
              isDark ? 'bg-zinc-900' : 'bg-white'
            }`}
          >
            <Text
              className={`text-xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              Coming Soon
            </Text>
            <Text
              className={`text-base mb-6 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              The "{modalService}" service is not available yet. Stay tuned!
            </Text>
            <Pressable
              onPress={() => setModalVisible(false)}
              className="bg-blue-600 py-3 rounded-xl items-center"
            >
              <Text className="text-white font-semibold text-base">Okay</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default SupportScreen;

