/* eslint-disable */
import axios from 'axios';
import { API_URL, handleResponse } from './actions.config'

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
        .then(handleResponse)
        .then(cats => dispatch(setCats(cats)));    
    }
}