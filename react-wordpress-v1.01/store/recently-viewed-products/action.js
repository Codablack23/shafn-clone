export const actionTypes = {
    ADD_RECENTLY_VIEWED_PRODUCT: 'ADD_RECENTLY_VIEWED_PRODUCT',
    UPDATE_RECENTLY_VIEWED_SUCCESS: 'UPDATE_RECENTLY_VIEWED_SUCCESS',
};

export function addRecentlyViewedProduct(product) {
    return { type: actionTypes.ADD_RECENTLY_VIEWED_PRODUCT, product };
}

export function updateRecentlyViewedProductsSuccess(payload) {
    return { type: actionTypes.UPDATE_RECENTLY_VIEWED_SUCCESS, payload };
}
