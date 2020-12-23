import { COPY_CV_SUCCESS, CV_DELETED, CV_FETCHED, DELETE_CV_SUCCESS, GET_ALL_CVS_SUCCESS, SET_ONE_CV } from "../actions/cv";

const initial = null

export function cvReducer(state = initial, action = {}) {
  switch (action.type) {
    case SET_ONE_CV:
      return action.cv;
    case CV_DELETED:
      const deleted = state.filter((item) => item._id !== action.cvs);
      return deleted;
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
    case DELETE_CV_SUCCESS:
      const filtered = state.filter((item) => item._id !== action.cvs);
      return filtered;
    case COPY_CV_SUCCESS:
      const concatenated = state.filter((item) => item._id !== action.cvs);
      return concatenated;
    default:
      return state;
  }
}
