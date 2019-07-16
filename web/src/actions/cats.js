/* eslint-disable */
import axios from 'axios';
import { API_URL } from './actions.config'

export const SET_CATS = 'SET_CATS';

function handleResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}


export function setCats(cats) {
    return {
        type: SET_CATS,
        cats: cats.data,
    }
}


export function fetchCats() {
    return dispatch => {
        return axios.get(`${API_URL}/cats`)
        .then(handleResponse)
        .then(cats => dispatch(setCats(cats)));    
    }
}