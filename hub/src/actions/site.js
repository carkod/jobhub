export const GET_SITE = 'GET_SITE';
export const GET_SITE_SUCCESSFUL = 'GET_SITE_SUCCESSFUL';
export const GET_SITE_FAILED = 'GET_SITE_FAILED';

export const SAVE_SITE = 'SAVE_SITE';
export const SAVE_SITE_SUCCESS = 'SAVE_SITE_SUCCESS';
export const SAVE_SITE_FAILED = 'SAVE_SITE_FAILED';

export function getSite() {
  return {
    type: GET_ALL_CVS_SUCCESS,
    error: false,
    message: GET_ALL_CVS_SUCCESS,
  }
}

export function getSiteSuccess(payload) {
  return {
    type: GET_SITE_SUCCESSFUL,
    error: false,
    message: GET_SITE_SUCCESSFUL,
    payload
  }
}

export function getSiteFailed(payload) {
  return {
    type: GET_ALL_CVS_FAILED,
    error: true,
    message: GET_ALL_CVS_FAILED,
    payload
  }
}


export function fetchSiteApi(id) {
  return dispatch => {
      return fetch(`${process.env.REACT_APP_API_URL}/site/${view}`, {
          headers: bufferHeaders
      })
          .then(handleResponse)
          .then(data => dispatch(getSiteSuccess(data)))
  }
}