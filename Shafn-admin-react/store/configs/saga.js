import { all, put, takeEvery } from "redux-saga/effects";
import { actionTypes, toggleEarningsvisibility } from "./action";

function* toggleEarningsvisibilitySaga() {
  yield put(toggleEarningsvisibility());
}

export default function* rootSaga() {
  yield all([
    takeEvery(
      actionTypes.TOGGLE_EARNINGS_VISIBILITY,
      toggleEarningsvisibilitySaga
    ),
  ]);
}
