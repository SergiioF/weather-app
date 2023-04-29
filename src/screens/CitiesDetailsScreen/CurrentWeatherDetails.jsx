import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import moment from "moment-timezone";

const CurrentWeatherDetails = ({ item }) => {
  const [formattedTimes, setFormattedTimes] = useState({ sunrise: null, sunset: null });

  //implemetacion gpt-3
  useEffect(() => {
    if (item) {
      const timezoneName = item.timezone;
      const sunriseTimestamp = item.current.sunrise;
      const sunsetTimestamp = item.current.sunset;
      const sunriseDate = moment.unix(sunriseTimestamp).tz(timezoneName);
      const sunsetDate = moment.unix(sunsetTimestamp).tz(timezoneName);
      const sunriseTime = sunriseDate.format("HH:mm") + "hs";
      const sunsetTime = sunsetDate.format("HH:mm") + "hs";
      setFormattedTimes({ sunrise: sunriseTime, sunset: sunsetTime });
    }
  }, [item]);

  // implementacion mia, error a la primera vez de renderizar

  // function sunSFormater({ sun }, current, timezone) {
  //   let timestamp;
  //   if (sun === "sunrise") {
  //     timestamp = current?.sunrise; // timestamp en formato Unix en segundos
  //   } else {
  //     timestamp = current?.sunset; // timestamp en formato Unix en segundos
  //   }
  //   const timezoneName = timezone;
  //   let formattedTime = "";
  //   if (timestamp !== undefined && timezoneName !== undefined) {
  //     const date = moment.unix(timestamp).tz(timezoneName); // crear objeto moment a partir del timestamp
  //     formattedTime = date.format("HH:mm") + "hs"; // formatear la hora en formato 'HH:mmhs'
  //   }
  //   return formattedTime;
  // }

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 30,
        marginLeft: 10,
      }}
    >
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: "white",
          borderRadius: 16,
          alignItems: "center",
          marginRight: 15
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 5,
          }}
        >
          <Feather name="eye" size={16} color="#91A5B0" />
          <Text
            style={{
              fontSize: 14,
              color: "#91A5B0",
              fontFamily: "Dosis_600SemiBold",
              textAlignVertical: "center",
              marginLeft: 5,
            }}
          >
            Visibility
          </Text>
        </View>

        <Text
          style={{
            fontSize: 24,
            color: "#2C4350",
            fontFamily: "Dosis_500Medium",
            marginTop: 10,
          }}
        >
          {Math.round(item.current.visibility / 1000)} km
        </Text>
      </View>
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: "white",
          borderRadius: 16,
          alignItems: "center",
          marginRight: 15

        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 5,
          }}
        >
          <FontAwesome5 name="water" size={16} color="#91A5B0" />
          <Text
            style={{
              fontSize: 14,
              color: "#91A5B0",
              fontFamily: "Dosis_600SemiBold",
              textAlignVertical: "center",
              marginLeft: 5,
            }}
          >
            Humidity
          </Text>
        </View>

        <Text
          style={{
            fontSize: 24,
            color: "#2C4350",
            fontFamily: "Dosis_500Medium",
            marginTop: 10,
          }}
        >
          {Math.round(item.current.humidity)} %
        </Text>
      </View>
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: "white",
          borderRadius: 16,
          alignItems: "center",
          marginRight: 15

        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 5,
          }}
        >
          <Ionicons name="speedometer-outline" size={16} color="#91A5B0" />
          <Text
            style={{
              fontSize: 14,
              color: "#91A5B0",
              fontFamily: "Dosis_600SemiBold",
              textAlignVertical: "center",
              marginLeft: 5,
            }}
          >
            Pressure
          </Text>
        </View>

        <Text
          style={{
            fontSize: 24,
            color: "#2C4350",
            fontFamily: "Dosis_500Medium",
            marginTop: 10,
          }}
        >
          {Math.round(item.current.pressure)} hPa
        </Text>
      </View>
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: "white",
          borderRadius: 16,
          alignItems: "center",
          marginRight: 15

        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            marginTop: 5,
          }}
        >
          <Feather name="sunrise" size={16} color="#91A5B0" />
          <Text
            style={{
              fontSize: 14,
              color: "#91A5B0",
              fontFamily: "Dosis_600SemiBold",
              textAlignVertical: "center",
              marginLeft: 5,
            }}
          >
            Sunrise
          </Text>
        </View>

        <Text
          style={{
            fontSize: 20,
            color: "#2C4350",
            fontFamily: "Dosis_500Medium",
          }}
        >
          {formattedTimes.sunrise ? (
            <Text>{formattedTimes.sunrise}</Text>
          ) : (
            <ActivityIndicator size="small" color="#0000ff" />
          )}
          {/* {item && sunSFormater({ sun: "sunrise" }, item.current, item.timezone)} */}
        </Text>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Feather name="sunset" size={16} color="#91A5B0" />
          <Text
            style={{
              fontSize: 14,
              color: "#91A5B0",
              fontFamily: "Dosis_600SemiBold",
              textAlignVertical: "center",
              marginLeft: 5,
            }}
          >
            Sunset
          </Text>
        </View>

        <Text
          style={{
            fontSize: 20,
            color: "#2C4350",
            fontFamily: "Dosis_500Medium",
          }}
        >
          {/* {item && sunSFormater({ sun: "sunset" }, item)} */}
          {formattedTimes.sunset ? (
            <Text>{formattedTimes.sunset}</Text>
          ) : (
            <ActivityIndicator size="small" color="#0000ff" />
          )}
        </Text>
      </View>
    </View>
  );
};

export default CurrentWeatherDetails;
