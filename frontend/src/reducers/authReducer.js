import {SET_CURRENT_USER, SET_LOADING_TRUE, SET_LOADING_FALSE, SET_MESSAGE, SET_UNLOAD_MESSAGE} from '../actions/types';
import isEmpty from '../validations/isEmpty';

const initialState = {
    isAuthenticated: false,
    message: '',
    loading: false,
    user: {}
};

export default function(state = initialState, action){
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                loading: false,
                user: action.payload
            };
        case SET_LOADING_TRUE:
            return {
                ...state,
                loading: true
            };
        case SET_LOADING_FALSE:
            return {
                ...state,
                loading: false
            };
        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload
            };
        case SET_UNLOAD_MESSAGE:
            return {
                ...state,
                message: ''
            };
        default:
            return state;
    }
}
