/* eslint-disable */
import {API_URL, PDF_URL} from './dev';
import {addNotification, removeNotification} from './notification';

export const IS_AUTH  = 'IS_AUTH';
export const NOT_AUTH = 'NOT_AUTH';

function handleResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        return response.json();
    }
}

export function isAuthenticated(id) {
    return {
      type: IS_AUTH,
      id,
    }
}

export function isNotAuthenticated(payload) {
    return {
      type: NOT_AUTH,
      payload,
    }
}

export function auth (data) {
    return dispatch => {
        return fetch(`${API_URL}/login`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then(handleResponse)
        .then(data => {
            if (data.status) {
                dispatch(addNotification(isAuthenticated(data)));
                return dispatch(isAuthenticated(data));
            } else {
                dispatch(addNotification(isNotAuthenticated(data)));
                return dispatch(isNotAuthenticated(data));
            }
            
        });
    }  
    
}