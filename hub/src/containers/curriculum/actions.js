/* eslint-disable */
import axios from 'axios';
import { handleResponse } from '../../actions/actions.config';

export const SET_CATS = 'SET_CATS';

export function setCats(cats) {
    return {
        type: SET_CATS,
        cats,
    }
}


export function fetchCats() {
    return dispatch => {
        axios.get(`${process.env.REACT_APP_API_URL}/cats`)
            .then(res => {
                handleResponse(res)
                dispatch(setCats(res.data))
            });
    }
}
