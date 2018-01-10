/* eslint-disable */
import API_URL from './dev';
import axios from 'axios';

export const SET_CATS = 'SET_CATS';


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
