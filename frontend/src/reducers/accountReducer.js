import {GET_TEMPLATE, CLEAR_ERRORS, GET_RSS_DATA, GET_RSS_ITEMS} from '../actions/types';

const initialState = {
    template: [],
    rss: []
};

export default function(state = initialState, action){
    switch (action.type) {
        case GET_TEMPLATE:
            return {
                ...state,
                template: [...action.payload]
            };
        case GET_RSS_DATA:
            return {
                ...state,
                rss: [...action.payload]
            };
        case CLEAR_ERRORS:
            return {};
        default:
            return state;
    }
}
