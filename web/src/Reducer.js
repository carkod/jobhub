import { combineReducers } from 'redux';

//import { SET_CV, CV_DELETED, SYNC_PERSDETAILS } from './actions/cv';

const init = {}


const detail = (state = init, action = {}) =>  {
    switch (action.type) {
        default:
            return state
    }
}

export default combineReducers({ detail });

