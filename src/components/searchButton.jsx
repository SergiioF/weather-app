import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, FlatList, Pressable, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchCityData } from '../services/api.js'
import { Ionicons } from '@expo/vector-icons';

const SearchButton = ({ navigation }) => {
    const [cityName, setCityName] = useState(''); //input
    const [city, setCity] = useState([])

    const fetchCities = async (enteredCity) => {
        try {
            const response = await fetchCityData(enteredCity);
            const results = await response.data.map((city) => {
                return {
                    id: `${city.id}`,
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                }
            })
            setCity(results)
        } catch (error) {
            console.error(error);
        }
    }

    const handlerInputOnChange = async (searchCity) => {
        setCityName(searchCity)
        await fetchCities(searchCity)
    }

    const handleFetchWeatherData = async (item) => {
        const { id, value, label } = item
        navigation.navigate('Cities Screen', { id, value, label })
    }

    // async function cityNameInputHandler(enteredCity) {
    //     // console.log(enteredCity)
    //     setCityName(enteredCity) // ver si esto esta bien
    //     fetchData(enteredCity)
    // }



    const SuggestionsList = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleFetchWeatherData(item)} style={{ padding: 15, flexDirection: "row", alignItems: "center", borderBottomColor: '#ACBCC4', borderBottomWidth: 1, width: "100%" }}>
                <Ionicons name="search" size={20} color="#2C4350" />
                <Text style={{ color: '#fff', fontSize: 18, marginLeft: 10 }}>{item.label}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container} >
            <View style={{ marginTop: 80, marginHorizontal: 30 }} >
                <TextInput
                    style={styles.textInput}
                    placeholder='Search City'
                    placeholderTextColor="white"
                    onChangeText={handlerInputOnChange}
                    value={cityName}
                />
                {city.length > 0 ? (<FlatList
                    style={{
                        backgroundColor: 'rgba(288, 288, 288, 0.3)',
                        overflow: 'hidden',
                        borderBottomLeftRadius: 16,
                        borderBottomRightRadius: 16,
                        padding: 10

                    }}
                    data={city}
                    renderItem={SuggestionsList}
                    keyExtractor={(item) => item.id}
                />) : null}
            </View>
        </SafeAreaView>
    );
}

export default SearchButton;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4979CC'
    },
    textInput: {
        height: 45,
        borderWidth: 1,
        borderColor: '#ACBCC4',
        borderRadius: 16,
        padding: 10,
        color: '#fff'

    },
});