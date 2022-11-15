import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LocationPicker from './getLocation'
import SearchLocation from './searchLocation';



export default function App() {
  return (
    <View style={styles.container}>
      <SearchLocation></SearchLocation>
      <LocationPicker></LocationPicker>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
