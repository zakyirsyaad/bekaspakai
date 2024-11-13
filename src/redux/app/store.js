import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "../slicer/orderSlice";

const store = configureStore({
    reducer: {
        order: orderReducer
    },
});

export default store;