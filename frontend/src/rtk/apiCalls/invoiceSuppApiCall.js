import { toast } from "react-toastify";
import { request } from "../../utils/request";
import { alertActions } from "../slices/alretSlice";
import { invoiceSuppActions } from "../slices/invoiceSuppSlice";

// Get All invoices Suppliers
export function getAllSuppliersInvoices() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`invoicesSuppliers`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(invoiceSuppActions.getAllInvoices(data));
    } catch (error) {
      console.log(error);
    }
  };
}
// Get invoice Supplier By Id
export function getSupplierInvoiceById(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`invoicesSuppliers/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(invoiceSuppActions.getInvoice(data));
    } catch (error) {
      console.log(error);
    }
  };
}
// Update invoice Supplier By Id
export function updateSupplierInvoice(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`invoicesSuppliers/${id}`, "", {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      console.log(data.alertsArr);
      dispatch(alertActions.pushAlerts(data.alertsArr));
      dispatch(invoiceSuppActions.getAllInvoices(data.invoices));
    } catch (error) {
      console.log(error);
    }
  };
}
// Create Invoice
export function createSuppInvoice(info) {
  return async (dispatch, getState) => {
    try {
      dispatch(invoiceSuppActions.startLoading());
      const { data } = await request.post(`invoicesSuppliers`, info, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(invoiceSuppActions.getMsg(data.msg));
      dispatch(invoiceSuppActions.clearProducts());
      setTimeout(() => {
        dispatch(invoiceSuppActions.clearMsg());
      }, 1000);
      dispatch(invoiceSuppActions.clearLoading());
      toast.success(data.msg);
    } catch (error) {
      dispatch(invoiceSuppActions.clearLoading());
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
}
// Delete invoice Supplier By Id
export function deleteSupplierInvoice(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`invoicesSuppliers/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(invoiceSuppActions.deleteInvoice(data.deletedInvoice._id));
    } catch (error) {
      console.log(error);
    }
  };
}
