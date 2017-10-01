import { combineReducers } from 'redux';

import { SET_CV, SYNC_PERSDETAILS } from './actions';

const INITIAL = {
    
}

function cvs (state = INITIAL, action = {} ){
    switch(action.type) {
        case SET_CV:
            return action.cvs;
        
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