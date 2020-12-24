import {
  generatePdfSuccess,
  GENERATE_PDF,
  GENERATE_PDF_FAILED,
  GENERATE_PDF_SUCCESS
} from "../actions/generate-pdf";

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
    
    default:
      return state;
  }
}
