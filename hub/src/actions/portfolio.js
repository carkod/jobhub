// New project actions

import { buildBackUrl, handleResponse, headers } from '../utils';

// listProjectsReducer
export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_PROJECTS_SUCCESFUL = 'GET_PROJECTS_SUCCESFUL';
export const GET_PROJECTS_FAILED = 'GET_PROJECTS_FAILED';

// projectReducer
export const GET_PROJECT = 'GET_PROJECT';
export const GET_PROJECT_SUCCESFUL = 'GET_PROJECT_SUCCESFUL';
export const GET_PROJECT_FAILED = 'GET_PROJECT_FAILED';

export const SAVE_PROJECT = 'SAVE_PROJECT';
export const SAVE_PROJECT_SUCCESFUL = 'SAVE_PROJECT_SUCCESFUL';
export const SAVE_PROJECT_FAILED = 'SAVE_PROJECT_FAILED';

export const DELETE_PROJECT = 'DELETE_PROJECT';
export const DELETE_PROJECT_SUCCESFUL = 'DELETE_PROJECT_SUCCESFUL';
export const DELETE_PROJECT_FAILED = 'DELETE_PROJECTS_FAILED';

export const ADD_PROJECT = 'ADD_PROJECT';
export const ADD_PROJECT_SUCCESSFUL = 'ADD_PROJECT_SUCCESSFUL';
export const ADD_PROJECT_FAILED = 'ADD_PROJECT_FAILED';



export function getProjects(payload) {
  return {
    type: GET_PROJECTS,
    error: false,
    message: GET_PROJECTS,
    payload
  }
}

export function getProjectsSuccessful(payload) {
  return {
    type: GET_PROJECTS_SUCCESFUL,
    error: false,
    message: GET_PROJECTS_SUCCESFUL,
    payload
  }
}

export function getProjectsFailed(payload) {
  return {
    type: GET_PROJECTS_FAILED,
    error: true,
    message: GET_PROJECTS_FAILED,
    payload
  }
}

export function getProject(payload) {
  return {
    type: GET_PROJECT,
    error: false,
    message: GET_PROJECT,
    payload
  }
}

export function getProjectSuccessful(payload) {
  return {
    type: GET_PROJECT_SUCCESFUL,
    error: false,
    message: GET_PROJECT_SUCCESFUL,
    payload
  }
}

export function getProjectFailed(payload) {
  return {
    type: GET_PROJECT_FAILED,
    error: true,
    message: GET_PROJECT_FAILED,
    payload
  }
}

export function saveProject(payload) {
  return {
    type: SAVE_PROJECT,
    error: false,
    message: SAVE_PROJECT,
    payload
  }
}

export function saveProjectSuccessful(payload) {
  return {
    type: SAVE_PROJECT_SUCCESFUL,
    error: false,
    message: SAVE_PROJECT_SUCCESFUL,
    payload
  }
}

export function saveProjectFailed(payload) {
  return {
    type: SAVE_PROJECT_FAILED,
    error: true,
    message: SAVE_PROJECT_FAILED,
    payload
  }
}

export function deleteProject(payload) {
  return {
      type: DELETE_PROJECT,
      error: false,
      message: DELETE_PROJECT,
      payload
  }
}

export function deleteProjectSuccessful(payload) {
return {
    type: DELETE_PROJECT_SUCCESFUL,
    error: false,
    message: DELETE_PROJECT_SUCCESFUL,
    payload
}
}

export function deleteProjectFailed(payload) {
return {
    type: DELETE_PROJECT_FAILED,
    error: true,
    message: DELETE_PROJECT_FAILED,
    payload
}
}

export function addProject(payload) {
  return {
      type: ADD_PROJECT,
      error: false,
      message: ADD_PROJECT,
      payload
  }
}

export function addProjectSuccessful(payload) {
return {
    type: ADD_PROJECT_SUCCESFUL,
    error: false,
    message: ADD_PROJECT_SUCCESFUL,
    payload
}
}

export function addProjectFailed(payload) {
return {
    type: ADD_PROJECT_FAILED,
    error: true,
    message: ADD_PROJECT_FAILED,
    payload
}
}


export function fetchPortfolioApi() {
  return dispatch => {
    dispatch(getProjects())
    return fetch(`${buildBackUrl().apiUrl}/portfolio`, {
      headers: headers
    })
      .then(handleResponse)
      .then(data => {
        dispatch(getProjectsSuccessful(data))
      })
  }
}

export function fetchProjectApi(id) {
  return dispatch => {
    dispatch(getProject())
    return fetch(`${buildBackUrl().apiUrl}/project/${id}`, {
      method: "GET",
      headers: headers
    })
      .then(handleResponse)
      .then(data => {
        dispatch(getProjectSuccessful(data))
      })
  }
}

export function createProjectApi(data) {
  return dispatch => {
    dispatch(addProject())
    return fetch(`${buildBackUrl().apiUrl}/portfolio/project`, {
      method: 'post',
      body: JSON.stringify(data),
      headers: headers
    }).then(handleResponse)
      .then(data => {
        dispatch(addProjectSuccessful(data))
      })
  }
}

export function saveProjectApi(data) {
  return dispatch => {
    dispatch(saveProject())
    return fetch(`${buildBackUrl().apiUrl}/portfolio/project`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: headers
    }).then(handleResponse)
      .then(data => {
        dispatch(saveProjectSuccessful(data))
      })
  }
}

export function deleteProjectApi(id) {
  return dispatch => {
    dispatch(deleteProject())
    return fetch(`${buildBackUrl().apiUrl}/project/${id}`, {
      method: 'delete',
      headers: headers
    })
      .then(handleResponse)
      .then(data => {
        dispatch(deleteProjectSuccessful(data))
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


