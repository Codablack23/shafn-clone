import { actionTypes } from "./action";

const initState = {
    user_id: "",
    user_email: "",
    isLoggedIn: false,
};

function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS:
            return { ...action.payload.user, isLoggedIn: true };
        case actionTypes.LOGOUT_SUCCESS:
            return initState;
        default:
            return state;
    }
}

export default reducer;
