/* eslint-disable */
import API_URL from './dev';
import axios from 'axios';

export const SET_PROJECTS = 'SET_PROJECTS';


export function setProjects(project) {
    return {
        type: SET_PORTFOLIO,
        project: project.data,
    }
}


export function fetchProjects() {
    return dispatch => {
        return axios.get(`${API_URL}/portfolio`)
        .catch((err) => handleResponse(err))
        .then(res => dispatch(setProjects(res)));    
    }
    
}
