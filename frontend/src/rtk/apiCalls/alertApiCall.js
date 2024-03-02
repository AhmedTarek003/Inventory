import { request } from "../../utils/request";
import { alertActions } from "../slices/alretSlice";

// get All alerts
export function getAllAlerts() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`alerts`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(alertActions.getAlerts(data));
    } catch (error) {
      console.log(error);
    }
  };
}
// get alert
export function getAlertById(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`alerts/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(alertActions.getAlert(data));
    } catch (error) {
      console.log(error);
    }
  };
}
// update alert
export function updateAlert(id) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`alerts/${id}`, "", {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(alertActions.getAlert(data));
    } catch (error) {
      console.log(error);
    }
  };
}
