import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import moment from "moment-timezone";

const CurrentWeatherDetails = ({ currentData }) => {
  const [formattedTimes, setFormattedTimes] = useState({ sunrise: null, sunset: null });
  const [loading, setLoading] = useState(true);

  //implemetacion gpt-3
  useEffect(() => {
    // const { current } = currentData;
    // console.log(current);
    if (currentData) {
      const timezoneName = currentData.timezone;
      const sunriseTimestamp = currentData.current?.sunrise;
      const sunsetTimestamp = currentData.current?.sunset;
      if (sunriseTimestamp && sunsetTimestamp) {
        const sunriseDate = moment.unix(sunriseTimestamp).tz(timezoneName);
        const sunsetDate = moment.unix(sunsetTimestamp).tz(timezoneName);
        const sunriseTime = sunriseDate.format("HH:mm") + "hs";
        const sunsetTime = sunsetDate.format("HH:mm") + "hs";
        setFormattedTimes({ sunrise: sunriseTime, sunset: sunsetTime });
        setLoading(false);
      }
    }
  }, [currentData]);

  // implementacion mia, error a la primera vez de renderizar

  // function sunSFormater({ sun }, current, timezone) {
  //   let timestamp;
  //   if (sun === "sunrise") {
  //     timestamp = currentData?.sunrise; // timestamp en formato Unix en segundos
  //   } else {
  //     timestamp = currentData?.sunset; // timestamp en formato Unix en segundos
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
    <ScrollView horizontal={true}>
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
            marginRight: 15,
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
          {loading && <ActivityIndicator size="small" color={"#062964"} />}
          {currentData.current && (
            <Text
              style={{
                fontSize: 24,
                color: "#2C4350",
                fontFamily: "Dosis_500Medium",
                marginTop: 10,
              }}
            >
              {Math.round(currentData?.current?.visibility / 1000)} km
            </Text>
          )}
        </View>
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: "white",
            borderRadius: 16,
            alignItems: "center",
            marginRight: 15,
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

          {loading && <ActivityIndicator size="small" color={"#062964"} />}
          {currentData.current && (
            <Text
              style={{
                fontSize: 24,
                color: "#2C4350",
                fontFamily: "Dosis_500Medium",
                marginTop: 10,
              }}
            >
              {Math.round(currentData?.current?.humidity)} %
            </Text>
          )}
        </View>
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: "white",
            borderRadius: 16,
            alignItems: "center",
            marginRight: 15,
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
          {loading && <ActivityIndicator size="small" color={"#062964"} />}
          {currentData.current && (
            <Text
              style={{
                fontSize: 24,
                color: "#2C4350",
                fontFamily: "Dosis_500Medium",
                marginTop: 10,
              }}
            >
              {Math.round(currentData?.current?.pressure)} hPa
            </Text>
          )}
        </View>
        <View
          style={{
            width: 100,
            height: 100,
            backgroundColor: "white",
            borderRadius: 16,
            alignItems: "center",
            marginRight: 15,
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
            {loading && <ActivityIndicator size="small" color={"#062964"} />}
            {formattedTimes.sunrise && <Text>{formattedTimes.sunrise}</Text>}
            {/* {item && sunSFormater({ sun: "sunrise" }, curre, item.timezone)} */}
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
            {loading && <ActivityIndicator size="small" color={"#062964"} />}
            {formattedTimes.sunset && <Text>{formattedTimes.sunset}</Text>}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default CurrentWeatherDetails;
