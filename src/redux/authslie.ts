import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

interface User {
    name:string
    email:string,
    password:string,
    phone:string,
    street:string,
    city:string,
    state:string,
    zipcode:string
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
}


export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (body: { email: string; password: string; name:string; phone:string, street:string, city:string, state:string, zipcode:string }, { rejectWithValue }) => {
        try {
            const result = await axios.post("http://192.168.1.68:5000/api/users/register", body, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return result.data; 
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const loginUser = createAsyncThunk(
    "auth/login",
    async (body: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const result = await axios.post("http://192.168.1.68:5000/api/users/login", body, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return result.data; 
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);


export const addToken = createAsyncThunk(
    "auth/addtoken",
    async () => {
        const token = await AsyncStorage.getItem('token');
        return token;
    }
);

const authReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            AsyncStorage.removeItem("token");
        }
    },
    extraReducers: (builder) => {
        builder
            
            .addCase(registerUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                if (payload.error) {
                    state.error = payload.error;
                    Alert.alert(payload.error);
                } else {
                    state.token = payload.token;
                    AsyncStorage.setItem('token', payload.token);
                }
            })
           
            .addCase(addToken.fulfilled, (state, action) => {
                state.token = action.payload;
            })
           
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                if (payload.error) {
                    state.error = payload.error;
                    Alert.alert(payload.error);
                } else {
                    state.token = payload.token;
                    state.user = payload.user;
                    AsyncStorage.setItem('token', payload.token);
                    AsyncStorage.setItem('user', JSON.stringify(payload.user)); 
                }
            })
           
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
           
            .addCase(registerUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                if (payload && payload.error) {
                    state.error = payload.error;
                    Alert.alert(payload.error);
                }
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.isLoading = false;
                if (payload && payload.error) {
                    state.error = payload.error;
                    Alert.alert(payload.error);
                }
            })
           
    }
});

export const { logout } = authReducer.actions;

export default authReducer.reducer;