import { combineReducers } from 'redux';

import { SET_CV, SYNC_PERSDETAILS, RETRIEVED_CV } from './actions';

const INITIAL = {
    
}

function cvs (state = INITIAL, action = {} ){
    switch(action.type) {
        case SET_CV:
            return action.cvs;
        
        case SYNC_PERSDETAILS:
            console.log(state)
            console.log(action.fields)
            return [ ...state, action.fields]
            /*return Object.assign({}, state, {
                persdetails: action.fields
            })*/
        case RETRIEVED_CV:
            return [
                ...state,
                action.fields
            ]
        default: 
            return state;
    }
}

export default combineReducers({
    cvs
});