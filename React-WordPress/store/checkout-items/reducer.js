import { actionTypes } from './action';

export const initItems = {
    checkoutItems: [],
    amount: 0,
    total: 0,
};

function reducer(state = initItems, action) {
    switch (action.type) {
        case actionTypes.UPDATE_CHECKOUT_ITEM:
            return action.payload;
        default:
            return state;
    }
}

export default reducer;
