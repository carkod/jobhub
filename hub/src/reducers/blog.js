import { DELETE_BLOG_SUCCESS, GET_ALL_BLOGS_SUCCESS, GET_BLOG_SUCCESS, SAVE_BLOG } from "../actions/blog";

const initial = {
  id: null,
  name: "",
  content: "",
  category: "dev",
  status: "draft",
}

export function blogsReducer(state = {}, action = {}) {
  switch (action.type) {
    case GET_ALL_BLOGS_SUCCESS:
      return action.Blogs
    case DELETE_BLOG_SUCCESS:
      const deleted = state.filter((item) => item._id !== action.Blog);
      return deleted;
    case SAVE_BLOG:
      return state;
    default:
      return state;
  }
}

export function blogReducer(state = initial, action = {}) {
  switch (action.type) {
    case GET_BLOG_SUCCESS:
      return {
        ...state,
        ...action.data
      };
    case "UPDATE_BLOG_STATE":
      const newState = {
        ...state,
        ...action.payload
      };
      return newState; 
    case "RESET_BLOG_FORM":
      return {
        ...state,
        ...initial
      }
    default:
      return state;
  }
}
