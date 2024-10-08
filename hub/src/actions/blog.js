import { buildBackUrl, handleResponse, headers } from "../utils";

export const GET_BLOG_SUCCESS = "GET_BLOG_SUCCESS";
export const GET_ALL_BLOGS_SUCCESS = "GET_ALL_BLOGS_SUCCESS";
export const COPY_Blog_SUCCESS = "COPY_Blog_SUCCESS";
export const DELETE_BLOG_SUCCESS = "DELETE_BLOG_SUCCESS";
export const SAVE_BLOG = "SAVE_BLOG";
export const SAVE_BLOG_SUCCESS = "SAVE_BLOG_SUCCESS";
export const SAVE_BLOG_FAILED = "SAVE_BLOG_FAILED";

/**
 * New action creators
 * 2 states instead of three:
 *  - Fetch action directly no state
 *  - Action successful state
 *  - Notification (snackBar) states
 *  these are listened by the snackBar reducer
 *  and do not have additional ACTIONS
 */

export function fetchBlogsSuccess(Blogs) {
  return {
    type: GET_ALL_BLOGS_SUCCESS,
    error: false,
    message: GET_ALL_BLOGS_SUCCESS,
    Blogs,
  };
}

export function fetchBlogSuccess(payload) {
  return {
    type: GET_BLOG_SUCCESS,
    error: false,
    message: payload.message,
    data: payload.data,
  };
}

export function saveBlog(Blogs) {
  return {
    type: SAVE_BLOG,
    error: false,
    message: SAVE_BLOG,
    Blogs,
  };
}

export function saveBlogSuccess(Blogs) {
  return {
    type: SAVE_BLOG_SUCCESS,
    error: false,
    message: Blogs.message,
    Blogs,
  };
}

export function saveBlogFail(Blogs) {
  return {
    type: SAVE_BLOG_FAILED,
    error: false,
    message: Blogs.message,
    Blogs,
  };
}

export function deleteBlogSuccess(payload) {
  return {
    type: DELETE_BLOG_SUCCESS,
    payload,
  };
}

export function deleteBlogApi(id) {
  return (dispatch) => {
    return fetch(`${buildBackUrl().apiUrl}/blogs/${id}`, {
      method: "delete",
      headers: headers,
    })
      .then(handleResponse)
      .then((data) => dispatch(deleteBlogSuccess(id)));
  };
}

export function fetchBlogsApi() {
  return (dispatch) => {
    return fetch(`${buildBackUrl().apiUrl}/blogs`, {
      headers: headers,
    })
      .then(handleResponse)
      .then((data) => {
        dispatch(fetchBlogsSuccess(data));
      });
  };
}

export function fetchBlogApi(id) {
  return (dispatch) => {
    return fetch(`${buildBackUrl().apiUrl}/blog/${id}`, {
      headers: headers,
    })
      .then(handleResponse)
      .then((data) => dispatch(fetchBlogSuccess(data)));
  };
}

export function saveBlogApi(data, postOnMedium=false) {
  return (dispatch) => {
    dispatch(saveBlog());
    return fetch(`${buildBackUrl().apiUrl}/blogs?postOnMedium=${postOnMedium}`, {
      method: "post",
      body: JSON.stringify(data),
      headers: headers,
    })
      .then(handleResponse)
      .then((data) => dispatch(saveBlogSuccess(data)));
  };
}
