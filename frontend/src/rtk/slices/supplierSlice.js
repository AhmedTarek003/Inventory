import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  suppliers: [],
  loading: false,
  createdMsg: null,
  supplier: null,
};

const supplierSlice = createSlice({
  name: "Supplier",
  initialState,
  reducers: {
    getSuppliers(state, action) {
      state.suppliers = action.payload;
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
    getSupplier(state, action) {
      state.supplier = action.payload;
    },
    deleteSupplier(state, action) {
      state.suppliers = state.suppliers.filter((s) => s._id !== action.payload);
    },
  },
});

const supplierActions = supplierSlice.actions;
const supplierReducer = supplierSlice.reducer;

export { supplierActions, supplierReducer };
