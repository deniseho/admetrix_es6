import DataApi from '../api/mockDataApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadAllDataSuccess(alldata) {
  return {type: types.LOAD_ALLDATA_SUCCESS, alldata};
}

export function loadAllData() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return DataApi.getAllData().then(alldata => {
      dispatch(loadAllDataSuccess(alldata));
    }).catch(error => {
      throw(error);
    });
  };
}
