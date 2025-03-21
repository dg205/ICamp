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
        //provider={PROVIDER_GOOGLE} // Use Google Maps
        style={styles.map}
        initialRegion={{
          latitude: 22.54992,
          longitude: 0,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}
      >
        <Marker
          coordinate={{ latitude: 22.54992, longitude: 0 }}
          title="Marker Title"
          description="Marker Description"
        />
      </MapView>
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
