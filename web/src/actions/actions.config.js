
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
  API_URL = `${process.env.ENV_DEV}:${process.env.BACK_PORT}/api`;
  PDF_URL = `${process.env.ENV_DEV}:${process.env.BACK_PORT}/pdf`;
} else {
  API_URL = `${process.env.ENV_PROD}:${process.env.BACK_PORT}/api`;
  PDF_URL = `${process.env.ENV_PROD}:${process.env.BACK_PORT}/pdf`;
}

export { API_URL, PDF_URL, headers, handleResponse };
