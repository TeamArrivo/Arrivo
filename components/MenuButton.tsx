// import { StatusBar, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import {Feather} from "@expo/vector-icons"

// const MenuButton = () => {
//   return (
//     <View style={styles.container}>
//       <Feather name="menu" size={24} color="black" />
//     </View>
//   )
// }

// export default MenuButton

// const styles = StyleSheet.create({
//   container: {
//     zIndex: 5,
//     position: "absolute",
//     top: (StatusBar.currentHeight ?? 0) * 1.5,
//     left: 20,
//     backgroundColor: "white",
//     width: 50,
//     height: 50,
//     borderRadius: 50,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// })


// ...other imports

import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type MenuButtonProps = {
  onPress: () => void;
};

const MenuButton: React.FC<MenuButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Ionicons name="menu" size={28} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 8,
    elevation: 4,
  },
});

export default MenuButton;