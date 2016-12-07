import DataApi from '../api/mockDataApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function setAxisFilterOptionsSucc(axisOptions) {
  return {type: types.SET_AXIS_FILTER_OPTIONS_SUCCESS, axisOptions};
}

export function setAxisFilterOptions(){
  return dispatch => {
    dispatch(beginAjaxCall());
    return DataApi.getAxisFilters().then(axisOptions => {
      dispatch(setAxisFilterOptionsSucc(axisOptions));
    }).catch(error => {
      throw(error);
    })
  }
}