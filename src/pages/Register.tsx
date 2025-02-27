import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Button, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';  
import { registerUser,loginUser } from '../redux/authslie';

const Register = ({ navigation }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState('');
  const [auth, setAuth] = useState("signin"); 
  const [street, setStreet] = useState("")
  const [city, setcity] = useState("")
  const [state, setState] = useState("")
  const [zipcode,setzipcode] = useState("")
  const dispatch = useDispatch()

  
  const Authenticate = ()=>{
    if(auth=="signin"){
        dispatch(loginUser({email,password}))
    }else{
        dispatch(registerUser({email, password, name, phone, street, city, state, zipcode}))
    }
}

    

  return (
    <ScrollView>
      <View style={styles.container}>
      <View style={styles.formArea}>
        <Text style={styles.text}>Please {auth}!</Text>
        
        
        <View style={styles.formGroup}>
          <TextInput
            value={email}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            style={styles.formStyle}
          />
        </View>

        
        <View style={styles.formGroup}>
          <TextInput
            value={password}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            style={styles.formStyle}
          />
        </View>

        
        {auth === 'signup' && (
          <>

        <View style={styles.formGroup}>
          <TextInput
            value={name}
            placeholder="Name"
            onChangeText={(text) => setName(text)}
            style={styles.formStyle}
          />
        </View>


            <View style={styles.formGroup}>
              <TextInput
                value={phone}
                placeholder="Mobile Number"
                onChangeText={(text) => setPhone(text)}
                style={styles.formStyle}
              />
            </View>

            <View style={styles.formGroup}>
              <TextInput
                value={street}
                placeholder="Street"
                onChangeText={(text) => setStreet(text)}
                style={styles.formStyle}
              />
            </View>


            
            <View style={styles.formGroup}>
              <TextInput
                value={city}
                placeholder="City"
                onChangeText={(text) => setcity(text)}
                style={styles.formStyle}
              />
            </View>

            <View style={styles.formGroup}>
              <TextInput
                value={state}
                placeholder="State"
                onChangeText={(text) => setState(text)}
                style={styles.formStyle}
              />
            </View>


            <View style={styles.formGroup}>
              <TextInput
                value={zipcode}
                placeholder="Zipcode"
                onChangeText={(text) => setzipcode(text)}
                style={styles.formStyle}
              />
            </View>


          </>
        )}

        
        <TouchableOpacity onPress={() => setAuth(auth === 'signin' ? 'signup' : 'signin')}>
          <Text style={styles.toggleText}>
            {auth === 'signin' ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </Text>
        </TouchableOpacity>

        
        <View style={styles.btn}>
          <Button title={auth} color="#DE5499" onPress={Authenticate} />
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50,
    alignItems: 'center',
    paddingBottom:20,
    
  },
  formArea: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDDCD9',
    padding: 20,
    borderWidth: 2,
    borderColor: '#264143',
    borderRadius: 20,
  },
  formGroup: {
    marginBottom: 10,
  },
  formStyle: {
    borderWidth: 1,
    borderColor: '#264143',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    width: 280,
    fontSize: 15,
  },
  btn: {
    marginTop: 20,
    width: 280,
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  toggleText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
    color: '#264143',
  },
});

export default Register;
