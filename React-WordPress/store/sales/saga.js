import { all, put, call, takeEvery } from "redux-saga/effects";
import { polyfill } from "es6-promise";
import {
    actionTypes,
    WPGetOnSaleProductsSuccess,
    WPToggleProductLoading,
} from "./action";
import WPProductRepository from "@/repositories/WP/WPProductRepository";

polyfill();

function* WPGetOnSaleProductsSaga({ payload }) {
    try {
        yield put(WPToggleProductLoading(true));
        const data = yield call(WPProductRepository.getOnSaleProducts, payload);
        yield put(WPGetOnSaleProductsSuccess(data));
        yield put(WPToggleProductLoading(false));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(actionTypes.WP_GET_ONSALE_PRODUCTS, WPGetOnSaleProductsSaga),
    ]);
}
