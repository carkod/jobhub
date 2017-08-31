/* eslint-disable */
export const SET_CV  = 'SET_CV';
export const ADD_CV  = 'ADD_CV';
export const CV_FETCHED = 'CV_FETCHED';
export const SET_FIELDS = 'SET_FIELDS';
export const SYNC_PERSDETAILS = 'SYNC_PERSDETAILS';
export const RETRIEVED_CV = 'RETRIEVED_CV';
//export const CV_UPDATED = 'CV_UPDATED';
//export const CV_DELETED = 'CV_DELETED';
//export const UPDATE_LIST = 'UPDATE_LIST';

const API_URL = 'http://cv-generator-carkod.c9users.io/api';

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


export function cvFetched(cv) {
  return {
    type: CV_FETCHED,
    cv
  }
}

export function addCV(data) {
    return {
        type: ADD_CV,
        cvs
    }
}

export function retrievedCV(data) {
    return {
        type: RETRIEVED_CV,
        data
    }
}

/*export function deleteCV(id) {
    return dispatch => {
        return fetch(`/db/CVs/${id}`, {
           method: 'delete',
           headers: {
               "Content-Type" : "application/json"
           }
        }) 
        .then(handleResponse)
        .then(data => dispatch(CVDeleted(id)));   
    }
}*/

export function syncPersdetails(fields) {
    return {
        type: SYNC_PERSDETAILS,
        fields
    }
}

export function copyCV(data) {
    return dispatch => {
        return fetch(`${API_URL}/cvs`, {
           method: 'post',
           body: JSON.stringify(data),
           headers: {
               "Content-Type" : "application/json"
           }
        }).then(handleResponse).then(data => dispatch(CVPasted(data.CV)));
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
        }).then(handleResponse).then(data => dispatch(addCV(data)));   
    }
}

export function fetchCVs() {
    return dispatch => {
        fetch(`${API_URL}/cvs`)
        .then(res => res.json())
        .then(data => dispatch(setCVs(data)))
    }
}

export function retrieveOne() {
    console.log('retrieveOne executed')
    return dispatch => {
        fetch(`${API_URL}/cvs`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            dispatch(retrievedCV(data))
        }
        )
    }
}