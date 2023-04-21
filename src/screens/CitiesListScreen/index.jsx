import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { fetchWeatherData } from '../../services/api'

const backgroundImage = require('../../../assets/Rectangle.png');
import { Feather } from '@expo/vector-icons';
// import { Container } from './styles';

const CitiesListScreen = ({ route, navigation }) => {
  const [weatherData, setWeatherData] = useState([]);

  const cityValues = route.params;
  console.log(cityValues)
  // const {lat, lon} = cityValues.value.split(" ") // capaz se pueda hacer en el ultimo momento para manejar mejor las variables

  const addCity = async () => {
    navigation.navigate('Select City')
  }

  useEffect(() => {
    const fetchCurrentWeatherData = async () => {
      if (cityValues) {
        const [lat, lon] = cityValues.value.split(" ");
        const response = await fetchWeatherData(lat, lon);
        setWeatherData(prevWeatherData => [...prevWeatherData, response]); // asi se garantiza obetener el estado actualizado
      }
    };
    fetchCurrentWeatherData();

    return async () => {
      const dataToSave = JSON.stringify(weatherData); // convierte el estado en una cadena JSON para guardarlo
      await AsyncStorage.setItem('weatherData', dataToSave); // guarda el estado en el almacenamiento local
    };

  }, [cityValues]); // verificar una explicacion con Gonzalo
  console.log(weatherData)

  return (
    <View style={styles.container}>
      {weatherData.map(data => {
        return data.main ? ( // <--- Verificar si hay datos antes de mostrarlos
          <View key={data.id} style={{ marginTop: 80, paddingHorizontal: 30, position: "relative" }}>
            <ImageBackground source={backgroundImage} resizeMode="cover">
              <View style={{ marginHorizontal: 10, padding: 10, justifyContent: 'center' }}>
                <Text style={{ fontSize: 70, color: 'white', fontFamily: 'Dosis_700Bold', textAlignVertical: 'center' }}>
                  {Math.round(data.main.temp)}°C
                </Text>
                <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ alignContent: 'center' }}>
                    <Text style={{ fontSize: 18, color: '#EBEBF5', fontFamily: 'Dosis_700Bold' }}>H: {Math.round(data.main.temp_max)}°C   L: {Math.round(data.main.temp_min)}°C</Text>
                    <Text style={{ fontSize: 22, color: 'white', fontFamily: 'Dosis_700Bold' }}>{data.name}, {data.sys.country}</Text>
                  </View>
                  <View style={{ alignSelf: 'flex-end', justifyContent: "center" }}>
                    <Text style={{ color: 'white', fontFamily: 'Dosis_700Bold' }}>{data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}</Text>
                  </View>
                </View>
              </View>
            </ImageBackground>
            <Image
              style={styles.weatherImage}
              source={require('../../../assets/cloudy/cloudy.png')}
            />
          </View>
        ) : (
          // Mostrar un mensaje de carga mientras se espera la respuesta
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20 }}>Loading weather data...</Text>
          </View>
        )
      })
      }

      <View style={{ alignItems: 'center', bottom: 80 }}>
        <Pressable onPress={addCity} >
          <View style={{
            backgroundColor: 'rgba(288, 288, 288, 0.3)',
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 3,
            overflow: 'hidden'
          }}>
            <Feather name="plus" size={60} color="white" />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default CitiesListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4979CC',
    justifyContent: 'space-between',
  },
  weatherImage: {
    position: 'absolute',
    right: 40
  }
});