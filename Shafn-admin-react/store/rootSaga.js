import { all } from "redux-saga/effects";
import AppSaga from "./app/saga";
import AuthSaga from "./auth/saga";
import ProfileSaga from "./profile/saga";

export default function* rootSaga() {
  yield all([AppSaga(), AuthSaga(), ProfileSaga()]);
}
