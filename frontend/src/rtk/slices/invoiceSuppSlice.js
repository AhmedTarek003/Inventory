import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  invoiceProducts: [],
  totalprice: 0,
  supplier: null,
  invoice: null,
  msg: null,
  loading: false,
  invoices: [],
};

const invoiceSupplierSlice = createSlice({
  name: "InvoiceSupplier",
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
          action.payload.price * action.payload.stock;
      }
    },
    getInvoice(state, action) {
      state.invoice = action.payload;
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
    getSupplier(state, action) {
      state.supplier = action.payload;
    },
    deleteInvoice(state, action) {
      state.invoices = state.invoices.filter((i) => i._id !== action.payload);
    },
  },
});

const invoiceSuppActions = invoiceSupplierSlice.actions;
const invoiceSuppReducer = invoiceSupplierSlice.reducer;

export { invoiceSuppActions, invoiceSuppReducer };
