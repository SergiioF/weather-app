import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import moment from "moment-timezone";

// Todo este codigo refactorizo gpt-3
const ForecastPerHourlyRender = ({ item }) => {
  const formatHour = (hour) => {
    const unixTimestamp = hour.dt;
    const timezoneName = item.timezone;
    const date = moment.unix(unixTimestamp).tz(timezoneName);
    return date.format("h A");
  };

  const renderHour = (hour, index) => {
    if (index % 3 === 0 && index < 18) {
      return (
        <View
          style={{ alignItems: "center", justifyContent: "space-evenly" }}
          key={hour.dt}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#91A5B0",
              fontFamily: "Dosis_500Medium",
              textAlignVertical: "center",
            }}
          >
            {formatHour(hour)}
          </Text>
          <Image
            style={styles.weatherImage}
            source={{
              uri: `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              color: "#91A5B0",
              fontFamily: "Dosis_500Medium",
              textAlignVertical: "center",
            }}
          >
            {Math.round(hour.temp)}°C
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View
      key={item.timezone_offset}
      style={{
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
      }}
    >
      {item.hourly.map(renderHour)}
    </View>
  );
};

export default ForecastPerHourlyRender;

const styles = StyleSheet.create({
  weatherImage: {
    width: 50,
    height: 50,
  },
});
