// components/LoadingOverlay.tsx
import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Modal } from 'react-native';

type Props = {
  visible: boolean;
  message?: string;
};

const LoadingOverlay = ({ visible, message = 'Please wait...' }: Props) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#4ADE80" />
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    backgroundColor: '#1F2937',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  message: {
    marginTop: 12,
    color: 'white',
    fontSize: 16,
  },
});
