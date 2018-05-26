/* eslint-disable */
import {API_URL, PDF_URL} from './dev';

function handleResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export default function authenticate (details) {
    
    return dispatch => {
        return fetch(`${API_URL}/cvs`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then(handleResponse)
        .then(data => {
            dispatch(addCV(data));
            dispatch(addNotification(addCV(data)));
        });   
    }
    
}