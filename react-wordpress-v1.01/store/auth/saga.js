import { all, put, takeEvery } from "redux-saga/effects";
import { notification } from "antd";
import Router from "next/router";

import {
    actionTypes,
    loginSuccess,
    logOutSuccess,
    updateAuthSuccess,
} from "./action";

const modalSuccess = (type) => {
    notification[type]({
        message: "Welcome back",
        description: "Login Successful!",
    });
};

const modalWarning = (type) => {
    notification[type]({
        message: "Good bye!",
        description: "Your account has been logged out!",
    });
    Router.push("/");
};

function* loginSaga(user) {
    try {
        yield put(loginSuccess(user));
        modalSuccess("success");
    } catch (err) {
        console.log(err);
    }
}

function* logOutSaga() {
    try {
        yield put(logOutSuccess());
        modalWarning("warning");
    } catch (err) {
        console.log(err);
    }
}

function* updateAuthSaga(user) {
    try {
        yield put(updateAuthSuccess(user));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)]);
    yield all([takeEvery(actionTypes.LOGOUT, logOutSaga)]);
    yield all([takeEvery(actionTypes.UPDATE_AUTH, updateAuthSaga)]);
}
