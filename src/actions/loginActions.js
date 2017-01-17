import DataApi from '../api/mockDataApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function loginSuccess(fbResponse) {
  return { type: types.LOGIN_SUCCESS, fbResponse};
}

export function logoutSuccess() {
  return {type: types.LOGOUT_SUCCESS};
}


function getAccessToken() {
    let localAuth = JSON.parse(localStorage.getItem("admatrixAuth"))
    return localAuth ? localAuth : ''
}

export function login(){
  return dispatch => {
    return DataApi.fbLogin(getAccessToken()).then(fbResponse => {
      dispatch(loginSuccess(fbResponse));
    }).catch(error => {
      throw(error);
    })
  }
}

// export function logout(){
//   return dispatch => {
//     dispatch(logoutSuccess);
//   }
// }

