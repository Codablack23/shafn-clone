import { all, put, takeEvery } from 'redux-saga/effects';
import { notification } from 'antd';

import { actionTypes, loginSuccess, logOutSuccess } from './action';

const modalSuccess = (type) => {
    notification[type]({
        message: 'Wellcome back',
        description: 'Login Successful!',
    });
};

const modalWarning = (type) => {
    notification[type]({
        message: 'Good bye!',
        description: 'Your account has been logged out!',
    });
};

function* loginSaga(user) {
    try {
        yield put(loginSuccess(user));
        modalSuccess('success');
    } catch (err) {
        console.log(err);
    }
}

function* logOutSaga() {
    try {
        yield put(logOutSuccess());
        modalWarning('warning');
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)]);
    yield all([takeEvery(actionTypes.LOGOUT, logOutSaga)]);
}
