import DataApi from '../api/mockDataApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function setDataFilterOptionsSucc(dataFilters) {
  return {type: types.SET_DATA_FILTER_OPTIONS_SUCCESS, dataFilters};
}

export function setDataFilterOptions(){
  return dispatch => {
    dispatch(beginAjaxCall());
    return DataApi.getDataFilters()
    .then(dataFilters => {
      dispatch(setDataFilterOptionsSucc(dataFilters));
    }).catch(error => {
      throw(error);
    })
  }
}
