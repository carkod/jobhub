/* eslint-disable */
export const SET_CLS  = 'SET_CLS';
export const ADD_CL  = 'ADD_CL';
export const CL_FETCHED = 'CL_FETCHED';
export const RETRIEVED_CL = 'RETRIEVED_CL';
//export const CL_UPDATED = 'CL_UPDATED';
export const CL_DELETED = 'CL_DELETED';
const API_URL = 'http://cv-generator-carkod.c9users.io:8081/api';


function handleResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}


export function setCLs(CLs) {
    return {
        type: SET_CLS,
        CLs
    }
}

export function CLDeleted(letter) {
    return {
        type: CL_DELETED,
        letter
    }
}


export function CLFetched(letter) {
  return {
    type: CL_FETCHED,
    letter
  }
}


export function addCL(data) {
    return {
        type: ADD_CL,
        data
    }
}

export function deletedCL(id) {
    return {
        type: CL_DELETED,
        id
    }
}

export function retrievedCL(data) {
    return {
        type: RETRIEVED_CL,
        data
    }
}

export function deleteCL(id) {
    return dispatch => {
        return fetch(`${API_URL}/cls/${id}`, {
           method: 'delete',
           headers: {
               "Content-Type" : "application/json"
           }
        }) 
        .then(handleResponse)
        .then(data => dispatch(CLDeleted(id)));   
    }
}

export function copyCL(data) {
    return dispatch => {
        return fetch(`${API_URL}/cls`, {
           method: 'post',
           body: JSON.stringify(data),
           headers: {
               "Content-Type" : "application/json"
           }
        })
        .then(handleResponse)
        .then(data => dispatch(ProjectPasted(data.Project)));
    }
    
}

export function saveCL(data) {
    return dispatch => {
        return fetch(`${API_URL}/cls`, {
           method: 'post',
           body: JSON.stringify(data),
           headers: {
               "Content-Type" : "application/json"
           }
        }).then(handleResponse).then(data => dispatch(addProject(data))).then(data);   
    }
}

export function fetchCLs() {
    return dispatch => {
        fetch(`${API_URL}/cls`)
        .then(res => res.json())
        .then(data => dispatch(setCLs(data)))
    }
}

export function fetchCL(id) {
    return dispatch => {
        fetch(`${API_URL}/CL/${id}`)
        .then(res => res.json())
        .then(data => dispatch(setCLs(data)))
    }
}