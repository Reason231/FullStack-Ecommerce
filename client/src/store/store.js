// This will create the global state that means it will hold the all the application state.
// Why to use Redux ?
// In larger apps, you often need to share data (like user login info) between multiple components without prop drilling.

// Redux Toolkit helps by:
// Providing a central state for your app (e.g., authentication, cart, theme, etc.)

import { configureStore } from "@reduxjs/toolkit";
("@reduxjs/toolkit");
import authReducer from "./auth-slice";
import adminProductsSlice from "./admin/Product-slice";
import adminOrderSlice from "./admin/order-slice"; // Day 19

import shopProductSlice from "./shop/products-slice/index";
import shopCartSlice from "./shop/cart-slice/index";
import shopAddressSlice from "./shop/address-slice/index";
import shopOrderSlice from "./shop/order-slice/index";
import shopSearchSlice from "./shop/search-slice/index";
import shopReviewSlice from "./shop/review-slice/index";

import commonFeatureSlice from "./common-slice";

const store = configureStore({
  reducer: {
    auth: authReducer, // naming the slice reducer

    adminProducts: adminProductsSlice,
    adminOrder: adminOrderSlice,

    shopProducts: shopProductSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,

    commonFeature: commonFeatureSlice,
  },
});

export default store;
