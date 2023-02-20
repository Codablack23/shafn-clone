import { combineReducers } from "redux";

import auth from "./auth/reducer";
import app from "./app/reducer";
import configs from "./configs/reducer";
import profile from "./profile/reducer";

export default combineReducers({
  auth,
  app,
  configs,
  profile,
});
