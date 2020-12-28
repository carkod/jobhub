import { GET_RELATIONS_SUCCESS } from '../actions/relations';

// For Relationship page
export function relationsReducer(state = null, action = {}) {
  switch (action.type) {
      case GET_RELATIONS_SUCCESS:
        return action.payload
      default:
          return state
  }
}


// For Consumption - CV pages
export function catsReducer(state = null, action = {}) {
  switch (action.type) {
      case GET_RELATIONS_SUCCESS:
        const {payload} = action;
        const categories = payload.map(x => {
          return x.children
        })
        return {
          positions: categories[0],
          locales: categories[1],
          statuses: categories[2],
          categories: categories[4]
        }
      default:
          return state
  }
}
