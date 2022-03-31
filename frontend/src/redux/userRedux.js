import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: null,
    isFetching: false,
    error: false,
    isAdmin: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.current = action.payload;
      state.isFetching = false;
      state.isAdmin = action.payload.isAdmin;
    },
    loginFail: (state) => {
      state.error = true;
      state.isFetching = false;
    },
  },
});
export const { loginStart, loginFail, loginSuccess } = userSlice.actions;
export default userSlice.reducer;
