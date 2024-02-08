export function handleResponse(response, res) {
  if (response.ok && response.status < 400) {
      return response.json();
  } else {
    let error = new Error(response.statusText);
    error.status = response.status;
    throw error;
  }
}

export function escapeRegex(string) {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}