import dotenv from 'dotenv'

dotenv.config()

function handleResponse(response) {
  if (response.statusText === 'OK') {
    return response.data;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

const headers = {
  'Content-Type': 'application/json',
  "Authorization": `Bearer ${JSON.parse(localStorage.getItem('hubToken'))}`,
}

const API_URL = `http://localhost:9000/api`;
const PDF_URL = `http://localhost:9000/pdf`;

export { API_URL, PDF_URL, headers, handleResponse };
