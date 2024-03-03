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
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
}

export function delay(ms=5000) {
  return new Promise((res) => setTimeout(res, ms));
}

export const typedStatus = ["in progress", "applied", "success", "rejected"];

export function validateUrl(url) {
  if (!url) return false;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return url.match(urlRegex);
}
