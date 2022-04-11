import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setQuantity: (state, action) => {
      state.quantity = action.payload.reduce((a, b) => {
        return a + b.quantity;
      }, 0);
    },
    addQuantity: (state) => {
      state.quantity++;
    },
  },
});
export const { setQuantity, addQuantity } = cartSlice.actions;

export default cartSlice.reducer;
