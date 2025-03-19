import React, {useEffect, useState} from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, {Marker, PROVIDER_DEFAULT} from 'react-native-maps';
import axios from 'axios';

export default function App() {
  
  return (
    <View style={styles.container}>
      <Text> hello!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
