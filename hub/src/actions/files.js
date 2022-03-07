import { headers, handleUploadResponse, formdataHeaders } from "../utils";

export const UPLOAD = 'UPLOAD';
export const UPLOAD_FAILED = 'UPLOAD_FAILED';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';

export const REMOVE_FILE = 'REMOVE_FILE';
export const REMOVE_FILE_SUCCESSFUL = 'REMOVE_FILE_SUCCESSFUL';
export const REMOVE_FILE_FAILED = 'REMOVE_FILE_FAILED';

export const ATTACH_FILE = 'ATTACH_FILE';
export const ATTACH_FILE_SUCCESSFUL = 'ATTACH_FILE_SUCCESSFUL';
export const ATTACH_FILE_FAILED = 'ATTACH_FILE_FAILED';
export const FILE_NOT_FOUND = 'FILE_NOT_FOUND';

export function attachFile() {
  return {
    type: ATTACH_FILE,
    message: "Attaching file...",
    loading: true,
  }
}

export function attachFileSuccess() {
  return {
    type: ATTACH_FILE_SUCCESSFUL,
    message: "Attaching file...",
    loading: false,
  }
}

export function attachFileFailed() {
  return {
    type: ATTACH_FILE_FAILED,
    message: "Unable to attach file",
    error: true,
    loading: false,
  }
}

// No attached file
export function fileNotFound() {
  return dispatch => {
    dispatch({
      type: FILE_NOT_FOUND,
      message: "File not found, nothing attached",
      error: true,
      loading: false,
    })
  }

}


export function uploadFail(payload) {
  return {
    type: UPLOAD_FAILED,
    message: UPLOAD_FAILED,
    payload
  }
}

export function uploadSuccess(payload) {
  return {
    type: UPLOAD_SUCCESS,
    message: UPLOAD_SUCCESS,
    payload
  }
}

export function upload(payload) {
  return {
    type: UPLOAD,
    message: UPLOAD,
    payload
  }
}


export function removeFileFail(payload) {
  return {
    type: REMOVE_FILE_FAIL,
    message: REMOVE_FILE_FAIL,
    payload
  }
}

export function removeFileSuccess(payload) {
  return {
    type: REMOVE_FILE_SUCCESSFUL,
    message: REMOVE_FILE_SUCCESSFUL,
    payload
  }
}

export function removeFile(payload) {
  return {
    type: REMOVE_FILE,
    message: REMOVE_FILE,
    payload
  }
}


export function removeFileApi(file) {
  return dispatch => {
    dispatch(removeFile())
    return fetch(`${buildBackUrl().apiUrl}/portfolio/deupload`, {
      method: 'post',
      headers: headers,
      body: JSON.stringify(file),
    })
      .then(handleUploadResponse)
      .then(res => dispatch(removeFileSuccess(res)))
  }
}

export function uploadFileApi(file) {
  return dispatch => {
    dispatch(upload())
    return fetch(`${buildBackUrl().apiUrl}/portfolio/upload`, {
      method: 'post',
      headers: formdataHeaders,
      body: file,
    })
      .then(handleUploadResponse)
      .then(res => dispatch(uploadSuccess(res)));
  }

}