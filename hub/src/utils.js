import moment from "moment";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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
    return null;
  }
  return JSON.parse(token);
};

export const setToken = (token) =>
  localStorage.setItem("hubToken", JSON.stringify(token));

export const getGoogleToken = () => {
  const token = localStorage.getItem("gmailToken");
  if (!token) {
    return null;
  }

  const expiredToken =
    token && parseFloat(token.expiry_date) < new Date().getSeconds();
  if (expiredToken) {
    localStorage.removeItem("gmailToken");
    return null;
  }

  return JSON.parse(token);
};

export const setGoogleToken = (token) =>
  localStorage.setItem("gmailToken", JSON.stringify(token));
export const removeGoogleToken = () => localStorage.removeItem("gmailToken");

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

export function buildBackUrl() {
  let base = window.location.hostname.split(".");
  if (base.includes("localhost")) {
    base = ["localhost:8082"];
  } else if (base.length > 2) {
    base.shift(0);
    base.unshift("api");
  } else {
    base.unshift("api");
  }
  base = `${window.location.protocol}//${base.join(".")}`;
  return {
    apiUrl: `${base}/api`,
    pdfUrl: `${base}/pdf`,
  };
}

// Getters, so that each request reads the current token. A value read once at import
// would stay empty after login until the page reloads.
const authorization = () => {
  const token = getToken();
  return token ? `Bearer ${token}` : "";
};

export const headers = {
  "Content-Type": "application/json",
  get Authorization() {
    return authorization();
  },
};

export const bufferHeaders = {
  Accept: "application/pdf",
  get Authorization() {
    return authorization();
  },
};

export const formdataHeaders = {
  get Authorization() {
    return authorization();
  },
};

// The back-end returns 401 when the token is missing or expired (10 h). Log out.
const handleUnauthorized = (response) => {
  if (response.status !== 401) return;
  localStorage.removeItem("hubToken");
  if (window.location.pathname !== "/login") window.location.assign("/login");
};

export function handleResponse(response) {
  handleUnauthorized(response);
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.code = response.status;
    throw error;
  }
}

export function handleUploadResponse(response) {
  handleUnauthorized(response);
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function handlePdfResponse(response) {
  handleUnauthorized(response);
  if (response.ok) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function slugify(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  let from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  let to = "aaaaeeeeiiiioooouuuunc------";
  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}
