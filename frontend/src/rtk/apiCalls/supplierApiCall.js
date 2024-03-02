import { toast } from "react-toastify";
import { request } from "../../utils/request";
import { supplierActions } from "../slices/supplierSlice";

// Get All Suppliers
export function getAllSuppliers(search) {
  return async (dispatch, getstate) => {
    try {
      const { data } = await request.get(`suppliers?search=${search}`, {
        headers: {
          Authorization: "Bearer " + getstate().auth.user.token,
        },
      });
      dispatch(supplierActions.getSuppliers(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
}
// Create Supplier
export function CreateSupplier(info) {
  return async (dispatch, getstate) => {
    try {
      dispatch(supplierActions.startLoading());
      const { data } = await request.post(`suppliers`, info, {
        headers: {
          Authorization: "Bearer " + getstate().auth.user.token,
        },
      });
      dispatch(supplierActions.clearLoading());
      dispatch(supplierActions.addCreatedMsg(data.msg));
      setTimeout(() => {
        dispatch(supplierActions.clearCreatedMsg());
      }, 1000);
      toast.success(data.msg);
    } catch (error) {
      dispatch(supplierActions.clearLoading());
      console.log(error);
      toast.error(error.response.data.msg);
      if (error.response.data.result) {
        toast.error(error.response.data.result[0].msg);
      }
    }
  };
}
// Get Supplier By id
export function getSupplierById(id) {
  return async (dispatch, getstate) => {
    try {
      const { data } = await request.get(`suppliers/${id}`, {
        headers: {
          Authorization: "Bearer " + getstate().auth.user.token,
        },
      });
      dispatch(supplierActions.getSupplier(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
}
// Update Supplier
export function updateSupplier(info, id) {
  return async (dispatch, getstate) => {
    try {
      dispatch(supplierActions.startLoading());
      const { data } = await request.put(`suppliers/${id}`, info, {
        headers: {
          Authorization: "Bearer " + getstate().auth.user.token,
        },
      });
      dispatch(supplierActions.getSupplier(data.updatedSupplier));
      dispatch(supplierActions.clearLoading());
      dispatch(supplierActions.addCreatedMsg(data.msg));
      setTimeout(() => {
        dispatch(supplierActions.clearCreatedMsg());
      }, 1000);
      toast.success(data.msg);
    } catch (error) {
      dispatch(supplierActions.clearLoading());
      console.log(error);
      toast.error(error.response.data.msg);
      if (error.response.data.result) {
        toast.error(error.response.data.result[0].msg);
      }
    }
  };
}
// Delete Supplier
export function deleteSupplier(id) {
  return async (dispatch, getstate) => {
    try {
      const { data } = await request.delete(`suppliers/${id}`, {
        headers: {
          Authorization: "Bearer " + getstate().auth.user.token,
        },
      });
      dispatch(supplierActions.deleteSupplier(data.deleteSupplier._id));
      toast.success(data.msg);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
}
