/* eslint-disable */
import axios from 'axios';
import { handleResponse } from './actions.config'

export const SET_CATS = 'SET_CATS';


export function setCats(cats) {
    return {
        type: SET_CATS,
        cats: cats.data,
    }
}


export function fetchCats() {
    return dispatch => {
        return axios.get(`${process.env.REACT_APP_API_URL}/cats`)
        .then(handleResponse)
        .then(cats => dispatch(setCats(cats)));    
    }
}