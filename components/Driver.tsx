import { StyleSheet,Image } from 'react-native'
import React from 'react'
import { MarkerAnimated } from 'react-native-maps'
import car from "@/assets/icons copy/selected-marker.png"

type DriverProps = {
  uid: string;
  location: { latitude: number; longitude: number };
};

export default function Driver({ uid, location }: DriverProps) {
  return (
    <MarkerAnimated key={uid} coordinate={location} anchor={{x:0.35,y:0.32}}>
      <Image source={car} style={styles.image} />
    </MarkerAnimated>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});