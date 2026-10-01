import {
  bufferHeaders,
  handleResponse,
  headers,
  buildBackUrl,
} from "./actions.config";

export const SET_CV = "SET_CV";
export const CV_PASTED = "CV_PASTED";
export const CV_FETCHED = "CV_FETCHED";
export const SET_FIELDS = "SET_FIELDS";
export const SYNC_PERSDETAILS = "SYNC_PERSDETAILS";
export const RETRIEVED_CV = "RETRIEVED_CV";
export const PDF_GENERATED = "PDF_GENERATED";
export const LOADING = "LOADING";

export const SET_ONE_CV = "SET_ONE_CV";
export const GET_ALL_CVS_SUCCESS = "GET_ALL_CVS_SUCCESS";

export function fetchCVsSuccess(cvs) {
  return {
    type: GET_ALL_CVS_SUCCESS,
    error: false,
    message: GET_ALL_CVS_SUCCESS,
    cvs,
  };
}

export function setFormFields(data) {
  return { type: SET_FIELDS, data };
}

export function setCVs(cvs) {
  return { type: SET_CV, cvs };
}

export function setCV(payload) {
  return { type: SET_ONE_CV, ...payload };
}

export function fetchCVs() {
  return (dispatch) => {
    return fetch(`${buildBackUrl().apiUrl}/cvs`, { headers: headers })
      .then(handleResponse)
      .then((data) => {
        dispatch(fetchCVsSuccess(data));
      });
  };
}

export function fetchCV(id) {
  return fetch(`${buildBackUrl().apiUrl}/cvs/${id}`, { headers: bufferHeaders })
    .then(handleResponse)
    .then((data) => data);
}

export function fetchCVNav() {
  return fetch(`${buildBackUrl().apiUrl}/cvs/navigation`, { headers: headers })
    .then(handleResponse)
    .then((data) => data);
}
