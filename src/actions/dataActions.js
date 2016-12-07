import DataApi from '../api/mockDataApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadEntireDataSucc(entireData) {
  return {type: types.LOAD_ENTIRE_SUCCESS, entireData};
}


export function loadEntireData() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return DataApi.getEntireData("projId-02").then(entireData => {
      dispatch(loadEntireDataSucc(entireData));
    }).catch(error => {
      throw(error);
    })
  }
}
