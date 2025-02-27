import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useSelector,useDispatch } from 'react-redux';  
import { logout } from '../redux/authslie';

const Profile = () => {
    
const dispatch = useDispatch();
 

    return (
        <View style={styles.container}>
          
            <View style={styles.container}>
                  
                    <TouchableOpacity onPress={() => dispatch(logout())}>
                        <Text>Sign out</Text>
                    </TouchableOpacity>
                </View>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
