import { DELETE_PROJECT_SUCCESFUL, GET_PROJECTS_SUCCESFUL, GET_PROJECT_SUCCESFUL, SAVE_PROJECT_SUCCESFUL } from '../actions/portfolio';

// List project data
export function listProjectsReducer(state = null, action = {}) {
  switch (action.type) {
    case GET_PROJECTS_SUCCESFUL:
      return action.payload
    case DELETE_PROJECT_SUCCESFUL:
      return action.payload

    default:
      return state
  }
}


// Single project data
export function projectReducer(state = null, action = {}) {
  switch (action.type) {
    case GET_PROJECT_SUCCESFUL:
      return {
        ...state,
        ...action.payload.data
      }
    default:
      return state
  }
}
