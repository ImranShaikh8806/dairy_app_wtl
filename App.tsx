import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { configureStore } from '@reduxjs/toolkit';
import authReducer,{addToken} from './src/redux/authslie';
import { Provider,useSelector,useDispatch } from 'react-redux';
import StickyFooterLayout from './src/footer/StickyFooter';
import productReducer from './src/redux/productslice'
import Register from './src/pages/Register';
import Home from './src/pages/Home';
import Profile from './src/pages/Profile';
import Map from './src/pages/Map';
import UserCart from './src/pages/UserCart';
import ProductDetails from './src/pages/ProductDetails';

const stack = createNativeStackNavigator()

const store = configureStore({
  reducer:{
    user: authReducer,
    products: productReducer, 
  }
})

const App = () => {
  const token = useSelector(state=>state.user.token)
  console.log(token);
  
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    //@ts-ignore
    dispatch(addToken())
   
  },[])

  useEffect(()=>{
    setTimeout(() => {
      setIsLoading(false)
    }, 3500);
  },[])

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return(
    <>
    {isLoading ? <ActivityIndicator size="large" color="#0000ff"  /> :  token ?
     
      <NavigationContainer>
        <StickyFooterLayout>
      <stack.Navigator initialRouteName="home">
        <stack.Screen 
        name='home'
        component={Home}
        options={
          {
            headerShown:false
          }
        }
        />
        <stack.Screen
        name="profile"
        component={Profile}
        />
         <stack.Screen name="map" component={Map} options={{headerShown:false}}/>
         <stack.Screen name="userCart" component={UserCart} options={{headerShown:false}} />

         <stack.Screen name="productDetails" component={ProductDetails} />
      </stack.Navigator>
      </StickyFooterLayout>
    </NavigationContainer>
     //@ts-ignore
    : <Register/>}
    </>
  )}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ()=>{
  return(
<Provider store={store}>

          <App/>
      
</Provider>
  )
};
