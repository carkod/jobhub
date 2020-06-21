
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

const formdataHeaders = {
  "Authorization": `Bearer ${localStorage.getItem('hubToken')}`,
}

const API_URL = `http://localhost:9000/api`;
const PDF_URL = `http://localhost:9000/pdf`;

export { API_URL, PDF_URL, headers, handleResponse, formdataHeaders };