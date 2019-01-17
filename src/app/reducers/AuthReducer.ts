import {AUTH_LOGIN,AUTH_LOGOUT} from "../actions/AuthActions";

export function authReducer(state = {role: ""}, action: any) {
    console.log(action);
    switch (action.type) {
        case AUTH_LOGIN:
                    return {
                        ...state,
                        role: action.role,
                        error: ''
                    };
        case AUTH_LOGOUT:
            return {
                ...state,
                role: '',
                error: action.error
            };
        default: return state;
    }
}