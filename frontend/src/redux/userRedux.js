import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  current: null,
  isFetching: false,
  error: false,
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
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
    logout: (state) => (state = initialState),
  },
});
export const { loginStart, loginFail, loginSuccess, logout } =
  userSlice.actions;
export default userSlice.reducer;
