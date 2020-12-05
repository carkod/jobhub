/* eslint-disable */
import { handleResponse, headers } from './actions.config';
import { addNotification, setCVNotification, pdfGeneratedNotification, savedNotification } from './notification';

export const SET_CV  = 'SET_CV';
export const ADD_CV  = 'ADD_CV';
export const CV_PASTED = 'CV_PASTED';
export const CV_FETCHED = 'CV_FETCHED';
export const SET_FIELDS = 'SET_FIELDS';
export const SYNC_PERSDETAILS = 'SYNC_PERSDETAILS';
export const RETRIEVED_CV = 'RETRIEVED_CV';
export const CV_DELETED = 'CV_DELETED';
export const PDF_GENERATED = 'PDF_GENERATED';
export const LOADING = 'LOADING';

export const loading = (data) => {
    return {
        type: LOADING,
        isFetching: true
    }
}

export function setFormFields (data) {
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
export function pdfReady(cv) {
    return {
        type: PDF_GENERATED,
        isFetching: false,
        cv
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
            dispatch(cvDeleted(id))
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
        .then(id => {
            dispatch(cvPasted(id))
            dispatch(addNotification(cvPasted(id)), 'CV copied');
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
    return dispatch => {
        return fetch(`${process.env.REACT_APP_PDF_URL}/generate/${id}`, {
            method:'GET',
            headers : headers,
        })
        .then(handleResponse)
        .then(data => {
            dispatch(pdfReady(data));
            dispatch(pdfGeneratedNotification(data))
        })
    }
}

export function fetchCVs() {
    loading()
    return dispatch => {
        return fetch(`${process.env.REACT_APP_API_URL}/cvs`, {
            headers: headers
        })
        .then(handleResponse)
        .then(data => {
            dispatch(setCVs(data));
            dispatch(addNotification(setCVs(data), 'CVs loaded'));
        })
    }
}

export function fetchCV(id) {
    loading()
    return dispatch => {
        return fetch(`${process.env.REACT_APP_API_URL}/cvs/${id}`, {
            headers: headers
        })
        .then(handleResponse)
        .then(data => {
            dispatch(setCVs(data))
            dispatch(setCVNotification(data));
        })
    }
}