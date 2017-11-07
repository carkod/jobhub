import { combineReducers } from 'redux';

import { SET_CV, SYNC_PERSDETAILS, CV_DELETED } from './actions';
import RichTextEditor from 'react-rte';

const cvInitial = 
    [
        {
          _id: '',
          name: '',
          createdAt: '',
          updatedAt: '',
          persdetails: { name: '', lastname: ''},
          workExp: [{
              id: 'workExp-0', 
              date:'', 
              position:'', 
              company:'',
              desc: RichTextEditor.createEmptyValue(),
          }], 
          position: '',
          language: '',
        }
    ]


const detailInit = {
    messages: {
        savedID: '',
        savedName: '',
    }
}

function cvs (state = cvInitial, action = {} ){
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

function detail (state = detailInit, action = {}) {
    //console.log(state)
    //console.log(action)
    switch (action.type) {
        
        default:
            return state
    }
}

export default combineReducers({ cvs, detail });