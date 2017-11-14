import { combineReducers } from 'redux';

import { SET_CV, CV_DELETED, SYNC_PERSDETAILS } from './actions/cv';
import { SET_PROJECTS, PROJECT_DELETED } from './actions/project';
import RichTextEditor from 'react-rte';

const cvInitial = 
    [
        {
          _id: '',
          name: '',
          createdAt: '',
          updatedAt: '',
          position: '',
          language: '',
          summary: RichTextEditor.createEmptyValue(),
          persdetails: { name: '', lastname: ''},
          workExp: [{
              id: 'workExp-0', 
              date:'', 
              position:'', 
              company:'',
              desc: RichTextEditor.createEmptyValue(),
          }], 
          educ: [{
              id: 'educ-0', 
              date:'', 
              diploma:'', 
              institution:'',
              desc: RichTextEditor.createEmptyValue(),
          }], 
          langSkills: [{
              id: 'langSkills-0', 
              name:'', 
              desc:'', 
              level:'',
          }],
          webdevSkills: [{
              id: 'webdevSkills-0', 
              name:'', 
              desc:'', 
              level:'',
          }],
          itSkills: [{
              id: 'itSkills-0', 
              name:'', 
              desc:'', 
              level:'',
          }],
        }
    ]


const detailInit = {
    messages: {
        savedID: '',
        savedName: '',
    }
}

const pfInit = [
   {
    _id: '' ,
    name: '',
    slug: '',
    cats: {
        position: '',
        cvLang: '',
        cvCountry:'',
    },
    details: { 
        description: '',
        files: '',
    },
    //other: { type: Schema.Types.Mixed },
   } 
]

function cvs (state = cvInitial, action = {} ){
    switch(action.type) {
        case SET_CV:
            let combined = [];
            for (let i of action.cvs) {
                const merge = Object.assign({}, cvInitial[0], i);
                combined.push(merge)
            }
            //Find immutable way of doing this
            return combined;
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

const portfolio = (state = pfInit, action = {}) =>  {
    switch (action.type) {
        case SET_PROJECTS:
            let portfolio= [];
            for (let i of action.projects) {
                const merge = Object.assign({}, pfInit[0], i);
                portfolio.push(merge)
            }
            return portfolio;
        case PROJECT_DELETED:
            const deleted = state.filter((item) => item._id !== action.cvs);
            return deleted;
        default:
            return state
    }
}

export default combineReducers({ cvs, detail, portfolio });