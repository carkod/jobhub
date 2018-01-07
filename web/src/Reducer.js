import { combineReducers } from 'redux';

import { SET_CV } from './actions/cv';

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
              date:'', 
              position:'', 
              company:'',
              desc: '',
          }], 
          educ: [{
              id: 'educ-0', 
              date:'', 
              diploma:'', 
              institution:'',
              desc: '',
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


const cvs = (state = cvInitial, action = {}) =>  {
    switch (action.type) {
        case SET_CV:
            let combined = [];
            for (let i of action.cvs) {
                const merge = Object.assign({}, cvInitial[0], i);
                combined.push(merge)
            }
            //Find immutable way of doing this
            return combined;
        
        default:
            return state
    }
}


export default combineReducers({ cvs });

