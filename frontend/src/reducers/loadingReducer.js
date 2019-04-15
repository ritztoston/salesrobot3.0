import {SET_G_LOADING_TRUE, SET_G_LOADING_FALSE} from '../actions/types';

const initialState = {
    loading: false,
    message: '',
};

export default function(state = initialState, action){
    switch (action.type) {
        case SET_G_LOADING_TRUE:
            return {
                loading: action.payload.loading,
                message: action.payload.message
            };
        case SET_G_LOADING_FALSE:
            return {
                loading: action.payload.loading,
                message: action.payload.message
            };
        default:
            return state;
    }
}
