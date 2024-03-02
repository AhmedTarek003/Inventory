import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("UserInfo")
    ? JSON.parse(localStorage.getItem("UserInfo"))
    : null,
  loading: false,
};

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    getUser(state, action) {
      state.user = action.payload;
    },
    logoutUser(state) {
      state.user = null;
    },
    updateUserName(state, action) {
      state.user.name = action.payload;
    },
    updateUserEmail(state, action) {
      state.user.email = action.payload;
    },
    updateUserImage(state, action) {
      state.user.profileImage = action.payload;
    },
    updatedLoadingStart(state) {
      state.loading = true;
    },
    updatedLoadingClear(state) {
      state.loading = false;
    },
  },
});

const authActions = authSlice.actions;
const authReducer = authSlice.reducer;

export { authActions, authReducer };
