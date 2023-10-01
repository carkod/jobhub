import { buildBackUrl, handleResponse, headers } from "./actions.config";

export function fetchBlogsApi() {
  return fetch(`${buildBackUrl().apiUrl}/blogs`, {
    method: "GET",
    headers: headers,
  })
    .then(handleResponse)
    .then((data) => {
      return data 
    });
}

export function fetchBlogApi(id) {
  return fetch(`${buildBackUrl().apiUrl}/blog/${id}`, {
    headers: headers,
  })
    .then(handleResponse)
    .then((data) => data);
}

export function searchBlogApi(term) {
  return fetch(`${buildBackUrl().apiUrl}/blogs/name/${term}`, {
    headers: headers,
  })
    .then(handleResponse)
    .then((data) => data);
}

export function searchBlogCategoryApi(category) {
  return fetch(`${buildBackUrl().apiUrl}/blogs/category/${category}`, {
    headers: headers,
  })
    .then(handleResponse)
    .then((data) => data);
}