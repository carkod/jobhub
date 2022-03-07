import moment from "moment";
import React from "react";
import {
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";

export function formatDate(value) {
  const readable = moment(value).format("Do MMMM YYYY");
  return readable;
}

export function checkValue(value) {
  if (
    value !== "" &&
    value !== undefined &&
    value !== null &&
    value !== "null" &&
    value !== "undefined"
  ) {
    return true;
  }
  return false;
}

export const parseSize = (bytes) =>
  parseFloat(Math.round(bytes / 1024)).toFixed(2);

export const getToken = () => {
  const token = localStorage.getItem("hubToken");
  if (!checkValue(token)) {
    return null
  }
  return JSON.parse(token)
}

export const setToken = (token) => localStorage.setItem("hubToken", JSON.stringify(token));



export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}


export function buildBackUrl() {
  let base = window.location.hostname.split(".")
  if (base.includes("localhost")) {
    base = ["localhost:8082"]
  } else {
    base.unshift("api")
  }
  base = `${window.location.protocol}//${base.join(".")}`;
  return {
    apiUrl: `${base}/api`,
    pdfUrl: `${base}/pdf`
  }
}
