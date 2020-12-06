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

export { headers, handleResponse };
