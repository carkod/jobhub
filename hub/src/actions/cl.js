/* eslint-disable */
import { handleResponse, headers } from './actions.config';
export const SET_CLS = 'SET_CLS';
export const ADD_CL = 'ADD_CL';
export const CL_FETCHED = 'CL_FETCHED';
export const RETRIEVED_CL = 'RETRIEVED_CL';
export const CL_DELETED = 'CL_DELETED';
export const NOTIFICATION = 'NOTIFICATION';
export const CL_PDF_GENERATED = 'CL_PDF_GENERATED';



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

// Returns saved Cover letter
export function clpdfReady(cl) {
    return {
        type: CL_PDF_GENERATED,
        isFetching: false,
        cl
    }
}


export function pdfGeneratedNotification(data) {
    return {
        type: NOTIFICATION,
        message: data.msg || 'Pdf Generated',
        error: false
    }
}

export function deleteCL(id) {
    return dispatch => {
        return fetch(`${process.env.REACT_APP_API_URL}/cls/${id}`, {
            method: 'delete',
            headers: headers
        })
            .then(handleResponse)
            .then(data => dispatch(CLDeleted(id)));
    }
}

export function copyCL(data) {
    return dispatch => {
        return fetch(`${process.env.REACT_APP_API_URL}/cls/${data._id}`, {
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
        return fetch(`${process.env.REACT_APP_API_URL}/cls`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: headers
        })
            .then(handleResponse)
            .then(data => {
                dispatch(addCL(data))
                dispatch(addNotification(addCL(data), 'Cover letter created'))
            })
    }
}


export function editCL(data) {
    return dispatch => {
        return fetch(`${process.env.REACT_APP_API_URL}/cls`, {
            method: 'put',
            body: JSON.stringify(data),
            headers: headers
        })
            .then(handleResponse)
            .then(data => {
                dispatch(addCL(data))
                dispatch(addNotification(addCL(data), 'Cover letter saved'))
            })
    }
}

export function fetchCLs() {
    return dispatch => {
        fetch(`${process.env.REACT_APP_API_URL}/cls`, {
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
        return fetch(`${process.env.REACT_APP_API_URL}/cl/${id}`, {
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
    return dispatch =>
        fetch(`${process.env.REACT_APP_PDF_URL}/generateCl/${id}`, {
            method: 'GET',
            headers: headers
        })
            .then(handleResponse)
            .then(data => {
                dispatch(clpdfReady(data));
                dispatch(pdfGeneratedNotification(data))
            })

}