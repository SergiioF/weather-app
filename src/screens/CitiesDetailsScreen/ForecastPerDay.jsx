import React from "react";
import MapView from "react-native-maps";
import { View, StyleSheet, Text, Image, FlatList } from "react-native";
import moment from "moment-timezone";

const DailyWeather = ({ day, index, timezone }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "70%",
      }}
    >
      <Text
        key={index}
        style={{
          fontSize: 16,
          color: "#2C4350",
          fontFamily: index === 0 ? "Dosis_700Bold" : "Dosis_500Medium",
          textAlignVertical: "center",
        }}
      >
        {index === 0 ? "Today" : moment.unix(day.dt).tz(timezone).format("dddd")}
      </Text>
      <Image
        style={styles.weatherImage}
        source={{
          uri: `https://openweathermap.org/img/wn/${day.weather[0]?.icon}@2x.png`,
        }}
      />
      <Text
        style={{
          fontSize: 16,
          color: "#2C4350",
          fontFamily: index === 0 ? "Dosis_700Bold" : "Dosis_500Medium",
          textAlignVertical: "center",
        }}
      >
        {Math.round(day.temp.max)} C° / {Math.round(day.temp.min)} C°
      </Text>
    </View>
  );
};
const ForecastPerDay = ({ route }) => {
  const { lat, lon, daily, timezone } = route.params;
  daily.map((weather) => console.log(weather));
  const today = new Date();
  const options = { weekday: "long", day: "numeric", month: "short" };
  const formattedDate = today.toLocaleDateString("en-US", options);

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
            fontFamily: "Dosis_700Bold",
            textAlignVertical: "center",
          }}
        >
          {formattedDate}
        </Text>
        {/* <Text
          style={{
            fontSize: 35,
            color: "#2C4350",
            fontFamily: "Dosis_500Medium",
            textAlignVertical: "center",
          }}
        >
          {cityValues.name}
        </Text> */}
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        minZoomLevel={12}
      />
      <Text
        style={{
          fontSize: 16,
          color: "#2C4350",
          fontFamily: "Dosis_700Bold",
          textAlignVertical: "center",
          marginTop: 20,
        }}
      >
        5 days forecast
      </Text>
      <FlatList
        data={daily.slice(0,5)}
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          marginTop: 20,
        }}
        contentContainerStyle={{
          alignItems: "center",
        }}
        renderItem={({ item, index }) => <DailyWeather day={item} index={index} timezone={timezone} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ForecastPerDay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4979CC",
    alignItems: "center",
  },
  mapContainer: {
    borderRadius: 16,
    width: "100%",
    height: "25%",
    overflow: "hidden",
  },
  map: {
    width: "90%",
    height: "25%",
    marginTop: 20,
  },
  weatherImage: {
    width: 60,
    height: 60,
  },
});
