import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import { ACCESS_TOKEN } from "../constants";

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async (query = "") => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const response = await api.get(`/api/users/?q=${query}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data;
})

export const deleteUser = createAsyncThunk("admin/deleteUser", async (userId) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    await api.delete(`/api/users/${userId}/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return userId;
})

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user.id !== action.payload);
            })
    }
})

export default adminSlice.reducer;