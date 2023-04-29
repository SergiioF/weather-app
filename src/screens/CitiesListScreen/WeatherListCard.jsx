import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Pressable,
  ImageBackground,
  Text,
  Image,
  StyleSheet,
} from "react-native";

const backgroundImage = require("../../../assets/Rectangle.png");

const WeatherListCard = ({ item, index }) => {
  const navigation = useNavigation();

  const handleFetchWeatherHourly = async (item) => {
    const weatherValues = item;
    navigation.navigate("Cities Details", weatherValues); // unificar el redondeo de las coord en ambas apis
  };

  return item.main ? ( // <--- Verificar si hay datos antes de mostrarlos
    <Pressable
      onPress={() => handleFetchWeatherHourly(item)}
      key={item.id}
      style={{
        marginTop: index === 0 ? 10 : 30,
        paddingHorizontal: 30,
        marginHorizontal: 10,
      }}
    >
      <ImageBackground
        style={{ width: "100%" }}
        source={backgroundImage}
        resizeMode="cover"
      >
        <View
          style={{
            marginHorizontal: 10,
            padding: 10,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 68,
              color: "white",
              fontFamily: "Dosis_700Bold",
              textAlignVertical: "center",
            }}
          >
            {Math.round(item.main.temp)}°C
          </Text>
          <View
            style={{
              margin: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ alignContent: "center" }}>
              <Text
                style={{
                  fontSize: 18,
                  color: "#EBEBF5",
                  fontFamily: "Dosis_700Bold",
                }}
              >
                H: {Math.round(item.main.temp_max)}°C L:{" "}
                {Math.round(item.main.temp_min)}°C
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: "white",
                  fontFamily: "Dosis_700Bold",
                }}
              >
                {item.name}, {item.sys.country}
              </Text>
            </View>
            <View style={{ alignSelf: "flex-end", justifyContent: "center" }}>
              <Text style={{ color: "white", fontFamily: "Dosis_700Bold" }}>
                {item.weather[0].description.charAt(0).toUpperCase() +
                  item.weather[0].description.slice(1)}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      <Image
        style={styles.weatherImage}
        source={{
          uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        }}
        // source={require("../../../assets/cloudy/cloudy.png")}
      />
    </Pressable>
  ) : (
    // Mostrar un mensaje de carga mientras se espera la respuesta
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20 }}>Loading weather data...</Text>
    </View>
  );
};
export default WeatherListCard;

const styles = StyleSheet.create({
  weatherImage: {
    position: "absolute",
    right: 0,
    top: -40,
    width: 180,
    height: 180,
  },
});
