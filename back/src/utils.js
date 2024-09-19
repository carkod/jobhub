export function handleResponse(response, res) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`Response status: ${response.status}`);
  }
}

export function escapeRegex(string) {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
}

export function delay(ms = 5000) {
  return new Promise((res) => setTimeout(res, ms));
}

export const typedStatus = ["in progress", "applied", "success", "rejected"];

export function validateUrl(url) {
  if (!url) return false;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return url.match(urlRegex);
}

export async function apiRequest(url, verb, data, headers) {
  if (!headers) {
    headers = headers;
  }

  let options = {
    method: verb,
    body: data,
    headers: headers,
  };

  const request = new Request(url, options);
  console.log("request ", request);
  const response = await fetch(request);
  const content = await handleResponse(response);
  return content;
}
