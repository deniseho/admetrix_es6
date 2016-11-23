import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loginSuccess(isLoggedIn) {
  return { type: types.LOGIN_SUCCESS, isLoggedIn};
}

export function loginFail(isLoggedIn) {
  return {type: types.LOGIN_FAILURE, isLoggedIn};
}

// export function login() {
//   return function(dispatch) {
//     dispatch(beginAjaxCall());
//     return courseApi.getAllCourses().then(isLoggedIn => {
//       dispatch(loginSuccess(isLoggedIn));
//     }).catch(error => {
//       throw(error);
//     });
//   };
// }
