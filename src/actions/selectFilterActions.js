import DataApi from '../api/mockDataApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function selectFilterOptionsSucc(selectedOptions) {
    return {type: types.SELECT_FILTER_OPTIONS_SUCCESS, selectedOptions};
}

export function selectFilterOptions() {
    return dispatch => {
        dispatch(beginAjaxCall());
        return DataApi.selectOptions()
            .then(selectedOptions => {
                 console.log("selectedOptions: " + JSON.stringify(selectedOptions));
                dispatch(selectFilterOptionsSucc(selectedOptions));
            })
            .catch(error => {
                throw(error);
            })
    }
}