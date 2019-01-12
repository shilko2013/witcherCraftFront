export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export function login(role: any, error = '') {
    return {
        type: AUTH_LOGIN,
        error: error,
        role: role
    }
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    }
}