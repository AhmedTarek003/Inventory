import { toast } from "react-toastify";
import { request } from "../../utils/request";
import { productActions } from "../slices/productSlice";

// Get All Products
export function getAllProducts(search) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`products?search=${search}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(productActions.getProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
}
// Get Product By Id
export function getProductById(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`products/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(productActions.getProduct(data));
    } catch (error) {
      console.log(error);
    }
  };
}
// Create Product
export function createProduct(info) {
  return async (dispatch, getState) => {
    try {
      dispatch(productActions.startLoading());
      const { data } = await request.post(`products`, info, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(productActions.getMsg(data.msg));
      setTimeout(() => {
        dispatch(productActions.clearMsg());
      }, 1000);
      dispatch(productActions.clearLoading());
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
}
