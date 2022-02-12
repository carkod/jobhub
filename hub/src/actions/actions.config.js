export const headers = {
  'Content-Type': 'application/json',
  "Authorization": `Bearer ${localStorage.getItem('hubToken')}`,
}

export const bufferHeaders = {
  'Accept': 'application/pdf',
  "Authorization": `Bearer ${localStorage.getItem('hubToken')}`,
}

export const formdataHeaders = {
  "Authorization": `Bearer ${localStorage.getItem('hubToken')}`,
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

export function buildBackUrl() {
  let base = window.location.hostname.split(".")
  if (base.includes("localhost")) {
    base = ["localhost:8082"]
  } else {
    base.unshift("api")
  }
  base = `${window.location.protocol}//${base.join(".")}`;
  return {
    apiUrl: `${base}/api`,
    pdfUrl: `${base}/pdf`
  }
}
