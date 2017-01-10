import DataApi from '../api/mockDataApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadEntireDataSucc(entireData) {
  return {type: types.LOAD_ENTIRE_SUCCESS, entireData};
}

export function loadEntireData() {
  return function (dispatch, getState) {
  console.log(getState());
    dispatch(beginAjaxCall());
    return DataApi.getEntireData().then(entireData => {
      dispatch(loadEntireDataSucc(entireData));
    }).catch(error => {
      throw(error);
    })
  }
}
