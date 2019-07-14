/* eslint-disable */
import { API_URL, handleResponse, headers } from './actions.config';
import { addNotification } from './notification';

export const IS_AUTH = 'IS_AUTH';
export const NOT_AUTH = 'NOT_AUTH';

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