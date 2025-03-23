import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import EventForm from "./EventForm";
//import routes from "./routes.json";

//const API_URL = "http://10.0.2.2:8000"; // ✅ Use this for Android emulator

const predefinedRoutes = {
  q220: [
    { latitude: 33.93841646999524, longitude: -84.52291835094192 },
    { latitude: 33.93839532999521, longitude: -84.5221934839594 },
    { latitude: 33.93852662043604, longitude: -84.5221686735271 },
    { latitude: 33.938513268875234, longitude: -84.52211637045369 },
  ],
};

const predefinedEvents = [
  {
    id: 1,
    title: "Event 1",
    description: "Description for Event 1",
    latitude: 33.9385,
    longitude: -84.5223,
  },
  {
    id: 2,
    title: "Event 2",
    description: "Description for Event 2",
    latitude: 33.9386,
    longitude: -84.5224,
  },
];

const App = () => {
  const [route, setRoute] = useState([]);
  const [room, setRoom] = useState("");
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState(predefinedEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showAddEventButton, setShowAddEventButton] = useState(true);
  const [showEvents, setShowEvents] = useState(false);

  const handleSearch = () => {
    if (room.trim() === "") return;
    const roomKey = room.trim().toLowerCase();
    const predefinedRoute = predefinedRoutes[roomKey];
    if (predefinedRoute) {
      setRoute(predefinedRoute);
    } else {
      Alert.alert("Error", "No predefined route found for this room.");
    }
  };

  const clearRoute = () => {
    setRoute([]);
  };

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const getUserLocation = () => {
    Alert.alert(
      "Confirm Emergency Alert",
      "Are you sure you want to alert campus security?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes, Alert Security",
          onPress: () => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                sendEmergencyAlert(latitude, longitude);
              },
              (error) => {
                Alert.alert("Location Error", "Unable to fetch location.");
                console.error(error);
              },
              { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
          },
        },
      ]
    );
  };

  const sendEmergencyAlert = async (latitude, longitude) => {
    try {
      const response = await fetch(`${API_URL}/emergency_alert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude, longitude }),
      });
      if (response.ok) {
        Alert.alert("Alert Sent", "Campus security has been notified.");
      } else {
        Alert.alert("Error", "Failed to send alert.");
      }
    } catch (error) {
      console.error("Error sending alert:", error);
      Alert.alert("Error", "Failed to connect to server.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          value={room}
          onChangeText={setRoom}
          placeholder="Enter Room Number"
          style={styles.input}
        />
        <Button title="Find Path" onPress={handleSearch} />
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialCamera={{
          center: { latitude: 33.9384473, longitude: -84.5223347 },
          pitch: 0,
          heading: 0,
          altitude: 20,
          zoom: 18,
        }}
      >
        {route.length > 0 && (
          <Polyline coordinates={route} strokeWidth={4} strokeColor="blue" />
        )}

        {showEvents &&
          events.map((event) => (
            <Marker
              key={event.id}
              coordinate={{
                latitude: event.latitude,
                longitude: event.longitude,
              }}
              title={event.title}
              description={event.description}
              onPress={() => {
                setSelectedEvent(event);
                setModalVisible(true);
              }}
            />
          ))}
      </MapView>
      {route.length > 0 && (
        <View style={styles.clearButtonContainer}>
          <Button title="Clear Route" onPress={clearRoute} />
        </View>
      )}

      {loading && (
        <View style={styles.loadingContainer}>
          <Text>Loading route...</Text>
        </View>
      )}

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedEvent && (
              <>
                <Text style={styles.eventTitle}>{selectedEvent.title}</Text>
                <Text>{selectedEvent.description}</Text>
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </>
            )}
          </View>
        </View>
      </Modal>

      {showEventForm && (
        <EventForm
          onAddEvent={addEvent}
          onFinish={() => {
            setShowEventForm(false);
            setShowAddEventButton(true);
            setShowEvents(false); // Hide events when back button is pressed
          }}
        />
      )}

      {!showEventForm && (
        <View style={styles.addEventButtonContainer}>
          <Button
            title={showAddEventButton ? "Find Events" : "Add Event"}
            onPress={() => {
              if (showAddEventButton) {
                setShowEvents(true);
              }
              setShowEventForm(!showEventForm);
              setShowAddEventButton(!showAddEventButton);
            }}
          />
        </View>
      )}

      {!showEventForm && (
        <View style={styles.alertButtonContainer}>
          <Button
            title="Emergency Alert"
            color="red"
            onPress={getUserLocation}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  searchContainer: {
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    elevation: 5,
    alignItems: "center",
    zIndex: 1, // Ensure the search container is on top
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  clearButtonContainer: {
    position: "absolute",
    bottom: 150,
    left: 10,
    right: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
  alertButtonContainer: {
    position: "absolute",
    bottom: 50,
    left: 10,
    right: 10,
    backgroundColor: "yellow",
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
  addEventButtonContainer: {
    position: "absolute",
    bottom: 100,
    left: 10,
    right: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
  loadingContainer: {
    position: "absolute",
    top: 100,
    left: 10,
    right: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default App;
