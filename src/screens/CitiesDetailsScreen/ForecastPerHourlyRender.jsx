import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import moment from "moment-timezone";

// Todo este codigo refactorizo gpt-3
const ForecastPerHourlyRender = ({ forecast }) => {
  const formatHour = (hour) => {
    const date = moment.unix(hour).tz(forecast.timezone);
    return date.format("h A");
  };

  const WeatherHourly = ({ dt, temp, timezone, index, weather }) => {
    if (index % 3 === 0 && index < 18) {
      return (
        <View style={{ alignItems: "center", justifyContent: "space-evenly", padding: 6 }} key={dt}>
          <Text
            style={{
              fontSize: 16,
              color: "#91A5B0",
              fontFamily: "Dosis_500Medium",
              textAlignVertical: "center",
            }}
          >
            {formatHour(dt)}
          </Text>
          <Image
            style={styles.weatherImage}
            source={{
              uri: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
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
            {Math.round(temp)}°C
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View
      key={forecast.timezone_offset}
      style={{ alignItems: "center", justifyContent: "space-evenly"}}
    >
      {/* {item.hourly.map(renderHour)} */}
      <FlatList
        horizontal={true}
        data={forecast.hourly}
        renderItem={({ item, index }) => (
          <WeatherHourly
            dt={item.dt}
            temp={item.temp}
            timezone={forecast.timezone}
            index={index}
            weather={item.weather}
          />
        )}
        keyExtractor={(item) => item.id}
      />
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
