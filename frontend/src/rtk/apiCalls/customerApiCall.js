import { toast } from "react-toastify";
import { request } from "../../utils/request";
import { customerActions } from "../slices/customerSlice";

// Get All customers
export function getAllCustomers(search) {
  return async (dispatch, getstate) => {
    try {
      const { data } = await request.get(`customers?search=${search}`, {
        headers: {
          Authorization: "Bearer " + getstate().auth.user.token,
        },
      });
      dispatch(customerActions.getcustomers(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
}
// Get Important customers
export function getImportantCustomers(search) {
  return async (dispatch, getstate) => {
    try {
      const { data } = await request.get(
        `customers?sort=-purchasesPrice&search=${search}`,
        {
          headers: {
            Authorization: "Bearer " + getstate().auth.user.token,
          },
        }
      );
      dispatch(customerActions.getcustomers(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
}
// Create customer
export function Createcustomer(info) {
  return async (dispatch, getstate) => {
    try {
      dispatch(customerActions.startLoading());
      const { data } = await request.post(`customers`, info, {
        headers: {
          Authorization: "Bearer " + getstate().auth.user.token,
        },
      });
      dispatch(customerActions.clearLoading());
      dispatch(customerActions.addCreatedMsg(data.msg));
      dispatch(customerActions.createCustomer(data.customer));

      setTimeout(() => {
        dispatch(customerActions.clearCreatedMsg());
      }, 1000);
      toast.success(data.msg);
    } catch (error) {
      dispatch(customerActions.clearLoading());
      console.log(error);
      toast.error(error.response.data.msg);
      if (error.response.data.result) {
        toast.error(error.response.data.result[0].msg);
      }
    }
  };
}
// Get customer By id
export function getCustomerById(id) {
  return async (dispatch, getstate) => {
    try {
      const { data } = await request.get(`customers/${id}`, {
        headers: {
          Authorization: "Bearer " + getstate().auth.user.token,
        },
      });
      dispatch(customerActions.getcustomer(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
}
// Update customer
export function updateCustomer(info, id) {
  return async (dispatch, getstate) => {
    try {
      dispatch(customerActions.startLoading());
      const { data } = await request.put(`customers/${id}`, info, {
        headers: {
          Authorization: "Bearer " + getstate().auth.user.token,
        },
      });
      dispatch(customerActions.getcustomer(data.updatedcustomer));
      dispatch(customerActions.clearLoading());
      dispatch(customerActions.addCreatedMsg(data.msg));
      setTimeout(() => {
        dispatch(customerActions.clearCreatedMsg());
      }, 1000);
      toast.success(data.msg);
    } catch (error) {
      dispatch(customerActions.clearLoading());
      console.log(error);
      toast.error(error.response.data.msg);
      if (error.response.data.result) {
        toast.error(error.response.data.result[0].msg);
      }
    }
  };
}
// Delete Customer
export function deleteCustomer(id) {
  return async (dispatch, getstate) => {
    try {
      const { data } = await request.delete(`customers/${id}`, {
        headers: {
          Authorization: "Bearer " + getstate().auth.user.token,
        },
      });
      dispatch(customerActions.deletecustomer(data.deletedCustomer._id));
      toast.success(data.msg);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
}
