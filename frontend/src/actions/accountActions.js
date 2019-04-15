import axios from 'axios';

import {
    GET_ERRORS,
    CLEAR_ERRORS,
    SET_LOADING_TRUE,
    SET_LOADING_FALSE,
    GET_TEMPLATE,
    GET_RSS_DATA,
    GET_RSS_FEED_TEMPLATE,
    GET_INDEX_DATA,
    CLEAR_ACCOUNT_DATA,
    CLEAR_CAMPAIGN_DATA,
    GET_SENT_DATA, GET_ACTIVE_DATA, GET_DRAFT_DATA, SET_MESSAGE_SENT, SET_CAMPAIGN_DETAIL_VIEW, SET_G_LOADING_TRUE,
} from './types';
import XMLParser from "react-xml-parser";
import Parser from 'xml2js';


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

export const getCampaignData = account => async dispatch => {
    try {
        dispatch(clearCampaignData());
        dispatch(setLoadingTrue());
        const res1 = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/campaigns/sent/?page_size=5`);
        const res2 = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/campaigns/active/?page_size=5`);
        const res3 = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/campaigns/draft/?page_size=5`);

        dispatch(renderSent(res1));
        dispatch(renderActive(res2));
        dispatch(renderDraft(res3));
        dispatch(setLoadingFalse());

    } catch (err) {
        dispatch(setLoadingFalse());
        dispatch(setError(err))
    }
};

export const getDeleteNewCampaignData = (account, id) => async dispatch => {
    try {
        dispatch(clearCampaignData());
        dispatch(clearAccountData());
        dispatch(setLoadingTrue());
        dispatch(setGLoadingTrue('Fetching campaign, loading...'));
        const res1 = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/campaigns/rss/views/${id}/`);
        const res2 = await axios.get(`https://cors-anywhere.herokuapp.com/${res1.data[0].data}`);
        dispatch(setGLoadingTrue('Reading RSS feed, loading...'));

        let feeds = [];
        await Parser.parseString(res2.data, (err, result) => feeds = result.rss.channel[0].item);

        dispatch(setGLoadingTrue('Please wait, loading...'));
        await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/campaigns/rss/feed/delete/${id}/`);
        dispatch(setGLoadingTrue('Retrieving new contents, loading...'));
        await axios.put(`http://www.analyticsapi.salesrobot.com/${account}/campaigns/rss/feed/add/${id}/`, feeds);
        dispatch(setGLoadingTrue('Retrieving template, loading...'));
        const res3 = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/template/${id}`);
        const res4 = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/template/feed/${id}`);
        dispatch(setGLoadingTrue('Loaded, Please wait...'));
        const res5 = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/index/${id}`);
        const res6 = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/data/${id}`);

        dispatch(renderTemplate(res3));
        dispatch(renderFeedTemplate(res4));
        dispatch(renderIndex(res5));
        dispatch(renderData(res6));

        dispatch(setGLoadingFalse());
        dispatch(setLoadingFalse());
    } catch (err) {
        dispatch(setLoadingFalse());
        dispatch(setError(err))
    }
};

export const getPreviewCampaignData = (account, id) => async dispatch => {
    try {
        dispatch(clearCampaignData());
        dispatch(clearAccountData());

        dispatch(setLoadingTrue());
        dispatch(setGLoadingTrue('Retrieving template, loading...'));
        const res3 = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/template/${id}`);
        const res4 = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/template/feed/${id}`);
        dispatch(setGLoadingTrue('Loaded, Please wait...'));
        const res5 = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/index/${id}`);
        const res6 = await axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/rss/item/data/${id}`);

        dispatch(renderTemplate(res3));
        dispatch(renderFeedTemplate(res4));
        dispatch(renderIndex(res5));
        dispatch(renderData(res6));

        dispatch(setGLoadingFalse());
        dispatch(setLoadingFalse());
    } catch (err) {
        dispatch(setLoadingFalse());
        dispatch(setError(err))
    }
};

export const messageNextPage = (account, type, page) => dispatch => {
    dispatch(setLoadingTrue());
    axios.get(`http://www.analyticsapi.salesrobot.com/${account}/campaigns/${type}/`, {params: {page_size: 5, page}})
        .then(res => {
            if(type === 'sent')
                dispatch(getSentNextPage(res));
            dispatch(setLoadingFalse());
        })
        .catch(err => {
            dispatch(setLoadingFalse());
            dispatch(setError(err))
        })
};

export const getCampaignDetailView = (account, id) => dispatch => {
    dispatch(setLoadingTrue());
    axios.get(`http://www.analyticsapi.salesrobot.com/${account}/campaigns/view/${id}`)
        .then(res => {
            dispatch(setCampaignDetailView(res));
            dispatch(setLoadingFalse());
        })
        .catch(err => {
            dispatch(setError(err));
            dispatch(setLoadingFalse());
        })
};

export const getMessageSent = (account, id) => dispatch => {
    axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/update/sent/${id}`)
        .then(res => {
            dispatch(setMessageSent(res));
        })
        .catch(err => {
            dispatch(setError(err))
        })
};

export const getMessageSubmitted = (account, id) => dispatch => {
    axios.get(`http://www.analyticsapi.salesrobot.com/${account}/messages/update/submitted/${id}`)
        .then(res => {
            dispatch(setMessageSent(res));
        })
        .catch(err => {
            dispatch(setError(err))
        })
};

export const renderTemplate = (res) => {
    return {
        type: GET_TEMPLATE,
        payload: res.data
    }
};

export const getSentNextPage = (res) => {
    return {
        type: GET_SENT_DATA,
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

export const clearCampaignData = () => {
    return {
        type: CLEAR_CAMPAIGN_DATA
    }
};

export const setLoadingTrue = () => {
    return {
        type: SET_LOADING_TRUE
    }
};

export const setGLoadingTrue = message => {
    const payload = {
      loading: true,
      message
    };

    return {
        type: SET_G_LOADING_TRUE,
        payload
    }
};

export const setGLoadingFalse = () => {
    const payload = {
        loading: false,
        message: ''
    };

    return {
        type: SET_G_LOADING_TRUE,
        payload
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

export const renderSent = (res) => {
    return {
        type: GET_SENT_DATA,
        payload: res.data
    }
};

export const renderActive = (res) => {
    return {
        type: GET_ACTIVE_DATA,
        payload: res.data
    }
};

export const renderDraft = (res) => {
    return {
        type: GET_DRAFT_DATA,
        payload: res.data
    }
};

export const setMessageSent = res => {
    return {
        type: SET_MESSAGE_SENT,
        payload: res.data
    }
};

export const setCampaignDetailView = res => {
    return {
        type: SET_CAMPAIGN_DETAIL_VIEW,
        payload: res.data[0]
    }
};

