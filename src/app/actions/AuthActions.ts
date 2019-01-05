export enum AuthActions {
    AUTH_LOGIN,
    AUTH_LOGOUT
}

export function login(role: any, error = '') {
    return {
        type: AuthActions.AUTH_LOGIN,
        error: error,
        role: role
    }
}

export function logout() {
    return {
        type: AuthActions.AUTH_LOGOUT
    }
}

export default AuthActions;