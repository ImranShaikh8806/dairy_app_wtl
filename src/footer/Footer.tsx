import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/FontAwesome"
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


const Footer = () => {
    const navigation = useNavigation()
    const [activeTab, setActiveTab] = useState("home");

    const handlePress = (tabName:string)=>{
        setActiveTab(tabName)

      if(tabName=="home"){
        navigation.navigate("home")
      }else if (tabName === "userCart") {
        navigation.navigate("userCart"); 
      } 
    }


  return (
    <View style={styles.container}>

<View style={styles.box}>
        <TouchableOpacity onPress={()=>handlePress("home")}>
        <View style={styles.box} >
        <Icon name="shopping-basket" size={30} color={activeTab == "home" ? "#FF6500" : "gray"}/>
        <Text style={{color:activeTab==="home" ? "#FF6500"  : "gray"}}>Home</Text>
        </View>
        </TouchableOpacity> 
      </View>

      <View style={styles.box}> 
      <TouchableOpacity onPress={()=>handlePress("userCart")}>
      <View style={styles.box} >
      <MaterialIcons name="local-grocery-store" size={32} color={activeTab == "userCart" ? "#FF6500" : "gray"} /> 
      <Text style={{color:activeTab == "userCart" ? "#FF6500" : "gray"}}>More</Text>
      </View>
      </TouchableOpacity>
      </View>
      
    </View>
  )
}

export default Footer


const styles = StyleSheet.create({
    container:{
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-around"
    },
    box:{
      display:"flex",
      justifyContent:"center",
      alignItems:"center"
    }
  })