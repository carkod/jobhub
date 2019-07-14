/* eslint-disable */
import axios from 'axios';
import { handleResponse, API_URL } from './actions.config';

export const SET_PROJECTS = 'SET_PROJECTS';


export function setProjects(project) {
    return {
        type: SET_PROJECTS,
        project: project.data,
    }
}


export function fetchProjects() {
    return dispatch => {
        return axios.get(`${API_URL}/portfolio`)
        .catch(handleResponse)
        .then(res => dispatch(setProjects(res)));    
    }
    
}
