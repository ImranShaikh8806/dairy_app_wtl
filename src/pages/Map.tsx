import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
  };

  
  const showSelectedLocation = () => {
    if (!selectedLocation) {
      Alert.alert("No location selected", "Please select a location on the map.");
    } else {
      Alert.alert(
        "Selected Location",
        `Latitude: ${selectedLocation.latitude}, Longitude: ${selectedLocation.longitude}`
      );
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 28.7041,  
          longitude: 77.1025, 
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"  
        onPress={handleMapPress} 
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} />
        )}
      </MapView>

      <TouchableOpacity style={styles.button} onPress={showSelectedLocation}>
        <Text style={styles.buttonText}>Show Selected Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  map: {
    width: '100%',
    height: '90%',  
  },
  button: {
    backgroundColor: '#2ecc71',
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Map;




