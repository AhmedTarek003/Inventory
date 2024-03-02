import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { userReducer } from "./slices/userSlice";
import { supplierReducer } from "./slices/supplierSlice";
import { customerReducer } from "./slices/customerSlice";
import { categoryReducer } from "./slices/categorySlice";
import { productReducer } from "./slices/productSlice";
import { invoiceReducer } from "./slices/InvoiceSlice";
import { alertReducer } from "./slices/alretSlice";
import { invoiceSuppReducer } from "./slices/invoiceSuppSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    supplier: supplierReducer,
    customer: customerReducer,
    category: categoryReducer,
    product: productReducer,
    invoice: invoiceReducer,
    alert: alertReducer,
    invoiceSupp: invoiceSuppReducer,
  },
});
