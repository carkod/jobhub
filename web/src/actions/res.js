/* eslint-disable */
import axios from 'axios';
import { handleResponse } from './actions.config';

export const SET_PROJECTS = 'SET_PROJECTS';


export function setProjects(project) {
    return {
        type: SET_PROJECTS,
        project: project.data,
    }
}


export function fetchProjects() {
    return dispatch => {
        return axios.get(`${process.env.REACT_APP_API_URL}/portfolio`)
        .catch(handleResponse)
        .then(res => dispatch(setProjects(res)));    
    }
    
}
