import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { useFonts, Dosis_700Bold } from '@expo-google-fonts/dosis';

import SearchScreen from './src/screens/SearchScreen';
import CitiesListScreen from './src/screens/CitiesListScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    Dosis_700Bold,
  });
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#4979CC', }}>
        <Stack.Navigator screenOptions={{
          // headerStyle: { backgroundColor: '#4979CC'},
          headerTransparent: true, // Set header to transparent

        }}>
          <Stack.Screen name="Select City" component={SearchScreen} options={{
            headerTitle: () => (
              <Text style={{ color: '#FFFFFF', fontSize: 25, fontFamily: "Dosis_700Bold", lineHeight: 26, marginTop: 14, marginLeft: 10 }}>SELECT CITY</Text> // Set the color of the title text
            )
          }} />
          <Stack.Screen name="Cities Screen" component={CitiesListScreen} options={{
            headerTitle: () => (
              <Text style={{ color: '#FFFFFF', fontSize: 25, fontFamily: "Dosis_700Bold", lineHeight: 26, marginTop: 14, marginLeft: 10 }}>YOUR CITIES</Text> // Set the color of the title text
            )
          }} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

