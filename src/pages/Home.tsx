import { Button, StyleSheet, Text, TextInput, View, Image,Pressable, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";
import Dairy from './Dairy';
import Colddrinks from './Colddrinks';
import FruitsAndVegetables from './FruitsAndVegetables';
import Bakery from './Bakery';



const Home = () => {
    const [selectedName, setSelectedName] = useState("Dairy");
    const navigation = useNavigation();


  const data = [
    { name: 'Dairy', avatar: require("../assets/images/dairy.jpg")},
    { name: 'Bakery', avatar: require("../assets/images/bakery.jpg") },
    { name: 'Fruits and Vegetables', avatar: require("../assets/images/vegetablesandfruits.jpg") },
    { name: 'Cold drinks', avatar: require("../assets/images/coldrinks.jpg") },
  ];

  const nameToImageMapping = {
    'Dairy': require("../assets/images/offer_dairy.jpg"),
    'Bakery': require("../assets/images/offer_bakery.jpg"),
    'Fruits and Vegetables': require("../assets/images/offer_fruitsandveges.jpg"),
    "Cold drinks":require("../assets/images/offer_coldrinks.jpg")
  };

  const handlePress = (name) => {
    setSelectedName(name);
  };

  const renderSelectedPage = () => {
    switch (selectedName) {
      case 'Dairy':
        return <Dairy />;
      case 'Bakery':
        return <Bakery />;
      case 'Fruits and Vegetables':
        return <FruitsAndVegetables />;
      case 'Cold drinks':
        return <Colddrinks />;
      default:<Dairy/>
        return null;
    }
  };
  
  return (
    <ScrollView>
      <StatusBar backgroundColor="#9ACBD0"/>
      <View style={styles.container}>

<View style={styles.header}>
    
    <View style={{display:"flex",flexDirection:"row",alignItems:"center",marginTop:10,justifyContent:"space-between",paddingHorizontal:15}}>
    <TouchableOpacity onPress={()=>navigation.navigate("map")}>
      <View style={{display:"flex",flexDirection:"row",alignItems:"center",gap:7}}>
      <Icon name="location-arrow" size={30} color="#FF6500" style={styles.icon} />
      <Text style={styles.text}>Deliver to Kharadi</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity>
    <Icon name="user" size={30} color="gray" style={styles.icon} />
    </TouchableOpacity>
    </View>
    
    <View style={styles.searchContainer}>
      <TextInput 
        placeholder='Search for products' 
        style={styles.input} 
      />
      <Icon name="search" size={25} color="gray" style={styles.icon} />
    </View>
</View>

<View style={styles.cart}>
    <View style={styles.cartContainer}>
        {data.map((u,i)=>{
            return(
      <View style={[styles.card, { backgroundColor: selectedName === u.name ? "#fff" : "#EAEAEA" }]}>
                  <Pressable onPress={()=>handlePress(u.name)}>
                   <Image style={styles.image} source={ u.avatar }/>
                   <Text style={styles.name} numberOfLines={1}  ellipsizeMode="tail">{u.name}</Text>
                   </Pressable>
                </View>
            )
        })}
    </View>
</View>

<View style={{flex: 1, alignItems: 'center' ,backgroundColor:"#fff"}}>
 {selectedName && (
      <>
        <Image 
            style={{height: 210, width: "90%",marginTop:20,borderRadius:15,resizeMode:'stretch'}} 
            source={nameToImageMapping[selectedName]} 
         />
        {renderSelectedPage()}
     </>
)}
</View>


</View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A6F1E0"
  },
  text: {
    fontSize: 20,
    fontWeight: "500", 
    
  },
  header: {
    paddingHorizontal: 14,
    
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:12,
    backgroundColor: "#FFFFFF",
    height: 48,
    borderRadius: 8,
    justifyContent: 'space-between',
    paddingHorizontal: 10, 
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
  },
  input: {
    flex: 1, 
    padding: 10,
    fontSize: 16, 
  },
 
 
  name: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
  },
  cart: {
    marginTop: 20,
    paddingHorizontal: 14.5,
    backgroundColor: "#A6F1E0"
  },
  cartContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',  
    justifyContent: 'space-around', 
   
  },
  card: {
    width: '23%',  
    marginBottom: 20,  
    backgroundColor: '#fff',
    borderRadius: 10,
    
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height:100
  },
  image: {
    width: 61,
    height: 61,
    borderRadius:10
    
  },
});
