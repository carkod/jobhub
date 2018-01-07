import { combineReducers } from 'redux';

import { SET_CV, CV_DELETED, SYNC_PERSDETAILS } from './actions/cv';
import { SET_CLS, CL_DELETED } from './actions/cl';
import { SET_PROJECTS, PROJECT_DELETED, FILE_REMOVED } from './actions/project';
import RichTextEditor from 'react-rte';

const cvInitial = 
    [
        {
          _id: '',
          name: '',
          createdAt: '',
          updatedAt: '',
          cats: {
                position: '',
                locale: '',
                cvCountry:'',
            },
          summary: RichTextEditor.createEmptyValue(),
          persdetails: {
              name: '',
              lastname: '',
              DoB: '',
              PoB: '',
              nationality: '',
              ID: '',
              address: '',
              PC: '',
              city: '',
              country: '',
              email: '',
              phone: '',
              
          },
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
        locale: '',
        cvCountry:'',
    },
    image: '',
    desc: RichTextEditor.createEmptyValue(),
    documents: [],
    links: [],
   } 
]

const clInit = [
   {
    _id: '' ,
    name: '',
    slug: '',
    cats: {
        position: '',
        locale: '',
        cvCountry:'',
        status:'',
    },
    image: '',
    desc: RichTextEditor.createEmptyValue(),
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
    switch (action.type) {
        
        default:
            return state
    }
}

const portfolio = (state = pfInit, action = {}) =>  {
    switch (action.type) {
        case FILE_REMOVED:
            console.log(state);
            console.log(action);
            const file = action.data
            return file
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

const coverLetters = (state = clInit, action = {}) =>  {
    switch (action.type) {
        case SET_CLS:
            let combined = [];
            for (let i of action.CLs) {
                const merge = Object.assign({}, clInit[0], i);
                combined.push(merge)
            }
            //Find immutable way of doing this
            return combined;
        case CL_DELETED:
            const deleted = state.filter((item) => item._id !== action.cls);
            return deleted;
        default:
            return state
    }
}

export default combineReducers({ cvs, detail, portfolio, coverLetters });

