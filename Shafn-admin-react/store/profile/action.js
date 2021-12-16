export const actionTypes = {
  ADD_PROFILE: "ADD_PROFILE",
  UPDATE_PROFILE: "UPDATE_PROFILE",
};

export function addProfile(payload) {
  return { type: actionTypes.ADD_PROFILE, payload };
}

export function updateProfile(payload) {
  return {
    type: actionTypes.UPDATE_PROFILE,
    payload,
  };
}
