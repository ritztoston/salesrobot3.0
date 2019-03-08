import axios from 'axios';

import {
    GET_ERRORS,
    CLEAR_ERRORS,
    SET_LOADING_TRUE,
    SET_LOADING_FALSE,
    GET_TEMPLATE, GET_RSS_DATA, GET_RSS_FEED_TEMPLATE, GET_INDEX_DATA, CLEAR_ACCOUNT_DATA
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

export const getFeedTemplate = account => dispatch => {

    axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/template/feed/`)
        .then(res => {
            dispatch(renderFeedTemplate(res));
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

export const getRSSData = account => async dispatch => {
    try {
        dispatch(clearAccountData());
        dispatch(setLoadingTrue());
        const res1 = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/template/`);
        const res2 = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/template/feed/`);
        const res3 = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/index/`);
        const res4 = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/data/`);

        dispatch(renderTemplate(res1));
        dispatch(renderFeedTemplate(res2));
        dispatch(renderIndex(res3));
        dispatch(renderData(res4));
        dispatch(setLoadingFalse());

    } catch (err) {
        dispatch(setLoadingFalse());
        dispatch(setError(err))
    }
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

export const renderIndex = (res) => {
    return {
        type: GET_INDEX_DATA,
        payload: res.data
    }
};

export const renderFeedTemplate = (res) => {
    return {
        type: GET_RSS_FEED_TEMPLATE,
        payload: res.data
    }
};

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
};

export const clearAccountData = () => {
    return {
        type: CLEAR_ACCOUNT_DATA
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

