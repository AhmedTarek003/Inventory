import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  invoiceProducts: [],
  totalprice: 0,
  customer: null,
  msg: null,
  loading: false,
  invoices: [],
  income: [],
  sales: [],
  orders: 0,
};

const invoiceSlice = createSlice({
  name: "Invoice",
  initialState,
  reducers: {
    getProduct(state, action) {
      const foundProduct = state.invoiceProducts.find(
        (p) => p._id === action.payload._id
      );
      if (foundProduct) {
        toast.error("product already exists");
      } else {
        state.invoiceProducts.push(action.payload);
        state.totalprice = state.totalprice +=
          action.payload.price * action.payload.quantity;
      }
    },
    getCustomer(state, action) {
      state.customer = action.payload;
    },
    getMsg(state, action) {
      state.msg = action.payload;
    },
    clearMsg(state) {
      state.msg = null;
    },
    startLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    clearProducts(state) {
      state.invoiceProducts = [];
      state.totalprice = 0;
      state.customer = null;
    },
    getAllInvoices(state, action) {
      state.invoices = action.payload;
    },
    getIncome(state, action) {
      state.income = action.payload;
    },
    getAllSales(state, action) {
      state.sales = action.payload;
    },
    getOrders(state, action) {
      state.orders = action.payload;
    },
  },
});

const invoiceActions = invoiceSlice.actions;
const invoiceReducer = invoiceSlice.reducer;

export { invoiceActions, invoiceReducer };
