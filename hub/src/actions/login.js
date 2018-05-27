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
        return fetch(`http://localhost:8081/api/login`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then(handleResponse)
        .then(data => {
            console.log(data)    
            if (data.status) {
                dispatch(addNotification(isAuthenticated(data)));
            } else {
                dispatch(addNotification(isNotAuthenticated(data)));
            }
            
        });
    }  
    // return dispatch => {
    //     return fetch(`localhost:8081/api/login`, {
    //         method: 'post',
    //         body: JSON.stringify(data),
    //         headers: {
    //             "Content-Type" : "application/json"
    //         }
    //     })
    //     .then(handleResponse)
    //     .then(data => {
    //         // dispatch(addCV(data));
    //         // dispatch(addNotification(addCV(data)));
    //     });   
    // }
}