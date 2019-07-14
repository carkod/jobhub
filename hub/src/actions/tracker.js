/* eslint-disable */
import { API_URL, handleResponse, headers } from './actions.config';


export const SET_APPLICATIONS = 'SET_APPLICATIONS';
export const ADD_APPLICATION = 'ADD_APPLICATION';
export const APPLICATION_FETCHED = 'APPLICATION_FETCHED';
export const RETRIEVED_APPLICATION = 'RETRIEVED_APPLICATION';
export const APPLICATION_UPDATED = 'APPLICATION_UPDATED';
export const APPLICATION_MOVED_STAGE = 'APPLICATION_MOVED_STAGE';
export const APPLICATION_DELETED = 'APPLICATION_DELETED';
export const UPLOAD_FAIL = 'UPLOAD_FAIL';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const FILE_REMOVED = 'FILE_REMOVED';
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';


export function moveStage(status) {
    return {
        type: APPLICATION_MOVED_STAGE,
        status
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
    return fetch(`${API_URL}/application-deupload`, {
        method: 'post',
        headers: headers,
        body: JSON.stringify(file),
    }).then(res => res.json())
}

export function uploadFile(file) {
    return fetch(`${API_URL}/application-upload`, {
        method: 'post',
        body: file
    })
        .then(res => res.json());
}

export function deleteApplication(id) {
    return dispatch => {
        return fetch(`${API_URL}/application/${id}`, {
            method: 'delete',
            headers: headers
        })
            .then(handleResponse)
            .then(data => {
                dispatch(applicationDeleted(data))
                dispatch(addNotification(applicationDeleted(data)))
            });
    }
}

export function copyApplication(data) {

    return dispatch => {
        return fetch(`${API_URL}/application/${data._id}`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: headers
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
            headers: headers
        }).then(handleResponse)
            .then(data => {
                dispatch(addApplication(data))
                dispatch(addNotification(addApplication(data)))
            })
    }
}


export function fetchApplication(id) {
    return dispatch => {
        fetch(`${API_URL}/application/${id}`, {
            method: 'get',
            headers: headers
        })
            .then(handleResponse)
            .then(data => {
                dispatch(applicationFetched(data))
                dispatch(addNotification(applicationFetched(data)))
            })
    }
}

export function getApplications(page, pagesize) {
    return dispatch => {
        fetch(`${API_URL}/applications/${page}/${pagesize}`, {
            method: 'get',
            headers: headers
        })
            .then(handleResponse)
            .then(data => {
                dispatch(setApplications(data))
                dispatch(addNotification(setApplications(data)))
            })
    }
}

export function moveNextStage(data) {
    return dispatch => {
        return fetch(`${API_URL}/application`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: headers
        }).then(handleResponse)
            .then(data => {
                dispatch(moveStage(data))
                dispatch(addNotification(moveStage(data)))
            })
    }
}