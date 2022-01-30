export const NOTIFICATION = 'NOTIFICATION';
export const REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION';

export function addNotification(data, msg) {
    return {
        type: NOTIFICATION,
        error: false,
        message: msg,
        data
    }
}


export function setCVNotification(data) {

    return {
        type: NOTIFICATION,
        error: false,
        message: 'CV was loaded',
        data
    }
}

export function savedNotification(data) {
    if (data.cvs) {
        return {
            type: NOTIFICATION,
            error: false,
            message: 'Saved successfully!',
            data
        }
    } else {
        return {
            type: NOTIFICATION,
            error: true,
            message: 'Not saved!',
            data
        }
    }

}

export function pdfGeneratedNotification(data) {
    return {
        type: NOTIFICATION,
        message: data.msg || 'Pdf Generated',
        error: false
    }
}

export function notAuthNotification(msg) {
    return {
        type: NOTIFICATION,
        message: msg,
        error: true
    }
}

export function isAuthNotification(msg, err) {
    return {
        type: NOTIFICATION,
        message: msg,
        error: err
    }
}


export function removeNotification(status) {
    return {
        type: REMOVE_NOTIFICATION,
        status
    }
}