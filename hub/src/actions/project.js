/* eslint-disable */
import {API_URL} from './dev';

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
export const FILE_REMOVED = 'FILE_REMOVED';
export const SET_CATS  = 'SET_CATS';
<<<<<<< HEAD
=======
export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
>>>>>>> new history fix corrupted git

function handleResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

<<<<<<< HEAD
=======
export function addNotification(status) {
    return {
        type: ADD_NOTIFICATION,
        status
    }
}

>>>>>>> new history fix corrupted git
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

export function deleteProject(id) {
    return dispatch => {
        return fetch(`${API_URL}/project/${id}`, {
           method: 'delete',
           headers: {
               "Content-Type" : "application/json"
           }
        }) 
        .then(handleResponse)
<<<<<<< HEAD
        .then(data => dispatch(projectDeleted(id)));   
=======
        .then(data => {
            dispatch(projectDeleted(id))
            dispatch(addNotification(projectDeleted(id)))
        });   
>>>>>>> new history fix corrupted git
    }
}

export function copyProject(data) {
<<<<<<< HEAD
    console.log(data)
=======
>>>>>>> new history fix corrupted git
    return dispatch => {
        return fetch(`${API_URL}/portfolio/${data._id}`, {
           method: 'post',
           body: JSON.stringify(data),
           headers: {
               "Content-Type" : "application/json"
           }
        })
        .then(handleResponse)
<<<<<<< HEAD
        .then(data => dispatch(pastedProject(data.Project)));
=======
        .then(data => {
            dispatch(pastedProject(data.Project))
            dispatch(addNotification(pastedProject(data.Project)))
        });
>>>>>>> new history fix corrupted git
    }
    
}

export function saveProject(data) {
    return dispatch => {
        return fetch(`${API_URL}/portfolio/project`, {
           method: 'post',
           body: JSON.stringify(data),
           headers: {
               "Content-Type" : "application/json"
           }
<<<<<<< HEAD
        }).then(handleResponse).then(data => dispatch(addProject(data))).then(data);   
=======
        }).then(handleResponse)
        .then(data => {
            dispatch(addProject(data))
            dispatch(addNotification(addProject(data)))
        })
>>>>>>> new history fix corrupted git
    }
}

export function fetchPortfolio() {
    return dispatch => {
        fetch(`${API_URL}/portfolio`)
        .then(res => res.json())
<<<<<<< HEAD
        .then(data => dispatch(setProjects(data)))
=======
        .then(data => {
            dispatch(setProjects(data))
            dispatch(addNotification(setProjects(data)))
        })
>>>>>>> new history fix corrupted git
    }
}

export function fetchProject(id) {
    return dispatch => {
        fetch(`${API_URL}/project/${id}`)
        .then(res => res.json())
<<<<<<< HEAD
        .then(data => dispatch(setProjects(data)))
=======
        .then(data => {
            dispatch(setProjects(data))
            dispatch(addNotification(setProjects(data)))
        })
>>>>>>> new history fix corrupted git
    }
}

export function fetchCats() {
    return dispatch => {
        fetch(`${API_URL}/cats`)
        .then(res => res.json())
<<<<<<< HEAD
        .then(data => dispatch(setCats(data)))
=======
        .then(data => {
            dispatch(setCats(data))
            dispatch(addNotification(setCats(data)))
        })
>>>>>>> new history fix corrupted git
    }
}