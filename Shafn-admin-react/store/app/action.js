export const actionTypes = {
  TOGGLE_DRAWER_MENU: "TOGGLE_DRAWER_MENU",
  TOGGLE_DRAWER_MENU_SUCCESS: "TOGGLE_DRAWER_MENU_SUCCESS",
  TOGGLE_EARNINGS_VISIBILITY: "TOGGLE_EARNINGS_VISIBILITY",
  TOGGLE_EARNINGS_VISIBILITY_SUCCESS: "TOGGLE_EARNINGS_VISIBILITY_SUCCESS",
};

export function toggleDrawerMenu(payload) {
  return { type: actionTypes.TOGGLE_DRAWER_MENU, payload };
}

export function toggleDrawerMenuSuccess(payload) {
  return { type: actionTypes.TOGGLE_DRAWER_MENU_SUCCESS, payload };
}

export function toggleEarningsVisibility(payload) {
  return { type: actionTypes.TOGGLE_EARNINGS_VISIBILITY, payload };
}

export function toggleEarningsVisibilitySuccess(payload) {
  return { type: actionTypes.TOGGLE_EARNINGS_VISIBILITY_SUCCESS, payload };
}
