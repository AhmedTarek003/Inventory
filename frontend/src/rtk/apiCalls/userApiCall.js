import { toast } from "react-toastify";
import { request } from "../../utils/request";
import { userActions } from "../slices/userSlice";
import { authActions } from "../slices/authSlice";

// Get User By ID
export function getUserById(id) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`users/${id}`);
      dispatch(userActions.getUser(data));
    } catch (error) {
      console.log(error);
    }
  };
}
// Updata User By ID
export function updateUserById(id, info) {
  return async (dispatch, getstate) => {
    try {
      const { data } = await request.put(`users/${id}`, info, {
        headers: {
          Authorization: "Bearer " + getstate().auth.user.token,
        },
      });
      dispatch(userActions.getUser(data));
      dispatch(authActions.updateUserName(data.name));
      dispatch(authActions.updateUserEmail(data.email));
      const user = JSON.parse(localStorage.getItem("UserInfo"));
      if (user) {
        user.name = data?.name;
        user.email = data?.email;
      }
      localStorage.setItem("UserInfo", JSON.stringify(user));
      toast.success("updated");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
}
// Updata User By ID
export function updateUserImageById(id, info) {
  return async (dispatch, getstate) => {
    try {
      dispatch(authActions.updatedLoadingStart());
      const { data } = await request.put(`users/userImage/${id}`, info, {
        headers: {
          Authorization: "Bearer " + getstate().auth.user.token,
        },
      });
      dispatch(userActions.getUser(data));
      dispatch(authActions.updateUserImage(data.profileImage));
      const user = JSON.parse(localStorage.getItem("UserInfo"));
      if (user) {
        user.profileImage = data?.profileImage;
      }
      localStorage.setItem("UserInfo", JSON.stringify(user));
      dispatch(authActions.updatedLoadingClear());
      toast.success("updated profile image");
    } catch (error) {
      console.log(error);
      dispatch(authActions.updatedLoadingClear());
      toast.error(error.response.data.msg);
    }
  };
}
// Delete User By ID
export function deleteUserById(id) {
  return async (dispatch, getstate) => {
    try {
      const { data } = await request.delete(`users/${id}`, {
        headers: {
          Authorization: "Bearer " + getstate().auth.user.token,
        },
      });
      dispatch(authActions.logoutUser());
      localStorage.removeItem("UserInfo");
      toast.success(data.msg);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
}
