// menuDrawer.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import ProfileScreen from '@/app/(root)/(tabs)/profile';


const Drawer = createDrawerNavigator();

const MenuDrawer = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: { backgroundColor: '#fff', width: 240 },
          headerShown: false,
        }}
      >
        
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MenuDrawer;
