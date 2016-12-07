import DataApi from '../api/mockDataApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function setProjectFilterOptionsSucc(dataFilters) {
  return {type: types.SET_PROJECT_FILTER_OPTIONS_SUCCESS, dataFilters};
}

export function setProjectFilterOptions(){
  return dispatch => {
    dispatch(beginAjaxCall());
    return DataApi.getDataFilters().then(dataFilters => {
      dispatch(setProjectFilterOptionsSucc(dataFilters));
    }).catch(error => {
      throw(error);
    })
  }
}