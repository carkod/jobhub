/* eslint-disable */
import { handleResponse, headers, formdataHeaders } from './actions.config';
import { addNotification } from '../actions/notification'

export const SET_PROJECTS = 'SET_PROJECTS';
export const ADD_PROJECT = 'ADD_PROJECT';
export const SAVED_PROJECT = 'SAVED_PROJECT';
export const PROJECT_FETCHED = 'PROJECT_FETCHED';
export const SET_FIELDS = 'SET_FIELDS';
export const SYNC_PERSDETAILS = 'SYNC_PERSDETAILS';
export const RETRIEVED_PROJECT = 'RETRIEVED_PROJECT';
//export const PROJECT_UPDATED = 'PROJECT_UPDATED';
export const PROJECT_DELETED = 'PROJECT_DELETED';
export const UPLOAD_FAIL = 'UPLOAD_FAIL';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const FILE_REMOVED = 'FILE_REMOVED';
export const SET_CATS = 'SET_CATS';


export function setCats(cats) {
    return {
        type: SET_CATS,
        cats
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

export function savedProject(data) {
    return {
        type: SAVED_PROJECT,
        data
    }
}

export function deletedProject(id) {
    return {
        type: PROJECT_DELETED,
        id
    }
}

export function pastedProject(id) {
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

export function fileRemoved(file) {
    return {
        type: FILE_REMOVED,
        file
    }
}

export function removeFile(file) {
    return fetch(`${buildBackUrl().apiUrl}/portfolio/deupload`, {
        method: 'post',
        headers: headers,
        body: JSON.stringify(file),
    }).then(res => res.json())
}

export function uploadFile(file) {
    return fetch(`${buildBackUrl().apiUrl}/portfolio/upload`, {
        method: 'post',
        headers: formdataHeaders,
        body: file,
    }).then(res => res.json());
}

export function deleteProject(id) {
    return dispatch => {
        return fetch(`${buildBackUrl().apiUrl}/project/${id}`, {
            method: 'delete',
            headers: headers
        })
            .then(handleResponse)
            .then(data => {
                dispatch(projectDeleted(id))
                dispatch(addNotification(projectDeleted(id)))
            });
    }
}

export function copyProject(data) {

    return dispatch => {
        return fetch(`${buildBackUrl().apiUrl}/portfolio/${data._id}`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: headers
        })
            .then(handleResponse)
            .then(data => {
                dispatch(pastedProject(data.Project))
                dispatch(addNotification(pastedProject(data.Project)))
            });
    }

}

export function createProject(data) {
    return dispatch => {
        return fetch(`${buildBackUrl().apiUrl}/portfolio/project`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: headers
        }).then(handleResponse)
            .then(data => {
                dispatch(addProject(data))
                dispatch(addNotification(addProject(data)))
            })
    }
}

export function saveProject(data) {
    return dispatch => {
        return fetch(`${buildBackUrl().apiUrl}/portfolio/project`, {
            method: 'put',
            body: JSON.stringify(data),
            headers: headers
        }).then(handleResponse)
            .then(data => {
                dispatch(addProject(data))
                dispatch(addNotification(addProject(data)))
            })
    }
}

export function fetchPortfolio() {
    return dispatch => {
        fetch(`${buildBackUrl().apiUrl}/portfolio`, {
            headers: headers
        })
            .then(handleResponse)
            .then(data => {
                dispatch(setProjects(data))
                dispatch(addNotification(setProjects(data)))
            })
    }
}

export function fetchProject(id) {
    return dispatch => {
        fetch(`${buildBackUrl().apiUrl}/project/${id}`, {
            headers: headers
        })
            .then(handleResponse)
            .then(data => {
                dispatch(setProjects(data))
                dispatch(addNotification(setProjects(data)))
            })
    }
}

export function fetchCats() {
    return dispatch => {
        fetch(`${buildBackUrl().apiUrl}/cats`, {
            headers: headers
        })
            .then(handleResponse)
            .then(data => {
                dispatch(setCats(data))
                dispatch(addNotification(setCats(data)))
            })
    }
}