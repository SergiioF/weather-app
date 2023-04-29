import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SuggestionsList = ({ item }) => {
  const navigation = useNavigation();

  const handleFetchWeatherData = async (item) => {
    const { id, value, label } = item;
    navigation.navigate("Cities Screen", { id, value, label }); // unificar el redondeo de las coord en ambas apis
  };

  return (
    <TouchableOpacity
      onPress={() => handleFetchWeatherData(item)}
      style={styles.cityDetailsButton}
    >
      <Ionicons name="search" size={20} color="#2C4350" />
      <Text style={styles.textLabel}>{item.label}</Text>
    </TouchableOpacity>
  );
};

export default SuggestionsList;

const styles = StyleSheet.create({
  cityDetailsButton: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#ACBCC4",
    borderBottomWidth: 1,
    width: "100%",
  },
  textLabel: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
});
