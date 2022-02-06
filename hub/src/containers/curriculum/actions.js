import axios from 'axios';
import { handleResponse, buildBackUrl } from '../../actions/actions.config';

export const SET_CATS = 'SET_CATS';

export function setCats(cats) {
    return {
        type: SET_CATS,
        cats,
    }
}


export function fetchCats() {
    return dispatch => {
        axios.get(`${buildBackUrl().apiUrl}/cats`)
            .then(res => {
                handleResponse(res)
                dispatch(setCats(res.data))
            });
    }
}
