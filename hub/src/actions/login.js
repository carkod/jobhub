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
        throw error;
    }
}

export function isAuthenticated(id) {
    return {
      type: IS_AUTH,
      id
    }
}

export function isNotAuthenticated(id) {
    return {
      type: NOT_AUTH,
      id
    }
}

export function authenticate (data) {
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
                dispatch(isAuthenticated(data))
                data.type = 'IS_AUTH';
                dispatch(addNotification(data));
            } else {
                dispatch(isNotAuthenticated(data))
                data.type = 'NOT_AUTH';
                dispatch(addNotification(data));
            }
            
        });
    }  
    
}