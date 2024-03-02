import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: null,
  msg: null,
  loading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProducts(state, action) {
      state.products = action.payload;
    },
    getProduct(state, action) {
      state.product = action.payload;
    },
    startLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    getMsg(state, action) {
      state.msg = action.payload;
    },
    clearMsg(state) {
      state.msg = null;
    },
  },
});

const productActions = productSlice.actions;
const productReducer = productSlice.reducer;

export { productActions, productReducer };
