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

let API_URL, PDF_URL;
if (process.env.NODE_ENV === "development") {
  API_URL = `http://localhost:9000/api`;
  PDF_URL = `http://localhost:9000/pdf`;
} else {
  API_URL = `http://api.carloswu.com/api`;
  PDF_URL = `http://api.carloswu.com/pdf`;
}

export { API_URL, PDF_URL, headers, handleResponse };
