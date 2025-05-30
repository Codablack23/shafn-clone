import { combineReducers } from "redux";
import post from "./post/reducer";
import product from "./product/reducer";
import setting from "./setting/reducer";
import cart from "./cart/reducer";
import checkoutItems from "./checkout-items/reducer";
import compare from "./compare/reducer";
import auth from "./auth/reducer";
import wishlist from "./wishlist/reducer";
import collection from "./collection/reducer";
import media from "./media/reducer";
import app from "./app/reducer";
import wp from "./wp/reducer";
import recentlyViewedProducts from "./recently-viewed-products/reducer";
import sales from "./sales/reducer";

export default combineReducers({
    auth,
    post,
    product,
    setting,
    cart,
    checkoutItems,
    compare,
    wishlist,
    collection,
    media,
    app,
    wp,
    recentlyViewedProducts,
    sales,
});
