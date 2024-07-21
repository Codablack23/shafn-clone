import {configureStore} from "@reduxjs/toolkit"
import auth from "./auth"
import app from "./app"
import cart from "./cart"
import compare from "./compare"
import media from "./media"
import post from "./post"
import product from "./product"
import sales from "./sales"
import wishlist from "./wishlist"
import setting from "./setting"
import wp from "./wp"
import collection from "./collection"
import checkoutItems from "./checkout-items"
import recentProducts from "./recently-viewed-products"

const reducer = {
    auth,
    app,
    cart,
    compare,
    media,
    post,
    product,
    sales,
    wishlist,
    setting,
    wp,
    collection,
    recentProducts,
    checkoutItems

}

export const makeStore = ()=>{
    return configureStore({
        reducer,
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']