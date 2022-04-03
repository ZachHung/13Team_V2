import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setQuantity: (state, action) => {
      state.quantity = action.payload.quantity;
    },
  },
});
export const { setQuantity } = cartSlice.actions;
export default cartSlice.reducer;
