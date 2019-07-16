export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';
export const NOTIFICATION = 'NOTIFICATION'

export function addNotification(data) {
    return {
        type: ADD_NOTIFICATION,
        data
    }
}


export function notAuthNotification(msg) {
    return {
        type: NOTIFICATION,
        message: msg,
        error: true
    }
}

export function isAuthNotification(msg) {
    return {
        type: NOTIFICATION,
        message: msg,
        error: false
    }
}

export function removeNotification(status) {
    return {
        type: REMOVE_NOTIFICATION,
        status
    }
}