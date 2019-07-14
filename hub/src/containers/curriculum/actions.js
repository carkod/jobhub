/* eslint-disable */
import axios from 'axios';
import { API_URL, handleResponse } from '../../actions/actions.config';

export const SET_CATS = 'SET_CATS';
/*export const DELETED_CATS = 'DELETED_CATS';
export const COPIED_CATS = 'COPIED_CATS';
export const SAVED_CATS = 'SAVED_CATS';
*/


/*export function deletedCats(cats) {
    return {
        type: DELETED_CATS,
        cats: cats.data,
    }
}

export function savedCats(cats) {
    return {
        type: SAVED_CATS,
        cats: cats.data,
    }
}

export function copiedCats(cats) {
    return {
        type: COPIED_CATS,
        cats: cats.data,
    }
}
*/
export function setCats(cats) {
    return {
        type: SET_CATS,
        cats,
    }
}


export function fetchCats() {
    return dispatch => {
        axios.get(`${API_URL}/cats`)
            .then(res => {
                handleResponse(res)
                dispatch(setCats(res.data))
            });
    }
}


/*export function deleteCats(id) {
    return dispatch => {
        return fetch(`${API_URL}/cats/${id}`, {
           method: 'delete',
           headers: {
               "Content-Type" : "application/json"
           }
        })
        .then(handleResponse)
        .then(data => dispatch(deletedCats(id)));
    }
}

export function copyCats(data) {
    return dispatch => {
        return fetch(`${API_URL}/cats/${data._id}`, {
           method: 'post',
           body: JSON.stringify(data),
           headers: {
               "Content-Type" : "application/json"
           }
        })
        .then(handleResponse)
        .then(data => dispatch(copiedCats(data.CV)));
    }

}

export function saveCats(data) {
    return dispatch => {
        return fetch(`${API_URL}/cats`, {
           method: 'post',
           body: JSON.stringify(data),
           headers: {
               "Content-Type" : "application/json"
           }
        }).then(handleResponse).then(data => dispatch(savedCV(data))).then(data);
    }
}*/