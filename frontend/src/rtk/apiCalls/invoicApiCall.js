import { toast } from "react-toastify";
import { request } from "../../utils/request";
import { invoiceActions } from "../slices/InvoiceSlice";

// Create Invoice
export function createInvoice(info) {
  return async (dispatch, getState) => {
    try {
      dispatch(invoiceActions.startLoading());
      const { data } = await request.post(`invoices`, info, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(invoiceActions.getMsg(data.msg));
      setTimeout(() => {
        dispatch(invoiceActions.clearMsg());
      }, 1000);
      localStorage.setItem("invoice", JSON.stringify(data.invoice));
      dispatch(invoiceActions.clearLoading());
      toast.success(data.msg);
    } catch (error) {
      dispatch(invoiceActions.clearLoading());
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
}
// Get All Invoices
export function getAllInvoices() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`invoices`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(invoiceActions.getAllInvoices(data));
    } catch (error) {
      console.log(error);
    }
  };
}
// Get Income
export function getIncome() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`invoices/income`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(invoiceActions.getIncome(data));
    } catch (error) {
      console.log(error);
    }
  };
}
// Get orders
export function getOrdersCount() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`invoices/orders`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(invoiceActions.getOrders(data));
    } catch (error) {
      console.log(error);
    }
  };
}
// Get All sales
export function getAllSales() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`invoices/incomeyear`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(invoiceActions.getAllSales(data));
    } catch (error) {
      console.log(error);
    }
  };
}
