import { COPY_CV_SUCCESS, DELETE_CV_SUCCESS, GENERATE_PDF, GENERATE_PDF_FAILED, GENERATE_PDF_SUCCESS, GET_ALL_CVS_SUCCESS, SAVE_CV, SAVE_CV_SUCCESS } from "../actions/cv";
import { DELETE_RELATION, DELETE_RELATION_FAILED, DELETE_RELATION_SUCCESS, SAVE_RELATION, SAVE_RELATION_FAILED, SAVE_RELATION_SUCCESS } from "../actions/relations";

export function snackBarReducer(state = { loading: false, message: null, error: false }, action = {}) {
  switch (action.type) {
    case GENERATE_PDF:
      return {
        loading: true,
        message: action.message,
        error: false,
      };
    case GENERATE_PDF_SUCCESS:
      return {
        loading: false,
        message: action.message,
        error: false
      };;
    case GENERATE_PDF_FAILED:
      return {
        loading: false,
        message: action.message,
        error: false
      };
    case GET_ALL_CVS_SUCCESS:
      return {
        loading: false,
        message: action.message,
        error: false
      };
    case COPY_CV_SUCCESS:
      return {
        loading: false,
        message: action.message,
        error: false
      };
    case DELETE_CV_SUCCESS:
      return {
        loading: false,
        message: action.message,
        error: false
      };
    case SAVE_CV:
      return {
        loading: false,
        message: action.message,
        error: false
      };
    case SAVE_CV_SUCCESS:
      return {
        loading: false,
        message: action.message,
        error: false
      };
    case SAVE_RELATION:
      return {
        ...state,
        message: action.message,
        error: false,
        loading: true
      };
    case SAVE_RELATION_SUCCESS:
      const { payload } = action;
      return {
        ...state,
        message: payload.message,
        error: false,
        loading: false
      };
    case SAVE_RELATION_FAILED:
      return {
        ...state,
        action
      };
    case DELETE_RELATION:
      return {
        ...state,
        action
      };
    case DELETE_RELATION_SUCCESS:
      return {
        ...state,
        action
      };
    case DELETE_RELATION_FAILED:
      return {
        ...state,
        action
      };
    default:
      return state;
  }
}