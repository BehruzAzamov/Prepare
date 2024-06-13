import { createSlice } from "@reduxjs/toolkit";
const initialState = { user: null, authReadyState: false };
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = payload;
    },
    logout: () => {
      state.user = null;
    },
    isAuthReady: (state) => {
      state.authReadyState = true;
    },
  },
});
export const { login, logout, isAuthReady } = userSlice.actions;
export default userSlice.reducer;