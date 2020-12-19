import { bufferHeaders, handlePdfResponse, handleResponse, headers } from './actions.config';
import { addNotification, setCVNotification } from './notification';

export const SET_CV = 'SET_CV';
export const ADD_CV = 'ADD_CV';
export const CV_PASTED = 'CV_PASTED';
export const CV_FETCHED = 'CV_FETCHED';
export const SET_FIELDS = 'SET_FIELDS';
export const SYNC_PERSDETAILS = 'SYNC_PERSDETAILS';
export const RETRIEVED_CV = 'RETRIEVED_CV';
export const CV_DELETED = 'CV_DELETED';
export const PDF_GENERATED = 'PDF_GENERATED';
export const LOADING = 'LOADING';

export const SET_ONE_CV = 'SET_ONE_CV';
export const GET_ALL_CVS_SUCCESS = 'GET_ALL_CVS_SUCCESS';
export const COPY_CV_SUCCESS = 'COPY_CV_SUCCESS';
export const DELETE_CV_SUCCESS = 'DELETE_CV_SUCCESS';
export const SAVE_CV = 'SAVE_CV';
export const SAVE_CV_SUCCESS = 'SAVE_CV_SUCCESS';

export const GENERATE_PDF = 'GENERATE_PDF';
export const GENERATE_PDF_SUCCESS = 'GENERATE_PDF_SUCCESS';
export const GENERATE_PDF_FAILED = 'GENERATE_PDF_FAILED';

/**
 * New action creators
 * 2 states instead of three:
 *  - Fetch action directly no state
 *  - Action successful state
 *  - Notification (snackBar) states 
 *  these are listened by the snackBar reducer
 *  and do not have additional ACTIONS
 */

export function fetchCVsSuccess(cvs) {
    return {
        type: GET_ALL_CVS_SUCCESS,
        error: false,
        message: GET_ALL_CVS_SUCCESS,
        cvs
    }
}

export function saveCv(cvs) {
    return {
        type: SAVE_CV,
        error: false,
        message: SAVE_CV,
        cvs
    }
}

export function saveCvSuccess(cvs) {
    return {
        type: SAVE_CV_SUCCESS,
        error: false,
        message: SAVE_CV_SUCCESS,
        cvs
    }
}

export function copyCVSuccess(payload) {
    return {
        type: COPY_CV_SUCCESS,
        error: false,
        message: COPY_CV_SUCCESS,
        payload
    }
}

export function deleteCVSuccess(payload) {
    return {
        type: DELETE_CV_SUCCESS,
        payload
    }
}

export function generatePdf() {
    return {
        type: GENERATE_PDF,
        error: false,
        message: GENERATE_PDF,
    }
}

export function generatePdfSuccess() {
    return {
        type: GENERATE_PDF_SUCCESS,
        error: false,
        message: GENERATE_PDF_SUCCESS
    }
}

export function generatePdfFailed(payload) {
    return {
        type: GENERATE_PDF_FAILED,
        error: true,
        message: GENERATE_PDF_FAILED,
        payload
    }
}
/**
 * End New actions
 */


export function setFormFields(data) {
    return {
        type: SET_FIELDS,
        data
    }
}

export function setCVs(cvs) {
    return {
        type: SET_CV,
        cvs
    }
}

export function setCV(payload) {
    return {
        type: SET_ONE_CV,
        ...payload
    }
}

export function cvDeleted(cvs) {
    return {
        type: CV_DELETED,
        cvs
    }
}

export function addCV(data) {
    return {
        type: ADD_CV,
        data
    }
}


export function deleteCV(id) {
    return dispatch => {
        return fetch(`${process.env.REACT_APP_API_URL}/cvs/${id}`, {
            method: 'delete',
            headers: headers
        })
            .then(handleResponse)
            .then(data => dispatch(deleteCVSuccess(id)));
    }
}

export function copyCV(data) {
    return dispatch => {
        return fetch(`${process.env.REACT_APP_API_URL}/cvs/${data._id}`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: headers
        })
            .then(handleResponse)
            .then(payload => {
                dispatch(copyCVSuccess(payload))
            });
    }

}

export function saveCvApi(data) {
    return dispatch => {
        dispatch(saveCv(data));
        return fetch(`${process.env.REACT_APP_API_URL}/cvs`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: headers
        })
            .then(handleResponse)
            .then(data => dispatch(saveCvSuccess(data)));
    }
}

export function generatePdfApi(id) {
    return dispatch => {
        dispatch(generatePdf());
        return fetch(`${process.env.REACT_APP_PDF_URL}/generate/${id}`, {
            method: 'GET',
            headers: bufferHeaders,
        })
        .then(handlePdfResponse)
        .then((response) => {
            dispatch(generatePdfSuccess());
            return response.arrayBuffer();
        })
        .catch(e => dispatch(generatePdfFailed(e)))
    }
    
}

export function fetchCVs() {
    return dispatch => {
        return fetch(`${process.env.REACT_APP_API_URL}/cvs`, {
            headers: headers
        })
            .then(handleResponse)
            .then(data => {
                dispatch(fetchCVsSuccess(data));
                dispatch(addNotification(setCVs(data), 'CVs loaded'));
            })
    }
}

export function fetchCV(id) {
    return dispatch => {
        return fetch(`${process.env.REACT_APP_API_URL}/cvs/${id}`, {
            headers: bufferHeaders
        })
            .then(handleResponse)
            .then(data => {
                dispatch(setCV(data))
                dispatch(setCVNotification(data));
            })
    }
}