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

export default function authenticate (data) {
    return dispatch => {
        console.log(data)
        return fetch(`http://localhost:8081/api/login`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then(handleResponse)
        .then(data => {
            
            // dispatch(addCV(data));
            // dispatch(addNotification(addCV(data)));
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