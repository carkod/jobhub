import { combineReducers } from "redux";
import { FILE_REMOVED, PROJECT_DELETED, SET_PROJECTS } from "./actions/project";
import { cvReducer, getCvsReducer } from "./reducers/cv";
import { snackBarReducer } from "./reducers/snack-bar";

const pfInit = [{}];

const portfolio = (state = null, action = {}) => {
  switch (action.type) {
    case FILE_REMOVED:
      return action.data;
    case SET_PROJECTS:
      let portfolioArr = [];
      if (action.projects) {
        for (let i of action.projects) {
          const merge = Object.assign({}, pfInit[0], i);
          portfolioArr.push(merge);
        }
      }
      return portfolioArr;
    case PROJECT_DELETED:
      if (state) {
        return state.filter((item) => item._id !== action.cvs);
      }
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  cvReducer,
  getCvsReducer,
  snackBarReducer,
  portfolio,
});
