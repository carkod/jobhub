import { SAVED_CATS } from '../actions/cats';
import { SET_CATS } from '../actions/project';

const catInit = null

export default function catsReducer (state = catInit, action = {}) {
  switch (action.type) {
      case SET_CATS:
        const {cats} = action;
        const categories = cats.map(x => {
          if (x.label === "positions") {
            return x.children
          }
          if (x.label === "locales") {
            return x.children
          }
          if (x.label === "statuses") {
            return x.children
          }
        })
        return {
          positions: categories[0],
          locales: categories[1],
          statuses: categories[2],
        }
      case SAVED_CATS:
          return state;
      default:
          return state
  }
}