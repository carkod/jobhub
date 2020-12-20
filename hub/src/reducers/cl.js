import { COPY_CL_SUCCESS, DELETE_CL_SUCCESS, GET_CLS_SUCCESS, GET_CL_SUCCESS } from "../actions/cover-letter";

export function clsListReducer(state = {}, action = {}) {
  switch (action.type) {
    case GET_CLS_SUCCESS:
      return action.payload;
    case COPY_CL_SUCCESS:
      return state;
    default:
      return state;
  }
}

export function clReducer(state = {}, action = {}) {
  switch (action.type) {
    case GET_CL_SUCCESS:
      return action.data;
    default:
      return state;
  }
}
