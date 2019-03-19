import {
    GET_TEMPLATE,
    CLEAR_ERRORS,
    GET_RSS_DATA,
    GET_RSS_FEED_TEMPLATE,
    GET_INDEX_DATA,
    CLEAR_ACCOUNT_DATA, CLEAR_CAMPAIGN_DATA, GET_SENT_DATA, GET_ACTIVE_DATA, GET_DRAFT_DATA
} from '../actions/types';

const initialState = {
    template: [],
    feed_template: [],
    rss: [],
    index: [],
    campaigns: {
        sent: {},
        active: {},
        draft: {},
    },
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
        case GET_SENT_DATA:
            return {
                ...state,
                campaigns: {
                    ...state.campaigns,
                    sent: action.payload,
                },
            };
        case GET_ACTIVE_DATA:
            return {
                ...state,
                campaigns: {
                    ...state.campaigns,
                    active: action.payload,
                },
            };
        case GET_DRAFT_DATA:
            return {
                ...state,
                campaigns: {
                    ...state.campaigns,
                    draft: action.payload,
                },
            };
        case CLEAR_CAMPAIGN_DATA:
            return {
                ...state,
                campaigns: {
                    sent: {},
                    active: {},
                    draft: {},
                },
            };
        case CLEAR_ERRORS:
            return {};
        default:
            return state;
    }
}
