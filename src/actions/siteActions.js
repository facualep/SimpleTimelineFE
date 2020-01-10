export const TOGGLE_LOGOUT_MODAL = 'TOGGLE_LOGOUT_MODAL';
export const CLEAR_LOGOUT_STATE = 'CLEAR_LOGOUT_STATE';

export const toggleLogoutModal = (toggle) => {
  return {
    type: TOGGLE_LOGOUT_MODAL,
    payload: toggle
  }
}