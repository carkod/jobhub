/* eslint-disable */
import {API_URL} from './dev';

export const SET_APPLICATIONS  = 'SET_APPLICATIONS';
export const ADD_APPLICATION  = 'ADD_APPLICATION';
export const APPLICATION_FETCHED = 'APPLICATION_FETCHED';
export const RETRIEVED_APPLICATION = 'RETRIEVED_APPLICATION';
//export const APPLICATION_UPDATED = 'APPLICATION_UPDATED';
export const APPLICATION_DELETED = 'APPLICATION_DELETED';
export const UPLOAD_FAIL = 'UPLOAD_FAIL';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const FILE_REMOVED = 'FILE_REMOVED';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';

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

export function setApplications(applications) {
    return {
        type: SET_APPLICATIONS,
        applications
    }
}

export function applicationDeleted(application) {
    return {
        type: APPLICATION_DELETED,
        application
    }
}


export function applicationFetched(application) {
  return {
    type: APPLICATION_FETCHED,
    application
  }
}


export function addApplication(data) {
    return {
        type: ADD_APPLICATION,
        data
    }
}

export function deletedApplication(id) {
    return {
        type: APPLICATION_DELETED,
        id
    }
}

export function pastedApplication(id) {
    return {
        type: APPLICATION_DELETED,
        id
    }
}

export function retrievedApplication(data) {
    return {
        type: RETRIEVED_APPLICATION,
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
    console.log(file)
    return fetch(`${API_URL}/portfolio/deupload`, {
       method: 'post',
       headers: {
           "Content-Type" : "application/json"
       },
       body: JSON.stringify(file),
    }).then(res => res.json())
}

export function uploadFile(file) {
    return fetch(`${API_URL}/portfolio/upload`, {
       method: 'post',
       body: file
    })
    .then(res => res.json());
}

export function deleteApplication(id) {
    return dispatch => {
        return fetch(`${API_URL}/application/${id}`, {
           method: 'delete',
           headers: {
               "Content-Type" : "application/json"
           }
        }) 
        .then(handleResponse)
        .then(data => {
            dispatch(applicationDeleted(id))
            dispatch(addNotification(applicationDeleted(id)))
        });   
    }
}

export function copyApplication(data) {

    return dispatch => {
        return fetch(`${API_URL}/portfolio/${data._id}`, {
           method: 'post',
           body: JSON.stringify(data),
           headers: {
               "Content-Type" : "application/json"
           }
        })
        .then(handleResponse)
        .then(data => {
            dispatch(pastedApplication(data.Application))
            dispatch(addNotification(pastedApplication(data.Application)))
        });
    }
    
}

export function saveApplication(data) {
    return dispatch => {
        return fetch(`${API_URL}/application`, {
           method: 'post',
           body: JSON.stringify(data),
           headers: {
               "Content-Type" : "application/json"
           }
        }).then(handleResponse)
        .then(data => {
            dispatch(addApplication(data))
            dispatch(addNotification(addApplication(data)))
        })
    }
}


export function fetchApplications(id) {
    return dispatch => {
        fetch(`${API_URL}/application/${id}`)
        .then(res => res.json())
        .then(data => {
            dispatch(applicationFetched(data))
            dispatch(addNotification(applicationFetched(data)))
        })
    }
}

export function getApplications() {
    return dispatch => {
        fetch(`${API_URL}/applications/`)
        .then(res => res.json())
        .then(data => {
            dispatch(setApplications(data))
            dispatch(addNotification(setApplications(data)))
        })
    }
}