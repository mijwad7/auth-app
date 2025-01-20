import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const initialState = {
    user: null,
    isAuthenticated: false,
    token: localStorage.getItem('access_token') || null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            localStorage.setItem('access_token', action.payload.token);
        }, logOut: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem('access_token');
        }
    }
})

export const { loginSuccess, logOut } = authSlice.actions;
export default authSlice.reducer