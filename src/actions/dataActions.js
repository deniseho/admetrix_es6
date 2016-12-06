import DataApi from '../api/mockDataApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadEntireDataSucc(entireData) {
  return {type: types.LOAD_ENTIRE_SUCCESS, entireData};
}

export function loadEntireData() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return DataApi.getEntireData().then(entireData => {
      dispatch(loadEntireDataSucc(entireData));
    }).catch(error => {
      throw(error);
    })
  }
}

export function setAxisFilterOptionsSucc(axisFilters) {
  return {type: types.SET_AXIS_FILTER_OPTIONS_SUCCESS, axisFilters};
}

export function setAxisFilterOptions(){
  return dispatch => {
    dispatch(beginAjaxCall());
    return DataApi.getAxisFilters().then(axisFilters => {
      dispatch(setAxisFilterOptionsSucc(axisFilters));
    }).catch(error => {
      throw(error);
    })
  }
}