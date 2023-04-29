import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import { fetchWeatherData } from "../../services/api";

export const WeatherContext = createContext([]);

function WeatherProvider({ children }) {
  const [weatherData, setWeatherData] = useState([]);

  const addWeatherData = async (cityValues) => {
    const [lat, lon] = cityValues?.value?.split(" ");
    if (
      cityValues &&
      !weatherData.some((city) => city.lat === lat && city.lon === lon)
    ) {
      const response = await fetchWeatherData(lat, lon);

      const isDuplicateCity = weatherData.some(
        (city) => city.name === response.name
      );
      if (!isDuplicateCity) {
        setWeatherData((prevWeatherData) => [
          ...prevWeatherData,
          { ...response, lat, lon },
        ]); // asi se garantiza obetener el estado actualizado
      } else {
        Alert.alert("Don´t repeat city", "Please, don´t select the same city", [
          { text: "OK" },
        ]);
      }
    }
  };

  return (
    <WeatherContext.Provider value={{ weatherData, addWeatherData }}>
      {children}
    </WeatherContext.Provider>
  );
}

export default WeatherProvider;
