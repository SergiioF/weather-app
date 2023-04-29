import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, ActivityIndicator } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useFonts, Dosis_700Bold, Dosis_500Medium, Dosis_600SemiBold } from "@expo-google-fonts/dosis";

import WeatherProvider from "./src/store/context/weatherContext";
import SearchScreen from "./src/screens/SearchScreen";
import CitiesListScreen from "./src/screens/CitiesListScreen";
import CitiesDetailsScreen from "./src/screens/CitiesDetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Dosis_700Bold,
    Dosis_500Medium,
    Dosis_600SemiBold
  });
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={"#062964"} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <WeatherProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#4979CC" }}>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#4979CC" },
              headerTransparent: false, // Set header to transparent
            }}
          >
            <Stack.Screen
              name="Select City"
              component={SearchScreen}
              options={{
                headerTitle: () => (
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 25,
                      fontFamily: "Dosis_700Bold",
                      lineHeight: 26,
                      alignItems: "center",
                    }}
                  >
                    SELECT CITY
                  </Text> // Set the color of the title text
                ),
              }}
            />
            <Stack.Screen
              name="Cities Screen"
              component={CitiesListScreen}
              options={{
                headerTitle: () => (
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 25,
                      fontFamily: "Dosis_700Bold",
                      lineHeight: 26,
                      alignItems: "center",
                    }}
                  >
                    YOUR CITIES
                  </Text> // Set the color of the title text
                ),
              }}
            />
            <Stack.Screen
              name="Cities Details"
              component={CitiesDetailsScreen}
              options={{
                headerTitle: () => (
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 25,
                      fontFamily: "Dosis_700Bold",
                      lineHeight: 26,
                      alignItems: "center",
                    }}
                  >
                    FORECAST PER HOUR
                  </Text> // Set the color of the title text
                ),
              }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </WeatherProvider>
    </NavigationContainer>
  );
}
