import axios from 'axios';
import XMLParser from 'react-xml-parser';

import {
    GET_ERRORS,
    CLEAR_ERRORS,
    SET_LOADING_TRUE,
    SET_LOADING_FALSE,
    GET_TEMPLATE, GET_RSS_DATA, GET_RSS_ITEMS
} from './types';

export const getTemplate = account => dispatch => {
    dispatch(setLoadingTrue());

    axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/template/`)
        .then(res => {
            dispatch(renderTemplate(res));
        })
        .catch(err => {
            dispatch(setLoadingFalse());
            dispatch(setError(err))
        })
};

export const getRss = account => dispatch => {

    axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/data/`)
        .then(res => {
            dispatch(renderData(res));
            dispatch(setLoadingFalse());
        })
        .catch(err => {
            dispatch(setLoadingFalse());
            dispatch(setError(err))
        })
};

export const renderTemplate = (res) => {
    return {
        type: GET_TEMPLATE,
        payload: res.data
    }
};

export const renderData = (res) => {
    return {
        type: GET_RSS_DATA,
        payload: res.data
    }
};

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
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

export const setError = err => {
    return {
        type: GET_ERRORS,
        payload: err.response.data
    }
};

