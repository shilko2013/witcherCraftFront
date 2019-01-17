import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {combineReducers, createStore} from "redux";
import {authReducer} from './app/reducers/AuthReducer';
import {interfaceReducer} from "./app/reducers/InterfaceReducer";
import {BrowserRouter} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import axios from 'axios';
import {logout} from "./app/actions/AuthActions";

const store = createStore(combineReducers({
    auth: authReducer,
    interface: interfaceReducer
}));

store.subscribe(() => {
    console.log(store.getState());
});

export const history = createHistory();

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/witcher_war_exploded',
    timeout: 2000
});

axios.interceptors.response.use(response => {
    return response;
}, error => {
    console.log(store.getState());
    if (store.getState().auth.role !== '' && error.response.status === 401) {
        store.dispatch(logout('Сессия недействительна, пожалуйста, повторите вход'));
    }
    return error;
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
