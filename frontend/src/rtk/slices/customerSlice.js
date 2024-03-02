import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
  loading: false,
  createdMsg: null,
  customer: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    getcustomers(state, action) {
      state.customers = action.payload;
    },
    startLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    addCreatedMsg(state, action) {
      state.createdMsg = action.payload;
    },
    clearCreatedMsg(state) {
      state.createdMsg = null;
    },
    getcustomer(state, action) {
      state.customer = action.payload;
    },
    deletecustomer(state, action) {
      state.customers = state.customers.filter((s) => s._id !== action.payload);
    },
    createCustomer(state, action) {
      state.customers.push(action.payload);
    },
  },
});

const customerActions = customerSlice.actions;
const customerReducer = customerSlice.reducer;

export { customerActions, customerReducer };
