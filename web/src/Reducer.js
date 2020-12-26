import { combineReducers } from "redux";
import { FILE_REMOVED, PROJECT_DELETED, SET_PROJECTS } from "./actions/project";
import { cvReducer, getCvsReducer } from "./reducers/cv";
import { snackBarReducer } from "./reducers/snack-bar";

// ++correct here, always return the state then the data
const portfolio = (state = null, action = {}) => {
  switch (action.type) {
    case FILE_REMOVED:
      const file = action.data;
      return file;
    case SET_PROJECTS:
      let portfolio = [];
      for (let i of action.projects) {
        const merge = Object.assign({}, pfInit[0], i);
        portfolio.push(merge);
      }
      return portfolio;
    case PROJECT_DELETED:
      const deleted = state.filter((item) => item._id !== action.cvs);
      return deleted;

    default:
      return state;
  }
};

export default combineReducers({
  cvReducer,
  getCvsReducer,
  snackBarReducer,
  // Old
  portfolio,
});
