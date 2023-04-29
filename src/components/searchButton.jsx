import React, { useState } from "react";
import { View, TextInput, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchCityData } from "../services/api.js";
import SuggestionsList from "./suggestionsList.jsx";

const controller = new AbortController();
const signal = controller.signal;

const SearchButton = ({ navigation }) => {
  const [cityName, setCityName] = useState(""); //input
  const [city, setCity] = useState([]);
  const [enteredText, setEnteredText] = useState(false);

  const fetchCities = async (enteredCity) => {
    setTimeout(async () => {
      const controller = new AbortController();
      const signal = controller.signal;
      try {
        const response = await fetchCityData(enteredCity, signal);
        const results = response?.data?.map((city) => ({
          id: `${city.id}`,
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        }));
        if (results) {
          setCity(results);
        }
      } catch (error) {
        console.error(error);
      }
    }, 500);
  };

  const handlerInputOnChange = async (searchCity) => {
    setEnteredText(true);
    setCityName(searchCity);
    if (searchCity.length === 0) {
      setCity([]);
      setCityName("")
      setEnteredText(false);
    } else {
      await fetchCities(searchCity);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <TextInput
          style={[styles.textInput, enteredText && styles.textInputOpened]}
          placeholder="Search City"
          placeholderTextColor="white"
          onChangeText={handlerInputOnChange}
          value={cityName}
        />
        {city.length > 0 ? (
          <FlatList
            style={styles.textInputSuggestions}
            data={city}
            renderItem={({ item }) => <SuggestionsList item={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={{ display: "none" }}></View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4979CC",
  },
  contentContainer: {
    marginTop: 25,
    marginHorizontal: 30,
  },
  textInput: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ACBCC4",
    borderRadius: 16,
    padding: 10,
    color: "#fff",
  },
  textInputOpened: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  textInputSuggestions: {
    backgroundColor: "rgba(288, 288, 288, 0.3)",
    overflow: "hidden",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 10,
  },
});
