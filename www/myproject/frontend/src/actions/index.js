import axios from 'axios';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import {
    FETCH_MESSAGE,
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR
} from './types';

const ROOT_URL = 'http://172.28.128.10';

axios.interceptors.request.use(function (request) {
    // Do something before request is sent
    const token = localStorage.getItem('token');
    if(token) {
        request.headers = {...request.headers, Authorization: 'Bearer ' + token  };
    }
    return request;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export function signupUser({ name, email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/api/signup`, {name, email, password})
            .then(response => {
                dispatch({ type: AUTH_USER });

                localStorage.setItem('token', response.data.access_token);

                browserHistory.push('/feature');
            })
            .catch((error) =>  {
                const { data } = error.response;

                dispatch(authError(data));
            });
    }
}

export function signinUser({ email, password }) {
    return function(dispatch) {
        // Submit email/password
        axios.post(`${ROOT_URL}/api/signin`, { email, password })
            .then(response => {
                // If request is good...
                // - Upadate state to indicate user is authenticated
                dispatch({ type: AUTH_USER });
                // - Save the Token
                localStorage.setItem('token', response.data.access_token);
                // redirect to the route '/feature'
                browserHistory.push('/feature');
            })
            .catch((error) => {
                // If request is bad...
                // - Show an error to the user
                dispatch(authError('Bad Login Info'));
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function authenticateUser() {
    return (dispatch) => {
        dispatch({ type: AUTH_USER });
    }
}

export function signoutUser() {
    localStorage.removeItem('token');

    return { type: UNAUTH_USER }
}

export function fetchUser() {
    const request = axios.get(`${ROOT_URL}/test`);

    return {
        type: FETCH_USER,
        payload: request
    }
}

export function fetchMessage() {
    return function (dispatch) {
        axios.get(`${ROOT_URL}/api`)
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.user
                })
            });
    }
}
