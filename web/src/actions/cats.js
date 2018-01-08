/* eslint-disable */
import API_URL from './dev';
import axios from 'axios';

export function fetchCats() {
    return axios.get(`${API_URL}/cats`).catch((error) => {
    console.log(error);
    });
}