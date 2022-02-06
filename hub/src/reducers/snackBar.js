import { SAVE_BLOG_FAILED, SAVE_BLOG_SUCCESS } from "../actions/blog";
import { NOTIFICATION } from "../actions/cl";
import {
  COPY_CL_FAILED,
  COPY_CL_SUCCESS,
  DELETE_CL_FAILED,
  DELETE_CL_SUCCESS,
  EDIT_CL,
  EDIT_CL_SUCCESS,
} from "../actions/cover-letter";
import {
  COPY_CV_SUCCESS,
  DELETE_CV_SUCCESS,
  GET_ALL_CVS_SUCCESS,
  SAVE_CV,
  SAVE_CV_SUCCESS,
} from "../actions/cv";
import {
  FILE_NOT_FOUND,
  UPLOAD_SUCCESS,
  UPLOAD_FAILED,
} from "../actions/files";
import {
  GENERATE_PDF,
  GENERATE_PDF_FAILED,
  GENERATE_PDF_SUCCESS,
} from "../actions/generate-pdf";
import {
  SAVE_PROJECT_SUCCESFUL,
  GET_PROJECT_SUCCESFUL,
} from "../actions/portfolio";
import {
  DELETE_RELATION,
  DELETE_RELATION_FAILED,
  DELETE_RELATION_SUCCESS,
  SAVE_RELATION,
  SAVE_RELATION_FAILED,
  SAVE_RELATION_SUCCESS,
} from "../actions/relations";

export function snackBarReducer(
  state = { loading: false, message: null, error: false },
  action = {}
) {
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
        error: false,
      };
    case GENERATE_PDF_FAILED:
      return {
        loading: false,
        message: action.message,
        error: false,
      };
    case GET_ALL_CVS_SUCCESS:
      return {
        loading: false,
        message: action.message,
        error: false,
      };
    case COPY_CV_SUCCESS:
      return {
        loading: false,
        message: action.message,
        error: false,
      };
    case DELETE_CV_SUCCESS:
      return {
        loading: false,
        message: action.message,
        error: false,
      };
    case SAVE_CV:
      return {
        loading: false,
        message: action.message,
        error: false,
      };
    case SAVE_CV_SUCCESS:
      return {
        loading: false,
        message: action.message,
        error: false,
      };
    case SAVE_RELATION:
      return {
        ...state,
        message: action.message,
        error: false,
        loading: true,
      };
    case SAVE_RELATION_SUCCESS:
      const { payload } = action;
      return {
        ...state,
        message: payload.message,
        error: false,
        loading: false,
      };
    case SAVE_RELATION_FAILED:
      return {
        ...state,
        action,
      };
    case DELETE_RELATION:
      return {
        ...state,
        action,
      };
    case DELETE_RELATION_SUCCESS:
      return {
        ...state,
        action,
      };
    case DELETE_RELATION_FAILED:
      return {
        ...state,
        action,
      };
    case EDIT_CL:
      return {
        ...state,
        message: action.message,
        error: action.error,
        loading: false,
      };
    case EDIT_CL_SUCCESS:
      return {
        ...state,
        message: action.cvs.message,
        error: action.error,
        loading: false,
      };
    case COPY_CL_SUCCESS:
      return {
        ...state,
        message: action.cvs.message,
        error: action.error,
        loading: false,
      };
    case DELETE_CL_SUCCESS:
      return {
        ...state,
        message: null,
        error: action.error,
        loading: false,
      };
    case COPY_CL_FAILED:
      return {
        ...state,
        message: action.cvs.message,
        error: action.error,
        loading: false,
      };
    case DELETE_CL_FAILED:
      return {
        ...state,
        message: action.cvs.message,
        error: action.error,
        loading: false,
      };
    case GET_PROJECT_SUCCESFUL:
      return {
        message: action.payload.message,
        error: action.payload.error,
        loading: false,
      };
    case SAVE_PROJECT_SUCCESFUL:
      return {
        message: action.payload.message,
        error: action.payload.error,
        loading: false,
      };
    case FILE_NOT_FOUND:
      return {
        message: action.message,
        error: action.error,
        loading: action.loading,
      };
    case UPLOAD_SUCCESS:
      return {
        message: action.payload.message,
        error: action.payload.error,
        loading: action.loading,
      };
    case UPLOAD_FAILED:
      return {
        message: action.payload.message,
        error: action.payload.error,
        loading: action.loading,
      };
    case SAVE_BLOG_SUCCESS:
      return {
        message: action.message,
        error: action.error,
        loading: false,
      };
    case SAVE_BLOG_FAILED:
      return {
        message: action.message,
        error: action.error,
        loading: false,
      };
    case NOTIFICATION:
      return {
        message: action.message,
        error: action.error,
        loading: false,
      }
    default:
      return state;
  }
}
