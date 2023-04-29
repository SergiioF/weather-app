import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Pressable, FlatList } from "react-native";

import { WeatherContext } from "../../store/context/weatherContext";
import WeatherListCard from "./WeatherListCard";
import { Feather } from "@expo/vector-icons";

const CitiesListScreen = ({ route, navigation }) => {
  const { weatherData, addWeatherData } = useContext(WeatherContext);

  const cityValues = route.params;

  const addCity = async () => {
    navigation.navigate("Select City");
  };

  useEffect(() => {
    addWeatherData(cityValues);
  }, [cityValues]);

  return (
    <View style={styles.container}>
      <FlatList
        data={weatherData}
        renderItem={({ item, index }) => (
          <WeatherListCard item={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={{ alignItems: "center", marginVertical: 15 }}>
        <Pressable onPress={addCity}>
          <View style={styles.plusButton}>
            <Feather name="plus" size={50} color="white" />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default CitiesListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4979CC",
    justifyContent: "space-between",
  },
  plusButton: {
    backgroundColor: "rgba(288, 288, 288, 0.3)",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    overflow: "hidden",
  },
});
