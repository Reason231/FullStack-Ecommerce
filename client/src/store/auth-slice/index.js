// A slice is a piece of your application state and the logic to handle.
// You can have authSlice for login/logout.
// Each slice contains:
// 1. initialState: the default values
// 2. reducers: functions to update the state
// 3. actions: auto-generated functions you can use in components
// 4. reducer: the logic that updates the Redux store

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null, // Here is code changed
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/login`,
    formData,
    { withCredentials: true }
  );
  return response.data;
});

export const logoutUser = createAsyncThunk("/auth/logout", async (formData) => {
  // Connecting the backend
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/logout`,
    {},
    { withCredentials: true }
  );
  return response.data;
});


// Code changed here
export const checkAuth = createAsyncThunk("/auth/checkauth", 
  // The token will be received from the "App.jsx"
  async (token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
    {
      headers: {
        Authorization:`Bearer ${token}`,
        "Cache-Control": "no-store,no-cache,must-revalidate,proxy-revalidate",
      },
    }
  );
  return response.data;
});

const authSlice = createSlice({
  name: "auth", // this name will be used in the store.js
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload;
    },

    // Code changed here
    // When we logout, we are going to delete it
    resetTokenAndCredentials:(state)=>{
      state.isAuthenticated = false,
      state.user=null,
      state.token=null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      
      // Code changed here
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action?.payload?.success ? action.payload.user : null;
        state.isAuthenticated = action?.payload.success ? true : false;
        state.token = action.payload.token;

        // ✅ save the userInfo to localStorage
        localStorage.setItem("user", JSON.stringify(action.payload.user));

        // save the cookie token to sessionStorage
        sessionStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      
      // Code changed here
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action?.payload?.success ? action.payload.user : null;
        state.isAuthenticated = action?.payload.success ? true : false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser,resetTokenAndCredentials } = authSlice.actions;
export default authSlice.reducer; // authSlice.reducer: will be added to the Redux store
