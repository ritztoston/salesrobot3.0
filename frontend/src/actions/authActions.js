import axios from 'axios';
import Cookies from 'universal-cookie';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import isEmpty from '../validations/isEmpty'

import {
    GET_ERRORS,
    SET_CURRENT_USER,
    CLEAR_ERRORS,
    SET_LOADING_TRUE,
    SET_LOADING_FALSE,
    SET_MESSAGE,
    SET_UNLOAD_MESSAGE,
    GET_VERIFICATION_PAYLOAD,
    GET_USERS,
    CLEAR_USERS
} from './types';

export const registerUser = (userData, history) => dispatch => {
    const user = new FormData();

    if(userData.avatar !== '' && userData.avatar !== null && typeof userData.avatar !== "undefined") {
        user.append('avatar', userData.avatar, userData.avatar.name);
    }

    user.append('email', userData.email);
    user.append('username', userData.username);
    user.append('firstname', userData.firstname);
    user.append('lastname', userData.lastname);
    user.append('password', userData.password);
    user.append('password2', userData.password2);

    axios.post('/api/auth/register/', user)
        .then(() => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

export const loginUser = (userData, errors) => dispatch => {
    dispatch(setLoadingTrue());

    if(Object.keys(errors).length > 0) {
        dispatch(clearErrors());
    }
    axios.post('http://www.analyticsapi.salesrobot.com/api/auth/login/', userData)
        .then(res => {

            const {token} = res.data;

            const cookies = new Cookies();
            cookies.set('sra_token', token, { path: '/' });

            setAuthToken(token);

            const decoded = jwt_decode(token);

            dispatch(setCurrentUser(decoded));
        })
        .catch(err => {
            dispatch(setLoadingFalse());
            dispatch(setError(err))
        })
};

export const forgotPassword = (userData, errors, history, message) => dispatch => {
    dispatch(setLoadingTrue());

    if(Object.keys(errors).length > 0) {
        dispatch(clearErrors());
    }
    axios.put('http://www.analyticsapi.salesrobot.com/api/auth/forgot_password/', userData)
        .then(() => {
            history.push('/login');
            dispatch(setLoadingFalse());
            if(!isEmpty(message)) {
                dispatch(setMessage(message))
            }
        })
        .catch(err => {
            dispatch(setLoadingFalse());
            dispatch(setError(err))
        })
};

export const forgotPasswordChecker = (username, verify_pin) => dispatch => {
    dispatch(setLoadingTrue());

    axios.get(`http://www.analyticsapi.salesrobot.com/api/auth/forgot-password/${username}/${verify_pin}/`)
        .then(res => {
            dispatch(setLoadingFalse());
            dispatch(getVerifyPayload(res))
        })
        .catch(err => {
            dispatch(setLoadingFalse());
            dispatch(setError(err))
        })
};

export const forgotPasswordCP = (username, verify_pin, payload, errors, history, message) => dispatch => {
    dispatch(setLoadingTrue());
    if(Object.keys(errors).length > 0) {
        dispatch(clearErrors());
    }
    axios.put(`http://www.analyticsapi.salesrobot.com/api/auth/forgot-password/${username}/${verify_pin}/`, payload)
        .then(() => {
            dispatch(setLoadingFalse());
            if(!isEmpty(message)) {
                dispatch(setMessage(message))
            }
            history.push('/login')
        })
        .catch(err => {
            dispatch(setLoadingFalse());
            dispatch(setError(err))
        })
};

export const editUser = (userData, message, errors, id, history) => dispatch => {
    const newEditUser = new FormData();
    dispatch(setLoadingTrue());

    if(Object.keys(errors).length > 0) {
        dispatch(clearErrors());
    }

    if(Object.keys(userData).length > 0) {
        newEditUser.append('email', userData.email);
        newEditUser.append('username', userData.username);
        newEditUser.append('firstname', userData.firstname);
        newEditUser.append('lastname', userData.lastname);
        newEditUser.append('avatar', userData.avatar);
    }

    axios.put(`http://www.analyticsapi.salesrobot.com/api/users/${id}/`, newEditUser)
        .then(res => {
            const {token} = res.data;
            const cookies = new Cookies();
            cookies.set('sra_token', token, { path: '/' });

            setAuthToken(token);

            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            if(!isEmpty(message)) {
                dispatch(setMessage(message))
            }
            history.push('/dashboard')
        })
        .catch(err => {
            dispatch(setLoadingFalse());
            dispatch(setError(err))
        })
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
};

export const logoutUser = (message, users) => dispatch => {
    const cookie = new Cookies();
    cookie.remove('sra_token', { path: '/' });
    setAuthToken(false);
    if(!isEmpty(message)) {
        dispatch(setMessage(message))
    }
    try {
        if(!users === undefined || !users.length < 1)
            dispatch(clearUsers())
    } catch(e) {
        if(!users === undefined)
            dispatch(clearUsers())
    }


    dispatch(setCurrentUser({}));
};

export const userList = () => dispatch => {
    dispatch(setLoadingTrue());

    axios.get('http://www.analyticsapi.salesrobot.com/api/users/')
        .then(res => {
            dispatch(setLoadingFalse());
            dispatch(getUsers(res))
        })
        .catch(err => {
            dispatch(setLoadingFalse());
            dispatch(setError(err))
        })
};

export const getUsers = (res) => {
    return {
        type: GET_USERS,
        payload: res.data
    }
};

export const setLoadingTrue = () => {
    return {
        type: SET_LOADING_TRUE
    }
};

export const setLoadingFalse = () => {
    return {
        type: SET_LOADING_FALSE
    }
};

export const getVerifyPayload = res => {
    return {
        type: GET_VERIFICATION_PAYLOAD,
        payload: res.data[0]
    }
};

export const setError = err => {
    return {
        type: GET_ERRORS,
        payload: err.response.data
    }
};

export const setMessage = message => {
    return {
        type: SET_MESSAGE,
        payload: message
    }
};

export const unloadMessage = () => {
    return {
        type: SET_UNLOAD_MESSAGE
    }
};

export const clearUsers = () => {
    return {
        type: CLEAR_USERS
    }
};
