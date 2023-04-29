import React from "react";
import { View, Text } from "react-native";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";

// import { Container } from './styles';

const CurrentWeatherDetails = ({ item }) => {
  console.log(item, "ITEM");
  return (
    <View
      style={{
        alignItems: "center",
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: "white",
          borderRadius: 16,
          alignItems: "center",
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
            marginTop: 10
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
            marginTop: 10
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
            marginTop: 10
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
          06:25hs
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
          19:25hs
        </Text>
      </View>
    </View>
  );
};

export default CurrentWeatherDetails;
