import {
  DELETE_BLOG_SUCCESS,
  GET_ALL_BLOGS_SUCCESS,
  GET_BLOG_SUCCESS,
  SAVE_BLOG
} from "../actions/blog";

const blog = {
  name: "",
  content: "",
  category: "dev",
  status: "draft",
  publishTolinkedin: false,
};

const blogState = {
  blog: blog,
  categories: [],
  statuses: [],
  postOnMedium: false,
};

export function blogsReducer(state = {}, action = {}) {
  switch (action.type) {
    case GET_ALL_BLOGS_SUCCESS:
      return action.Blogs;
    case DELETE_BLOG_SUCCESS:
      const deleted = state.filter((item) => item._id !== action.Blog);
      return deleted;
    case SAVE_BLOG:
      return state;
    default:
      return state;
  }
}

export function blogReducer(state = blogState, action = {}) {
  switch (action.type) {
    case GET_BLOG_SUCCESS:
      return {
        ...state.blog,
        ...action.data,
      };
    case "RESET_BLOG_FORM":
      return blogState;
    default:
      return state;
  }
}

export { blogState };
