import React from "react";
import { Marker } from "react-native-maps";

const EventMarker = ({ event, onPress }) => (
  <Marker
    coordinate={{ latitude: event.latitude, longitude: event.longitude }}
    title={event.name}
    description={event.description}
    onPress={() => onPress(event)}
  />
);

export default EventMarker;