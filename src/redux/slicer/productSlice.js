import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const status = Object.freeze({
    IDLE: "idle",
    ERROR: "error",
    LOADING: "loading",
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        status: status.IDLE
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = status.LOADING
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = status.IDLE
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = status.ERROR
            })
    }
})

export const { setProducts, setStatus } = productSlice.actions
export default productSlice.reducer

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const response = await fetch('https://dummyjson.com/products')
    const data = await response.json()
    const products = data.products
    return products
})