import AuthActions from "../actions/AuthActions";

export function authReducer(state = {role: ""}, action: any) {
    console.log(action);
    switch (action.type) {
        case AuthActions.AUTH_LOGIN:
                    return {
                        ...state,
                        role: action.role
                    };
        default: return state;
    }
}