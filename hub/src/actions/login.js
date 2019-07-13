/* eslint-disable */
import { API_URL } from './dev';
import { addNotification } from './notification';

export const IS_AUTH = 'IS_AUTH';
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

export function isAuthenticated(payload) {
    return {
        type: IS_AUTH,
        payload,
    }
}

export function isNotAuthenticated(payload) {
    return {
        type: NOT_AUTH,
        payload,
    }
}

export function auth(data) {
    return fetch(`${API_URL}/login`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(handleResponse)
        .then(data => {
            console.log(data)
            if (data.status) {
                addNotification(isAuthenticated(data));
                localStorage.setItem('hubToken', data.token)
                return isAuthenticated(data);
            } else {
                addNotification(isNotAuthenticated(data));
                return isNotAuthenticated(data);
            }

        });
}