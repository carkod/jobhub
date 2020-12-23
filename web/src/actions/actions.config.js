export const headers = {
  'Content-Type': 'application/json',
}

export const bufferHeaders = {
  'Accept': 'application/pdf',
}

export const formdataHeaders = {
}


export function handleResponse(response) {
  if (response.ok) {
      return response.json();
  } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
  }
}

export function handleUploadResponse(response) {
  if (response.ok) {
      return response.json();
  } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
  }
}

export function handlePdfResponse(response) {
  if (response.ok) {
      return response;
  } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
  }
}
