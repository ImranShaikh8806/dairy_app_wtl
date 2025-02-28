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
      }else if (tabName === "profile") {
        navigation.navigate("profile"); 
      } 
    }


  return (
    <View style={styles.container}>

<View style={styles.box}>
        <TouchableOpacity onPress={()=>handlePress("home")}>
        <View style={styles.box} >
        <Icon name="shopping-basket" size={30} color={activeTab == "home" ? "#FF6500" : "gray"}/>
        <Text>Home</Text>
        </View>
        </TouchableOpacity> 
      </View>

      <View style={styles.box}> 
      <TouchableOpacity onPress={()=>handlePress("profile")}>
      <View style={styles.box} >
      <MaterialIcons name="category" size={30} color={activeTab == "profile" ? "#FF6500" : "gray"} /> <Text>More</Text>
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