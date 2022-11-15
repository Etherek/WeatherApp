import { Alert, Button, StyleSheet, Text, TextInput, View , Image} from 'react-native';
import {useRef, useState} from 'react'




function SearchLocation(){
    const [isVisible,setIsVisible] = useState(false);
    const [city,setCity] = useState('No city');
    const [weatherDescripton, setWeatherDescription] = useState();
    const [temperature,setTemperature]=useState();
    const [minimalTemperature,setMinimalTemperature]=useState();
    const [maximalTemperature,setMaximalTemperature]=useState();
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
    async function getData(){
        const apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fd084915b60c86f45f8b8fd3eb523290`
        const response = await fetch(apiCall);
        const data = await response.json();
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
        setIsVisible(true)
    }    
    return(
        <View>
            <View>
                <TextInput placeholder='Search city' onChangeText={setCity}></TextInput>
                <Button onPress={getData} title='Enter'/>
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
                <Text>{sunsetTime}</Text>
            </View>
            ): null}
        </View>
    )
}

export default SearchLocation;