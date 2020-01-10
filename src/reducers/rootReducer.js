import { LOGIN_USER, LOGOUT_USER, REFRESH_USER } from "../actions/userActions";
import {TOGGLE_LOGOUT_MODAL, CLEAR_LOGOUT_STATE} from '../actions/siteActions';

const initState = {
  user: { 
    accessToken: null,
    expiration: null,
    refreshToken: null,
    refreshTokenExpiration: null,
    id: null,
    mail: null,
    name: null,
    image: null,
  },
  tasks: { 
    pending: null
  },
  loggedIn: null,
  siteState: {
    logoutModalOpen: false
  }
}

const rootReducer = (state=initState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
        siteState : {
          ...state.siteState,
        }
      }
    case REFRESH_USER:
      return {
        ...state,
        loggedIn: false
      }
    case TOGGLE_LOGOUT_MODAL:
      return {
        ...state,
        siteState: {
          ...state.siteState,
          logoutModalOpen: action.payload
        }
      }
    case CLEAR_LOGOUT_STATE:
      return {
        ...state,
        siteState: {
          ...state.siteState,
        }
      }
    case LOGOUT_USER:
      return {
        ...state,
        user: {},
        loggedIn: false,
        siteState: {
          ...state.siteState,
        }
      }
    default:
      return state

  }
}

export default rootReducer;