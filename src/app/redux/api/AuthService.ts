import {store} from "../storeManager";
import axios from "axios";

export enum AuthActions {
    AUTH_LOGIN,
    AUTH_REGISTER
}

export function isAdmin() {
    // @ts-ignore
    return store.getState().role === "USER_STATUS_ADMIN";
}

export function isEditor() {
    // @ts-ignore
    return store.getState().role === "USER_STATUS_ADMIN"
        // @ts-ignore
        || store.getState().role === "USER_STATUS_EDITOR";
}

export function isReader() {
    // @ts-ignore
    return store.getState().role === "USER_STATUS_ADMIN"
        // @ts-ignore
        || store.getState().role === "USER_STATUS_EDITOR"
        // @ts-ignore
        || store.getState().role === "USER_STATUS_READER";
}

function login(username: any, password: any) {
    let params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    return axios.post('http://localhost:8080/witcher_war_exploded/login', params, {
        withCredentials: true,
        responseType: 'text'
    });
}

function register(username: any, password: any, email: any) {
    let params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    params.append('email', email);

    return axios.post('http://localhost:8080/witcher_war_exploded/registration', params, {
        withCredentials: true,
        responseType: 'text'
    });
}

async function reducer(state = {role: "", error: ""}, action: any) {
    switch (action.type) {
        case AuthActions.AUTH_LOGIN:
            try {
                const response = await login(action.username, action.password);
                if (response.status == 401)
                    return {
                        ...state,
                        error: 'Неверный логин или пароль, повторите ввод!'
                    };
                else return {
                    ...state,
                    role: response.headers.Role
                };
            } catch (error) {
                return {
                    ...state,
                    error: 'Не удалось выполнить запрос!'
                };
            }
        case AuthActions.AUTH_REGISTER:
            try {
                const response = await register(action.usename, action.password, action.email);
                return {
                    ...state,
                    error: response.data
                }
            } catch (error) {
                return {
                    ...state,
                    error: 'Не удалось выполнить запрос!'
                };
            }
    }
}

export function getReducer() {
    return reducer;
}