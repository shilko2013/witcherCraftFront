import {AUTH_LOGIN,AUTH_LOGOUT} from "../actions/AuthActions";

export function authReducer(state = {role: ""}, action: any) {
    console.log(action);
    switch (action.type) {
        case AUTH_LOGIN:
                    return {
                        ...state,
                        role: action.role
                    };
        case AUTH_LOGOUT:
            return {
                ...state,
                role: ''
            };
        default: return state;
    }
}