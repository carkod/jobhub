/* eslint-disable */
import { API_URL, handleResponse, headers } from './actions.config';
import { addNotification, notAuthNotification, isAuthNotification } from './notification';
import axios from 'axios';

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
        message: payload.error,
    }
}

export function auth(data) {

    return (dispatch) =>
        axios.post(`${API_URL}/login`, data, { "Content-Type": "application/json" })
            .then(res => {
                console.log(res)
                if (res.data.status) {
                    const { message } = res.data;
                    dispatch(isAuthNotification(message))
                    dispatch(isAuthenticated(res.data))
                    localStorage.setItem('hubToken', JSON.stringify(res.data.token))
                    window.location.reload()
                }
            })
            .catch(e => {
                const { message } = e.response.data;
                dispatch(notAuthNotification(message))
                dispatch(isNotAuthenticated(e.response.data))
                console.log(e)
            }
            )
}
