import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
const apiKey = 'fd084915b60c86f45f8b8fd3eb523290';
const apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?id=524901&appid='+apiKey;
import LocationPicker from './getLocation'
import SearchLocation from './searchLocation';



export default function App() {

  
  const [enteredText, setEnteredText] =useState('');
  const [searchCityName, setSearchCityName] =useState();

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
