/* eslint-disable */
import API_URL from './dev';
import axios from 'axios';

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
        .catch((err) => handleResponse(err))
        .then(cats => dispatch(setCats(cats)));    
    }
}