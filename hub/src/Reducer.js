/* eslint-disable */

import { combineReducers } from 'redux';
import { CV_DELETED, CV_FETCHED, LOADING, SET_CV } from './actions/cv';
import { IS_AUTH, NOT_AUTH } from './actions/login';
import { FILE_REMOVED, PROJECT_DELETED, SET_PROJECTS } from './actions/project';
import { APPLICATION_DELETED, APPLICATION_FETCHED, APPLICATION_MOVED_STAGE, EDIT_APPLICATION, SET_APPLICATIONS } from './actions/tracker';
import { clReducer, clsListReducer } from "./reducers/cl";
import { cvReducer, getCvsReducer } from "./reducers/cv";
import { catsReducer, relationsReducer } from "./reducers/relations";
import { snackBarReducer } from "./reducers/snackBar";
import { listProjectsReducer, projectReducer } from "./reducers/portfolio";
import { filesReducer } from "./reducers/files";

const pfInit = [
    {
        _id: '',
        name: '',
        slug: '',
        cats: {
            position: '',
            locale: '',
            cvCountry: '',
            status: '',
            projectDate: '',
        },
        image: '',
        desc: '<p></p>',
        documents: [],
        links: [],
    }
]


// ++correct here, always return the state then the data
const portfolio = (state = pfInit, action = {}) => {
    switch (action.type) {
        case FILE_REMOVED:
            const file = action.data
            return file
        case SET_PROJECTS:
            let portfolio = [];
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


function applications(state = [], action = {}) {
    switch (action.type) {
        case SET_APPLICATIONS:
            return [...action.applications];
        case APPLICATION_DELETED:
            const deleted = state.filter((item) => item._id !== action.cvs);
            return deleted;
        case EDIT_APPLICATION:
            const edited = state;
            return edited;

        case APPLICATION_MOVED_STAGE:
            return [...state];

        default:
            return state;
    }
}

function applicationDetail(state = {}, action = {}) {
    switch (action.type) {
        case APPLICATION_FETCHED:
            return { ...action.application };
        default:
            return state
    }

}

const isFetching = (state = false, action) => {
    switch (action.type) {
        case LOADING:
            return true
        case SET_CV:
            return false
        case CV_FETCHED:
            return false
        case CV_DELETED:
            return false
        case APPLICATION_FETCHED:
            return false
        default:
            return false
    }
}

export default combineReducers({
    cvReducer,
    getCvsReducer,
    snackBarReducer,
    relationsReducer,
    catsReducer,
    clsListReducer,
    clReducer,
    listProjectsReducer,
    projectReducer,
    filesReducer,
    // Old
    portfolio,
    authentication,
    applications,
    applicationDetail,
    isFetching
});

