import { CV_FETCHED, GET_ALL_CVS_SUCCESS, SET_ONE_CV } from "../actions/cv";

const initial = null;

export function cvReducer(state = initial, action = {}) {
  switch (action.type) {
    case SET_ONE_CV:
      return action.cv;
    case CV_FETCHED:
      return state;
    default:
      return state;
  }
}

export function getCvsReducer(state = initial, action = {}) {
  switch (action.type) {
    case GET_ALL_CVS_SUCCESS:
      return action.cvs;
    default:
      return state;
  }
}
