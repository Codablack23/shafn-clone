import { actionTypes } from "./action";

export const initialState = {
  isDrawerMenu: false,
  isEarningsHidden: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TOGGLE_DRAWER_MENU_SUCCESS:
      return {
        ...state,
        isDrawerMenu: action.payload,
      };
    case actionTypes.TOGGLE_EARNINGS_VISIBILITY_SUCCESS:
      return {
        ...state,
        isEarningsHidden: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
