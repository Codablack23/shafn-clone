import { all, put, takeEvery } from 'redux-saga/effects';
import { actionTypes, updateCheckoutItems } from './action';

function* addItemSaga(payload) {
    yield put(updateCheckoutItems(payload.item));
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.ADD_CHECKOUT_ITEM, addItemSaga)]);
}
