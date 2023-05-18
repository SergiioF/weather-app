import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable, FlatList, ActivityIndicator } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { fetchWeatherHourly } from "../../services/api";
import ForecastPerHourlyRender from "./ForecastPerHourlyRender";
import CurrentWeatherDetails from "./CurrentWeatherDetails";

const CitiesDetailsScreen = ({ route }) => {
  const navigation = useNavigation();
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const options = { weekday: "long", day: "numeric", month: "short" };
  const formattedDate = today.toLocaleDateString("en-US", options);
  const cityValues = route.params;
  const { lat, lon } = cityValues;
  const fetchWeatherPerHourly = async () => {
    try {
      const response = await fetchWeatherHourly(lat, lon);
      setHourlyWeather(response);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const goToForecastPerDay = async (item) => {
    const weatherValues = item;

    navigation.navigate("Forecast Per Day", weatherValues);
  };

  useEffect(() => {
    fetchWeatherPerHourly();
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#2C4350",
            fontFamily: "Dosis_500Medium",
            textAlignVertical: "center",
          }}
        >
          {formattedDate}
        </Text>
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
          {cityValues.weather[0].description.charAt(0).toUpperCase() + cityValues.weather[0].description.slice(1)}
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
          flexDirection: "row",
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
          Min: {Math.round(cityValues.main.temp_min)}°C
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#91A5B0",
            fontFamily: "Dosis_500Medium",
            textAlignVertical: "center",
            marginLeft: 5,
          }}
        >
          Max: {Math.round(cityValues.main.temp_max)}°C
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Pressable
          onPress={() => goToForecastPerDay(hourlyWeather)}
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
          <Feather style={{ marginLeft: 10 }} name="arrow-right" size={20} color="#2C4350" />
        </Pressable>
      </View>
      <View
        style={{
          justifyContent: "center",
          marginVertical: 20,
        }}
      >
        {loading && <ActivityIndicator size="large" color={"#062964"} />}
        {hourlyWeather && <ForecastPerHourlyRender forecast={hourlyWeather} />}
      </View>
      <View
        style={{
          justifyContent: "center",
        }}
      >
        {loading && <ActivityIndicator size="large" color={"#062964"} />}
        {/* <FlatList
          horizontal={true}
          data={hourlyWeather}
          renderItem={({ item }) => <CurrentWeatherDetails current={item} />}
          keyExtractor={(item) => item.id}
        // /> */}
        <CurrentWeatherDetails currentData={hourlyWeather} />
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
