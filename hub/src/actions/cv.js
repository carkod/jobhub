/* eslint-disable */
import {API_URL, PDF_URL} from './dev';

export const SET_CV  = 'SET_CV';
export const ADD_CV  = 'ADD_CV';
export const CV_PASTED = 'CV_PASTED';
export const CV_FETCHED = 'CV_FETCHED';
export const SET_FIELDS = 'SET_FIELDS';
export const SYNC_PERSDETAILS = 'SYNC_PERSDETAILS';
export const RETRIEVED_CV = 'RETRIEVED_CV';
export const CV_DELETED = 'CV_DELETED';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const PDF_GENERATED = 'PDF_GENERATED';

function handleResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function addNotification(status) {
    return {
        type: ADD_NOTIFICATION,
        status
    }
}

export function removeNotification(status) {
    return {
        type: REMOVE_NOTIFICATION,
        status
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

export function pdfReady(pdf) {
    return {
        type: PDF_GENERATED,
        pdf
    }
}

export function deleteCV(id) {
    return dispatch => {
        return fetch(`${API_URL}/cvs/${id}`, {
           method: 'delete',
           headers: {
               "Content-Type" : "application/json"
           }
        }) 
        .then(handleResponse)
        .then(data => {
            dispatch(cvDeleted(id))
            dispatch(addNotification(cvDeleted(data)))
        });   
    }
}

export function copyCV(data) {
    return dispatch => {
        return fetch(`${API_URL}/cvs/${data._id}`, {
           method: 'post',
           body: JSON.stringify(data),
           headers: {
               "Content-Type" : "application/json"
           }
        })
        .then(handleResponse)
        .then(id => {
            dispatch(cvPasted(id))
            dispatch(addNotification(cvPasted(id)));
        });
    }
    
}

export function saveCV(data) {
    return dispatch => {
        return fetch(`${API_URL}/cvs`, {
           method: 'post',
           body: JSON.stringify(data),
           headers: {
               "Content-Type" : "application/json"
           }
        })
        .then(handleResponse)
        .then(data => {
            dispatch(addCV(data));
            dispatch(addNotification(addCV(data)));
        });   
    }
}

export function generatePDF(id) {
    return dispatch => {
        return fetch(`${PDF_URL}/generate/${id}`, {
            method:'GET',
            headers : { 
            "Content-Type": "application/json",
           },
        })
        .then(handleResponse)
        .then(data => {
            dispatch(pdfReady(data));
            dispatch(addNotification(pdfReady(data)))
        })
    }
}

export function fetchCVs() {
    return dispatch => {
        fetch(`${API_URL}/cvs`)
        //.then(res => res.json())
        .then(handleResponse)
        .then(data => {
            dispatch(setCVs(data));
            dispatch(addNotification(setCVs(data)));
        })
    }
}

export function fetchCV(id) {
    return dispatch => {
        fetch(`${API_URL}/cvs/${id}`)
        .then(res => res.json())
        .then(data => dispatch(setCVs(data)))
    }
}

export default function fakeAuth () {
    
}