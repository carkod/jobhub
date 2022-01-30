import { notAuthNotification, isAuthNotification } from "./notification";
import axios from "axios";
import { headers } from "./actions.config";
import { setToken } from "../utils";

export const IS_AUTH = "IS_AUTH";
export const NOT_AUTH = "NOT_AUTH";

export function isAuthenticated(payload) {
  return {
    type: IS_AUTH,
    payload,
  };
}

export function isNotAuthenticated(payload) {
  return {
    type: NOT_AUTH,
    message: payload.error,
  };
}

export const userLogin = (email, password) => async (dispatch, getState) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/login`,
    { email: email, password: password },
    headers
  );
  if (res.data.error === 1) {
    dispatch(isAuthNotification(res.data.message, res.data.error));
  } else {
    setToken(res.data.token);
    dispatch(isAuthNotification(res.data.message, res.data.error));
  }
};
