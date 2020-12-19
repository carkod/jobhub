
function handleResponse(response) {
  if (response.ok) {
      return response.json();
  } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
  }
}

const headers = {
  'Content-Type': 'application/json',
  "Authorization": `Bearer ${localStorage.getItem('hubToken')}`,
}

const bufferHeaders = {
  'Accept': 'application/pdf',
  "Authorization": `Bearer ${localStorage.getItem('hubToken')}`,
}

const formdataHeaders = {
  "Authorization": `Bearer ${localStorage.getItem('hubToken')}`,
}

function handlePdfResponse(response) {
  if (response.ok) {
      return response;
  } else {
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
  }
}

export { headers, handleResponse, formdataHeaders, bufferHeaders, handlePdfResponse };