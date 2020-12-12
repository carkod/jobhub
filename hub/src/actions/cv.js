import { bufferHeaders, handleResponse, headers } from './actions.config';
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


/**
 * New action creators
 * 2 states instead of three:
 *  - Fetch action directly no state
 *  - Action successful state
 */

export function fetchCVsSuccess(cvs) {
    return {
        type: GET_ALL_CVS_SUCCESS,
        cvs
    }
}

export function copyCVSuccess(payload) {
    return {
        type: COPY_CV_SUCCESS,
        payload
    }
}

export function deleteCVSuccess(payload) {
    return {
        type: DELETE_CV_SUCCESS,
        payload
    }
}



/**
 * End New actions
 */

export const loading = (data) => {
    return {
        type: LOADING,
        isFetching: true
    }
}

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

export function retrievedCV(data) {
    return {
        type: RETRIEVED_CV,
        data
    }
}

export function cvPasted(id) {
    return {
        type: CV_FETCHED,
        id
    }
}

// Returns saved CV
export function pdfReady(pdf) {
    return {
        type: PDF_GENERATED,
        pdf
    }
}

export function deleteCV(id) {
    loading()
    return dispatch => {
        return fetch(`${process.env.REACT_APP_API_URL}/cvs/${id}`, {
            method: 'delete',
            headers: headers
        })
            .then(handleResponse)
            .then(data => {
                dispatch(deleteCVSuccess(id))
                dispatch(addNotification(cvDeleted(data), 'CV deleted'))
            });
    }
}

export function copyCV(data) {
    loading()
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

export function saveCV(data) {
    return dispatch => {
        return fetch(`${process.env.REACT_APP_API_URL}/cvs`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: headers
        })
            .then(handleResponse)
            .then(data => {
                dispatch(addCV(data));
                dispatch(addNotification(addCV(data), 'Saved CV'));
            });
    }
}

export function generatePDF(id) {
    return fetch(`${process.env.REACT_APP_PDF_URL}/generate/${id}`, {
        method: 'GET',
        headers: bufferHeaders,
    })
    .then((response) => response.arrayBuffer())
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
    loading()
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