import { combineReducers } from 'redux';
import { reducer as form  } from 'redux-form';

import { SET_CV } from './actions';


function cvs (state = [], action = {} ){
    switch(action.type) {
        case SET_CV:
            return action.cvs
            
        default: return state;
    }
}

export default combineReducers({
    cvs, form: form,
});