import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { View, Text, StyleSheet } from "react-native";

console.log("Google Maps API Key:", GOOGLE_MAPS_API_KEY);

const App = () => {
  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <View style={styles.centered}>
        <Text>Error: API Key is missing!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        //provider={PROVIDER_GOOGLE} // Use Google Maps dont delete comment
        style={styles.map}
        initialCamera={
          {
            center: {
              latitude: 33.9384473,
              longitude: -84.5223347,
            },
            pitch: 0,
            heading: 0,
            altitude: 50,
            zoom: 18,
          }
          //   {
          //     center: {
          //       latitude: 33.9384473,
          //       longitude: -84.5223347,
          //     },
          //     pitch: 0,
          //     heading: 0,
          //     altitude: 0,
          //     zoom: 0,
          //   }
        }
        //initialRegion={{
        //latitude: 33.9384473,
        //longitude: -84.5223347,
        //latitudeDelta: 0.0001,
        //longitudeDelta: 0.0001,
        //}}
      ></MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
