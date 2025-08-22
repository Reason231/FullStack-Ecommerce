import { act } from "react";

// This is the user shopping products
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ShoppingProductTile from "@/components/shopping-view/product-tile";


const initialState = {
    isLoading:false,
    productList:[],
    productDetails:null
}

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({filterParams,sortParams}) => {

    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`
    );

    return result?.data;
  }
);

// Day 11 - Product Details
export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {


    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`
    );
    return result?.data;
  }
);

const shopProductSlice=createSlice({
    name:"shoppingProducts",
    initialState,
    reducers:{
      // After clicking on close productDetails, it clears the previous details
      setProductDetails : (state) => {
        state.productDetails = null
      }
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchAllFilteredProducts.pending,(state,action)=>{
            state.isLoading = true
        })
        .addCase(fetchAllFilteredProducts.fulfilled,(state,action)=>{
            state.isLoading = false
            state.productList = action.payload.data
        })
        .addCase(fetchAllFilteredProducts.rejected,(state,action)=>{
            state.isLoading = false
            state.productList = []
        })
        .addCase(fetchProductDetails.pending,(state,action)=>{
            state.isLoading = true
        })
        .addCase(fetchProductDetails.fulfilled,(state,action)=>{
            state.isLoading = false
            state.productDetails = action.payload.message
        })
        .addCase(fetchProductDetails.rejected,(state,action)=>{
            state.isLoading = false
            state.productDetails = null
        })
    }
})

export default shopProductSlice.reducer
export const {setProductDetails} = shopProductSlice.actions