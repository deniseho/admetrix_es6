import DataApi from '../api/mockDataApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadAllDataSuccess(entireData) {
  return {type: types.LOAD_ENTIRE_SUCCESS, entireData};
}

export function loadAllData() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return DataApi.getEntireData().then(entireData => {
      dispatch(loadAllDataSuccess(entireData));
    }).catch(error => {
      throw(error);
    });
  };
}
