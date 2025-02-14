import { actionTypes } from "./action";

export const initProfile = {
  name: "",
  avatar:null,
  store:null
};

function reducer(state = initProfile, action) {
  switch (action.type) {
    case actionTypes.UPDATE_PROFILE:
      return action.payload;
    default:
      return state;
  }
}

export default reducer;
