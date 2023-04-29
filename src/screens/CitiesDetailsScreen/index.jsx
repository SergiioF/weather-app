import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

import { fetchWeatherHourly } from "../../services/api";
import ForecastPerHourlyRender from "./ForecastPerHourlyRender";
import CurrentWeatherDetails from "./CurrentWeatherDetails";

const CitiesDetailsScreen = ({ route }) => {
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [loading, setLoading] = useState(true);

  const cityValues = route.params;
  const { lat, lon } = cityValues;
  const fetchWeatherPerHourly = async () => {
    try {
      const response = await fetchWeatherHourly(lat, lon);
      setHourlyWeather([response]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeatherPerHourly();
    console.log(hourlyWeather);
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "#2C4350",
            fontFamily: "Dosis_500Medium",
            textAlignVertical: "center",
          }}
        ></Text>
        <Text
          style={{
            fontSize: 35,
            color: "#2C4350",
            fontFamily: "Dosis_500Medium",
            textAlignVertical: "center",
          }}
        >
          {cityValues.name}
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "#91A5B0",
            fontFamily: "Dosis_500Medium",
            textAlignVertical: "center",
          }}
        >
          {cityValues.weather[0].description.charAt(0).toUpperCase() +
            cityValues.weather[0].description.slice(1)}
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
          maxHeight: 100,
        }}
      >
        <Image
          style={styles.weatherImage}
          source={{
            uri: `https://openweathermap.org/img/wn/${cityValues.weather[0].icon}@2x.png`,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Entypo name="water" size={24} color="#91A5B0" />
          <Text
            style={{
              fontSize: 14,
              color: "#91A5B0",
              fontFamily: "Dosis_500Medium",
              textAlignVertical: "center",
              marginTop: 2,
            }}
          >
            {cityValues.main.humidity} %
          </Text>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 50,
              color: "#2C4350",
              fontFamily: "Dosis_600SemiBold",
              textAlignVertical: "center",
            }}
          >
            {Math.round(cityValues.main.temp)}°C
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#91A5B0",
              fontFamily: "Dosis_500Medium",
              textAlignVertical: "center",
            }}
          >
            Feels like : {Math.round(cityValues.main.feels_like)}°C
          </Text>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Feather name="wind" size={24} color="#91A5B0" />

          <Text
            style={{
              fontSize: 14,
              color: "#91A5B0",
              fontFamily: "Dosis_500Medium",
              textAlignVertical: "center",
              marginTop: 2,
            }}
          >
            {Math.round(cityValues.wind.speed)} km/h
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "#91A5B0",
            fontFamily: "Dosis_500Medium",
            textAlignVertical: "center",
          }}
        >
          Min: {Math.round(cityValues.main.temp_min)}°C Max:{" "}
          {Math.round(cityValues.main.temp_max)}°C
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            borderRadius: 50,
            paddingHorizontal: 10,
            paddingVertical: 5,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: "#2C4350",
              fontFamily: "Dosis_500Medium",
              textAlignVertical: "center",
            }}
          >
            View 5 days Forecast
          </Text>
          <Feather
            style={{ marginLeft: 10 }}
            name="arrow-right"
            size={20}
            color="#2C4350"
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: "center",
          marginVertical: 20,
        }}
      >
        {loading && <ActivityIndicator size="large" color={"#062964"} />}
        {hourlyWeather && (
          <FlatList
            horizontal={false}
            data={hourlyWeather}
            renderItem={({ item }) => <ForecastPerHourlyRender item={item} />}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
      <View
        style={{
          justifyContent: "center",
        }}
      >
        {loading && <ActivityIndicator size="large" color={"#062964"} />}
        <FlatList
          horizontal={false}
          data={hourlyWeather}
          renderItem={({ item }) => <CurrentWeatherDetails item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default CitiesDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4979CC",
  },
  weatherImage: {
    width: 180,
    height: 180,
  },
});
