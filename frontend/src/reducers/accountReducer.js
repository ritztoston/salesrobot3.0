import {
    GET_TEMPLATE,
    CLEAR_ERRORS,
    GET_RSS_DATA,
    GET_RSS_FEED_TEMPLATE,
    GET_INDEX_DATA,
    CLEAR_ACCOUNT_DATA
} from '../actions/types';

const initialState = {
    template: [],
    feed_template: [],
    rss: [],
    index: [],
};

export default function(state = initialState, action){
    switch (action.type) {
        case GET_TEMPLATE:
            return {
                ...state,
                template: [...action.payload]
            };
        case GET_RSS_FEED_TEMPLATE:
            return {
                ...state,
                feed_template: [...action.payload]
            };
        case GET_RSS_DATA:
            return {
                ...state,
                rss: [...action.payload]
            };
        case GET_INDEX_DATA:
            return {
                ...state,
                index: [...action.payload]
            };
        case CLEAR_ACCOUNT_DATA:
            return {
                ...state,
                template: [],
                feed_template: [],
                rss: [],
                index: [],
            };
        case CLEAR_ERRORS:
            return {};
        default:
            return state;
    }
}
