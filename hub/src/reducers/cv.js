import update from 'react-addons-update';
import { CV_DELETED, CV_FETCHED, PDF_GENERATED, SET_ONE_CV } from "../actions/cv";

const initial = null

export default function cvReducer(state = initial, action = {}) {
  switch (action.type) {
    case SET_ONE_CV:
      return action.cv;
    case CV_DELETED:
      const deleted = state.filter((item) => item._id !== action.cvs);
      return deleted;
    case CV_FETCHED:
      return state;
    case PDF_GENERATED:
      const oldIndex = state.findIndex(element => element._id === action.cv._id);
      if (!action.cv) {
        action.cv = {}
      }
      const filter = update(state,
        { [oldIndex]: { pdf: { $merge: action.cv.pdf } } }
      )
      return filter;
    default:
      return state;
  }
}