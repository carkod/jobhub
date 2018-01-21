/* eslint-disable */
import {API_URL, PDF_URL} from './dev';

export const SET_CV  = 'SET_CV';
export const ADD_CV  = 'ADD_CV';
export const CV_FETCHED = 'CV_FETCHED';
export const CV_PASTED = 'CV_PASTED';
export const SET_FIELDS = 'SET_FIELDS';
export const SYNC_PERSDETAILS = 'SYNC_PERSDETAILS';
export const RETRIEVED_CV = 'RETRIEVED_CV';
export const CV_DELETED = 'CV_DELETED';

function handleResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function setFormFields (data) {
    console.log(data)
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


export function cvFetched(cv) {
  return {
    type: CV_FETCHED,
    cv
  }
}


export function addCV(data) {
    return {
        type: ADD_CV,
        data
    }
}

export function deletedCV(id) {
    return {
        type: CV_DELETED,
        id
    }
}

export function retrievedCV(data) {
    return {
        type: RETRIEVED_CV,
        data
    }
}

export function syncPersdetails(fields) {
    return {
        type: SYNC_PERSDETAILS,
        fields
    }
}

export function cvPasted(cv) {
  return {
    type: CV_FETCHED,
    cv
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
        .then(data => dispatch(cvDeleted(id)));   
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
        .then(data => dispatch(cvPasted(data.CV)));
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
        }).then(handleResponse).then(data => dispatch(addCV(data))).then(data);   
    }
}

export function generatePDF(type, id) {
    return fetch(`${PDF_URL}/${type}/${id}`, {
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(handleResponse).then(url => console.log(url))
}

export function fetchCVs() {
    return dispatch => {
        fetch(`${API_URL}/cvs`)
        .then(res => res.json())
        .then(data => dispatch(setCVs(data)))
    }
}

export function fetchCV(id) {
    return dispatch => {
        fetch(`${API_URL}/cvs/${id}`)
        .then(res => res.json())
        .then(data => dispatch(setCVs(data)))
    }
}
