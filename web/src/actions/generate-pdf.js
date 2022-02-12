import { bufferHeaders, buildBackUrl, handlePdfResponse } from './actions.config';

export const GENERATE_PDF = 'GENERATE_PDF';
export const GENERATE_PDF_SUCCESS = 'GENERATE_PDF_SUCCESS';
export const GENERATE_PDF_FAILED = 'GENERATE_PDF_FAILED';


export function generatePdf() {
  return {
      type: GENERATE_PDF,
      error: false,
      message: "Generating PDF for you. Please wait...",
      loading: true,
  }
}

export function generatePdfSuccess() {
  return {
      type: GENERATE_PDF_SUCCESS,
      error: false,
      message: "Successfully generated! Downloading...",
      loading: false,
  }
}

export function generatePdfFailed(payload) {
  return {
      type: GENERATE_PDF_FAILED,
      error: true,
      message: "Failed to generate this CV. Please contact Carlos or try another CV",
      loading: false,
      payload
  }
}

export function generatePdfApi(type, id) {
  return dispatch => {
      dispatch(generatePdf());
      return fetch(`${buildBackUrl().pdfUrl}/generate/${type}/${id}`, {
          method: 'GET',
          headers: bufferHeaders,
      })
      .then(handlePdfResponse)
      .then((response) => {
          dispatch(generatePdfSuccess())
          return response.arrayBuffer();
      })
      .catch(e => dispatch(generatePdfFailed(e)))
  }
  
}