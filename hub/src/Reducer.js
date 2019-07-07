/* eslint-disable */

import { combineReducers } from 'redux';

import { SET_CV, CV_DELETED, SYNC_PERSDETAILS, CV_FETCHED, PDF_GENERATED } from './actions/cv';
import { SET_CLS, CL_DELETED } from './actions/cl';
import { SET_PROJECTS, PROJECT_DELETED, FILE_REMOVED, SET_CATS } from './actions/project';
import { SAVED_CATS } from './actions/cats';
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from './actions/notification';
import { IS_AUTH, NOT_AUTH } from './actions/login';
import { SET_APPLICATIONS, APPLICATION_DELETED, APPLICATION_FETCHED } from './actions/tracker';


import RichTextEditor from 'react-rte';

const cvInitial = 
    [
        {
          _id: '',
          name: '',
          createdAt: '',
          updatedAt: '',
          pdf:[],
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


const pfInit = [
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
    desc: '<p></p>',
    documents: [],
    links: [],
   } 
]

const clInit = [
   {
    _id: '' ,
    name: '',
    slug: '',
    pdf:[],
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

const catInit  = [
    {
        _id: '',
        label: "positions",
        title: "Positions",
        singLabel:"position",
        children: [],
    },
    {
        _id: '',
        label: "locales",
        title: "Languages",
        singLabel:"locale",
        children: [],
    },
    {
        _id: '',
        label: "statuses",
        title: "Statuses",
        singLabel:"status",
        children: [],
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
        case CV_FETCHED:
            return state;
        case PDF_GENERATED:
            const oldIndex = state.findIndex(i => i._id === action.pdf._id);
            state[oldIndex].pdf = action.pdf.pdf;
            return state;
        default: 
            return state;
    }
}

// ++correct here, always return the state then the data
const portfolio = (state = pfInit, action = {}) =>  {
    switch (action.type) {
        case FILE_REMOVED:
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

const cats = (state = catInit, action = {}) => {
    switch (action.type) {
        case SET_CATS:
            return action.cats;
        case SAVED_CATS:
            return state;
        default:
            return state
    }
}

const notification = (state = [], action) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            const newState = Object.assign({}, state, action.status);
            return newState;
        default:
            return []
    }
}

const authentication = (state = {}, action) => {
    switch (action.type) {
        case IS_AUTH:
            const isAuth = Object.assign({}, state, {
                token: action.payload.token,
                isAuthenticated: true
            });
            return isAuth;
        case NOT_AUTH:
            const noAuth = Object.assign({}, state, {
                token: action.payload.token,
                isAuthenticated: false
            });
            return noAuth;
        default:
            return {}
    }
}


function applications (state = {}, action = {} ){
    switch(action.type) {
        case SET_APPLICATIONS:
            return [...state];
        case APPLICATION_DELETED:
            const deleted = state.filter((item) => item._id !== action.cvs);
            return deleted;
        case APPLICATION_FETCHED:
            return state;
       
        default: 
            return state;
    }
}

export default combineReducers({ cvs, portfolio, coverLetters, cats, notification, authentication });

