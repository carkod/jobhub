/* eslint-disable */
import { API_URL, handleResponse, PDF_URL, headers } from './actions.config';
export const SET_CLS = 'SET_CLS';
export const ADD_CL = 'ADD_CL';
export const CL_FETCHED = 'CL_FETCHED';
export const RETRIEVED_CL = 'RETRIEVED_CL';
export const CL_DELETED = 'CL_DELETED';
export const NOTIFICATION = 'NOTIFICATION';
export const PDF_GENERATED = 'PDF_GENERATED';


export function pdfGenerated(status) {
    return {
        type: PDF_GENERATED,
        status
    }
}

export function addNotification(status) {
    return {
        type: NOTIFICATION,
        status
    }
}

export function setCLs(CLs) {
    return {
        type: SET_CLS,
        CLs
    }
}

export function CLDeleted(letter) {
    return {
        type: CL_DELETED,
        letter
    }
}


export function CLFetched(letter) {
    return {
        type: CL_FETCHED,
        letter
    }
}


export function addCL(data) {
    return {
        type: ADD_CL,
        data
    }
}

export function deletedCL(id) {
    return {
        type: CL_DELETED,
        id
    }
}

export function retrievedCL(data) {
    return {
        type: RETRIEVED_CL,
        data
    }
}

export function CLPasted(data) {
    return {
        type: RETRIEVED_CL,
        data
    }
}

export function deleteCL(id) {
    return dispatch => {
        return fetch(`${API_URL}/cls/${id}`, {
            method: 'delete',
            headers: headers
        })
            .then(handleResponse)
            .then(data => dispatch(CLDeleted(id)));
    }
}

export function copyCL(data) {
    return dispatch => {
        return fetch(`${API_URL}/cls/${data._id}`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: headers
        })
            .then(handleResponse)
            .then(data => dispatch(CLPasted(data.CL)));
    }

}

export function saveCL(data) {
    return dispatch => {
        return fetch(`${API_URL}/cls`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: headers
        }).then(handleResponse)
            .then(data => {
                dispatch(addCL(data))
                dispatch(addNotification(addCL(data)))
            })
    }
}

export function fetchCLs() {
    return dispatch => {
        fetch(`${API_URL}/cls`, {
            headers: headers
        })
            .then(handleResponse)
            .then(data => {
                dispatch(setCLs(data))
                dispatch(addNotification(setCLs(data)));
            })
    }
}

export function fetchCL(id) {
    return dispatch => {
        return fetch(`${API_URL}/cl/${id}`, {
            headers: headers
        })
            .then(handleResponse)
            .then(data => {
                dispatch(setCLs(data))
                dispatch(addNotification(setCLs(data)));
            })
    }
}

export function generatePDF(id) {
    return fetch(`${PDF_URL}/generateCl/${id}`, {
        method: 'GET',
        headers: headers
    })
        .then(handleResponse)

}