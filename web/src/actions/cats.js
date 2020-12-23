/* eslint-disable */
import axios from 'axios';
import { handleResponse, headers } from './actions.config';

export const SET_CATS = 'SET_CATS';
export const SAVED_CATS = 'SAVED_CATS';
export const NOTIFICATION = 'NOTIFICATION';

// Old 

export function addNotification(status) {
    return {
        type: NOTIFICATION,
        status
    }
}

export function savedCats(cats) {
    return {
        type: SAVED_CATS,
        cats,
    }
}

export function setCats(cats) {
    return {
        type: SET_CATS,
        cats,
    }
}


export function fetchCats() {
    return dispatch => {
        axios.get(`${process.env.REACT_APP_API_URL}/cats`,{
            headers: headers
        })
            .then(res => {
                dispatch(setCats(res.data))
                dispatch(addNotification(setCats(res.data)))
            });
    }
}

export function saveCats(data) {
    return dispatch => {
        return fetch(`${process.env.REACT_APP_API_URL}/cats`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: headers
        })
        .then(handleResponse)
        .then(data => {
            dispatch(savedCats(data));
            dispatch(addNotification(savedCats(data)))
        });
    }
}