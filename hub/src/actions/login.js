import { notAuthNotification, isAuthNotification } from "./notification";
import axios from "axios";
import { headers } from "./actions.config";
import { setToken } from "../utils";
import { useDispatch } from "react-redux";

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

export function auth(data) {
  return (dispatch) =>
    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, data, headers)
      .then((res) => {
        if (res.data.status) {
          const { message } = res.data;
          dispatch(isAuthNotification(message));
          dispatch(isAuthenticated(res.data));
          localStorage.setItem("hubToken", JSON.stringify(res.data.token));
        }
      })
      .catch((e) => {
        const { message } = e.response.data;
        dispatch(notAuthNotification(message));
        dispatch(isNotAuthenticated(e.response.data));
        console.log(e);
      });
}

export async function userLogin(email, password) {
  const credentials = {
    email: email,
    password: password,
  };
  axios
    .post(`${process.env.REACT_APP_API_URL}/login`, credentials, headers)
    .then((res) => {
      if (res.data.error === 1) {
        dispatch(isAuthNotification(res.data.message));
      } else {
        dispatch(isAuthNotification(res.data.message));
        setToken(res.data.token)
      }
    })
    .catch((e) => {
      const { message } = e.response.data;
      dispatch(notAuthNotification(message));
      dispatch(isNotAuthenticated(e.response.data));
      console.log(e);
    });
}
