// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';

// const Map = () => {
//   const [selectedLocation, setSelectedLocation] = useState(null);

//   const handleMapPress = (event) => {
//     const { coordinate } = event.nativeEvent;
//     setSelectedLocation(coordinate);
//   };

  
//   const showSelectedLocation = () => {
//     if (!selectedLocation) {
//       Alert.alert("No location selected", "Please select a location on the map.");
//     } else {
//       Alert.alert(
//         "Selected Location",
//         `Latitude: ${selectedLocation.latitude}, Longitude: ${selectedLocation.longitude}`
//       );
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//           latitude: 28.7041,  
//           longitude: 77.1025, 
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//         provider="google"  
//         onPress={handleMapPress} 
//       >
//         {selectedLocation && (
//           <Marker coordinate={selectedLocation} />
//         )}
//       </MapView>

//       <TouchableOpacity style={styles.button} onPress={showSelectedLocation}>
//         <Text style={styles.buttonText}>Show Selected Location</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-end',
//   },
//   map: {
//     width: '100%',
//     height: '90%',  
//   },
//   button: {
//     backgroundColor: '#2ecc71',
//     padding: 15,
//     alignItems: 'center',
//     marginBottom: 20,
//     marginHorizontal: 20,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default Map;




import React, { useState, useEffect } from "react";
import { View, Alert, ActivityIndicator, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import GetLocation from "react-native-get-location";

const Map = ({navigation}) => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const loc = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        });

        setLocation(loc);
        console.log("...m",location);
        
        setLoading(false);
      } catch (error) {
        Alert.alert(" Location Error", error.message);
        setLoading(false);
      }
    };

  
    getCurrentLocation();
  }, []);

  useEffect(() => {
    console.log("Updated Location:", location);
  }, [location]);
  

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" style={{ flex: 1 }} />
      ) : (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location?.latitude , 
            longitude: location?.longitude ,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
        >
          {location && (
            <Marker
              coordinate={{ latitude: location.latitude, longitude: location.longitude }}
              title="You are here"
            />
          )}
        </MapView>
      )}
      <Button title="confierm location" onPress={()=>navigation.navigate("home",{location})}/>
    </View>
  );
};

export default Map;
