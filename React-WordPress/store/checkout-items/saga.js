import { all, put, takeEvery } from 'redux-saga/effects';
import { actionTypes, updateCheckoutItems } from './action';

function* addItemSaga(payload) {
    const item = {
        checkoutItems: payload.item.cartItems,
        amount: payload.item.amount,
        total: payload.item.cartTotal,
    };
    yield put(updateCheckoutItems(item));
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.ADD_CHECKOUT_ITEM, addItemSaga)]);
}
