import { createSlice } from '@reduxjs/toolkit';
import axios from '../api/axios';


const initialState = {
    userRole: null, // Can be 'admin' or 'user'
    isAuthenticated: false,
    token: null,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authStart(state) {
            state.loading = true;
            state.error = null;
        },
        authSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.userRole = action.payload.userRole;
            localStorage.setItem('token', action.payload.token);
            state.error = null;
        },
        authFailure(state, action) {
            state.loading = false;
            state.error = action.payload.error;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.userRole = null;
            state.token = null;
            localStorage.removeItem('token');
        }
    }
});

export const { authStart, authSuccess, authFailure, logout } = authSlice.actions;

export const signup = (userData) => async (dispatch) => {
    try {
        dispatch(authStart());
        const response = await axios.post('/auth/signup', userData);
        dispatch(authSuccess({ token: response.data.token }));
    } catch (error) {
        dispatch(authFailure({ error: error.response?.data?.message || 'Signup failed' }));
    }
};

export const login = (credentials) => async (dispatch) => {
    try {
        dispatch(authStart());
        const response = await axios.post('/auth/login', credentials);
        dispatch(authSuccess({ token: response.data.token }));
    } catch (error) {
        dispatch(authFailure({ error: error.response?.data?.message || 'Login failed' }));
    }
};

export default authSlice.reducer;
