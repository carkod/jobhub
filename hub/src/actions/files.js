export const UPLOAD = 'UPLOAD';
export const UPLOAD_FAIL = 'UPLOAD_FAIL';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';

export const REMOVE_FILE = 'REMOVE_FILE';
export const REMOVE_FILE_SUCCESSFUL = 'REMOVE_FILE_SUCCESSFUL';
export const REMOVE_FILE_FAILED = 'REMOVE_FILE_FAILED';


export function uploadFail(payload) {
  return {
      type: UPLOAD_FAIL,
      message: UPLOAD_FAIL,
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
      type: REMOVE_FILE_SUCCESS,
      message: REMOVE_FILE_SUCCESS,
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


export function removeFile(file) {
  return fetch(`${process.env.REACT_APP_API_URL}/portfolio/deupload`, {
    method: 'post',
    headers: headers,
    body: JSON.stringify(file),
  }).then(res => res.json())
}

export function uploadFile(file) {
  return fetch(`${process.env.REACT_APP_API_URL}/portfolio/upload`, {
    method: 'post',
    headers: formdataHeaders,
    body: file,
  }).then(res => res.json());
}