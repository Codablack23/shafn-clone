import { all, put, takeEvery } from "redux-saga/effects";

import {
  actionTypes,
  toggleDrawerMenuSuccess,
  toggleEarningsVisibilitySuccess,
} from "./action";

function* toggleDrawerMenuSaga({ payload }) {
  try {
    yield put(toggleDrawerMenuSuccess(payload));
  } catch (err) {
    console.error(err);
  }
}

function* toggleEarningsVisibilitySaga({ payload }) {
  try {
    yield put(toggleEarningsVisibilitySuccess(payload));
  } catch (err) {
    console.error(err);
  }
}

export default function* rootSaga() {
  yield all([takeEvery(actionTypes.TOGGLE_DRAWER_MENU, toggleDrawerMenuSaga)]);
  yield all([
    takeEvery(
      actionTypes.TOGGLE_EARNINGS_VISIBILITY,
      toggleEarningsVisibilitySaga
    ),
  ]);
}
