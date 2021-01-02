import { bufferHeaders, handleResponse, headers } from "./actions.config";

export function fetchBlogsApi() {
  return fetch(`${process.env.REACT_APP_API_URL}/blogs`, {
    method: "GET",
    headers: headers,
  })
    .then(handleResponse)
    .then((data) => data );
}

export function fetchBlogApi(id) {
  return fetch(`${process.env.REACT_APP_API_URL}/blog/${id}`, {
    headers: headers,
  })
    .then(handleResponse)
    .then((data) => data);
}

export function searchBlogApi(term) {
  return fetch(`${process.env.REACT_APP_API_URL}/blogs/name/${term}`, {
    headers: headers,
  })
    .then(handleResponse)
    .then((data) => data);
}

export function searchBlogCategoryApi(category) {
  return fetch(`${process.env.REACT_APP_API_URL}/blogs/category/${category}`, {
    headers: headers,
  })
    .then(handleResponse)
    .then((data) => data);
}