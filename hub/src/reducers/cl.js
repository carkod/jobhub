import {
  COPY_CL_SUCCESS,
  GET_CLS_SUCCESS,
  GET_CL_SUCCESS,
  RESET_CL_FORM
} from "../actions/cover-letter";

const clState = {
  name: "",
  cats: {
    cvContry: "",
    locale: "",
    position: "",
  },
  image: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  locale: "",
  position: "",
  status: "",
  desc: "",
  slug: "",
  pdf: []
};

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

export function clReducer(state = clState, action = {}) {
  switch (action.type) {
    case GET_CL_SUCCESS:
      if (action.data) {
        return {
          ...state,
          ...action.data,
        };
      } else {
        return state;
      }
    case RESET_CL_FORM:
      return clState;
    default:
      return state;
  }
}

export { clState };
