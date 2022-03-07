import { bufferHeaders, handlePdfResponse, buildBackUrl } from '../utils';

export const GENERATE_PDF = 'GENERATE_PDF';
export const GENERATE_PDF_SUCCESS = 'GENERATE_PDF_SUCCESS';
export const GENERATE_PDF_FAILED = 'GENERATE_PDF_FAILED';


export function generatePdf() {
  return {
      type: GENERATE_PDF,
      error: false,
      message: GENERATE_PDF,
  }
}

export function generatePdfSuccess() {
  return {
      type: GENERATE_PDF_SUCCESS,
      error: false,
      message: GENERATE_PDF_SUCCESS
  }
}

export function generatePdfFailed(payload) {
  return {
      type: GENERATE_PDF_FAILED,
      error: true,
      message: GENERATE_PDF_FAILED,
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
          dispatch(generatePdfSuccess());
          return response.arrayBuffer();
      })
      .catch(e => dispatch(generatePdfFailed(e)))
  }
  
}