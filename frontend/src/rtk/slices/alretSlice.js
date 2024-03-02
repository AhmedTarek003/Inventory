import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alerts: [],
  alert: null,
};

const alertSlice = createSlice({
  name: "Alert",
  initialState,
  reducers: {
    getAlerts(state, action) {
      state.alerts = action.payload;
    },
    getAlert(state, action) {
      state.alert = action.payload;
    },
    pushAlerts(state, action) {
      state.alerts = action.payload.concat(state.alerts);
    },
  },
});

const alertActions = alertSlice.actions;
const alertReducer = alertSlice.reducer;

export { alertActions, alertReducer };
