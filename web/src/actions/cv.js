/* eslint-disable */
import {API_URL, handleResponse, headers} from './actions.config';
import axios from 'axios'

export const SET_CV  = 'SET_CV';
export const ADD_CV  = 'ADD_CV';
export const CV_FETCHED = 'CV_FETCHED';
export const CV_PASTED = 'CV_PASTED';
export const SET_FIELDS = 'SET_FIELDS';
export const SYNC_PERSDETAILS = 'SYNC_PERSDETAILS';
export const RETRIEVED_CV = 'RETRIEVED_CV';
export const CV_DELETED = 'CV_DELETED';
export const SET_SINGLE_CV = 'SET_SINGLE_CV';



// Action creators
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

export function setSingleCV(payload) {
    return {
        type: SET_SINGLE_CV,
        cv: payload.cv
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


// Action binders
export function deleteCV(id) {
    return dispatch => {
        return axios.delete(`${API_URL}/cvs/${id}`, {
           headers: headers
        }) 
        .then(handleResponse)
        .then(data => dispatch(cvDeleted(id)));   
    }
}

export function copyCV(data) {
    return dispatch => {
        return axios.post(`${API_URL}/cvs/${data._id}`, {
           data: data,
           headers: headers
        })
        .then(handleResponse)
        .then(data => dispatch(cvPasted(data.CV)));
    }
    
}

export function saveCV(data) {
    return dispatch => {
        return axios.post(`${API_URL}/cvs`, {
           data: data,
           headers: headers
        }).then(handleResponse).then(data => dispatch(addCV(data))).then(data);   
    }
}

export function fetchCVs() {
    return dispatch => {
        return axios.get(`${API_URL}/cvs`)
        .then(handleResponse)
        .then(data => dispatch(setCVs(data)))
    }
}

export function fetchCV(id) {
    return dispatch => {
        return axios.get(`${API_URL}/cvs/${id}`)
        .then(handleResponse)
        .then(data => dispatch(setSingleCV(data)))
    }
}
