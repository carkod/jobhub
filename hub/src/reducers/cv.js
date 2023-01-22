import RichTextEditor from "react-rte";
import shortid from "shortid";
import {
  COPY_CV_SUCCESS,
  CV_DELETED,
  CV_FETCHED,
  DELETE_CV_SUCCESS,
  GET_ALL_CVS_SUCCESS,
  RESET_CV_STATE,
  SET_CV_STATE,
  SET_ONE_CV,
} from "../actions/cv";
import produce from 'immer';


const expObj = {
  id: "workExp-" + shortid.generate(),
  date: "",
  position: "",
  company: "",
  desc: RichTextEditor.createEmptyValue(),
};

const educObj = {
  id: "educ-" + shortid.generate(),
  date: "",
  diploma: "",
  institution: "",
  desc: RichTextEditor.createEmptyValue(),
};

const skillsObjGenerator = (prefix) => {
  return {
    id: prefix + "-" + shortid.generate(),
    name: "",
    level: "",
    desc: "",
  };
};

const cvModel = {
  cats: {
    locale: "",
    position: "",
    status: "draft",
  },
  name: "",
  navName: "",
  summary: "<p></p>",
  workExp: [expObj],
  persdetails: {
    name: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    PC: "",
    city: "",
    country: "",
    nationality: "",
    DoB: "",
    PoB: "",
    ID: "",
    photo: "",
  },
  educ: [educObj],
  langSkills: [skillsObjGenerator("langSkill")],
  webdevSkills: [skillsObjGenerator("webdevSkill")],
  itSkills: [skillsObjGenerator("itSkill")],
};


const cvReducer = produce((draft, action) => {
  switch (action.type) {
    case RESET_CV_STATE:
      draft = cvModel;
      break;
    case SET_CV_STATE:
      const newState = Object.assign(draft, action.payload);
      draft = newState
      break;
    case SET_ONE_CV:
      if (action.cv) {
        const newState = Object.assign(state, action.cv);
        return newState;
      } else {
        return draft;
      }

    case CV_DELETED:
      const deleted = draft.filter((item) => item._id !== action.cvs);
      return deleted;
    case CV_FETCHED:
      return draft;
    default:
      return draft;
  }
}, cvModel)

export function getCvsReducer(state = [cvModel], action = {}) {
  switch (action.type) {
    case GET_ALL_CVS_SUCCESS:
      return action.cvs;
    case DELETE_CV_SUCCESS:
      const filtered = state.filter((item) => item._id !== action.cvs);
      return filtered;
    case COPY_CV_SUCCESS:
      const concatenated = state.filter((item) => item._id !== action.cvs);
      return concatenated;
    default:
      return state;
  }
}

export { cvReducer, cvModel, expObj, educObj, skillsObjGenerator };
