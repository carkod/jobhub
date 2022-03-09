import { handleResponse, headers, buildBackUrl } from '../utils';

export const GET_RELATIONS = 'GET_RELATIONS';
export const GET_RELATIONS_SUCCESS = 'GET_RELATIONS_SUCCESS';
export const GET_RELATIONS_FAILED = 'GET_RELATIONS_FAILED';

export const DELETE_RELATION = 'DELETE_RELATION';
export const DELETE_RELATION_SUCCESS = 'DELETE_RELATION_SUCCESS';
export const DELETE_RELATION_FAILED = 'DELETE_RELATION_FAILED';

export const ADD_RELATION = 'ADD_RELATION';
export const ADD_RELATION_SUCCESS = 'ADD_RELATION_SUCCESS';
export const ADD_RELATION_FAILED = 'DELETE_RELATION_FAILED';

export const SAVE_RELATION = 'SAVE_RELATION';
export const SAVE_RELATION_SUCCESS = 'SAVE_RELATION_SUCCESS';
export const SAVE_RELATION_FAILED = 'DELETE_RELATION_FAILED';

/**
 * New action creators
 * 2 states instead of three:
 *  - Fetch action directly no state
 *  - Action successful state
 *  - Notification (snackBar) states 
 *  these are listened by the snackBar reducer
 *  and do not have additional ACTIONS
 */

export function getRelations() {
    return {
        type: GET_RELATIONS,
        error: false,
        message: GET_RELATIONS,
    }
}

export function getRelationsSuccess(payload) {
    return {
        type: GET_RELATIONS_SUCCESS,
        error: false,
        message: GET_RELATIONS_SUCCESS,
        payload
    }
}

export function getRelationsFailed(payload) {
    return {
        type: GET_RELATIONS_FAILED,
        error: true,
        message: GET_RELATIONS_FAILED,
        payload
    }
}

export function deleteRelation() {
    return {
        type: DELETE_RELATION,
        error: false,
        message: DELETE_RELATION,
    }
}

export function deleteRelationSuccess(payload) {
    return {
        type: DELETE_RELATION_SUCCESS,
        error: false,
        message: DELETE_RELATION_SUCCESS,
        payload
    }
}

export function deleteRelationFailed(payload) {
    return {
        type: DELETE_RELATION_FAILED,
        error: true,
        message: DELETE_RELATION_FAILED,
        payload
    }
}

export function addRelation() {
    return {
        type: ADD_RELATION,
        error: false,
        message: ADD_RELATION,
    }
}

export function addRelationSuccess(payload) {
    return {
        type: ADD_RELATION_SUCCESS,
        error: false,
        message: ADD_RELATION_SUCCESS,
        payload
    }
}

export function addRelationFailed(payload) {
    return {
        type: ADD_RELATION_FAILED,
        error: true,
        message: ADD_RELATION_FAILED,
        payload
    }
}

export function saveRelation() {
    return {
        type: SAVE_RELATION,
        error: false,
        message: SAVE_RELATION,
    }
}

export function saveRelationSuccess(payload) {
    return {
        type: SAVE_RELATION_SUCCESS,
        error: false,
        message: SAVE_RELATION_SUCCESS,
        payload
    }
}

export function saveRelationFailed(payload) {
    return {
        type: SAVE_RELATION_FAILED,
        error: true,
        message: SAVE_RELATION_FAILED,
        payload
    }
}

export function fetchRelationsApi() {
    return dispatch => {
        dispatch(getRelations())
        return fetch(`${buildBackUrl().apiUrl}/cats`, {
            method: 'get',
            headers: headers
        })
        .then(handleResponse)
        .then(res => dispatch(getRelationsSuccess(res)));
    }
}

export function saveRelationApi(data) {
    return dispatch => {
        dispatch(saveRelation(data))
        return fetch(`${buildBackUrl().apiUrl}/cats`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: headers
        })
        .then(handleResponse)
        .then(data => dispatch(saveRelationSuccess(data)));
    }
}