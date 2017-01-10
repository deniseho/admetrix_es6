import DataApi from '../api/mockDataApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadUserDataSucc(userData) {
  return {type: types.LOAD_USER_SUCCESS, userData};
}

export function loadUserData() {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return DataApi.getUserData().then(userData => {
      dispatch(loadUserDataSucc(userData));
    }).catch(error => {
      throw(error);
    })
  }
}
