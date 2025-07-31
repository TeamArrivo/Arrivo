

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  ScrollView,
} from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// handleNavigate will be defined inside the component to access onClose prop

interface Props {
  visible: boolean;
  onClose: () => void;
}

const AnimatedDrawer = ({ visible, onClose }: Props) => {
  const slideAnim = useRef(new Animated.Value(-width)).current;

  // Move handleNavigate inside the component to access onClose
  const handleNavigate = (path: '/' | '/(root)/(tabs)/home' | '/(root)/(drivertabs)/home') => {
    onClose(); // close drawer first
    router.push(path);
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : -width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  // @ts-ignore: getValue() is not officially typed but available at runtime
  if (!visible) return null;

  return (
    <View style={styles.container}>
      {/* Drawer Slide-in View */}
      <Animated.View
        style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header/Profile */}
          <View style={styles.profileSection}>
            <View style={styles.avatarPlaceholder} />
            <View>
              <Text style={styles.username}>Joel</Text>
              <Text style={styles.subtitle}>My account</Text>
              <Text style={styles.rating}>⭐ 5.00 Rating</Text>
            </View>
          </View>

          {/* Menu Items */}
          {[
            { label: 'Payment', icon: <Feather name="credit-card" size={20} />, path: '/(root)/(tabs)/home' },
            { label: 'Promotions', icon: <Feather name="tag" size={20} />, path: '/(root)/(tabs)/home' },
            { label: 'My Rides', icon: <MaterialIcons name="history" size={20} />, path: '/(root)/(tabs)/home' },
            { label: 'Safety', icon: <Ionicons name="shield-checkmark-outline" size={20} />, path: '/(root)/(tabs)/home' },
            { label: 'Support', icon: <Feather name="help-circle" size={20} />, path: '/(root)/(tabs)/home' },
            { label: 'About', icon: <Feather name="info" size={20} />, path: '/(root)/about' },
          ].map((item, index) => (
            <View key={index} style={styles.menuItem}>
              {item.icon}
              <Text style={styles.itemText}>{item.label}</Text>
            </View>
          ))}

          {/* Footer */}
          <View style={styles.bottomSection}>
            <Text style={styles.bottomLink}>🍽️ Bolt Food</Text>
            <View style={styles.promoBox}>
              <Text style={styles.promoTitle}>Become a driver</Text>
              <Text style={styles.promoSubtitle}>Earn money on your schedule</Text>
            </View>
          </View>
        </ScrollView>
      </Animated.View>

      {/* Backdrop */}
      <TouchableOpacity onPress={onClose} style={styles.backdrop} />
    </View>
  );
};

export default AnimatedDrawer;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    flexDirection: 'row',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  drawer: {
    width: width * 0.75,
    backgroundColor: '#fff',
    padding: 20,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    gap: 12,
    paddingTop: 30,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'green',
    fontSize: 14,
  },
  rating: {
    color: '#111',
    fontSize: 13,
    marginTop: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 12,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  bottomSection: {
    marginTop: 30,
  },
  bottomLink: {
    fontSize: 16,
    marginBottom: 20,
  },
  promoBox: {
    backgroundColor: '#D1FAE5',
    padding: 16,
    borderRadius: 8,
  },
  promoTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 12,
    color: '#333',
  },
});
