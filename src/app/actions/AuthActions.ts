export enum AuthActions {
    AUTH_LOGIN
}

export function login(role: any, error = '') {
    return {
        type: AuthActions.AUTH_LOGIN,
        error: error,
        role: role
    }
}

export default AuthActions;