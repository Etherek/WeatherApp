import {View, Alert, Text, Image} from 'react-native'
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location' 
import {useState} from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const apiKey = 'fd084915b60c86f45f8b8fd3eb523290';

function LocationPicker(){
  const [isVisible, setIsVisible] = useState(false)
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();
  const [weatherDescripton, setWeatherDescription] = useState();
  const [temperature,setTemperature]=useState();
  const [minimalTemperature,setMinimalTemperature]=useState();
  const [maximalTemperature,setMaximalTemperature]=useState();
  const [city,setCity]=useState();
  const [sunrise,setSunrise]=useState();
  const [sunset,setSunset]=useState();
  const [weatherIcon,setWeatherIcon]=useState();
  const sunriseDate=new Date(sunrise);
  const sunriseHours = sunriseDate.getHours();
  const sunriseMinute ="0" + sunriseDate.getMinutes();
  const sunriseTime= sunriseHours +':'+ sunriseMinute;
  const sunsetDate=new Date(sunset);
  const sunsetHours = sunsetDate.getHours();
  const sunsetMinutes = "0" + sunsetDate.getMinutes();
  const sunsetTime = sunsetHours + ':' + sunsetMinutes;
  async function getLocationHandler(){
    const hasPermission = await veryfiPermissions();
    if(!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(url);
    console.log(data.weather[0].description);
    if (!response.ok){
      Alert.alert('Something is wrong');
    } 
    setWeatherDescription(data.weather[0].description);
    setTemperature(Math.round(data.main.temp-273.15))
    setMinimalTemperature(Math.round(data.main.temp_min-273.15))
    setMaximalTemperature(Math.round(data.main.temp_max-273.15))
    setCity(data.name)
    setSunrise(data.sys.sunrise * 1000)
    setSunset(data.sys.sunset * 1000)
    setWeatherIcon(data.weather[0].icon);
    setIsVisible(true);
  }
  async function veryfiPermissions(){
    if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED){
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    } 
    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert('You need to grant permission in order to use GPS');
      return false;
    }
    return true;
  }


    return(
        <View >
          <View>
            <MaterialCommunityIcons name="crosshairs-gps" size={24} color="black" onPress={getLocationHandler}/>
          </View>
          {isVisible ? (
          <View>
            <Text>{weatherDescripton}</Text>
            <Image style={{width: 100, height: 100}} source={
              {uri: `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}}></Image>
            <Text>Today's minimal temperature: {minimalTemperature}</Text>
            <Text>Actual temperature: {temperature}</Text>
            <Text>Today's maximal temperature: {maximalTemperature}</Text>
            <Text>{city}</Text>
            <Text>{sunriseTime}</Text>
            <Text>{sunsetTime}</Text></View>
          ) : null }
        </View>
    )
    }


export default LocationPicker;

