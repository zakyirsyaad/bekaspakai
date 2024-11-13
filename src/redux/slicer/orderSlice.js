import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "order",
    initialState: [],
    reducers: {
        add(state, action) {
            state.push(action.payload);
        },
        remove(state, action) {
            return state.filter((productId) => productId !== action.payload); // Compare directly with productId
        }
    },
});

export const { add, remove } = orderSlice.actions;
export default orderSlice.reducer;
