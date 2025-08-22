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
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  // We will get the formData from register.jsx
  async (formData) => {
    // Connecting the backend as we have written in the server.js
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  // We will get the formData from register.jsx
  async (formData) => {
    // Connecting the backend
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",
  // We will get the formData from register.jsx
  async (formData) => {
    // Connecting the backend
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
    return response.data;
  }
);

export const checkAuth = createAsyncThunk("/auth/checkauth", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
    {
      withCredentials: true,
      headers: {
        "Cache-Control": "no-store,no-cache,must-revalidate,proxy-revalidate",
        Expires: "0",
      },
    }
  );
  return response.data;
});

const authSlice = createSlice({
  name: "auth", // this name will be used in the store.js
  initialState,
  reducers: {
    // reducer => functions that change the state
    // setUser will be a function that can update User and isAuthenticated based on data
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = !!action.payload;
    },
  },
  // When we get the data from the backend, we need to update it in the state
  extraReducers: (builder) => {
    // When we are getting the data => pending, when we get => fulfilled, we we didn't get => rejected
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
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action?.payload?.success ? action.payload.user : null;
        state.isAuthenticated = action?.payload.success ? true : false;

        // ✅ save to localStorage
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
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

export const { setUser } = authSlice.actions;
export default authSlice.reducer; // authSlice.reducer: will be added to the Redux store
