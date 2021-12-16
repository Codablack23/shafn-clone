import { all, put, takeEvery } from "redux-saga/effects";
import { actionTypes, updateProfile } from "./action";

function* addProfileSaga(profile) {
  yield put(updateProfile(profile.payload));
}

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.ADD_PROFILE, addProfileSaga)]);
}
