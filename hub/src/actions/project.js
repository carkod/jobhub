/* eslint-disable */
export const SET_PROJECTS  = 'SET_PROJECTS';
export const ADD_PROJECT  = 'ADD_PROJECT';
export const PROJECT_FETCHED = 'PROJECT_FETCHED';
export const SET_FIELDS = 'SET_FIELDS';
export const SYNC_PERSDETAILS = 'SYNC_PERSDETAILS';
export const RETRIEVED_PROJECT = 'RETRIEVED_PROJECT';
//export const PROJECT_UPDATED = 'PROJECT_UPDATED';
export const PROJECT_DELETED = 'PROJECT_DELETED';
export const UPLOAD_FAIL = 'UPLOAD_FAIL';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
//export const UPDATE_LIST = 'UPDATE_LIST';
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


export function setProjects(projects) {
    return {
        type: SET_PROJECTS,
        projects
    }
}

export function projectDeleted(project) {
    return {
        type: PROJECT_DELETED,
        project
    }
}


export function projectFetched(project) {
  return {
    type: PROJECT_FETCHED,
    project
  }
}


export function addProject(data) {
    return {
        type: ADD_PROJECT,
        data
    }
}

export function deletedProject(id) {
    return {
        type: PROJECT_DELETED,
        id
    }
}

export function retrievedProject(data) {
    return {
        type: RETRIEVED_PROJECT,
        data
    }
}

export function uploadFail(file) {
    return {
        type: UPLOAD_FAIL,
        file
    }
}

export function uploadSuccess(file) {
    return {
        type: UPLOAD_SUCCESS,
        file
    }
}

export function uploadFile(file) {
    return fetch(`${API_URL}/portfolio/`, {
       method: 'post',
       body: file
    })
    .then(res => res.json());    
}

export function deleteProject(id) {
    return dispatch => {
        return fetch(`${API_URL}/portfolio/${id}`, {
           method: 'delete',
           headers: {
               "Content-Type" : "application/json"
           }
        }) 
        .then(handleResponse)
        .then(data => dispatch(projectDeleted(id)));   
    }
}

export function copyProject(data) {
    return dispatch => {
        return fetch(`${API_URL}/portfolio`, {
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

export function saveProject(data) {
    return dispatch => {
        return fetch(`${API_URL}/portfolio`, {
           method: 'post',
           body: JSON.stringify(data),
           headers: {
               "Content-Type" : "application/json"
           }
        }).then(handleResponse).then(data => dispatch(addProject(data))).then(data);   
    }
}

export function fetchPortfolio() {
    return dispatch => {
        fetch(`${API_URL}/portfolio`)
        .then(res => res.json())
        .then(data => dispatch(setProjects(data)))
    }
}

export function fetchProject(id) {
    return dispatch => {
        fetch(`${API_URL}/portfolio/${id}`)
        .then(res => res.json())
        .then(data => dispatch(setProjects(data)))
    }
}