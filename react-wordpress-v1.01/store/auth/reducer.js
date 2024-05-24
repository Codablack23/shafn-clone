import { actionTypes } from "./action";

const initState = {
    isLoggedIn: false,
};

function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return { ...action.payload.user, isLoggedIn: true };
        case actionTypes.UPDATE_AUTH_SUCCESS:
            return { ...state, ...action.payload.user };
        case actionTypes.LOGOUT_SUCCESS:
            return initState;

        default:
            return state;
    }
}

export default reducer;
