import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from "./errorReducer";
import accountReducer from "./accountReducer";
import loadingReducer from "./loadingReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    accounts: accountReducer,
    loading: loadingReducer,
});