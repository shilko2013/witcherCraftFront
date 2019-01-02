import {combineReducers, createStore} from 'redux';
import {getReducer} from "./api/AuthService";

export let store = createStore(combineReducers({
    auth: getReducer
}));