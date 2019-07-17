import { combineReducers } from 'redux';
import { SET_CATS } from './actions/cats';
import { SET_CV, SET_SINGLE_CV } from './actions/cv';
import { SET_PROJECTS } from './actions/res';


const cvInitial =
    [
        {
            _id: '',
            name: '',
            createdAt: '',
            updatedAt: '',
            pdf: '',
            cats: {
                position: '',
                locale: '',
                cvCountry: '',
            },
            summary: '',
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
                date: '',
                position: '',
                company: '',
                desc: '',
            }],
            educ: [{
                id: 'educ-0',
                date: '',
                diploma: '',
                institution: '',
                desc: '',
            }],
            langSkills: [{
                id: 'langSkills-0',
                name: '',
                desc: '',
                level: '',
            }],
            webdevSkills: [{
                id: 'webdevSkills-0',
                name: '',
                desc: '',
                level: '',
            }],
            itSkills: [{
                id: 'itSkills-0',
                name: '',
                desc: '',
                level: '',
            }],
        }
    ]


const pfInit = [
    {
        _id: '',
        name: '',
        slug: '',
        cats: {
            position: '',
            locale: '',
            cvCountry: '',
        },
        image: '',
        desc: '',
        documents: [],
        links: [],
    }
]



const cvs = (state = cvInitial, action = {}) => {
    switch (action.type) {
        case SET_CV:
            if (!action.cvs) {
                return state
            }
            return action.cvs
        default:
            return state
    }
}

function singleCV(state = { ...cvInitial[0] }, action) {
    switch (action.type) {
        case SET_SINGLE_CV: 
        console.log(state, action)
            return Object.assign({}, state, action.cv)
        
            
        default:
            return state
    }
}

const cats = (state = {}, action = {}) => {
    switch (action.type) {
        case SET_CATS: {
            const data = action.cats;
            return Object.assign({}, state, {
                data
            })
        }
        default:
            return state
    }
}

const portfolio = (state = pfInit, action = {}) => {
    switch (action.type) {
        case SET_PROJECTS:
            if (!action.cvs) {
                return state[0]
            }
            return action.project
        default:
            return state
    }
}

export default combineReducers({ cvs, cats, portfolio, singleCV });

