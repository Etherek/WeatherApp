import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import LocationPicker from './getLocation'




export default function App() {
  return (
    <View style={styles.container}>
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
