export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export function addNotification(status) {
    return {
        type: ADD_NOTIFICATION,
        status
    }
}

export function removeNotification(status) {
    return {
        type: REMOVE_NOTIFICATION,
        status
    }
}