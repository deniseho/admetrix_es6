import * as types from './actionTypes';

export function loginSuccess(isLoggedIn) {
  return { type: types.LOGIN_SUCCESS, isLoggedIn};
}

export function loginFail(isLoggedIn) {
  return {type: types.LOGIN_FAILURE, isLoggedIn};
}
