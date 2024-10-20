import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../slicer/productSlice'

const store = configureStore({
    reducer: {
        product: productReducer,
    },
});

export default store;