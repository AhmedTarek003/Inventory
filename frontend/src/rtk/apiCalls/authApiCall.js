import { toast } from "react-toastify";
import { request } from "../../utils/request";
import { authActions } from "../slices/authSlice";

// Login User
export function loginUser(info) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(`auth/signin`, info);
      dispatch(authActions.getUser(data));
      localStorage.setItem("UserInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
}
// register User
export function registerUser(info) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(`auth/signup`, info);
      dispatch(authActions.getUser(data.user));
      localStorage.setItem("UserInfo", JSON.stringify(data.user));
      toast.success(data.msg);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
}
// Logout
export function logoutUser() {
  return (dispatch) => {
    localStorage.removeItem("UserInfo");
    dispatch(authActions.logoutUser());
  };
}
