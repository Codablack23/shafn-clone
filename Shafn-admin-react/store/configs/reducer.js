import { actionTypes } from "./action";

const initParams = {
  IS_EARNINGS_HIDDEN: false,
};

function reducer(state = initParams, action) {
  switch (action.type) {
    case actionTypes.TOGGLE_EARNINGS_VISIBILITY:
      return { IS_EARNINGS_HIDDEN: !state.IS_EARNINGS_HIDDEN };
    default:
      return state;
  }
}
export default reducer;
