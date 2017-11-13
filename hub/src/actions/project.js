/* eslint-disable */
export const SET_PROJECT  = 'SET_PROJECT';
export const ADD_PROJECT  = 'ADD_PROJECT';
export const PROJECT_FETCHED = 'PROJECT_FETCHED';
export const SET_FIELDS = 'SET_FIELDS';
export const SYNC_PERSDETAILS = 'SYNC_PERSDETAILS';
export const RETRIEVED_PROJECT = 'RETRIEVED_PROJECT';
//export const PROJECT_UPDATED = 'PROJECT_UPDATED';
export const PROJECT_DELETED = 'PROJECT_DELETED';
//export const UPDATE_LIST = 'UPDATE_LIST';


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