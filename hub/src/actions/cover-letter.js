import { handleResponse, headers } from './actions.config';

export const GET_CLS = 'GET_CLS';
export const GET_CLS_SUCCESS = 'GET_CLS_SUCCESS';
export const GET_CLS_FAILED = 'GET_CLS_FAILED';

export const GET_CL = 'GET_CL';
export const GET_CL_SUCCESS = 'GET_CL_SUCCESS';
export const GET_CL_FAILED = 'GET_CL_FAILED';

export const ADD_CL = 'ADD_CL';
export const ADD_CL_SUCCESS = 'ADD_CL_SUCCESS';
export const ADD_CL_FAILED = 'ADD_CL_FAILED';

export const COPY_CL = 'COPY_CL';
export const COPY_CL_SUCCESS = 'COPY_CL_SUCCESS';
export const COPY_CL_FAILED = 'COPY_CL_FAILED';

export const EDIT_CL = 'EDIT_CL';
export const EDIT_CL_SUCCESS = 'EDIT_CL_SUCCESS';
export const EDIT_CL_FAILED = 'EDIT_CL_FAILED';

export const DELETE_CL = 'DELETE_CL';
export const DELETE_CL_SUCCESS = 'DELETE_CL_SUCCESS';
export const DELETE_CL_FAILED = 'DELETE_CL_FAILED';


export function getCls() {
  return {
    type: GET_CLS,
    error: false,
    message: GET_CLS,
  }
}


export function getClsSuccess(payload) {
  return {
    type: GET_CLS_SUCCESS,
    error: false,
    message: GET_CLS_SUCCESS,
    payload
  }
}

export function getCl() {
  return {
    type: GET_CL,
    error: false,
    message: GET_CL,
  }
}

export function getClSuccess(payload) {
  const { data } = payload;
  return {
    type: GET_CL_SUCCESS,
    error: false,
    message: GET_CL_SUCCESS,
    data
  }
}

export function saveCl(payload) {
  return {
    type: SAVE_CL,
    error: false,
    message: SAVE_CL,
    payload
  }
}

export function saveClSuccess(cvs) {
  return {
    type: SAVE_CL_SUCCESS,
    error: false,
    message: SAVE_CL_SUCCESS,
    cvs
  }
}

export function editCl(cvs) {
  return {
    type: EDIT_CL,
    error: false,
    message: EDIT_CL,
    cvs
  }
}

export function editClSuccess(cvs) {
  return {
    type: EDIT_CL_SUCCESS,
    error: false,
    message: EDIT_CL_SUCCESS,
    cvs
  }
}

export function copyClSuccess(payload) {
  return {
    type: COPY_CL_SUCCESS,
    error: false,
    message: COPY_CL_SUCCESS,
    payload
  }
}

export function deleteCl(payload) {
  return {
    type: DELETE_CL,
    error: false,
    message: DELETE_CL,
    payload
  }
}

export function deleteClSuccess(payload) {
  return {
    type: DELETE_CL_SUCCESS,
    error: false,
    message: DELETE_CL_SUCCESS,
    payload
  }
}

export function fetchClsApi() {
  return dispatch => {
    dispatch(getCls())
    fetch(`${process.env.REACT_APP_API_URL}/cls`, {
      headers: headers
    })
      .then(handleResponse)
      .then(data => {
        dispatch(getClsSuccess(data))
      })
  }
}

export function fetchClApi(id) {
  return dispatch => {
    dispatch(getCl())
    return fetch(`${process.env.REACT_APP_API_URL}/cls/${id}`, {
      method: 'GET',
      headers: headers
    })
      .then(handleResponse)
      .then(data => dispatch(getClSuccess(data)))
  }
}

export function generateClPdfApi(id) {
  return dispatch =>
    fetch(`${process.env.REACT_APP_PDF_URL}/generateCl/${id}`, {
      method: 'GET',
      headers: headers
    })
      .then(handleResponse)
      .then(data => {
        dispatch(clpdfReady(data));
        dispatch(pdfGeneratedNotification(data))
      })

}

export function deleteClApi(id) {
  return dispatch => {
    return fetch(`${process.env.REACT_APP_API_URL}/cls/${id}`, {
      method: 'delete',
      headers: headers
    })
      .then(handleResponse)
      .then(data => dispatch(deleteClSuccess(data)));
  }
}

export function copyClApi(data) {
  return dispatch => {
    return fetch(`${process.env.REACT_APP_API_URL}/cls/${data._id}`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: headers
    })
      .then(handleResponse)
      .then(data => dispatch(copyClSuccess(data)));
  }

}

export function saveClApi(data) {
  return dispatch => {
    return fetch(`${process.env.REACT_APP_API_URL}/cls`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: headers
    })
      .then(handleResponse)
      .then(data => {
        dispatch(saveClSuccess(data))
      })
  }
}


export function editClApi(data) {
  return dispatch => {
    dispatch(editCl())
    return fetch(`${process.env.REACT_APP_API_URL}/cls`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: headers
    })
      .then(handleResponse)
      .then(data => {
        dispatch(editClSuccess(data))
      })
  }
}