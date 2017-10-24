import { combineReducers } from 'redux';

import { SET_CV, SYNC_PERSDETAILS, CV_DELETED } from './actions';

const INITIAL = {
    
}

function cvs (state = INITIAL, action = {} ){
    switch(action.type) {
        case SET_CV:
            return action.cvs;
        case CV_DELETED:
            const deleted = state.filter((item) => item._id !== action.cvs);
            return deleted;
        case SYNC_PERSDETAILS:
            
            return [ ...state, action.fields]
            /*return Object.assign({}, state, {
                persdetails: action.fields
            })*/
        
        default: 
            return state;
    }
}

function single (state = {}, action = {}) {
    switch (action.type) {
        
        default:
            return state
    }
}

export default combineReducers({ cvs, single });