import { all } from "redux-saga/effects";
import PostSaga from "./post/saga";
import ProductSaga from "./product/saga";
import SettingSaga from "./setting/saga";
import CartSaga from "./cart/saga";
import CheckoutSaga from "./checkout-items/saga";
import AuthSaga from "./auth/saga";
import CompareSaga from "./compare/saga";
import WishlistSaga from "./wishlist/saga";
import CollectionSaga from "./collection/saga";
import MediaSaga from "./media/saga";
import AppSaga from "./app/saga";
import WPSaga from "./wp/saga";
import RecentlyViewedProducts from "./recently-viewed-products/saga";
import SalesSaga from "./sales/saga";

export default function* rootSaga() {
    yield all([
        PostSaga(),
        ProductSaga(),
        SettingSaga(),
        CartSaga(),
        CheckoutSaga(),
        AuthSaga(),
        CompareSaga(),
        WishlistSaga(),
        CollectionSaga(),
        MediaSaga(),
        AppSaga(),
        WPSaga(),
        RecentlyViewedProducts(),
        SalesSaga(),
    ]);
}
