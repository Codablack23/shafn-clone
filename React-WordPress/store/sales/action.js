export const actionTypes = {
    WP_GET_ONSALE_PRODUCTS: "WP_GET_ONSALE_PRODUCTS",
    WP_GET_ONSALE_PRODUCTS_SUCCESS: "WP_GET_ONSALE_PRODUCTS_SUCCESS",
    WP_TOGGLE_LOADING: "WP_TOGGLE_LOADING",
};

export function WPGetOnSaleProducts(payload) {
    return { type: actionTypes.WP_GET_ONSALE_PRODUCTS, payload };
}

export function WPGetOnSaleProductsSuccess(payload) {
    return {
        type: actionTypes.WP_GET_ONSALE_PRODUCTS_SUCCESS,
        payload,
    };
}

export function WPToggleProductLoading(payload) {
    return {
        type: actionTypes.WP_TOGGLE_LOADING,
        payload,
    };
}
