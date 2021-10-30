export const actionTypes = {
    ADD_CHECKOUT_ITEM: 'ADD_CHECKOUT_ITEM',
    UPDATE_CHECKOUT_ITEM: 'UPDATE_CHECKOUT_ITEM',
};

export function addCheckoutItem(item) {
    return { type: actionTypes.ADD_CHECKOUT_ITEM, item };
}

export function updateCheckoutItems(payload) {
    return {
        type: actionTypes.UPDATE_CHECKOUT_ITEM,
        payload,
    };
}
