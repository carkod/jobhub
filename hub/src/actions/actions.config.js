
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
  "Authorization": `Bearer ${JSON.parse(localStorage.getItem('hubToken'))}`,
}

let API_URL, PDF_URL;
if (process.env.NODE_ENV === "development") {
  API_URL = `http://localhost:8081/api`;
  PDF_URL = `http://localhost:8081/pdf`;
} else {
  API_URL = `http://carloswu.xyz:8081/api`;
  PDF_URL = `http://carloswu.xyz:8081/pdf`;
}

export { API_URL, PDF_URL, headers, handleResponse };