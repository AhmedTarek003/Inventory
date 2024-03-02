import { toast } from "react-toastify";
import { request } from "../../utils/request";
import { categoryActions } from "../slices/categorySlice";

// Get All Categories
export function getAllCategories() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`categories`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(categoryActions.getCategories(data));
    } catch (error) {
      console.log(error);
    }
  };
}
// Get Category By Id
export function getCategoryById(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`categories/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(categoryActions.getCategory(data));
    } catch (error) {
      console.log(error);
    }
  };
}
// Update Category By Id
export function updateCategory(id, info) {
  return async (dispatch, getState) => {
    try {
      dispatch(categoryActions.startLoading());
      const { data } = await request.put(`categories/${id}`, info, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(categoryActions.getCategory(data.updatedCategory));
      dispatch(categoryActions.getMsg(data.msg));
      setTimeout(() => {
        dispatch(categoryActions.getMsg());
      }, 1000);
      dispatch(categoryActions.clearLoading());
      toast.success(data.msg);
    } catch (error) {
      dispatch(categoryActions.clearLoading());
      console.log(error);
    }
  };
}
// create Category By Id
export function createCategory(info) {
  return async (dispatch, getState) => {
    try {
      dispatch(categoryActions.startLoading());
      const { data } = await request.post(`categories`, info, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(categoryActions.getMsg(data.msg));
      setTimeout(() => {
        dispatch(categoryActions.getMsg());
      }, 1000);
      dispatch(categoryActions.clearLoading());
      toast.success(data.msg);
    } catch (error) {
      dispatch(categoryActions.clearLoading());
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
}
// Delete Category By Id
export function deleteCategory(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`categories/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(categoryActions.deleteCategory(data.deleteCategory._id));
      toast.success(data.msg);
    } catch (error) {
      console.log(error);
    }
  };
}
