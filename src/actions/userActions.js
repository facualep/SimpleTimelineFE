import {toggleLogoutModal} from './siteActions';
import cookie from 'react-cookies';
import axios from 'axios';

import {TASKIFY_URL, errors } from './../config';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REFRESH_USER = 'REFRESH_USER';

export const loginUser = (user) => {
  return dispatch => {
    cookie.save('accessToken', user.accessToken, { path: '/' });
    cookie.save('expiration', user.expiration, { path: '/' });
    cookie.save('refreshToken', user.refreshToken, { path: '/' });
    cookie.save('refreshTokenExpiration', user.refreshTokenExpiration, { path: '/' });
    cookie.save('userId', user.id, { path: '/' });
    dispatch(addLoggedUserToStore(user));
  }
}

export const logoutUser = (token) => {
  return dispatch => {
    axios.post(TASKIFY_URL + 'auth/logout', {}, {
      headers: {'Authorization': "bearer " + token}
    }).then(response => {
      cookie.remove('accessToken');
      cookie.remove('refreshToken');
      cookie.remove('expiration');
      cookie.remove('refreshTokenExpiration');
      cookie.remove('id');
      dispatch(removeLoggedUserFromStore());
      dispatch(toggleLogoutModal(false));
    })
  }
}

export const clearUser = () => {
  return dispatch => {
    cookie.remove('accessToken');
    cookie.remove('refreshToken');
    cookie.remove('expiration');
    cookie.remove('refreshTokenExpiration');
    cookie.remove('id');
    dispatch(removeLoggedUserFromStore());
  }
}

export const refreshUser = (id, refresh) => {
  console.log('refreshing!');
  // return dispatch => {
  //   axios.post(TASKIFY_URL + 'auth/refreshlogin', {
  //     'userid': id,
  //     'refreshtoken': refresh
  //   }).then(response => {
  //     user = {

  //     }
  //     cookie.remove('accessToken');
  //     cookie.remove('refreshToken');
  //     cookie.remove('expiration');
  //     cookie.remove('refreshTokenExpiration');
  //     dispatch(removeLoggedUserFromStore());
  //     dispatch(toggleLogoutModal(false));
  //   })
  // }
  return {
    type: REFRESH_USER,
    payload: {loggedIn: false}
  }
}

const addLoggedUserToStore = (user) => {
  return {
    type: LOGIN_USER,
    payload: user
  }
}

const removeLoggedUserFromStore = () => {
  return {
    type: LOGOUT_USER
  }
}

export default loginUser;