import { actionTypes } from './action';

export const initialState = {
    products: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.UPDATE_RECENTLY_VIEWED_SUCCESS:
            return {
                products: action.payload.products,
            };
        default:
            return state;
    }
}

export default reducer;
