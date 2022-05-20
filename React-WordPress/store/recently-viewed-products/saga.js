import { all, put, takeEvery } from 'redux-saga/effects';
import { polyfill } from 'es6-promise';

import { actionTypes, updateRecentlyViewedProductsSuccess } from './action';
polyfill();

function* addRecentlyViewedProducts({ product }) {
    try {
        let recentlyViewedProducts = JSON.parse(
            JSON.parse(localStorage.getItem('persist:martfury'))
                .recentlyViewedProducts
        );

        recentlyViewedProducts.products =
            recentlyViewedProducts.products.filter(
                (item) => item.id != product.id
            );

        recentlyViewedProducts.products.unshift(product);
        yield put(updateRecentlyViewedProductsSuccess(recentlyViewedProducts));
    } catch (err) {
        console.log(err);
    }
}

export default function* rootSaga() {
    yield all([
        takeEvery(
            actionTypes.ADD_RECENTLY_VIEWED_PRODUCT,
            addRecentlyViewedProducts
        ),
    ]);
}
