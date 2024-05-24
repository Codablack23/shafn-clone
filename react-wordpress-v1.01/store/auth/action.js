export const actionTypes = {
    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGOUT: "LOGOUT",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
    CHECK_AUTHORIZATION: "CHECK_AUTHORIZATION",
    UPDATE_AUTH: "UPDATE_AUTH",
    UPDATE_AUTH_SUCCESS: "UPDATE_AUTH_SUCCESS",
};

export function login(user) {
    return { type: actionTypes.LOGIN_REQUEST, user };
}

export function loginSuccess(payload) {
    return { type: actionTypes.LOGIN_SUCCESS, payload };
}

export function logOut() {
    return { type: actionTypes.LOGOUT };
}

export function logOutSuccess() {
    return { type: actionTypes.LOGOUT_SUCCESS };
}

export function updateAuth(user) {
    return { type: actionTypes.UPDATE_AUTH, user };
}

export function updateAuthSuccess(payload) {
    return { type: actionTypes.UPDATE_AUTH_SUCCESS, payload };
}
