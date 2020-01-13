import { LOGIN_USER, LOGOUT_USER, REFRESH_USER } from "../actions/userActions";
import {TOGGLE_LOGOUT_MODAL, CLEAR_LOGOUT_STATE} from '../actions/siteActions';

const initState = {
  hits: []
}

const rootReducer = (state=initState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default rootReducer;