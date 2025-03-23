import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const EventForm = ({ onAddEvent, onFinish }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    if (!title || !description || !location) return;

    const [latitude, longitude] = location.split(",").map(Number);

    const newEvent = {
      id: Date.now(),
      title,
      description,
      latitude,
      longitude,
    };

    onAddEvent(newEvent);
    setTitle("");
    setDescription("");
    setLocation("");
    onFinish();
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Event Title"
        style={styles.input}
      />
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Event Description"
        style={styles.input}
      />
      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="Location "
        style={styles.input}
      />
      <Button title="Add Event" onPress={handleSubmit} />
      <Button title="Back" onPress={onFinish} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
});

export default EventForm;
